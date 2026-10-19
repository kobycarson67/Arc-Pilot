/* ARC Integrated Classroom Completion - inert readiness and Administration projections. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcClassroomCompletionReadiness=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function clone(x){return JSON.parse(JSON.stringify(x));}
  function list(x){return Array.isArray(x)?x:[];}
  var DOMAINS=Object.freeze([
    ['P4','Students / Enrollment','ArcAcademicAuthorityAdapter'],['P5','Attendance / Passes','ArcAttendanceAuthorityAdapter'],
    ['P6','Projects / Activities / Technical','ArcProjectTechnicalAuthorityAdapter'],['P7','Competency / Evidence / Open Shop','ArcCompetencyEvidenceAuthorityAdapter'],
    ['P8','Workplace / Safety / Behavior','ArcWorkplaceSafetyBehaviorAuthorityAdapter'],['P9','Gradebook','ArcGradebookAuthorityAdapter'],
    ['P10A','Student History','ArcStudentHistoryProjection'],['P10B','Curriculum / Standards / Pacing','ArcCurriculumPacingAuthorityAdapter'],
    ['P10C','Lesson Plans','ArcLessonAuthorityAdapter']
  ]);
  function domainMatrix(environment){
    environment=environment||{};return DOMAINS.map(function(row){var present=!!environment[row[2]];return{
      phase:row[0],domain:row[1],ownerBoundary:row[2],implementation:present?'implemented':'missing',
      localTechnicalReadiness:present?'owner-and-adapter-present':'blocked-missing-owner',
      productionAuthority:environment.productionAuthority&&environment.productionAuthority[row[0]]||'V7_ONLY',
      activationAuthorized:false,dualWrite:false,requiresControlledCutover:true
    };});
  }
  function mondayAfter(date){var d=new Date(date||Date.now());d.setHours(12,0,0,0);var add=((8-d.getDay())%7)||7;d.setDate(d.getDate()+add);return d;}
  function key(d){var y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return y+'-'+m+'-'+day;}
  function upcomingWeek(input){
    input=input||{};var start=mondayAfter(input.fromDate),days=[],schedule=typeof input.scheduleForDate==='function'?input.scheduleForDate:function(){return null;};
    for(var i=0;i<5;i++){var d=new Date(start);d.setDate(start.getDate()+i);var schoolDate=key(d),plan=schedule(schoolDate)||{};days.push({schoolDate:schoolDate,dayType:plan.dayType||'unknown',instructionMode:plan.instructionMode||'unknown',scheduleId:plan.scheduleId||null,sections:list(input.sections).map(function(section){var pacing=(input.pacingBySection||{})[section.id]||null;return{sectionId:section.id,course:section.course,period:section.period,currentPacing:pacing,lessonStatus:pacing&&pacing.lessonTitle?'known':'not-scheduled',lessonTitle:pacing&&pacing.lessonTitle||null};})});}
    return{status:'DRAFT_INSTRUCTOR_REVIEW',weekOf:key(start),days:days,teacherReviewRequired:true,editableBeforeExport:true,automaticSubmission:false,unknownFactsPreserved:true};
  }
  function sloDraft(input){input=input||{};var evidence=list(input.evidence),history=list(input.history);return{
    status:'DRAFT_INSTRUCTOR_REVIEW',facts:{studentCount:Number(input.studentCount||0),evidenceCount:evidence.length,historyCount:history.length,baseline:evidence.filter(function(x){return x.phase==='baseline';}),growth:evidence.filter(function(x){return x.phase==='growth';}),final:evidence.filter(function(x){return x.phase==='final';})},
    humanFields:{rationale:null,reflection:null,iepDecisions:null,reteachOrExtend:null,administratorFeedback:null,approval:null,signatures:null},
    warnings:['Only recorded ARC Evidence and history are included.','Missing facts remain blank; no grade, Evidence, reflection, or decision is fabricated.']
  };}
  function reports(input){input=input||{};return{
    status:'DRAFT_INSTRUCTOR_REVIEW',generatedAt:input.generatedAt||null,
    curriculumCoverage:clone(input.curriculumCoverage||{}),competencyCoverage:clone(input.competencyCoverage||{}),activityCoverage:clone(input.activityCoverage||{}),
    authorityReadiness:clone(input.authorityReadiness||[]),studentGrowthFacts:clone(input.studentGrowthFacts||[]),gradeReportingFacts:clone(input.gradeReportingFacts||[]),
    approvalRequired:true,automaticExternalSubmission:false
  };}
  function instructionalReview(input){input=input||{};var lessons=list(input.lessons),activities=list(input.activities),byCourse={};['wt','awt'].forEach(function(course){var courseLessons=lessons.filter(function(x){return x.course===course;}),courseActivities=activities.filter(function(x){return x.course===course;});byCourse[course]={lessonDrafts:courseLessons.length,uniqueDesigns:new Set(courseLessons.map(function(x){return x.designSignature;})).size,reviewUnits:Array.from(new Set(courseLessons.map(function(x){return x.reviewUnit&&x.reviewUnit.sourceKey;}).filter(Boolean))).length,activities:{Project:courseActivities.filter(function(x){return x.libraryType==='Project';}).length,'Technical Assignment':courseActivities.filter(function(x){return x.libraryType==='Technical Assignment';}).length,'Skill Challenge':courseActivities.filter(function(x){return x.libraryType==='Skill Challenge';}).length,Practice:courseActivities.filter(function(x){return x.libraryType==='Practice';}).length},status:'DRAFT_INSTRUCTOR_REVIEW'};});return{status:'DRAFT_INSTRUCTOR_REVIEW',byCourse:byCourse,sourceLessonsPreservedReferenceOnly:Number(input.sourceLessonCount||0),automaticAcceptance:false,automaticAssignment:false,automaticEvidence:false,automaticGrade:false,unresolvedDecisions:clone(input.unresolvedDecisions||[])};}
  function joinedAuthorityAssessment(input){
    input=input||{};var primary=input.primary||{},p10=input.p10||{},records=input.records||{},expected=DOMAINS.map(function(x){return x[0];}),seen=Object.keys(records).filter(function(key){return expected.indexOf(key)>=0&&list(records[key]).length>0;}),shared=['courseId','sectionId','schoolYearId','semesterId'],mismatches=[];
    shared.forEach(function(key){var a=primary.identities&&primary.identities[key],b=p10.identities&&p10.identities[key];if(!a||!b||a!==b)mismatches.push({field:key,primary:a||null,p10:b||null});});
    var primaryGate=primary.databaseName==='arc_classroom_v8_batch_b_verification'&&primary.academic==='V8_AUTHORITATIVE'&&primary.batchA==='V8_AUTHORITATIVE'&&primary.batchB==='V8_AUTHORITATIVE';
    var p10Gate=p10.curriculumDatabaseName==='arc_classroom_v8_p10b_verification'&&p10.lessonDatabaseName==='arc_classroom_v8_p10c_verification'&&p10.curriculumAuthority==='V8_ISOLATED_VERIFICATION'&&p10.lessonAuthority==='V8_ISOLATED_VERIFICATION';
    var sameBrowser=input.singleBrowserEnvironment===true,complete=expected.every(function(key){return seen.indexOf(key)>=0;}),mixedWrite=list(input.mixedAuthorityWrites).length>0;
    if(!primaryGate)fail('PRIMARY_CLASSROOM_GATE_REQUIRED','P4-P10A must use the accepted Batch A/B isolated authority chain.');
    if(!p10Gate)fail('P10BC_ISOLATED_GATE_REQUIRED','P10B/P10C must use their accepted dedicated isolated authority adapters.');
    if(!sameBrowser)fail('SINGLE_BROWSER_REQUIRED','The joined rehearsal must occur in one isolated normal-app browser environment.');
    if(mismatches.length)fail('CROSS_OWNER_IDENTITY_MISMATCH','P10B/P10C records do not preserve the upstream classroom identity.',{mismatches:mismatches});
    if(mixedWrite)fail('MIXED_AUTHORITY_WRITE_BLOCKED','The joined rehearsal detected mixed V7/V8 writes.',{writes:clone(input.mixedAuthorityWrites)});
    if(!complete)fail('JOINED_DOMAIN_EVIDENCE_INCOMPLETE','Every P4-P10C owner must return at least one record identity.',{missing:expected.filter(function(key){return seen.indexOf(key)<0;})});
    return{status:'FEDERATED_JOINED_REHEARSAL_COMPLETE',singleBrowserEnvironment:true,allDomainsObserved:true,domainCount:expected.length,sharedIdentities:clone(primary.identities),ownerRecordIds:clone(records),singleAuthoritativeState:false,productionAuthority:'V7_ONLY',dualWrite:false,realStudentDataAuthorized:false,blocker:{code:'JOINED_AUTHORITY_GATE_SPLIT',exact:true,description:'Accepted gates hard-bind P4-P10A to arc_classroom_v8_batch_b_verification, P10B to arc_classroom_v8_p10b_verification, and P10C to arc_classroom_v8_p10c_verification. A single authoritative database is not authorized.'}};
  }
  function fail(code,message,context){var error=new Error(message);error.code=code;error.context=context||{};throw error;}
  async function runP10BCIsolatedRehearsal(input){
    input=input||{};var curriculum=input.curriculumAdapter,lessons=input.lessonAdapter;
    if(typeof input.verifyUpstreamGate!=='function'||!input.verifyUpstreamGate(input.upstreamGate))fail('UPSTREAM_CLASSROOM_GATE_REQUIRED','P10B/P10C rehearsal requires the accepted fictional Batch A/B gate.');
    if(!curriculum||curriculum.authorityState!=='V8_ISOLATED_VERIFICATION'||curriculum.databaseName!=='arc_classroom_v8_p10b_verification'||curriculum.isAuthoritativeV8!==false||curriculum.dualWrite!==false)fail('P10B_ISOLATED_GATE_REQUIRED','Curriculum/Pacing must use its accepted dedicated isolated adapter.');
    if(!lessons||lessons.authorityState!=='V8_ISOLATED_VERIFICATION'||lessons.databaseName!=='arc_classroom_v8_p10c_verification'||lessons.isAuthoritativeV8!==false||lessons.dualWrite!==false)fail('P10C_ISOLATED_GATE_REQUIRED','Lessons must use its accepted dedicated isolated adapter.');
    if(!input.lessonDefinition||!input.lessonVersion||!input.pacingScope)fail('REHEARSAL_INPUT_REQUIRED','The fictional Lesson definition, version, and configured pacing scope are required.');
    var downstreamBefore=typeof input.readDownstreamCounts==='function'?await input.readDownstreamCounts():null;
    var definition=await lessons.runIsolated('createLessonDefinition',clone(input.lessonDefinition));
    var versionRequest=Object.assign({},clone(input.lessonVersion),{lessonId:definition.lessonId});
    var bundle=await lessons.runIsolated('createLessonVersionBundle',versionRequest);
    if(typeof input.bindLessonVersionForPacing==='function')await input.bindLessonVersionForPacing({definition:clone(definition),version:clone(bundle.version)});
    var lesson=await lessons.runIsolated('getLessonPlanbookProjection',{lessonVersionId:bundle.version.lessonVersionId});
    var before=await curriculum.runIsolated('getSectionPacing',clone(input.pacingScope));
    if(!before||!before.configured)fail('P10B_PLAN_REQUIRED','The isolated Section pacing plan must already be explicitly configured.');
    var command={sectionPacingPlanId:before.plan.sectionPacingPlanId,eventType:'ITEM_ADDED',pacingItemId:input.pacingItemId||('rehearsal-'+bundle.version.lessonVersionId),lessonPlanVersionId:bundle.version.lessonVersionId,curriculumMapItemId:input.curriculumMapItemId||null,payload:{order:list(before.current&&before.current.items).length,plannedDuration:Number(input.plannedDuration||1),title:bundle.version.title},expectedRevision:before.plan.revision,expectedSequence:Number(before.plan.lastSequence),reason:'Fictional integrated P10B/P10C rehearsal'};
    var preview=await curriculum.runIsolated('previewPacingCommand',clone(command));
    if(!preview||preview.write!==false)fail('P10B_PREVIEW_REQUIRED','Pacing must produce a read-only preview before the fictional write.');
    var committed=await curriculum.runIsolated('appendPacingCommand',command);
    var after=await curriculum.runIsolated('getSectionPacing',clone(input.pacingScope));
    var history=await curriculum.runIsolated('getSectionPacingHistory',clone(input.pacingScope));
    var downstreamAfter=typeof input.readDownstreamCounts==='function'?await input.readDownstreamCounts():null;
    if(downstreamBefore&&JSON.stringify(downstreamBefore)!==JSON.stringify(downstreamAfter))fail('DOWNSTREAM_AUTOPROMOTION_DETECTED','Lesson placement changed downstream Evidence, Gradebook, Project, or assignment authority.',{before:downstreamBefore,after:downstreamAfter});
    return{status:'ISOLATED_REHEARSAL_COMPLETE',lessonDefinitionId:definition.lessonId,lessonVersionId:bundle.version.lessonVersionId,lessonProjection:lesson,pacingBefore:before,pacingPreview:preview,pacingCommit:committed,pacingAfter:after,pacingHistory:history,upstreamGateVerified:true,p10bAuthority:'V8_ISOLATED_VERIFICATION',p10cAuthority:'V8_ISOLATED_VERIFICATION',productionAuthority:'V7_ONLY',dualWrite:false,realStudentDataAuthorized:false,automaticEvidence:false,automaticGrade:false,automaticProjectCompletion:false,downstreamCounts:downstreamAfter};
  }
  function validate(){var m=domainMatrix(Object.fromEntries(DOMAINS.map(function(x){return[x[2],{}];})));return{valid:m.length===9&&m.every(function(x){return x.activationAuthorized===false&&x.dualWrite===false;}),domainCount:m.length};}
  return Object.freeze({DOMAINS:DOMAINS,domainMatrix:domainMatrix,upcomingWeek:upcomingWeek,sloDraft:sloDraft,reports:reports,instructionalReview:instructionalReview,joinedAuthorityAssessment:joinedAuthorityAssessment,runP10BCIsolatedRehearsal:runP10BCIsolatedRehearsal,validate:validate});
});
