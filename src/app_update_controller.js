(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.ArcAppUpdate=factory();
})(typeof self!=='undefined'?self:this,function(){
  function create(options){
    options=options||{};
    var current={code:'idle',message:'Not checked this session.',ready:false,checking:false};
    var observedRegistration=null;
    var watchedWorkers=[];
    function online(){return options.isOnline?options.isOnline():true;}
    function emit(next){
      current=Object.assign({},current,next);
      if(options.onChange)options.onChange(state());
      return state();
    }
    function state(){return Object.assign({},current);}
    function markReady(registration){
      if(registration)observedRegistration=registration;
      return emit({code:'ready',message:'Update found — ready to apply.',ready:true,checking:false});
    }
    function watchWorker(worker,registration){
      if(!worker||watchedWorkers.indexOf(worker)>=0)return;
      watchedWorkers.push(worker);
      worker.addEventListener('statechange',function(){
        if(worker.state==='installed'){
          if(registration.waiting||(options.hasController&&options.hasController()))markReady(registration);
          else emit({code:'current',message:'ARC app shell is installed.',ready:false,checking:false});
        }else if(worker.state==='redundant'&&!registration.waiting){
          emit({code:'failed',message:'Update installation failed — Try Again.',ready:false,checking:false});
        }else if(worker.state==='installing'){
          emit({code:'installing',message:'Update found — installing safely…',ready:false,checking:true});
        }
      });
    }
    function observe(registration){
      if(!registration)return state();
      observedRegistration=registration;
      if(registration.waiting)markReady(registration);
      if(registration.installing)watchWorker(registration.installing,registration);
      if(!registration.__arcUpdateObserved){
        registration.__arcUpdateObserved=true;
        registration.addEventListener('updatefound',function(){
          emit({code:'installing',message:'Update found — installing safely…',ready:false,checking:true});
          watchWorker(registration.installing,registration);
        });
      }
      return state();
    }
    function check(registration){
      registration=registration||observedRegistration;
      if(!online())return Promise.resolve(emit({code:'offline',message:"Couldn't check for updates — you're offline."+(registration&&registration.waiting?' An installed update is still ready to apply.':''),ready:!!(registration&&registration.waiting),checking:false}));
      if(!registration||typeof registration.update!=='function')return Promise.resolve(emit({code:'unsupported',message:'Update check is not available in this browser session.',ready:false,checking:false}));
      observe(registration);
      emit({code:'checking',message:'Checking for update…',ready:!!registration.waiting,checking:true});
      return Promise.resolve().then(function(){return registration.update();}).then(function(){
        if(registration.waiting)return markReady(registration);
        if(registration.installing){watchWorker(registration.installing,registration);return emit({code:'installing',message:'Update found — installing safely…',ready:false,checking:true});}
        return emit({code:'current',message:'ARC is up to date.',ready:false,checking:false});
      }).catch(function(){
        if(!online())return emit({code:'offline',message:"Couldn't check for updates — you're offline."+(registration.waiting?' An installed update is still ready to apply.':''),ready:!!registration.waiting,checking:false});
        return emit({code:'failed',message:'Update check failed — Try Again.'+(registration.waiting?' An installed update is still ready to apply.':''),ready:!!registration.waiting,checking:false});
      });
    }
    function apply(registration){
      registration=registration||observedRegistration;
      if(!registration||!registration.waiting){
        emit({code:'not_ready',message:'No update is ready to apply.',ready:false,checking:false});
        return false;
      }
      emit({code:'applying',message:'Applying update… ARC will reopen when ready.',ready:false,checking:true});
      registration.waiting.postMessage({type:'SKIP_WAITING'});
      return true;
    }
    return {state:state,observe:observe,check:check,apply:apply,markReady:markReady};
  }
  return {create:create};
});
