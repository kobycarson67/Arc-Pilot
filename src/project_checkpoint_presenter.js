/* ARC Project Checkpoint Presenter.
   Converts checkpoint/controller state into a compact tablet-facing view model.
   Presentation only: no persistence, grading, or automatic decisions. */
(function(root,factory){
  var api=factory(root.ArcProjectCheckpoints||(typeof require==='function'?require('./project_checkpoints'):null),root.ArcProjectCheckpointController||(typeof require==='function'?require('./project_checkpoint_controller'):null));
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcProjectCheckpointPresenter=api;
}(this,function(C,K){
  function label(status){return {not_started:'Not Started',in_progress:'In Progress',ready_for_review:'Ready for Review',verified:'Verified'}[status]||'Not Started';}
  function actionsFor(checkpoint){if(!checkpoint||checkpoint.enabled===false)return [];
    if(checkpoint.status==='not_started')return [{id:'start',label:'Start',primary:true}];
    if(checkpoint.status==='in_progress')return [{id:'ready',label:'Ready for Review',primary:true}];
    if(checkpoint.status==='ready_for_review')return [{id:'verify',label:'Verify',primary:true},{id:'reopen',label:'Needs More Work',primary:false}];
    if(checkpoint.status==='verified')return [{id:'reopen',label:'Reopen',primary:false}];
    return [];
  }
  function checkpointRow(c,currentId){return {id:c.id,name:c.name,order:c.order,status:c.status,statusLabel:label(c.status),enabled:c.enabled!==false,current:c.id===currentId,note:c.note||'',measurement:c.measurement||'',photoCount:Array.isArray(c.photoIds)?c.photoIds.length:0,actions:actionsFor(c)};}
  function present(project){var view=C.viewForProject(project);
    if(view.legacy)return {legacy:true,title:(project&&project.name)||(project&&project.title)||'Project',summary:'Checkpoint tracking not started',progressText:'',currentText:'',readyText:'',complete:false,rows:[],primaryActions:[{id:'initialize',label:'Start Checkpoint Tracking',primary:true}]};
    var q=K.quickState(project),rows=view.checkpoints.filter(function(c){return c.enabled;}).map(function(c){return checkpointRow(c,q.current&&q.current.id);});
    var ready=q.readyCount||0,current=q.current;
    return {legacy:false,title:(project&&project.name)||(project&&project.title)||'Project',summary:q.complete?'All checkpoints verified':q.verifiedCount+'/'+q.activeCount+' verified',progressText:q.verifiedCount+'/'+q.activeCount+' verified',currentText:current?('Current: '+current.name):'',readyText:ready?(ready+' waiting for review'):'',complete:q.complete,rows:rows,primaryActions:current?actionsFor(view.checkpoints.find(function(c){return c.id===current.id;})):[]};
  }
  function apply(project,action,checkpointId,context){if(action==='initialize')return K.initialize(project,context&&context.initializeOptions);if(action==='start')return K.start(project,checkpointId,context);if(action==='ready')return K.ready(project,checkpointId,context);if(action==='verify')return K.verify(project,checkpointId,context);if(action==='reopen')return K.reopen(project,checkpointId,context);return project;}
  return {label:label,actionsFor:actionsFor,checkpointRow:checkpointRow,present:present,apply:apply};
}));
