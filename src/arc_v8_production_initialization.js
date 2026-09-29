/* ARC Schema v8 production initialization coordinator.
   Explicit tooling only: this module is not loaded by the Schema v7 classroom.
   It never reads or writes v7 storage and never imports classroom content. */
(function(root,factory){
  var api=factory(typeof module==='object'&&module.exports?require('./arc_v8_storage'):root.ArcV8Storage,typeof module==='object'&&module.exports?require('./arc_v8_backup_recovery'):root.ArcV8BackupRecovery);
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcV8ProductionInitialization=api;
}(this,function(Storage,BackupRecovery){
  'use strict';
  var INITIALIZATION_ID='production-v8-initialization-manifest';
  var RECONCILIATION_ID='production-v8-reconciliation-manifest';
  var PROTECTION_ID='database-protection';
  var PROTECTED_MODE='Production/Classroom Protected';
  var AUTHORITY_STATE='V7_ONLY';
  var INFRASTRUCTURE_STORES=[Storage.STORES.metadata,Storage.STORES.migrations,Storage.STORES.infrastructure];
  var EXPECTED_STORES=BackupRecovery.EXPECTED_STORES.slice();
  var DOMAIN_STORES=EXPECTED_STORES.filter(function(name){return INFRASTRUCTURE_STORES.indexOf(name)<0;});
  var P10B_A2_STORES=[Storage.STORES.standardCatalogs,Storage.STORES.standardCatalogVersions,Storage.STORES.standardDefinitions,Storage.STORES.standardVersions,Storage.STORES.essentialStandardDesignations,Storage.STORES.curriculumMaps,Storage.STORES.curriculumMapVersions,Storage.STORES.curriculumMapItems,Storage.STORES.curriculumItemStandardLinks,Storage.STORES.curriculumItemCompetencyLinks,Storage.STORES.sectionPacingPlans,Storage.STORES.sectionPacingEvents,Storage.STORES.sectionPacingSnapshots];
  var P10C_A2_STORES=[Storage.STORES.lessonDefinitions,Storage.STORES.lessonVersions,Storage.STORES.lessonVersionStandardLinks,Storage.STORES.lessonVersionCompetencyLinks,Storage.STORES.lessonVersionCurriculumLinks,Storage.STORES.lessonVersionActivityLinks];
  var EXCLUDED_DATA_CLASSES=Object.freeze(['engineering','simulation','pilot','test','fictional-transactional']);

  function failure(code,message,context,cause){var e=new Storage.StorageError(code,message,context||{},cause);throw e;}
  function sorted(values){return values.slice().sort();}
  function sameList(a,b){return JSON.stringify(sorted(a||[]))===JSON.stringify(sorted(b||[]));}
  function iso(now){return String(now());}
  function clone(value){return value===undefined?undefined:structuredClone(value);}
  function requestPromise(request){return new Promise(function(resolve,reject){request.onsuccess=function(){resolve(request.result);};request.onerror=function(){reject(request.error||new Error('IndexedDB inspection request failed.'));};});}

  function nativeInspector(indexedDBProvider){
    var idb=indexedDBProvider||(typeof indexedDB!=='undefined'?indexedDB:null);
    if(!idb||typeof idb.databases!=='function')failure('SAFE_INSPECTION_UNAVAILABLE','IndexedDB database enumeration is required before production initialization.');
    async function inspect(name){
      var listed=await idb.databases(),match=(listed||[]).find(function(item){return item.name===name;});
      if(!match)return{exists:false,databaseName:name,knownDatabases:(listed||[]).map(function(item){return item.name;}).filter(Boolean)};
      return new Promise(function(resolve,reject){
        var request=idb.open(name),upgradeAttempted=false;
        request.onupgradeneeded=function(){upgradeAttempted=true;try{request.transaction.abort();}catch(ignore){}};
        request.onerror=function(){reject(new Storage.StorageError(upgradeAttempted?'INSPECTION_RACE':'EXISTING_DATABASE_INSPECTION_FAILED','Existing production database could not be inspected without modification.',{databaseName:name},request.error));};
        request.onsuccess=async function(){
          var db=request.result;
          try{
            var stores=Array.from(db.objectStoreNames),version=db.version,tx=db.transaction(stores,'readonly'),counts={},metadata=null,infrastructure=[];
            for(var store of stores)counts[store]=await requestPromise(tx.objectStore(store).count());
            if(stores.indexOf(Storage.STORES.metadata)>=0)metadata=await requestPromise(tx.objectStore(Storage.STORES.metadata).get('database'));
            if(stores.indexOf(Storage.STORES.infrastructure)>=0)infrastructure=await requestPromise(tx.objectStore(Storage.STORES.infrastructure).getAll());
            db.close();
            resolve({exists:true,databaseName:name,indexedDbVersion:version,storeNames:stores,counts:counts,metadata:metadata,infrastructure:infrastructure,knownDatabases:(listed||[]).map(function(item){return item.name;}).filter(Boolean)});
          }catch(e){try{db.close();}catch(ignore){}reject(new Storage.StorageError('EXISTING_DATABASE_INSPECTION_FAILED','Existing production database could not be inspected without modification.',{databaseName:name},e));}
        };
      });
    }
    return{inspect:inspect};
  }

  function create(options){
    options=options||{};
    var databaseName=String(options.databaseName||Storage.DATABASE_NAME),now=options.now||function(){return new Date().toISOString();},build=options.build||{};
    if(databaseName!==Storage.DATABASE_NAME)failure('PRODUCTION_IDENTITY_REQUIRED','Production initialization is restricted to the exact ARC classroom v8 database identity.',{actual:databaseName,expected:Storage.DATABASE_NAME});
    var inspector=options.inspector||nativeInspector(options.indexedDB),storageFactory=options.storageFactory||function(){return Storage.create({indexedDB:options.indexedDB,databaseName:databaseName,crypto:options.crypto,now:function(){return new Date(now());},build:build});};
    var backupFactory=options.backupFactory||function(storage){return BackupRecovery.create({storage:storage,crypto:options.crypto,now:now,build:build,databaseName:databaseName});};

    function rowById(rows,id){return(rows||[]).find(function(row){return row.id===id;});}
    function validateAuthority(authority){if(!authority||!authority.confirmedBy||!authority.rollbackRef||!authority.startingCommit||!authority.startingTree)failure('AUTHORIZATION_REQUIRED','Production initialization requires explicit operator and rollback authority.');return authority;}
    function assertIdentity(report){
      if(!report.exists)failure('PRODUCTION_DATABASE_ABSENT','Production database does not exist.',{databaseName:databaseName});
      if(report.databaseName!==databaseName)failure('DATABASE_IDENTITY_MISMATCH','Database identity is not the authorized production identity.',{actual:report.databaseName,expected:databaseName});
      if(Number(report.indexedDbVersion)!==Storage.IDB_VERSION)failure('INDEXEDDB_VERSION_MISMATCH','Existing production database has an incompatible IndexedDB structural version.',{actual:report.indexedDbVersion,expected:Storage.IDB_VERSION});
      if(!sameList(report.storeNames,EXPECTED_STORES))failure('STORE_INVENTORY_MISMATCH','Existing production database does not have the current exact store manifest.',{actual:sorted(report.storeNames||[]),expected:sorted(EXPECTED_STORES)});
      var meta=report.metadata;
      if(!meta||meta.schemaFamily!==Storage.SCHEMA_FAMILY||Number(meta.schemaVersion)!==Storage.SCHEMA_VERSION||Number(meta.indexedDbVersion)!==Storage.IDB_VERSION||meta.initializationState!=='ready')failure('METADATA_INCONSISTENT','Existing production database metadata is missing or incompatible.',{metadata:meta||null});
    }
    function assertEmpty(report){
      var populated=DOMAIN_STORES.filter(function(name){return Number((report.counts||{})[name]||0)!==0;}).map(function(name){return{name:name,count:report.counts[name]};});
      if(populated.length)failure('UNEXPECTED_PRODUCTION_RECORDS','Production initialization refuses a database containing classroom-domain records.',{populatedStores:populated});
      return{domainStoreCount:DOMAIN_STORES.length,domainRecordCount:0,excludedIdentityCount:0};
    }
    function assertRecognizedExisting(report,authority){
      assertIdentity(report);assertEmpty(report);
      var init=rowById(report.infrastructure,INITIALIZATION_ID),reconciliation=rowById(report.infrastructure,RECONCILIATION_ID),protection=rowById(report.infrastructure,PROTECTION_ID);
      var version12Stores=EXPECTED_STORES.filter(function(name){return P10C_A2_STORES.indexOf(name)<0;}),version11Stores=version12Stores.filter(function(name){return P10B_A2_STORES.indexOf(name)<0;}),version10Stores=version11Stores.filter(function(name){return name!==Storage.STORES.behaviorEvents;}),recognizedInventory=init&&((init.indexedDbVersion===Storage.IDB_VERSION&&init.expectedStoreCount===EXPECTED_STORES.length&&sameList(init.expectedStores,EXPECTED_STORES))||(init.indexedDbVersion===12&&init.expectedStoreCount===67&&sameList(init.expectedStores,version12Stores))||(init.indexedDbVersion===11&&init.expectedStoreCount===54&&sameList(init.expectedStores,version11Stores))||(init.indexedDbVersion===10&&init.expectedStoreCount===53&&sameList(init.expectedStores,version10Stores)));
      if(!init||init.status!=='complete'||init.databaseName!==databaseName||init.schemaFamily!==Storage.SCHEMA_FAMILY||init.schemaVersion!==Storage.SCHEMA_VERSION||!recognizedInventory||init.authorityState!==AUTHORITY_STATE||init.classroomAuthorityTransferred!==false||init.realStudentDataAuthorized!==false||init.contentImported!==false)failure('UNEXPECTED_EXISTING_DATABASE','Existing production database is not a recognized protected production authority.',{initializationManifest:init||null});
      if(!reconciliation||reconciliation.status!=='complete'||reconciliation.importedRecordCount!==0||reconciliation.excludedIdentityCount!==0||!Array.isArray(reconciliation.excludedDataClasses)||reconciliation.excludedDataClasses.join('|')!==EXCLUDED_DATA_CLASSES.join('|')||reconciliation.reusableAuthorityImported!==false||reconciliation.classroomTransactionsImported!==false)failure('RECONCILIATION_MANIFEST_MISMATCH','Existing production database reconciliation manifest is missing or incompatible.',{reconciliationManifest:reconciliation||null});
      if(!protection||protection.mode!==PROTECTED_MODE)failure('PROTECTION_REQUIRED','Existing production database is not protected.',{protection:protection||null});
      if(authority&&(init.startingCommit!==String(authority.startingCommit)||init.startingTree!==String(authority.startingTree)||init.rollbackRef!==String(authority.rollbackRef)||reconciliation.startingCommit!==String(authority.startingCommit)||reconciliation.startingTree!==String(authority.startingTree)||reconciliation.rollbackRef!==String(authority.rollbackRef)))failure('ROLLBACK_AUTHORITY_MISMATCH','Existing production database was initialized under different Git rollback authority.',{initializationManifest:init,reconciliationManifest:reconciliation});
      return{initialization:init,reconciliation:reconciliation,protection:protection};
    }
    async function inspect(){return inspector.inspect(databaseName);}
    async function verifyStorage(storage,backup){
      var db=await storage.open();
      if(storage.constants.databaseName!==databaseName||storage.constants.schemaFamily!==Storage.SCHEMA_FAMILY||storage.constants.schemaVersion!==Storage.SCHEMA_VERSION||storage.constants.indexedDbVersion!==Storage.IDB_VERSION)failure('STORAGE_IDENTITY_MISMATCH','Storage service constants do not match production authority.',{constants:storage.constants});
      if(!sameList(db.storeNames,EXPECTED_STORES))failure('STORE_INVENTORY_MISMATCH','Opened production database does not have the current exact store manifest.',{actual:sorted(db.storeNames||[]),expected:sorted(EXPECTED_STORES)});
      var counts={};for(var store of EXPECTED_STORES)counts[store]=(await db.query(store)).length;
      var report={exists:true,databaseName:databaseName,indexedDbVersion:Storage.IDB_VERSION,storeNames:db.storeNames,counts:counts,metadata:await db.read(Storage.STORES.metadata,'database'),infrastructure:await db.query(Storage.STORES.infrastructure)};
      assertIdentity(report);var empty=assertEmpty(report),audit=await backup.auditDatabase();if(!audit.healthy)failure('DATABASE_INTEGRITY_FAILED','Empty production database failed the database-wide integrity audit.',{audit:audit});
      return{db:db,report:report,empty:empty,audit:audit};
    }
    function manifests(authority,at){
      validateAuthority(authority);
      var common={createdAt:at,createdBy:String(authority.confirmedBy),startingCommit:String(authority.startingCommit),startingTree:String(authority.startingTree),rollbackRef:String(authority.rollbackRef)};
      return{
        initialization:Object.assign({id:INITIALIZATION_ID,type:'ProductionV8InitializationManifest',status:'complete',databaseName:databaseName,schemaFamily:Storage.SCHEMA_FAMILY,schemaVersion:Storage.SCHEMA_VERSION,indexedDbVersion:Storage.IDB_VERSION,expectedStoreCount:EXPECTED_STORES.length,expectedStores:EXPECTED_STORES.slice(),authorityState:AUTHORITY_STATE,classroomAuthorityTransferred:false,realStudentDataAuthorized:false,contentImported:false},common),
        reconciliation:Object.assign({id:RECONCILIATION_ID,type:'ProductionV8ReconciliationManifest',status:'complete',importedRecordCount:0,excludedIdentityCount:0,excludedDataClasses:EXCLUDED_DATA_CLASSES.slice(),reusableAuthorityImported:false,classroomTransactionsImported:false},common),
        protection:{id:PROTECTION_ID,mode:PROTECTED_MODE,protectedAt:at,protectedBy:String(authority.confirmedBy),reason:'Stage 1 protected empty production foundation',revision:1}
      };
    }
    async function completeVerification(storage,backup,inspection,authority){
      var verified=await verifyStorage(storage,backup),recognized=assertRecognizedExisting(inspection||await inspect(),authority),recovery=await backup.exportBackup({purpose:'production-v8-initial-recovery-point'}),readback=await backup.verifyPackage(recovery.text);
      if(!recovery.verification.verified||!readback.verified||recovery.package.manifest.databaseName!==databaseName||recovery.package.manifest.schemaVersion!==Storage.SCHEMA_VERSION||recovery.package.manifest.indexedDbVersion!==Storage.IDB_VERSION||recovery.package.manifest.storeInventory.length!==EXPECTED_STORES.length)failure('RECOVERY_VERIFICATION_FAILED','Production recovery point failed identity, inventory, checksum, media, or readback verification.');
      var resetBlocked=false;try{await storage.resetDevelopmentDatabase();}catch(e){if(e&&e.code==='PROTECTED_DATABASE')resetBlocked=true;else throw e;}if(!resetBlocked)failure('PROTECTED_RESET_REFUSAL_FAILED','Protected production database did not refuse ordinary development reset.');
      return{databaseName:databaseName,schemaVersion:Storage.SCHEMA_VERSION,indexedDbVersion:Storage.IDB_VERSION,storeCount:EXPECTED_STORES.length,authorityState:AUTHORITY_STATE,classroomAuthorityTransferred:false,realStudentDataAuthorized:false,empty:verified.empty,manifests:recognized,audit:verified.audit,recovery:{filename:recovery.filename,verification:readback,media:recovery.package.manifest.media,checksum:recovery.package.manifest.packageIntegrity.checksum,totalRecordCount:recovery.package.manifest.totalRecordCount},protectedResetRefused:true,knownDatabases:(inspection&&inspection.knownDatabases)||[]};
    }
    async function initialize(authority){
      validateAuthority(authority);
      var before=await inspect();
      if(before.exists){assertRecognizedExisting(before,authority);var existingStorage=storageFactory(),existingBackup=backupFactory(await existingStorage.open());return completeVerification(existingStorage,existingBackup,before,authority);}
      var storage=storageFactory(),db,backup,committed=false;
      try{
        db=await storage.open();backup=backupFactory(db);
        var baseline=await verifyStorage(storage,backup),preProtection=await backup.exportBackup({purpose:'pre-production-protection-recovery'});
        if(!preProtection.verification.verified)failure('RECOVERY_VERIFICATION_FAILED','Pre-protection recovery point did not verify.');
        var at=iso(now),rows=manifests(authority,at);
        await db.transaction(Storage.STORES.infrastructure,async function(tx){await tx.put(Storage.STORES.infrastructure,rows.initialization);await tx.put(Storage.STORES.infrastructure,rows.reconciliation);await tx.put(Storage.STORES.infrastructure,rows.protection);});
        committed=true;db.close();
        var after=await inspect();assertRecognizedExisting(after,authority);
        var reopenedStorage=storageFactory(),reopenedBackup=backupFactory(await reopenedStorage.open()),result=await completeVerification(reopenedStorage,reopenedBackup,after,authority);
        result.preProtectionRecovery={verified:preProtection.verification.verified,checksum:preProtection.package.manifest.packageIntegrity.checksum,media:preProtection.package.manifest.media};result.audit=baseline.audit;return result;
      }catch(e){
        if(db&&typeof db.close==='function')try{db.close();}catch(ignore){}
        if(!committed&&db)try{await storage.resetDevelopmentDatabase();}catch(ignore){}
        throw e;
      }
    }
    return{inspect:inspect,initialize:initialize,constants:{databaseName:databaseName,schemaVersion:Storage.SCHEMA_VERSION,indexedDbVersion:Storage.IDB_VERSION,expectedStores:EXPECTED_STORES.slice(),domainStores:DOMAIN_STORES.slice(),excludedDataClasses:EXCLUDED_DATA_CLASSES.slice(),authorityState:AUTHORITY_STATE,manifestIds:{initialization:INITIALIZATION_ID,reconciliation:RECONCILIATION_ID,protection:PROTECTION_ID}}};
  }
  return{create:create,nativeInspector:nativeInspector,EXPECTED_STORES:EXPECTED_STORES.slice(),DOMAIN_STORES:DOMAIN_STORES.slice(),EXCLUDED_DATA_CLASSES:EXCLUDED_DATA_CLASSES.slice(),AUTHORITY_STATE:AUTHORITY_STATE};
}));
