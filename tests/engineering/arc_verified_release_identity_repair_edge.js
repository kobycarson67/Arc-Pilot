const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const cp = require('node:child_process');
const Provenance = require('../../src/arc_runtime_provenance');
const Generator = require('../../scripts/generate_arc_runtime_release_manifest');

const repo = path.resolve(process.argv[2]);
const out = path.resolve(process.argv[3]);
const edge = path.resolve(process.argv[4]);
const profile = path.resolve(process.argv[5]);
const httpPort = 48941, debugPort = 48942, base = `http://127.0.0.1:${httpPort}`;
const predecessor = 'adb6ede1bcd12b5e422c5dd6cd745df48df5e001';
const failed = '6d74481f6b96adc602a0ce2536891d5d7406ac66';
const types = { '.html':'text/html', '.js':'text/javascript', '.json':'application/json', '.css':'text/css', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json' };
const contract = JSON.parse(fs.readFileSync(path.join(repo, 'runtime/arc_authority_closure_v1.json'), 'utf8'));
const currentSource = Generator.checkoutBytes(repo);
const currentClosure = Generator.discoverClosure(repo, contract, { byteSource: currentSource });
let mode = 'baseline';

function baselineBytes(relative) { return cp.execFileSync('git', ['cat-file', 'blob', `HEAD:${relative}`], { cwd: repo, encoding: null, maxBuffer: 32 * 1024 * 1024 }); }
function buildAt(ref) { const source = cp.execFileSync('git', ['show', `${ref}:app-build.js`], { cwd: repo, encoding: 'utf8' }), context = {}; require('node:vm').runInNewContext(source, context); return context.ARC_BUILD; }
async function evidence(commit, tree, buildIdentity, source) {
  const assets = currentClosure.authorityAssets.map(item => ({ path: item.path, role: item.role, bytes: source(item.path) }));
  const manifest = await Provenance.createReleaseManifest({ commit, tree, buildIdentity, closureContractVersion: contract.version, schemaVersion: 8, indexedDbVersion: 14, storeCount: 74, domainBounds: contract.domainBounds, assets });
  const receipt = { format: Provenance.constants.receiptFormat, formatVersion: 1, compatibilityContractId: Provenance.constants.contractId, threatModel: Provenance.constants.threatModel, commit, tree, releaseId: manifest.releaseId, manifestSha256: manifest.manifestSha256, closureSha256: manifest.closureSha256, transfersAuthority: false, realStudentDataAuthorized: false, independentReview: { status: 'accepted', evidenceSha256: require('node:crypto').createHash('sha256').update(commit).digest('hex'), reviewedAt: '2026-11-08T12:00:00Z', reviewerAuthority: 'isolated-edge-rehearsal' } };
  const manifestText = Provenance.canonicalize(manifest), receiptText = Provenance.canonicalize(receipt);
  return { manifest, manifestText, receiptText, receiptSha256: await Provenance.sha256(receiptText), cacheName: `arc-release-v1-${manifest.manifestSha256.slice(0, 24)}` };
}
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((request, response) => {
      const url = new URL(request.url, base), relative = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
      if (relative === '__harness__.html') { response.writeHead(200, { 'Content-Type':'text/html', 'Cache-Control':'no-store' }); return response.end('<!doctype html><title>ARC release identity harness</title>'); }
      try {
        const bytes = mode === 'baseline' ? baselineBytes(relative) : fs.readFileSync(path.join(repo, ...relative.split('/')));
        response.writeHead(200, { 'Content-Type': types[path.extname(relative)] || 'application/octet-stream', 'Cache-Control':'no-store' }); response.end(bytes);
      } catch (error) { response.writeHead(404, { 'Cache-Control':'no-store' }); response.end('missing'); }
    }).listen(httpPort, '127.0.0.1', () => resolve(server));
  });
}
function launch() {
  fs.mkdirSync(out, { recursive:true });
  return cp.spawn(edge, [`--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, '--headless=new', '--disable-first-run-ui', '--no-first-run', '--no-default-browser-check', '--disable-sync', '--disable-gpu', '--disable-features=msEdgeSync,msEdgeFirstRunExperience', '--window-size=1440,1000', 'about:blank'], { stdio:['ignore', fs.openSync(path.join(out,'edge-stdout.log'),'a'), fs.openSync(path.join(out,'edge-stderr.log'),'a')] });
}
async function connect() {
  let targets;
  for (let i=0;i<250;i++) { try { targets = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json(); if (targets.some(x=>x.type==='page')) break; } catch {} await new Promise(r=>setTimeout(r,100)); }
  const target = (targets||[]).find(x=>x.type==='page'&&x.url==='about:blank') || (targets||[]).find(x=>x.type==='page');
  if (!target) throw new Error('No Edge page target');
  const ws = new WebSocket(target.webSocketDebuggerUrl), pending = new Map(), events = []; let sequence = 0;
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
  ws.onmessage = event => { const message=JSON.parse(event.data); if(message.id&&pending.has(message.id)){const p=pending.get(message.id);pending.delete(message.id);message.error?p.reject(new Error(JSON.stringify(message.error))):p.resolve(message.result)}else events.push(message) };
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
  for (const domain of ['Page','Runtime','Network','ServiceWorker']) await send(`${domain}.enable`);
  return { ws, send, events, clear(){events.length=0} };
}
async function session() {
  const child=launch(), cdp=await connect(), {send}=cdp; await send('Page.setLifecycleEventsEnabled',{enabled:true});
  async function nav(url){cdp.clear();await send('Page.navigate',{url});for(let i=0;i<400;i++){await new Promise(r=>setTimeout(r,100));if(cdp.events.some(x=>x.method==='Page.loadEventFired'))return}throw new Error(`navigation timeout ${url}`)}
  async function val(expression){const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception&&result.exceptionDetails.exception.description||result.exceptionDetails.text);return result.result.value}
  async function wait(expression,label,tries=600){for(let i=0;i<tries;i++){try{const value=await val(expression);if(value)return value}catch{}await new Promise(r=>setTimeout(r,100))}throw new Error(`timeout ${label}`)}
  async function screenshot(name){const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,name),Buffer.from(shot.data,'base64'))}
  async function close(){try{await send('Browser.close')}catch{}try{cdp.ws.close()}catch{}await Promise.race([new Promise(r=>child.once('exit',r)),new Promise(r=>setTimeout(r,5000))]);if(!child.killed)child.kill()}
  return {child,cdp,send,nav,val,wait,screenshot,close};
}
function seedScript(rows) {
  return `(async()=>{const rows=${JSON.stringify(rows)};for(const row of rows){const cache=await caches.open(row.cacheName);for(const asset of row.manifest.assets){const url=new URL(asset.path,location.href).href,response=await fetch(url,{cache:'reload',redirect:'error'});if(!response.ok)throw Error('seed fetch '+asset.path);await cache.put(url,response.clone())}const put=(path,text)=>cache.put(new URL(path,location.href).href,new Response(text,{status:200,headers:{'Content-Type':'application/json'}}));await put('__arc_release_transport__/manifest.json',row.manifestText);await put('__arc_release_transport__/receipt.json',row.receiptText);await put('__arc_release_transport__/verification.json',JSON.stringify({assetCount:row.manifest.assets.length,cacheName:row.cacheName,closureSha256:row.manifest.closureSha256,format:'ARC_RUNTIME_RELEASE_CACHE_SENTINEL',lifecycleState:row.lifecycleState,manifestSha256:row.manifest.manifestSha256,receiptSha256:row.receiptSha256,releaseId:row.manifest.releaseId,verified:true}))}return await caches.keys()})()`;
}
function messageScript(workerExpression, type, nonce, payload) {
  return `(async()=>{const worker=${workerExpression};if(!worker)throw Error('worker unavailable');return new Promise((resolve,reject)=>{const channel=new MessageChannel(),timer=setTimeout(()=>reject(Error('worker timeout')),240000);channel.port1.onmessage=event=>{clearTimeout(timer);resolve(event.data)};worker.postMessage(${JSON.stringify({protocol:'ARC_RUNTIME_RELEASE_TRANSPORT',protocolVersion:1,type,nonce,payload})},[channel.port2])})})()`;
}
async function main(){
  fs.mkdirSync(out,{recursive:true});
  const baselineBuild=buildAt(failed), predecessorBuild=buildAt(predecessor);
  if(baselineBuild.build!==predecessorBuild.build)throw new Error('Published ambiguity precondition absent');
  const predecessorEvidence=await evidence(predecessor,'1'.repeat(40),predecessorBuild.build,baselineBytes);
  const failedEvidence=await evidence(failed,'2'.repeat(40),baselineBuild.build,baselineBytes);
  const correctedEvidence=await evidence('3'.repeat(40),'4'.repeat(40),contract.buildIdentity,p=>currentSource.read(p));
  const server=await serve(), report={browser:'Microsoft Edge',profile,authorityAssets:currentClosure.authorityAssets.length,steps:[],productionAccess:false,databaseWrites:0,authorityTransfers:0};
  const step=(name,data)=>report.steps.push({name,...data}); let first;
  try{
    first=await session(); await first.nav(`${base}/__harness__.html`);
    const seeded=await first.val(seedScript([
      {...predecessorEvidence,lifecycleState:'active_healthy'},
      {...failedEvidence,lifecycleState:'activation_requested'}
    ]));
    step('seed-exact-physical-failure',{predecessor:predecessorEvidence.manifest.commit,candidate:failedEvidence.manifest.commit,identicalBuildIdentity:predecessorEvidence.manifest.buildIdentity===failedEvidence.manifest.buildIdentity,cacheNames:[predecessorEvidence.cacheName,failedEvidence.cacheName],seeded});
    await first.val(`navigator.serviceWorker.register('/sw.js').then(()=>navigator.serviceWorker.ready).then(()=>true)`);
    await first.nav(`${base}/index.html`); const failure=await first.val(`fetch('/index.html',{cache:'reload'}).then(async r=>({status:r.status,text:await r.text()}))`);
    if(failure.status!==503||!failure.text.includes('AMBIGUOUS_VERIFIED_RELEASE'))throw new Error(`physical failure not reproduced ${JSON.stringify(failure)}`);
    await first.screenshot('01-ambiguous-503.png'); step('physical-failure-reproduced',failure);
    mode='current';
    await first.val(`navigator.serviceWorker.getRegistration().then(r=>r.update()).then(()=>true)`);
    await first.wait(`navigator.serviceWorker.getRegistration().then(r=>!!r.waiting)`,'corrected waiting worker');
    const provisionPayload={manifestBytes:correctedEvidence.manifestText,receiptBytes:correctedEvidence.receiptText,expectedReceiptSha256:correctedEvidence.receiptSha256,expectedReleaseId:correctedEvidence.manifest.releaseId,expectedManifestSha256:correctedEvidence.manifest.manifestSha256,expectedClosureSha256:correctedEvidence.manifest.closureSha256,expectedAssetCount:correctedEvidence.manifest.assets.length};
    const provisionReply=await first.val(messageScript(`(await navigator.serviceWorker.getRegistration()).waiting`,'ARC_RELEASE_PROVISION_WAITING','corrected-provision',provisionPayload));
    if(!provisionReply.payload||!provisionReply.payload.ok)throw new Error(`provision failed ${JSON.stringify(provisionReply)}`);
    const ready=provisionReply.payload.result; step('corrected-release-verified-waiting',{releaseId:ready.releaseId,cacheName:ready.cacheName,assetCount:ready.assetCount,buildIdentity:correctedEvidence.manifest.buildIdentity});
    await first.val(`window.__arcControllerChanged=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{window.__arcControllerChanged=true},{once:true});true`);
    const applyReply=await first.val(messageScript(`(await navigator.serviceWorker.getRegistration()).waiting`,'ARC_RELEASE_APPLY','corrected-provision',{applyToken:ready.applyToken,releaseId:ready.releaseId,manifestSha256:ready.manifestSha256,closureSha256:ready.closureSha256,receiptSha256:ready.receiptSha256}));
    if(!applyReply.payload||!applyReply.payload.ok)throw new Error(`apply failed ${JSON.stringify(applyReply)}`);
    await first.wait(`window.__arcControllerChanged===true`,'controller takeover');
    await first.nav(`${base}/index.html`); await first.wait(`window.ARC_BUILD&&ARC_BUILD.build===${JSON.stringify(contract.buildIdentity)}&&document.readyState==='complete'`,'corrected normal startup',1200);
    await first.wait(`caches.open(${JSON.stringify(correctedEvidence.cacheName)}).then(c=>c.match('/__arc_release_transport__/verification.json')).then(r=>r&&r.json()).then(x=>x.lifecycleState==='active_healthy')`,'active healthy');
    await first.screenshot('02-corrected-online.png'); step('controller-takeover-online',{build:await first.val('ARC_BUILD.build'),title:await first.val('document.title'),readyState:await first.val('document.readyState')});
    await first.send('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0}); await first.send('Page.reload',{ignoreCache:false});
    await first.wait(`window.ARC_BUILD&&ARC_BUILD.build===${JSON.stringify(contract.buildIdentity)}&&document.readyState==='complete'`,'offline reload',1200); await first.screenshot('03-corrected-offline.png'); step('offline-reload',{build:await first.val('ARC_BUILD.build'),readyState:await first.val('document.readyState')});
    await first.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1}); await first.close(); first=null;
    const second=await session(); try{
      await second.send('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0}); await second.nav(`${base}/index.html`);
      await second.wait(`window.ARC_BUILD&&ARC_BUILD.build===${JSON.stringify(contract.buildIdentity)}&&document.readyState==='complete'`,'offline process cold restart',1200); await second.screenshot('04-corrected-cold-offline.png');
      const sentinel=await second.val(`caches.open(${JSON.stringify(correctedEvidence.cacheName)}).then(c=>c.match('/__arc_release_transport__/verification.json')).then(r=>r.json())`);
      step('full-process-offline-cold-restart',{build:await second.val('ARC_BUILD.build'),readyState:await second.val('document.readyState'),sentinelLifecycle:sentinel.lifecycleState,correctedCache:correctedEvidence.cacheName,predecessorCachesRetained:(await second.val('caches.keys()')).filter(x=>x.startsWith('arc-release-v1-')).length});
      await second.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
      await second.val(`(async()=>{for(const r of await navigator.serviceWorker.getRegistrations())await r.unregister();for(const name of await caches.keys())await caches.delete(name);for(const db of await indexedDB.databases())indexedDB.deleteDatabase(db.name);return true})()`); await second.close();
    } catch(error){await second.close();throw error}
    report.result='PASS'; report.correctedBuildIdentity=contract.buildIdentity; report.failedBuildIdentity=baselineBuild.build; report.releaseIds={predecessor:predecessorEvidence.manifest.releaseId,failed:failedEvidence.manifest.releaseId,corrected:correctedEvidence.manifest.releaseId};
    fs.writeFileSync(path.join(out,'edge-rehearsal.json'),JSON.stringify(report,null,2)); console.log(JSON.stringify(report,null,2));
  } finally { if(first)await first.close(); server.close(); }
}

main().catch(error=>{console.error(error.stack||error);process.exitCode=1});
