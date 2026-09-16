/* ARC Project Checkpoint Host Bridge.
   Coordinates transaction -> host state replacement -> history -> autosave.
   Host functions are injected so this module remains independently testable. */
(function(root,factory){
  var api=factory(root.ArcProjectCheckpointPersistence||(typeof require==='function'?require('./project_checkpoint_persistence'):null));
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcProjectCheckpointHostBridge=api;
}(this,function(X){
  function required(host,name){return host&&typeof host[name]==='function';}
  function execute(host,state,student,projectId,action,checkpointId,extra){
    if(!required(host,'replaceStudent')||!required(host,'save'))return {ok:false,changed:false,error:'host_not_ready'};
    var tx=X.transact(state,student,projectId,action,checkpointId,extra||{});
    if(!tx.changed)return {ok:true,changed:false,transaction:tx};
    var history=required(host,'getHistory')?host.getHistory():[];
    var nextHistory=X.appendHistory(history,tx.historyEntry);
    try{
      host.replaceStudent(tx.student);
      if(required(host,'setHistory'))host.setHistory(nextHistory);
      host.save();
      return {ok:true,changed:true,student:tx.student,history:nextHistory,historyEntry:tx.historyEntry,undo:tx.undo};
    }catch(err){
      try{host.replaceStudent(student);if(required(host,'setHistory'))host.setHistory(history);}catch(ignore){}
      return {ok:false,changed:false,error:'save_failed',message:err&&err.message||'',transaction:tx};
    }
  }
  function undo(host,currentStudent,undoToken,history){
    if(!required(host,'replaceStudent')||!required(host,'save'))return {ok:false,changed:false,error:'host_not_ready'};
    var u=X.applyUndo(currentStudent,undoToken);if(!u.changed)return {ok:true,changed:false,student:currentStudent};
    var oldHistory=Array.isArray(history)?history:(required(host,'getHistory')?host.getHistory():[]),nextHistory=oldHistory.filter(function(h){return !undoToken.historyId||h.id!==undoToken.historyId;});
    try{host.replaceStudent(u.student);if(required(host,'setHistory'))host.setHistory(nextHistory);host.save();return {ok:true,changed:true,student:u.student,history:nextHistory};}
    catch(err){try{host.replaceStudent(currentStudent);if(required(host,'setHistory'))host.setHistory(oldHistory);}catch(ignore){}return {ok:false,changed:false,error:'save_failed',message:err&&err.message||''};}
  }
  return {execute:execute,undo:undo};
}));
