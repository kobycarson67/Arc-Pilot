const assert=require('assert'),fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('function batchBContext()');
const end=html.indexOf('async function refreshBatchBProjection()',start);
const source=html.slice(start,end)+'\nthis.batchBContext=batchBContext;';
let pass=0,total=0;
function test(name,fn){total++;try{fn();pass++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error);process.exitCode=1}}
function context(students,selectedSectionId,scopeForStudent){
  const owner={scopeForStudent};
  const sandbox={batchBAuthorityActive:()=>true,batchBAuthorityRuntime:{gradingPeriodId:'gp2',gradebookPolicyVersionId:'policy',gradingPeriod:{startDate:'2026-10-20'}},batchAAuthorityRuntime:{projectionCache:{get:()=>owner}},activeSection:()=>selectedSectionId?{id:selectedSectionId}:null,allStudents:()=>students,dateKey:()=> '2026-11-11'};
  vm.runInNewContext(source,sandbox);
  return JSON.parse(JSON.stringify(sandbox.batchBContext()));
}
test('program startup keeps all active WT and AWT Students while selecting only valid per-Student scopes',()=>{
  const scopes={wt1:[{sectionId:'wt-p1'}],awt1:[{sectionId:'awt-p5'},{sectionId:'awt-p7'}],wt2:[{sectionId:'wt-p3'}]};
  const result=context([{id:'wt1'},{id:'awt1'},{id:'wt2'},{id:'archived',archived:true}],'awt-p5',(id,sectionId)=>{const rows=scopes[id]||[];return rows.find(x=>!sectionId||x.sectionId===sectionId)||null});
  assert.deepEqual(result.studentIds,['wt1','awt1','wt2']);
  assert.deepEqual(result.sectionIdsByStudent,{wt1:'wt-p1',awt1:'awt-p5',wt2:'wt-p3'});
  assert.equal(result.selectedSectionId,'awt-p5');
  assert.equal(Object.prototype.hasOwnProperty.call(result,'sectionId'),false);
});
test('selected Section with zero Students does not erase program-wide Batch B startup',()=>{
  const result=context([{id:'wt1'},{id:'awt1'}],'empty-section',(id,sectionId)=>sectionId?null:{sectionId:id==='wt1'?'wt-p1':'awt-p5'});
  assert.deepEqual(result.studentIds,['wt1','awt1']);
  assert.deepEqual(result.sectionIdsByStudent,{wt1:'wt-p1',awt1:'awt-p5'});
});
test('missing P4 scope is not fabricated or assigned to the selected Section',()=>{
  const result=context([{id:'valid'},{id:'missing'}],'wt-p1',(id,sectionId)=>id==='valid'&&(!sectionId||sectionId==='wt-p1')?{sectionId:'wt-p1'}:null);
  assert.equal(result.sectionIdsByStudent.valid,'wt-p1');
  assert.equal(Object.prototype.hasOwnProperty.call(result.sectionIdsByStudent,'missing'),false);
});
test('health acknowledgement remains after academic startup in initialization order',()=>{
  const init=html.slice(html.indexOf('async function initializeArcApplication'),html.indexOf('function renderAcademicRecoveryState'));
  assert(init.indexOf('resolveAcademicAuthorityBeforeStartup')>=0);
  assert(init.indexOf('markApplicationHealthy')>init.indexOf('resolveAcademicAuthorityBeforeStartup'));
});
if(!process.exitCode)console.log(`\n${pass}/${total} Batch B multi-section startup repair tests passed.`);
