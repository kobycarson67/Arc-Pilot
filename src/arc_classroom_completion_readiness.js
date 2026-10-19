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
  function validate(){var m=domainMatrix(Object.fromEntries(DOMAINS.map(function(x){return[x[2],{}];})));return{valid:m.length===9&&m.every(function(x){return x.activationAuthorized===false&&x.dualWrite===false;}),domainCount:m.length};}
  return Object.freeze({DOMAINS:DOMAINS,domainMatrix:domainMatrix,upcomingWeek:upcomingWeek,sloDraft:sloDraft,reports:reports,instructionalReview:instructionalReview,validate:validate});
});
