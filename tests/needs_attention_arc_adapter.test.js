const assert=require('assert');
const A=require('../src/needs_attention_arc_adapter');
const E=require('../src/needs_attention_engine');
let pass=0;function test(name,fn){try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
function state(){return {academicYear:'2026-27',semester:'Semester 1',activeSectionId:'sec1',sections:[{id:'sec1',course:'wt',period:2}],classes:{wt:[{id:'s1',name:'Alex',enrollments:[{year:'2026-27',semester:'Semester 1',sectionId:'sec1',period:2,course:'wt',active:true}],ratings:{'WT-S1':2},ratingScopes:{'WT-S1':{academicYear:'2026-27',semester:'Semester 1',sectionId:'sec1',course:'wt'}}}],awt:[]}};}
test('adapts only current active section enrollment',()=>{let x=A.adapt(state(),{sectionId:'sec1'});assert.equal(x.students.length,1);assert.equal(x.students[0].sectionId,'sec1');});
test('inactive enrollment is excluded',()=>{let s=state();s.classes.wt[0].enrollments[0].active=false;assert.equal(A.adapt(s,{sectionId:'sec1'}).students.length,0);});
test('wrong semester enrollment is excluded',()=>{let s=state();s.classes.wt[0].enrollments[0].semester='Semester 2';assert.equal(A.adapt(s,{sectionId:'sec1'}).students.length,0);});
test('current scoped rating is preserved',()=>{let x=A.adapt(state(),{sectionId:'sec1'});assert.equal(x.students[0].competencies[0].rating,2);});
test('legacy unscoped rating is not silently current-term evidence',()=>{let s=state();s.classes.wt[0].ratingScopes={};let x=A.adapt(s,{sectionId:'sec1'});assert.equal(x.students[0].competencies[0].rating,0);});
test('prior semester scope is not current-term evidence',()=>{let s=state();s.classes.wt[0].ratingScopes['WT-S1'].semester='Semester 2';let x=A.adapt(s,{sectionId:'sec1'});assert.equal(x.students[0].competencies[0].rating,0);});
test('opportunity defaults false',()=>{let x=A.adapt(state(),{sectionId:'sec1',essentialCodes:{'WT-S1':true}});assert.equal(x.students[0].competencies[0].opportunityConfirmed,false);assert.equal(E.generate(x).length,0);});
test('explicit opportunity can trigger essential risk',()=>{let x=A.adapt(state(),{today:'2026-09-15',sectionId:'sec1',essentialCodes:{'WT-S1':true},competencyOpportunities:{s1:{'WT-S1':true}}});let y=E.generate(x);assert.equal(y.length,1);assert.equal(y[0].ruleId,'essential_competency_risk');});
test('nonessential competency does not become risk',()=>{let x=A.adapt(state(),{sectionId:'sec1',competencyOpportunities:{s1:{'WT-S1':true}}});assert.equal(E.generate(x).length,0);});
test('reassessment signal maps without mutating rating',()=>{let s=state(),before=JSON.stringify(s);let x=A.adapt(s,{sectionId:'sec1',essentialCodes:{'WT-S1':true},competencyOpportunities:{s1:{'WT-S1':true}},readyForReassessment:{s1:{'WT-S1':true}}});assert.equal(E.generate(x)[0].ruleId,'ready_for_review');assert.equal(JSON.stringify(s),before);});
test('adapter does not mutate ARC state',()=>{let s=state(),before=JSON.stringify(s);A.adapt(s,{sectionId:'sec1'});assert.equal(JSON.stringify(s),before);});
if(!process.exitCode)console.log('\n'+pass+'/11 ARC adapter tests passed.');
