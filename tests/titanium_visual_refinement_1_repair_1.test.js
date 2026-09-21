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
  'assets/brand/runtime/arc-welding-compact-lockup-720.png':[[720,194],'64a81ea22bc57220238616374db60905e4fb1198faa491150c859f32adb429df'],
  'icons/favicon-32.png':[[32,32],'1325ac54e6c511b9794eb8495b32964a7cb62fc65bcc3bcdc17d7a4cd4348a6b'],
  'icons/apple-touch-icon-180.png':[[180,180],'62ae6c91a8a99816dd13731bff90d8849943e81ba21517f8673827ed090d09f2'],
  'icons/icon-192.png':[[192,192],'42d0e7ec26f2079167af7db8342fe05374c6c4463b8705245126306fd851ebc2'],
  'icons/icon-512.png':[[512,512],'ee7817ccc9f032497bcd43e44eecc43be873351ffa29f1cf76d46634d982cf28'],
  'icons/icon-maskable-192.png':[[192,192],'93177d77e079381b2cd2edda90a324eec399f2ad8887987d8ef10793b8833634'],
  'icons/icon-maskable-512.png':[[512,512],'d22754b4c5e1bd9705380692ee391fa28d979e3cb57dac5daceecdb9134f13fb']
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
assert(builder.includes('ARC_BODY_BOUNDS = (244, 10, 1745, 409)'),'optical centering must use measured metallic-body bounds');
assert(builder.includes('scale = 0.395 if maskable else 0.485'),'ARC fit must distinguish safe-zone and general masters');
assert(builder.includes('if not maskable:'),'maskable artwork must not bake in a false rounded-square perimeter');
assert(builder.includes('inner_inset = 12'),'general master must use the fine six-pixel production rim');
assert(builder.includes('SUBTITLE_CROP = (250, 415, 1750, 480)'),'compact subtitle must derive from approved source pixels');
assert(builder.includes('general.resize((192, 192), LANCZOS)'),'small general icons must derive from the 512 master');
assert(builder.includes('maskable.resize((192, 192), LANCZOS)'),'small maskable icons must derive from the 512 master');
assert(!builder.match(/ImageFont|text\(/),'builder must not redraw ARC letters');
assert(html.includes('src="assets/brand/runtime/arc-welding-lettermark-720.png" alt="ARC"'));
assert(html.includes('src="assets/brand/runtime/arc-welding-compact-lockup-720.png" alt="ARC — Advanced Welding Classroom"'));
assert(refinement.includes('.arc-sidebar-collapsed .arc-brand-mark-compact{display:block;width:68px;height:32px}'));

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
