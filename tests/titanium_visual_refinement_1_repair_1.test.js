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
  'icons/favicon-32.png':[[32,32],'51fe45cf52c8ad9a574dd76cf122829db632025fffdf869b0c3667898e3f91a2'],
  'icons/apple-touch-icon-180.png':[[180,180],'4347bc5075b4d57e770a251aabc8885b6c7724647467152c11f9d4a0585eb436'],
  'icons/icon-192.png':[[192,192],'cab1cdb8c7abe60a43317766e3224ca8e6e692329c205294b1bd20740b156c10'],
  'icons/icon-512.png':[[512,512],'eed330ffcdc049ef7d9c5b86cc59e2d3ab07265732a3de91669d7f4be7d59366'],
  'icons/icon-maskable-192.png':[[192,192],'41689f8ce153ada79be5959b35f46e9d9886356ab1ab26cc6716200cd0883a67'],
  'icons/icon-maskable-512.png':[[512,512],'cdcd6e9fe733c8160a823e6dcf259a4bdf45213d497f955dba38e7e4b99cebcb']
};
for(const [file,[size,hash]] of Object.entries(derivatives)){
  assert.deepStrictEqual(pngSize(file),size,'wrong derivative dimensions: '+file);
  assert.strictEqual(sha(file),hash,'branding derivative changed: '+file);
  assert(sw.includes("'./"+file+"'"),'offline shell misses '+file);
  assert(workflow.includes(file),'Pages verification misses '+file);
}

assert(builder.includes('LETTERMARK_CROP = (0, 0, 2048, 410)'));
assert(builder.includes('lettermark = source.crop(LETTERMARK_CROP)'));
assert(builder.includes('source.alpha_composite(mark'));
assert(builder.includes('(0, 0, size - 1, size - 1)'),'gold perimeter must begin at the canvas boundary');
assert(builder.includes('0.78 if maskable else 0.925'),'ARC fit must distinguish safe-zone and general masters');
assert(builder.includes('general.resize((192, 192), LANCZOS)'),'small general icons must derive from the 512 master');
assert(builder.includes('maskable.resize((192, 192), LANCZOS)'),'small maskable icons must derive from the 512 master');
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
