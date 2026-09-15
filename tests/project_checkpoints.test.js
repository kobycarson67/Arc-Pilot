const assert=require('assert');
const C=require('../src/project_checkpoints');
let pass=0,total=0;function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
test('has eight universal checkpoints',()=>assert.equal(C.DEFINITIONS.length,8));
test('checkpoint order is stable',()=>assert.deepEqual(C.DEFINITIONS.map(x=>x.id),['plan','material_prep','layout_measurement','fit_up','tack_pre_weld','welding_joining','finish_cleanup','final_inspection']));
test('new project enables all checkpoints',()=>assert.equal(C.create().filter(x=>x.enabled).length,8));
test('project can disable non-applicable checkpoint',()=>{let x=C.create({disabled:{layout_measurement:true}});assert.equal(x.find(c=>c.id==='layout_measurement').enabled,false);});
test('new checkpoints start not started',()=>assert.ok(C.create().every(x=>x.status==='not_started')));
test('only defined statuses are valid',()=>{assert.equal(C.validStatus('ready_for_review'),true);assert.equal(C.validStatus('stalled'),false);});
test('normalization preserves evidence fields',()=>{let x=C.normalize([{id:'fit_up',status:'in_progress',photoIds:['p1'],note:'Check square',measurement:'24 in',competencyEvidence:['WT 2.1']}]).find(c=>c.id==='fit_up');assert.deepEqual(x.photoIds,['p1']);assert.equal(x.note,'Check square');assert.equal(x.measurement,'24 in');assert.deepEqual(x.competencyEvidence,['WT 2.1']);});
test('normalization does not mutate source',()=>{let src=[{id:'plan',status:'verified',photoIds:['p1']}],before=JSON.stringify(src);C.normalize(src);assert.equal(JSON.stringify(src),before);});
test('ready checkpoint creates review signal',()=>{let x=C.create();x[4].status='ready_for_review';let p=C.progress(x);assert.equal(p.readyForReview,true);assert.deepEqual(p.readyCheckpointIds,['tack_pre_weld']);});
test('disabled checkpoint does not block completion',()=>{let x=C.create({disabled:{finish_cleanup:true}});x.forEach(c=>{if(c.enabled)c.status='verified';});assert.equal(C.progress(x).complete,true);});
test('first unverified active checkpoint is current',()=>{let x=C.create();x[0].status='verified';x[1].status='verified';assert.equal(C.progress(x).currentCheckpointId,'layout_measurement');});
test('checkpoint model has no automatic grade field',()=>assert.ok(C.create().every(x=>!Object.prototype.hasOwnProperty.call(x,'grade')&&!Object.prototype.hasOwnProperty.call(x,'score'))));
if(!process.exitCode)console.log('\n'+pass+'/'+total+' Project Checkpoint tests passed.');
