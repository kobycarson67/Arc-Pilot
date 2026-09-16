const assert=require('assert');
const P=require('../src/project_checkpoint_presenter');
const K=require('../src/project_checkpoint_controller');
let pass=0,total=0;function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
test('legacy project offers explicit checkpoint initialization',()=>{let x=P.present({name:'Old Table'});assert.equal(x.legacy,true);assert.equal(x.primaryActions[0].id,'initialize');});
test('new project summary starts zero of eight',()=>{let x=P.present(K.initialize({name:'Table'}));assert.equal(x.summary,'0/8 verified');assert.equal(x.currentText,'Current: Plan & Understand');});
test('not started current checkpoint offers Start only',()=>{let x=P.present(K.initialize({name:'Table'}));assert.deepEqual(x.primaryActions.map(a=>a.id),['start']);});
test('in progress current checkpoint offers Ready for Review',()=>{let p=K.start({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00'}),x=P.present(p);assert.deepEqual(x.primaryActions.map(a=>a.id),['ready']);});
test('ready checkpoint offers Verify and Needs More Work',()=>{let p=K.ready({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00'}),x=P.present(p);assert.equal(x.readyText,'1 waiting for review');assert.deepEqual(x.primaryActions.map(a=>a.id),['verify','reopen']);});
test('verify advances tablet current checkpoint',()=>{let p=K.verify({name:'Table'},'plan',{timestamp:'2026-09-15T14:00:00',verifiedBy:'instructor'}),x=P.present(p);assert.equal(x.progressText,'1/8 verified');assert.equal(x.currentText,'Current: Material Preparation');});
test('disabled checkpoints are hidden from shop rows',()=>{let p=K.initialize({name:'Table'},{disabled:{finish_cleanup:true}}),x=P.present(p);assert.equal(x.rows.length,7);assert.equal(x.progressText,'0/7 verified');});
test('row exposes note measurement and photo count without grade',()=>{let p=K.start({name:'Table'},'layout_measurement',{timestamp:'2026-09-15T14:00:00',note:'Check diagonal',measurement:'24 in'});p.checkpoints.find(c=>c.id==='layout_measurement').photoIds=['p1','p2'];let r=P.present(p).rows.find(x=>x.id==='layout_measurement');assert.equal(r.note,'Check diagonal');assert.equal(r.measurement,'24 in');assert.equal(r.photoCount,2);assert.equal(Object.prototype.hasOwnProperty.call(r,'grade'),false);});
test('presenter apply delegates start action',()=>{let p=P.apply({name:'Table'},'start','plan',{timestamp:'2026-09-15T14:00:00'});assert.equal(P.present(p).rows[0].status,'in_progress');});
test('unknown action leaves project unchanged',()=>{let p=K.initialize({name:'Table'});assert.strictEqual(P.apply(p,'mystery','plan',{}),p);});
if(!process.exitCode)console.log('\n'+pass+'/'+total+' Project Checkpoint Presenter tests passed.');
