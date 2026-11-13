const assert=require('node:assert/strict'),fs=require('node:fs'),V=require('./engineering/arc_v8_sweep_verification'),S=require('../src/arc_v8_storage');
(async()=>{assert.throws(()=>V.create({databaseName:'arc_classroom_v8'}),e=>e.code==='ISOLATION_REQUIRED');let opened=0;let c=V.create({storageFactory:()=>({constants:{databaseName:'arc_classroom_v8'},open:async()=>{opened++}})});await assert.rejects(c.inspect(),e=>e.code==='ISOLATION_REQUIRED');assert.equal(opened,0);
function mock(rows){const db={read:async(s,id)=>(rows[s]||[]).find(x=>x.id===id),query:async s=>rows[s]||[],add(){throw Error('unexpected write')},put(){throw Error('unexpected write')},delete(){throw Error('unexpected write')},transaction(){throw Error('unexpected write')},close(){}};return ()=>({constants:{databaseName:V.DATABASE_NAME},open:async()=>db,generateId(){throw Error('unexpected id')}})}
c=V.create({storageFactory:mock({[S.STORES.students]:[{studentId:'unknown'}]})});await assert.rejects(c.run(),e=>e.code==='UNKNOWN_DATA');
c=V.create({storageFactory:mock({[S.STORES.infrastructure]:[{id:V.MARKER,synthetic:true,databaseName:V.DATABASE_NAME,version:3,state:'complete'}]})});await assert.rejects(c.run(),e=>e.code==='NONEMPTY_FIXTURE');
c=V.create({storageFactory:mock({[S.STORES.infrastructure]:[{id:V.MARKER,synthetic:true,databaseName:V.DATABASE_NAME,version:3,state:'failed'}]})});await assert.rejects(c.run(),e=>e.code==='NONEMPTY_FIXTURE');
c=V.create({storageFactory:mock({})});assert.equal((await c.inspect()).status,'empty');
let html=fs.readFileSync('tests/engineering/arc_v8_sweep_verification.html','utf8'),page=fs.readFileSync('tests/engineering/arc_v8_sweep_verification_page.js','utf8');assert(html.includes('NOT LIVE CLASSROOM'));assert(!html.includes('index.html'));assert(!page.includes('register('));assert(page.includes('navigator.serviceWorker.controller'));assert(page.includes("['127.0.0.1','localhost']"));console.log('PASS isolation: wrong database rejected before open; unknown data rejected; recognized nonempty refused; empty inspection; local-origin and no-worker boundary. Native lifecycle pending browser execution.');})().catch(e=>{console.error(e);process.exitCode=1});



