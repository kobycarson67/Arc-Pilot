/* Synthetic UI-only tests: no browser, device or production writes. */
const assert=require('assert'),fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('async function assignTechnicalHubVersion('),end=html.indexOf('async function archiveTechnicalHubDefinition(',start);
let count=0;
async function test(name,fn){await fn();count++;console.log('PASS '+name);}
function context(outcome,label=''){
 const nodes={technicalHubSection:{value:'period-b'},technicalHubAssignedDate:{value:'2026-11-13'},technicalHubResult:{},technicalHubOccurrenceLabel:{value:label}};
 const ctx={document:{getElementById:id=>nodes[id],querySelectorAll:()=>[{value:'dual'},{value:'new'},{value:'dual'}]},prompt:()=>'',routeProjectTechnicalAuthority:async(name,input)=>{ctx.call={name,input};return outcome;},removeById:id=>ctx.removed=id,showArcFeedback:(title,message)=>ctx.feedback={title,message},renderTechnicalAssignmentLibrary:()=>ctx.rendered=true};
 vm.runInNewContext(html.slice(start,end),ctx);return ctx;
}
(async()=>{
 await test('all reused reports already assigned, never new assignment',async()=>{const c=context({assignment:null,studentActivities:[{}],createdStudentActivities:[],reusedStudentActivities:[{}]});await c.assignTechnicalHubFromDialog('wt','v1');assert.equal(c.feedback.title,'Already assigned');assert(c.feedback.message.startsWith('0 newly assigned; 1 already assigned.'));assert(c.feedback.message.includes('not duplicated'));assert(c.rendered);});
 await test('mixed roster reports exact created/reused counts, not selected count',async()=>{const c=context({studentActivities:[{},{},{}],createdStudentActivities:[{}],reusedStudentActivities:[{},{}]});await c.assignTechnicalHubFromDialog('wt','v1');assert.equal(c.feedback.title,'Technical Assignment assigned');assert(c.feedback.message.startsWith('1 newly assigned; 2 already assigned.'));});
 await test('all new and legacy owner response remain accurate',()=>{for(const outcome of [{createdStudentActivities:[{},{}],reusedStudentActivities:[]},{studentActivities:[{},{}]}]){const c=context(outcome),f=c.technicalHubAssignmentFeedback(outcome);assert.equal(f.title,'Technical Assignment assigned');assert.equal(f.message,'2 newly assigned; 0 already assigned.');}});
 await test('explicit repeat label and generated occurrence key preserved; recipient IDs deduplicated',async()=>{const c=context({createdStudentActivities:[{},{}],reusedStudentActivities:[]},'Second try');await c.assignTechnicalHubFromDialog('wt','v1');assert.equal(c.call.name,'technical-assign');assert.equal(c.call.input.occurrenceLabel,'Second try');assert.equal(c.call.input.occurrenceKey,'v1|period-b|2026-11-13|Second try');assert.equal(JSON.stringify(c.call.input.studentIds),'["dual","new"]');});
 await test('default occurrence stays canonical and owner errors do not report success',async()=>{const c=context({studentActivities:[{}]});await c.assignTechnicalHubFromDialog('wt','v1');assert.equal(c.call.input.occurrenceKey,'v1|period-b|2026-11-13|default');const failing=context(null);failing.routeProjectTechnicalAuthority=async()=>{throw Object.assign(new Error('same occurrence'),{code:'DUPLICATE_ASSIGNMENT'});};await failing.assignTechnicalHubFromDialog('wt','v1');assert(!failing.feedback);assert(!failing.removed);assert.equal(failing.document.getElementById('technicalHubResult').textContent,'DUPLICATE_ASSIGNMENT: same occurrence');});
 console.log(count+'/'+count+' Technical assignment feedback checks passed');
})().catch(e=>{console.error(e);process.exitCode=1});
