/* ARC Project Checkpoint Controller.
   Small, shop-friendly actions over the tested checkpoint model.
   No persistence or grading: caller owns save/history UI integration. */
(function(root,factory){
  var api=factory(root.ArcProjectCheckpoints||(typeof require==='function'?require('./project_checkpoints'):null));
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcProjectCheckpointController=api;
}(this,function(C){
  function todayFrom(timestamp,date){return date||(timestamp?String(timestamp).slice(0,10):'');}
  function initialize(project,options){return C.initializeProject(project,options);}
  function current(project){var view=C.viewForProject(project);if(view.legacy)return null;var id=view.progress.currentCheckpointId;return view.checkpoints.find(function(c){return c.id===id;})||null;}
  function act(project,checkpointId,status,context){context=context||{};return C.transition(project,checkpointId,status,{timestamp:context.timestamp||'',date:todayFrom(context.timestamp,context.date),verifiedBy:context.verifiedBy||'',attendanceStatus:context.attendanceStatus||'',note:context.note,measurement:context.measurement,activityNote:context.activityNote||'',activityId:context.activityId||''});}
  function start(project,checkpointId,context){return act(project,checkpointId,'in_progress',context);}
  function ready(project,checkpointId,context){return act(project,checkpointId,'ready_for_review',context);}
  function verify(project,checkpointId,context){return act(project,checkpointId,'verified',context);}
  function reopen(project,checkpointId,context){return act(project,checkpointId,'in_progress',context);}
  function recordOpportunity(project,checkpointId,context){context=context||{};return C.addActivity(project,{id:context.activityId||'',checkpointId:checkpointId||'',type:'opportunity',date:todayFrom(context.timestamp,context.date),attendanceStatus:context.attendanceStatus||'',opportunityConfirmed:context.opportunityConfirmed===true,meaningfulProgress:false,note:context.note||''});}
  function quickState(project){var view=C.viewForProject(project);if(view.legacy)return {legacy:true,current:null,readyCount:0,verifiedCount:0,activeCount:0,complete:false};var cur=current(project);return {legacy:false,current:cur?{id:cur.id,name:cur.name,status:cur.status}:null,readyCount:view.progress.readyCheckpointIds.length,verifiedCount:view.progress.verifiedCount,activeCount:view.progress.activeCount,complete:view.progress.complete};}
  return {initialize:initialize,current:current,start:start,ready:ready,verify:verify,reopen:reopen,recordOpportunity:recordOpportunity,quickState:quickState};
}));
