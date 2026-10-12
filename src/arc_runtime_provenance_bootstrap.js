(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcRuntimeProvenanceBootstrap=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var TARGETS=Object.freeze(['active','waiting']);
  function InspectorError(code,message,details){this.name='InspectorError';this.code=code;this.message=message;this.details=details||null;if(Error.captureStackTrace)Error.captureStackTrace(this,InspectorError);}
  InspectorError.prototype=Object.create(Error.prototype);InspectorError.prototype.constructor=InspectorError;
  function fail(code,message,details){throw new InspectorError(code,message,details);}
  function object(value){return !!value&&typeof value==='object'&&!Array.isArray(value);}
  function copy(value){return value==null?value:JSON.parse(JSON.stringify(value));}
  function create(options){
    options=options||{};var provenance=options.provenance,closure=options.closureVerifier,browser=options.browser;
    if(!provenance||typeof provenance.validateReleaseManifest!=='function'||typeof provenance.validateReceipt!=='function'||typeof provenance.markerIdentityHash!=='function'||typeof provenance.validateCompatibilityRecord!=='function'||typeof provenance.validateCompatibilityBinding!=='function'||typeof provenance.resolveCurrent!=='function'||typeof provenance.sha256!=='function')fail('PROVENANCE_DEPENDENCY_REQUIRED','The accepted Stage 1D-Core provenance validator is required.');
    if(!closure||typeof closure.verify!=='function')fail('CLOSURE_DEPENDENCY_REQUIRED','The accepted Stage 1D-Core closure verifier is required.');
    if(!browser||typeof browser.readWorkerIdentities!=='function'||typeof browser.readCache!=='function')fail('READ_ONLY_BROWSER_REQUIRED','Injected read-only worker and cache readers are required.');
    async function inspect(input){
      input=input||{};var diagnostics=[],evidence={manifest:null,receipt:null,markerIdentitySha256:null,currentCompatibilityRecord:null,workers:null,cache:null,urlClaimTrusted:false};
      function add(code,message,details,blocking){diagnostics.push({code:code,message:message,details:details||null,blocking:blocking!==false});}
      async function capture(fn,fallbackCode){try{return await fn();}catch(error){add(error.code||fallbackCode,error.message||String(error),error.details||null,true);return null;}}
      var manifest=await capture(function(){return provenance.validateReleaseManifest(input.manifest);},'MANIFEST_INVALID');
      if(manifest)evidence.manifest={releaseId:manifest.releaseId,manifestSha256:manifest.manifestSha256,closureSha256:manifest.closureSha256,commit:manifest.commit,tree:manifest.tree,buildIdentity:manifest.buildIdentity,assetCount:manifest.assets.length};
      var checkedReceipt=manifest?await capture(function(){return provenance.validateReceipt(input.receipt,manifest);},'RECEIPT_INVALID'):null;
      if(checkedReceipt)evidence.receipt={receiptSha256:checkedReceipt.receiptSha256,status:checkedReceipt.receipt.independentReview.status,evidenceSha256:checkedReceipt.receipt.independentReview.evidenceSha256};
      if(!object(input.markerProjection))add('MARKER_PROJECTION_REQUIRED','A caller-supplied read-only activation-marker projection is required.',null,true);
      else evidence.markerIdentitySha256=await capture(function(){return provenance.markerIdentityHash(input.markerProjection);},'MARKER_IDENTITY_INVALID');
      if(!object(input.hintProjection))add('ACTIVATION_HINT_REQUIRED','A caller-supplied read-only activation hint is required.',null,true);
      else if(object(input.markerProjection)&&(input.hintProjection.authorityState!==input.markerProjection.authorityState||input.hintProjection.databaseName!==input.markerProjection.databaseName||input.hintProjection.markerId!==input.markerProjection.id))add('MARKER_HINT_DISAGREEMENT','The supplied activation marker and hint do not agree.',{marker:{id:input.markerProjection.id||null,authorityState:input.markerProjection.authorityState||null,databaseName:input.markerProjection.databaseName||null},hint:{markerId:input.hintProjection.markerId||null,authorityState:input.hintProjection.authorityState||null,databaseName:input.hintProjection.databaseName||null}},true);
      var records=[];
      if(!Array.isArray(input.compatibilityRecords))add('COMPATIBILITY_RECORDS_REQUIRED','Compatibility records must be supplied as an array.',null,true);
      else for(var record of input.compatibilityRecords){var validated=await capture(function(){return provenance.validateCompatibilityRecord(record,{markerIdentitySha256:evidence.markerIdentitySha256||undefined});},'COMPATIBILITY_RECORD_INVALID');if(validated)records.push(validated);}
      var current=null;
      if(Array.isArray(input.compatibilityRecords)&&records.length===input.compatibilityRecords.length){current=await capture(function(){return provenance.resolveCurrent(records);},'COMPATIBILITY_HISTORY_INVALID');if(!current)add('CURRENT_COMPATIBILITY_RECORD_MISSING','No single current approved compatibility record is present.',{recordCount:records.length},true);}
      if(current&&manifest&&checkedReceipt&&evidence.markerIdentitySha256){var binding=await capture(function(){return provenance.validateCompatibilityBinding(current,manifest,checkedReceipt.receipt,{markerIdentitySha256:evidence.markerIdentitySha256});},'COMPATIBILITY_BINDING_INVALID');if(binding)evidence.currentCompatibilityRecord={recordId:binding.record.recordId,status:binding.record.status,releaseId:binding.record.releaseId};}
      var target=TARGETS.includes(input.targetWorker)?input.targetWorker:null;
      if(!target)add('WORKER_TARGET_INVALID','Target worker must be active or waiting.',{target:input.targetWorker||null},true);
      var workers=await capture(function(){return browser.readWorkerIdentities();},'BROWSER_WORKER_EVIDENCE_UNAVAILABLE');
      if(workers){evidence.workers=copy(workers);var active=workers.active||null,waiting=workers.waiting||null;if(active&&waiting&&active.releaseId&&waiting.releaseId&&active.releaseId!==waiting.releaseId)add('MIXED_WORKER_RELEASES','Active and waiting workers report different release identities.',{activeReleaseId:active.releaseId,waitingReleaseId:waiting.releaseId},true);var selected=target&&workers[target];if(!selected)add('TARGET_WORKER_UNAVAILABLE','The requested worker is unavailable.',{target:target},true);else if(!selected.releaseId)add('WORKER_RELEASE_ID_UNAVAILABLE','The requested worker does not expose a verified release identity.',{target:target,scriptURL:selected.scriptURL||null},true);else if(manifest&&selected.releaseId!==manifest.releaseId)add('STALE_WORKER_IDENTITY','The requested worker release differs from the reviewed manifest.',{target:target,workerReleaseId:selected.releaseId,manifestReleaseId:manifest.releaseId},true);}
      if(input.claimedUrlIdentity){var claim=copy(input.claimedUrlIdentity),matches=!!manifest&&claim.commit===manifest.commit&&claim.tree===manifest.tree;add(matches?'URL_IDENTITY_UNTRUSTED':'URL_IDENTITY_STALE_OR_FORGED','URL-supplied publication identity is diagnostic only and is never runtime proof.',{claim:claim,matchesReviewedManifest:matches},false);}
      if(manifest){var cache=await capture(function(){return browser.readCache(input.cacheName);},'BROWSER_CACHE_EVIDENCE_UNAVAILABLE');if(cache){var closureResult=await capture(function(){return closure.verify({manifest:manifest,cache:cache,validateManifest:provenance.validateReleaseManifest,sha256:provenance.sha256,expectedOrigin:input.expectedOrigin});},'CACHE_CLOSURE_INVALID');if(closureResult)evidence.cache={cacheName:input.cacheName||null,releaseId:closureResult.releaseId,manifestSha256:closureResult.manifestSha256,closureSha256:closureResult.closureSha256,assetCount:closureResult.assetCount};}}
      var blocking=diagnostics.filter(function(x){return x.blocking;});return Object.freeze({agreement:blocking.length===0,state:blocking.length===0?'EVIDENCE_AGREES':'EVIDENCE_INCOMPLETE_OR_MISMATCHED',nonEnforcing:true,transfersAuthority:false,realStudentDataAuthorized:false,evidence:Object.freeze(evidence),diagnostics:Object.freeze(diagnostics)});
    }
    return Object.freeze({inspect:inspect,constants:Object.freeze({mode:'LOCAL_READ_ONLY_NON_ENFORCING',targets:TARGETS.slice()})});
  }
  return Object.freeze({create:create,InspectorError:InspectorError,constants:Object.freeze({mode:'LOCAL_READ_ONLY_NON_ENFORCING'})});
});
