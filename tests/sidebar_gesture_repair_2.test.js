const assert=require('node:assert/strict');
const fs=require('node:fs');
const Gesture=require('../src/arc_sidebar_gesture');
const Shell=require('../src/arc_titanium_shell');

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('src/arc_visual_foundation.css','utf8');
const refinement=fs.readFileSync('src/arc_titanium_visual_refinement_1.css','utf8');
const build=fs.readFileSync('app-build.js','utf8');
let passed=0;
function test(name,fn){fn();passed++;console.log('PASS '+name);}
const options={edgeWidth:24,intentDistance:8,drawerTravel:222,settleProgress:.5,flickVelocity:.55};

test('collapsed rail is an eligible gesture start surface away from physical edge',()=>{
  const g=Gesture.create(options);
  assert.equal(g.begin({pointerId:1,x:72,y:300,time:0,open:false,startSurface:true,blocked:false}),true);
  assert.equal(g.move({pointerId:1,x:140,y:302,time:80}).dragging,true);
});

test('rail tap remains pending and settles without opening',()=>{
  const g=Gesture.create(options);
  assert.equal(g.begin({pointerId:2,x:70,y:100,time:0,open:false,startSurface:true,blocked:false}),true);
  assert.deepEqual(g.end({pointerId:2,x:70,y:100,time:30}),{cancelled:true,open:false});
  assert.match(html,/if \(!result\.dragging\) return; event\.preventDefault\(\)/);
});

test('vertical intent cancels and horizontal controls remain protected',()=>{
  let g=Gesture.create(options);g.begin({pointerId:3,x:70,y:100,time:0,open:false,startSurface:true,blocked:false});
  assert.equal(g.move({pointerId:3,x:72,y:125,time:20}).cancelled,true);
  assert.equal(Gesture.create(options).begin({pointerId:4,x:70,y:100,time:0,open:false,startSurface:true,blocked:true}),false);
  assert.match(html,/input\[type="range"\],canvas/);assert.match(html,/overflowX/);
});

test('interactive drawer uses one rigid transformed surface without progress width or reveal threshold',()=>{
  assert.match(css,/width:var\(--arc-sidebar-drawer-width\)!important;transform:translateX\(var\(--arc-sidebar-drag-offset\)\)/);
  assert.doesNotMatch(html+css,/arc-sidebar-drag-width|arc-sidebar-drag-reveal/);
  assert.match(refinement,/arc-sidebar-dragging \.arc-brand-mark-expanded/);
});

test('authoritative backdrop remains dimmed when fully open and follows drag progress',()=>{
  assert.match(html,/id="arcSidebarBackdrop"/);
  assert.match(css,/arc-sidebar-open \.arc-sidebar-backdrop\{opacity:\.6;pointer-events:auto\}/);
  assert.match(css,/arc-sidebar-dragging \.arc-sidebar-backdrop\{opacity:var\(--arc-sidebar-backdrop-opacity\);pointer-events:auto/);
});

test('backdrop closes through shared state and prevents click-through',()=>{
  const close=html.slice(html.indexOf('function closeArcSidebarFromBackdrop('),html.indexOf('function pushArcTransientHistory('));
  assert.match(close,/event\.preventDefault\(\)/);assert.match(close,/event\.stopPropagation\(\)/);assert.match(close,/setArcMobileSidebarOpen\(false\)/);
  assert.match(css,/\.arc-sidebar-backdrop\{position:fixed;z-index:170;inset:0/);
});

test('toggle, navigation, popstate and drag settle share mobile state authority',()=>{
  assert.match(html,/function toggleArcSidebar\(\).*setArcMobileSidebarOpen/);
  assert.match(html,/function runArcNavigation\(action\) \{ setArcMobileSidebarOpen\(false\)/);
  assert.match(html,/if \(document\.body\.classList\.contains\("arc-sidebar-open"\)\) \{ setArcMobileSidebarOpen\(false\)/);
  assert.match(html,/function settleArcSidebarGesture\(result\)/);
  assert.match(html,/if \(result\.open\) \{ setArcMobileSidebarOpen\(true\); clearDrag\(\); return; \}/);
  assert.match(html,/setArcMobileSidebarOpen\(false\);\s*clearDrag\(\)/);
});

test('drawer-left drag and flick still close',()=>{
  let g=Gesture.create(options);g.begin({pointerId:5,x:250,y:100,time:0,open:true,startSurface:true,blocked:false});g.move({pointerId:5,x:80,y:101,time:300});assert.equal(g.end({pointerId:5,x:80,y:101,time:301}).open,false);
  g=Gesture.create(options);g.begin({pointerId:6,x:250,y:100,time:0,open:true,startSurface:true,blocked:false});g.move({pointerId:6,x:190,y:100,time:50});assert.equal(g.end({pointerId:6,x:190,y:100,time:51}).open,false);
});

test('completed drag suppresses accidental sidebar navigation click',()=>{
  assert.match(html,/suppressSidebarClickUntil = Date\.now\(\) \+ 600/);
  assert.match(html,/event\.preventDefault\(\); event\.stopImmediatePropagation\(\)/);
});

test('approved sidebar information architecture and labels are exact',()=>{
  const groups=Shell.navigation();
  assert.deepEqual(groups.map(x=>x.label),['Classroom','Instruction','Activity Library','Shop','ARC / Global']);
  const labels=groups.flatMap(x=>x.items).map(x=>x.label);
  for(const label of ['Students','Lesson Plans','Project Library','Gradebook','Technical Assignments','Skill Challenges','Practice','Resources','Administration'])assert(labels.includes(label),label);
  assert(!labels.includes('Students / Roster'));assert(!labels.includes('Lesson Plan Bank'));assert(!labels.includes('Project Bank'));assert(!labels.includes('Student Showcase'));
});

test('future homes are inert and renamed current destinations preserve routes',()=>{
  const groups=Shell.navigation(),items=groups.flatMap(x=>x.items),future=items.filter(x=>x.future);
  assert(future.every(x=>!x.action));
  assert.equal(items.find(x=>x.label==='Students').action,'renderCurrentStudentDirectory');
  assert.equal(items.find(x=>x.label==='Lesson Plans').action,'renderLessonBank');
  assert.equal(items.find(x=>x.label==='Project Library').action,'renderProjectBank');
});

test('schema domain and build boundaries remain fixed',()=>{
  assert.match(html,/const CURRENT_SCHEMA_VERSION = 7;/);
  assert.match(build,/build:'sidebar-gesture-repair-2-repair-1'/);
  assert.doesNotMatch(html,/CURRENT_SCHEMA_VERSION = 8/);
});

console.log('PASS '+passed+' Sidebar Gesture Repair 2 tests');
