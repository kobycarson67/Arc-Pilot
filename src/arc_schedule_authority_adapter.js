/* Stage 14 P3 normal Schedule UI authority boundary. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcScheduleAuthorityAdapter=api;}(this,function(){
  'use strict';
  var V7='V7_ONLY',ISOLATED='V8_ISOLATED_VERIFICATION',ISOLATED_DB='arc_classroom_v8_p3_verification';
  function fail(code,message,context){var e=new Error(message);e.code=code;e.context=context||{};throw e;}
  function create(options){options=options||{};var state=options.authorityState||V7,admin=options.admin||null,resolveProductContext=options.resolveProductContext||null,databaseName=String(options.databaseName||'');if(![V7,ISOLATED].includes(state))fail('AUTHORITY_STATE_BLOCKED','Schedule UI adapter refuses an unapproved authority state.');if(state===ISOLATED&&(databaseName!==ISOLATED_DB||!admin))fail('ISOLATED_AUTHORITY_REQUIRED','v8 Schedule UI verification is hard-bound to the isolated P3 database.',{databaseName:databaseName});
    function legacy(action,payload,mutation){if(state!==V7)fail('LEGACY_AUTHORITY_BLOCKED','Legacy mutation is available only while authority is V7_ONLY.',{action:action});if(typeof mutation!=='function')fail('LEGACY_MUTATION_REQUIRED','V7_ONLY requires exactly one explicit legacy mutation callback.',{action:action});return mutation(payload);}
    function requireFields(action,payload,fields){for(var field of fields)if(payload[field]===undefined||payload[field]===null||payload[field]==='')fail('PRODUCT_CONTEXT_REQUIRED','Schedule product action is missing required context.',{action:action,field:field});return payload;}
    async function normalize(action,payload){payload=Object.assign({},payload||{});if(action==='calendar-day')return requireFields(action,Object.assign(payload,{schoolDate:payload.schoolDate||payload.key,bellScheduleId:payload.bellScheduleId||payload.scheduleId}),['schoolDate','dayType','bellScheduleId','instructionMode']);if(action==='calendar-event')return requireFields(action,Object.assign(payload,{schoolDate:payload.schoolDate||payload.key,startDate:payload.startDate||payload.key,endDate:payload.endDate||payload.key,label:payload.label||payload.title}),['schoolDate','label']);if(action==='calendar-day-clear')return requireFields(action,Object.assign(payload,{schoolDate:payload.schoolDate||payload.key}),['schoolDate']);if(action==='calendar-event-delete')return requireFields(action,Object.assign(payload,{eventId:payload.eventId||payload.id}),['eventId']);if(['planning-period','section-period','semester-transition'].includes(action)){if(typeof resolveProductContext!=='function')fail('PRODUCT_CONTEXT_RESOLVER_REQUIRED','Isolated Schedule actions require deterministic configured academic context.',{action:action});var resolved=await resolveProductContext(action,payload);if(!resolved)fail('PRODUCT_CONTEXT_REQUIRED','Schedule product context could not be resolved.',{action:action});return Object.assign({},payload,resolved);}return payload;}
    async function isolated(action,payload){if(state!==ISOLATED)fail('V8_AUTHORITY_BLOCKED','v8 mutation is disabled while classroom authority is V7_ONLY.',{action:action});payload=await normalize(action,payload);switch(action){
      case'bell-create':return admin.createBellSchedule(payload);
      case'bell-time':return admin.updateBellTime(payload);
      case'bell-correct':return admin.correctAuthority(payload.id,payload.expectedRevision,{name:payload.name,periods:payload.periods},payload.reason,payload.recoveryToken);
      case'schedule-mode-create':return admin.createScheduleMode(payload);
      case'calendar-day':return admin.saveDateOverride(payload);
      case'calendar-override':return admin.saveDateOverride(payload);
      case'calendar-range':return admin.applyDateOverrideRange(payload.items?payload:{items:(payload.keys||[]).map(function(key){return{schoolDate:key,dayType:payload.dayType,scheduleId:payload.scheduleId,instructionMode:payload.instructionMode,reason:payload.reason||'Instructor applied calendar range'};})});
      case'calendar-event':return admin.createCalendarEvent(payload);
      case'calendar-day-clear':return admin.clearDateOverride(payload);
      case'calendar-event-delete':return admin.retireCalendarEvent(payload);
      case'section-placement':return admin.createSectionPlacement(payload);
      case'planning-placement':return admin.createPlanningPlacement(payload);
      case'planning-period':return admin.movePlanningPeriod(payload);
      case'section-period':return admin.moveSectionPeriod(payload);
      case'semester-transition':if(payload.previewOnly)return admin.previewSemesterTransition(payload);if(!payload.recoveryToken)fail('VERIFIED_RECOVERY_REQUIRED','Semester Transition apply requires its verified recovery token.');return admin.applySemesterTransition(payload,payload.recoveryToken);
      case'authority-correct':return admin.correctAuthority(payload.id,payload.expectedRevision,payload.changes,payload.reason,payload.recoveryToken);
      case'semester-preview':return admin.previewSemesterTransition(payload);
      case'semester-apply':return admin.applySemesterTransition(payload.input,payload.recoveryToken);
      case'summary':return admin.summary();
      default:fail('UNSUPPORTED_SCHEDULE_ACTION','Unknown Schedule UI action.',{action:action});}}
    return{authorityState:state,databaseName:state===ISOLATED?databaseName:null,runLegacy:legacy,runIsolated:isolated,isAuthoritativeV8:false,dualWrite:false};
  }
  return{create:create,states:Object.freeze({V7_ONLY:V7,V8_ISOLATED_VERIFICATION:ISOLATED}),isolatedDatabaseName:ISOLATED_DB};
}));
