/* Daily Teaching First Slice 1: read-only composition over Academic, Pacing, and Lesson owners. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcDailyTeachingProjection=api;}(this,function(){
  'use strict';
  function copy(x){return x==null?x:JSON.parse(JSON.stringify(x));}
  function teachingCalendarStatus(scheduled){var type=scheduled&&scheduled.dayType,mode=scheduled&&scheduled.instructionMode;if(type==='Instructional'){type='school';if(!mode)mode='regular';}else if(type==='Noninstructional')type='no_school';if(['no_school','holiday','pd','other'].includes(type)||mode==='none')return'no_class';if(type!=='school'||!['regular','open_shop','special'].includes(mode))return'schedule_unknown';return'teaching_day';}
  function create(options){options=options||{};var academic=options.academicProjection,pacing=options.pacing,lessons=options.lessons,schedule=options.schedule;
    if(!academic||!pacing||!lessons)throw new Error('Daily Teaching projection requires checked Academic, Pacing, and Lesson readers.');
    async function project(input){input=input||{};var context=await academic(input);if(!context||!context.selectedSection)return{status:'no_section',schoolDate:input.schoolDate||null};var section=context.selectedSection,effective=context.selectedSectionContext||null,scheduled=schedule?await schedule(input.schoolDate,section):{configured:false};
      if(!scheduled||scheduled.configured===false)return{status:'schedule_unknown',section:copy(section),schoolDate:input.schoolDate};
      var calendarStatus=teachingCalendarStatus(scheduled);if(calendarStatus!=='teaching_day')return{status:calendarStatus,section:copy(section),schoolDate:input.schoolDate,schedule:copy(scheduled)};
      if(!scheduled.sectionPlacement||!effective)return{status:'schedule_unknown',section:copy(section),schoolDate:input.schoolDate,schedule:copy(scheduled)};
      var focus=await pacing.getSectionTeachingFocus({sectionId:section.sectionId,semesterId:effective.semesterId,schoolDate:input.schoolDate,asOfSequence:input.asOfSequence});
      if(focus.status!=='planned')return{status:focus.status,section:copy(section),schoolDate:input.schoolDate,focus:copy(focus)};
      var lesson=await lessons.getLessonPlanbookProjection({lessonVersionId:focus.lessonVersion.lessonVersionId}),guide=lesson.teachingGuide||null;
      return{status:guide?'ready':'no_guide',section:copy(section),schoolDate:input.schoolDate,focus:copy(focus.focus),mode:focus.focus.payload.sharedInstructionMode,focusLabel:focus.focus.payload.focusLabel,planningNote:focus.focus.payload.planningNote,lesson:copy(lesson),guide:copy(guide),studentConnectionsRecorded:false,readOnly:true};
    }
    return{project:project};
  }
  return{create:create};
}));
