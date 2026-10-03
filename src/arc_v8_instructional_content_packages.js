/* ARC Schema 8 instructional-content package execution authority.
   Append-first package state only; requiring this module never opens storage. */
(function(root,factory){
  var api=factory(root.ArcV8Storage||(typeof require==='function'?require('./arc_v8_storage'):null));
  if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcV8InstructionalContentPackages=api;
}(this,function(Storage){
  'use strict';
  var S=Storage.STORES;
  var TYPES=Object.freeze(['PACKAGE_DECLARED','ATTEMPT_STARTED','PHASE_VERIFIED','ATTEMPT_FAILED','PACKAGE_VERIFIED_COMPLETE','PACKAGE_AVAILABLE','PACKAGE_SUPERSEDED']);
  function fail(code,message,context){throw new Storage.StorageError(code,message,context||{});}
  function copy(value){return value==null?value:JSON.parse(JSON.stringify(value));}
  function required(value,name){if(value===undefined||value===null||String(value).trim()==='')fail('REQUIRED_FIELD',name+' is required.',{field:name});return value;}
  function create(options){
    options=options||{};var db=options.storage,actor=options.actor||'system',now=options.now||function(){return new Date().toISOString();};
    if(!db)throw Error('Instructional content package authority requires storage.');
    function ordered(rows){return rows.slice().sort(function(a,b){return Number(a.sequence)-Number(b.sequence)||String(a.instructionalContentPackageRecordId).localeCompare(String(b.instructionalContentPackageRecordId));});}
    async function history(packageId,reader){required(packageId,'packageId');return ordered(await (reader||db).query(S.instructionalContentPackages,'by_package',packageId));}
    function project(rows){
      rows=ordered(rows);if(!rows.length)return null;var declared=null,currentAttempt=null,attempts={},verifiedComplete=false,available=false,superseded=false,phaseEvidence=[];
      rows.forEach(function(row){
        if(row.recordType==='PACKAGE_DECLARED')declared=row;
        if(row.recordType==='ATTEMPT_STARTED'){currentAttempt=row.attemptId;attempts[row.attemptId]={attemptId:row.attemptId,status:'assembling',startedRecordId:row.instructionalContentPackageRecordId,phaseRecordIds:[]};}
        if(row.recordType==='PHASE_VERIFIED'&&attempts[row.attemptId]){attempts[row.attemptId].phaseRecordIds.push(row.instructionalContentPackageRecordId);phaseEvidence.push(copy(row.payload));}
        if(row.recordType==='ATTEMPT_FAILED'&&attempts[row.attemptId])attempts[row.attemptId].status='failed';
        if(row.recordType==='PACKAGE_VERIFIED_COMPLETE'){verifiedComplete=true;if(attempts[row.attemptId])attempts[row.attemptId].status='verified_complete';}
        if(row.recordType==='PACKAGE_AVAILABLE')available=true;
        if(row.recordType==='PACKAGE_SUPERSEDED'){superseded=true;available=false;}
      });
      var state=superseded?'superseded':available?'available':verifiedComplete?'verified_complete':currentAttempt&&attempts[currentAttempt]&&attempts[currentAttempt].status==='assembling'?'assembling':declared?'declared':'invalid';
      return{packageId:rows[0].packageId,state:state,declared:copy(declared&&declared.payload),currentAttemptId:currentAttempt,attempts:copy(attempts),verifiedComplete:verifiedComplete,available:available,superseded:superseded,lastSequence:Number(rows[rows.length-1].sequence),phaseEvidence:phaseEvidence,historyRecordIds:rows.map(function(x){return x.instructionalContentPackageRecordId;})};
    }
    async function getProjection(input){input=input||{};return project(await history(required(input.packageId,'packageId')));}
    async function append(packageId,recordType,input,validate){
      if(TYPES.indexOf(recordType)<0)fail('INVALID_RECORD_TYPE','Unknown package event type.');
      return db.transaction(S.instructionalContentPackages,async function(tx){var rows=await history(packageId,tx),projection=project(rows);if(validate)await validate(projection,rows,tx);var expected=input&&input.expectedSequence;if(expected!==undefined&&Number(expected)!==(projection?projection.lastSequence:0))fail('WRITE_CONFLICT','Package sequence changed after it was read.',{expectedSequence:expected,actualSequence:projection?projection.lastSequence:0});var row={instructionalContentPackageRecordId:input&&input.instructionalContentPackageRecordId||db.generateId(),packageId:packageId,sequence:(projection?projection.lastSequence:0)+1,recordType:recordType,attemptId:input&&input.attemptId||null,recordedAt:input&&input.recordedAt||now(),recordedBy:input&&input.recordedBy||actor,reason:input&&input.reason||null,payload:copy(input&&input.payload||{})};await tx.add(S.instructionalContentPackages,row);return copy(row);});
    }
    async function declarePackage(input){
      input=input||{};var packageId=required(input.packageId,'packageId'),declaration=copy(input.declaration||{});
      ['contractVersion','resolvedPayloadChecksum','frozenIdentityMapChecksum','evidenceChecksum','evidenceReference'].forEach(function(k){required(declaration[k],k);});
      if(Number(declaration.expectedRoleCount)!==859||Number(declaration.expectedRetainedLinkCount)!==359||Number(declaration.expectedIntentionalAbsenceCount)!==259)fail('PACKAGE_CONTRACT_MISMATCH','Package counts must match the frozen R2 contract.');
      if(!Array.isArray(declaration.canonicalCourseContexts)||declaration.canonicalCourseContexts.slice().sort().join('|')!==['arc-course-awt','arc-course-wt'].sort().join('|'))fail('PACKAGE_CONTRACT_MISMATCH','Canonical WT/AWT Course contexts are required.');
      if(!Array.isArray(declaration.sourceAuthorities)||!declaration.sourceAuthorities.length)fail('PACKAGE_CONTRACT_MISMATCH','Source authorities are required.');
      return append(packageId,'PACKAGE_DECLARED',{expectedSequence:0,reason:input.reason||'Package contract declared.',payload:declaration},function(projection){if(projection)fail('PACKAGE_ALREADY_DECLARED','Package identity already has history.');});
    }
    async function startAttempt(input){input=input||{};var attemptId=required(input.attemptId,'attemptId');return append(required(input.packageId,'packageId'),'ATTEMPT_STARTED',{attemptId:attemptId,expectedSequence:input.expectedSequence,reason:input.reason||'Package attempt started.',payload:copy(input.payload||{})},function(p){if(!p)fail('PACKAGE_NOT_DECLARED','Package must be declared first.');if(p.superseded||p.available||p.verifiedComplete)fail('INVALID_PACKAGE_TRANSITION','Completed or superseded package cannot start another attempt.');if(p.currentAttemptId&&p.attempts[p.currentAttemptId].status==='assembling')fail('ATTEMPT_ALREADY_ACTIVE','An unfinished package attempt is already active.');if(p.attempts[attemptId])fail('ATTEMPT_ID_REUSED','Attempt identity cannot be reused.');});}
    async function appendPhaseVerification(input){input=input||{};required(input.phase,'phase');return append(required(input.packageId,'packageId'),'PHASE_VERIFIED',{attemptId:required(input.attemptId,'attemptId'),expectedSequence:input.expectedSequence,reason:input.reason||'Phase readback verified.',payload:{phase:String(input.phase),memberCount:Number(input.memberCount),checksum:required(input.checksum,'checksum'),readbackVerified:input.readbackVerified===true,details:copy(input.details||{})}},function(p){if(!p||p.currentAttemptId!==input.attemptId||!p.attempts[input.attemptId]||p.attempts[input.attemptId].status!=='assembling')fail('ATTEMPT_NOT_ACTIVE','Phase verification requires the current assembling attempt.');if(input.readbackVerified!==true)fail('PHASE_READBACK_REQUIRED','Phase verification requires successful readback.');});}
    async function appendAttemptFailure(input){input=input||{};required(input.reason,'reason');return append(required(input.packageId,'packageId'),'ATTEMPT_FAILED',{attemptId:required(input.attemptId,'attemptId'),expectedSequence:input.expectedSequence,reason:String(input.reason),payload:{code:required(input.code,'code'),details:copy(input.details||{})}},function(p){if(!p||p.currentAttemptId!==input.attemptId||p.attempts[input.attemptId].status!=='assembling')fail('ATTEMPT_NOT_ACTIVE','Only the current assembling attempt can fail.');});}
    function validateCompletion(declaration,evidence){
      evidence=evidence||{};var expected=declaration||{};
      if(Number(evidence.roleCount)!==Number(expected.expectedRoleCount)||Number(evidence.retainedLinkCount)!==Number(expected.expectedRetainedLinkCount)||Number(evidence.intentionalAbsenceCount)!==Number(expected.expectedIntentionalAbsenceCount))fail('COMPLETION_CONTRACT_FAILED','Completion counts differ from the declared package.');
      ['memberChecksumsVerified','ownerReadbackVerified','canonicalCoursesVerified','evidenceVerified','conflictsAbsent','backupRecoveryVerified'].forEach(function(k){if(evidence[k]!==true)fail('COMPLETION_CONTRACT_FAILED',k+' is required before package completion.');});
      if(evidence.resolvedPayloadChecksum!==expected.resolvedPayloadChecksum||evidence.frozenIdentityMapChecksum!==expected.frozenIdentityMapChecksum)fail('COMPLETION_CONTRACT_FAILED','Completion checksums differ from declaration.');
      return copy(evidence);
    }
    async function markVerifiedComplete(input){input=input||{};return append(required(input.packageId,'packageId'),'PACKAGE_VERIFIED_COMPLETE',{attemptId:required(input.attemptId,'attemptId'),expectedSequence:input.expectedSequence,reason:input.reason||'Frozen package completion contract verified.',payload:copy(input.completionEvidence||{})},function(p){if(!p||p.currentAttemptId!==input.attemptId||p.attempts[input.attemptId].status!=='assembling')fail('ATTEMPT_NOT_ACTIVE','Completion requires the current assembling attempt.');validateCompletion(p.declared,input.completionEvidence);});}
    async function markAvailable(input){input=input||{};return append(required(input.packageId,'packageId'),'PACKAGE_AVAILABLE',{attemptId:input.attemptId||null,expectedSequence:input.expectedSequence,reason:required(input.reason,'reason'),payload:copy(input.payload||{})},function(p){if(!p||!p.verifiedComplete||p.available||p.superseded)fail('INVALID_PACKAGE_TRANSITION','Only a verified complete package can become available.');});}
    async function supersedePackage(input){input=input||{};return append(required(input.packageId,'packageId'),'PACKAGE_SUPERSEDED',{attemptId:input.attemptId||null,expectedSequence:input.expectedSequence,reason:required(input.reason,'reason'),payload:{supersededByPackageId:input.supersededByPackageId||null}},function(p){if(!p||p.superseded)fail('INVALID_PACKAGE_TRANSITION','Package cannot be superseded from its current state.');});}
    async function assertWriteGate(input){input=input||{};var p=await getProjection(input);if(!p||p.state!=='assembling'||p.currentAttemptId!==input.attemptId)fail('PACKAGE_WRITE_GATE_CLOSED','Package-bound owner writes require the current assembling attempt.',{packageId:input.packageId,attemptId:input.attemptId,state:p&&p.state});return copy(p);}
    async function assertOrdinaryReadGate(input){input=input||{};var p=await getProjection(input);if(!p||p.state!=='available')fail('PACKAGE_READ_GATE_CLOSED','Package-bound content is unavailable to ordinary classroom reads.',{packageId:input.packageId,state:p&&p.state});return copy(p);}
    async function assertAuditReadGate(input){input=input||{};if(input.auditAuthorized!==true)fail('AUDIT_AUTHORIZATION_REQUIRED','Explicit audit/reference authorization is required.');var p=await getProjection(input);if(!p)fail('PACKAGE_NOT_DECLARED','Package does not exist.');return copy(p);}
    return{declarePackage:declarePackage,startAttempt:startAttempt,appendPhaseVerification:appendPhaseVerification,appendAttemptFailure:appendAttemptFailure,markVerifiedComplete:markVerifiedComplete,markAvailable:markAvailable,supersedePackage:supersedePackage,getPackageProjection:getProjection,getPackageHistory:function(input){return history(required(input.packageId,'packageId')).then(copy);},assertWriteGate:assertWriteGate,assertOrdinaryReadGate:assertOrdinaryReadGate,assertAuditReadGate:assertAuditReadGate,recordTypes:TYPES};
  }
  return{create:create,recordTypes:TYPES};
}));
