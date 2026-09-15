const assert=require('assert');
const K=require('../src/project_checkpoint_controller');
const C=require('../src/project_checkpoints');
let pass=0,total=0;function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
test('initialize gives project universal checkpoints',()=>assert.equal(K.initialize({name:'Table'}).checkpoints.length,8));
test('current returns first active checkpoint',()=>assert.equal(K.current(K.initialize({name:'Table'})).id,'plan'));
test('start marks checkpoint in progress',()=>{let p=K.start({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00'});assert.equal(K.current(p).status,'in_progress');});
test('ready creates ready review state',()=>{let p=K.ready({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00'});assert.equal(K.quickState(p).readyCount,1);assert.equal(C.readyForReview(p),true);});
test('verify advances current checkpoint',()=>{let p=K.verify({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00',verifiedBy:'instructor'});assert.equal(K.current(p).id,'material_prep');assert.equal(K.quickState(p).verifiedCount,1);});
test('reopen verified checkpoint clears verification',()=>{let p=K.verify({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00',verifiedBy:'instructor'});p=K.reopen(p,'plan',{timestamp:'2026-09-16T14:00:00'});let c=p.checkpoints.find(x=>x.id==='plan');assert.equal(c.status,'in_progress');assert.equal(c.verifiedBy,'');});
test('opportunity requires explicit confirmation',()=>{let p=K.recordOpportunity({name:'Table'},'plan',{date:'2026-09-15',attendanceStatus:'present'});assert.equal(C.activitySummary(p).eligibleOpportunities,0);p=K.recordOpportunity(p,'plan',{date:'2026-09-16',attendanceStatus:'present',opportunityConfirmed:true});assert.equal(C.activitySummary(p).eligibleOpportunities,1);});
test('quick state summarizes progress without grade',()=>{let p=K.verify({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00',verifiedBy:'instructor'}),s=K.quickState(p);assert.equal(s.activeCount,8);assert.equal(s.verifiedCount,1);assert.equal(Object.prototype.hasOwnProperty.call(s,'grade'),false);});
test('legacy quick state does not invent checkpoints',()=>{let s=K.quickState({name:'Old',status:'ready'});assert.equal(s.legacy,true);assert.equal(s.current,null);});
test('controller actions do not mutate source',()=>{let p=K.initialize({name:'Table'}),before=JSON.stringify(p);K.start(p,'plan',{timestamp:'2026-09-15T14:00:00'});assert.equal(JSON.stringify(p),before);});
if(!process.exitCode)console.log('\n'+pass+'/'+total+' Project Checkpoint Controller tests passed.');
