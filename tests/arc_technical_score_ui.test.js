/* Execute the actual normal-shell routing function with a synthetic UI boundary.
 * Not a visual or tablet acceptance test. */
const assert=require('assert'),fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(require('path').join(__dirname,'../index.html'),'utf8');
const source=html.slice(html.indexOf('async function p6RouteAuthoritative(name, args)'),html.indexOf('\napplyProjectCheckpointAction = function()',html.indexOf('async function p6RouteAuthoritative(name, args)')));
function fixture({fail=false,reloadFail=false,scope='e1',hold=false}={}){
 const item={templateId:'v1',status:'completed',pointsPossible:10,_authority:{studentActivity:{studentActivityId:'sa1',studentId:'s1',enrollmentId:'e1',revision:3},attempt:{attemptId:'a1',revision:2}}};
 const student={id:'s1',name:'Synthetic',tech:[item]},events=[],saves=[],alerts=[];let release;
 const ctx={Date,Set,Error,Number,String,Promise,current:student,technicalSavesInFlight:new Set(),activeSection:()=>({id:'sec1'}),dateKey:()=> '2026-10-05',allStudents:()=>[student],
 document:{getElementById:id=>({value:id.includes('Earned')?'0':id.includes('Possible')?'10':'completed'})},
 academicAuthorityRuntime:{storage:{}},ArcAcademicConsumerProjection:{fromV8:async()=>({scopeForStudent:()=>({enrollmentId:scope})})},batchBAuthorityRuntime:{gradingPeriodId:'q1'},gradebookAuthorityAdapter:{},
 projectTechnicalAuthorityAdapter:{saveTechnicalScore:async input=>{saves.push(input);if(hold)await new Promise(r=>release=r);if(fail)throw Object.assign(new Error('Concurrent correction rejected'),{code:'WRITE_CONFLICT'});return {result:{pointsEarned:0}};}},
 refreshBatchAProjection:async()=>{events.push('reloadA');if(reloadFail)throw Error('disk unavailable');},refreshBatchBProjection:async()=>events.push('reloadB'),batchBAuthorityActive:()=>true,
 batchAAuthorityRuntime:{projectionCache:{get:()=>({overlayStudent:s=>({...s,tech:s.tech.map(t=>({...t,_authority:{...t._authority,studentActivity:{...t._authority.studentActivity,revision:5}}}))})})}},
 openStudentTechnical:i=>events.push('profile:'+i+':'+ctx.current.tech[i]._authority.studentActivity.revision),renderTechnicalScoring:()=>events.push('class'),alert:x=>{events.push('alert');alerts.push(x);}};
 vm.createContext(ctx);vm.runInContext(source,ctx);return{ctx,events,saves,alerts,run:name=>ctx.p6RouteAuthoritative(name,name==='saveStudentTechnical'?[0]:['s1','v1']),release:()=>release()};
}
(async()=>{
 let count=0;
 for(const name of ['saveStudentTechnical','saveClassTechScore','saveClassTechStatus'])for(const fail of [false,true]){
  const f=fixture({fail});await f.run(name);assert.equal(f.saves.length,1);assert.equal(f.saves[0].pointsEarned,'0');assert.deepEqual(f.events.slice(0,2),['reloadA','reloadB']);assert(f.events[2].startsWith(name==='saveStudentTechnical'?'profile:0:5':'class'));assert.equal(f.alerts.length,Number(fail));if(fail)assert(f.alerts[0].includes('WRITE_CONFLICT')&&f.alerts[0].includes('reloaded'));count++;
 }
 for(const name of ['saveStudentTechnical','saveClassTechScore']){
  const f=fixture({scope:'e2'});await f.run(name);assert.equal(f.saves.length,0);assert(f.alerts[0].includes('ACADEMIC_SCOPE_MISMATCH'));assert.equal(f.events[0],'reloadA');count++;
 }
 for(const fail of [false,true]){const f=fixture({fail,reloadFail:true});await f.run('saveStudentTechnical');assert(f.alerts[0].includes('reload ARC before trying again'));assert(!f.events.some(x=>x.startsWith('profile')));assert.equal(f.ctx.technicalSavesInFlight.size,0);count++;}
 const f=fixture({hold:true});const first=f.run('saveStudentTechnical');await new Promise(r=>setImmediate(r));await f.run('saveStudentTechnical');assert.equal(f.saves.length,1);f.release();await first;assert.equal(f.ctx.technicalSavesInFlight.size,0);count++;
 const nav=fixture({hold:true});const pending=nav.run('saveStudentTechnical');await new Promise(r=>setImmediate(r));nav.ctx.current={id:'s2'};nav.release();await pending;assert(!nav.events.some(x=>x.startsWith('profile')));count++;
 console.log(`${count}/${count} Technical UI routing/error/reload cases passed`);
})().catch(e=>{console.error(e);process.exitCode=1;});
