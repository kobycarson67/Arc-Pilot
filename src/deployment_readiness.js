(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ArcDeployment=factory();})(typeof self!=='undefined'?self:this,function(){
  'use strict';
  function hashText(text){var hash=2166136261,i;for(i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}return ('00000000'+(hash>>>0).toString(16)).slice(-8);}
  function stateIntegrity(state){return {algorithm:'fnv1a32',value:hashText(JSON.stringify(state))};}
  function verifyStateIntegrity(state,integrity){if(!integrity)return {verified:false,legacy:true};if(integrity.algorithm!=='fnv1a32')throw new Error('Backup integrity algorithm is not supported.');var actual=stateIntegrity(state).value;if(actual!==integrity.value)throw new Error('Backup integrity check failed. The file may be incomplete or changed.');return {verified:true,legacy:false};}
  function readiness(input){input=input||{};var checks=[
    {id:'https',label:'Hosted over HTTPS',ok:!!input.hosted,required:true},
    {id:'storage',label:'Browser record storage works',ok:!!input.storageAvailable,required:true},
    {id:'shell',label:'Offline app shell registered',ok:!!input.serviceWorker,required:true},
    {id:'backup',label:'Recovery backup exported on this device',ok:!!input.backupExported,required:true},
    {id:'persist',label:'Persistent-storage protection granted',ok:!!input.persistentStorage,required:false},
    {id:'cloud',label:'OneDrive recovery connected',ok:!!input.cloudConnected,required:false}
  ];var blockers=checks.filter(function(x){return x.required&&!x.ok;});return {checks:checks,blockers:blockers,pilotReady:blockers.length===0&&!!input.backupExported,productionReady:blockers.length===0&&!!input.persistentStorage&&!!input.cloudConnected};}
  return {hashText:hashText,stateIntegrity:stateIntegrity,verifyStateIntegrity:verifyStateIntegrity,readiness:readiness};
});
