const assert=require('node:assert/strict'),fs=require('node:fs'),Adapter=require('../src/arc_project_technical_authority_adapter');
const source=fs.readFileSync('tests/arc_project_technical_authority_adapter.test.js','utf8'),harness=new Function('Adapter',source.slice(source.indexOf('function harness()'),source.indexOf('(async()=>'))+';return harness;')(Adapter);
(async()=>{
let h=harness(),existing={studentActivityId:'existing',studentId:'s1',enrollmentId:'e1',assignmentId:'old'};
h.activity.assign=async()=>({assignment:null,studentActivities:[existing],createdStudentActivities:[],reusedStudentActivities:[existing],createdCount:0,reusedCount:1});
const r=await h.adapter.runIsolated('technical-assign',{versionId:'v1',studentId:'s1',sectionId:'sec1',assignedDate:'2026-11-13'});assert.equal(r.assignment,null);assert.equal(r.createdCount,0);assert.equal(r.reusedCount,1);assert.deepEqual(r.createdStudentActivities,[]);assert.deepEqual(r.reusedStudentActivities,[existing]);assert(!h.calls.some(x=>x[0]==='project-create'));
h=harness();let rejected=false;try{await h.adapter.runIsolated('technical-assign',{versionId:'v1',studentId:'s1',sectionId:'wrong-section',assignedDate:'2026-11-13'});}catch(e){rejected=true;}assert(rejected,'wrong section must fail');assert(!h.calls.some(x=>x[0]==='assign'),'wrong section fails before assignment');
console.log('PASS adapter preserves all-reused response without Project side effects and rejects wrong section before owner assignment.');
})().catch(e=>{console.error(e);process.exitCode=1});
