const assert=require('node:assert/strict'),fs=require('node:fs'),Storage=require('../src/arc_v8_storage'),Activity=require('../src/arc_v8_activity'),S=Storage.STORES;
// Reuse existing synthetic transactional store test double, not its fixture or test execution.
const source=fs.readFileSync('tests/arc_v8_activity.test.js','utf8'),memory=new Function('Storage',source.slice(source.indexOf('function memory()'),source.indexOf('function fixture()'))+';return memory;')(Storage);
async function fixture(type='Technical Assignment'){
const db=memory();for(const [s,id,row] of [[S.students,'s1',{studentId:'s1',lifecycle:'active'}],[S.students,'s2',{studentId:'s2',lifecycle:'active'}],[S.enrollments,'e1',{enrollmentId:'e1',studentId:'s1',courseId:'awt',lifecycle:'active',enrollmentStart:'2026-08-01'}],[S.enrollments,'e2',{enrollmentId:'e2',studentId:'s2',courseId:'awt',lifecycle:'active',enrollmentStart:'2026-08-01'}]])db._m[s].set(id,row);
for(const [id,enrollmentId,sectionId] of [['p1','e1','a'],['p2','e1','b'],['p3','e2','b']])db._m[S.scheduleAssignments].set(id,{scheduleAssignmentId:id,enrollmentId,sectionId,effectiveFrom:'2026-08-01',effectiveTo:null,lifecycle:'active'});
const repo=Activity.create({storage:db,academic:{rosterForSection:async section=>section==='a'?[{studentId:'s1'}]:[{studentId:'s1'},{studentId:'s2'}]}}),d=await repo.createDefinition({type,title:'Synthetic',courseIds:['awt']}),v=await repo.createVersion({definitionId:d.definitionId,versionNumber:1,publicationState:'Approved',pointsPossible:10});
const input=(sectionId,extra={})=>Object.assign({versionId:v.versionId,origin:'Selected Students',sectionId,assignedDate:'2026-11-13',recipients:[{studentId:'s1',enrollmentId:'e1'}]},extra);
return{db,repo,d,v,input};}
const snapshot=db=>JSON.stringify(Object.fromEntries(Object.entries(db._m).map(([s,m])=>[s,[...m]])));
(async()=>{
let f=await fixture(),a=await f.repo.assign(f.input('a')),before=snapshot(f.db);
let b=await f.repo.assign(f.input('b',{occurrenceKey:[f.v.versionId,'b','2026-11-13','default'].join('|')}));
assert.equal(b.assignment,null);assert.equal(b.createdCount,0);assert.equal(b.reusedCount,1);assert.equal(b.reusedStudentActivities[0].studentActivityId,a.studentActivities[0].studentActivityId);assert.equal(snapshot(f.db),before);
b=await f.repo.assign(f.input('b',{recipients:[{studentId:'s1',enrollmentId:'e1'},{studentId:'s2',enrollmentId:'e2'}]}));assert.equal(b.createdCount,1);assert.equal(b.reusedCount,1);assert.equal(b.createdStudentActivities[0].studentId,'s2');assert.equal(b.reusedStudentActivities[0].assignmentId,a.assignment.assignmentId);
before=snapshot(f.db);await assert.rejects(f.repo.assign(f.input('b',{recipients:[{studentId:'s1',enrollmentId:'e1'},{studentId:'s2',enrollmentId:'e2'}]})),e=>e.code==='DUPLICATE_ASSIGNMENT_OCCURRENCE');assert.equal(snapshot(f.db),before);
for(const extra of [{assignedDate:'2026-11-14'},{occurrenceLabel:'second'},{sessionKey:'second'},{occurrenceKey:'explicit-custom'}]){f=await fixture();await f.repo.assign(f.input('a'));b=await f.repo.assign(f.input('b',extra));assert.equal(b.createdCount,1);assert.equal(b.reusedCount,0);}
f=await fixture();await f.repo.assign(f.input('a',{sessionKey:'same',occurrenceLabel:'first'}));b=await f.repo.assign(f.input('b',{sessionKey:'same',occurrenceLabel:'different'}));assert.equal(b.createdCount,1);
f=await fixture();await f.repo.assign(f.input('a',{occurrenceKey:'prior-custom'}));b=await f.repo.assign(f.input('b'));assert.equal(b.createdCount,1);
f=await fixture();await f.repo.assign(f.input('a'));const v2=await f.repo.createVersion({definitionId:f.d.definitionId,versionNumber:2,publicationState:'Approved',pointsPossible:10});b=await f.repo.assign(f.input('b',{versionId:v2.versionId}));assert.equal(b.createdCount,1);
for(const type of ['Practice','Skill Challenge','Test']){f=await fixture(type);await f.repo.assign(f.input('a'));b=await f.repo.assign(f.input('b'));assert.equal(b.createdCount,1);}
f=await fixture();await f.repo.assign(f.input('a'));f.db._m[S.scheduleAssignments].delete('p2');b=await f.repo.assign(f.input('b'));assert.equal(b.createdCount,1);
f=await fixture();await f.repo.assign(f.input('a'));before=snapshot(f.db);await assert.rejects(f.repo.assign(f.input('b',{recipients:[{studentId:'s1',enrollmentId:'e1'},{studentId:'missing',enrollmentId:'bad'}]})),e=>e.code==='INVALID_TARGET');assert.equal(snapshot(f.db),before);
f=await fixture();await f.repo.assign(f.input('b'));b=await f.repo.assign(f.input('a'));assert.equal(b.reusedCount,1);assert.equal(b.createdCount,0);
f=await fixture();await f.repo.assign(f.input('a',{occurrenceLabel:'same repeat'}));b=await f.repo.assign(f.input('b',{occurrenceLabel:'same repeat'}));assert.equal(b.reusedCount,1);
f=await fixture();await f.repo.assign(f.input('a',{origin:'Section'}));b=await f.repo.assign(f.input('b',{origin:'Section'}));assert.equal(b.createdCount,1);assert.equal(b.reusedCount,1);assert.equal(b.createdStudentActivities[0].studentId,'s2');
f=await fixture();await f.repo.assign(f.input('a'));f.db._m[S.enrollments].set('other',{enrollmentId:'other',studentId:'s1',courseId:'awt',lifecycle:'active',enrollmentStart:'2026-08-01'});f.db._m[S.scheduleAssignments].set('otherp',{scheduleAssignmentId:'otherp',enrollmentId:'other',sectionId:'b',effectiveFrom:'2026-08-01',lifecycle:'active'});b=await f.repo.assign(f.input('b',{recipients:[{studentId:'s1',enrollmentId:'other'}]}));assert.equal(b.createdCount,1);assert.equal(b.reusedCount,0);
console.log('PASS Technical cross-period reuse, canonical explicit UI key, all-reused no writes, mixed recipients, repeat discriminators, version/non-Technical isolation, effective placement requirement and invalid-batch rollback. Native concurrency remains separate.');
})().catch(e=>{console.error(e);process.exitCode=1});

