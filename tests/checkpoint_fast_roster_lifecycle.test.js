const assert=require('assert');
const fs=require('fs');
const Bank=require('../src/project_bank');
const Checkpoints=require('../src/project_checkpoints');
const Bridge=require('../src/project_checkpoint_host_bridge');

let passed=0;
function test(name,fn){try{fn();passed++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error.stack||error.message);process.exitCode=1}}
function fixture(){
  const definition=Bank.normalizeDefinition({id:'pb_wt_coupon_holder',title:'Welding Coupon Holder',type:'Build Project',difficulty:2,applicability:{wt:true},stages:Bank.DEFAULT_STAGES});
  let assignment=Bank.assignment(definition,{assignmentId:'coupon-1',sectionId:'sec4',course:'wt',timestamp:'2026-09-18T14:00:00Z',isPrimary:true});
  assignment=Checkpoints.initializeProject(assignment);
  assignment=Checkpoints.transition(assignment,'plan','verified',{timestamp:'2026-09-18T14:05:00Z',verifiedBy:'Instructor'});
  return {state:{academicYear:'2026-27',semester:'Semester 1',activeSectionId:'sec4'},student:{id:'taylor',name:'Taylor Reed',enrollments:[{active:true,year:'2026-27',semester:'Semester 1',sectionId:'sec4'}],projects:[assignment],history:[]}};
}
function persistedHost(initial){
  const box={student:initial,history:initial.history||[],json:'',saves:0};
  return {box,getHistory:()=>box.history.slice(),setHistory:value=>{box.history=value;box.student.history=value},replaceStudent:value=>{box.student=value},save:()=>{box.saves++;box.json=JSON.stringify(box.student)}};
}
function act(host,state,action,at){return Bridge.execute(host,state,host.box.student,'coupon-1',action,'material_prep',{timestamp:at,date:at.slice(0,10),sectionId:'sec4',verifiedBy:action==='verify'?'Instructor':'',historyId:'history-'+action+'-'+host.box.saves})}
function roster(student){return Bank.primary(student.projects)}

test('Ready for Review appears, Verify clears it, advances, preserves manual need, and survives reload',()=>{
  const x=fixture(),host=persistedHost(x.student);
  assert.equal(roster(host.box.student).currentNeed,'Ready to Work');
  assert.equal(act(host,x.state,'start','2026-09-18T14:10:00Z').ok,true);
  assert.equal(act(host,x.state,'ready','2026-09-18T14:20:00Z').ok,true);
  assert.equal(roster(host.box.student).currentNeed,'Instructor Review — Material Preparation');
  assert.equal(host.box.student.projects[0].currentNeed,'Ready to Work');
  assert.equal(act(host,x.state,'verify','2026-09-18T14:30:00Z').ok,true);
  assert.equal(host.box.student.projects[0].checkpoints.find(c=>c.id==='material_prep').status,'verified');
  assert.equal(roster(host.box.student).currentStageName,'Layout & Measurement');
  assert.equal(roster(host.box.student).currentNeed,'Ready to Work');
  assert.equal(host.box.student.projects[0].currentNeed,'Ready to Work');
  const reloaded=JSON.parse(host.box.json);
  assert.equal(roster(reloaded).currentNeed,'Ready to Work');
  assert.equal(roster(reloaded).currentStageName,'Layout & Measurement');
});

test('Needs More Work clears review without corrupting the underlying manual need',()=>{
  const x=fixture();x.student.projects[0]=Bank.setNeed(x.student.projects[0],'Needs Material',{source:'Instructor',timestamp:'2026-09-18T14:06:00Z'});const host=persistedHost(x.student);
  act(host,x.state,'start','2026-09-18T14:10:00Z');
  act(host,x.state,'ready','2026-09-18T14:20:00Z');
  assert.equal(roster(host.box.student).currentNeed,'Instructor Review — Material Preparation');
  assert.equal(host.box.student.projects[0].currentNeed,'Needs Material');
  assert.equal(act(host,x.state,'reopen','2026-09-18T14:30:00Z').ok,true);
  assert.equal(host.box.student.projects[0].checkpoints.find(c=>c.id==='material_prep').status,'in_progress');
  assert.equal(roster(host.box.student).currentStageName,'Material Preparation');
  assert.equal(roster(host.box.student).currentNeed,'Needs Material');
  assert.equal(roster(JSON.parse(host.box.json)).currentNeed,'Needs Material');
});

test('host integration refreshes the dependent class view beneath an open student profile',()=>{
  const html=fs.readFileSync('index.html','utf8');
  assert(html.includes('refreshProjectContextView(result.student)'));
  assert(html.includes('if (navCurrentView === "roster") renderRoster(); else if (navCurrentView === "forecast") renderClassForecast(); if (studentOpen)'));
});

if(!process.exitCode)console.log('PASS '+passed+' checkpoint/Fast Roster lifecycle tests');
