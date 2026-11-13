const assert=require('assert');
const fs=require('fs');
const Attendance=require('../src/arc_v8_attendance');
const Activity=require('../src/arc_v8_activity');
const Gradebook=require('../src/arc_v8_gradebook');
const Workplace=require('../src/arc_v8_workplace_safety');

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

test('assignment ledger converges assigned, awaiting, makeup, excused, withdrawn, completed, and corrected occurrences',()=>{
  const ledger=Gradebook.assignmentLedger({
    definitions:[{definitionId:'d',type:'Technical Assignment',title:'Measurement Worksheet'}],
    versions:[{versionId:'v',definitionId:'d',titleSnapshot:'Measurement Worksheet'}],
    assignments:['assigned','awaiting','makeup','excused','withdrawn','completed'].map((id,index)=>({assignmentId:'a-'+id,versionId:'v',sectionId:index%2?'sec-awt-6':'sec-wt-4',assignedDate:`2026-11-${String(10+index).padStart(2,'0')}`})),
    studentActivities:[
      {studentActivityId:'sa-assigned',assignmentId:'a-assigned',versionId:'v',studentId:'s',workflowState:'Assigned',assignmentState:'active'},
      {studentActivityId:'sa-awaiting',assignmentId:'a-awaiting',versionId:'v',studentId:'s',workflowState:'Pending Instructor Review',assignmentState:'active'},
      {studentActivityId:'sa-makeup',assignmentId:'a-makeup',versionId:'v',studentId:'s',workflowState:'Pending Make-Up',assignmentState:'active'},
      {studentActivityId:'sa-excused',assignmentId:'a-excused',versionId:'v',studentId:'s',workflowState:'Excused',assignmentState:'active'},
      {studentActivityId:'sa-withdrawn',assignmentId:'a-withdrawn',versionId:'v',studentId:'s',workflowState:'Assigned',assignmentState:'withdrawn'},
      {studentActivityId:'sa-completed',assignmentId:'a-completed',versionId:'v',studentId:'s',workflowState:'Completed',assignmentState:'active'}
    ],
    results:[
      {assessmentResultId:'r-old',studentId:'s',studentActivityId:'sa-completed',pointsEarned:7,pointsPossible:10,percentage:70,finalizedAt:'2026-11-15T10:00:00Z'},
      {assessmentResultId:'r-new',studentId:'s',studentActivityId:'sa-completed',pointsEarned:0,pointsPossible:10,percentage:0,finalizedAt:'2026-11-16T10:00:00Z',supersedesAssessmentResultId:'r-old'}
    ]
  });
  assert.equal(ledger.length,7);
  assert.deepEqual(ledger.map(x=>x.status),['Assigned','Awaiting grade','Make-up','Excused','Withdrawn','Corrected — prior score','Corrected — current score']);
  assert.equal(ledger.at(-1).pointsEarned,0);
  assert.equal(ledger.at(-1).assignmentDate,'2026-11-15');
  assert.equal(ledger.at(-1).sectionId,'sec-awt-6');
  assert.equal(ledger.find(x=>x.status==='Awaiting grade').pointsEarned,null);
});

test('daily Workplace rows produce one visible provisional weekly total without double counting',()=>{
  const summary=Workplace.provisionalWeekSummary([
    {day:{workplaceDayId:'d1',revision:1},result:{workplaceDayId:'d1',schoolDate:'2026-11-09',applicable:true,earned:9,possible:10,percentage:90}},
    {day:{workplaceDayId:'d1',revision:2},result:{workplaceDayId:'d1',schoolDate:'2026-11-09',applicable:true,earned:8,possible:10,percentage:80}},
    {day:{workplaceDayId:'d2',revision:1},result:{workplaceDayId:'d2',schoolDate:'2026-11-10',applicable:true,earned:10,possible:10,percentage:100}},
    {day:{workplaceDayId:'d3',revision:1},result:{workplaceDayId:'d3',schoolDate:'2026-11-11',applicable:false,earned:null,possible:0,percentage:null}}
  ]);
  assert.deepEqual([summary.earned,summary.possible,summary.percentage],[18,20,90]);
  assert.equal(summary.dayResults.length,2);
  assert.equal(summary.finalized,false);
  assert.equal(summary.doubleCountPrevented,true);
});

test('Quarter 2 and the existing approved WT/AWT policy resolve without creating a duplicate policy',()=>{
  const periods=[
    {gradingPeriodId:'semester',semesterId:'s1',startDate:'2026-08-01',endDate:'2026-12-20',order:1,lifecycle:'active'},
    {gradingPeriodId:'q2',semesterId:'s1',code:'Q2',startDate:'2026-10-20',endDate:'2026-12-20',order:2,lifecycle:'active'}
  ];
  const policies=[
    {gradebookPolicyVersionId:'draft',policyKey:'WT-AWT',versionNumber:2,courseIds:['arc-course-wt','arc-course-awt'],lifecycle:'draft',approvedAt:null},
    {gradebookPolicyVersionId:'approved',policyKey:'WT-AWT',versionNumber:1,courseIds:['arc-course-wt','arc-course-awt'],lifecycle:'approved',approvedAt:'2026-10-14T12:00:00Z'}
  ];
  assert.equal(Gradebook.resolveCurrentPeriod(periods,'2026-11-10','s1').gradingPeriodId,'q2');
  assert.equal(Gradebook.resolveApprovedPolicy(policies,['arc-course-wt','arc-course-awt']).gradebookPolicyVersionId,'approved');
  assert.equal(policies.length,2);
});

test('zero-policy production shape exposes the frozen proposal but requires explicit instructor establishment',()=>{
  let blocked=Gradebook.approvedClassroomPolicyPlan([],{instructorAuthorized:false,confirmation:''});
  assert.deepEqual([blocked.allowed,blocked.code],[false,'EXPLICIT_POLICY_CONFIRMATION_REQUIRED']);
  let plan=Gradebook.approvedClassroomPolicyPlan([],{instructorAuthorized:true,confirmation:'ESTABLISH APPROVED WT-AWT POLICY'});
  assert.equal(plan.allowed,true);
  assert.deepEqual(plan.policy.categoryWeights,Gradebook.DEFAULT_WEIGHTS);
  assert.equal(plan.policy.provenance.explicitInstructorAction,true);
  assert.equal(Gradebook.resolveApprovedPolicy([],['arc-course-wt','arc-course-awt']),null);
});

test('normal shell exposes the completed ledger, visible Workplace progress, policy diagnostics, History safeguards, and eager logo',()=>{
  const html=fs.readFileSync('index.html','utf8');
  for(const token of ['No Work Completed — 0/10','recordNoWorkCompletedForStudent','showOwnedActivityEditor','assignOwnedActivity','Assignment ledger','Daily Workplace & provisional week','gradebookConfiguration','Source Gradebook ledger available','Official weighted/current grades are not calculated or posted','requiresPreservedGradeConfirmation','fetchpriority="high"','Not Returned — Class Ended'])assert(html.includes(token),token);
  assert(fs.readFileSync('src/arc_v8_gradebook.js','utf8').includes('ESTABLISH APPROVED WT-AWT POLICY'));
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
  assert(build.includes('coordinated-classroom-repair-10-findings-3'));
  assert(closure.buildIdentity.endsWith('coordinated-classroom-repair-10-findings-3-batch-b-multi-section-startup-repair-1-technical-score-atomic-repair-1-technical-display-parity-repair-1-classroom-workflow-sweep-repair-1-classroom-navigation-history-repair-1-classroom-reporting-integrity-repair-1'));
});

if(!process.exitCode)console.log(`\n${passed}/${total} coordinated classroom repair tests passed.`);
