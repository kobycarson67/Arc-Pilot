const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const Card=require('../src/project_checkpoint_card');

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('src/arc_visual_foundation.css','utf8');
const build=fs.readFileSync('app-build.js','utf8');
let passed=0;
function test(name,fn){try{fn();passed++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error.stack||error.message);process.exitCode=1}}
function between(start,end){const a=html.indexOf(start),b=html.indexOf(end,a);assert(a>=0&&b>a,`missing source boundary ${start}`);return html.slice(a,b)}

test('checkpoint refresh preserves the student Projects context for Fast Roster, Forecast, and directory entry routes',()=>{
  const calls={};
  const modalBox={scrollTop:73};
  const projectTarget={id:'project-1',focused:false,getAttribute:name=>name==='data-student-project-id'?'project-1':'',focus(options){this.focused=!!(options&&options.preventScroll)}};
  const modal={classList:{contains:name=>name==='show'},querySelector:selector=>selector==='.modalbox'?modalBox:null,querySelectorAll:selector=>selector==='[data-student-project-id]'?[projectTarget]:[]};
  const activeAction={closest:selector=>selector==='[data-student-project-id]'?projectTarget:null};
  const context={
    current:{id:'student-1'},tab:'projects',navCurrentView:'roster',
    document:{activeElement:activeAction,getElementById:id=>id==='modal'?modal:null,querySelectorAll:selector=>selector==='[data-student-project-id]'?[projectTarget]:[]},
    window:{scrollX:11,scrollY:29,scrollTo(x,y){this.restored=[x,y]}},
    closeProjectOperations(){calls.closed=(calls.closed||0)+1},
    renderRoster(options){calls.rosterOptions=options},renderClassForecast(options){calls.forecastOptions=options},
    renderModal(){calls.rendered=(calls.rendered||0)+1}
  };
  vm.createContext(context);
  vm.runInContext(between('function captureProjectContextRefresh','function logProjectForStudent'),context);
  const replacement={id:'student-1',name:'Fictional Student'};
  context.refreshProjectContextView(replacement);
  assert.equal(calls.rosterOptions.preserveTransientUi,true);
  assert.strictEqual(context.current,replacement);assert.equal(context.tab,'projects');assert.equal(calls.rendered,1);
  assert.equal(modalBox.scrollTop,73);assert.deepEqual(context.window.restored,[11,29]);assert.equal(projectTarget.focused,true);
  context.navCurrentView='forecast';context.refreshProjectContextView(replacement);assert.equal(calls.forecastOptions.preserveTransientUi,true);
  context.navCurrentView='students-directory';calls.rosterOptions=null;calls.forecastOptions=null;context.refreshProjectContextView(replacement);
  assert.equal(calls.rosterOptions,null);assert.equal(calls.forecastOptions,null);assert.equal(calls.rendered,3);
});

test('normal navigation still clears transient UI while a context refresh explicitly preserves it',()=>{
  let clears=0;const context={navCurrentView:'roster',navHistory:[],navSuppressHistory:false,clearTransientUi(){clears++},updateNavigationBar(){},persistNavigationContext(){}};
  vm.createContext(context);vm.runInContext(between('function navMark','function isStandaloneMode'),context);
  context.navMark('roster','Roster',{preserveTransientUi:true});assert.equal(clears,0);
  context.navMark('forecast','Forecast');assert.equal(clears,1);assert.equal(context.navCurrentView,'forecast');
});

test('all checkpoint lifecycle actions and undo return through the same context-preserving refresh',()=>{
  const presenter=fs.readFileSync('src/project_checkpoint_presenter.js','utf8');
  for(const action of ['initialize','start','ready','verify','reopen']) assert(html.includes(`data-arc-project-action="${action}"`)||presenter.includes(`id:'${action}'`),action);
  assert(presenter.includes("id:'reopen',label:'Needs More Work'"),'rework route');
  assert(html.includes('refreshProjectContextView(result.student)'));
  assert(html.includes('window.ArcProjectCheckpointHostBridge.undo'));
  assert(html.includes('renderRoster({ preserveTransientUi: true })'));
  assert(html.includes('renderClassForecast({ preserveTransientUi: true })'));
  assert(html.includes('tabindex="-1" data-student-project-id='));
});

test('In Progress, review, and complete project states have explicit legible status treatments',()=>{
  const base={id:'p1',title:'Fictional Project',progressText:'1/2 verified',readyText:'',complete:false,primaryActions:[],checkpointRows:[]};
  assert(Card.render(base).includes('arc-status arc-status-in-progress'));
  assert(Card.render({...base,readyText:'1 waiting for review'}).includes('arc-status-review'));
  assert(Card.render({...base,complete:true}).includes('arc-status-verified'));
  for(const name of ['arc-status-in-progress','arc-status-ready-for-review','arc-status-verified']) assert(css.includes('.'+name),name);
});

test('active-notification count is an identified keyboard button and retains real notification semantics',()=>{
  assert(html.includes('<button id="navNotificationBadge"'));
  assert(html.includes('onclick="showNotifications()"'));
  const badge={style:{},attrs:{},setAttribute(name,value){this.attrs[name]=value}};
  const context={document:{getElementById:id=>id==='navNotificationBadge'?badge:null},activeNotifications:()=>[{id:'n1'},{id:'n2'}]};
  vm.createContext(context);vm.runInContext(between('function syncNotificationBadge','function updateNavigationBar'),context);
  context.syncNotificationBadge();assert.equal(badge.textContent,2);assert.equal(badge.style.display,'inline-flex');assert.match(badge.attrs['aria-label'],/2 active notifications/);
  context.activeNotifications=()=>[];context.syncNotificationBadge();assert.equal(badge.style.display,'none');assert.equal(badge.attrs['aria-label'],'No active notifications');
  assert(html.includes('let list = activeNotifications()'));
  assert(html.includes('completeNotification('));assert(html.includes('dismissNotification('));
});

test('the cache identity advances without changing normal V7 authority',()=>{
  assert(build.includes('p6-navigation-status-repair-1'));
  assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'));
  assert(html.includes('V7_ONLY'));
});

if(!process.exitCode)console.log(`PASS ${passed} P6 navigation/status repair tests`);
