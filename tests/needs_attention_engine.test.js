const assert=require('assert');
const E=require('../src/needs_attention_engine');
let pass=0;function test(name,fn){try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
const base={today:'2026-09-15',students:[]};
function run(student){return E.generate({today:base.today,students:[Object.assign({studentId:'s1',studentName:'Alex',sectionId:'sec1',active:true},student)]});}
test('no opportunity means no essential flag',()=>assert.equal(run({competencies:[{id:'c1',name:'PPE',essential:true,rating:0,opportunityConfirmed:false}]}).length,0));
test('essential no evidence after opportunity is P1',()=>{let x=run({competencies:[{id:'c1',name:'PPE',essential:true,rating:0,opportunityConfirmed:true}]})[0];assert.equal(x.ruleId,'essential_competency_risk');assert.equal(x.priority,'P1');});
test('essential developing after opportunity is P1',()=>assert.equal(run({competencies:[{id:'c1',name:'Measurement',essential:true,rating:2,opportunityConfirmed:true}]})[0].priority,'P1'));
test('proficient essential does not flag',()=>assert.equal(run({competencies:[{id:'c1',name:'Measurement',essential:true,rating:3,opportunityConfirmed:true}]}).length,0));
test('ready reassessment is P1 review',()=>assert.equal(run({competencies:[{id:'c1',name:'Cutting',essential:true,rating:2,opportunityConfirmed:true,readyForReassessment:true}]})[0].ruleId,'ready_for_review'));
test('ready project is P1 review',()=>assert.equal(run({projects:[{id:'p1',name:'Cube',readyForReview:true}]} )[0].priority,'P1'));
test('stalled project requires confirmed opportunity',()=>assert.equal(run({projects:[{id:'p1',name:'Cube',active:true,lastEvidenceDate:'2026-09-01',eligibleOpportunities:5,opportunityConfirmed:false}]}).length,0));
test('stalled project flags after reliable gap',()=>assert.equal(run({projects:[{id:'p1',name:'Cube',active:true,lastEvidenceDate:'2026-09-01',eligibleOpportunities:5,opportunityConfirmed:true}]} )[0].ruleId,'project_stalled'));
test('one significant workplace event is not repeated pattern',()=>assert.equal(run({workplace:[{date:'2026-09-14',points:2}]}).length,0));
test('two significant workplace events create P2',()=>{let x=run({workplace:[{date:'2026-09-10',points:2},{date:'2026-09-14',points:2}]})[0];assert.equal(x.ruleId,'repeated_workplace_concern');assert.equal(x.priority,'P2');});
test('serious workplace event creates P1',()=>assert.equal(run({workplace:[{date:'2026-09-14',points:3}]})[0].priority,'P1'));
test('old workplace event ignored',()=>assert.equal(run({workplace:[{date:'2026-08-01',points:3}]}).length,0));
test('technical missing requires confirmed opportunity',()=>assert.equal(run({technical:[{id:'t1',name:'Safety Quiz',due:true,status:'missing',opportunityConfirmed:false}]}).length,0));
test('technical due after opportunity creates P2',()=>assert.equal(run({technical:[{id:'t1',name:'Safety Quiz',due:true,status:'missing',opportunityConfirmed:true}]} )[0].ruleId,'technical_evidence_missing'));
test('excused technical does not flag',()=>assert.equal(run({technical:[{id:'t1',name:'Safety Quiz',due:true,status:'excused',opportunityConfirmed:true}]}).length,0));
test('inactive student ignored',()=>assert.equal(run({active:false,workplace:[{date:'2026-09-14',points:3}]}).length,0));
test('P1 sorts before P2',()=>{let x=run({workplace:[{date:'2026-09-10',points:2},{date:'2026-09-14',points:2}],technical:[{id:'t1',name:'Quiz',due:true,status:'missing',opportunityConfirmed:true}],competencies:[{id:'c1',name:'PPE',essential:true,rating:1,opportunityConfirmed:true}]});assert.equal(x[0].priority,'P1');});
if(!process.exitCode)console.log('\n'+pass+'/17 Needs Attention behavioral tests passed.');
