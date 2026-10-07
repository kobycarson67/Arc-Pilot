/* Engineering-only read-only capture of the live Schema-7 schedule configuration. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcV7ScheduleConfigurationCapture=api;}(this,function(){
'use strict';
var KEY='weld_v013';
function fail(code,message,context){var error=new Error(message);error.code=code;error.context=context||{};throw error;}
function object(value,family){if(!value||typeof value!=='object'||Array.isArray(value))fail('LIVE_SCHEMA7_CONFIGURATION_INVALID','A present configuration family must be an object.',{family:family});return value;}
function own(source,key){return Object.prototype.hasOwnProperty.call(source,key);}
function scalar(source,key,target){if(own(source,key)){var value=source[key];if(value!==null&&typeof value==='object')fail('LIVE_SCHEMA7_CONFIGURATION_INVALID','Configuration scalar fields must not contain nested values.',{field:key});target[key]=value;}}
function timeRows(source,family){source=object(source,family);var out={};Object.keys(source).forEach(function(key){var row=object(source[key],family+'.'+key),safe={};scalar(row,'start',safe);scalar(row,'end',safe);out[key]=safe;});return out;}
function capture(localStorageLike){
  if(!localStorageLike||typeof localStorageLike.getItem!=='function')fail('SCHEMA7_STORAGE_REQUIRED','A same-origin localStorage reader is required.');
  var raw=localStorageLike.getItem(KEY);if(raw==null||raw==='')fail('LIVE_SCHEMA7_STATE_MISSING','The live weld_v013 state is absent; repository defaults are not migration authority.');
  var state;try{state=JSON.parse(raw);}catch(error){fail('LIVE_SCHEMA7_STATE_UNREADABLE','The live weld_v013 state is not valid JSON.');}
  if(!state||typeof state!=='object'||Array.isArray(state))fail('LIVE_SCHEMA7_STATE_UNREADABLE','The live weld_v013 state must be an object.');
  var snapshot={};scalar(state,'academicYearLabel',snapshot);scalar(state,'semesterLabel',snapshot);scalar(state,'planningPeriod',snapshot);
  if(own(state,'periodTimes'))snapshot.periodTimes=timeRows(state.periodTimes,'periodTimes');
  if(own(state,'bellSchedules')){snapshot.bellSchedules={};var bells=object(state.bellSchedules,'bellSchedules');Object.keys(bells).forEach(function(key){var row=object(bells[key],'bellSchedules.'+key),safe={};scalar(row,'id',safe);scalar(row,'name',safe);if(own(row,'times'))safe.times=timeRows(row.times,'bellSchedules.'+key+'.times');snapshot.bellSchedules[key]=safe;});}
  if(own(state,'weeklyScheduleDefaults')){snapshot.weeklyScheduleDefaults={};var week=object(state.weeklyScheduleDefaults,'weeklyScheduleDefaults');Object.keys(week).forEach(function(key){var row=object(week[key],'weeklyScheduleDefaults.'+key),safe={};scalar(row,'scheduleId',safe);scalar(row,'instructionMode',safe);snapshot.weeklyScheduleDefaults[key]=safe;});}
  if(own(state,'calendarEvents')){if(!Array.isArray(state.calendarEvents))fail('LIVE_SCHEMA7_CONFIGURATION_INVALID','Calendar Events must be an array.',{family:'calendarEvents'});snapshot.calendarEvents=state.calendarEvents.map(function(value,index){var row=object(value,'calendarEvents.'+index),safe={};['id','date','title','time','remindDaysBefore','createdAt'].forEach(function(key){scalar(row,key,safe);});return safe;});}
  if(own(state,'calendarOverrides')){snapshot.calendarOverrides={};var overrides=object(state.calendarOverrides,'calendarOverrides');Object.keys(overrides).forEach(function(key){var row=object(overrides[key],'calendarOverrides.'+key),safe={};['dayType','instructionMode','scheduleId'].forEach(function(field){scalar(row,field,safe);});snapshot.calendarOverrides[key]=safe;});}
  if(own(state,'sections')){if(!Array.isArray(state.sections))fail('LIVE_SCHEMA7_CONFIGURATION_INVALID','Sections must be an array.',{family:'sections'});snapshot.sections=state.sections.map(function(value,index){var row=object(value,'sections.'+index),safe={};['id','course','name','period'].forEach(function(key){scalar(row,key,safe);});return safe;});}
  return{sourceKey:KEY,snapshot:snapshot};
}
return Object.freeze({STORAGE_KEY:KEY,capture:capture});
}));
