importScripts('./app-build.js');
const VERSION=self.ARC_BUILD.shell;
const CACHE='arc-pilot-'+VERSION;
const CORE=['./','./index.html','./app.webmanifest','./app-build.js','./icons/favicon-32.png','./icons/apple-touch-icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-192.png','./icons/icon-maskable-512.png','./assets/brand/runtime/arc-welding-dashboard-hero-1440.webp','./assets/brand/runtime/arc-titanium-industrial-background-1440.webp','./assets/brand/runtime/arc-welding-primary-logo-960.png','./assets/brand/runtime/arc-welding-lettermark-720.png','./src/arc_visual_foundation.css','./src/arc_titanium_visual_system.css','./src/arc_titanium_visual_refinement_1.css','./src/arc_icons.js','./src/arc_titanium_shell.js','./src/app_update_controller.js','./src/project_checkpoints.js','./src/project_checkpoint_controller.js','./src/project_checkpoint_presenter.js','./src/project_tab_adapter.js','./src/project_checkpoint_persistence.js','./src/project_checkpoint_host_bridge.js','./src/project_checkpoint_card.js','./src/project_bank.js','./src/booth_assignment_lifecycle.js','./src/class_forecast.js','./src/simulation_foundation.js','./src/simulation_fixtures.js','./src/teaching_tips.js','./src/inventory.js','./src/material_inventory.js','./src/material_inventory_presenter.js','./src/material_inventory_modal_lifecycle.js','./src/deployment_readiness.js'];
CORE.push('./assets/brand/runtime/arc-welding-compact-lockup-720.png');
CORE.push('./src/current_student_directory.js');
CORE.push('./src/arc_time_lifecycle.js');
CORE.push('./src/arc_sidebar_gesture.js');
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('arc-pilot-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));}return response;}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;})));
});
