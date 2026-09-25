const assert=require('node:assert/strict');
const fs=require('node:fs');
const Gesture=require('../src/arc_sidebar_gesture');
const Shell=require('../src/arc_titanium_shell');

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('src/arc_visual_foundation.css','utf8');
const build=fs.readFileSync('app-build.js','utf8');
const options={edgeWidth:24,intentDistance:8,drawerTravel:222,settleProgress:.5,flickVelocity:.55};
let passed=0;
function test(name,fn){fn();passed++;console.log('PASS '+name);}

test('closed settlement hands authoritative state to stable rail geometry atomically',()=>{
  const start=html.indexOf('function settleArcSidebarGesture(result)');
  const end=html.indexOf('function finish(event)',start);
  assert(start>=0&&end>start);
  const settle=html.slice(start,end);
  const add=settle.indexOf('classList.add("arc-sidebar-handoff-closed")');
  const close=settle.indexOf('setArcMobileSidebarOpen(false)');
  const clear=settle.indexOf('clearDrag()',close);
  const layout=settle.indexOf('sidebar.offsetWidth');
  const remove=settle.indexOf('classList.remove("arc-sidebar-handoff-closed")');
  assert(add>=0&&add<close&&close<clear&&clear<layout&&layout<remove);
  assert.doesNotMatch(settle,/setTimeout|requestAnimationFrame/);
  assert.doesNotMatch(settle,/save\(|state\.|student|project|rating|grade/i);
});

test('closed handoff disables the sidebar width transition only during geometry cleanup',()=>{
  assert.match(css,/\.arc-titanium-shell\.arc-sidebar-handoff-closed \.arc-sidebar\{transition:none!important\}/);
  assert.match(css,/\.arc-sidebar\{[^}]*transition:width 160ms ease\}/);
});

test('slow full-left drag and closing flick both settle closed',()=>{
  let g=Gesture.create(options);
  g.begin({pointerId:1,x:250,y:100,time:0,open:true,startSurface:true,blocked:false});
  g.move({pointerId:1,x:28,y:102,time:900});
  assert.equal(g.end({pointerId:1,x:28,y:102,time:950}).open,false);
  g=Gesture.create(options);
  g.begin({pointerId:2,x:250,y:100,time:0,open:true,startSurface:true,blocked:false});
  g.move({pointerId:2,x:190,y:101,time:50});
  assert.equal(g.end({pointerId:2,x:190,y:101,time:51}).open,false);
});

test('backdrop and open-state behavior remain authoritative',()=>{
  assert.match(css,/arc-sidebar-open \.arc-sidebar-backdrop\{opacity:\.6;pointer-events:auto\}/);
  assert.match(css,/arc-sidebar-dragging \.arc-sidebar-backdrop\{opacity:var\(--arc-sidebar-backdrop-opacity\);pointer-events:auto;transition:none\}/);
  const close=html.slice(html.indexOf('function closeArcSidebarFromBackdrop('),html.indexOf('function pushArcTransientHistory('));
  assert.match(close,/event\.preventDefault\(\)/);
  assert.match(close,/event\.stopPropagation\(\)/);
  assert.match(close,/setArcMobileSidebarOpen\(false\)/);
});

test('rail acquisition and vertical cancellation remain unchanged',()=>{
  let g=Gesture.create(options);
  assert.equal(g.begin({pointerId:3,x:72,y:300,time:0,open:false,startSurface:true,blocked:false}),true);
  assert.equal(g.move({pointerId:3,x:140,y:302,time:80}).dragging,true);
  g=Gesture.create(options);
  g.begin({pointerId:4,x:70,y:100,time:0,open:false,startSurface:true,blocked:false});
  assert.equal(g.move({pointerId:4,x:72,y:125,time:20}).cancelled,true);
});

test('coarse Samsung tablet landscape remains in the existing collapsible sidebar mode',()=>{
  assert.match(html,/ARC_COLLAPSIBLE_SIDEBAR_QUERY = "\(max-width:900px\), \(pointer:coarse\) and \(max-width:1366px\)"/);
  assert.match(html,/matchMedia\(ARC_COLLAPSIBLE_SIDEBAR_QUERY\)\.matches/);
  assert.match(css,/@media \(max-width:900px\),\(pointer:coarse\) and \(max-width:1366px\)[^{]*\{\.arc-titanium-shell\{--arc-sidebar-width:78px\}/);
});

test('landscape rail uses the same start surface, horizontal intent, and tap rules',()=>{
  assert.match(html,/startSurface:onSidebar/);
  let g=Gesture.create(options);
  assert.equal(g.begin({pointerId:5,x:72,y:320,time:0,open:false,startSurface:true,blocked:false}),true);
  assert.equal(g.end({pointerId:5,x:72,y:320,time:40}).cancelled,true);
  g=Gesture.create(options);g.begin({pointerId:6,x:72,y:320,time:0,open:false,startSurface:true,blocked:false});
  assert.equal(g.move({pointerId:6,x:74,y:348,time:30}).cancelled,true);
});

test('landscape hamburger is retained and shares the authoritative sidebar controller',()=>{
  assert.match(html,/id="arcMobileMenu"[^>]*onclick="toggleArcSidebar\(\)"/);
  assert.match(css,/@media \(max-width:900px\),\(pointer:coarse\) and \(max-width:1366px\)[^{]*\{[^}]*\.arc-titanium-shell/);
  assert.match(css,/\.arc-mobile-menu\{display:inline-block\}/);
  assert.match(html,/function toggleArcSidebar\(\) \{ if \(arcSidebarIsMobile\(\)\) \{ setArcMobileSidebarOpen/);
  assert.match(css,/arc-sidebar-open \.arc-sidebar-backdrop\{opacity:\.6;pointer-events:auto\}/);
});

test('Expand and Collapse remain present and use the same controller',()=>{
  assert.match(html,/id="arcSidebarToggle"[^>]*onclick="toggleArcSidebar\(\)"/);
  assert.match(html,/function syncArcSidebarControls\(\)/);
});

test('rotation and resize synchronously cancel and clear interactive gesture state',()=>{
  const start=html.indexOf('function resetGesture()');
  const end=html.indexOf('document.addEventListener("pointerup"',start);
  const reset=html.slice(start,end);
  assert.match(reset,/gesture\.cancel\(\); clearDrag\(\); suppressSidebarClickUntil = 0/);
  assert.match(html,/window\.addEventListener\("resize", resetGesture/);
  assert.match(html,/window\.addEventListener\("orientationchange", resetGesture/);
});

test('Technical Assignments is plural, inert, and marked future',()=>{
  const items=Shell.navigation().flatMap(group=>group.items);
  const technical=items.find(item=>item.id==='technical-assignments');
  assert.deepEqual(technical,{id:'technical-assignments',label:'Technical Assignments',icon:'lessonbank',future:true});
  assert.equal(items.some(item=>item.label==='Technical Assignment'),false);
});

test('schema and repair build boundaries are exact',()=>{
  assert.match(html,/const CURRENT_SCHEMA_VERSION = 7;/);
  assert.match(build,/build:'sidebar-gesture-repair-2-repair-1'/);
  assert.doesNotMatch(html,/CURRENT_SCHEMA_VERSION = 8/);
});

console.log('PASS '+passed+' Sidebar Gesture Repair 2 Repair 1 tests');
