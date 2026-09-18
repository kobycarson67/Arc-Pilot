const assert=require('assert');
const Updates=require('../src/app_update_controller');
let pass=0,total=0;
async function test(name,fn){total++;try{await fn();pass++;console.log('PASS',name);}catch(err){console.error('FAIL',name,err.message);process.exitCode=1;}}
function registration(update){
  const listeners={};
  return {waiting:null,installing:null,update:update||(()=>Promise.resolve()),addEventListener:(name,fn)=>{listeners[name]=fn;},fire:name=>listeners[name]&&listeners[name]()};
}
(async()=>{
  await test('check initiates the service worker update request',async()=>{let calls=0,reg=registration(()=>{calls++;return Promise.resolve();}),c=Updates.create({isOnline:()=>true});await c.check(reg);assert.equal(calls,1);assert.equal(c.state().code,'current');});
  await test('check visibly reports progress and current state',async()=>{let states=[],resolve,reg=registration(()=>new Promise(r=>resolve=r)),c=Updates.create({isOnline:()=>true,onChange:s=>states.push(s)}),pending=c.check(reg);assert(states.some(s=>s.message==='Checking for update…'));await Promise.resolve();resolve();await pending;assert.equal(c.state().message,'ARC is up to date.');});
  await test('waiting worker offers update',async()=>{let reg=registration();reg.waiting={postMessage(){}};let c=Updates.create({isOnline:()=>true});c.observe(reg);assert.equal(c.state().ready,true);assert.equal(c.state().code,'ready');});
  await test('apply sends controlled activation message',async()=>{let sent=null,reg=registration();reg.waiting={postMessage:m=>sent=m};let c=Updates.create({isOnline:()=>true});c.observe(reg);assert.equal(c.apply(reg),true);assert.deepEqual(sent,{type:'SKIP_WAITING'});});
  await test('no waiting worker cannot be applied',async()=>{let reg=registration(),c=Updates.create({isOnline:()=>true});assert.equal(c.apply(reg),false);assert.equal(c.state().ready,false);assert.equal(c.state().code,'not_ready');});
  await test('offline check is honest and does not request update',async()=>{let calls=0,reg=registration(()=>{calls++;return Promise.resolve();}),c=Updates.create({isOnline:()=>false});await c.check(reg);assert.equal(calls,0);assert.equal(c.state().code,'offline');});
  await test('failed check is reported honestly',async()=>{let reg=registration(()=>Promise.reject(new Error('network'))),c=Updates.create({isOnline:()=>true});await c.check(reg);assert.equal(c.state().code,'failed');assert.match(c.state().message,/Try Again/);});
  await test('failed recheck preserves an already waiting update',async()=>{let reg=registration(()=>Promise.reject(new Error('network')));reg.waiting={postMessage(){}};let c=Updates.create({isOnline:()=>true});await c.check(reg);assert.equal(c.state().code,'failed');assert.equal(c.state().ready,true);});
  await test('new worker installation becomes ready on a controlled page',async()=>{let worker={state:'installing',addEventListener:(name,fn)=>worker.fire=fn},reg=registration();reg.installing=worker;let c=Updates.create({isOnline:()=>true,hasController:()=>true});c.observe(reg);worker.state='installed';worker.fire();assert.equal(c.state().ready,true);});
  await test('first installation is not falsely offered as waiting',async()=>{let worker={state:'installing',addEventListener:(name,fn)=>worker.fire=fn},reg=registration();reg.installing=worker;let c=Updates.create({isOnline:()=>true,hasController:()=>false});c.observe(reg);worker.state='installed';worker.fire();assert.equal(c.state().ready,false);});
  if(!process.exitCode)console.log('\n'+pass+'/'+total+' App Update Controller tests passed.');
})();
