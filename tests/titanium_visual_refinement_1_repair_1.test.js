const assert=require('assert');
const crypto=require('crypto');
const fs=require('fs');

const html=fs.readFileSync('index.html','utf8');
const refinement=fs.readFileSync('src/arc_titanium_visual_refinement_1.css','utf8');
const foundation=fs.readFileSync('src/arc_visual_foundation.css','utf8');
const visual=fs.readFileSync('src/arc_titanium_visual_system.css','utf8');
const manifest=JSON.parse(fs.readFileSync('app.webmanifest','utf8'));
const sw=fs.readFileSync('sw.js','utf8');
const workflow=fs.readFileSync('.github/workflows/pages-live-verification.yml','utf8');
const build=fs.readFileSync('app-build.js','utf8');
const builder=fs.readFileSync('scripts/build_arc_brand_derivatives.py','utf8');

function sha(file){return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');}
function pngSize(file){const data=fs.readFileSync(file);assert.strictEqual(data.toString('ascii',1,4),'PNG');return [data.readUInt32BE(16),data.readUInt32BE(20)];}

const approved={
  'assets/brand/source/arc-titanium-authoritative-visual-reference-v1.jpg':'04824a21ed3b47f2976cef351fedc3ebd8cf7bbb0d3dfc6a796f24727ac62787',
  'assets/brand/source/arc-titanium-industrial-background-approved.png':'ba903d24f846b4ec43dc5d5edecbb7d8b7774c9a3332ae540a397ff5241201e4',
  'assets/brand/source/arc-welding-dashboard-hero-approved.png':'8b308c7f5d6a475b00440d370a0ce6b8012e537803a813cd35b0840ba2af2b12',
  'assets/brand/source/arc-welding-primary-logo-approved.png':'dd0f686506ed0d05f986017b97af7a4808a47451e4fa5e002e40f1fba98c01d1'
};
for(const [file,hash] of Object.entries(approved)) assert.strictEqual(sha(file),hash,'approved source changed: '+file);

const derivatives={
  'assets/brand/runtime/arc-welding-lettermark-720.png':[[720,144],'8f704c138ac8e32a4ef8ac76e3561677e3b5b500f232d36d8d7c0fbc142c4be1'],
  'icons/favicon-32.png':[[32,32],'eba86ceff3722534e313eb660a20f60d90315407da25b788839c1123759d8970'],
  'icons/apple-touch-icon-180.png':[[180,180],'930010ce9c10195d6bc00c56d3da79405c090563a5ac93efe102cbbe91adba6c'],
  'icons/icon-192.png':[[192,192],'aea9731650741cee6c986c51ba3f3caa0976cfc6c145bdca7329a09fd927480b'],
  'icons/icon-512.png':[[512,512],'e8a6cc7461df996e439351ab976f4cdcbee811153433715434547330734570a2'],
  'icons/icon-maskable-192.png':[[192,192],'7aa98bcd3062bda79b0a15b111a15c4b088c213c242d718ebbdba17e82e535d7'],
  'icons/icon-maskable-512.png':[[512,512],'fc3e82250828505165fec5c6e0a77e0f332990fcb9d8c31fef17bd5a2e159f2d']
};
for(const [file,[size,hash]] of Object.entries(derivatives)){
  assert.deepStrictEqual(pngSize(file),size,'wrong derivative dimensions: '+file);
  assert.strictEqual(sha(file),hash,'branding derivative changed: '+file);
  assert(sw.includes("'./"+file+"'"),'offline shell misses '+file);
  assert(workflow.includes(file),'Pages verification misses '+file);
}

assert(builder.includes('LETTERMARK_CROP = (0, 0, 2048, 410)'));
assert(builder.includes('lettermark = source.crop(LETTERMARK_CROP)'));
assert(builder.includes('background.alpha_composite(mark'));
assert(!builder.match(/ImageFont|text\(/),'builder must not redraw ARC letters');
assert(html.includes('src="assets/brand/runtime/arc-welding-lettermark-720.png" alt="ARC"'));
assert(!html.includes('src="assets/brand/runtime/arc-welding-compact-mark-720.png"'));

assert(html.includes('<div class="arc-dashboard"><section class="arc-dashboard-hero"'));
assert(refinement.includes('.arc-dashboard{inline-size:100%;max-inline-size:none;min-inline-size:0}'));
for(const selector of ['.arc-dashboard>.arc-dashboard-hero','.arc-dashboard>.arc-dashboard-pulse','.arc-dashboard>.arc-dashboard-actions','.arc-dashboard>.arc-dashboard-lower','.arc-dashboard>.arc-dashboard-quick','.arc-dashboard>.arc-dashboard-footer']) assert(refinement.includes(selector),'common Dashboard boundary misses '+selector);
assert(refinement.includes('.arc-dashboard-lower>*{min-width:0;max-width:100%}'),'lower grid must not establish a wider min-content boundary');
assert(visual.includes('@media (max-width:900px){.arc-workspace main{padding:18px}'),'global portrait workspace must remain untouched');
assert(visual.includes('@media (max-width:900px)')&&refinement.includes('@media (max-width:900px){.arc-dashboard-hero{min-height:350px}'),'approved landscape/base composition and portrait breakpoint remain');
assert(foundation.includes('.arc-titanium-shell.arc-sidebar-collapsed{--arc-sidebar-width:78px}'));
assert(foundation.includes('@media (max-width:620px){.arc-titanium-shell{--arc-sidebar-width:64px;padding-left:var(--arc-sidebar-width)}'));
assert(foundation.includes('.arc-titanium-shell .inventory-modal{left:var(--arc-sidebar-width);z-index:120}'));
assert(html.includes('ArcTitaniumShell.navigationContextKey(NAV_CONTEXT_KEY, simulationActive())'));

const purposes=Object.fromEntries(manifest.icons.map(icon=>[icon.src,icon.purpose]));
assert.strictEqual(purposes['icons/icon-192.png'],'any');
assert.strictEqual(purposes['icons/icon-512.png'],'any');
assert.strictEqual(purposes['icons/icon-maskable-192.png'],'maskable');
assert.strictEqual(purposes['icons/icon-maskable-512.png'],'maskable');
assert(html.includes('href="icons/favicon-32.png"'));
assert(html.includes('href="icons/apple-touch-icon-180.png"'));
assert(build.includes("build:'titanium-visual-refinement-1-repair-1'"));
assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'));

console.log('PASS Titanium Visual Refinement 1 Repair 1 Dashboard-boundary, approved-lettermark, PWA-icon, offline, geometry, Simulation, build, and schema contracts');
