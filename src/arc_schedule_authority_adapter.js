/* Stage 14 P3 normal Schedule UI authority boundary. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcScheduleAuthorityAdapter=api;}(this,function(){
  'use strict';
  var V7='V7_ONLY',ISOLATED='V8_ISOLATED_VERIFICATION',ISOLATED_DB='arc_classroom_v8_p3_verification';
  function fail(code,message,context){var e=new Error(message);e.code=code;e.context=context||{};throw e;}
  function create(options){options=options||{};var state=options.authorityState||V7,admin=options.admin||null,databaseName=String(options.databaseName||'');if(![V7,ISOLATED].includes(state))fail('AUTHORITY_STATE_BLOCKED','Schedule UI adapter refuses an unapproved authority state.');if(state===ISOLATED&&(databaseName!==ISOLATED_DB||!admin))fail('ISOLATED_AUTHORITY_REQUIRED','v8 Schedule UI verification is hard-bound to the isolated P3 database.',{databaseName:databaseName});
    function legacy(action,payload,mutation){if(state!==V7)fail('LEGACY_AUTHORITY_BLOCKED','Legacy mutation is available only while authority is V7_ONLY.',{action:action});if(typeof mutation!=='function')fail('LEGACY_MUTATION_REQUIRED','V7_ONLY requires exactly one explicit legacy mutation callback.',{action:action});return mutation(payload);}
    async function isolated(action,payload){if(state!==ISOLATED)fail('V8_AUTHORITY_BLOCKED','v8 mutation is disabled while classroom authority is V7_ONLY.',{action:action});switch(action){
      case'bell-create':return admin.createBellSchedule(payload);
      case'bell-correct':return admin.correctAuthority(payload.id,payload.expectedRevision,{name:payload.name,periods:payload.periods},payload.reason,payload.recoveryToken);
      case'schedule-mode-create':return admin.createScheduleMode(payload);
      case'calendar-day':return admin.createCalendarDay(payload);
      case'calendar-override':return admin.createDateOverride(payload);
      case'calendar-range':{var out=[];for(var item of payload.items||[])out.push(await admin.createDateOverride(item));return out;}
      case'calendar-event':return admin.createCalendarEvent(payload);
      case'section-placement':return admin.createSectionPlacement(payload);
      case'authority-correct':return admin.correctAuthority(payload.id,payload.expectedRevision,payload.changes,payload.reason,payload.recoveryToken);
      case'semester-preview':return admin.previewSemesterTransition(payload);
      case'semester-apply':return admin.applySemesterTransition(payload.input,payload.recoveryToken);
      case'summary':return admin.summary();
      default:fail('UNSUPPORTED_SCHEDULE_ACTION','Unknown Schedule UI action.',{action:action});}}
    return{authorityState:state,databaseName:state===ISOLATED?databaseName:null,runLegacy:legacy,runIsolated:isolated,isAuthoritativeV8:false,dualWrite:false};
  }
  return{create:create,states:Object.freeze({V7_ONLY:V7,V8_ISOLATED_VERIFICATION:ISOLATED}),isolatedDatabaseName:ISOLATED_DB};
}));
