const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Time=require('../src/arc_time_lifecycle');
const Gesture=require('../src/arc_sidebar_gesture');
const Forecast=require('../src/class_forecast');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'src/arc_visual_foundation.css'),'utf8');
const refinement=fs.readFileSync(path.join(root,'src/arc_titanium_visual_refinement_1.css'),'utf8');
let count=0;function test(name,fn){fn();count++;console.log('PASS '+name);}

test('Student Summary recommendations reuse exact competency navigation without rating writes',()=>{
  const summary=html.slice(html.indexOf('if (tab === "summary")',html.indexOf('function renderModal()')),html.indexOf('if (tab === "competencies")',html.indexOf('function renderModal()')));
  assert.match(summary,/viewStudentCompetency\('\$\{s\.id\}','\$\{x\.c\.code\}'\)/);
  assert.doesNotMatch(summary,/rating\s*=|save\(|setRating|updateCompetency/);
});

test('project deep links stop after the exact card and Forecast ranking remains authoritative',()=>{
  const route=html.slice(html.indexOf('function openKnownStudentProject('),html.indexOf('function showProjectOperations('));
  assert.match(route,/data-student-project-id/);assert.match(route,/scrollIntoView/);
  assert.doesNotMatch(route,/showProjectCheckpointDetails|showProjectOperations|showAssignedProjectInfo|openProject|applyProjectCheckpointAction/);
  const input={state:{attendanceRecords:{},boothAssignments:[]},section:{id:'s1'},day:'2026-09-22',students:[{id:'a',name:'A',projects:[]}],definitions:[]};
  const before=JSON.stringify(input),result=Forecast.build(input);assert.equal(JSON.stringify(input),before);assert.equal(result.upNext[0].studentId,'a');
});

test('all authoritative checkpoint labels have readable Titanium classes and rubric logic is untouched',()=>{
  for(const state of ['not-started','in-progress','ready-for-review','verified'])assert(css.includes('.arc-status-'+state),state);
  assert.match(html,/arc-status-\$\{row\.status\.replace/);
  assert.match(refinement,/\.arc-project-grading/);
  assert.match(html,/const PROJECT_RUBRIC/);assert.match(html,/function projectScore\(/);
});

test('countdown handles ordinary, cleanup, boundary, Planning and absent periods',()=>{
  const times={1:{start:'10:00',end:'11:00'},2:{start:'11:05',end:'11:45'}};
  assert.equal(Time.periodStatus(new Date(2026,8,22,10,22,0),{kind:'class',period:1},times).label,'38 min left');
  let cleanup=Time.periodStatus(new Date(2026,8,22,10,50,18),{kind:'class',period:1},times);
  assert.equal(cleanup.label,'CLEANUP · 09:42');assert.equal(cleanup.nextDelay,1000);
  assert.equal(Time.periodStatus(new Date(2026,8,22,11,0,0),{kind:'class',period:1},times),null);
  assert.equal(Time.periodStatus(new Date(2026,8,22,11,10,0),{kind:'planning',period:2},times).label,'Planning · 35 min left');
  assert.equal(Time.periodStatus(new Date(2026,8,22,12,0,0),{kind:'between'},times),null);
  assert.equal(Time.periodStatus(new Date(2026,8,22,12,0,0),{kind:'off'},times),null);
});

test('single lifecycle switches cadence for cleanup and wake without a duplicate controller',()=>{
  let now=new Date(2026,8,22,10,50,18),timers=[],ticks=0;
  const c=Time.create({now:()=>now,onTick:d=>{ticks++;return Time.periodStatus(d,{kind:'class',period:1},{1:{end:'11:00'}}).nextDelay;},setTimeout:(fn,ms)=>{timers=[{fn,ms}];return 1;},clearTimeout:()=>{timers=[];}});
  c.start();assert.equal(ticks,1);assert.equal(timers[0].ms,1000);c.wake();assert.equal(ticks,2);assert.equal(timers.length,1);c.stop();assert.equal(timers.length,0);
  assert.equal((html.match(/ArcTimeLifecycle\.create\(/g)||[]).length,1);
  assert.doesNotMatch(html.slice(html.indexOf('function refreshArcTime'),html.indexOf('const arcTimeController')),/state\.activeSectionId\s*=|save\(/);
});

test('alternate schedule authority, wake events, date rollover path, and selected class preservation remain wired',()=>{
  const refresh=html.slice(html.indexOf('function refreshArcTime'),html.indexOf('const arcTimeController'));
  assert.match(refresh,/bellSchedule\(plan\.scheduleId\)\.times/);assert.match(refresh,/currentScheduleContext\(now\)/);
  assert.doesNotMatch(refresh,/state\.activeSectionId\s*=/);
  for(const hook of ['visibilitychange','pageshow','focus','orientationchange'])assert(html.includes(hook),hook);
});

test('cleanup and Simulation success feedback are nonblocking and preserve safety authority',()=>{
  const entry=html.slice(html.indexOf('function enterSimulation('),html.indexOf('function leaveSimulation('));
  const success=entry.slice(0,entry.indexOf('catch (err)'));assert.doesNotMatch(success,/alert\(/);assert.match(entry,/simulationManager\.enter/);assert.match(success,/showArcFeedback/);
  assert.match(html,/10 Minutes Remaining — Begin Cleanup/);assert.doesNotMatch(html.slice(html.indexOf('function refreshArcTime'),html.indexOf('const arcTimeController')),/save\(|alert\(|confirm\(|Notification|vibrat/);
});

test('sidebar gesture supports progress, flick, return and vertical cancellation',()=>{
  const options={edgeWidth:24,intentDistance:8,drawerTravel:220,settleProgress:.5,flickVelocity:.55};
  let g=Gesture.create(options);assert(g.begin({pointerId:1,x:10,y:10,time:0,open:false,blocked:false}));assert.equal(g.move({pointerId:1,x:100,y:12,time:300}).dragging,true);assert.equal(g.end({pointerId:1,x:100,y:12,time:600}).open,false);
  g=Gesture.create(options);g.begin({pointerId:2,x:10,y:10,time:0,open:false,blocked:false});g.move({pointerId:2,x:70,y:10,time:50});assert.equal(g.end({pointerId:2,x:70,y:10,time:51}).open,true);
  g=Gesture.create(options);g.begin({pointerId:3,x:250,y:10,time:0,open:true,blocked:false});g.move({pointerId:3,x:70,y:10,time:300});assert.equal(g.end({pointerId:3,x:70,y:10,time:301}).open,false);
  g=Gesture.create(options);g.begin({pointerId:4,x:10,y:10,time:0,open:false,blocked:false});assert.equal(g.move({pointerId:4,x:12,y:30,time:20}).cancelled,true);
  assert.equal(Gesture.create(options).begin({pointerId:5,x:10,y:10,time:0,open:false,blocked:true}),false);
});

test('sidebar integration shares existing authority and keeps workspace and horizontal controls stable',()=>{
  assert.match(html,/setArcMobileSidebarOpen\(result\.open\)/);assert.match(html,/setArcMobileSidebarOpen\(!document\.body\.classList\.contains/);
  assert.match(html,/input\[type="range"\],canvas/);assert.match(html,/overflowX/);assert.match(css,/arc-sidebar-dragging \.arc-workspace\{width:auto;min-width:0\}/);
  assert.match(css,/arc-sidebar-dragging \.arc-sidebar\{width:var\(--arc-sidebar-drawer-width\)!important;transform:translateX/);
  assert.doesNotMatch(html+css,/arc-sidebar-drag-width|arc-sidebar-drag-reveal/);
  assert.match(css,/prefers-reduced-motion/);assert.match(html,/clearArcTransientHistoryMarker\("shell-navigation"\)/);assert.match(html,/syncArcSidebarControls\(\)/);
});

test('schema, offline assets, build and no-domain-mutation contracts remain exact',()=>{
  const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),build=fs.readFileSync(path.join(root,'app-build.js'),'utf8');
  assert.match(html,/const CURRENT_SCHEMA_VERSION = 7;/);assert(build.includes("build:'sidebar-gesture-repair-2'"));assert(sw.includes('./src/arc_sidebar_gesture.js'));
  assert(html.includes('assets/brand/runtime/arc-welding-primary-logo-960.png'));assert(html.includes('src/arc_icons.js'));
});
console.log('PASS '+count+' ARC Workflow Integration 1 Repair 1 tests');
