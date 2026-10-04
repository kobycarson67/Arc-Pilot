/* Controller for the dedicated ARC instructional-reference read-only engineering page. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else{root.ArcInstructionalReferenceVerificationPage=api;if(root.document){var start=function(){api.mount({document:root.document,verificationFactory:root.ArcInstructionalReferencePhysicalVerification&&root.ArcInstructionalReferencePhysicalVerification.create});};if(root.document.readyState==='loading')root.document.addEventListener('DOMContentLoaded',start,{once:true});else start();}}}(this,function(){
  'use strict';
  function pretty(value){return JSON.stringify(value,function(key,item){return key==='text'||key==='package'?undefined:item;},2);}
  function defaultDownload(root,value){var blob=new Blob([value.text],{type:'application/json'}),url=URL.createObjectURL(blob),anchor=root.createElement('a');anchor.href=url;anchor.download=value.filename;anchor.rel='noopener';root.body.appendChild(anchor);anchor.click();anchor.remove();URL.revokeObjectURL(url);}
  function mount(options){
    options=options||{};var doc=options.document,factory=options.verificationFactory,download=options.download||function(value){defaultDownload(doc,value);};
    if(!doc||typeof factory!=='function')throw Error('Read-only instructional-reference verification dependencies are unavailable.');
    var verifier=factory(),status=doc.getElementById('status'),panel=doc.getElementById('statusPanel'),inspect=doc.getElementById('inspectStructure'),pre=doc.getElementById('capturePre'),run=doc.getElementById('runReference'),post=doc.getElementById('capturePost'),authority=doc.getElementById('authority');
    authority.textContent=pretty(verifier.constants);var busy=false;
    function show(value,ok){status.textContent=pretty(value);panel.classList.remove('error','ok');panel.classList.add(ok?'ok':'error');}
    async function action(button,operation,next,shouldDownload){if(busy)return;busy=true;button.disabled=true;try{var value=await operation();if(shouldDownload)download(value);show(value,true);if(next)next.disabled=false;}catch(error){show({code:error&&error.code||'VERIFICATION_FAILED',message:error&&error.message||String(error),context:error&&error.context||null},false);button.disabled=false;}finally{busy=false;}}
    inspect.addEventListener('click',function(){action(inspect,function(){return verifier.inspectExactStructure();},pre,false);});
    pre.addEventListener('click',function(){action(pre,function(){return verifier.capturePreBackup();},run,true);});
    run.addEventListener('click',function(){action(run,function(){return verifier.runReferenceVerification();},post,false);});
    post.addEventListener('click',function(){action(post,function(){return verifier.capturePostBackupAndVerify();},null,true);});
    return Object.freeze({mounted:true,authority:verifier.constants});
  }
  return Object.freeze({mount:mount});
}));
