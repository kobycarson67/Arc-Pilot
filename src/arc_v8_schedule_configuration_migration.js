/* Read-only Schema-7 schedule configuration projection for reviewed v8 migration. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcV8ScheduleConfigurationMigration=api;
}(this,function(){
  'use strict';
  var MODES=Object.freeze(['regular','open_shop','special','none']);
  var DAY_TYPES=Object.freeze(['school','no_school','holiday','pd','other']);
  var WEEKDAYS=Object.freeze({1:'monday',2:'tuesday',3:'wednesday',4:'thursday',5:'friday',6:'saturday',7:'sunday'});
  function copy(value){return value==null?value:structuredClone(value);}
  function text(value){return String(value==null?'':value).trim();}
  function fail(code,message,context){var error=new Error(message);error.code=code;error.context=context||{};throw error;}
  function eventTime(value){value=text(value);if(value&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(value))fail('INVALID_TIME','Migration event time must use 24-hour HH:MM.',{time:value});return value;}
  function reminderLead(value){if(value==null||value==='')return 0;var number=Number(value);if(!Number.isInteger(number)||number<0)fail('INVALID_REMINDER_LEAD','Migration event reminder lead must be a nonnegative integer.',{remindDaysBefore:value});return number;}
  function orderedValues(object){return Object.keys(object||{}).sort(function(a,b){return a.localeCompare(b,undefined,{numeric:true});}).map(function(key){return object[key];});}
  function normalizeTimes(schedule){
    return Object.keys(schedule.times||{}).sort(function(a,b){return a.localeCompare(b,undefined,{numeric:true});}).map(function(code,index){
      var source=schedule.times[code]||{},start=text(source.start),end=text(source.end);
      if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(start)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(end)||end<=start)fail('INVALID_BELL_SCHEDULE','Migration input contains an invalid Bell Schedule period.',{scheduleId:schedule.id,periodCode:code});
      return{code:String(code),label:'Period '+code,startTime:start,endTime:end,order:index};
    });
  }
  function project(input){
    if(!input||typeof input!=='object'||Array.isArray(input))fail('INVALID_CONFIGURATION_SNAPSHOT','An explicit Schema-7 configuration snapshot is required.');
    var source=input.currentStateExample&&typeof input.currentStateExample==='object'?input.currentStateExample:input;
    var schedules=Object.keys(source.bellSchedules||{}).sort().map(function(key){var row=source.bellSchedules[key]||{},id=text(row.id)||key;return{sourceId:id,name:text(row.name)||id,periods:normalizeTimes(Object.assign({},row,{id:id}))};});
    var scheduleIds=new Set(schedules.map(function(row){return row.sourceId;}));
    var week=Object.keys(source.weeklyScheduleDefaults||{}).sort(function(a,b){return Number(a)-Number(b);}).map(function(key){
      var row=source.weeklyScheduleDefaults[key]||{},mode=text(row.instructionMode),scheduleId=text(row.scheduleId);
      if(!WEEKDAYS[key]||!MODES.includes(mode)||!scheduleIds.has(scheduleId))fail('INVALID_WEEKLY_DEFAULT','Migration input contains an unsupported weekday default.',{weekday:key,scheduleId:scheduleId,instructionMode:mode});
      return{weekday:WEEKDAYS[key],bellScheduleSourceId:scheduleId,instructionMode:mode};
    });
    var overrides=Object.keys(source.calendarOverrides||{}).sort().map(function(schoolDate){
      var row=source.calendarOverrides[schoolDate]||{},dayType=text(row.dayType),mode=text(row.instructionMode),scheduleId=text(row.scheduleId);
      if(!DAY_TYPES.includes(dayType)||!MODES.includes(mode)||!scheduleIds.has(scheduleId))fail('INVALID_CALENDAR_OVERRIDE','Migration input contains an unsupported calendar override.',{schoolDate:schoolDate});
      return{schoolDate:schoolDate,dayType:dayType,bellScheduleSourceId:scheduleId,instructionMode:dayType==='school'?mode:'none'};
    });
    var events=(source.calendarEvents||[]).map(function(row){var schoolDate=text(row.date);return{id:text(row.id),schoolDate:schoolDate,startDate:schoolDate,endDate:schoolDate,title:text(row.title),label:text(row.title),time:eventTime(row.time),remindDaysBefore:reminderLead(row.remindDaysBefore),createdAt:text(row.createdAt)||null};}).sort(function(a,b){return(a.schoolDate+'|'+a.id).localeCompare(b.schoolDate+'|'+b.id);});
    var sections=(source.sections||[]).map(function(row){return{sourceSectionId:text(row.id),courseCode:text(row.course).toUpperCase(),displayName:text(row.name),periodCode:String(row.period)};}).sort(function(a,b){return a.sourceSectionId.localeCompare(b.sourceSectionId);});
    var review=[];
    if(!source.schoolYear||!source.schoolYear.startDate||!source.schoolYear.endDate)review.push({code:'SCHOOL_YEAR_BOUNDARY_REQUIRED',message:'Supply explicit School Year identity and start/end dates; event titles are not authority.'});
    if(!source.semester||!source.semester.startDate||!source.semester.endDate)review.push({code:'SEMESTER_BOUNDARY_REQUIRED',message:'Supply explicit Semester identity and start/end dates; event titles are not authority.'});
    if(!Array.isArray(source.gradingPeriods)||!source.gradingPeriods.length)review.push({code:'GRADING_PERIOD_BOUNDARIES_REQUIRED',message:'Supply explicit Grading Period identities and boundaries; event titles are not authority.'});
    return{
      planVersion:'schedule-configuration-migration-plan-1',
      source:{academicYearLabel:text(source.academicYearLabel)||null,semesterLabel:text(source.semesterLabel)||null},
      bellSchedules:schedules,
      weeklyDefaults:week,
      calendarEvents:events,
      calendarOverrides:overrides,
      planningPlacement:source.planningPeriod==null?null:{periodCode:String(source.planningPeriod)},
      sectionPlacementIntents:sections,
      reviewRequirements:review,
      readyForApply:false,
      mutates:false
    };
  }
  return Object.freeze({project:project,instructionModes:MODES,dayTypes:DAY_TYPES});
}));
