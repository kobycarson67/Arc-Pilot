const assert=require('assert');
const fs=require('fs');
const M=require('../src/material_inventory');
const T=require('../src/teaching_tips');

let pass=0,total=0;
function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(error){console.error('FAIL',name,error.message);process.exitCode=1;}}

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('src/arc_visual_foundation.css','utf8');

test('true global navigation clears student and overlay stack',()=>{
  const nav=html.slice(html.indexOf('function navMark('),html.indexOf('function isStandaloneMode'));
  const clear=html.slice(html.indexOf('function clearTransientUi('),html.indexOf('function renderRestoredNavigation('));
  assert(nav.includes('clearTransientUi({ preserveNavigation: true })'));
  assert(clear.includes('document.querySelectorAll("body > .modal")'));
  assert(clear.includes('document.getElementById("modal").classList.remove("show")'));
  assert(clear.includes('current = null'));
});

test('contextual Back closes child overlays before student profile',()=>{
  const back=html.slice(html.indexOf('function navBack()'),html.indexOf('function navSwitchClass('));
  assert(back.indexOf('assignedProjectInfoOverlay')<back.indexOf('document.getElementById("modal").classList.contains("show")'));
  assert(back.indexOf('boothManageOverlay')<back.indexOf('document.getElementById("modal").classList.contains("show")'));
});

test('inventory dialog outranks the later generic modal rule and owns body scrolling',()=>{
  assert(css.includes('.modal.inventory-modal{z-index:120'));
  assert(css.includes('height:100dvh'));
  assert(css.includes('.inventory-modal-body{min-height:0'));
  assert(css.includes('overflow:auto;overscroll-behavior:contain'));
});

test('station management is native and preserves custom names and history authority',()=>{
  const edit=html.slice(html.indexOf('function editBooth('),html.indexOf('function showResolveBoothIssue('));
  assert(edit.includes('Manage Station'));
  assert(edit.includes('Station name'));
  assert(edit.includes('Equipment / Resources'));
  assert(edit.includes('assignment-history record'));
  assert(!edit.includes('prompt('));
});

test('Open Shop recommendations route to exact authoritative competency detail',()=>{
  assert(html.includes('function viewStudentCompetency(studentId, code)'));
  assert(html.includes('data-competency-code="${c.code}"'));
  assert(html.includes('Open authoritative competency detail'));
  assert(html.includes('View Full Competency'));
});

test('assigned project inspection uses Bank definition or honest assignment fallback',()=>{
  const inspect=html.slice(html.indexOf('function showAssignedProjectInfo('),html.indexOf('function closeAssignedProjectInfo('));
  assert(inspect.includes('projectDefinition(assignment.templateId)'));
  assert(inspect.includes('Project Bank definition'));
  assert(inspect.includes('Independent / Historical Assignment'));
  assert(inspect.includes('has not fabricated a Bank record'));
});

test('starter material catalog creates definitions with zero physical stock',()=>{
  const seeded=M.seedStarterDefinitions(null);
  assert(seeded.definitions.length>=10);
  assert.equal(seeded.pieces.length,0);
  assert.equal(seeded.ledger.length,0);
  ['Angle','Flat Bar','Square Tube','Round Tube','Pipe','Round Bar/Rod','Plate/Sheet','Expanded Metal'].forEach(f=>assert(seeded.definitions.some(d=>d.family===f),f));
});

test('starter catalog preserves custom definitions and is idempotent across reload',()=>{
  const custom=M.addDefinition(null,{id:'custom',name:'Instructor Special',family:'Other',kind:'linear'});
  const once=M.seedStarterDefinitions(custom),twice=M.seedStarterDefinitions(JSON.parse(JSON.stringify(once)));
  assert(once.definitions.some(d=>d.id==='custom'));
  assert.deepEqual(twice,once);
});

test('Teaching Tips uses distinct lesson-connected shop guidance',()=>{
  assert(T.topics({title:'Measurement and Layout'}).includes('measurement'));
  assert(T.topics({title:'Read a Fabrication Drawing'}).includes('drawing'));
  assert(T.topics({title:'Inspect SMAW Beads'}).includes('weld_quality'));
  assert(T.topics({title:'Welding Careers'}).includes('career'));
});

test('schema remains v7 and build is truthful',()=>{
  assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'));
  assert(fs.readFileSync('app-build.js','utf8').includes("build:'sidebar-gesture-repair-2-repair-1'"));
});

if(!process.exitCode)console.log('\n'+pass+'/'+total+' Pre-Titanium UX Stabilization tests passed.');
