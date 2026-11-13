/* Native Chromium IndexedDB transaction regression. Synthetic data, isolated
 * temporary browser profile; never navigates ARC production or a device.
 * Run: node tests/arc_technical_score_indexeddb.browser.js
 */
const assert=require('assert'),fs=require('fs'),path=require('path'),http=require('http'),Module=require('module');
const root=path.resolve(__dirname,'..');
let chromium;
try {chromium=require('playwright').chromium;} catch(e) {console.log('SKIP native IndexedDB regression: Playwright unavailable');process.exit(0);}
const executable=process.env.ARC_TEST_CHROMIUM||'/usr/bin/chromium';
if(!fs.existsSync(executable)){console.log('SKIP native IndexedDB regression: Chromium unavailable');process.exit(0);}
const file=path.join(__dirname,'arc_gradebook_authority_adapter.test.js'),m=new Module(file,module);m.filename=file;m.paths=Module._nodeModulePaths(__dirname);
m._compile(fs.readFileSync(file,'utf8').split('(async()=>{')[0]+'\nmodule.exports=fixture;',file);
const seed=Object.fromEntries(Object.entries(m.exports().storage._maps).map(([s,rows])=>[s,Array.from(rows.values())]));
const scripts=['arc_v8_storage','arc_effective_section_context','arc_academic_consumer_projection','arc_v8_activity','arc_v8_gradebook','arc_project_technical_authority_adapter','arc_gradebook_authority_adapter'];
const server=http.createServer((req,res)=>{if(req.url==='/'){res.setHeader('Content-Type','text/html');res.end('<!doctype html>'+scripts.map(s=>`<script src="/src/${s}.js"></script>`).join(''));return;}const match=/^\/src\/(arc_[a-z_]+)\.js$/.exec(req.url);if(!match||!scripts.includes(match[1])){res.writeHead(404);res.end();return;}res.setHeader('Content-Type','application/javascript');res.end(fs.readFileSync(path.join(root,'src',match[1]+'.js')));});
(async()=>{
 let browser;try{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,executablePath:executable,args:['--no-sandbox']});
 const page=await browser.newPage();await page.goto(`http://127.0.0.1:${server.address().port}/`);
 const report=await page.evaluate(async seed=>{
 const S=ArcV8Storage.STORES,passed=[];
 const check=(ok,message)=>{if(!ok)throw Error(message);};
 async function setup(){
  const controller=ArcV8Storage.create({databaseName:'arc_technical_score_native_test_'+crypto.randomUUID(),crypto,indexedDB}),db=await controller.open();db.generateId=controller.generateId;
  for(const [store,rows] of Object.entries(seed))for(const row of rows)await db.add(store,row);
  const now='2026-10-05T12:00:00Z',activity=ArcV8Activity.create({storage:db,actor:'teacher',now:()=>now}),grade=ArcV8Gradebook.create({storage:db,actor:'teacher',now:()=>now});
  const p6=ArcProjectTechnicalAuthorityAdapter.create({authorityState:'V8_ISOLATED_VERIFICATION',databaseName:ArcProjectTechnicalAuthorityAdapter.isolatedDatabaseName,storage:db,projection:ArcAcademicConsumerProjection,activity,project:{},assessment:grade});
  const p9=ArcGradebookAuthorityAdapter.create({authorityState:'V8_ISOLATED_VERIFICATION',databaseName:ArcGradebookAuthorityAdapter.isolatedDatabaseName,storage:db,projection:ArcAcademicConsumerProjection,gradebook:grade});
  const base={studentId:'s1',sectionId:'sec1',schoolDate:'2026-10-05'};
  const d=await p6.runV8('technical-definition-create',{title:'Synthetic native IDB score',courseIds:['wt'],pointsPossible:10,version:{versionNumber:1,publicationState:'Approved'}});
  let sa=(await p6.runV8('technical-assign',{...base,assignedDate:base.schoolDate,versionId:d.version.versionId})).studentActivities[0];
  sa=await p6.runV8('activity-transition',{...base,studentActivityId:sa.studentActivityId,expectedRevision:sa.revision,workflowState:'In Progress'});
  let attempt=await p6.runV8('attempt-start',{...base,studentActivityId:sa.studentActivityId});attempt=await p6.runV8('attempt-transition',{...base,attemptId:attempt.attemptId,expectedRevision:attempt.revision,workflowState:'Finalized'});
  const fin=await p6.runV8('technical-finalize-assessment',{...base,attemptId:attempt.attemptId,pointsEarned:8,pointsPossible:10,finalizedAt:now});
  const result=await p6.runV8('technical-gradebook-handoff',{...base,activityAssessmentFinalizationId:fin.activityAssessmentFinalizationId});
  sa=await p6.runV8('activity-transition',{...base,studentActivityId:sa.studentActivityId,expectedRevision:sa.revision,workflowState:'Completed'});
  const entry=(await p9.runV8('post-result',{...base,gradingPeriodId:'q1',assessmentResultId:result.assessmentResultId})).entry;
  const input={...base,studentActivityId:sa.studentActivityId,expectedRevision:sa.revision,attemptId:attempt.attemptId,expectedAttemptRevision:attempt.revision,expectedEntryRevision:entry.revision,pointsEarned:0,pointsPossible:10,gradingPeriodId:'q1',finalizedAt:'2026-10-05T13:00:00Z'};
  return {db,p6,p9,entry,result,input,save:()=>p6.saveTechnicalScore(input,p9)};
 }
 const snapshot=async db=>JSON.stringify(Object.fromEntries(await Promise.all(Object.values(S).map(async s=>[s,await db.query(s)]))));
 let f=await setup();await f.save();
 let rows=await f.db.query(S.assessmentResults,'by_student','s1');check(rows.length===2,'correction source count');const next=rows.find(r=>r.pointsEarned===0);check(next&&next.supersedesAssessmentResultId===f.result.assessmentResultId,'zero correction source lineage');
 check((await f.db.read(S.gradebookEntries,f.entry.gradebookEntryId)).revision===2,'ledger advanced');
 let rev=await f.db.query(S.gradebookRevisions,'by_entry',f.entry.gradebookEntryId);check(rev.length===2&&rev.find(r=>r.sequence===2).assessmentResultId===next.assessmentResultId,'ledger source lineage');
 passed.push('native single-transaction 8→0 correction commits source and ledger');f.db.close();
 f=await setup();const before=await snapshot(f.db),original=f.db.transaction;let injected=false;
 f.db.transaction=(stores,fn)=>original(stores,tx=>fn({...tx,add:async(s,row)=>{if(s===S.gradebookRevisions){injected=true;throw Object.assign(new Error('Late injected ledger write failure'),{code:'INJECTED_FAILURE'});}return tx.add(s,row);}}));
 let error;try{await f.save();}catch(e){error=e.code;}check(injected&&error==='INJECTED_FAILURE','late failure reached');check(await snapshot(f.db)===before,'native abort must restore ALL records');
 passed.push('late ledger failure aborts native transaction with exact full-store snapshot equality');f.db.close();
 f=await setup();const old=await f.db.read(S.enrollments,'e1'),a=await f.db.read(S.scheduleAssignments,'a1');
 await f.db.put(S.enrollments,{...old,enrollmentEnd:'2026-10-05',lifecycle:'closed'});await f.db.put(S.scheduleAssignments,{...a,effectiveTo:'2026-10-05',lifecycle:'ended'});
 await f.db.add(S.enrollments,{...old,enrollmentId:'e-new',enrollmentStart:'2026-10-05'});await f.db.add(S.scheduleAssignments,{...a,scheduleAssignmentId:'a0-new',enrollmentId:'e-new',effectiveFrom:'2026-10-05'});
 const historicalBefore=await snapshot(f.db);let writes=0;const transaction=f.db.transaction;
 f.db.transaction=(stores,fn)=>transaction(stores,tx=>fn({...tx,add:async(...args)=>{writes++;return tx.add(...args);},put:async(...args)=>{writes++;return tx.put(...args);}}));
 error=null;try{await f.save();}catch(e){error=e.code;}check(error==='ACADEMIC_SCOPE_MISMATCH','historical scope rejection');check(writes===0&&await snapshot(f.db)===historicalBefore,'historical rejection must not write');
 passed.push('native historical enrollment mismatch rejects before first write');f.db.close();return passed;
 },seed);
 assert.equal(report.length,3);report.forEach(x=>console.log('PASS',x));console.log('3/3 native IndexedDB regression cases passed');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
