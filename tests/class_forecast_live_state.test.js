const assert=require('assert');
const Bank=require('../src/project_bank');
const Checkpoints=require('../src/project_checkpoints');
const Bridge=require('../src/project_checkpoint_host_bridge');
const Forecast=require('../src/class_forecast');

let passed=0;
function test(name,fn){try{fn();passed++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error.stack||error.message);process.exitCode=1}}
function fixture(){
  const section={id:'sec4',period:4,course:'wt',name:'4th Period — Welding Technology'};
  const other={id:'sec5',period:5,course:'wt',name:'5th Period — Welding Technology'};
  const definition=Bank.normalizeDefinition({id:'pb_wt_coupon_holder',title:'Welding Coupon Holder',type:'Build Project',difficulty:2,applicability:{wt:true},stages:Bank.DEFAULT_STAGES});
  let project=Bank.assignment(definition,{assignmentId:'coupon-1',sectionId:section.id,course:'wt',timestamp:'2026-09-18T13:00:00Z',isPrimary:true});
  project=Checkpoints.initializeProject(project);
  ['plan','material_prep','layout_measurement'].forEach((id,index)=>{project=Checkpoints.transition(project,id,'verified',{timestamp:'2026-09-18T13:0'+index+':00Z',date:'2026-09-18',verifiedBy:'Instructor'});});
  project=Checkpoints.transition(project,'fit_up','in_progress',{timestamp:'2026-09-18T13:10:00Z',date:'2026-09-18'});
  const student={id:'taylor',name:'Taylor Reed',enrollments:[{active:true,year:'2026-27',semester:'Semester 1',sectionId:section.id}],projects:[project],history:[]};
  const state={academicYear:'2026-27',semester:'Semester 1',activeSectionId:section.id,sections:[section,other],classes:{wt:[student],awt:[]},attendanceRecords:{},projectBank:[definition],booths:[{id:'b4',name:'Booth 4',removedAt:null}],boothAssignments:[{id:'ba1',studentId:'taylor',boothId:'b4',sectionId:section.id,date:'2026-09-18',startedAt:'2026-09-18T13:00:00Z',endedAt:null}]};
  return {state,section,other,student};
}
function host(x){
  const box={student:x.student,history:x.student.history||[],json:'',saves:0};
  return {box,getHistory:()=>box.history.slice(),setHistory:value=>{box.history=value;box.student.history=value},replaceStudent:value=>{box.student=value;x.student=value;x.state.classes.wt[0]=value},save:()=>{box.saves++;box.json=JSON.stringify(x.state)}};
}
function act(x,h,action,at){return Bridge.execute(h,x.state,h.box.student,'coupon-1',action,'fit_up',{timestamp:at,date:'2026-09-18',sectionId:'sec4',verifiedBy:action==='verify'?'Instructor':'',historyId:'forecast-'+action+'-'+h.box.saves})}
function forecast(x,section=x.section,students=x.state.classes.wt){return Forecast.build({state:x.state,section,students,day:'2026-09-18',definitions:x.state.projectBank})}
function position(model){return model.positions.find(item=>item.studentId==='taylor')}
function fastRoster(student){return Bank.primary(student.projects)}

test('Fit-Up Ready for Review drives Forecast and Fast Roster from the same derived authority',()=>{
  const x=fixture(),h=host(x),beforeBooths=JSON.stringify(x.state.boothAssignments);
  let initial=forecast(x),initialPosition=position(initial);
  assert.equal(initial.pulse.needYouNow,0);
  assert.equal(initialPosition.need,'Ready to Work');
  assert(!initial.needs.some(item=>item.studentId==='taylor'));
  assert.equal(act(x,h,'ready','2026-09-18T13:20:00Z').ok,true);
  const reviewed=forecast(x),reviewedPosition=position(reviewed),roster=fastRoster(h.box.student);
  assert.equal(reviewed.pulse.needYouNow,1);
  assert.equal(reviewed.needs[0].need,'Instructor Review — Fit-Up');
  assert.equal(reviewedPosition.need,'Instructor Review — Fit-Up');
  assert.equal(reviewedPosition.project.currentStageName,'Fit-Up');
  assert.equal(reviewedPosition.booth.name,'Booth 4');
  assert.equal(roster.currentNeed,reviewedPosition.need);
  assert.equal(roster.currentStageName,reviewedPosition.project.currentStageName);
  assert.equal(h.box.student.projects[0].currentNeed,'Ready to Work');
  assert.equal(JSON.stringify(x.state.boothAssignments),beforeBooths);
  const upNext=reviewed.upNext.find(item=>item.studentId==='taylor');
  assert.equal(upNext.next.label,'Instructor Check');
  assert.equal(upNext.next.detail,'Tack & Pre-Weld Check');
  assert.equal(Object.prototype.hasOwnProperty.call(upNext.next,'date'),false);
});

test('Verify clears review, advances authority, restores manual need, and survives reload and class switching',()=>{
  const x=fixture(),h=host(x),beforeBooths=JSON.stringify(x.state.boothAssignments);
  act(x,h,'ready','2026-09-18T13:20:00Z');
  assert.equal(act(x,h,'verify','2026-09-18T13:30:00Z').ok,true);
  let current=forecast(x),p=position(current),roster=fastRoster(h.box.student);
  assert.equal(h.box.student.projects[0].checkpoints.find(c=>c.id==='fit_up').status,'verified');
  assert.equal(p.project.currentStageName,'Tack & Pre-Weld Check');
  assert.equal(p.need,'Ready to Work');
  assert.equal(current.pulse.needYouNow,0);
  assert(!current.needs.some(item=>item.studentId==='taylor'));
  assert.equal(roster.currentNeed,p.need);
  assert.equal(roster.currentStageName,p.project.currentStageName);
  assert.equal(h.box.student.projects[0].currentNeed,'Ready to Work');
  assert.equal(JSON.stringify(x.state.boothAssignments),beforeBooths);
  assert.equal(forecast(x,x.other,[]).positions.length,0);
  const restoredState=JSON.parse(h.box.json),restored={state:restoredState,section:x.section};
  restored.student=restoredState.classes.wt[0];
  let restoredModel=Forecast.build({state:restoredState,section:x.section,students:restoredState.classes.wt,day:'2026-09-18',definitions:restoredState.projectBank}),restoredPosition=position(restoredModel);
  assert.equal(restoredPosition.project.currentStageName,'Tack & Pre-Weld Check');
  assert.equal(restoredPosition.need,'Ready to Work');
  assert.equal(restoredPosition.booth.name,'Booth 4');
});

test('Needs More Work clears review, keeps Fit-Up active, and restores underlying need',()=>{
  const x=fixture(),h=host(x),beforeBooths=JSON.stringify(x.state.boothAssignments);
  act(x,h,'ready','2026-09-18T13:20:00Z');
  assert.equal(act(x,h,'reopen','2026-09-18T13:30:00Z').ok,true);
  const model=forecast(x),p=position(model),roster=fastRoster(h.box.student);
  assert.equal(h.box.student.projects[0].checkpoints.find(c=>c.id==='fit_up').status,'in_progress');
  assert.equal(p.project.currentStageName,'Fit-Up');
  assert.equal(p.need,'Ready to Work');
  assert.equal(model.pulse.needYouNow,0);
  assert.equal(roster.currentNeed,p.need);
  assert.equal(JSON.stringify(x.state.boothAssignments),beforeBooths);
});

test('Forecast calculation remains read-only for reviewed authoritative state',()=>{
  const x=fixture(),h=host(x);act(x,h,'ready','2026-09-18T13:20:00Z');
  const before=JSON.stringify(x.state);forecast(x);assert.equal(JSON.stringify(x.state),before);
});

if(!process.exitCode)console.log('PASS '+passed+' Class Forecast live-state tests');
