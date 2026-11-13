const assert=require('assert'),fs=require('fs'),vm=require('vm'),cp=require('child_process');
let pass=0,fail=0;
function test(name,fn){try{fn();pass++;console.log('PASS '+name)}catch(error){fail++;console.error('FAIL '+name,error)}}
const html=fs.readFileSync('index.html','utf8'),closure=JSON.parse(fs.readFileSync('runtime/arc_authority_closure_v1.json','utf8'));
function buildAt(ref){const source=ref?cp.execFileSync('git',['show',ref+':app-build.js'],{encoding:'utf8'}):fs.readFileSync('app-build.js','utf8'),context={};vm.runInNewContext(source,context);return context.ARC_BUILD;}
test('production pilot authority is resolved from the accepted storage identity without the test harness global',()=>{
  const production=html.slice(html.indexOf('if (raw.recordType === "ARC_LIVE_CLASSROOM_PILOT_AUTHORITY")'),html.indexOf('if (window.__ARC_PHYSICAL_DB !== ArcUnifiedClassroomAuthorityActivation.constants.databaseName'));
  assert(production.includes('academicAuthorityRuntime.databaseIdentity'));
  assert(production.includes('raw.databaseName !== ArcLiveClassroomPilotActivation.constants.databaseName'));
  assert(production.includes('raw.physicalDatabaseName !== ArcLiveClassroomPilotActivation.constants.databaseName'));
  assert(production.includes('PILOT_PRODUCTION_DATABASE_REQUIRED'));
  assert(!production.includes('__ARC_PHYSICAL_DB'));
});
test('accepted storage owner supplies an exact immutable production database identity',()=>{
  assert(html.includes('databaseName: owner.constants.databaseName'));
  assert(html.includes('schemaVersion: connection.metadata.schemaVersion'));
  assert(html.includes('indexedDbVersion: owner.constants.indexedDbVersion'));
  assert(html.includes('storeCount: connection.storeNames.length'));
  for(const token of ['identity.databaseName !== ArcV8Storage.DATABASE_NAME','identity.schemaVersion !== ArcV8Storage.SCHEMA_VERSION','identity.indexedDbVersion !== ArcV8Storage.IDB_VERSION','identity.storeCount !== Object.keys(ArcV8Storage.STORES).length'])assert(html.includes(token),token);
});
test('task-owned unified verification still refuses the real database and requires its harness identity',()=>{
  assert(html.includes('window.__ARC_PHYSICAL_DB !== ArcUnifiedClassroomAuthorityActivation.constants.databaseName'));
  assert(html.includes('UNIFIED_NONPRODUCTION_DATABASE_REQUIRED'));
});
test('build and shell identities preserve runtime repair lineage and advance for the verified-release identity repair',()=>{
  const before=buildAt('3943f05e847a5318c5cd8bee10f45ca905e57501'),after=buildAt(),runtime='-live-classroom-runtime-repair-1',identity='-live-student-profile-verified-release-identity-repair-1',classroomOperations='-dual-period-temporary-shop-visitor-1-combined-classroom-usability-autobackup-1-equipment-inventory-booth-amendment-1-equipment-selector-ui-completion-1-sidebar-hubs-gradebook-attendance-technical-repair-1-technical-profile-assignment-completion-1-technical-assignment-history-sidebar-dual-period-repair-1-coordinated-classroom-repair-10-findings-3-batch-b-multi-section-startup-repair-1-technical-score-atomic-repair-1-technical-display-parity-repair-1-classroom-workflow-sweep-repair-1-classroom-navigation-history-repair-1';
  assert.equal(after.build,before.build+runtime+identity+classroomOperations);
  assert.equal(after.shell,before.shell+runtime+'-live-student-profile-repair-1-profile-enrollment-label-repair-1'+identity+classroomOperations);
  assert.equal(after.liveClassroomRuntimeRepair,'live-classroom-runtime-repair-1');
  assert.equal(after.liveStudentProfileVerifiedReleaseIdentityRepair,'live-student-profile-verified-release-identity-repair-1');
  assert.equal(after.dualPeriodTemporaryShopVisitor,'dual-period-temporary-shop-visitor-1');
  assert.equal(after.combinedClassroomUsabilityAutoBackup,'combined-classroom-usability-autobackup-1');
  assert.equal(closure.buildIdentity,after.build);
  assert.equal(closure.approvedPaths.length,114);
});
console.log(`\n${pass}/${pass+fail} Live Classroom runtime repair tests passed.`);if(fail)process.exitCode=1;
