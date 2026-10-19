/* Stage 14 P10B Curriculum, Standards, and Section Pacing exclusive authority boundary. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcCurriculumPacingAuthorityAdapter=api;}(this,function(){
  'use strict';
  var V7='V7_ONLY',ISOLATED='V8_ISOLATED_VERIFICATION',UNIFIED='V8_UNIFIED_VERIFICATION',ISOLATED_DB='arc_classroom_v8_p10b_verification',UNIFIED_DB='arc_classroom_v8_unified_p4_p10c_verification';
  var READS=['getCourseStandards','getEssentialStandards','getCurriculumMap','getCurriculumItem','getCurriculumCoverage','getSectionPacing','getSectionPacingHistory'];
  var COMMANDS=['previewPacingCommand','appendPacingCommand','previewPacingBatch','appendPacingBatch','createPacingSnapshot','previewSemesterPacingCloseout','closeSemesterPacing'];
  function fail(code,message,context){var e=new Error(message);e.code=code;e.context=context||{};throw e;}
  function create(options){options=options||{};var state=options.authorityState||V7,databaseName=String(options.databaseName||''),service=options.service||null;
    if([V7,ISOLATED,UNIFIED].indexOf(state)<0)fail('AUTHORITY_STATE_BLOCKED','Curriculum/Pacing adapter refuses an unapproved authority state.');
    if(state===ISOLATED&&(databaseName!==ISOLATED_DB||!service))fail('ISOLATED_AUTHORITY_REQUIRED','v8 Curriculum/Pacing verification is hard-bound to its dedicated nonproduction database.',{databaseName:databaseName});
    if(state===UNIFIED&&(databaseName!==UNIFIED_DB||!service||typeof options.verifyActivationGate!=='function'||!options.verifyActivationGate(options.activationGate)))fail('UNIFIED_AUTHORITY_REQUIRED','Unified Curriculum/Pacing verification requires its exact database and verified coordinated gate.',{databaseName:databaseName});
    function runLegacy(action,payload,operation){if(state!==V7)fail('LEGACY_AUTHORITY_BLOCKED','Legacy Curriculum/Pacing behavior is available only under V7_ONLY.');if(typeof operation!=='function')fail('LEGACY_OPERATION_REQUIRED','V7_ONLY requires exactly one accepted legacy operation.',{action:action});return operation(payload);}
    async function runIsolated(action,payload){if(state!==ISOLATED)fail('V8_AUTHORITY_BLOCKED','Isolated v8 Curriculum/Pacing execution is disabled while classroom authority remains V7_ONLY.');if(READS.indexOf(action)<0&&COMMANDS.indexOf(action)<0)fail('UNSUPPORTED_CURRICULUM_ACTION','Unknown Curriculum/Pacing action.',{action:action});return service[action](payload||{});}
    async function runUnified(action,payload){if(state!==UNIFIED)fail('UNIFIED_AUTHORITY_BLOCKED','Unified Curriculum/Pacing execution is unavailable.');if(READS.indexOf(action)<0&&COMMANDS.indexOf(action)<0)fail('UNSUPPORTED_CURRICULUM_ACTION','Unknown Curriculum/Pacing action.',{action:action});return service[action](payload||{});}
    return{authorityState:state,databaseName:state===ISOLATED||state===UNIFIED?databaseName:null,runLegacy:runLegacy,runIsolated:runIsolated,runUnified:runUnified,isAuthoritativeV8:false,isUnifiedVerification:state===UNIFIED,dualWrite:false,uiConnected:state===ISOLATED||state===UNIFIED};
  }
  return{create:create,states:Object.freeze({V7_ONLY:V7,V8_ISOLATED_VERIFICATION:ISOLATED,V8_UNIFIED_VERIFICATION:UNIFIED}),isolatedDatabaseName:ISOLATED_DB,unifiedDatabaseName:UNIFIED_DB,readInterfaces:READS.slice(),commandInterfaces:COMMANDS.slice()};
}));
