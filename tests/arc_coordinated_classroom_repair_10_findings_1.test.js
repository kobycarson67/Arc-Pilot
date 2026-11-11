const assert=require('assert');
const fs=require('fs');
const Attendance=require('../src/arc_v8_attendance');
const Activity=require('../src/arc_v8_activity');
const Gradebook=require('../src/arc_v8_gradebook');

let passed=0,total=0;
function test(name,fn){total++;try{fn();passed++;console.log('PASS',name);}catch(error){console.error('FAIL',name,error);process.exitCode=1;}}

test('open pass display stops at the section end and preserves accountability',()=>{
  const row=Attendance.projectPassTimeline({outAt:'2026-11-10T14:30:00.000Z',returnedAt:null},{asOf:'2026-11-11T14:25:00.000Z',sectionEndAt:'2026-11-10T15:15:00.000Z'});
  assert.equal(row.durationMinutes,45);
  assert.equal(row.actualDurationMinutes,null);
  assert.equal(row.accountabilityState,'Not Returned — Class Ended');
  assert.equal(row.classEndedWithoutTimelyReturn,true);
});

test('actual late return remains recorded while display duration stays class-bound',()=>{
  const row=Attendance.projectPassTimeline({outAt:'2026-11-10T14:30:00.000Z',returnedAt:'2026-11-11T14:25:00.000Z'},{sectionEndAt:'2026-11-10T15:15:00.000Z'});
  assert.equal(row.durationMinutes,45);
  assert.equal(row.actualDurationMinutes,1435);
  assert.equal(row.displayEndAt,'2026-11-10T15:15:00.000Z');
});

test('attendance recommendations require instructor judgment and never score automatically',()=>{
  assert.equal(Activity.attendanceRecommendation('Present').state,'awaiting_score');
  assert.equal(Activity.attendanceRecommendation('Unexcused Absence').state,'recommended_zero');
  assert.equal(Activity.attendanceRecommendation('Excused Absence').state,'makeup_or_exempt');
  assert.equal(Activity.attendanceRecommendation('').state,'attendance_review');
});

test('numeric zero is a completed score and blank is not zero',()=>{
  const zero=Activity.scoreTransition({pointsEarned:'0',pointsPossible:10,workflowState:'Assigned',instructorConfirmed:true});
  const blank=Activity.scoreTransition({pointsEarned:'',pointsPossible:10,workflowState:'Assigned',instructorConfirmed:true});
  assert.equal(zero.ok,true);
  assert.equal(zero.pointsEarned,0);
  assert.equal(zero.workflowState,'Completed');
  assert.equal(blank.ok,false);
  assert.equal(blank.code,'BLANK_SCORE');
});

test('active scoring queue excludes completed and withdrawn recipients',()=>{
  const rows=Activity.activeScoringQueue([
    {id:'active',recipients:[{workflowState:'Assigned'}]},
    {id:'complete',recipients:[{workflowState:'Completed'}]},
    {id:'withdrawn',assignmentState:'withdrawn',recipients:[{workflowState:'Assigned'}]}
  ]);
  assert.deepEqual(rows.map(x=>x.id),['active']);
});

test('current grading period resolves the narrow quarter over its containing semester',()=>{
  const period=Gradebook.resolveCurrentPeriod([
    {gradingPeriodId:'semester',semesterId:'s',startDate:'2026-08-01',endDate:'2026-12-20'},
    {gradingPeriodId:'q2',semesterId:'s',startDate:'2026-10-20',endDate:'2026-12-20'}
  ],'2026-11-10','s');
  assert.equal(period.gradingPeriodId,'q2');
});

test('assignment ledger exposes title date section and score without inventing rows',()=>{
  const ledger=Gradebook.assignmentLedger({
    definitions:[{definitionId:'d',type:'Technical Assignment',title:'Measurement Worksheet'}],
    versions:[{versionId:'v',definitionId:'d',titleSnapshot:'Measurement Worksheet'}],
    assignments:[{assignmentId:'a',versionId:'v',sectionId:'sec-4',assignedDate:'2026-11-10'}],
    studentActivities:[{studentActivityId:'sa',assignmentId:'a',versionId:'v',studentId:'s'}],
    results:[{assessmentResultId:'r',studentId:'s',studentActivityId:'sa',pointsEarned:0,pointsPossible:10,percentage:0,finalizedAt:'2026-11-10T10:00:00Z'}]
  });
  assert.equal(ledger.length,1);
  assert.equal(ledger[0].title,'Measurement Worksheet');
  assert.equal(ledger[0].assignmentDate,'2026-11-10');
  assert.equal(ledger[0].sectionId,'sec-4');
  assert.equal(ledger[0].pointsEarned,0);
});

test('normal shell contains explicit workplace zero, working activity libraries, ledger, and eager logo',()=>{
  const html=fs.readFileSync('index.html','utf8');
  for(const token of ['No Work Completed — 0/10','recordNoWorkCompletedForStudent','showOwnedActivityEditor','assignOwnedActivity','Assignment ledger','fetchpriority="high"','Not Returned — Class Ended'])assert(html.includes(token),token);
  assert(html.includes("publicationState:'Approved'"));
  assert(html.includes('Create Approved Definition'));
  assert(html.includes('Existing review-only starter drafts remain locked'));
});

test('dual-period Batch B projection binds reads to the selected exact section',()=>{
  const source=fs.readFileSync('src/arc_batch_b_projection.js','utf8');
  assert(source.includes('scopeForStudent(input.studentId,input.sectionId)'));
  assert(source.includes('x.sectionId===scope.sectionId'));
});

test('runtime identity and authority closure advance together',()=>{
  const build=fs.readFileSync('app-build.js','utf8');
  const closure=JSON.parse(fs.readFileSync('runtime/arc_authority_closure_v1.json','utf8'));
  assert(build.includes('coordinated-classroom-repair-10-findings-1'));
  assert(closure.buildIdentity.endsWith('coordinated-classroom-repair-10-findings-1'));
});

if(!process.exitCode)console.log(`\n${passed}/${total} coordinated classroom repair tests passed.`);
