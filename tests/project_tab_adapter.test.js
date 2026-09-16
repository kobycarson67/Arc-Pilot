const assert=require('assert');
const A=require('../src/project_tab_adapter');
const K=require('../src/project_checkpoint_controller');
let pass=0,total=0;function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
function state(){return {academicYear:'2026-27',semester:'Semester 1',activeSectionId:'sec1'};}
function student(){return {id:'s1',name:'Alex',enrollments:[{year:'2026-27',semester:'Semester 1',sectionId:'sec1',active:true}],projects:[K.initialize({templateId:'p1',name:'Welding Table',status:'in_progress'})]};}
test('cards expose compact presenter state',()=>{let c=A.cards(student())[0];assert.equal(c.id,'p1');assert.equal(c.progressText,'0/8 verified');assert.equal(c.currentText,'Current: Plan & Understand');});
test('legacy project card remains explicit',()=>{let s=student();s.projects=[{templateId:'old',name:'Old Project'}];let c=A.cards(s)[0];assert.equal(c.legacy,true);assert.equal(c.primaryActions[0].id,'initialize');});
test('context carries current academic scope',()=>{let x=A.context(state(),student(),{timestamp:'2026-09-16T14:00:00',verifiedBy:'teacher'});assert.equal(x.academicYear,'2026-27');assert.equal(x.semester,'Semester 1');assert.equal(x.sectionId,'sec1');assert.equal(x.verifiedBy,'teacher');});
test('start action returns copied student and leaves source untouched',()=>{let s=student(),before=JSON.stringify(s),r=A.apply(state(),s,'p1','start','plan',{timestamp:'2026-09-16T14:00:00'});assert.equal(r.changed,true);assert.equal(r.project.checkpoints[0].status,'in_progress');assert.equal(JSON.stringify(s),before);assert.notStrictEqual(r.student,s);});
test('ready action records scoped review activity',()=>{let s=student(),r=A.apply(state(),s,'p1','ready','plan',{timestamp:'2026-09-16T14:00:00'}),a=r.project.checkpointActivity[0];assert.equal(a.type,'review');assert.equal(a.academicYear,'2026-27');assert.equal(a.semester,'Semester 1');assert.equal(a.sectionId,'sec1');});
test('verify action advances card current checkpoint',()=>{let s=student(),r=A.apply(state(),s,'p1','verify','plan',{timestamp:'2026-09-16T14:00:00',verifiedBy:'teacher'}),c=A.cards(r.student)[0];assert.equal(c.progressText,'1/8 verified');assert.equal(c.currentText,'Current: Material Preparation');});
test('unknown project is a no-op',()=>{let s=student(),r=A.apply(state(),s,'missing','start','plan',{});assert.equal(r.changed,false);assert.strictEqual(r.student,s);});
test('unknown action is a no-op',()=>{let s=student(),r=A.apply(state(),s,'p1','mystery','plan',{});assert.equal(r.changed,false);assert.strictEqual(r.student,s);});
test('fallback project id is stable by index',()=>{let s=student();s.projects=[{name:'One'},{name:'Two'}];assert.deepEqual(A.cards(s).map(x=>x.id),['project-0','project-1']);});
test('adapter does not introduce grade fields',()=>{let c=A.cards(student())[0];assert.equal(Object.prototype.hasOwnProperty.call(c,'grade'),false);assert.equal(Object.prototype.hasOwnProperty.call(c.checkpointRows[0],'grade'),false);});
if(!process.exitCode)console.log('\n'+pass+'/'+total+' Project Tab Adapter tests passed.');
