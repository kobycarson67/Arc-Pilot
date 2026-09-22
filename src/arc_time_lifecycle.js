/* One nonpersistent wall-clock lifecycle for the header and Dashboard. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ArcTimeLifecycle=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function clock(now){return now.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit',hour12:true});}
  function secondsFromMidnight(now){return now.getHours()*3600+now.getMinutes()*60+now.getSeconds()+now.getMilliseconds()/1000;}
  function parseTime(value){if(!value)return null;var parts=String(value).split(':').map(Number);return parts.length>=2&&parts.every(Number.isFinite)?parts[0]*3600+parts[1]*60+(parts[2]||0):null;}
  function periodStatus(now,context,periodTimes,cleanupMinutes){
    if(!context||(context.kind!=='class'&&context.kind!=='planning'))return null;
    var period=periodTimes&&periodTimes[context.period],end=parseTime(period&&period.end);
    if(end===null)return null;
    var remaining=Math.ceil(end-secondsFromMidnight(now));
    if(remaining<=0)return null;
    var threshold=(cleanupMinutes==null?10:cleanupMinutes)*60;
    if(context.kind==='class'&&remaining<=threshold){
      var whole=Math.max(0,remaining),minutes=Math.floor(whole/60),seconds=whole%60;
      return {kind:'cleanup',remainingSeconds:whole,label:'CLEANUP · '+String(minutes).padStart(2,'0')+':'+String(seconds).padStart(2,'0'),nextDelay:1000};
    }
    var rounded=Math.max(1,Math.ceil(remaining/60));
    return {kind:context.kind,remainingSeconds:remaining,label:(context.kind==='planning'?'Planning · ':'')+rounded+' min left',nextDelay:null};
  }
  function create(options){
    var timer=null,running=false;
    function tick(){if(!running)return;var now=options.now(),delay=options.onTick(now);schedule(now,delay);}
    function schedule(now,requestedDelay){if(timer!==null)options.clearTimeout(timer);now=now||options.now();var delay=Number(requestedDelay)>=100?Number(requestedDelay):60000-(now.getSeconds()*1000+now.getMilliseconds());timer=options.setTimeout(tick,Math.max(100,delay));}
    function wake(){if(!running)return;var now=options.now(),delay=options.onTick(now);schedule(now,delay);}
    function start(){if(running)return;running=true;wake();}
    function stop(){running=false;if(timer!==null)options.clearTimeout(timer);timer=null;}
    return {start:start,stop:stop,wake:wake,clock:clock};
  }
  return {clock:clock,periodStatus:periodStatus,create:create};
});
