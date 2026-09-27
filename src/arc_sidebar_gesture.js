/* Pure pointer-gesture authority for the existing responsive ARC sidebar. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ArcSidebarGesture=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function create(options){
    var active=null;
    function begin(input){
      if(input.blocked||(!input.open&&!input.startSurface&&input.x>options.edgeWidth))return false;
      active={pointerId:input.pointerId,startX:input.x,startY:input.y,lastX:input.x,lastTime:input.time,open:!!input.open,intent:'pending'};
      return true;
    }
    function move(input){
      if(!active||input.pointerId!==active.pointerId)return null;
      var dx=input.x-active.startX,dy=input.y-active.startY;
      if(active.intent==='pending'&&(Math.abs(dx)>=options.intentDistance||Math.abs(dy)>=options.intentDistance)){
        if(Math.abs(dy)>Math.abs(dx)){active=null;return {cancelled:true};}
        active.intent='horizontal';
      }
      if(active.intent!=='horizontal')return {pending:true};
      var base=active.open?1:0,progress=Math.max(0,Math.min(1,base+dx/options.drawerTravel));
      var elapsed=Math.max(1,input.time-active.lastTime),velocity=(input.x-active.lastX)/elapsed;
      active.lastX=input.x;active.lastTime=input.time;active.progress=progress;active.velocity=velocity;
      return {dragging:true,progress:progress};
    }
    function end(input){
      if(!active||input.pointerId!==active.pointerId)return null;
      var snapshot=active;active=null;
      if(snapshot.intent!=='horizontal')return {cancelled:true,open:snapshot.open};
      var progress=snapshot.progress==null?(snapshot.open?1:0):snapshot.progress,releaseDelay=Math.max(0,input.time-snapshot.lastTime),velocity=releaseDelay<=80?(snapshot.velocity||0):0;
      var open=velocity>=options.flickVelocity?true:velocity<=-options.flickVelocity?false:progress>=options.settleProgress;
      return {settled:true,open:open,progress:progress,velocity:velocity};
    }
    function cancel(){var was=active;active=null;return was?{cancelled:true,open:was.open}:null;}
    return {begin:begin,move:move,end:end,cancel:cancel,isActive:function(){return !!active;}};
  }
  return {create:create};
});
