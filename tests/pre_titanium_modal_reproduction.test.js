const assert=require('assert');
const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('src/arc_visual_foundation.css','utf8');

const cases=[
  ['Student + Main Menu','modal'],
  ['Search + Main Menu','navOverlay'],
  ['Search + Classes','navOverlay'],
  ['Student → Material Use/Waste → Main Menu','inventoryOverlay']
];
const nav=html.slice(html.indexOf('function navMark('),html.indexOf('function isStandaloneMode'));
const clear=html.slice(html.indexOf('function clearTransientUi('),html.indexOf('function renderRestoredNavigation('));
cases.forEach(([label,id])=>{
  assert(nav.includes('clearTransientUi({ preserveNavigation: true })'),label+' must enter shared cleanup');
  if(id==='modal')assert(clear.includes('classList.remove("show")'),label+' must close student');
  else if(id==='inventoryOverlay')assert(clear.includes('materialModalLifecycle.beforeNavigate()'),label+' must close child lifecycle');
  else assert(clear.includes('body > .modal'),label+' must remove navigation overlay');
  console.log('PASS',label);
});
assert(css.includes('.modal.inventory-modal{z-index:120'));
assert(css.includes('.inventory-modal-header{position:relative'));
assert(css.includes('.inventory-modal-body{min-height:0'));
console.log('PASS Simulation and Live Material modal geometry contract');
