/* Stage 14 P10B Curriculum, Standards, and Section Pacing exclusive authority boundary. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcCurriculumPacingAuthorityAdapter=api;}(this,function(){
  'use strict';
  var V7='V7_ONLY',ISOLATED='V8_ISOLATED_VERIFICATION',ISOLATED_DB='arc_classroom_v8_p10b_verification';
  var READS=['getCourseStandards','getEssentialStandards','getCurriculumMap','getCurriculumItem','getCurriculumCoverage','getSectionPacing','getSectionPacingHistory'];
  var COMMANDS=['previewPacingCommand','appendPacingCommand','createPacingSnapshot','previewSemesterPacingCloseout','closeSemesterPacing'];
  function fail(code,message,context){var e=new Error(message);e.code=code;e.context=context||{};throw e;}
  function create(options){options=options||{};var state=options.authorityState||V7,databaseName=String(options.databaseName||''),service=options.service||null;
    if([V7,ISOLATED].indexOf(state)<0)fail('AUTHORITY_STATE_BLOCKED','Curriculum/Pacing adapter refuses an unapproved authority state.');
    if(state===ISOLATED&&(databaseName!==ISOLATED_DB||!service))fail('ISOLATED_AUTHORITY_REQUIRED','v8 Curriculum/Pacing verification is hard-bound to its dedicated nonproduction database.',{databaseName:databaseName});
    function runLegacy(action,payload,operation){if(state!==V7)fail('LEGACY_AUTHORITY_BLOCKED','Legacy Curriculum/Pacing behavior is available only under V7_ONLY.');if(typeof operation!=='function')fail('LEGACY_OPERATION_REQUIRED','V7_ONLY requires exactly one accepted legacy operation.',{action:action});return operation(payload);}
    async function runIsolated(action,payload){if(state!==ISOLATED)fail('V8_AUTHORITY_BLOCKED','Isolated v8 Curriculum/Pacing execution is disabled while classroom authority remains V7_ONLY.');if(READS.indexOf(action)<0&&COMMANDS.indexOf(action)<0)fail('UNSUPPORTED_CURRICULUM_ACTION','Unknown Curriculum/Pacing action.',{action:action});return service[action](payload||{});}
    return{authorityState:state,databaseName:state===ISOLATED?databaseName:null,runLegacy:runLegacy,runIsolated:runIsolated,isAuthoritativeV8:false,dualWrite:false,uiConnected:state===ISOLATED};
  }
  return{create:create,states:Object.freeze({V7_ONLY:V7,V8_ISOLATED_VERIFICATION:ISOLATED}),isolatedDatabaseName:ISOLATED_DB,readInterfaces:READS.slice(),commandInterfaces:COMMANDS.slice()};
}));
