importScripts('./app-build.js','./src/arc_runtime_provenance.js','./src/arc_service_worker_closure.js','./src/arc_runtime_release_transport.js','./src/arc_update_release_distribution.js');
const VERSION=self.ARC_BUILD.shell;
const CACHE='arc-pilot-'+VERSION;
const CORE=['./','./index.html','./app.webmanifest','./app-build.js','./icons/favicon-32.png','./icons/apple-touch-icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-192.png','./icons/icon-maskable-512.png','./assets/brand/runtime/arc-welding-dashboard-hero-1440.webp','./assets/brand/runtime/arc-titanium-industrial-background-1440.webp','./assets/brand/runtime/arc-welding-primary-logo-960.png','./assets/brand/runtime/arc-welding-lettermark-720.png','./src/arc_visual_foundation.css','./src/arc_titanium_visual_system.css','./src/arc_titanium_visual_refinement_1.css','./src/arc_icons.js','./src/arc_titanium_shell.js','./src/app_update_controller.js','./src/arc_v8_storage.js','./src/arc_v8_academic.js','./src/arc_v8_activity.js','./src/arc_v8_project.js','./src/arc_v8_evidence.js','./src/arc_v8_workplace_safety.js','./src/arc_v8_gradebook.js','./src/arc_gradebook_authority_adapter.js','./src/arc_student_history_projection.js','./src/arc_v8_attendance.js','./src/arc_attendance_authority_adapter.js','./src/arc_project_technical_authority_adapter.js','./src/arc_competency_evidence_authority_adapter.js','./src/arc_v8_artifacts.js','./src/arc_v8_booth_operations.js','./src/arc_v8_backup_recovery.js','./src/arc_v8_engineering_verification.js','./engineering/arc_v8_verification.html','./engineering/arc_v8_verification_page.js','./src/project_checkpoints.js','./src/project_checkpoint_controller.js','./src/project_checkpoint_presenter.js','./src/project_tab_adapter.js','./src/project_checkpoint_persistence.js','./src/project_checkpoint_host_bridge.js','./src/project_checkpoint_card.js','./src/project_bank.js','./src/booth_assignment_lifecycle.js','./src/class_forecast.js','./src/simulation_foundation.js','./src/simulation_fixtures.js','./src/teaching_tips.js','./src/inventory.js','./src/material_inventory.js','./src/material_inventory_presenter.js','./src/material_inventory_modal_lifecycle.js','./src/deployment_readiness.js'];
CORE.push('./assets/brand/runtime/arc-welding-compact-lockup-720.png');
CORE.push('./src/current_student_directory.js');
CORE.push('./src/arc_time_lifecycle.js');
CORE.push('./src/arc_sidebar_gesture.js');
CORE.push('./src/arc_v8_production_initialization.js');
CORE.push('./src/arc_v8_academic_cutover.js');
CORE.push('./src/arc_v8_stage2_verification.js');
CORE.push('./engineering/arc_v8_stage2_verification.html');
CORE.push('./engineering/arc_v8_stage2_verification_page.js');
CORE.push('./src/arc_v8_stage2_verification.js?v=stage2-reload-rehydration-repair-2-cleanup-isolation-repair-1');
CORE.push('./src/arc_v8_protected_production_upgrade.js');
CORE.push('./src/arc_v8_protected_production_upgrade_physical.js');
CORE.push('./src/arc_v8_protected_production_upgrade.js?v=p10d-pu2-protected-upgrade-bridge-1');
CORE.push('./src/arc_v8_protected_production_upgrade_physical.js?v=p10d-pu2-protected-upgrade-bridge-1');
CORE.push('./src/arc_v8_instructional_content_packages.js?v=p10d-pi1-production-instructional-import-bridge-1');
CORE.push('./src/arc_v8_curriculum_pacing.js?v=p10d-pi1-production-instructional-import-bridge-1');
CORE.push('./src/arc_v8_evidence.js?v=p10d-pi1-production-instructional-import-bridge-1');
CORE.push('./src/arc_v8_lesson_plans.js?v=p10d-pi1-production-instructional-import-bridge-1');
CORE.push('./src/arc_v8_instructional_import_coordinator.js?v=p10d-pi1-production-instructional-import-bridge-1');
CORE.push('./src/arc_v8_instructional_import_production_physical.js?v=p10d-pi1-production-instructional-import-bridge-1');
CORE.push('./src/arc_v8_instructional_package_availability_physical.js?v=p10d-pa1-production-instructional-package-availability-bridge-1');
CORE.push('./engineering/arc_v8_stage2_verification_page.js?v=p10d-pa1-production-instructional-package-availability-bridge-1');
CORE.push('./src/arc_v8_production_academic_configuration.js');
CORE.push('./src/arc_v7_schedule_configuration_capture.js');
CORE.push('./engineering/arc_v8_production_academic_configuration.html');
CORE.push('./engineering/arc_v8_production_academic_configuration_page.js');
CORE.push('./src/arc_v7_schedule_configuration_capture.js?v=academic-structure-operational-truth-1-repair-1');
CORE.push('./src/arc_v8_production_academic_configuration.js?v=stage2-production-academic-configuration-closure-1');
CORE.push('./engineering/arc_v8_production_academic_configuration_page.js?v=pacr-capture-review-wiring-repair-1');
CORE.push('./src/arc_v8_academic_administration.js');
CORE.push('./src/arc_schedule_authority_adapter.js');
CORE.push('./src/arc_effective_section_context.js');
CORE.push('./src/arc_effective_section_context.js?v=academic-activation-effective-section-dependency-repair-1');
CORE.push('./src/arc_academic_consumer_projection.js');
CORE.push('./src/arc_academic_consumer_projection.js?v=academic-activation-effective-section-dependency-repair-1');
CORE.push('./src/arc_academic_authority_adapter.js');
CORE.push('./src/arc_v8_academic_semester_transition.js');
CORE.push('./src/arc_academic_authority_activation.js');
CORE.push('./src/arc_academic_authority_activation.js?v=academic-activation-bell-compatibility-repair-1');
CORE.push('./src/arc_academic_authority_activation_production.js?v=academic-activation-bell-compatibility-repair-1');
CORE.push('./engineering/arc_academic_authority_activation.html');
CORE.push('./engineering/arc_academic_authority_activation_page.js?v=academic-activation-effective-section-dependency-repair-1');
CORE.push('./engineering/arc_academic_authority_activation_page.js?v=academic-activation-effective-section-dependency-repair-1&release=stage-1d-i2-verified-waiting-release-transport-1');
CORE.push('./engineering/arc_academic_authority_activation_page.js?v=academic-activation-effective-section-dependency-repair-1&release=samsung-waiting-release-timeout-repair-1');
CORE.push('./src/arc_v8_behavior.js');
CORE.push('./src/arc_workplace_safety_behavior_authority_adapter.js');
CORE.push('./src/arc_v8_curriculum_pacing.js');
CORE.push('./src/arc_curriculum_pacing_authority_adapter.js');
CORE.push('./src/arc_curriculum_pacing_ui.js');
CORE.push('./src/arc_v8_lesson_plans.js');
CORE.push('./src/arc_lesson_authority_adapter.js');
CORE.push('./src/arc_lesson_pacing_ui.js');
CORE.push('./src/arc_v8_instructional_content_packages.js');
CORE.push('./src/arc_batch_a_authority_activation.js');
CORE.push('./src/arc_batch_a_projection.js');
CORE.push('./src/arc_batch_b_authority_activation.js');
CORE.push('./src/arc_batch_b_projection.js');
CORE.push('./src/arc_runtime_provenance.js');
CORE.push('./src/arc_service_worker_closure.js');
CORE.push('./src/arc_runtime_release_transport.js');
CORE.push('./src/arc_update_release_distribution.js');
const REVIEWED_NON_AUTHORITY_STATIC=new Set([
  'assets/brand/runtime/arc-titanium-industrial-background-1440.webp',
  'assets/brand/runtime/arc-welding-compact-lockup-720.png',
  'assets/brand/runtime/arc-welding-dashboard-hero-1440.webp',
  'assets/brand/runtime/arc-welding-lettermark-720.png',
  'assets/brand/runtime/arc-welding-primary-logo-960.png',
  'icons/apple-touch-icon-180.png',
  'icons/favicon-32.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-192.png',
  'icons/icon-maskable-512.png'
]);
const WORKER_ROLE_PATH=new URL('__arc_release_transport__/worker-role.txt',self.registration.scope).href;
let releaseWorkerLifecycleRole='active';
async function persistedWorkerLifecycleRole(){const cache=await caches.open(CACHE),saved=await cache.match(WORKER_ROLE_PATH,{ignoreSearch:false});return saved?await saved.text():releaseWorkerLifecycleRole;}
async function persistWorkerLifecycleRole(role){releaseWorkerLifecycleRole=role;const cache=await caches.open(CACHE);await cache.put(WORKER_ROLE_PATH,new Response(role,{status:200,headers:{'Content-Type':'text/plain'}}));}
self.addEventListener('activate',event=>{releaseWorkerLifecycleRole='active';event.waitUntil(persistWorkerLifecycleRole('active').then(()=>self.clients.claim()));});
const releaseTransport=self.ArcRuntimeReleaseTransport.createWorkerCoordinator({
  provenance:self.ArcRuntimeProvenance,
  closureVerifier:self.ArcServiceWorkerClosure,
  caches,
  fetch:(url,options)=>fetch(url,options),
  origin:self.location.origin,
  baseUrl:self.registration.scope,
  expectedBuildIdentity:self.ARC_BUILD.build,
  recoveryCapability:self.ARC_BUILD.recoveryCapability,
  lifecycleRole:()=>persistedWorkerLifecycleRole(),
  skipWaiting:()=>self.skipWaiting()
});
function releaseEvidenceEndpoint(){const configured=self.ARC_BUILD.releaseEvidenceEndpoint,host=self.location.hostname;if(host!=='127.0.0.1'&&host!=='localhost')return configured;return new URL(self.location.href).searchParams.get('arcTestEvidence')||configured;}
const releaseEvidenceUrl=releaseEvidenceEndpoint();
const releaseDistribution=self.ArcUpdateReleaseDistribution.create({
  provenance:self.ArcRuntimeProvenance,
  fetch:(url,options)=>fetch(url,options),
  channelUrl:releaseEvidenceUrl,
  evidenceOrigin:new URL(releaseEvidenceUrl).origin,
  repositoryPath:self.ARC_BUILD.releaseEvidenceRepositoryPath,
  applicationOrigin:self.location.origin,
  allowLoopback:self.location.hostname==='127.0.0.1'||self.location.hostname==='localhost'
});
async function bootstrapVerifiedWaitingRelease(){
  if(!self.registration.active)return{state:'FIRST_INSTALL_NO_BOOTSTRAP'};
  try{
    const evidence=await releaseDistribution.load(),nonce='bootstrap-'+Date.now().toString(36),reply=await releaseTransport.dispatch(self.ArcRuntimeReleaseTransport.envelope(self.ArcRuntimeReleaseTransport.constants.types.provision,nonce,evidence.provision));
    return reply&&reply.payload&&reply.payload.ok?reply.payload.result:{state:'BOOTSTRAP_BLOCKED',error:reply&&reply.payload&&reply.payload.error||null};
  }catch(error){return{state:'BOOTSTRAP_BLOCKED',error:{code:error.code||error.name,message:error.message}};}
}
let releaseBootstrapPromise=null;
async function ensureVerifiedWaitingRelease(){
  if(releaseBootstrapPromise)return releaseBootstrapPromise;
  releaseBootstrapPromise=bootstrapVerifiedWaitingRelease();
  try{return await releaseBootstrapPromise;}finally{releaseBootstrapPromise=null;}
}
function exactLegacyApplyMessage(message){return !!message&&typeof message==='object'&&!Array.isArray(message)&&Object.keys(message).length===1&&message.type==='SKIP_WAITING';}
function scopedLegacyApplyClient(event){
  const source=event&&event.source;
  if(!source||source.type!=='window'||typeof source.url!=='string'||!self.registration.active)return false;
  try{const url=new URL(source.url),scope=new URL(self.registration.scope);return url.origin===scope.origin&&url.href.startsWith(scope.href);}catch(error){return false;}
}
async function dispatchReleaseMessage(message,event){
  if(exactLegacyApplyMessage(message)){
    if(!scopedLegacyApplyClient(event))return self.ArcRuntimeReleaseTransport.envelope(self.ArcRuntimeReleaseTransport.constants.types.response,'legacy-explicit-apply',{ok:false,error:{code:'LEGACY_APPLY_SOURCE_REFUSED',message:'Legacy Apply requires an existing ARC window controlled inside this service-worker scope.',details:null}});
    try{return self.ArcRuntimeReleaseTransport.envelope(self.ArcRuntimeReleaseTransport.constants.types.response,'legacy-explicit-apply',{ok:true,result:await releaseTransport.applyLegacyVerified()});}
    catch(error){return self.ArcRuntimeReleaseTransport.envelope(self.ArcRuntimeReleaseTransport.constants.types.response,'legacy-explicit-apply',{ok:false,error:{code:error.code||error.name||'TRANSPORT_FAILED',message:error.message||String(error),details:error.details||null}});}
  }
  if(message&&message.type===self.ArcRuntimeReleaseTransport.constants.types.query&&(self.registration.installing||self.registration.waiting)){
    self.__arcReleaseBootstrapStatus=await ensureVerifiedWaitingRelease();
  }
  return releaseTransport.dispatch(message);
}
self.addEventListener('install',event=>{releaseWorkerLifecycleRole='waiting';event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>persistWorkerLifecycleRole('waiting')).then(()=>ensureVerifiedWaitingRelease()).then(status=>{self.__arcReleaseBootstrapStatus=status;}));});
self.addEventListener('message',event=>{event.waitUntil(dispatchReleaseMessage(event.data,event).then(reply=>{if(event.ports&&event.ports[0])event.ports[0].postMessage(reply);else if(event.source&&event.source.postMessage)event.source.postMessage(reply);}));});
function scopedRequestPath(url){
  const scopePath=new URL(self.registration.scope).pathname;
  if(!url.pathname.startsWith(scopePath))return null;
  const path=url.pathname.slice(scopePath.length).replace(/^\/+/, '');
  if(!path||path.includes('\\')||/%(?:2e|2f|5c|00)/i.test(path)||path.split('/').some(part=>part==='.'||part==='..'))return null;
  return path;
}
async function reviewedStaticResponse(event,url,path){
  const cache=await caches.open(CACHE),key='./'+path;
  const cached=await cache.match(key,{ignoreSearch:true});
  if(cached)return cached;
  try{
    const response=await fetch(event.request,{cache:'reload',credentials:'same-origin',redirect:'error'});
    const responseUrl=new URL(response&&response.url||url.href);
    if(!response||!response.ok||response.redirected||responseUrl.origin!==self.location.origin)return new Response('Reviewed ARC static asset is unavailable.',{status:503});
    await cache.put(key,response.clone());
    return response;
  }catch(error){
    const retry=await cache.match(key,{ignoreSearch:true});
    return retry||new Response('Reviewed ARC static asset is unavailable.',{status:503});
  }
}
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    const target=url.pathname.endsWith('/engineering/arc_v8_verification.html')?'./engineering/arc_v8_verification.html':url.pathname.endsWith('/engineering/arc_v8_stage2_verification.html')?'./engineering/arc_v8_stage2_verification.html':url.pathname.endsWith('/engineering/arc_v8_production_academic_configuration.html')?'./engineering/arc_v8_production_academic_configuration.html':url.pathname.endsWith('/engineering/arc_instructional_reference_verification.html')?'./engineering/arc_instructional_reference_verification.html':url.pathname.endsWith('/engineering/arc_academic_authority_activation.html')?'./engineering/arc_academic_authority_activation.html':'./index.html';
    event.respondWith(releaseTransport.currentVerified().then(async release=>{if(release){const verified=await caches.open(release.cacheName),cached=await verified.match(new URL(target,self.registration.scope).href,{ignoreSearch:false});return cached||new Response('Verified ARC release cache is incomplete.',{status:503});}return fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(target,copy));}return response;}).catch(()=>target==='./index.html'?caches.match('./index.html'):caches.match(target));}));
    return;
  }
  event.respondWith(releaseTransport.currentVerified().then(async release=>{if(release){const path=scopedRequestPath(url);if(path&&REVIEWED_NON_AUTHORITY_STATIC.has(path))return reviewedStaticResponse(event,url,path);if(!path)return new Response('ARC release request path is unavailable.',{status:503});const verified=await caches.open(release.cacheName),cached=await verified.match(new URL(path,self.registration.scope).href,{ignoreSearch:false});return cached||new Response('Verified ARC release asset is unavailable.',{status:503});}return caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}));}));
});
