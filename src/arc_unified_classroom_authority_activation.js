/* ARC Major Build 6 nonproduction P4-P10C unified authority gate. Loading is inert. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcUnifiedClassroomAuthorityActivation=api;}(this,function(){
  'use strict';
  var RECORD_ID='authority:classroom-ready-unified-p4-p10c';
  var DATABASE='arc_classroom_v8_unified_p4_p10c_verification';
  var PACKAGE_ID='ae06a3f8-cd1b-4a2a-943f-2f3d4e1f3f3b';
  var RECOVERY_VERSION=1;
  var STORAGE=Object.freeze({logicalSchemaVersion:8,indexedDbVersion:14,storeCount:74});
  var DOMAINS=Object.freeze({studentsEnrollments:'V8_UNIFIED_VERIFICATION',attendancePasses:'V8_UNIFIED_VERIFICATION',projectsActivitiesTechnical:'V8_UNIFIED_VERIFICATION',competencyEvidenceOpenShop:'V8_UNIFIED_VERIFICATION',workplaceSafetyBehavior:'V8_UNIFIED_VERIFICATION',gradebook:'V8_UNIFIED_VERIFICATION',studentHistory:'V8_DERIVED_READ_ONLY',curriculumPacing:'V8_UNIFIED_VERIFICATION',lessonPlans:'V8_UNIFIED_VERIFICATION'});
  var VERIFIED=new WeakSet();
  function fail(code,message,context){var e=new Error(message);e.code=code;e.context=context||{};throw e;}
  function copy(x){return x==null?x:JSON.parse(JSON.stringify(x));}
  function exact(value,expected){return Object.keys(expected).every(function(k){return value&&value[k]===expected[k];})&&Object.keys(value||{}).length===Object.keys(expected).length;}
  function checksumOf(backupResult){return backupResult&&backupResult.package&&backupResult.package.manifest&&backupResult.package.manifest.packageIntegrity&&backupResult.package.manifest.packageIntegrity.checksum||null;}
  function validate(row,options){
    options=options||{};
    if(!row||row.id!==RECORD_ID||row.recordType!=='ARC_UNIFIED_CLASSROOM_AUTHORITY')fail('UNIFIED_AUTHORITY_ABSENT','Unified classroom authority has not been activated.');
    if(row.databaseName!==DATABASE||row.physicalDatabaseName!==DATABASE)fail('UNIFIED_DATABASE_MISMATCH','Unified classroom authority is bound to its one task-owned database.',{databaseName:row.databaseName,physicalDatabaseName:row.physicalDatabaseName});
    if(row.packageId!==PACKAGE_ID)fail('UNIFIED_PACKAGE_MISMATCH','Unified classroom authority is bound to the accepted instructional package.');
    if(row.authorityState!=='V8_UNIFIED_VERIFICATION'||row.productionAuthority!=='V7_ONLY'||row.dualWrite!==false||row.realStudentDataAuthorized!==false||row.fictionalStudentDataAuthorized!==true)fail('UNIFIED_AUTHORITY_INVALID','Unified authority violates its nonproduction boundary.');
    if(!exact(row.domains,DOMAINS)||!exact(row.storageAuthority,STORAGE)||row.recoveryVersion!==RECOVERY_VERSION)fail('UNIFIED_AUTHORITY_INVALID','Unified authority has a stale domain, storage, or recovery contract.');
    if(row.batchAActivationId!==options.batchAActivationId||row.batchBActivationId!==options.batchBActivationId||!options.batchAGateVerified||!options.batchBGateVerified)fail('UNIFIED_LINEAGE_REQUIRED','Unified authority requires the exact verified Batch A and Batch B lineage.');
    if(!row.recoveryChecksum||!row.activationAttemptId)fail('UNIFIED_RECOVERY_BINDING_REQUIRED','Unified authority must remain bound to its exact pretransition recovery.');
    if(!options.packageProjection||options.packageProjection.packageId!==PACKAGE_ID||options.packageProjection.state!=='available')fail('PACKAGE_READ_GATE_CLOSED','The accepted instructional package must be available.');
    return row;
  }
  function create(options){
    options=options||{};
    var databaseName=String(options.databaseName||''),recordStore=options.recordStore,packageAuthority=options.packageAuthority,backup=options.backup;
    var verifyBatchAGate=options.verifyBatchAGate,batchAGate=options.batchAGate,verifyBatchBGate=options.verifyBatchBGate,batchBGate=options.batchBGate;
    var batchAActivationId=String(options.batchAActivationId||''),batchBActivationId=String(options.batchBActivationId||''),storageAuthority=options.storageAuthority||STORAGE;
    var now=options.now||function(){return new Date().toISOString();},prepared=null,writeAttempted=false;
    if(databaseName!==DATABASE)fail('UNIFIED_DATABASE_BLOCKED','Unified verification is hard-bound to its named task-owned database.',{databaseName:databaseName});
    if(!recordStore||typeof recordStore.read!=='function'||typeof recordStore.transaction!=='function'||!packageAuthority||!backup||typeof backup.exportBackup!=='function'||typeof backup.verifyPackage!=='function'||typeof backup.restoreBackup!=='function')fail('UNIFIED_DEPENDENCY_REQUIRED','Unified activation requires record, package, backup, and recovery owners.');
    if(!exact(storageAuthority,STORAGE))fail('UNIFIED_STORAGE_BOUNDARY','Unified verification requires Schema 8 / IDB 14 / 74 stores.',{storageAuthority:storageAuthority});
    function gates(){return{batchAGateVerified:typeof verifyBatchAGate==='function'&&verifyBatchAGate(batchAGate),batchBGateVerified:typeof verifyBatchBGate==='function'&&verifyBatchBGate(batchBGate)};}
    async function pkg(){return packageAuthority.getPackageProjection({packageId:PACKAGE_ID});}
    async function inspect(){var row=await recordStore.read(RECORD_ID),projection=await pkg(),verified=gates();if(!row)return{state:'not-configured',available:false,record:null,packageProjection:copy(projection)};validate(row,{batchAActivationId:batchAActivationId,batchBActivationId:batchBActivationId,batchAGateVerified:verified.batchAGateVerified,batchBGateVerified:verified.batchBGateVerified,packageProjection:projection});var gate={record:copy(row),packageProjection:copy(projection),databaseName:DATABASE};VERIFIED.add(gate);return{state:'unified-verification',available:true,record:copy(row),packageProjection:copy(projection),gate:gate};}
    async function prepare(input){
      input=input||{};if(prepared||writeAttempted)fail('UNIFIED_PREPARATION_ONE_SHOT','Unified preparation is one-shot.');
      if(input.nonproductionUnifiedVerification!==true)fail('PRODUCTION_ACTIVATION_NOT_AUTHORIZED','Only explicit nonproduction unified verification is authorized.');
      if(await recordStore.read(RECORD_ID))fail('UNIFIED_AUTHORITY_ALREADY_CONFIGURED','Unified authority already exists.');
      var projection=await packageAuthority.assertOrdinaryReadGate({packageId:PACKAGE_ID}),verified=gates();
      if(!verified.batchAGateVerified||!verified.batchBGateVerified)fail('UNIFIED_LINEAGE_REQUIRED','Verified Batch A and Batch B gates are required before preparation.');
      var recovery=await backup.exportBackup({purpose:'pre-unified-p4-p10c-transition',exportedAt:input.preparedAt||now()});
      if(!recovery||!recovery.verification||recovery.verification.verified!==true)fail('UNIFIED_RECOVERY_REQUIRED','A verified exact 74-store recovery package is required.');
      var checksum=checksumOf(recovery);if(!checksum)fail('UNIFIED_RECOVERY_REQUIRED','Recovery checksum is missing.');
      prepared={token:String(input.attemptId||('unified-'+checksum.slice(0,16))),checksum:checksum,recoveryText:recovery.text,packageProjection:copy(projection),preparedAt:input.preparedAt||now(),loaded:false};
      return{token:prepared.token,recoveryPackage:{text:recovery.text,checksum:checksum},databaseName:DATABASE,storageAuthority:copy(STORAGE),expiresOnWrite:true};
    }
    async function loadRecovery(token,text){
      if(!prepared||prepared.token!==token||writeAttempted)fail('UNIFIED_PREPARATION_INVALID','Unified recovery load requires the current unused preparation.');
      var verified=await backup.verifyPackage(text);var checksum=verified&&verified.checksum||verified&&verified.package&&verified.package.manifest&&verified.package.manifest.packageIntegrity&&verified.package.manifest.packageIntegrity.checksum;
      if(!verified||verified.verified!==true||checksum!==prepared.checksum||verified.package.manifest.databaseName!==DATABASE||verified.package.manifest.indexedDbVersion!==14||verified.package.manifest.storeInventory.length!==74)fail('UNIFIED_RECOVERY_MISMATCH','Loaded recovery is not the exact preparation-bound 74-store package.');
      prepared.loaded=true;prepared.recoveryText=text;return{verified:true,checksum:checksum,databaseName:DATABASE,storeCount:74};
    }
    async function activate(token,input){
      input=input||{};if(!prepared||prepared.token!==token||writeAttempted)fail('UNIFIED_PREPARATION_INVALID','Unified activation requires the current unused preparation.');
      if(!prepared.loaded)fail('UNIFIED_RECOVERY_CUSTODY_REQUIRED','The exact recovery package must be loaded and reverified after Prepare.');
      if(input.confirmation!=='ENABLE NONPRODUCTION UNIFIED P4-P10C')fail('UNIFIED_CONFIRMATION_REQUIRED','Exact nonproduction confirmation is required.');
      writeAttempted=true;var verified=gates(),projection=await packageAuthority.assertOrdinaryReadGate({packageId:PACKAGE_ID});
      var row={id:RECORD_ID,recordType:'ARC_UNIFIED_CLASSROOM_AUTHORITY',databaseName:DATABASE,physicalDatabaseName:DATABASE,packageId:PACKAGE_ID,batchAActivationId:batchAActivationId,batchBActivationId:batchBActivationId,authorityState:'V8_UNIFIED_VERIFICATION',productionAuthority:'V7_ONLY',domains:copy(DOMAINS),storageAuthority:copy(STORAGE),recoveryVersion:RECOVERY_VERSION,recoveryChecksum:prepared.checksum,activationAttemptId:prepared.token,dualWrite:false,realStudentDataAuthorized:false,fictionalStudentDataAuthorized:true,activatedAt:input.activatedAt||now(),activatedBy:String(input.activatedBy||'isolated-test'),revision:1};
      validate(row,{batchAActivationId:batchAActivationId,batchBActivationId:batchBActivationId,batchAGateVerified:verified.batchAGateVerified,batchBGateVerified:verified.batchBGateVerified,packageProjection:projection});
      try{
        await recordStore.transaction(async function(tx){if(await tx.read(RECORD_ID))fail('UNIFIED_AUTHORITY_ALREADY_CONFIGURED','Unified authority already exists.');await tx.write(row);if(input.failAfterWrite)fail('INJECTED_PARTIAL_TRANSITION','Injected transition failure.');});
        var result=await inspect();if(!result.available)fail('UNIFIED_POSTCONDITION_FAILED','Unified postcondition was not observed after commit.');prepared=null;return result;
      }catch(error){
        try{var restored=await backup.restoreBackup(prepared.recoveryText);if(!restored||!restored.parity||restored.parity.matched!==true)fail('UNIFIED_ROLLBACK_PARITY_FAILED','Exact pretransition recovery parity was not restored.');error.recovery={restored:true,parity:true,checksum:prepared.checksum};}
        catch(restoreError){error.recovery={restored:false,error:restoreError.code||restoreError.message};}
        prepared=null;throw error;
      }
    }
    async function rollback(input){input=input||{};var current=await recordStore.read(RECORD_ID);if(!current)fail('UNIFIED_AUTHORITY_ABSENT','No unified authority exists to roll back.');if(input.confirmation!=='ROLL BACK NONPRODUCTION UNIFIED P4-P10C')fail('UNIFIED_ROLLBACK_CONFIRMATION_REQUIRED','Exact rollback confirmation is required.');var verified=await backup.verifyPackage(input.recoveryPackage);if(!verified||verified.verified!==true||verified.checksum!==current.recoveryChecksum||verified.package.manifest.databaseName!==DATABASE)fail('UNIFIED_RECOVERY_MISMATCH','Rollback requires the exact activation-bound recovery package.');var result=await backup.restoreBackup(verified.package);if(!result||!result.parity||result.parity.matched!==true)fail('UNIFIED_ROLLBACK_PARITY_FAILED','Rollback did not restore exact pretransition parity.');if(await recordStore.read(RECORD_ID))fail('UNIFIED_ROLLBACK_POSTCONDITION_FAILED','Unified authority remained after rollback.');return{restored:true,parity:copy(result.parity),authorityState:'V7_ONLY',productionAuthority:'V7_ONLY'};}
    return{inspect:inspect,prepare:prepare,loadRecovery:loadRecovery,activate:activate,rollback:rollback};
  }
  function isVerifiedGate(value){return !!value&&VERIFIED.has(value)&&value.record&&value.record.authorityState==='V8_UNIFIED_VERIFICATION'&&value.databaseName===DATABASE;}
  return{create:create,isVerifiedGate:isVerifiedGate,constants:Object.freeze({recordId:RECORD_ID,databaseName:DATABASE,packageId:PACKAGE_ID,recoveryVersion:RECOVERY_VERSION,storageAuthority:STORAGE,domains:DOMAINS,confirmation:'ENABLE NONPRODUCTION UNIFIED P4-P10C',rollbackConfirmation:'ROLL BACK NONPRODUCTION UNIFIED P4-P10C'})};
}));
