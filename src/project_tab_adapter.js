/* ARC Project Tab Adapter.
   Safe integration boundary between existing ARC student project records and
   the tested checkpoint presenter/controller. No storage writes happen here. */
(function(root,factory){
  var api=factory(root.ArcProjectCheckpointPresenter||(typeof require==='function'?require('./project_checkpoint_presenter'):null));
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcProjectTabAdapter=api;
}(this,function(P){
  function arr(x){return Array.isArray(x)?x:[];}
  function projectId(p,index){return (p&&(p.id||p.assignmentId||p.templateId))||('project-'+index);}
  function findProject(student,id){var list=arr(student&&student.projects),index=list.findIndex(function(p,i){return projectId(p,i)===id;});return {index:index,project:index>=0?list[index]:null};}
  function cards(student){return arr(student&&student.projects).map(function(project,index){var view=P.present(project);return {id:projectId(project,index),index:index,title:view.title,status:project&&project.status||'',legacy:view.legacy,summary:view.summary,progressText:view.progressText,currentText:view.currentText,readyText:view.readyText,complete:view.complete,primaryActions:view.primaryActions,checkpointRows:view.rows};});}
  function context(state,student,extra){extra=extra||{};var enrollment=arr(student&&student.enrollments).find(function(e){return e&&e.active&&e.year===state.academicYear&&e.semester===state.semester;})||{};return {timestamp:extra.timestamp||'',date:extra.date||'',academicYear:state.academicYear||'',semester:state.semester||'',sectionId:extra.sectionId||enrollment.sectionId||state.activeSectionId||'',verifiedBy:extra.verifiedBy||'',attendanceStatus:extra.attendanceStatus||'',note:extra.note,measurement:extra.measurement,activityNote:extra.activityNote||'',activityId:extra.activityId||'',initializeOptions:extra.initializeOptions};}
  function apply(state,student,projectIdValue,action,checkpointId,extra){var found=findProject(student,projectIdValue);if(found.index<0)return {changed:false,student:student,project:null};var original=found.project,next=P.apply(original,action,checkpointId,context(state||{},student||{},extra));if(next===original)return {changed:false,student:student,project:original};var copy=Object.assign({},student),projects=arr(student.projects).slice();projects[found.index]=next;copy.projects=projects;return {changed:true,student:copy,project:next,projectIndex:found.index};}
  return {projectId:projectId,findProject:findProject,cards:cards,context:context,apply:apply};
}));
