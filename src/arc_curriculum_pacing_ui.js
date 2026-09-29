/* Stage 14 P10B-UI read/pacing controller. It owns presentation adaptation only. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcCurriculumPacingUI=api;}(this,function(){
  'use strict';
  function fail(code,message,context){var e=new Error(message);e.code=code;e.context=context||{};throw e;}
  function copy(value){return value==null?value:JSON.parse(JSON.stringify(value));}
  function create(options){options=options||{};var adapter=options.adapter;if(!adapter)fail('ADAPTER_REQUIRED','Curriculum/Pacing UI requires the exclusive authority adapter.');
    async function read(action,payload){return adapter.runIsolated(action,payload||{});}
    async function courseView(input){
      var results=await Promise.all([
        read('getCourseStandards',{courseId:input.courseId}),
        read('getEssentialStandards',{courseId:input.courseId,catalogVersionId:input.standardCatalogVersionId}),
        read('getCurriculumMap',{courseId:input.courseId,curriculumMapVersionId:input.curriculumMapVersionId}),
        input.curriculumMapVersionId?read('getCurriculumCoverage',{curriculumMapVersionId:input.curriculumMapVersionId}):Promise.resolve(null),
        input.sectionId&&input.semesterId?read('getSectionPacing',{sectionId:input.sectionId,semesterId:input.semesterId}):Promise.resolve(null),
        input.sectionId&&input.semesterId?read('getSectionPacingHistory',{sectionId:input.sectionId,semesterId:input.semesterId}):Promise.resolve(null)
      ]);
      var map=results[2],items=map&&map.items?map.items.slice().sort(function(a,b){return String(a.item.orderPath).localeCompare(String(b.item.orderPath))||String(a.item.curriculumMapItemId).localeCompare(String(b.item.curriculumMapItemId));}):[];
      return copy({courseId:input.courseId,standards:results[0],essentialStandards:results[1],curriculumMap:map?Object.assign({},map,{items:items}):null,coverage:results[3],sectionPacing:results[4],pacingHistory:results[5],academicContext:{schoolYearId:input.schoolYearId||null,semesterId:input.semesterId||null,gradingPeriodId:input.gradingPeriodId||null},futurePacingUnknown:!!(results[4]&&!results[4].configured)});
    }
    async function curriculumItem(input){return read('getCurriculumItem',{curriculumMapItemId:input.curriculumMapItemId});}
    async function command(input){
      var current=await read('getSectionPacing',{sectionId:input.sectionId,semesterId:input.semesterId});
      if(!current.configured)fail('PACING_NOT_CONFIGURED','Future or unconfigured Semester pacing remains unknown until the instructor creates a plan.');
      var request=Object.assign({},copy(input.command||{}),{sectionPacingPlanId:current.plan.sectionPacingPlanId,sectionId:input.sectionId,expectedRevision:current.plan.revision,expectedSequence:current.plan.lastSequence});
      var preview=await read('previewPacingCommand',request);
      if(input.previewOnly)return preview;
      return read('appendPacingCommand',request);
    }
    async function snapshot(input){return read('createPacingSnapshot',copy(input));}
    async function closeout(input){var preview=await read('previewSemesterPacingCloseout',copy(input));if(input.previewOnly)return preview;return read('closeSemesterPacing',copy(input));}
    function autoBuild(){fail('LESSON_AUTHORITY_REQUIRED','Auto Build remains on the accepted v7 path until P10C provides reviewed Lesson Plan authority.');}
    return{courseView:courseView,curriculumItem:curriculumItem,command:command,snapshot:snapshot,closeout:closeout,autoBuild:autoBuild};
  }
  return{create:create};
}));
