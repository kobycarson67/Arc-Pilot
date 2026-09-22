/* One nonpersistent wall-clock lifecycle for the header and Dashboard. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ArcTimeLifecycle=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function clock(now){return now.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit',hour12:true});}
  function create(options){
    var timer=null,running=false;
    function tick(){if(!running)return;options.onTick(options.now());schedule();}
    function schedule(){if(timer!==null)options.clearTimeout(timer);var now=options.now(),delay=60000-(now.getSeconds()*1000+now.getMilliseconds());timer=options.setTimeout(tick,Math.max(100,delay));}
    function wake(){if(!running)return;options.onTick(options.now());schedule();}
    function start(){if(running)return;running=true;wake();}
    function stop(){running=false;if(timer!==null)options.clearTimeout(timer);timer=null;}
    return {start:start,stop:stop,wake:wake,clock:clock};
  }
  return {clock:clock,create:create};
});
