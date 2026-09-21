const assert=require('assert');
const crypto=require('crypto');
const fs=require('fs');

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('src/arc_titanium_visual_refinement_1.css','utf8');
const icons=fs.readFileSync('src/arc_icons.js','utf8');
const shell=fs.readFileSync('src/arc_titanium_shell.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const build=fs.readFileSync('app-build.js','utf8');

const assets={
  'assets/brand/source/arc-titanium-authoritative-visual-reference-v1.jpg':'04824a21ed3b47f2976cef351fedc3ebd8cf7bbb0d3dfc6a796f24727ac62787',
  'assets/brand/source/arc-titanium-industrial-background-approved.png':'ba903d24f846b4ec43dc5d5edecbb7d8b7774c9a3332ae540a397ff5241201e4',
  'assets/brand/source/arc-welding-dashboard-hero-approved.png':'8b308c7f5d6a475b00440d370a0ce6b8012e537803a813cd35b0840ba2af2b12',
  'assets/brand/source/arc-welding-primary-logo-approved.png':'dd0f686506ed0d05f986017b97af7a4808a47451e4fa5e002e40f1fba98c01d1'
};
for(const [file,expected] of Object.entries(assets)){
  assert(fs.existsSync(file),'missing approved source asset '+file);
  assert.strictEqual(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),expected,'approved asset bytes changed: '+file);
}
const runtime=['arc-welding-dashboard-hero-1440.webp','arc-titanium-industrial-background-1440.webp','arc-welding-primary-logo-960.png','arc-welding-compact-mark-720.png'];
for(const file of runtime){
  const path='assets/brand/runtime/'+file;
  assert(fs.existsSync(path),'missing optimized runtime asset '+path);
  assert(fs.statSync(path).size<600000,'runtime asset is not tablet-optimized: '+path);
  assert(sw.includes("'./"+path+"'"),'offline shell must cache '+path);
}

assert(html.indexOf('src/arc_icons.js')<html.indexOf('src/arc_titanium_shell.js'),'icons must load before the shell');
assert(html.indexOf('src/arc_titanium_visual_refinement_1.css')>html.indexOf('src/arc_titanium_visual_system.css'),'refinement layer must follow the visual system');
assert(sw.includes("'./src/arc_icons.js'")&&sw.includes("'./src/arc_titanium_visual_refinement_1.css'"));
assert(build.includes("build:'titanium-visual-refinement-1'"));
assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'),'schema must remain v7');

['dashboard','students','forecast','attendance','projects','openshop','lessonbank','projectbank','standards','inventory','booths','notifications','search','help','settings','add'].forEach(name=>{
  assert(icons.includes(name+":"),'missing coherent icon '+name);
});
assert(!/[🏠👥📈✅🛠🔥📖📦📋]/u.test(shell),'shell must not use ambiguous emoji navigation');
assert(html.includes('ArcIcons.svg(item.icon)'));
assert(html.includes('aria-label="${item.label}"'));

['arc-welding-primary-logo-960.png','arc-welding-dashboard-hero-1440.webp','arc-titanium-industrial-background-1440.webp','arc-welding-compact-mark-720.png'].forEach(file=>assert((html+css).includes(file),'approved asset not integrated: '+file));
assert(html.includes('function renderMainMenu()'));
assert(html.includes('Class Pulse'));
assert(html.includes('ArcClassForecast.build({ state, section: selectedClass, students: classList'),'Dashboard pulse must use authoritative Forecast derivation');
assert(html.includes('Reserved until authoritative class-and-date lesson scheduling is established.'),'future lesson connection must be honest');
assert(!html.includes('Selected Class Snapshot'),'legacy prototype wording remains');
assert(html.includes('{ main: "Dashboard", schedule: "Today\'s Schedule"'));
const offDay=html.slice(html.indexOf(': `<div class="card arc-dashboard-class-card"><div class="arc-dashboard-kicker">Current Class</div><h3>No Current Class'),html.indexOf('let selectedCard ='));
assert(offDay.includes('ctx.label')&&!offDay.includes('ctx.time'),'off-day state must not present schedule time as a regular day');

['--t-priority-1','--t-priority-2','--t-priority-3','.open-shop-recommendation.p1','.open-shop-recommendation.p2','.open-shop-recommendation.p3'].forEach(token=>assert(css.includes(token),'missing Open Shop priority treatment '+token));
['.arc-project-card','.arc-project-card__current','.arc-btn:not(','#modalBody>details','#modalBody .rate'].forEach(selector=>assert(css.includes(selector),'missing Project dark-surface repair '+selector));
assert(css.includes('.inventory-modal-header')&&css.includes('.arc-dialog-header')&&css.includes('color:#f6f9fd!important'),'modal/header contrast repair missing');

for(const fn of ['showAddStationDialog','saveNewStation','showResolveBoothIssue','saveResolvedBoothIssue']) assert(html.includes('function '+fn+'('),'missing bounded native dialog '+fn);
const stationBlock=html.slice(html.indexOf('function showAddStationDialog('),html.indexOf('function editBooth('));
const resolveBlock=html.slice(html.indexOf('function showResolveBoothIssue('),html.indexOf('function primaryStudentProject('));
assert(!stationBlock.includes('prompt('),'Add Station must not use a browser prompt');
assert(!resolveBlock.includes('prompt('),'station resolution must not use a browser prompt');
assert(html.includes('Assignments are evidence of booth use, not automatic blame.'),'physical booth authority language must remain');

console.log('PASS Titanium Visual Refinement 1 approved assets, Dashboard, icon, contrast, priority, dialog, offline, schema, and preservation contracts');
