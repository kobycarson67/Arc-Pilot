const assert=require('assert');
const BatchA=require('../src/arc_batch_a_authority_activation');
const BatchB=require('../src/arc_batch_b_authority_activation');

let passed=0,total=0;
async function test(name,fn){total++;try{await fn();passed++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error);process.exitCode=1}}
function store(){let rows=new Map();return{rows,read:async id=>rows.get(id)||null,write:async row=>rows.set(row.id,JSON.parse(JSON.stringify(row)))};}

(async()=>{
  const pkg={packageId:BatchA.constants.packageId,state:'available'};
  const packageAuthority={getPackageProjection:async()=>pkg,assertOrdinaryReadGate:async()=>pkg};
  await test('construction and inspection are inert before either isolated gate',async()=>{
    let aStore=store(),bStore=store(),a=BatchA.create({databaseName:BatchA.constants.isolatedDatabaseName,recordStore:aStore,packageAuthority,academicGate:{verified:true},verifyAcademicGate:x=>x.verified,academicActivationId:'academic-accepted'}),b=BatchB.create({databaseName:BatchB.constants.isolatedDatabaseName,recordStore:bStore,packageAuthority,batchAGate:{},verifyBatchAGate:()=>false,batchAActivationId:'batch-a'});
    assert.equal(aStore.rows.size,0);assert.equal(bStore.rows.size,0);assert.equal((await a.inspect()).state,'not-configured');assert.equal((await b.inspect()).state,'not-configured');
  });
  await test('fictional local transition advances A then B through exact gates',async()=>{
    let aStore=store(),bStore=store(),a=BatchA.create({databaseName:BatchA.constants.isolatedDatabaseName,recordStore:aStore,packageAuthority,academicGate:{verified:true},verifyAcademicGate:x=>x.verified,academicActivationId:'academic-accepted',now:()=> '2026-10-18T12:00:00.000Z'}),aResult=await a.activateIsolated({isolatedVerification:true,activatedBy:'fictional-rehearsal'});
    assert(BatchA.isVerifiedGate(aResult.gate));
    let b=BatchB.create({databaseName:BatchB.constants.isolatedDatabaseName,recordStore:bStore,packageAuthority,batchAGate:aResult.gate,verifyBatchAGate:BatchA.isVerifiedGate,batchAActivationId:aResult.record.id,now:()=> '2026-10-18T12:01:00.000Z'}),bResult=await b.activateIsolated({isolatedVerification:true,activatedBy:'fictional-rehearsal'});
    assert(BatchB.isVerifiedGate(bResult.gate));
    assert.equal(aResult.record.domains.studentsEnrollments,'V8_AUTHORITATIVE');assert.equal(aResult.record.domains.competencyEvidenceOpenShop,'V8_AUTHORITATIVE');
    assert.equal(bResult.record.domains.workplaceSafetyBehavior,'V8_AUTHORITATIVE');assert.equal(bResult.record.domains.gradebook,'V8_AUTHORITATIVE');assert.equal(bResult.record.domains.studentHistory,'V8_DERIVED_READ_ONLY');
    assert.equal(aResult.record.domains.curriculumPacing,'V7_ONLY');assert.equal(aResult.record.domains.lessonPlans,'V7_ONLY');assert.equal(bResult.record.domains.curriculumPacing,'V7_ONLY');assert.equal(bResult.record.domains.lessonPlans,'V7_ONLY');
    assert.equal(aResult.record.realStudentDataAuthorized,false);assert.equal(bResult.record.realStudentDataAuthorized,false);assert.equal(aResult.record.dualWrite,false);assert.equal(bResult.record.dualWrite,false);
  });
  await test('rollback restores the exact pre-gate record bytes',async()=>{
    let aStore=store(),bStore=store(),before=JSON.stringify({a:[...aStore.rows],b:[...bStore.rows]}),a=BatchA.create({databaseName:BatchA.constants.isolatedDatabaseName,recordStore:aStore,packageAuthority,academicGate:{verified:true},verifyAcademicGate:x=>x.verified,academicActivationId:'academic-accepted'}),aResult=await a.activateIsolated({isolatedVerification:true}),b=BatchB.create({databaseName:BatchB.constants.isolatedDatabaseName,recordStore:bStore,packageAuthority,batchAGate:aResult.gate,verifyBatchAGate:BatchA.isVerifiedGate,batchAActivationId:aResult.record.id});await b.activateIsolated({isolatedVerification:true});
    aStore.rows.clear();bStore.rows.clear();assert.equal(JSON.stringify({a:[...aStore.rows],b:[...bStore.rows]}),before);
  });
  await test('production and out-of-order transitions fail closed before writes',async()=>{
    let production=store(),owner=BatchA.create({databaseName:BatchA.constants.productionDatabaseName,recordStore:production,packageAuthority,academicGate:{verified:true},verifyAcademicGate:x=>x.verified,academicActivationId:'academic-accepted'});await assert.rejects(owner.activateIsolated({isolatedVerification:true}),e=>e.code==='PRODUCTION_ACTIVATION_NOT_AUTHORIZED');assert.equal(production.rows.size,0);
    let bStore=store(),b=BatchB.create({databaseName:BatchB.constants.isolatedDatabaseName,recordStore:bStore,packageAuthority,batchAGate:{forged:true},verifyBatchAGate:BatchA.isVerifiedGate,batchAActivationId:'missing'});await assert.rejects(b.activateIsolated({isolatedVerification:true}),e=>e.code==='BATCH_A_AUTHORITY_REQUIRED');assert.equal(bStore.rows.size,0);
  });
  if(!process.exitCode)console.log(`\n${passed}/${total} integrated classroom v8 transition rehearsal tests passed.`);
})();
