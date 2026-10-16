(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcServiceWorkerClosure=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function ClosureError(code,message,details){this.name='ClosureError';this.code=code;this.message=message;this.details=details||null;if(Error.captureStackTrace)Error.captureStackTrace(this,ClosureError);}
  ClosureError.prototype=Object.create(Error.prototype);ClosureError.prototype.constructor=ClosureError;
  function fail(code,message,details){throw new ClosureError(code,message,details);}
  function scopeInfo(expectedScope,expectedOrigin){
    if(!expectedScope)return null;var scope;try{scope=new URL(expectedScope);}catch(error){fail('INVALID_CACHE_SCOPE','Service-worker scope is malformed.',{scope:expectedScope});}
    if(expectedOrigin&&scope.origin!==expectedOrigin)fail('INVALID_CACHE_SCOPE','Service-worker scope has an unexpected origin.',{scope:expectedScope,expectedOrigin:expectedOrigin});
    if(scope.search||scope.hash||!scope.pathname.endsWith('/'))fail('INVALID_CACHE_SCOPE','Service-worker scope must be an unambiguous directory URL.',{scope:expectedScope});
    return scope;
  }
  function assertPlainPath(path,value){
    if(!path||path.startsWith('/')||path.includes('\\')||path.includes('?')||path.includes('#')||/%[0-9a-f]{2}/i.test(path)||path.split('/').some(function(x){return!x||x==='.'||x==='..';}))fail('UNSAFE_CACHE_PATH','Cache path is not a normalized local path.',{path:value});
    return path;
  }
  function normalize(value,expectedOrigin,expectedScope){
    var raw=String(value||''),path=raw,scope=scopeInfo(expectedScope,expectedOrigin);
    if(/^[a-z][a-z0-9+.-]*:/i.test(raw)){
      var parsed;try{parsed=new URL(raw);}catch(error){fail('UNSAFE_CACHE_PATH','Cached request URL is malformed.',{path:value});}
      if(!expectedOrigin||parsed.origin!==expectedOrigin)fail('CROSS_ORIGIN_CACHE_ENTRY','Cached authority entry has an unexpected origin.',{path:value,expectedOrigin:expectedOrigin||null});
      if(parsed.search||parsed.hash)fail('UNSAFE_CACHE_PATH','Cached authority URL may not contain a query or fragment.',{path:value});
      if(!scope)fail('CACHE_SCOPE_REQUIRED','Absolute cached request URLs require the exact service-worker scope.',{path:value});
      if(!parsed.pathname.startsWith(scope.pathname))fail('OUT_OF_SCOPE_CACHE_ENTRY','Cached authority entry is outside the service-worker scope.',{path:value,scope:scope.href});
      path=parsed.pathname.slice(scope.pathname.length);
    }else{
      if(raw.startsWith('./'))path=raw.slice(2);
      if(/^[a-z][a-z0-9+.-]*:/i.test(path))fail('UNSAFE_CACHE_PATH','Cache path may not use a URL scheme.',{path:value});
    }
    return assertPlainPath(path,value);
  }
  function lookupKey(path,expectedScope){return expectedScope?new URL(path,expectedScope).href:path;}
  async function responseBytes(response){if(!response)fail('CACHE_ASSET_MISSING','Required cached response is absent.');if(response.redirected)fail('CACHE_REDIRECT_REFUSED','Redirected authority asset is forbidden.');if(response.ok===false)fail('CACHE_RESPONSE_INVALID','Authority asset cache response is not successful.',{status:response.status});if(typeof response.arrayBuffer==='function')return new Uint8Array(await response.arrayBuffer());if(response.bytes instanceof Uint8Array)return response.bytes;if(typeof response.text==='function')return new TextEncoder().encode(await response.text());fail('CACHE_RESPONSE_INVALID','Cached response cannot provide raw bytes.');}
  async function verify(options){
    options=options||{};var manifest=options.manifest,cache=options.cache,validateManifest=options.validateManifest,sha256=options.sha256;
    if(typeof validateManifest!=='function'||typeof sha256!=='function'||!cache||typeof cache.match!=='function')fail('VERIFIER_DEPENDENCY_REQUIRED','Pure closure verification requires injected manifest validation, SHA-256, and cache lookup.');manifest=await validateManifest(manifest);scopeInfo(options.expectedScope,options.expectedOrigin);var expected=new Map(),folded=new Map();for(var asset of manifest.assets){var path=normalize(asset.path),lower=path.toLowerCase();if(folded.has(lower))fail('AMBIGUOUS_CACHE_PATH','Manifest cache paths collide by case.',{path:path,prior:folded.get(lower)});folded.set(lower,path);expected.set(path,asset);}
    var verified=[];for(var pair of expected){var path=pair[0],asset=pair[1],response=await cache.match(lookupKey(path,options.expectedScope),{ignoreSearch:false,ignoreVary:false});var bytes=await responseBytes(response);if(bytes.byteLength!==asset.byteCount)fail('CACHE_ASSET_SIZE_MISMATCH','Cached authority asset size differs.',{path:path,expected:asset.byteCount,actual:bytes.byteLength});var digest=await sha256(bytes);if(digest!==asset.sha256)fail('CACHE_ASSET_HASH_MISMATCH','Cached authority asset hash differs.',{path:path,expected:asset.sha256,actual:digest});verified.push({path:path,byteCount:bytes.byteLength,sha256:digest});}
    if(typeof cache.keys==='function'){var keys=await cache.keys(),seen=new Set(),allowed=new Set((options.allowedNonAuthorityPaths||[]).map(function(item){return normalize(item);}));for(var key of keys){var raw=typeof key==='string'?key:(key&&key.url)||'',path=normalize(raw,options.expectedOrigin,options.expectedScope);if(seen.has(path))fail('DUPLICATE_CACHE_ENTRY','Cache contains duplicate normalized authority paths.',{path:path});seen.add(path);if(!expected.has(path)&&!allowed.has(path))fail('EXTRA_CACHE_ASSET','Cache contains an undeclared closure asset.',{path:path});}for(var required of expected.keys())if(!seen.has(required))fail('CACHE_ASSET_MISSING','Required cached authority asset is absent.',{path:required});}
    verified.sort(function(a,b){return a.path.localeCompare(b.path,'en');});return Object.freeze({verified:true,releaseId:manifest.releaseId,manifestSha256:manifest.manifestSha256,closureSha256:manifest.closureSha256,assetCount:verified.length,assets:Object.freeze(verified)});
  }
  return Object.freeze({verify:verify,normalizeCacheKey:normalize,ClosureError:ClosureError});
});
