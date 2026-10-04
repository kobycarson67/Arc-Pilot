/* ARC instructional-reference Samsung read-only physical verification.
   Engineering-only and inert: construction and page load never open IndexedDB. */
(function(root,factory){
  var api=factory(
    root.ArcV8Storage||(typeof require==='function'?require('./arc_v8_storage'):null),
    root.ArcV8BackupRecovery||(typeof require==='function'?require('./arc_v8_backup_recovery'):null),
    root.ArcV8InstructionalContentPackages||(typeof require==='function'?require('./arc_v8_instructional_content_packages'):null),
    root.ArcV8CurriculumPacing||(typeof require==='function'?require('./arc_v8_curriculum_pacing'):null),
    root.ArcV8LessonPlans||(typeof require==='function'?require('./arc_v8_lesson_plans'):null),
    root.ArcInstructionalReferenceBoundary||(typeof require==='function'?require('./arc_instructional_reference_boundary'):null)
  );
  if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcInstructionalReferencePhysicalVerification=api;
}(this,function(Storage,BackupRecovery,Packages,Curriculum,Lessons,Boundary){
  'use strict';
  var DB='arc_classroom_v8',PACKAGE_ID='ae06a3f8-cd1b-4a2a-943f-2f3d4e1f3f3b',AUTHORITY='V7_ONLY';
  var IDB_VERSION=14,STORE_COUNT=74,TOTAL_RECORDS=891,PACKAGE_EVENTS=12,LESSON_VERSIONS=124;
  var EXPECTED_STORES=Object.freeze(BackupRecovery.EXPECTED_STORES.slice().sort());
  var ROLE_COUNTS=Object.freeze({standard_catalogs:2,standard_catalog_versions:2,standard_definitions:29,standard_versions:29,essential_standard_designations:10,competency_definitions:60,competency_versions:60,curriculum_maps:2,curriculum_map_versions:2,curriculum_map_items:56,curriculum_item_standard_links:80,lesson_definitions:124,lesson_versions:124,lesson_version_standard_links:228,lesson_version_competency_links:51});
  var BASE_COUNTS=Object.freeze({metadata:1,migration_log:14,infrastructure_records:3,courses:2,instructional_content_packages:12});
  function fail(code,message,context,cause){throw new Storage.StorageError(code,message,context||{},cause);}
  function copy(value){return value===undefined?undefined:structuredClone(value);}
  function text(value){return String(value===undefined||value===null?'':value).trim();}
  function sameList(a,b){a=(a||[]).slice().sort();b=(b||[]).slice().sort();return a.length===b.length&&a.every(function(value,index){return value===b[index];});}
  function hex(buffer){return Array.from(new Uint8Array(buffer),function(value){return value.toString(16).padStart(2,'0');}).join('');}
  function countFromManifest(pkg,name){var row=pkg&&pkg.manifest&&pkg.manifest.stores&&pkg.manifest.stores[name];return row?Number(row.recordCount):NaN;}
  function checksumFromManifest(pkg,name){var row=pkg&&pkg.manifest&&pkg.manifest.stores&&pkg.manifest.stores[name];return row&&row.checksum||null;}
  function nativeInspector(indexedDBApi){
    return{
      inspect:function(){
        if(!indexedDBApi||typeof indexedDBApi.open!=='function')return Promise.reject(new Storage.StorageError('REFERENCE_INDEXEDDB_UNAVAILABLE','Native IndexedDB inspection is required.'));
        return new Promise(function(resolve,reject){
          var request,created=false,settled=false;
          function rejectOnce(code,message,context,cause){if(settled)return;settled=true;reject(new Storage.StorageError(code,message,context||{},cause));}
          try{request=indexedDBApi.open(DB);}catch(error){rejectOnce('REFERENCE_DATABASE_INSPECTION_FAILED','Protected production inspection failed.',{databaseName:DB},error);return;}
          request.onupgradeneeded=function(){created=true;try{if(request.transaction)request.transaction.abort();}catch(ignore){}};
          request.onerror=function(){rejectOnce(created?'REFERENCE_DATABASE_REQUIRED':'REFERENCE_DATABASE_INSPECTION_FAILED',created?'Protected production database is absent.':'Protected production inspection failed.',{databaseName:DB},request.error);};
          request.onblocked=function(){rejectOnce('REFERENCE_DATABASE_INSPECTION_BLOCKED','Protected production inspection was blocked.',{databaseName:DB});};
          request.onsuccess=function(){
            if(settled){try{request.result.close();}catch(ignore){}return;}
            var db=request.result,names=Array.from(db.objectStoreNames||[]).sort();
            if(created){db.close();rejectOnce('REFERENCE_DATABASE_REQUIRED','Protected production database is absent.',{databaseName:DB});return;}
            if(Number(db.version)!==IDB_VERSION){db.close();rejectOnce('REFERENCE_DATABASE_VERSION_MISMATCH','Verification requires exact IndexedDB 14 without migration.',{expectedVersion:IDB_VERSION,actualVersion:db.version});return;}
            if(!sameList(names,EXPECTED_STORES)){db.close();rejectOnce('REFERENCE_STORE_MANIFEST_MISMATCH','Verification requires the exact 74-store authority.',{expectedStores:EXPECTED_STORES,actualStores:names});return;}
            settled=true;resolve({databaseName:DB,indexedDbVersion:db.version,storeNames:names,connection:db});
          };
        });
      }
    };
  }
  function create(options){
    options=options||{};
    var databaseName=text(options.databaseName||DB),packageId=text(options.packageId||PACKAGE_ID);
    var indexedDBApi=options.indexedDB||(typeof indexedDB!=='undefined'?indexedDB:null),cryptoApi=options.crypto||(typeof crypto!=='undefined'?crypto:null);
    var inspector=options.inspector||nativeInspector(indexedDBApi),storageFactory=options.storageFactory||Storage.create;
    var packageFactory=options.packageFactory||Packages.create,curriculumFactory=options.curriculumFactory||Curriculum.create;
    var lessonFactory=options.lessonFactory||Lessons.create,backupFactory=options.backupFactory||BackupRecovery.create,boundaryFactory=options.boundaryFactory||Boundary.create;
    var inspection=null,services=null,opening=null,preBackup=null,referenceResult=null;
    if(databaseName!==DB)fail('REFERENCE_DATABASE_MISMATCH','Physical verification accepts only arc_classroom_v8.',{expected:DB,actual:databaseName});
    if(packageId!==PACKAGE_ID)fail('REFERENCE_PACKAGE_MISMATCH','Physical verification requires the accepted package identity.',{expected:PACKAGE_ID,actual:packageId});
    if(!cryptoApi||!cryptoApi.subtle)throw Error('Instructional reference verification requires Web Crypto SHA-256.');
    async function digest(value){return hex(await cryptoApi.subtle.digest('SHA-256',new TextEncoder().encode(String(value))));}
    async function inspectExactStructure(){
      if(Storage.IDB_VERSION!==IDB_VERSION||EXPECTED_STORES.length!==STORE_COUNT)fail('REFERENCE_RUNTIME_AUTHORITY_MISMATCH','Runtime structural authority differs.',{runtimeVersion:Storage.IDB_VERSION,storeCount:EXPECTED_STORES.length});
      if(inspection)return{databaseName:DB,indexedDbVersion:IDB_VERSION,storeCount:STORE_COUNT,storeNames:EXPECTED_STORES.slice(),authorityState:AUTHORITY};
      var result=await inspector.inspect();
      if(!result||result.databaseName!==DB||Number(result.indexedDbVersion)!==IDB_VERSION||!sameList(result.storeNames,EXPECTED_STORES)||!result.connection||typeof result.connection.close!=='function'){
        if(result&&result.connection)try{result.connection.close();}catch(ignore){}
        fail('REFERENCE_STRUCTURE_MISMATCH','Native inspection did not return exact held IDB 14 / 74-store authority.');
      }
      inspection=result;
      return{databaseName:DB,indexedDbVersion:IDB_VERSION,storeCount:STORE_COUNT,storeNames:EXPECTED_STORES.slice(),authorityState:AUTHORITY};
    }
    async function ensureServices(){
      if(services)return services;if(opening)return opening;
      opening=(async function(){
        await inspectExactStructure();
        try{
          if(options.services){services=options.services;inspection.connection.close();inspection.connection=null;return services;}
          var controller=storageFactory({databaseName:DB,indexedDB:indexedDBApi,crypto:cryptoApi}),db=await controller.open();
          inspection.connection.close();inspection.connection=null;db.constants=controller.constants;db.generateId=controller.generateId;
          var packageAuthority=packageFactory({storage:db,actor:'instructional-reference-physical-verification'});
          var curriculum=curriculumFactory({storage:db,packageAuthority:packageAuthority,crypto:cryptoApi,actor:'instructional-reference-physical-verification'});
          var lessons=lessonFactory({storage:db,packageAuthority:packageAuthority,actor:'instructional-reference-physical-verification'});
          var backup=backupFactory({storage:db,databaseName:DB,crypto:cryptoApi,build:options.build||{}});
          services={storage:db,packages:packageAuthority,curriculum:curriculum,lessons:lessons,backup:backup};return services;
        }catch(error){if(inspection&&inspection.connection)try{inspection.connection.close();}catch(ignore){}throw error;}
      }()).finally(function(){opening=null;});return opening;
    }
    function validatePackage(pkg){
      var manifest=pkg&&pkg.manifest||{};
      if(manifest.databaseName!==DB||Number(manifest.schemaVersion)!==8||Number(manifest.indexedDbVersion)!==IDB_VERSION||!sameList(manifest.storeInventory,EXPECTED_STORES)||Number(manifest.totalRecordCount)!==TOTAL_RECORDS)fail('REFERENCE_BACKUP_IDENTITY_MISMATCH','Verified recovery package differs from accepted PA2 authority.');
      Object.keys(BASE_COUNTS).forEach(function(name){if(countFromManifest(pkg,name)!==BASE_COUNTS[name])fail('REFERENCE_RECORD_COUNT_MISMATCH','Required base-store count differs.',{store:name,expected:BASE_COUNTS[name],actual:countFromManifest(pkg,name)});});
      Object.keys(ROLE_COUNTS).forEach(function(name){if(countFromManifest(pkg,name)!==ROLE_COUNTS[name])fail('REFERENCE_RECORD_COUNT_MISMATCH','Instructional role count differs.',{store:name,expected:ROLE_COUNTS[name],actual:countFromManifest(pkg,name)});if((pkg.stores[name]||[]).some(function(row){return row.importPackageId!==PACKAGE_ID;}))fail('REFERENCE_PACKAGE_BINDING_MISMATCH','Instructional role belongs to another package.',{store:name});});
      EXPECTED_STORES.forEach(function(name){if(!Object.prototype.hasOwnProperty.call(BASE_COUNTS,name)&&!Object.prototype.hasOwnProperty.call(ROLE_COUNTS,name)&&countFromManifest(pkg,name)!==0)fail('REFERENCE_CLASSROOM_DATA_PRESENT','Unexpected classroom, pacing, or unsupported instructional data exists.',{store:name,count:countFromManifest(pkg,name)});});
      var metadata=(pkg.stores.metadata||[]).find(function(row){return row.key==='database';});
      if(!metadata||metadata.schemaFamily!=='arc-classroom'||Number(metadata.schemaVersion)!==8||Number(metadata.indexedDbVersion)!==IDB_VERSION||metadata.initializationState!=='ready')fail('REFERENCE_METADATA_MISMATCH','Database metadata differs from accepted authority.');
      var infrastructure=pkg.stores.infrastructure_records||[],initialization=infrastructure.find(function(row){return row.id==='production-v8-initialization-manifest';}),protection=infrastructure.find(function(row){return row.id==='database-protection';});
      if(!initialization||initialization.authorityState!==AUTHORITY||initialization.classroomAuthorityTransferred!==false||initialization.realStudentDataAuthorized!==false||!protection||protection.mode!=='Production/Classroom Protected')fail('REFERENCE_PROTECTION_MISMATCH','Protected V7_ONLY authority differs.');
      var courseIds=(pkg.stores.courses||[]).map(function(row){return row.courseId;}).sort();if(!sameList(courseIds,['arc-course-awt','arc-course-wt']))fail('REFERENCE_COURSE_IDENTITY_MISMATCH','Canonical WT/AWT Course identities differ.',{courseIds:courseIds});
      var lessons=pkg.stores.lesson_versions||[];
      if(lessons.length!==LESSON_VERSIONS||lessons.some(function(row){return row.importPackageId!==PACKAGE_ID||row.instructionalAvailability!=='reference_only'||row.ordinarySchedulingEligible!==false||row.autoBuildEligible!==false||(row.teachingGuide!==undefined&&row.teachingGuide!==null);}))fail('REFERENCE_LESSON_POLICY_MISMATCH','Preserved Lesson safety differs.');
      return{metadata:metadata,initialization:initialization,protection:protection,lessonVersions:lessons};
    }
    async function capture(kind){
      var service=await ensureServices(),purpose='instructional-reference-samsung-'+kind+'-verification';
      var result=await service.backup.exportBackup({purpose:purpose}),verified=await service.backup.verifyPackage(result.text),validated=validatePackage(verified.package);
      if(!verified.verified||!result.audit||!result.audit.healthy||result.audit.errorCount!==0||result.audit.warningCount!==0)fail('REFERENCE_BACKUP_UNHEALTHY','Recovery capture or integrity audit is not verified healthy.');
      return{verified:true,kind:kind,filename:result.filename,fileChecksum:await digest(result.text),packageChecksum:verified.package.manifest.packageIntegrity.checksum,recordCount:verified.package.manifest.totalRecordCount,storeCount:verified.package.manifest.storeInventory.length,text:result.text,package:verified.package,audit:result.audit,validated:validated};
    }
    async function capturePreBackup(){preBackup=await capture('pre');return publicBackup(preBackup);}
    function publicBackup(value){return{verified:value.verified,kind:value.kind,filename:value.filename,fileChecksum:value.fileChecksum,packageChecksum:value.packageChecksum,recordCount:value.recordCount,storeCount:value.storeCount,text:value.text,authorityState:AUTHORITY};}
    async function runReferenceVerification(){
      if(!preBackup)fail('REFERENCE_PRE_BACKUP_REQUIRED','Verified PRE recovery capture is required first.');
      var service=await ensureServices();await service.packages.assertOrdinaryReadGate({packageId:PACKAGE_ID});
      var history=await service.packages.getPackageHistory({packageId:PACKAGE_ID});
      if(history.length!==PACKAGE_EVENTS||history.some(function(row,index){return row.packageId!==PACKAGE_ID||Number(row.sequence)!==index+1;})||history[11].recordType!=='PACKAGE_AVAILABLE')fail('REFERENCE_PACKAGE_HISTORY_MISMATCH','Accepted package must contain exactly 12 events ending in PACKAGE_AVAILABLE.');
      var boundary=boundaryFactory({databaseName:DB,packageId:PACKAGE_ID,indexedDB:indexedDBApi,crypto:cryptoApi,services:{packageAuthority:service.packages,curriculum:service.curriculum}});
      var wtStandards=await boundary.getStandards({course:'WT'}),awtStandards=await boundary.getStandards({course:'AWT'}),wtEssential=await boundary.getEssentialStandards({course:'WT'}),awtEssential=await boundary.getEssentialStandards({course:'AWT'}),wtMap=await boundary.getCurriculumMap({course:'WT'}),awtMap=await boundary.getCurriculumMap({course:'AWT'});
      var wtItemId=(wtMap.items[0].item||wtMap.items[0]).curriculumMapItemId,awtItemId=(awtMap.items[0].item||awtMap.items[0]).curriculumMapItemId;
      var wtItem=await boundary.getCurriculumItem({course:'WT',curriculumMapItemId:wtItemId}),awtItem=await boundary.getCurriculumItem({course:'AWT',curriculumMapItemId:awtItemId});
      var wtCoverage=await boundary.getCurriculumCoverage({course:'WT'}),awtCoverage=await boundary.getCurriculumCoverage({course:'AWT'});
      var counts={wt:{standards:wtStandards.standards.length,essential:wtEssential.designations.length,curriculumItems:wtMap.items.length},awt:{standards:awtStandards.standards.length,essential:awtEssential.designations.length,curriculumItems:awtMap.items.length}};
      if(counts.wt.standards!==9||counts.awt.standards!==20||counts.wt.essential!==4||counts.awt.essential!==6||counts.wt.curriculumItems!==29||counts.awt.curriculumItems!==27)fail('REFERENCE_OWNER_READ_MISMATCH','Reference owner projections differ.',counts);
      var wtLessons=await service.lessons.getCourseLessons({courseId:'arc-course-wt'}),awtLessons=await service.lessons.getCourseLessons({courseId:'arc-course-awt'}),wtAuto=await service.lessons.getAutoBuildEligibleLessons({courseId:'arc-course-wt'}),awtAuto=await service.lessons.getAutoBuildEligibleLessons({courseId:'arc-course-awt'}),lessonCode=null;
      try{await service.lessons.getLessonVersion({lessonVersionId:preBackup.validated.lessonVersions[0].lessonVersionId});}catch(error){lessonCode=error&&error.code;}
      if(wtLessons.length||awtLessons.length||wtAuto.length||awtAuto.length||lessonCode!=='LESSON_REFERENCE_ONLY')fail('REFERENCE_LESSON_EXPOSURE','Preserved Lessons became ordinary or Auto Build content.',{wtLessons:wtLessons.length,awtLessons:awtLessons.length,wtAutoBuild:wtAuto.length,awtAutoBuild:awtAuto.length,directReadCode:lessonCode});
      referenceResult={packageState:'available',packageEvents:history.length,noEvent13:true,counts:counts,curriculumItems:{wt:wtItem.curriculumMapItemId||wtItem.item&&wtItem.item.curriculumMapItemId,awt:awtItem.curriculumMapItemId||awtItem.item&&awtItem.item.curriculumMapItemId},coverage:{wt:!!wtCoverage,awt:!!awtCoverage},courseSeparation:true,ordinaryReadGateConsulted:true,legacyLessons:{preserved:LESSON_VERSIONS,ordinaryWT:0,ordinaryAWT:0,autoBuildWT:0,autoBuildAWT:0,directReadCode:lessonCode},authorityState:AUTHORITY};
      return copy(referenceResult);
    }
    async function capturePostBackupAndVerify(){
      if(!preBackup||!referenceResult)fail('REFERENCE_VERIFICATION_REQUIRED','PRE capture and reference verification are required first.');
      var post=await capture('post'),differences=[];
      EXPECTED_STORES.forEach(function(name){var before=preBackup.package.manifest.stores[name],after=post.package.manifest.stores[name];if(!before||!after||before.recordCount!==after.recordCount||before.checksum!==after.checksum)differences.push({store:name,before:before||null,after:after||null});});
      if(differences.length)fail('REFERENCE_NONMUTATION_FAILED','Canonical store contents changed during read-only verification.',{differences:differences});
      if(checksumFromManifest(preBackup.package,'migration_log')!==checksumFromManifest(post.package,'migration_log'))fail('REFERENCE_MIGRATION_LOG_CHANGED','Migration authority changed during verification.');
      return{verified:true,nonmutating:true,differences:[],indexedDbVersion:IDB_VERSION,storeCount:STORE_COUNT,recordCount:TOTAL_RECORDS,packageEvents:PACKAGE_EVENTS,migrationLogUnchanged:true,audit:{healthy:post.audit.healthy,errorCount:post.audit.errorCount,warningCount:post.audit.warningCount},authorityState:AUTHORITY,postBackup:publicBackup(post)};
    }
    return Object.freeze({inspectExactStructure:inspectExactStructure,capturePreBackup:capturePreBackup,runReferenceVerification:runReferenceVerification,capturePostBackupAndVerify:capturePostBackupAndVerify,constants:Object.freeze({databaseName:DB,packageId:PACKAGE_ID,authorityState:AUTHORITY,indexedDbVersion:IDB_VERSION,storeCount:STORE_COUNT,totalRecords:TOTAL_RECORDS,packageEvents:PACKAGE_EVENTS,lessonVersions:LESSON_VERSIONS})});
  }
  return Object.freeze({create:create,DATABASE_NAME:DB,PACKAGE_ID:PACKAGE_ID,AUTHORITY_STATE:AUTHORITY,IDB_VERSION:IDB_VERSION,STORE_COUNT:STORE_COUNT,TOTAL_RECORDS:TOTAL_RECORDS,PACKAGE_EVENTS:PACKAGE_EVENTS,LESSON_VERSIONS:LESSON_VERSIONS});
}));
