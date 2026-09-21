const assert=require('assert');
const crypto=require('crypto');
const fs=require('fs');

const html=fs.readFileSync('index.html','utf8');
const build=fs.readFileSync('app-build.js','utf8');
const visualFoundation=fs.readFileSync('src/arc_visual_foundation.css','utf8');

const expectedBranding={
  'assets/brand/source/arc-welding-primary-logo-approved.png':'dd0f686506ed0d05f986017b97af7a4808a47451e4fa5e002e40f1fba98c01d1',
  'assets/brand/runtime/arc-welding-compact-lockup-720.png':'64a81ea22bc57220238616374db60905e4fb1198faa491150c859f32adb429df',
  'icons/favicon-32.png':'1325ac54e6c511b9794eb8495b32964a7cb62fc65bcc3bcdc17d7a4cd4348a6b',
  'icons/apple-touch-icon-180.png':'62ae6c91a8a99816dd13731bff90d8849943e81ba21517f8673827ed090d09f2',
  'icons/icon-192.png':'42d0e7ec26f2079167af7db8342fe05374c6c4463b8705245126306fd851ebc2',
  'icons/icon-512.png':'ee7817ccc9f032497bcd43e44eecc43be873351ffa29f1cf76d46634d982cf28',
  'icons/icon-maskable-192.png':'93177d77e079381b2cd2edda90a324eec399f2ad8887987d8ef10793b8833634',
  'icons/icon-maskable-512.png':'d22754b4c5e1bd9705380692ee391fa28d979e3cb57dac5daceecdb9134f13fb'
};
function sha(file){return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');}

assert(html.includes('.class-menu-wrap{position:relative}.class-menu{position:absolute;'),
  'Classes must remain an overlay excluded from header and destination layout flow');
assert(html.includes('top:calc(100% + 6px);right:0;z-index:90;'),
  'Classes overlay must be anchored inside the header without right-side document overflow');
assert(html.includes('width:min(340px,calc(100vw - var(--arc-sidebar-width,0px) - 32px))'),
  'Classes overlay width must subtract the authoritative rail-reserved workspace boundary');
assert(!html.includes('.class-menu{position:absolute;top:calc(100% + 6px);left:0;'),
  'deployed left-anchored overflow reproduction must remain repaired');
assert(html.includes('@media(max-width:620px){.class-menu{left:0;right:0;width:auto}}'),
  'narrow portrait overlay must use the full class-control row without viewport overflow');

const toggleBody=html.match(/function toggleClassMenu\(event\) \{([^}]|}(?!\nfunction))*\}/)[0];
assert(toggleBody.includes('menu.hidden = !opening'));
assert(!/classList\.(add|remove|toggle)\(/.test(toggleBody),
  'opening Classes must not mutate body, shell, rail, workspace, destination, or scroll-lock classes');
assert(!/style\.|state\.|save\(/.test(toggleBody),
  'opening Classes must not mutate layout styles or classroom/domain state');

for(const destination of ['renderMainMenu','renderRoster','renderInventory','renderLessonBank','renderModal'])
  assert(html.includes('function '+destination+'('),destination+' must remain available through the shared shell');
assert(visualFoundation.includes('.arc-titanium-shell{--arc-sidebar-width:276px;'));
assert(visualFoundation.includes('.arc-titanium-shell.arc-sidebar-collapsed{--arc-sidebar-width:78px}'));
assert(visualFoundation.includes('@media (max-width:620px){.arc-titanium-shell{--arc-sidebar-width:64px;padding-left:var(--arc-sidebar-width)}'));
assert(html.includes('function navSwitchClass(id) { closeClassMenu();'));
assert(html.includes('state.activeSectionId = id;'));
assert(html.includes('function captureSimulationNavigation()'));
assert(html.includes('ArcTitaniumShell.navigationContextKey(NAV_CONTEXT_KEY, simulationActive())'));
assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'));
assert(build.includes("build:'classes-dropdown-overlay-repair-1'"));

for(const [file,hash] of Object.entries(expectedBranding))
  assert.strictEqual(sha(file),hash,'frozen branding changed: '+file);

console.log('PASS Classes dropdown overlay-only geometry, shared destinations, rail, selection, Simulation, branding, build, and schema contracts');
