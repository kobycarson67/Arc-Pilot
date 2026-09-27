const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Directory = require('../src/current_student_directory');
const Time = require('../src/arc_time_lifecycle');
const Bank = require('../src/project_bank');
const Forecast = require('../src/class_forecast');
const Shell = require('../src/arc_titanium_shell');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src/arc_visual_foundation.css'), 'utf8');
const nav = fs.readFileSync(path.join(root, 'src/arc_titanium_shell.js'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }

test('current directory groups each active enrollment once and filters without state mutation', () => {
  const state = {academicYear:'2026-27',semester:'Semester 1',activeSectionId:'b',sections:[{id:'b',period:2,course:'wt',name:'B'},{id:'a',period:1,course:'awt',name:'A'}],classes:{wt:[],awt:[]}};
  const active = (id,name,sectionId,course) => ({id,name,enrollments:[{active:true,year:state.academicYear,semester:state.semester,sectionId,course}]});
  state.classes.awt.push(active('1','Avery','a','awt'));
  state.classes.wt.push(active('2','Blake','b','wt'),{id:'3',name:'Dropped',enrollments:[{active:false,year:state.academicYear,semester:state.semester,sectionId:'b'}]});
  const members = id => state.classes[state.sections.find(s => s.id === id).course].filter(s => s.enrollments.some(e => e.active && e.year === state.academicYear && e.semester === state.semester && e.sectionId === id));
  const groups = Directory.build(state,members);
  assert.deepEqual(groups.map(g => [g.section.id,g.count]),[['a',1],['b',1]]);
  assert.deepEqual(Directory.filter(groups,'avery').map(g => g.students.map(s => s.id)),[['1'],[]]);
  assert.equal(state.activeSectionId,'b');
  assert.match(html,/function openDirectoryStudent\(studentId, sectionId\)/);
  assert.match(html,/sectionStudents\(sectionId\)\.some\(item => item\.id === studentId\)/);
  assert.match(html,/state\.activeSectionId = section\.id; state\.course = section\.course; save\(\); openStudent\(studentId\)/);
  assert.match(html,/function renderRoster\(\)/);
  assert.match(nav,/action:'renderCurrentStudentDirectory'/);
});

test('global Project Bank reads schema 7 definitions and keeps class assignment contextual', () => {
  assert.equal(Bank.starterDefinitions().length,4);
  assert(Bank.starterDefinitions().every(p => p.applicability.wt && !p.applicability.awt));
  const legacy = Bank.mergeDefinitions([{id:'custom',title:'Custom',applicability:{wt:false,awt:true}}],{wt:[],awt:[]});
  assert(legacy.some(p => p.id === 'custom' && p.applicability.awt));
  assert.match(html,/function renderProjectBank\(\) \{ ensureProjectBank\(\)/);
  const route = html.match(/function renderProjectBank\(\)[\s\S]*?function renderAllStudentProfiles/)[0];
  assert.match(route,/state\.projectBank\.filter/);
  assert.doesNotMatch(route,/state\.projectLibrary\[c\]/);
  assert.match(route,/projectBankRow\(p, true\)/);
  assert.match(html,/global \? "" : `<button class="btn primary" onclick="showAssignProjectStudents/);
  assert.match(html,/function refreshProjectDefinitionView\(\)/);
  assert.match(html,/function ensureProjectRecord\(student, tpl/);
  assert.match(html,/Project assignment never consumes material automatically\./);
});

test('deep links reuse exact student, assignment, checkpoint and competency IDs', () => {
  assert.match(html,/Ranked Open Shop Choices[\s\S]*?viewStudentCompetency\('\$\{s\.id\}','\$\{x\.c\.code\}'\)/);
  assert.match(html,/function viewStudentCompetency\(studentId, code\)/);
  assert.match(html,/function openKnownStudentProject\(studentId, assignmentId, checkpointId/);
  assert.doesNotMatch(html.slice(html.indexOf('function openKnownStudentProject('),html.indexOf('function showProjectOperations(')),/showProjectCheckpointDetails|showProjectOperations|showAssignedProjectInfo|openProject/);
  assert.match(html,/classForecastOpenStudent\('\$\{item\.studentId\}','\$\{assignmentId \|\| ""\}','\$\{checkpointId\}','\$\{stageId\}'\)/);
  assert.match(html,/function fastRosterNeedHtml[\s\S]*?openStudentProjectAssigner/);
  assert.match(html,/function openStudentProjectAssigner\(studentId\) \{ openStudent\(studentId\); tab = "projects"; renderModal\(\); showProjectAssigner\(\); \}/);
});

test('known project navigation stops at the exact assignment card without opening actions', () => {
  const source = html.slice(html.indexOf('function openKnownStudentProject('),html.indexOf('function showProjectOperations('));
  const project = {id:'pa_2',name:'Exact Build',checkpoints:[{id:'cp_3',status:'ready_for_review'}]}, student = {id:'stu_1',projects:[project]};
  const calls = [], classes = new Set(), target = {getAttribute:() => 'pa_2',scrollIntoView:() => calls.push('scroll'),classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)}};
  const context = {allStudents:() => [student],openStudent:id => calls.push('student:'+id),renderModal:() => calls.push('projects'),document:{querySelectorAll:() => [target]},setTimeout:fn=>fn(),tab:''};
  vm.createContext(context); vm.runInContext(source,context);
  context.openKnownStudentProject('stu_1','pa_2','cp_3','fit_up');
  assert.deepEqual(calls,['student:stu_1','projects','scroll']);
  assert.equal(context.tab,'projects'); assert.equal(student.projects.length,1);
  assert.equal(classes.size,0);
  calls.length=0; context.openKnownStudentProject('stu_1','unknown','cp_3'); assert.deepEqual(calls,[]);
});
test('Forecast carries the known next stage identifier', () => {
  const project = {currentStageId:'planning',stages:[{id:'planning',name:'Planning'},{id:'fit_up',name:'Fit-Up',requiresInstructorCheck:true}]};
  assert.equal(Forecast.nextDefinedStage(project,{instructorCheckpoints:[]}).stageId,'fit_up');
});

test('sidebar controls share effective responsive state and next-action glyph', () => {
  assert.match(html,/id="arcMobileMenu"[^>]*onclick="toggleArcSidebar\(\)"/);
  assert.match(html,/function syncArcSidebarControls\(\)/);
  assert.match(html,/glyph\.textContent = expanded \? "‹" : "›"/);
  assert.match(html,/rail\.setAttribute\("aria-expanded", String\(expanded\)\)/);
  assert.match(html,/menu\.setAttribute\("aria-expanded", String\(expanded\)\)/);
  assert.match(html,/function runArcNavigation\(action\)[^\n]*setArcMobileSidebarOpen\(false\)/);
  assert.match(html,/function reconcileArcResponsiveState\(\)/);
  assert.doesNotMatch(css,/arc-rail-toggle span\{transform:rotate\(180deg\)/);
});

test('sidebar toggle actually opens and closes on mobile and preserves desktop preference', () => {
  const source = html.slice(html.indexOf('function arcShellCollapsedPreference()'),html.indexOf('function pushArcTransientHistory('));
  const classes = new Set(), attributes = {};
  const classList = {contains:value => classes.has(value),add:value => classes.add(value),remove:value => classes.delete(value),toggle:(value,on) => on?classes.add(value):classes.delete(value)};
  function control(){return {attrs:{},title:'',label:{textContent:''},glyph:{textContent:''},setAttribute(name,value){this.attrs[name]=value;},querySelector(value){return value==='span'?this.glyph:this.label;}};}
  const rail = control(), menu = control(); let mobile = true, stored = {};
  const context = {window:{matchMedia:() => ({matches:mobile})},document:{body:{classList},getElementById:id => id==='arcSidebarToggle'?rail:id==='arcMobileMenu'?menu:null},localStorage:{getItem:key => stored[key],setItem:(key,value) => stored[key]=value},pushArcTransientHistory(){},clearArcTransientHistoryMarker(){}};
  vm.createContext(context); vm.runInContext("const ARC_SIDEBAR_PREF_KEY = 'arc_ui_titanium_sidebar_collapsed';\n"+source,context);
  context.syncArcSidebarControls(); assert.equal(rail.glyph.textContent,'›'); assert.equal(menu.attrs['aria-expanded'],'false');
  context.toggleArcSidebar(); assert(classes.has('arc-sidebar-open')); assert.equal(rail.glyph.textContent,'‹'); assert.equal(menu.attrs['aria-expanded'],'true');
  context.toggleArcSidebar(); assert(!classes.has('arc-sidebar-open')); assert.equal(rail.attrs['aria-expanded'],'false');
  mobile=false; context.toggleArcSidebar(); assert(classes.has('arc-sidebar-collapsed')); assert.equal(stored.arc_ui_titanium_sidebar_collapsed,'1'); assert.equal(rail.glyph.textContent,'›');
  context.toggleArcSidebar(); assert(!classes.has('arc-sidebar-collapsed')); assert.equal(stored.arc_ui_titanium_sidebar_collapsed,'0'); assert.equal(rail.glyph.textContent,'‹');
});

test('time controller ticks once per minute, wakes, and cleans up', () => {
  let now = new Date('2026-09-22T10:22:45.250'), calls = [], timers = new Map(), next = 0;
  const controller = Time.create({now:() => now,onTick:d => calls.push(d.getMinutes()),setTimeout:(fn,ms) => {timers.set(++next,{fn,ms});return next;},clearTimeout:id => timers.delete(id)});
  assert.match(Time.clock(now),/^10:22\s?AM$/);
  controller.start(); controller.start();
  assert.deepEqual(calls,[22]); assert.equal(timers.size,1); assert.equal([...timers.values()][0].ms,14750);
  now = new Date('2026-09-22T10:23:00.000'); [...timers.values()][0].fn(); assert.deepEqual(calls,[22,23]); assert.equal(timers.size,1);
  controller.wake(); assert.deepEqual(calls,[22,23,23]); assert.equal(timers.size,1);
  controller.stop(); assert.equal(timers.size,0); controller.wake(); assert.equal(calls.length,3);
  assert.match(html,/dayPlan\(now\), ctx = currentScheduleContext\(now\), period = ArcTimeLifecycle\.periodStatus/);
  assert.match(html,/if \(navCurrentView !== "main"\) return period && period\.nextDelay/);
  assert.match(html,/document\.addEventListener\("visibilitychange"/);
  assert.match(html,/window\.addEventListener\("pageshow"/);
  assert.match(html,/window\.addEventListener\("focus"/);
  assert.match(html,/window\.addEventListener\("orientationchange"/);
  assert(!html.match(/function refreshArcTime\(now\)[\s\S]*?const arcTimeController/)[0].includes('state.activeSectionId ='));
});

test('authoritative schedule handles bell transition, Planning and no-school without selecting class', () => {
  const source = html.slice(html.indexOf('function currentScheduleContext('),html.indexOf('function activeNotifications('));
  const context = {state:{activeSectionId:'selected',planningPeriod:2,sections:[{id:'first',period:1},{id:'third',period:3}]},ensureScheduleModel(){},dayPlan(){return context.plan;},bellSchedule(){return {name:'Regular',times:{1:{start:'10:00',end:'10:20'},2:{start:'10:21',end:'10:40'},3:{start:'10:41',end:'11:00'}}};},periodTimeLabelFor(){return 'Period time';},timeMinutes(v){const [h,m]=v.split(':').map(Number);return h*60+m;},ordinal(n){return n===1?'st':n===2?'nd':'rd';},dayTypeLabel(){return 'No School';},instructionModeLabel(){return 'Regular';}};
  vm.createContext(context); vm.runInContext(source,context);
  context.plan={dayType:'school',scheduleId:'regular',instructionMode:'regular'};
  let before=context.currentScheduleContext(new Date('2026-09-22T10:20:00'));
  let planning=context.currentScheduleContext(new Date('2026-09-22T10:21:00'));
  let after=context.currentScheduleContext(new Date('2026-09-22T10:41:00'));
  assert.equal(before.kind,'class'); assert.equal(before.period,1);
  assert.equal(planning.kind,'planning');
  assert.equal(after.kind,'class'); assert.equal(after.period,3);
  assert.equal(Shell.currentClass(context.state,before).id,'first');
  assert.equal(Shell.currentClass(context.state,planning),null);
  assert.equal(Shell.currentClass(context.state,after).id,'third');
  context.plan={dayType:'no_school',scheduleId:'regular',instructionMode:'none'};
  assert.equal(context.currentScheduleContext(new Date('2026-09-22T10:41:00')).kind,'off');
  assert.equal(context.state.activeSectionId,'selected');
});

test('Dashboard and clock refresh on wake and date rollover without changing selected class', () => {
  const source = html.slice(html.indexOf('function refreshArcTime(now)'),html.indexOf('const arcTimeController'));
  const elements = {arcHeaderClock:{textContent:'',dateTime:''},arcCleanupBanner:{hidden:true},dashboardCurrentClass:{dataset:{},innerHTML:''},dashboardToday:{innerHTML:''}};
  const context = {document:{getElementById:id => elements[id]},navCurrentView:'main',state:{activeSectionId:'selected',sections:[{id:'first',period:1},{id:'third',period:3}]},ArcTimeLifecycle:Time,ArcTitaniumShell:Shell,dateKey:date => date.toISOString().slice(0,10),dayPlan:date => ({dayType:date.getUTCDate()===23?'no_school':'school',scheduleId:'regular',instructionMode:'regular'}),currentScheduleContext:date => date.getUTCDate()===23?{kind:'off',label:'No School'}:{kind:'class',period:date.getUTCHours()===10?1:3},bellSchedule:() => ({times:{1:{end:'11:00'},3:{end:'12:00'}}}),dashboardCurrentCardHtml:(section,ctx) => section?section.id:ctx.kind,dashboardTodayHtml:(date,plan) => date.getUTCDate()+' '+plan.dayType};
  vm.createContext(context); vm.runInContext(source,context);
  context.refreshArcTime(new Date('2026-09-22T10:59:00Z'));
  assert.equal(elements.dashboardCurrentClass.innerHTML,'first');
  context.refreshArcTime(new Date('2026-09-22T11:00:00Z'));
  assert.equal(elements.dashboardCurrentClass.innerHTML,'third');
  context.refreshArcTime(new Date('2026-09-23T00:00:00Z'));
  assert.equal(elements.dashboardCurrentClass.innerHTML,'off');
  assert.equal(elements.dashboardToday.innerHTML,'23 no_school');
  assert.equal(context.state.activeSectionId,'selected');
  assert.match(elements.arcHeaderClock.textContent,/^\d{1,2}:\d{2}\s?(AM|PM)( · .+)?$/);
  context.navCurrentView='roster';
  context.refreshArcTime(new Date('2026-09-24T10:00:00Z'));
  assert.equal(elements.dashboardCurrentClass.innerHTML,'off');
});

test('registry and offline shell include milestone capabilities', () => {
  const registry = fs.readFileSync(path.join(root,'docs/ARC_CAPABILITY_REGISTRY.md'),'utf8');
  for (const value of ['Implemented','Partial','Foundation','Docked / Future','Missing','Students','Project Library','Header live clock','Purchasing/readiness forecasting']) assert(registry.includes(value),value);
  assert(sw.includes('./src/current_student_directory.js'));
  assert(sw.includes('./src/arc_time_lifecycle.js'));
  assert.match(html,/const CURRENT_SCHEMA_VERSION = 7;/);
  assert.equal(Shell.navigation().find(g => g.id === 'classroom').items.find(i => i.id === 'roster').action,'renderCurrentStudentDirectory');
});
test('inline application script parses', () => {
  const match = html.match(/<script>\s*([\s\S]*?)<\/script>/);
  assert(match);
  new vm.Script(match[1],{filename:'index.html inline script'});
});
console.log('PASS ' + count + ' ARC Workflow Integration 1 tests');
