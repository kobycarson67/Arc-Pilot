const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const crypto=require('crypto').webcrypto;
const P=require('../src/arc_runtime_provenance');
const html=fs.readFileSync('engineering/arc_academic_authority_activation.html','utf8');
const REVISION='academic-activation-effective-section-dependency-repair-1';
let pass=0,total=0;
async function test(name,fn){total++;try{await fn();pass++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error);process.exitCode=1}}
function scripts(){return Array.from(html.matchAll(/<script src="([^"]+)"/g),x=>x[1]);}
async function evidence(){
  const bytes=new TextEncoder().encode('page composition bytes');
  const bounds={compatibilityContractId:'arc-academic-schedule-v1',academicSchedule:'V8_AUTHORITATIVE',authorities:{attendancePasses:'V7_ONLY',projectsTechnical:'V7_ONLY',competencyEvidence:'V7_ONLY',workplaceSafetyBehavior:'V7_ONLY',gradebook:'V7_ONLY',curriculumPacing:'V7_ONLY',lessonPlans:'V7_ONLY'},realStudentDataAuthorized:false,transfersAuthority:false};
  const manifest=await P.createReleaseManifest({commit:'1'.repeat(40),tree:'2'.repeat(40),buildIdentity:'fictional-page',closureContractVersion:1,schemaVersion:8,indexedDbVersion:14,storeCount:74,domainBounds:bounds,assets:[{path:'src/page.js',role:'authority-executable',bytes}]});
  const receipt={format:P.constants.receiptFormat,formatVersion:1,compatibilityContractId:P.constants.contractId,threatModel:P.constants.threatModel,commit:manifest.commit,tree:manifest.tree,releaseId:manifest.releaseId,manifestSha256:manifest.manifestSha256,closureSha256:manifest.closureSha256,transfersAuthority:false,realStudentDataAuthorized:false,independentReview:{status:'accepted',evidenceSha256:'a'.repeat(64),reviewedAt:'2026-10-12T00:00:00Z',reviewerAuthority:'independent-review'}};
  const checked=await P.validateReceipt(receipt,manifest);
  const marker={id:'academic-authority-activation',authorityState:'V8_AUTHORITATIVE',databaseName:'arc_classroom_v8'};
  const markerHash=await P.markerIdentityHash(marker);
  const record=await P.createCompatibilityRecord({recordId:'compat-page',contractId:P.constants.contractId,status:'approved',predecessorRecordId:null,manifest,independentReceiptSha256:checked.receiptSha256,activationMarkerIdentitySha256:markerHash,prewriteRecoveryChecksum:'b'.repeat(64),operator:'Instructor',recordedAt:'2026-10-12T00:00:00Z',reason:'fictional page fixture'});
  return{bytes,manifest,receipt,marker,hint:{authorityState:'V8_AUTHORITATIVE',databaseName:'arc_classroom_v8',markerId:'academic-authority-activation'},record};
}
function element(value=''){return{value,files:[],textContent:'',disabled:false,dataset:{},addEventListener(type,handler){this.handler=handler;}};}
async function compose(){
  const e=await evidence();
  const writes={local:0,session:0,cache:0,worker:0,database:0};
  const elements={output:element(),identity:element(),commit:element(),tree:element(),operator:element(),rollback:element(),confirmation:element(),rollbackConfirmation:element(),activationV8RecoveryFile:element(),activationV7RollbackFile:element(),recoveryFile:element(),bootstrapManifestFile:element(),bootstrapReceiptFile:element(),bootstrapMarker:element(JSON.stringify(e.marker)),bootstrapHint:element(JSON.stringify(e.hint)),bootstrapRecords:element(JSON.stringify([e.record])),bootstrapCacheName:element('accepted-cache'),bootstrapWorkerTarget:element('active')};
  elements.bootstrapManifestFile.files=[{text:async()=>P.canonicalize(e.manifest)}];
  elements.bootstrapReceiptFile.files=[{text:async()=>P.canonicalize(e.receipt)}];
  const button=element();button.id='bootstrapInspectButton';button.dataset={action:'inspectBootstrap'};elements.bootstrapInspectButton=button;
  const buttons=[button],controls=buttons.concat(Object.values(elements));
  const document={getElementById:id=>elements[id]||null,querySelectorAll:selector=>selector==='[data-action]'?buttons:controls,body:{appendChild(){}},createElement:()=>({click(){},remove(){}})};
  const storage={setItem(){writes.local++},removeItem(){writes.local++},getItem(){return null}};
  const cache={match:async path=>path==='src/page.js'?{ok:true,redirected:false,arrayBuffer:async()=>e.bytes.buffer.slice(e.bytes.byteOffset,e.bytes.byteOffset+e.bytes.byteLength)}:null,keys:async()=>['src/page.js'],put(){writes.cache++},delete(){writes.cache++}};
  const browser={readWorkerIdentities:async()=>({active:{releaseId:e.manifest.releaseId,scriptURL:'https://arc.test/sw.js',state:'activated'},waiting:null}),readCache:async()=>cache};
  const context={console,crypto,TextEncoder,Uint8Array,ArrayBuffer,Buffer,Blob,URLSearchParams,URL:{createObjectURL(){return'blob:'},revokeObjectURL(){}},document,location:{search:'?publicationCommit='+'f'.repeat(40)+'&publicationTree='+'e'.repeat(40),origin:'https://arc.test'},navigator:{serviceWorker:{getRegistration:async()=>{throw new Error('injected interface must be used')}}},caches:{put(){writes.cache++},delete(){writes.cache++}},localStorage:storage,sessionStorage:{setItem(){writes.session++},removeItem(){writes.session++}},indexedDB:{open(){writes.database++}},ARC_BUILD:{build:'published'},ArcEffectiveSectionContext:{resolve(){},moduleRevision:REVISION},ArcAcademicConsumerProjection:{createAuthoritativeCache(){},assertEffectiveDependency(){},moduleRevision:REVISION,effectiveContextRevision:REVISION},ArcAcademicAuthorityActivation:{constants:{projectionRevision:REVISION}},ArcAcademicAuthorityActivationProduction:{create(){return{constants:{runtimeRevision:'runtime',databaseName:'arc_classroom_v8'},inspectReadiness:async()=>({}),status:async()=>({})}}},__ARC_PROVENANCE_READ_ONLY_BROWSER__:browser};
  context.window=context;context.globalThis=context;vm.createContext(context);
  for(const file of ['src/arc_runtime_provenance.js','src/arc_service_worker_closure.js','src/arc_runtime_provenance_bootstrap.js','engineering/arc_academic_authority_activation_page.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  return{e,writes,elements,button,context};
}
(async()=>{
  await test('real engineering page preserves I1 composition before the reviewed I2 transport and controller',()=>{const list=scripts(),page=list.findIndex(x=>x.includes('arc_academic_authority_activation_page.js?v=academic-activation-effective-section-dependency-repair-1')&&x.includes('release=stage-1d-i2-verified-waiting-release-transport-1')),expected=['../src/arc_runtime_provenance.js','../src/arc_service_worker_closure.js','../src/arc_runtime_provenance_bootstrap.js','../src/arc_runtime_release_transport.js'];for(const name of expected)assert(list.indexOf(name)>=0&&list.indexOf(name)<page,name);assert.equal(expected.filter(x=>list.includes(x)).length,4);});
  await test('actual browser-script composition inspects exact evidence with zero writes',async()=>{const p=await compose();assert.deepEqual(p.writes,{local:0,session:0,cache:0,worker:0,database:0});await p.button.handler();const result=JSON.parse(p.elements.output.textContent);assert.equal(result.agreement,true);assert.equal(result.nonEnforcing,true);assert.equal(result.evidence.urlClaimTrusted,false);assert(result.diagnostics.some(x=>x.code==='URL_IDENTITY_STALE_OR_FORGED'));assert.deepEqual(p.writes,{local:0,session:0,cache:0,worker:0,database:0});});
  await test('page leaves URL publication values diagnostic rather than injecting them as worker proof',async()=>{const p=await compose();await p.button.handler();const result=JSON.parse(p.elements.output.textContent);assert.equal(result.evidence.workers.active.releaseId,p.e.manifest.releaseId);assert.notEqual(result.evidence.manifest.commit,'f'.repeat(40));assert.equal(result.evidence.urlClaimTrusted,false);});
  await test('missing Core composition disables only the I1 action without invoking production writes',async()=>{const p=await compose();p.context.ArcRuntimeProvenanceBootstrap=null;p.button.disabled=false;vm.runInContext(fs.readFileSync('engineering/arc_academic_authority_activation_page.js','utf8'),p.context);assert.equal(p.button.disabled,true);assert.deepEqual(p.writes,{local:0,session:0,cache:0,worker:0,database:0});});
  if(!process.exitCode)console.log(`\n${pass}/${total} ARC Stage 1D-I1 engineering-page composition tests passed.`);
})();
