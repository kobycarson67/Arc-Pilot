const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const Generator=require('../scripts/generate_arc_runtime_release_manifest');

const ORIGIN='https://arc.invalid';
const SCOPE=ORIGIN+'/Arc-Pilot/';
const CONTRACT=JSON.parse(fs.readFileSync('runtime/arc_authority_closure_v1.json','utf8'));
const DISCOVERED=Generator.discoverClosure(process.cwd(),CONTRACT);
const REVIEWED=DISCOVERED.reviewedNonAuthority.slice().sort();

class FakeResponse{
  constructor(bytes,options={}){this.bytes=Buffer.from(bytes);this.ok=options.ok!==false;this.status=options.status||200;this.redirected=!!options.redirected;this.url=options.url||'';}
  async text(){return this.bytes.toString('utf8')}
  async arrayBuffer(){return this.bytes.buffer.slice(this.bytes.byteOffset,this.bytes.byteOffset+this.bytes.byteLength)}
  clone(){return new FakeResponse(this.bytes,{ok:this.ok,status:this.status,redirected:this.redirected,url:this.url})}
}
function keyOf(value){let raw=typeof value==='string'?value:value.url;let url=new URL(raw,SCOPE);return url.pathname.replace(new URL(SCOPE).pathname,'').replace(/^\//,'');}
class MemoryCache{
  constructor(){this.rows=new Map();}
  async match(value){let row=this.rows.get(keyOf(value));return row&&row.clone()}
  async put(value,response){this.rows.set(keyOf(value),response.clone())}
  async addAll(){}
}
class MemoryCaches{
  constructor(){this.rows=new Map();this.matchCalls=0;}
  async open(name){if(!this.rows.has(name))this.rows.set(name,new MemoryCache());return this.rows.get(name)}
  async match(value){this.matchCalls++;for(const cache of this.rows.values()){let row=await cache.match(value);if(row)return row}}
}
function fixture(options={}){
  const handlers={},caches=options.caches||new MemoryCaches(),network=[],writes=[],coordinatorCalls=[],bootstrapCalls=[];
  const context={URL,Response,Request,Set,AbortController,setTimeout,clearTimeout,console,caches};
  context.self={ARC_BUILD:{shell:'repair-1',build:CONTRACT.buildIdentity,releaseEvidenceEndpoint:'https://evidence.invalid/channel.json',releaseEvidenceRepositoryPath:'/kobycarson67/Arc-Pilot/'},location:{origin:ORIGIN,hostname:'arc.invalid',href:SCOPE+'sw.js'},registration:Object.assign({scope:SCOPE,waiting:null,active:null},options.registration||{}),clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(name,handler)=>{handlers[name]=handler}};
  context.importScripts=()=>{};
  context.self.ArcRuntimeProvenance={};context.self.ArcServiceWorkerClosure={};
  let coordinatorOptions=null;
  context.self.ArcRuntimeReleaseTransport={constants:{types:{response:'ARC_RELEASE_RESPONSE'}},envelope:(type,nonce,payload)=>({type,nonce,payload}),createWorkerCoordinator:value=>(coordinatorOptions=value,{dispatch:async message=>{coordinatorCalls.push(['dispatch',message]);return{type:'ARC_RELEASE_RESPONSE',nonce:message&&message.nonce,payload:{ok:false,error:{code:'UNQUALIFIED_ACTIVATION_REFUSED'}}}},applyLegacyVerified:async()=>{coordinatorCalls.push(['legacyApply']);return{state:'ACTIVATION_REQUESTED',releaseId:'reviewed',legacyCompatibility:true}},currentVerified:async()=>{if(options.routingError)throw Object.assign(Error('routing failed'),{code:options.routingError});return options.verified===false?null:{cacheName:'arc-release-v1-reviewed'}},currentPrimaryVerified:async()=>{if(options.primaryError)throw Object.assign(Error('primary failed'),{code:options.primaryError});return options.primaryVerified===false?null:{cacheName:'arc-release-v1-reviewed'}},expectedReleaseStatePresent:async()=>options.expectedReleaseStatePresent===true})};
  context.self.ArcUpdateReleaseDistribution={create:()=>({load:async()=>{bootstrapCalls.push('load');throw Error('fixture has no release evidence')}})};
  context.fetch=async(request,settings)=>{let url=new URL(request.url||request);network.push({url:url.href,settings});let mode=options.networkMode&&options.networkMode[url.pathname]||'ok';if(mode==='throw')throw Error('offline');let redirected=mode==='redirect',responseUrl=mode==='cross-origin'?'https://other.invalid/asset':url.href;return new FakeResponse('network:'+keyOf(url.href),{ok:mode!=='missing',status:mode==='missing'?404:200,redirected,url:responseUrl})};
  vm.createContext(context);vm.runInContext(fs.readFileSync('sw.js','utf8'),context,{filename:'sw.js'});
  async function request(path,requestOptions={}){let responsePromise=null,url=path.startsWith('http')?path:SCOPE+path;handlers.fetch({request:{method:'GET',url,mode:requestOptions.mode||'no-cors'},respondWith:value=>{responsePromise=Promise.resolve(value)}});if(!responsePromise)return null;let response=await responsePromise;return response}
  return{caches,network,writes,request,handlers,coordinatorCalls,bootstrapCalls,context,get coordinatorOptions(){return coordinatorOptions}};
}
let pass=0,total=0;async function test(name,fn){total++;try{await fn();pass++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error);process.exitCode=1}}
(async()=>{
await test('Repair-01 reviewed non-authority graph is exactly the eleven approved icon and brand paths',()=>{
  assert.equal(DISCOVERED.authorityAssets.length,103);assert.equal(REVIEWED.length,11);for(const p of ['src/arc_batch_b_authority_activation.js','src/arc_batch_b_projection.js','src/arc_update_release_distribution.js'])assert(DISCOVERED.authorityAssets.some(x=>x.path===p&&x.role==='authority-executable'));
  assert.deepEqual(REVIEWED,[
    'assets/brand/runtime/arc-titanium-industrial-background-1440.webp','assets/brand/runtime/arc-welding-compact-lockup-720.png','assets/brand/runtime/arc-welding-dashboard-hero-1440.webp','assets/brand/runtime/arc-welding-lettermark-720.png','assets/brand/runtime/arc-welding-primary-logo-960.png','icons/apple-touch-icon-180.png','icons/favicon-32.png','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-192.png','icons/icon-maskable-512.png'
  ]);
});
await test('Repair-02 every reviewed non-authority asset returns exact online bytes and is cached by normalized path',async()=>{
  let f=fixture();for(const path of REVIEWED){let response=await f.request(path+'?alias=online');assert.equal(response.status,200,path);assert.equal(await response.text(),'network:'+path);}
  assert.equal(f.network.length,11);let cache=await f.caches.open('arc-pilot-repair-1');for(const path of REVIEWED)assert.equal(await (await cache.match('./'+path)).text(),'network:'+path);
});
await test('Repair-03 every reviewed non-authority asset returns exact offline bytes including query aliases',async()=>{
  let modes={},f=fixture({networkMode:modes}),cache=await f.caches.open('arc-pilot-repair-1');for(const path of REVIEWED){await cache.put('./'+path,new FakeResponse('offline:'+path,{url:SCOPE+path}));modes[new URL(SCOPE+path).pathname]='throw';}
  for(const path of REVIEWED){let response=await f.request(path+'?revision=offline');assert.equal(response.status,200,path);assert.equal(await response.text(),'offline:'+path);}assert.equal(f.network.length,0);
});
await test('Repair-04 navigation remains exclusive to the verified release cache',async()=>{
  let f=fixture(),cache=await f.caches.open('arc-release-v1-reviewed');await cache.put('./index.html',new FakeResponse('verified navigation',{url:SCOPE+'index.html'}));let response=await f.request('classes',{mode:'navigate'});assert.equal(await response.text(),'verified navigation');assert.equal(f.network.length,0);
});
await test('Repair-05 authority assets remain exclusive to exact verified release bytes',async()=>{
  let f=fixture(),cache=await f.caches.open('arc-release-v1-reviewed');await cache.put('./src/arc_v8_storage.js',new FakeResponse('verified authority',{url:SCOPE+'src/arc_v8_storage.js'}));let response=await f.request('src/arc_v8_storage.js?revision=current');assert.equal(await response.text(),'verified authority');assert.equal(f.network.length,0);
});
await test('Repair-06 missing or altered authority path refuses without static or network fallback',async()=>{
  let f=fixture();for(const path of ['src/arc_v8_storage.js','src/ARC_v8_storage.js','unknown.png']){let response=await f.request(path);assert.equal(response.status,503,path)}assert.equal(f.network.length,0);
});
await test('Repair-07 case aliases traversal encodings and out-of-scope same-origin requests fail closed',async()=>{
  let f=fixture();for(const path of ['Icons/icon-192.png','icons/%2e%2e/icon-192.png','icons/%2Ficon-192.png',ORIGIN+'/outside/icons/icon-192.png']){let response=await f.request(path);assert.equal(response.status,503,path)}assert.equal(f.network.length,0);
});
await test('Repair-08 redirected cross-origin missing and offline uncached reviewed assets fail closed and are not cached',async()=>{
  for(const mode of ['redirect','cross-origin','missing','throw']){let path=REVIEWED[0],modes={[new URL(SCOPE+path).pathname]:mode},f=fixture({networkMode:modes}),response=await f.request(path);assert.equal(response.status,503,mode);assert.equal(await (await f.caches.open('arc-pilot-repair-1')).match('./'+path),undefined,mode)}
});
await test('Repair-09 cross-origin requests remain outside ARC service-worker routing',async()=>{let f=fixture(),response=await f.request('https://other.invalid/icons/icon-192.png');assert.equal(response,null);assert.equal(f.network.length,0)});
await test('Repair-10 legacy reviewed visuals preserve current-cache online and offline behavior',async()=>{let f=fixture({verified:false}),response=await f.request('icons/icon-192.png');assert.equal(await response.text(),'network:icons/icon-192.png');assert.equal(f.network.length,1);let cached=await (await f.caches.open('arc-pilot-repair-1')).match('./icons/icon-192.png');assert.equal(await cached.text(),'network:icons/icon-192.png');f.network.length=0;f.context.fetch=async()=>{throw Error('offline')};response=await f.request('icons/icon-192.png?offline=1');assert.equal(await response.text(),'network:icons/icon-192.png');assert.equal(f.network.length,0);assert.equal(f.caches.matchCalls,0)});
await test('MixedAssetRepair-01 historical-first cache ordering cannot mix current legacy navigation and authority assets',async()=>{let caches=new MemoryCaches(),historical=await caches.open('00-historical-cache'),current=await caches.open('arc-pilot-repair-1');await historical.put('./index.html',new FakeResponse('historical index'));await historical.put('./app-build.js',new FakeResponse('historical build'));await current.put('./index.html',new FakeResponse('current index'));await current.put('./app-build.js',new FakeResponse('current build'));let f=fixture({caches,verified:false,primaryVerified:false,expectedReleaseStatePresent:false});let navigation=await f.request('index.html',{mode:'navigate'}),asset=await f.request('app-build.js');assert.equal(await navigation.text(),'current index');assert.equal(await asset.text(),'current build');assert.equal(f.network.length,0);assert.equal(caches.matchCalls,0)});
await test('MixedAssetRepair-02 coherent current-cache legacy startup remains exact while offline',async()=>{let caches=new MemoryCaches(),current=await caches.open('arc-pilot-repair-1');for(const [path,bytes] of [['index.html','current index'],['app-build.js','current build'],['src/arc_v8_storage.js','current storage']])await current.put('./'+path,new FakeResponse(bytes));let f=fixture({caches,verified:false,primaryVerified:false,expectedReleaseStatePresent:false,networkMode:{'/Arc-Pilot/index.html':'throw','/Arc-Pilot/app-build.js':'throw','/Arc-Pilot/src/arc_v8_storage.js':'throw'}});for(const [path,mode,bytes] of [['index.html','navigate','current index'],['app-build.js','no-cors','current build'],['src/arc_v8_storage.js','no-cors','current storage']]){let response=await f.request(path,{mode});assert.equal(response.status,200,path);assert.equal(await response.text(),bytes,path)}assert.equal(f.network.length,0);assert.equal(caches.matchCalls,0)});
await test('MixedAssetRepair-03 missing legacy navigation or authority asset fails closed without global or network fallback',async()=>{let caches=new MemoryCaches(),historical=await caches.open('00-historical-cache');await historical.put('./index.html',new FakeResponse('historical index'));await historical.put('./app-build.js',new FakeResponse('historical build'));let f=fixture({caches,verified:false,primaryVerified:false,expectedReleaseStatePresent:false});for(const [path,mode,code] of [['index.html','navigate','LEGACY_NAVIGATION_MISSING'],['app-build.js','no-cors','LEGACY_ASSET_MISSING']]){let response=await f.request(path,{mode});assert.equal(response.status,503,path);assert.match(await response.text(),new RegExp(code),path)}assert.equal(f.network.length,0);assert.equal(caches.matchCalls,0)});
await test('ApplyRepair-03 active worker never adopts waiting role merely because another worker is waiting',async()=>{let f=fixture();assert.equal(await f.coordinatorOptions.lifecycleRole(),'active');f.context.self.registration.waiting={state:'installed'};assert.equal(await f.coordinatorOptions.lifecycleRole(),'active');let pending;f.handlers.activate({waitUntil:value=>{pending=Promise.resolve(value)}});await pending;assert.equal(await f.coordinatorOptions.lifecycleRole(),'active')});
await test('ApplyRepair-04 install is nonblocking and exact legacy Apply verifies before activation',async()=>{let f=fixture(),reply=null,pending=null;f.context.self.registration.active={state:'activated'};f.handlers.install({waitUntil:value=>{pending=Promise.resolve(value)}});await pending;assert.equal(await f.coordinatorOptions.lifecycleRole(),'waiting');assert.deepEqual(f.bootstrapCalls,[]);f.handlers.message({data:{type:'SKIP_WAITING'},source:{type:'window',url:SCOPE+'index.html',postMessage:value=>{reply=value}},ports:[],waitUntil:value=>{pending=Promise.resolve(value)}});await pending;assert.deepEqual(f.bootstrapCalls,['load']);assert.deepEqual(f.coordinatorCalls,[['legacyApply']]);assert.equal(reply.payload.ok,true);for(const event of [{data:{type:'SKIP_WAITING',extra:true},source:{type:'window',url:SCOPE+'index.html'}},{data:{type:'SKIP_WAITING'},source:{type:'window',url:'https://other.invalid/'}},{data:{type:'SKIP_WAITING'},source:null}]){f.coordinatorCalls.length=0;pending=null;event.ports=[];event.waitUntil=value=>{pending=Promise.resolve(value)};event.source=event.source&&Object.assign({postMessage:()=>{}},event.source);f.handlers.message(event);await pending;if(event.data.extra)assert.equal(f.coordinatorCalls[0][0],'dispatch');else assert.equal(f.coordinatorCalls.length,0)}});
await test('ApplyRepair-05 persisted lifecycle role survives waiting-worker termination and activation restart',async()=>{let first=fixture(),pending;first.context.self.registration.active={state:'activated'};first.handlers.install({waitUntil:value=>{pending=Promise.resolve(value)}});await pending;let restartedWaiting=fixture({caches:first.caches,registration:{active:{state:'activated'},waiting:{state:'installed'}}});assert.equal(await restartedWaiting.coordinatorOptions.lifecycleRole(),'waiting');restartedWaiting.handlers.activate({waitUntil:value=>{pending=Promise.resolve(value)}});await pending;let restartedActive=fixture({caches:first.caches,registration:{active:{state:'activated'},waiting:null}});assert.equal(await restartedActive.coordinatorOptions.lifecycleRole(),'active')});
await test('P6RecoveryRepair-01 rejected recovery selection revalidates and serves the exact primary release navigation',async()=>{let f=fixture({routingError:'RECOVERY_CURRENT_RELEASE_MISMATCH'}),cache=await f.caches.open('arc-release-v1-reviewed');await cache.put('./index.html',new FakeResponse('verified primary navigation',{url:SCOPE+'index.html'}));let response=await f.request('index.html',{mode:'navigate'});assert.equal(response.status,200);assert.equal(await response.text(),'verified primary navigation');assert.equal(f.network.length,0)});
await test('P6RecoveryRepair-02 unrecoverable routing rejection returns bounded 503 for navigation and assets without network fallback',async()=>{let f=fixture({routingError:'AMBIGUOUS_VERIFIED_RELEASE',primaryError:'AMBIGUOUS_VERIFIED_RELEASE'});for(const [path,mode] of [['index.html','navigate'],['src/arc_v8_storage.js','no-cors']]){let response=await f.request(path,{mode});assert.equal(response.status,503,path);assert.match(await response.text(),/verified release/i,path)}assert.equal(f.network.length,0)});
await test('P6RecoveryRepair-03 expected release cache with missing sentinel fails closed instead of mixing network bytes',async()=>{let f=fixture({verified:false,primaryVerified:false,expectedReleaseStatePresent:true}),response=await f.request('index.html',{mode:'navigate'});assert.equal(response.status,503);assert.match(await response.text(),/verified release/i);assert.equal(f.network.length,0)});
await test('P6RecoveryRepair-04 truly legacy controlled state serves navigation from its active worker cache',async()=>{let f=fixture({verified:false,primaryVerified:false,expectedReleaseStatePresent:false}),cache=await f.caches.open('arc-pilot-repair-1');await cache.put('./index.html',new FakeResponse('current legacy navigation'));let response=await f.request('index.html',{mode:'navigate'});assert.equal(response.status,200);assert.equal(await response.text(),'current legacy navigation');assert.equal(f.network.length,0);assert.equal(f.caches.matchCalls,0)});
if(!process.exitCode)console.log(`\n${pass}/${total} ARC Stage 1D-I2 Repair 1 verified asset-routing tests passed.`);
})();
