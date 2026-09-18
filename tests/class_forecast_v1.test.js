const assert=require('assert');
const Checkpoints=require('../src/project_checkpoints');
const Bank=require('../src/project_bank');
const Forecast=require('../src/class_forecast');

let passed=0;
function test(name,fn){try{fn();passed++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error.stack||error.message);process.exitCode=1}}
function project(id,name,need){let p=Bank.assignment({id,title:name,stages:Bank.DEFAULT_STAGES},{assignmentId:id,sectionId:'sec4',course:'wt',isPrimary:true,timestamp:'2026-09-18T14:00:00Z'});p=Checkpoints.initializeProject(p);if(need&&need!=='Ready to Work')p=Bank.setNeed(p,need,{source:'Instructor',timestamp:'2026-09-18T14:01:00Z'});return p;}
function fixture(){
  let taylor=project('coupon','Welding Coupon Holder','Ready to Work');
  taylor=Checkpoints.transition(taylor,'plan','verified',{timestamp:'2026-09-18T14:02:00Z',date:'2026-09-18'});
  taylor=Checkpoints.transition(taylor,'material_prep','verified',{timestamp:'2026-09-18T14:03:00Z',date:'2026-09-18'});
  taylor=Checkpoints.transition(taylor,'layout_measurement','in_progress',{timestamp:'2026-09-18T14:04:00Z',date:'2026-09-18'});
  let riley=project('rack','Helmet Rack','Needs Material');
  return {
    section:{id:'sec4',period:4,course:'wt',name:'4th Period'},
    students:[{id:'taylor',name:'Taylor Reed',projects:[taylor]},{id:'riley',name:'Riley Stone',projects:[riley]},{id:'jordan',name:'Jordan Fox',projects:[]}],
    state:{attendanceRecords:{'sec4::2026-09-18':{students:{riley:{status:'tardy'},jordan:{status:'excused'}}}},booths:[{id:'b4',name:'Booth 4',removedAt:null}],boothAssignments:[{id:'ba1',studentId:'taylor',boothId:'b4',sectionId:'sec4',date:'2026-09-18',startedAt:'2026-09-18T14:00:00Z',endedAt:null}]},
    definitions:[]
  };
}
function build(x){return Forecast.build({state:x.state,section:x.section,students:x.students,day:'2026-09-18',definitions:x.definitions});}

test('Class Pulse separates attendance, active work, action needs, and occupied booths',()=>{let f=build(fixture());assert.deepEqual(f.pulse,{present:2,working:2,needYouNow:2,activeBooths:1,totalStudents:3})});
test('temporary pass records do not change attendance or booth position',()=>{let x=fixture();x.state.passes=[{studentId:'taylor',sectionId:'sec4',returnedAt:null}];let f=build(x),t=f.positions.find(p=>p.studentId==='taylor');assert.equal(t.present,true);assert.equal(t.booth.name,'Booth 4')});
test('Ready to Work is excluded from Needs You Now',()=>{let f=build(fixture());assert(!f.needs.some(item=>item.studentId==='taylor'));assert(f.needs.some(item=>item.studentId==='riley'&&item.need==='Needs Material'));assert(f.needs.some(item=>item.studentId==='jordan'&&item.need==='Needs Next Project'))});
test('checkpoint review uses existing derived need without overwriting manual need',()=>{let x=fixture(),p=x.students[0].projects[0];p=Bank.setNeed(p,'Needs Demonstration',{source:'Instructor',timestamp:'2026-09-18T14:05:00Z'});p=Checkpoints.transition(p,'layout_measurement','ready_for_review',{timestamp:'2026-09-18T14:06:00Z',date:'2026-09-18'});x.students[0].projects[0]=p;let f=build(x),t=f.needs.find(item=>item.studentId==='taylor');assert.equal(t.need,'Instructor Review — Layout & Measurement');assert.equal(x.students[0].projects[0].currentNeed,'Needs Demonstration')});
test('Up Next is the next defined checkpoint after current position',()=>{let f=build(fixture()),t=f.upNext.find(item=>item.studentId==='taylor');assert.equal(t.next.label,'Instructor Check');assert.equal(t.next.detail,'Fit-Up')});
test('soft-removed booth is not presented as current Shop Position',()=>{let x=fixture();x.state.booths[0].removedAt='2026-09-18T15:00:00Z';let t=build(x).positions.find(item=>item.studentId==='taylor');assert.equal(t.booth,null)});
test('forecast derivation is read-only and creates no new source of truth',()=>{let x=fixture(),before=JSON.stringify(x);build(x);assert.equal(JSON.stringify(x),before)});
test('completed checkpoint sequence yields deterministic project completion requirement',()=>{let x=fixture(),p=x.students[0].projects[0];Checkpoints.definitions().forEach(c=>{p=Checkpoints.transition(p,c.id,'verified',{timestamp:'2026-09-18T15:00:00Z',date:'2026-09-18'});});x.students[0].projects[0]=p;let t=build(x).upNext.find(item=>item.studentId==='taylor');assert.equal(t.next.label,'Next Project Requirement')});

if(!process.exitCode)console.log('PASS '+passed+' Class Forecast v1 tests');
