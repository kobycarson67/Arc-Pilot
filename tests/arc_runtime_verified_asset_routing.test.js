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
  constructor(){this.rows=new Map();}
  async open(name){if(!this.rows.has(name))this.rows.set(name,new MemoryCache());return this.rows.get(name)}
  async match(value){for(const cache of this.rows.values()){let row=await cache.match(value);if(row)return row}}
}
function fixture(options={}){
  const handlers={},caches=new MemoryCaches(),network=[],writes=[];
  const context={URL,Response,Request,Set,console,caches};
  context.self={ARC_BUILD:{shell:'repair-1',build:CONTRACT.buildIdentity},location:{origin:ORIGIN},registration:{scope:SCOPE,waiting:null},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(name,handler)=>{handlers[name]=handler}};
  context.importScripts=()=>{};
  context.self.ArcRuntimeProvenance={};context.self.ArcServiceWorkerClosure={};
  context.self.ArcRuntimeReleaseTransport={createWorkerCoordinator:()=>({dispatch:async()=>({}),currentVerified:async()=>options.verified===false?null:{cacheName:'arc-release-v1-reviewed'}})};
  context.fetch=async(request,settings)=>{let url=new URL(request.url||request);network.push({url:url.href,settings});let mode=options.networkMode&&options.networkMode[url.pathname]||'ok';if(mode==='throw')throw Error('offline');let redirected=mode==='redirect',responseUrl=mode==='cross-origin'?'https://other.invalid/asset':url.href;return new FakeResponse('network:'+keyOf(url.href),{ok:mode!=='missing',status:mode==='missing'?404:200,redirected,url:responseUrl})};
  vm.createContext(context);vm.runInContext(fs.readFileSync('sw.js','utf8'),context,{filename:'sw.js'});
  async function request(path,requestOptions={}){let responsePromise=null,url=path.startsWith('http')?path:SCOPE+path;handlers.fetch({request:{method:'GET',url,mode:requestOptions.mode||'no-cors'},respondWith:value=>{responsePromise=Promise.resolve(value)}});if(!responsePromise)return null;let response=await responsePromise;return response}
  return{caches,network,writes,request,handlers};
}
let pass=0,total=0;async function test(name,fn){total++;try{await fn();pass++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error);process.exitCode=1}}
(async()=>{
await test('Repair-01 reviewed non-authority graph is exactly the eleven approved icon and brand paths',()=>{
  assert.equal(DISCOVERED.authorityAssets.length,102);assert.equal(REVIEWED.length,11);for(const p of ['src/arc_batch_b_authority_activation.js','src/arc_batch_b_projection.js'])assert(DISCOVERED.authorityAssets.some(x=>x.path===p&&x.role==='authority-executable'));
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
await test('Repair-10 legacy unverified routing preserves the existing ordinary cache/network behavior',async()=>{let f=fixture({verified:false}),response=await f.request('icons/icon-192.png');assert.equal(await response.text(),'network:icons/icon-192.png');assert.equal(f.network.length,1)});
if(!process.exitCode)console.log(`\n${pass}/${total} ARC Stage 1D-I2 Repair 1 verified asset-routing tests passed.`);
})();
