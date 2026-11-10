const assert=require('assert');
const fs=require('fs');
const Storage=require('../src/arc_v8_storage');
const Activity=require('../src/arc_v8_activity');
const Directory=require('../src/current_student_directory');

let passed=0,total=0;
async function test(name,fn){total++;try{await fn();passed++;console.log('PASS',name);}catch(error){console.error('FAIL',name,error);process.exitCode=1;}}

function memory(){
  const data={}; Object.values(Storage.STORES).forEach(store=>data[store]=new Map());
  const keys={students:'studentId',course_enrollments:'enrollmentId',activity_definitions:'definitionId',activity_versions:'versionId',activity_assignments:'assignmentId',student_activities:'studentActivityId',activity_attempts:'attemptId',activity_assessment_finalizations:'activityAssessmentFinalizationId'};
  const paths={activity_versions:{by_definition:'definitionId'},student_activities:{by_version:'versionId',by_student:'studentId',by_assignment:'assignmentId'},activity_attempts:{by_student_activity:'studentActivityId'},activity_assessment_finalizations:{by_attempt:'attemptId'},course_enrollments:{by_student:'studentId'}};
  let next=1; const copy=x=>x===undefined?undefined:structuredClone(x);
  const match=(row,path,key)=>JSON.stringify(row[path])===JSON.stringify(key);
  function api(target){return{get:async(s,k)=>copy(target[s].get(k)),add:async(s,v)=>{let k=v[keys[s]];if(target[s].has(k))throw Error('duplicate');target[s].set(k,copy(v));},put:async(s,v)=>target[s].set(v[keys[s]],copy(v)),query:async(s,index,key)=>Array.from(target[s].values()).filter(row=>!index||key===undefined||match(row,paths[s][index],key)).map(copy)};}
  return{generateId:()=>`00000000-0000-4000-8000-${String(next++).padStart(12,'0')}`,read:async(s,k)=>copy(data[s].get(k)),add:async(s,v)=>api(data).add(s,v),query:async(s,i,k)=>api(data).query(s,i,k),async transaction(stores,fn){stores=Array.isArray(stores)?stores:[stores];let work={};Object.keys(data).forEach(s=>work[s]=new Map(Array.from(data[s]).map(([k,v])=>[k,copy(v)])));let result=await fn(api(work));stores.forEach(s=>data[s]=work[s]);return result;},seed(s,v){data[s].set(v[keys[s]],copy(v));},data};
}

function fixture(){let storage=memory(),clock=0;storage.seed(Storage.STORES.students,{studentId:'s1',lifecycle:'active'});storage.seed(Storage.STORES.students,{studentId:'s2',lifecycle:'active'});storage.seed(Storage.STORES.enrollments,{enrollmentId:'e1',studentId:'s1',courseId:'wt',enrollmentStart:'2026-08-01',lifecycle:'active'});storage.seed(Storage.STORES.enrollments,{enrollmentId:'e2',studentId:'s2',courseId:'wt',enrollmentStart:'2026-08-01',lifecycle:'active'});return{storage,repo:Activity.create({storage,actor:'Instructor',now:()=>`2026-11-09T12:00:${String(clock++).padStart(2,'0')}Z`})};}

(async()=>{
  await test('reusable Measurement Worksheet creates separate dated occurrences and rejects only the exact duplicate occurrence',async()=>{
    let {repo}=fixture(),definition=await repo.createDefinition({type:'Technical Assignment',title:'Measurement Worksheet',courseIds:['wt']}),version=await repo.createVersion({definitionId:definition.definitionId,versionNumber:1,pointsPossible:10,publicationState:'Approved'});
    let day1=await repo.assign({versionId:version.versionId,origin:'Individual',sectionId:'p2',assignedDate:'2026-11-09',recipients:[{studentId:'s1',enrollmentId:'e1'}]}),day2=await repo.assign({versionId:version.versionId,origin:'Individual',sectionId:'p2',assignedDate:'2026-11-10',recipients:[{studentId:'s1',enrollmentId:'e1'}]});
    assert.notEqual(day1.assignment.occurrenceKey,day2.assignment.occurrenceKey);
    await assert.rejects(repo.assign({versionId:version.versionId,origin:'Individual',sectionId:'p2',assignedDate:'2026-11-09',recipients:[{studentId:'s1',enrollmentId:'e1'}]}),e=>e.code==='DUPLICATE_ASSIGNMENT_OCCURRENCE');
    let secondSameDay=await repo.assign({versionId:version.versionId,origin:'Individual',sectionId:'p2',assignedDate:'2026-11-09',occurrenceLabel:'afternoon',recipients:[{studentId:'s1',enrollmentId:'e1'}]});
    assert.equal(secondSameDay.assignment.occurrenceLabel,'afternoon');
  });

  await test('individual withdrawal and restoration append audit lineage without deleting the occurrence',async()=>{
    let {repo}=fixture(),definition=await repo.createDefinition({type:'Technical Assignment',title:'Worksheet',courseIds:['wt']}),version=await repo.createVersion({definitionId:definition.definitionId,versionNumber:1,pointsPossible:10,publicationState:'Approved'}),assigned=await repo.assign({versionId:version.versionId,origin:'Individual',sectionId:'p2',assignedDate:'2026-11-09',recipients:[{studentId:'s1',enrollmentId:'e1'}]}),activity=assigned.studentActivities[0];
    let withdrawn=await repo.withdrawStudentActivity({studentActivityId:activity.studentActivityId,expectedRevision:activity.revision,reason:'Assigned to wrong Student',actor:'Instructor'});assert.equal(withdrawn.studentActivity.assignmentState,'withdrawn');assert.equal(withdrawn.studentActivity.auditTrail.at(-1).type,'assignment_withdrawn');
    let restored=await repo.restoreStudentActivity({studentActivityId:activity.studentActivityId,expectedRevision:withdrawn.studentActivity.revision,reason:'Instructor correction',actor:'Instructor'});assert.equal(restored.studentActivity.assignmentState,'active');assert.deepEqual(restored.studentActivity.auditTrail.map(x=>x.type),['assigned','assignment_withdrawn','assignment_restored']);
  });

  await test('dual-period directory shows one stable Student in every assigned Section',()=>{
    let student={id:'s1',name:'Fictional Dual Period'},state={sections:[{id:'p2',period:2,name:'WT 2'},{id:'p5',period:5,name:'WT 5'}]},groups=Directory.build(state,id=>id==='p2'||id==='p5'?[student]:[]);assert.equal(groups[0].students[0].id,'s1');assert.equal(groups[1].students[0].id,'s1');
  });

  await test('Fast Roster bank selection, archive restore, individual unassignment and correction lineage are wired',()=>{
    let html=fs.readFileSync('index.html','utf8');for(let expected of ['showFastRosterTechnicalBank','Assign from Bank','restoreTechnicalHubDefinition','withdrawTechnicalStudentActivity','technical-withdraw','technical-restore-assignment','supersedesAssessmentResultId:prior&&prior.assessmentResultId','accept-correction'])assert(html.includes(expected),expected);
  });

  await test('Student History exposes owner audit events and dependency-aware Undo',()=>{
    let projection=fs.readFileSync('src/arc_student_history_projection.js','utf8'),html=fs.readFileSync('index.html','utf8');assert(projection.includes("StudentActivityAuditEvent"));assert(projection.includes("assignment_withdrawn"));assert(projection.includes("undo={eligible:"));assert(html.includes('undoStudentHistoryActivity'));assert(html.includes('Undo unavailable:'));
  });

  await test('sidebar Lesson Plans and Curriculum open central v8-safe hubs',()=>{
    let shell=require('../src/arc_titanium_shell'),items=shell.navigation().flatMap(group=>group.items),html=fs.readFileSync('index.html','utf8');assert.equal(items.find(x=>x.id==='lessonbank').action,'renderLessonPlansHub');assert.equal(items.find(x=>x.id==='standards').action,'renderCurriculumStandardsHub');assert(html.includes('function renderLessonPlansHub'));assert(html.includes('function renderCurriculumStandardsHub'));
  });

  await test('assigned v8 work remains Not started and class scoring follows roster Enrollment across periods',()=>{
    let projection=fs.readFileSync('src/arc_batch_a_projection.js','utf8'),html=fs.readFileSync('index.html','utf8');assert(projection.includes("state==='Assigned'?'assigned'"));assert(html.includes('rosterIds=new Set(sectionStudents(sec.id).map(x=>x.id))'));assert(html.includes('x.assignmentState!=="withdrawn"'));
  });

  if(!process.exitCode)console.log(`\n${passed}/${total} Technical Assignment, History, sidebar, and dual-period repair tests passed.`);
})();
