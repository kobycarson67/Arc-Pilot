/* Synthetic authority regression. No browser, tablet, production or remote writes.
 * The memory transaction model uses keys/indexes captured from the REAL storage
 * upgrade. Browser IndexedDB lifetime/abort behavior still needs browser testing.
 */
const assert = require('assert');
const fs = require('fs'), path = require('path'), Module = require('module');
const Storage = require('../src/arc_v8_storage'), S = Storage.STORES;
const Activity = require('../src/arc_v8_activity'), Grade = require('../src/arc_v8_gradebook');
const P6 = require('../src/arc_project_technical_authority_adapter');
const P9 = require('../src/arc_gradebook_authority_adapter');
const Projection = require('../src/arc_academic_consumer_projection');
function seedFixture() {
  const file = path.join(__dirname, 'arc_gradebook_authority_adapter.test.js');
  const m = new Module(file, module); m.filename = file; m.paths = Module._nodeModulePaths(__dirname);
  m._compile(fs.readFileSync(file, 'utf8').split('(async()=>{')[0] + '\nmodule.exports=fixture;', file);
  return m.exports().storage._maps;
}
async function memory() {
  const schema = {}, sentinel = new Error('schema captured');
  await assert.rejects(Storage.create({driver: {open: async config => {
    config.upgrade({createObjectStore(name, options) {
      schema[name] = {key: options.keyPath, indexes: {}};
      return {add() {}, createIndex(index, key, settings) {schema[name].indexes[index] = {key, ...settings};}};
    }}, 0, 14, {});
    throw sentinel;
  }}}).open(), e => e === sentinel);
  let maps = Object.fromEntries(Object.keys(schema).map(s => [s, new Map()])), serial = 1;
  const clone = x => x === undefined ? x : structuredClone(x);
  const keyOf = (r, key) => Array.isArray(key) ? key.map(k => r[k]) : r[key];
  const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const valid = key => key !== undefined && key !== null && (!Array.isArray(key) || key.every(valid));
  let inject = null, writes = 0, transactionCount = 0;
  function api(work, allowed = Object.keys(schema)) {
    function check(s) {assert(allowed.includes(s), 'Store outside transaction: ' + s);}
    function write(s, v, add) {
      check(s); writes++; if (inject && inject({store:s, value:v, write:writes})) throw Object.assign(new Error('Injected write failure'), {code:'INJECTED_FAILURE'});
      const key = keyOf(v, schema[s].key); assert(valid(key), 'Missing primary key');
      if (add) assert(!work[s].has(key), 'Duplicate key');
      for (const idx of Object.values(schema[s].indexes)) if (idx.unique) {
        const candidate = keyOf(v, idx.key); if (!valid(candidate)) continue;
        assert(!Array.from(work[s].entries()).some(([k,row]) => k !== key && equal(candidate,keyOf(row,idx.key))), 'Duplicate unique index');
      }
      work[s].set(key, clone(v));
    }
    return {
      get: async(s,k) => {check(s); return clone(work[s].get(k));},
      query: async(s,index,key) => {check(s); const idx=index && schema[s].indexes[index]; if(index)assert(idx,'Unknown index '+s+'.'+index);
        return Array.from(work[s].values()).filter(row => !index || key === undefined || (idx.multiEntry ? keyOf(row,idx.key).some(x => equal(x,key)) : equal(keyOf(row,idx.key),key))).map(clone);},
      add: async(s,v) => write(s,v,true), put: async(s,v) => write(s,v,false),
      delete: async(s,k) => {check(s); work[s].delete(k);}, clear: async s => {check(s);work[s].clear();}
    };
  }
  const db = {
    storeNames:Object.keys(schema), generateId:() => `00000000-0000-4000-8000-${(serial++).toString(16).padStart(12,'0')}`,
    read:async(s,k) => api(maps).get(s,k), query:async(s,i,k) => api(maps).query(s,i,k), add:async(s,v) => api(maps).add(s,v), put:async(s,v) => api(maps).put(s,v),
    transaction:async(stores, fn) => {transactionCount++; stores=Array.isArray(stores)?stores:[stores]; const work=Object.fromEntries(Object.entries(maps).map(([s,m])=>[s,new Map(Array.from(m,([k,v])=>[k,clone(v)]))])); const result=await fn(api(work,stores)); stores.forEach(s=>maps[s]=work[s]); return result;},
    snapshot:() => Object.fromEntries(Object.entries(maps).map(([s,m])=>[s,Array.from(m.values()).map(clone)])),
    fault:fn=>{inject=fn;writes=0;}, stats:()=>({writes,transactionCount})
  };
  for(const [s,rows] of Object.entries(seedFixture())) for(const row of rows.values()) await db.add(s,row);
  return db;
}
async function fixture({posted=true, scored=true}={}) {
  const db=await memory(), now='2026-10-05T12:00:00Z';
  const activity=Activity.create({storage:db,actor:'teacher',now:()=>now});
  const grade=Grade.create({storage:db,actor:'teacher',now:()=>now});
  const p6=P6.create({authorityState:'V8_ISOLATED_VERIFICATION',databaseName:P6.isolatedDatabaseName,storage:db,projection:Projection,activity,project:{},assessment:grade});
  const p9=P9.create({authorityState:'V8_ISOLATED_VERIFICATION',databaseName:P9.isolatedDatabaseName,storage:db,projection:Projection,gradebook:grade});
  const base={studentId:'s1',sectionId:'sec1',schoolDate:'2026-10-05'};
  const definition=await p6.runIsolated('technical-definition-create',{title:'Synthetic measurement',courseIds:['wt'],pointsPossible:10,version:{versionNumber:1,publicationState:'Approved'}});
  const assigned=await p6.runIsolated('technical-assign',{...base,assignedDate:base.schoolDate,versionId:definition.version.versionId});
  let sa=assigned.studentActivities[0], attempt, result, entry;
  if(scored) {
    sa=await p6.runIsolated('activity-transition',{...base,studentActivityId:sa.studentActivityId,expectedRevision:sa.revision,workflowState:'In Progress'});
    attempt=await p6.runIsolated('attempt-start',{...base,studentActivityId:sa.studentActivityId});
    attempt=await p6.runIsolated('attempt-transition',{...base,attemptId:attempt.attemptId,expectedRevision:attempt.revision,workflowState:'Finalized'});
    const fin=await p6.runIsolated('technical-finalize-assessment',{...base,attemptId:attempt.attemptId,pointsEarned:8,pointsPossible:10,finalizedAt:now});
    result=await p6.runIsolated('technical-gradebook-handoff',{...base,activityAssessmentFinalizationId:fin.activityAssessmentFinalizationId});
    sa=await p6.runIsolated('activity-transition',{...base,studentActivityId:sa.studentActivityId,expectedRevision:sa.revision,workflowState:'Completed'});
    if(posted) entry=(await p9.runIsolated('post-result',{...base,gradingPeriodId:'q1',assessmentResultId:result.assessmentResultId})).entry;
  }
  const input={...base,studentActivityId:sa.studentActivityId,expectedRevision:sa.revision,attemptId:attempt&&attempt.attemptId,expectedAttemptRevision:attempt&&attempt.revision,pointsEarned:0,pointsPossible:10,finalizedAt:'2026-10-05T13:00:00Z',gradingPeriodId:'q1',...(entry?{expectedEntryRevision:entry.revision}:{})};
  return {db,p6,p9,sa,attempt,result,entry,input,save:extra=>p6.saveTechnicalScore({...input,...extra},p9)};
}
async function unchanged(f, extra, codes) {
  const before=f.db.snapshot(); await assert.rejects(f.save(extra), e=>!codes || codes.includes(e.code)); assert.deepStrictEqual(f.db.snapshot(),before);
}
let passed=0, failed=0;
async function test(name,fn){try{await fn();passed++;console.log('PASS',name);}catch(e){failed++;console.error('FAIL',name,e);}}
(async()=>{
await test('8 to 0 preserves source history and atomically updates the existing ledger without policy',async()=>{
  const f=await fixture(); const before=f.db.stats().transactionCount; await f.save(); assert.equal(f.db.stats().transactionCount-before,1);
  const results=await f.db.query(S.assessmentResults,'by_student','s1');assert.equal(results.length,2);
  const next=results.find(r=>r.assessmentResultId!==f.result.assessmentResultId);assert.equal(next.pointsEarned,0);assert.equal(next.supersedesAssessmentResultId,f.result.assessmentResultId);
  assert.equal((await f.db.read(S.assessmentResults,f.result.assessmentResultId)).pointsEarned,8);
  assert.equal((await f.db.read(S.gradebookEntries,f.entry.gradebookEntryId)).revision,2);
  const revisions=await f.db.query(S.gradebookRevisions,'by_entry',f.entry.gradebookEntryId);assert.equal(revisions.length,2);assert.equal(revisions.find(r=>r.sequence===2).assessmentResultId,next.assessmentResultId);
  assert.equal((await f.db.query(S.gradebookPolicies)).length,0);
});
await test('first score produces one finalized source but does not invent a posted ledger',async()=>{const f=await fixture({scored:false});await f.save({pointsEarned:8});assert.equal((await f.db.query(S.assessmentResults)).length,1);assert.equal((await f.db.query(S.gradebookEntries)).length,0);assert.equal((await f.db.read(S.studentActivities,f.sa.studentActivityId)).workflowState,'Completed');});
await test('unposted source can be corrected without creating a ledger',async()=>{const f=await fixture({posted:false});await f.save();assert.equal((await f.db.query(S.assessmentResults)).length,2);assert.equal((await f.db.query(S.gradebookEntries)).length,0);});
for(const score of ['',null,-1,11,NaN]) await test('invalid score '+String(score)+' leaves all stores identical',async()=>unchanged(await fixture(),{pointsEarned:score},['BLANK_SCORE','INVALID_SCORE']));
await test('stale activity revision leaves every store unchanged',async()=>unchanged(await fixture(),{expectedRevision:1},['WRITE_CONFLICT']));
await test('stale attempt revision leaves every store unchanged',async()=>unchanged(await fixture(),{expectedAttemptRevision:1},['WRITE_CONFLICT']));
await test('stale ledger revision leaves every store unchanged',async()=>unchanged(await fixture(),{expectedEntryRevision:0},['WRITE_CONFLICT']));
for(const day of ['2026-10-05','2026-10-06']) await test('old enrollment score under new enrollment on '+day+' fails without writes',async()=>{
 const f=await fixture(),old=await f.db.read(S.enrollments,'e1'),a=await f.db.read(S.scheduleAssignments,'a1');
 await f.db.put(S.enrollments,{...old,enrollmentEnd:'2026-10-05',lifecycle:'closed'});await f.db.put(S.scheduleAssignments,{...a,effectiveTo:'2026-10-05',lifecycle:'ended'});
 await f.db.add(S.enrollments,{...old,enrollmentId:'e-new',enrollmentStart:'2026-10-05'});await f.db.add(S.scheduleAssignments,{...a,scheduleAssignmentId:'a0-new',enrollmentId:'e-new',effectiveFrom:'2026-10-05'});
 assert.equal((await Projection.fromV8(f.db,{day,selectedSectionId:'sec1'})).scopeForStudent('s1','sec1').enrollmentId,'e-new');
 f.db.fault(null);await unchanged(f,{schoolDate:day},['ACADEMIC_SCOPE_MISMATCH']);assert.equal(f.db.stats().writes,0);
});
await test('stranded source-to-ledger lineage is rejected unchanged rather than compounded',async()=>{
 const f=await fixture();await f.db.add(S.assessmentResults,{...f.result,assessmentResultId:'stranded',pointsEarned:0,supersedesAssessmentResultId:f.result.assessmentResultId,finalizedAt:'2026-10-05T12:30:00Z'});
 await unchanged(f,{},['SOURCE_LINEAGE_MISMATCH']);
});
await test('injected failure at each individual write rolls back the entire correction',async()=>{
 const probe=await fixture();probe.db.fault(null);await probe.save();const count=probe.db.stats().writes;assert(count>=6,'Expected multi-owner write chain');
 for(let at=1;at<=count;at++){const f=await fixture();f.db.fault(({write})=>write===at);await unchanged(f,{},['INJECTED_FAILURE']);}
});
await test('repeated submission with stale editor authority cannot create a duplicate correction',async()=>{const f=await fixture();await f.save();await unchanged(f,{},['WRITE_CONFLICT']);assert.equal((await f.db.query(S.assessmentResults)).length,2);});
await test('same timestamps still follow supersession lineage, not arbitrary query order',async()=>{
 const f=await fixture();const first=await f.save({finalizedAt:f.result.finalizedAt});
 const attempts=await f.db.query(S.activityAttempts,'by_student_activity',f.sa.studentActivityId),latest=attempts.sort((a,b)=>b.sequence-a.sequence)[0];
 await f.save({expectedRevision:first.studentActivity.revision,attemptId:latest.attemptId,expectedAttemptRevision:latest.revision,expectedEntryRevision:2,pointsEarned:9,finalizedAt:f.result.finalizedAt});
 const results=await f.db.query(S.assessmentResults);assert.equal(results.length,3);assert.equal(results.find(r=>r.pointsEarned===9).supersedesAssessmentResultId,first.result.assessmentResultId);
});
await test('withdrawn historical work cannot be scored until explicitly restored',async()=>{const f=await fixture();await f.db.put(S.studentActivities,{...f.sa,assignmentState:'withdrawn'});await unchanged(f,{},['INVALID_ASSIGNMENT_STATE']);});
await test('another student cannot save this activity',async()=>unchanged(await fixture(),{studentId:'s2'},['ACADEMIC_SCOPE_MISMATCH']));
await test('changed grading period cannot silently rewrite the historical ledger scope',async()=>unchanged(await fixture(),{gradingPeriodId:'different-quarter'},['ACADEMIC_SCOPE_MISMATCH']));
console.log(`${passed}/${passed+failed} Technical atomic regression cases passed`);if(failed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
