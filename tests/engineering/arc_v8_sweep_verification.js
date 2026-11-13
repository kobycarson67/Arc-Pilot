/* Synthetic owner-level verification only. Never imports classroom records. */
(function(root,factory){var r=typeof require==='function'?require:null;var api=factory(root.ArcV8Storage||(r&&r('../../src/arc_v8_storage')),root.ArcV8Academic||(r&&r('../../src/arc_v8_academic')),root.ArcV8Activity||(r&&r('../../src/arc_v8_activity')),root.ArcV8Project||(r&&r('../../src/arc_v8_project')),root.ArcV8Gradebook||(r&&r('../../src/arc_v8_gradebook')));if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcV8SweepVerification=api;}(this,function(Storage,Academic,Activity,Project,Gradebook){'use strict';
const DB='arc_classroom_v8_sweep_verification',MARKER='arc-synthetic-sweep-v3',S=Storage.STORES;
function fail(code,message){throw Object.assign(new Error(message),{code});}
function check(value,message){if(!value)fail('SWEEP_ASSERTION_FAILED',message);}
async function rejects(fn,code){try{await fn();}catch(e){if(e.code!==code)throw Object.assign(new Error('Expected '+code+', got '+e.code+': '+e.message),{code:'SWEEP_EXPECTATION_MISMATCH',expectedCode:code,actualCode:e.code,actualName:e.name,actualMessage:e.message,causeStack:e.stack});return;}fail('SWEEP_ASSERTION_FAILED','Expected rejection '+code);}
function create(options){options=options||{};if(options.databaseName&&options.databaseName!==DB)fail('ISOLATION_REQUIRED','Only the fixed synthetic sweep database is allowed.');
let owner,db,services,running=false;
async function open(){if(db)return db;owner=options.storageFactory?options.storageFactory(DB):Storage.create({databaseName:DB,build:{version:MARKER,build:'isolated-synthetic'}});if(!owner.constants||owner.constants.databaseName!==DB)fail('ISOLATION_REQUIRED','Storage factory returned a competing database.');db=await owner.open();let storage={};for(const k of ['read','add','put','delete','query','transaction','close'])storage[k]=db[k].bind(db);storage.generateId=()=>owner.generateId();services={academic:Academic.create({storage,actor:MARKER}),activity:Activity.create({storage,actor:MARKER}),project:Project.create({storage,actor:MARKER}),gradebook:Gradebook.create({storage,actor:MARKER})};return db;}
async function inventory(){await open();let counts={};for(const name of Object.values(Storage.STORES))counts[name]=(await db.query(name)).length;return counts;}
async function inspect(){let counts=await inventory(),marker=await db.read(S.infrastructure,MARKER);let domain=Object.entries(counts).filter(([n])=>![S.metadata,S.migrations].includes(n)).reduce((n,x)=>n+x[1],0);if(!domain)return {status:'empty',databaseName:DB,counts};if(!marker||marker.synthetic!==true||marker.databaseName!==DB||marker.version!==3)fail('UNKNOWN_DATA','Nonempty or unrecognized database is not a sweep fixture. Nothing was imported or reset.');return {status:marker.state,databaseName:DB,counts,report:marker.report||null};}
async function run(){if(running)fail('SWEEP_BUSY','A sweep is already running.');running=true;let marker,results=[],stage='inspect';
try{let prior=await inspect();if(prior.status!=='empty')fail('NONEMPTY_FIXTURE','This sweep is single-use. Existing data is preserved; inspect the prior result.');marker={id:MARKER,synthetic:true,databaseName:DB,version:3,state:'running',startedAt:new Date().toISOString()};await db.add(S.infrastructure,marker);
stage='synthetic academic fixture';const A=services.academic,T=services.activity,P=services.project;
const courses=await A.initialize(),course=courses.find(x=>x.code==='WT');
const year=await A.createSchoolYear({label:'SYNTHETIC SWEEP 2026-27',startDate:'2026-08-01',endDate:'2027-07-31'});
const semester=await A.createSemester({schoolYearId:year.schoolYearId,code:'S1',label:'Synthetic Semester',startDate:'2026-08-01',endDate:'2026-12-31',order:1});
const section=await A.createSection({courseId:course.courseId,schoolYearId:year.schoolYearId,semesterId:semester.semesterId,period:'4',displayName:'SYNTHETIC ONLY'});
const student=await A.createStudent({preferredName:'SYNTHETIC',legalFirstName:'Sweep',legalLastName:'Fixture',gradeLevel:'11'});
const en=await A.createEnrollment({studentId:student.studentId,courseId:course.courseId,schoolYearId:year.schoolYearId,enrollmentStart:'2026-08-01'});
await A.createScheduleAssignment({enrollmentId:en.enrollmentId,sectionId:section.sectionId,effectiveFrom:'2026-08-01'});
async function assigned(type,extra){let d=await T.createDefinition({type,title:'SYNTHETIC '+type,courseIds:[course.courseId]}),v=await T.createVersion(Object.assign({definitionId:d.definitionId,versionNumber:1,publicationState:'Approved'},extra||{})),a=await T.assign({versionId:v.versionId,origin:'Individual',assignedDate:'2026-11-13',recipients:[{studentId:student.studentId,enrollmentId:en.enrollmentId}]});return {d,v,sa:a.studentActivities[0]};}
stage='Practice assignment';let practice=await assigned('Practice');check(practice.v.grading.graded===false,'Practice must remain ungraded');await T.transitionStudentActivity(practice.sa.studentActivityId,practice.sa.revision,'In Progress');results.push('Practice definition/version/assignment and In Progress; ungraded policy preserved');
stage='Challenge version and attempt';let challenge=await assigned('Skill Challenge');check(challenge.v.grading.conversion[3]===90,'Challenge default conversion');let attempt=await T.createAttempt({studentActivityId:challenge.sa.studentActivityId});check(attempt.sequence===1,'First attempt');await rejects(()=>T.updateDraftVersion(challenge.v.versionId,challenge.v.revision,{instructions:'rewrite used version'}),'HISTORICAL_LOCK');let v2=await T.createVersion({definitionId:challenge.d.definitionId,versionNumber:2,publicationState:'Approved'});check(v2.versionId!==challenge.v.versionId,'New immutable version');check((await db.read(S.studentActivities,challenge.sa.studentActivityId)).versionId===challenge.v.versionId,'Existing assignment retains original version');results.push('Challenge assignment/attempt and used-version lock; new version retains assignment lineage');
stage='Project checkpoints';let project=await assigned('Project',{projectCheckpoints:[{code:'fit',name:'Fit-Up',order:1}]});let x=await P.createProject({studentActivityId:project.sa.studentActivityId}),base={projectId:x.project.projectId,buildId:x.build.buildId,checkpointCode:'fit'};
await P.appendCheckpointEvent(Object.assign({},base,{eventType:'Started'}));await P.appendCheckpointEvent(Object.assign({},base,{eventType:'Ready for Review'}));check((await P.operationalState(base.projectId)).waitingForReview,'Review requested');
await P.appendCheckpointEvent(Object.assign({},base,{eventType:'Needs More Work'}));check(!(await P.operationalState(base.projectId)).waitingForReview,'Review cleared');await P.appendCheckpointEvent(Object.assign({},base,{eventType:'Verified'}));check((await db.query(S.projectCheckpointEvents)).length===4,'Four checkpoint events preserved');results.push('Project checkpoint Started / Review / Needs More Work / Verified with preserved events');
stage='Project rubric and finalization';const criteria=[['measurement_accuracy',80],['fit_up_fabrication',90],['welding_quality',100],['workmanship_finished_quality',70]].map(x=>({criterionCode:x[0],score:x[1]}));
let rubric=await P.recordRubric({projectId:base.projectId,rubricVersion:'project-v1',criteria});check(rubric.derivedPercent===85,'Rubric weighting');
let corrected=await P.recordRubric({projectId:base.projectId,rubricVersion:'project-v1',criteria,supersedesRubricAssessmentId:rubric.rubricAssessmentId,correctionReason:'SYNTHETIC correction'});check(corrected.supersedesRubricAssessmentId===rubric.rubricAssessmentId,'Correction lineage');
let state=await P.transitionProject(base.projectId,x.project.revision,'In Progress');state=await P.transitionProject(base.projectId,state.revision,'Ready for Final Assessment');let done=await P.finalizeProject({projectId:base.projectId,expectedProjectRevision:state.revision});check(done.project.workflowState==='Finalized','Finalized');await rejects(()=>P.restartBuild({projectId:base.projectId,expectedProjectRevision:done.project.revision,expectedBuildRevision:done.build.revision,authorized:true}),'PROJECT_FINALIZED');results.push('Project weighted rubric/correction/finalization; finalized restart rejected');
for(const store of [S.evidenceRecords,S.gradebookEntries,S.activityDeclarations])check((await db.query(store)).length===0,'No automatic evidence, ledger entry or declaration: '+store);
results.push('No automatic competency Evidence, gradebook entries, or declarations');
stage='Challenge scoring and gradebook revision';const G=services.gradebook;
const period=await A.createGradingPeriod({semesterId:semester.semesterId,schoolYearId:year.schoolYearId,code:'Q1',label:'Synthetic Quarter',startDate:'2026-08-01',endDate:'2026-12-31',order:1});
const policy=await G.createPolicy({policyKey:'SYNTHETIC-SWEEP-ONLY',versionNumber:1,courseIds:[course.courseId],approvedBy:MARKER,provenance:{synthetic:true,purpose:'isolated service test only'}});
attempt=await T.transitionAttempt(attempt.attemptId,attempt.revision,'Finalized');
const fin=await G.finalizeActivityAssessment({attemptId:attempt.attemptId,demonstratedLevel:2}),result=await G.createAssessmentResultFromActivity({activityAssessmentFinalizationId:fin.activityAssessmentFinalizationId});
check(result.pointsEarned===75&&result.pointsPossible===100,'Challenge level conversion');
const entry=await G.createGradebookEntry({studentId:student.studentId,enrollmentId:en.enrollmentId,gradingPeriodId:period.gradingPeriodId,assessmentResultId:result.assessmentResultId,instructionalWeekId:'SYNTHETIC-WEEK'});
let nextAttempt=await T.createAttempt({studentActivityId:challenge.sa.studentActivityId,type:'Reassessment'});
nextAttempt=await T.transitionAttempt(nextAttempt.attemptId,nextAttempt.revision,'Finalized');
const nextFin=await G.finalizeActivityAssessment({attemptId:nextAttempt.attemptId,demonstratedLevel:3}),nextResult=await G.createAssessmentResultFromActivity({activityAssessmentFinalizationId:nextFin.activityAssessmentFinalizationId});
const accepted=await G.acceptAssessmentResult({gradebookEntryId:entry.entry.gradebookEntryId,assessmentResultId:nextResult.assessmentResultId,expectedEntryRevision:entry.entry.revision,reason:'Reassessment'});
check(accepted.accepted!==false&&accepted.revision.sequence===2,'Accepted reassessment append');
check((await db.query(S.gradebookRevisions,'by_entry',entry.entry.gradebookEntryId)).length===2,'Original ledger revision preserved');
await rejects(()=>G.acceptAssessmentResult({gradebookEntryId:entry.entry.gradebookEntryId,assessmentResultId:result.assessmentResultId,expectedEntryRevision:1,reason:'Reassessment'}),'WRITE_CONFLICT');
results.push('Explicit Challenge level2=75 then reassessment level3=90; finalized results and append-only gradebook revision; stale update rejected');
stage='Manual posting state machine';const query={gradingPeriodId:period.gradingPeriodId,postingSourceKey:'synthetic:challenge',studentId:student.studentId};
check((await G.deriveSynchronizationAction(query)).action==='Create Assignment','Posting absent');
const posting=await G.createPostingInstance({gradingPeriodId:period.gradingPeriodId,postingSourceKey:query.postingSourceKey,externalTitle:'SYNTHETIC ONLY - no external service',externalPointsPossible:100,postingType:'Assignment'});
check((await G.deriveSynchronizationAction(query)).action==='Add Student','Posting no membership');
const membership=await G.addPostingMembership({postingInstanceId:posting.postingInstanceId,studentId:student.studentId,gradebookEntryId:entry.entry.gradebookEntryId,postingSourceKey:query.postingSourceKey});
check((await G.deriveSynchronizationAction(query)).action==='Update Grade','Unposted membership');
await rejects(()=>G.recordPostingEvent({postingMembershipId:membership.postingMembershipId,expectedMembershipRevision:membership.revision,gradebookEntryRevisionId:accepted.revision.gradebookEntryRevisionId}),'MANUAL_CONFIRMATION_REQUIRED');
await G.recordPostingEvent({postingMembershipId:membership.postingMembershipId,expectedMembershipRevision:membership.revision,gradebookEntryRevisionId:accepted.revision.gradebookEntryRevisionId,externalPoints:90,confirmedManualAction:true,actionType:'Posted'});
check((await G.deriveSynchronizationAction(query)).action==='Synchronized','Explicit synthetic manual posting');
await G.calculateCurrentGrade({studentId:student.studentId,enrollmentId:en.enrollmentId,gradingPeriodId:period.gradingPeriodId,gradebookPolicyVersionId:policy.gradebookPolicyVersionId});
results.push('Synthetic policy/current-grade calculation and manual-posting record state machine; missing manual confirmation rejected; no external call');
stage='Evidence declaration historical lock';let declaration=await T.createDeclaration({versionId:v2.versionId,evidenceMode:'Challenge/Assignment',defaultQualification:'Qualifying',competencyRef:{code:'SYNTHETIC-COMPETENCY'}});
declaration=await T.updateDeclaration(declaration.declarationId,declaration.revision,{sourcePoint:'synthetic unused edit'});await rejects(()=>T.updateDeclaration(declaration.declarationId,1,{sourcePoint:'stale'}),'WRITE_CONFLICT');
await T.assign({versionId:v2.versionId,origin:'Individual',assignedDate:'2026-11-13',recipients:[{studentId:student.studentId,enrollmentId:en.enrollmentId}]});
await rejects(()=>T.updateDeclaration(declaration.declarationId,declaration.revision,{sourcePoint:'changed'}),'HISTORICAL_LOCK');
const beforeDeclaration=await db.read(S.activityDeclarations,declaration.declarationId);
check(beforeDeclaration.sourcePoint==='synthetic unused edit'&&beforeDeclaration.revision===2,'Used declaration rejection preserves bytes');
const draft=await T.createVersion({definitionId:challenge.d.definitionId,versionNumber:3,publicationState:'Draft'});
const draftEdited=await T.updateDraftVersion(draft.versionId,draft.revision,{instructions:'synthetic editable draft'});
check(draftEdited.revision===2,'Unused draft native edit succeeds');
await rejects(()=>T.updateDraftVersion(draft.versionId,1,{instructions:'stale'}),'WRITE_CONFLICT');
check((await db.read(S.activityVersions,draft.versionId)).instructions==='synthetic editable draft','Conflict preserves Draft');
results.push('Native transaction dependency coverage: unused declaration/Draft edits succeed; used declaration lock and stale conflicts preserve prior rows');
check((await db.query(S.evidenceRecords)).length===0,'Declaration must not manufacture Evidence');
results.push('Explicit activity evidence declaration and used-version declaration lock; no competency Evidence manufactured');
let report={passed:true,evidenceLevel:'V8 owner services using provided storage; not normal classroom UI certification',results,notTested:['Real external posting','Competency Evidence observation/qualification','Quarter-close approval','Normal Live UI','Media','Administration documents'],counts:await inventory()};marker.state='complete';marker.report=report;marker.finishedAt=new Date().toISOString();await db.put(S.infrastructure,marker);return report;
}catch(e){if(marker){marker.state='failed';marker.error={stage,code:e.code||e.name,message:e.message,expectedCode:e.expectedCode||null,actualCode:e.actualCode===undefined?null:e.actualCode,actualName:e.actualName||null,actualMessage:e.actualMessage||null,stack:e.causeStack||e.stack||null};marker.report={passed:false,evidenceLevel:'V8 owner services; not normal UI certification',results:results.slice(),failedStage:stage,error:marker.error};await db.put(S.infrastructure,marker);}throw e;}finally{running=false;}}
return {databaseName:DB,inspect,run,close:()=>{if(db)db.close();db=null;}};
}
return {create,DATABASE_NAME:DB,MARKER};
}));






