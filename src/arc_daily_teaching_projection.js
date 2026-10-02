/* Daily Teaching First Slice 1: read-only composition over Academic, Pacing, and Lesson owners. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcDailyTeachingProjection=api;}(this,function(){
  'use strict';
  function copy(x){return x==null?x:JSON.parse(JSON.stringify(x));}
  function create(options){options=options||{};var academic=options.academicProjection,pacing=options.pacing,lessons=options.lessons,schedule=options.schedule;
    if(!academic||!pacing||!lessons)throw new Error('Daily Teaching projection requires checked Academic, Pacing, and Lesson readers.');
    async function project(input){input=input||{};var context=await academic(input);if(!context||!context.selectedSection)return{status:'no_section',schoolDate:input.schoolDate||null};var section=context.selectedSection,scheduled=schedule?await schedule(input.schoolDate,section):{configured:false};
      if(!scheduled||scheduled.configured===false)return{status:'schedule_unknown',section:copy(section),schoolDate:input.schoolDate};
      if(scheduled.dayType==='Noninstructional')return{status:'no_class',section:copy(section),schoolDate:input.schoolDate,schedule:copy(scheduled)};
      if(!scheduled.sectionPlacement)return{status:'schedule_unknown',section:copy(section),schoolDate:input.schoolDate,schedule:copy(scheduled)};
      var focus=await pacing.getSectionTeachingFocus({sectionId:section.sectionId,semesterId:section.semesterId,schoolDate:input.schoolDate,asOfSequence:input.asOfSequence});
      if(focus.status!=='planned')return{status:focus.status,section:copy(section),schoolDate:input.schoolDate,focus:copy(focus)};
      var lesson=await lessons.getLessonPlanbookProjection({lessonVersionId:focus.lessonVersion.lessonVersionId}),guide=lesson.teachingGuide||null;
      return{status:guide?'ready':'no_guide',section:copy(section),schoolDate:input.schoolDate,focus:copy(focus.focus),mode:focus.focus.payload.sharedInstructionMode,focusLabel:focus.focus.payload.focusLabel,planningNote:focus.focus.payload.planningNote,lesson:copy(lesson),guide:copy(guide),studentConnectionsRecorded:false,readOnly:true};
    }
    return{project:project};
  }
  return{create:create};
}));
