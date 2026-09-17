const assert=require('assert');
const D=require('../src/deployment_readiness');
let tests=[];function test(name,fn){tests.push([name,fn]);}
test('state integrity is deterministic',()=>assert.deepEqual(D.stateIntegrity({a:1}),D.stateIntegrity({a:1})));
test('state integrity changes with data',()=>assert.notEqual(D.stateIntegrity({a:1}).value,D.stateIntegrity({a:2}).value));
test('valid backup integrity verifies',()=>{let s={students:[1,2]},i=D.stateIntegrity(s);assert.equal(D.verifyStateIntegrity(s,i).verified,true);});
test('changed backup data is rejected',()=>{let i=D.stateIntegrity({a:1});assert.throws(()=>D.verifyStateIntegrity({a:2},i),/integrity check failed/);});
test('legacy backup without integrity remains importable',()=>assert.equal(D.verifyStateIntegrity({},null).legacy,true));
test('pilot requires https storage shell and backup',()=>{let r=D.readiness({hosted:true,storageAvailable:true,serviceWorker:true,backupExported:true});assert.equal(r.pilotReady,true);assert.equal(r.productionReady,false);});
test('missing required condition blocks pilot',()=>{let r=D.readiness({hosted:true,storageAvailable:true,serviceWorker:false,backupExported:true});assert.equal(r.pilotReady,false);assert.equal(r.blockers[0].id,'shell');});
test('production requires persistent storage and cloud recovery',()=>{let r=D.readiness({hosted:true,storageAvailable:true,serviceWorker:true,backupExported:true,persistentStorage:true,cloudConnected:true});assert.equal(r.productionReady,true);});
let failed=0;for(const [name,fn] of tests){try{fn();console.log('PASS',name);}catch(e){failed++;console.error('FAIL',name,e);}}if(failed)process.exit(1);console.log(`PASS ${tests.length} deployment readiness tests`);
