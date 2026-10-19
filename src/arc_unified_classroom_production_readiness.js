/* ARC Major Build 7 production-shaped readiness proof. Loading is inert; this module has no write API. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcUnifiedClassroomProductionReadiness=api;}(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var LOGICAL_DATABASE='arc_classroom_v8';
  var VERIFICATION_DATABASE='arc_classroom_v8_unified_p4_p10c_verification';
  var RECORD_ID='authority:classroom-ready-unified-p4-p10c';
  var STORAGE=Object.freeze({logicalSchemaVersion:8,indexedDbVersion:14,storeCount:74});
  var PHASES=Object.freeze(['P4','P5','P6','P7','P8','P9','P10A','P10B','P10C']);
  var EXTERNAL=Object.freeze([
    Object.freeze({code:'INSTRUCTOR_CONTENT_ACCEPTANCE_REQUIRED',owner:'Instructor',blocksRealStudents:true}),
    Object.freeze({code:'FERPA_PRIVACY_ACCEPTANCE_REQUIRED',owner:'Institution',blocksRealStudents:true}),
    Object.freeze({code:'ONEDRIVE_RECOVERY_REQUIRED',owner:'Institution / Microsoft',blocksRealStudents:true}),
    Object.freeze({code:'PROTECTED_MEDIA_CUSTODY_REQUIRED',owner:'Institution / Instructor',blocksRealStudents:true}),
    Object.freeze({code:'SAMSUNG_PHYSICAL_ACCEPTANCE_REQUIRED',owner:'Instructor',blocksRealStudents:true}),
    Object.freeze({code:'PRODUCTION_CUTOVER_AUTHORIZATION_REQUIRED',owner:'Instructor',blocksRealStudents:true})
  ]);
  function clone(value){return value==null?value:JSON.parse(JSON.stringify(value));}
  function fail(code,message,context){var error=new Error(message);error.code=code;error.context=context||{};throw error;}
  function list(value){return Array.isArray(value)?value:[];}
  function object(value){return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}
  function exactKeys(value,expected){var a=Object.keys(object(value)).sort(),b=Object.keys(expected).sort();return JSON.stringify(a)===JSON.stringify(b)&&b.every(function(key){return value[key]===expected[key];});}
  function isSha(value){return /^[0-9a-f]{40}$/.test(String(value||''));}
  function isTree(value){return /^[0-9a-f]{40}$/.test(String(value||''));}
  function isChecksum(value){return /^[0-9a-f]{64}$/.test(String(value||''));}
  function canonical(value){if(Array.isArray(value))return value.map(canonical);if(value&&typeof value==='object'){var out={};Object.keys(value).sort().forEach(function(key){out[key]=canonical(value[key]);});return out;}return value;}
  function canonicalText(value){return JSON.stringify(canonical(value));}
  function diff(before,after,path,out){
    path=path||'';out=out||[];
    if(canonicalText(before)===canonicalText(after))return out;
    if(Array.isArray(before)||Array.isArray(after)||!before||!after||typeof before!=='object'||typeof after!=='object'){out.push(path||'$');return out;}
    Array.from(new Set(Object.keys(before).concat(Object.keys(after)))).sort().forEach(function(key){diff(before[key],after[key],path?path+'.'+key:key,out);});return out;
  }
  function semanticParity(input){
    input=input||{};var before=object(input.before),after=object(input.after),categories=['authority','classroom','instruction','recovery'],changed={},meaningful=[];
    categories.forEach(function(category){changed[category]=diff(before[category],after[category]);if(changed[category].length)meaningful.push.apply(meaningful,changed[category].map(function(path){return category+'.'+path;}));});
    var envelope=diff(before.envelope,after.envelope),allowed=list(input.allowedEnvelopePaths),unexpectedEnvelope=envelope.filter(function(path){return allowed.indexOf(path)<0;});
    if(meaningful.length)fail('SEMANTIC_STATE_DRIFT','Production-shaped verification changed protected semantic state.',{changedPaths:meaningful});
    if(unexpectedEnvelope.length)fail('ENVELOPE_DRIFT','Production-shaped verification changed unapproved envelope fields.',{changedPaths:unexpectedEnvelope});
    return{matched:true,protectedCategories:categories,categoryCanonicalBytes:Object.fromEntries(categories.map(function(category){return[category,canonicalText(before[category]).length];})),allowedEnvelopeChanges:envelope,unexpectedEnvelopeChanges:[]};
  }
  function assess(input){
    input=input||{};var errors=[],owners=object(input.ownerStates),records=object(input.ownerRecordIds),gate=input.unifiedGate&&input.unifiedGate.record;
    if(input.dryRun!==true||input.writesAllowed!==false)errors.push({code:'READ_ONLY_DRY_RUN_REQUIRED'});
    if(input.logicalDatabaseName!==LOGICAL_DATABASE)errors.push({code:'PRODUCTION_LOGICAL_DATABASE_REQUIRED',actual:input.logicalDatabaseName||null});
    if(input.physicalDatabaseName!==VERIFICATION_DATABASE)errors.push({code:'TASK_OWNED_PHYSICAL_DATABASE_REQUIRED',actual:input.physicalDatabaseName||null});
    if(!gate||gate.id!==RECORD_ID||gate.authorityState!=='V8_UNIFIED_VERIFICATION'||gate.productionAuthority!=='V7_ONLY'||gate.databaseName!==VERIFICATION_DATABASE)errors.push({code:'ACCEPTED_UNIFIED_GATE_REQUIRED'});
    if(!isSha(input.commit)||!isTree(input.tree)||input.sourceTreeVerified!==true)errors.push({code:'EXACT_SOURCE_IDENTITY_REQUIRED'});
    if(!exactKeys(input.storageAuthority,STORAGE))errors.push({code:'STORAGE_IDENTITY_REQUIRED'});
    if(input.academicAuthority!=='V8_AUTHORITATIVE')errors.push({code:'ACADEMIC_AUTHORITY_REQUIRED'});
    var ownerErrors=[];PHASES.forEach(function(phase){var expected=phase==='P10A'?'V8_DERIVED_READ_ONLY':'V8_UNIFIED_VERIFICATION';if(owners[phase]!==expected)ownerErrors.push({phase:phase,expected:expected,actual:owners[phase]||null});if(!list(records[phase]).length)ownerErrors.push({phase:phase,code:'OWNER_RECORD_EVIDENCE_REQUIRED'});});if(ownerErrors.length)errors.push({code:'OWNER_CLOSURE_INCOMPLETE',owners:ownerErrors});
    if(input.recoveryLoaded!==true||input.recoveryVerified!==true||input.rollbackVerified!==true||!isChecksum(input.recoveryChecksum))errors.push({code:'EXACT_RECOVERY_CUSTODY_REQUIRED'});
    if(input.dualWrite!==false||input.mixedAuthorityWrites&&input.mixedAuthorityWrites.length)errors.push({code:'MIXED_AUTHORITY_REFUSED'});
    if(input.realStudentDataAuthorized!==false||Number(input.studentCount||0)!==0||Number(input.enrollmentCount||0)!==0||Number(input.scheduleAssignmentCount||0)!==0)errors.push({code:'REAL_STUDENT_PROHIBITION_REQUIRED'});
    if(input.automaticEvidence!==false||input.automaticGrade!==false||input.automaticQualification!==false||input.automaticProjectUnlock!==false||input.contentAcceptance!==false)errors.push({code:'INSTRUCTOR_DECISION_BOUNDARY_REQUIRED'});
    return{status:errors.length?'LOCAL_PRODUCTION_PATH_BLOCKED':'LOCAL_PRODUCTION_PATH_READY',locallyImplementableReady:errors.length===0,productionGo:false,productionDecision:'NO_GO_EXTERNAL_GATES',logicalDatabaseName:LOGICAL_DATABASE,physicalDatabaseName:VERIFICATION_DATABASE,commit:input.commit||null,tree:input.tree||null,storageAuthority:clone(STORAGE),ownerStates:clone(owners),ownerRecordIds:clone(records),recoveryChecksum:input.recoveryChecksum||null,technicalErrors:errors,externalBlockers:clone(EXTERNAL),productionAuthority:'V7_ONLY',dualWrite:false,realStudentDataAuthorized:false,writesPerformed:0};
  }
  function progression(input){
    input=input||{};var course=String(input.courseCode||''),steps=list(input.steps),expected=course==='13207'?['FOUNDATION','PRACTICE','INSTRUCTOR_SELECTED_CHALLENGE_OR_TECHNICAL','INSTRUCTOR_ASSESSMENT','INSTRUCTOR_PROJECT_ELIGIBILITY_DECISION']:course==='13208'?['ADVANCED_DIAGNOSIS','INDEPENDENT_PRACTICE','INSTRUCTOR_SELECTED_CHALLENGE_OR_TECHNICAL','INSTRUCTOR_INSPECTION_AND_ASSESSMENT','INSTRUCTOR_PROJECT_ELIGIBILITY_DECISION']:null;
    if(!expected)fail('COURSE_SCOPE_REQUIRED','Production-shaped classroom proof requires exact WT 13207 or AWT 13208 identity.');
    if(JSON.stringify(steps.map(function(step){return step.phase;}))!==JSON.stringify(expected))fail('COURSE_PROGRESSION_INCOMPLETE','The fictional course workflow does not preserve the reviewed progression.',{expected:expected,actual:steps.map(function(step){return step.phase;})});
    steps.forEach(function(step){if(step.instructorDecision!==true)fail('INSTRUCTOR_DECISION_REQUIRED','Every assessment, Evidence, qualification, and Project eligibility boundary requires explicit instructor action.',{phase:step.phase});});
    if(input.practiceGraded!==false||input.practiceQualifying!==false||input.automaticEvidence!==false||input.automaticGrade!==false||input.automaticQualification!==false||input.automaticProjectUnlock!==false)fail('AUTOMATION_BOUNDARY_VIOLATION','The fictional workflow crossed an instructor-owned decision boundary.');
    return{status:'FICTIONAL_COURSE_PROGRESSION_VERIFIED',courseCode:course,course:course==='13207'?'WT':'AWT',steps:clone(steps),differentiation:course==='13207'?'guided-foundation-and-increasing-independence':'independent-diagnosis-planning-inspection-and-correction',practice:{graded:false,qualifying:false},automaticEvidence:false,automaticGrade:false,automaticQualification:false,automaticProjectUnlock:false,contentStatus:'DRAFT_INSTRUCTOR_REVIEW',realStudentDataAuthorized:false};
  }
  return Object.freeze({assess:assess,semanticParity:semanticParity,progression:progression,constants:Object.freeze({logicalDatabaseName:LOGICAL_DATABASE,verificationDatabaseName:VERIFICATION_DATABASE,recordId:RECORD_ID,storageAuthority:STORAGE,phases:PHASES,externalBlockers:EXTERNAL})});
}));
