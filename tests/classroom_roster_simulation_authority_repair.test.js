const assert=require('assert');
const fs=require('fs');
const Bank=require('../src/project_bank');
const Fixtures=require('../src/simulation_fixtures');
const Projection=require('../src/arc_academic_consumer_projection');
const AcademicAdapter=require('../src/arc_academic_authority_adapter');

let passed=0;
async function test(name,fn){await fn();passed++;console.log('PASS '+name);}
function base(){return {schemaVersion:7,academicYear:'2026-27',semester:'Semester 1',course:'wt',activeSectionId:'s1',sections:[{id:'s1',name:'AWT 1',course:'awt',period:1},{id:'s2',name:'WT 2',course:'wt',period:2},{id:'s3',name:'WT 3',course:'wt',period:3},{id:'s5',name:'AWT 5',course:'awt',period:5},{id:'s6',name:'WT 6',course:'wt',period:6},{id:'s7',name:'WT 7',course:'wt',period:7}],classes:{wt:[],awt:[]},projectBank:Bank.starterDefinitions(),booths:Array.from({length:12},(_,i)=>({id:'b'+(i+1),name:'Booth '+(i+1),removedAt:null})),attendanceRecords:{},passLog:[],boothAssignments:[],boothIssues:[],notifications:[],photoEvidence:[]};}

(async()=>{
const html=fs.readFileSync('index.html','utf8');

await test('all five canonical fictional scenarios project their seeded rosters',()=>{
  const expected={'test-1':8,'test-2':12,'test-3':10,'test-4':9,presentation:28};
  for(const [id,count] of Object.entries(expected)){
    const state=Fixtures.create(id,base()),view=Projection.fromLegacy(state,{day:Fixtures.DAY,selectedSectionId:state.activeSectionId});
    assert.equal(view.students.length,count,id+' directory count');
    assert(view.rosterForSection(state.activeSectionId).length>0,id+' selected roster');
    assert.equal(view.sections.length,6,id+' Section count');
  }
});

await test('simulation authority is selected before live v8 projection and mutation adapters',()=>{
  assert.match(html,/academicAuthorityMode === "V8_AUTHORITATIVE" && !simulationScenarioAuthorityActive\(\) \? academicAuthorityRuntime\.projectionCache/);
  assert.match(html,/routeAcademicAuthority[^\n]+simulationScenarioAuthorityActive\(\)\) return legacyMutation\(payload\)/);
  assert.match(html,/routeScheduleAuthority[^\n]+simulationScenarioAuthorityActive\(\)\) return legacyMutation\(payload\)/);
  assert.match(html,/routeAttendanceAuthority[^\n]+simulationScenarioAuthorityActive\(\)\) return legacyMutation\(payload\)/);
  assert.match(html,/function p6RouteLegacy[\s\S]*?if \(simulationScenarioAuthorityActive\(\)\) return p6LegacyHandlers/);
  assert.match(html,/function p8RouteLegacy[\s\S]*?simulationScenarioAuthorityActive\(\) \? p8LegacyHandlers/);
  assert.match(html,/function batchAAuthorityActive\(\) \{ return !simulationScenarioAuthorityActive\(\)/);
  assert.match(html,/function batchBAuthorityActive\(\) \{ return !simulationScenarioAuthorityActive\(\)/);
});

await test('roster actions await confirmed persistence and retain actionable failures',()=>{
  const add=html.slice(html.indexOf('async function addExistingStudentToSection'),html.indexOf('async function createStudentInSection'));
  const create=html.slice(html.indexOf('async function createStudentInSection'),html.indexOf('function moveStudentToSection'));
  const drop=html.slice(html.indexOf('async function dropStudentConfirmed'),html.indexOf('const BOOTH_STATUSES'));
  assert.match(add,/await moveStudentToSection/);
  assert.match(add,/catch \(err\)/);
  assert(add.indexOf('await moveStudentToSection')<add.indexOf('closeRosterManager'));
  assert.match(create,/await routeAcademicAuthority/);
  assert.match(create,/catch \(err\)/);
  assert.match(create,/source: simulationScenarioAuthorityActive\(\) \? "fictional_simulation" : "normal_arc"/);
  assert.match(drop,/await routeAcademicAuthority/);
  assert.match(drop,/catch \(error\)/);
  assert.match(html,/role="\$\{writeStatus\.available \? "status" : "alert"\}"/);
});

await test('Live Classroom remains closed without exact real Student authorization',()=>{
  const status=html.slice(html.indexOf('function studentRosterMutationStatus'),html.indexOf('function assertStudentRosterMutationAvailable'));
  assert.match(status,/record\.realStudentDataAuthorized === true/);
  assert.match(status,/REAL_STUDENT_DATA_NOT_AUTHORIZED/);
  assert.doesNotMatch(status,/fictionalStudentDataAuthorized/);
  assert.match(html,/Live student enrollment is not available yet/);
});

await test('cold Simulation reload rehydrates accepted academic authority before Live render',()=>{
  const leave=html.slice(html.indexOf('async function leaveSimulation'),html.indexOf('function resetCurrentSimulation'));
  assert.match(leave,/state = migrateStateData\(restored\.state, CURRENT_SCHEMA_VERSION\)/);
  assert.match(leave,/academicAuthorityStartupState === "SIMULATION_ISOLATED"/);
  assert.match(leave,/await resolveAcademicAuthorityBeforeStartup\(\)/);
  assert(leave.indexOf('await resolveAcademicAuthorityBeforeStartup()')<leave.indexOf('renderRestoredNavigation(restored.navigation)'));
  assert.match(leave,/simulationActive\(\) \? "ARC could not leave the simulation safely/);
});

await test('production adapter refuses a closed gate and accepts an independently verified fictional harness gate',async()=>{
  const activationGate={record:{realStudentDataAuthorized:false}},calls=[];
  const options={authorityState:'V8_AUTHORITATIVE',databaseName:'arc_classroom_v8',academic:{createStudentPlacement:async payload=>{calls.push(payload);return payload;}},projection:{},storage:{},projectionCache:{invalidate(){},get(){}},activationGate,verifyActivationGate:value=>value===activationGate,resolveProductContext:async()=>({effectiveFrom:'2026-10-16'})};
  const closed=AcademicAdapter.create(options);
  await assert.rejects(()=>closed.runV8('create-student-placement',{sectionId:'fictional-section'}),error=>error.code==='REAL_STUDENT_DATA_NOT_AUTHORIZED');
  assert.equal(calls.length,0);
  const fictionalGate={record:{fictionalStudentDataAuthorized:true}},open=AcademicAdapter.create({...options,studentWriteGate:fictionalGate,verifyStudentWriteGate:value=>value===fictionalGate});
  await open.runV8('create-student-placement',{sectionId:'fictional-section',preferredName:'Fictional Learner'});
  assert.equal(calls.length,1);
});

console.log(`${passed}/${passed} Classroom Roster and Simulation Authority Repair tests passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
