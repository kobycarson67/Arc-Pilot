/* Stage 14 academic cutover authority. Explicit tooling/adapters only until
   protected production initialization and Samsung acceptance are complete. */
(function(root,factory){
  var req=typeof require==='function'?require:null;
  var api=factory(
    root.ArcV8Storage||(req&&req('./arc_v8_storage')),
    root.ArcV8Academic||(req&&req('./arc_v8_academic')),
    root.ArcV8BackupRecovery||(req&&req('./arc_v8_backup_recovery')),
    function(){return root.ArcV8InstructionalContentPackages||(req&&req('./arc_v8_instructional_content_packages'));}
  );
  if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcV8AcademicCutover=api;
}(this,function(Storage,Academic,Backup,getPackages){
  'use strict';
  var S=Storage.STORES;
  var ACADEMIC=[S.students,S.courses,S.schoolYears,S.semesters,S.gradingPeriods,S.sections,S.enrollments,S.scheduleAssignments];
  var INFRA=[S.metadata,S.migrations,S.infrastructure];
  var CONFIGURABLE=[S.schoolYears,S.semesters,S.gradingPeriods,S.sections];
  var CLASSROOM_TRANSACTIONS=[S.students,S.enrollments,S.scheduleAssignments];
  var ACCEPTED_PACKAGE_ID='ae06a3f8-cd1b-4a2a-943f-2f3d4e1f3f3b';
  var REFERENCE_COUNTS={};
  REFERENCE_COUNTS[S.standardCatalogs]=2;
  REFERENCE_COUNTS[S.standardCatalogVersions]=2;
  REFERENCE_COUNTS[S.standardDefinitions]=29;
  REFERENCE_COUNTS[S.standardVersions]=29;
  REFERENCE_COUNTS[S.essentialStandardDesignations]=10;
  REFERENCE_COUNTS[S.competencyDefinitions]=60;
  REFERENCE_COUNTS[S.competencyVersions]=60;
  REFERENCE_COUNTS[S.curriculumMaps]=2;
  REFERENCE_COUNTS[S.curriculumMapVersions]=2;
  REFERENCE_COUNTS[S.curriculumMapItems]=56;
  REFERENCE_COUNTS[S.curriculumItemStandardLinks]=80;
  REFERENCE_COUNTS[S.lessonDefinitions]=124;
  REFERENCE_COUNTS[S.lessonVersions]=124;
  REFERENCE_COUNTS[S.lessonVersionStandardLinks]=228;
  REFERENCE_COUNTS[S.lessonVersionCompetencyLinks]=51;
  REFERENCE_COUNTS[S.instructionalContentPackages]=12;
  var ACCEPTED_REFERENCE_CHECKSUMS={};
  ACCEPTED_REFERENCE_CHECKSUMS[S.courses]='194f1516b6d19bc3456002054a9ab96eaddf9222a11076fdb927f303cb3f34ba';
  ACCEPTED_REFERENCE_CHECKSUMS[S.standardCatalogs]='38dce503deb1c8bf158c409b499be050969517f69022316c6f978df1ac23b7d9';
  ACCEPTED_REFERENCE_CHECKSUMS[S.standardCatalogVersions]='83f7221bc61c06622b5a54425116b190cedd0c87c9e72e30dca45e9fa21e722f';
  ACCEPTED_REFERENCE_CHECKSUMS[S.standardDefinitions]='7a7ad218989a8e22b85d42d018f9a86f1a555cf903713bd7dfcaccbda6f6b5a4';
  ACCEPTED_REFERENCE_CHECKSUMS[S.standardVersions]='92f50089522c25a1e9982b4fff6134522818811692c3bad9f14705df158b54f9';
  ACCEPTED_REFERENCE_CHECKSUMS[S.essentialStandardDesignations]='cd7b617024518f623a2eb517f33813547028a8cfff0b9c4bdd70d96a3848ff41';
  ACCEPTED_REFERENCE_CHECKSUMS[S.competencyDefinitions]='fc170a98ea8424de793bcb18623ee27b0ad03a39406737a6c6fdbca1c144122d';
  ACCEPTED_REFERENCE_CHECKSUMS[S.competencyVersions]='fffc0b8ba77afe67edfe43001f0e2dc0f8a4c4e245de800b238fb6fc27d77546';
  ACCEPTED_REFERENCE_CHECKSUMS[S.curriculumMaps]='003d9e8673eb7d14d7355bfd20af8186219afffb28bc63e7be253094d1ac3eb4';
  ACCEPTED_REFERENCE_CHECKSUMS[S.curriculumMapVersions]='ee4bea9a51f86416679dcb25a0beb9e93627873d6638268ba0ba29f6a8a6e687';
  ACCEPTED_REFERENCE_CHECKSUMS[S.curriculumMapItems]='cdad382f39bfa5fd6928687754ee702f401887822a13a814aad8a38817dce7cf';
  ACCEPTED_REFERENCE_CHECKSUMS[S.curriculumItemStandardLinks]='a104bed403f6bef74c7bb235bc8e4090c65e821d29af82d4af4740142c598267';
  ACCEPTED_REFERENCE_CHECKSUMS[S.lessonDefinitions]='091b99c55beff60f44a1a8aa8ed717214f9bc691e02c0bf898a8e856998c29f0';
  ACCEPTED_REFERENCE_CHECKSUMS[S.lessonVersions]='3b1332e63434811a1da4f5a9b00e9c65113948f191376f6743ca80929b74c3bc';
  ACCEPTED_REFERENCE_CHECKSUMS[S.lessonVersionStandardLinks]='c120f902c1ce96b735f20228017e38320ac0011115d5052c458ad27605e901b3';
  ACCEPTED_REFERENCE_CHECKSUMS[S.lessonVersionCompetencyLinks]='f75ea1ff9c7d53a50e48f92ed444f823bc0a2de41f1c0d0e28da44c02c08f5ae';
  ACCEPTED_REFERENCE_CHECKSUMS[S.instructionalContentPackages]='fcf98dbf328ecc4bff5e83b03f82b6f86b763bec1279eec889a82534a31f352d';
  var REFERENCE_STORES=Object.keys(REFERENCE_COUNTS);
  var INTENTIONAL_EMPTY=[S.curriculumItemCompetencyLinks,S.lessonVersionCurriculumLinks,S.lessonVersionActivityLinks];
  var EXEMPT=INFRA.concat(ACADEMIC,REFERENCE_STORES,INTENTIONAL_EMPTY);
  var BLOCKED=Backup.EXPECTED_STORES.filter(function(store){return EXEMPT.indexOf(store)<0;});
  var MANIFEST='academic-authority-cutover-manifest';
  var COURSE_MANIFEST=[
    {courseId:'arc-course-wt',code:'WT',title:'Welding Technology'},
    {courseId:'arc-course-awt',code:'AWT',title:'Advanced Welding Technology'}
  ];

  function fail(code,message,context){throw new Storage.StorageError(code,message,context||{});}
  function row(rows,id){return rows.find(function(x){return x.id===id;});}
  function sameCourse(actual,expected){return actual&&actual.courseId===expected.courseId&&actual.code===expected.code&&actual.title===expected.title;}
  function acceptedCourses(rows){
    if(rows.length!==COURSE_MANIFEST.length)return false;
    var ordered=rows.slice().sort(function(a,b){return String(a.courseId).localeCompare(String(b.courseId));});
    var expected=COURSE_MANIFEST.slice().sort(function(a,b){return a.courseId.localeCompare(b.courseId);});
    return ordered.every(function(course,index){return sameCourse(course,expected[index]);});
  }
  function assertPackageOwnership(store,rows){
    rows.forEach(function(record){
      if(Object.prototype.hasOwnProperty.call(record,'importPackageId')&&record.importPackageId!==ACCEPTED_PACKAGE_ID){
        fail('REFERENCE_PACKAGE_MISMATCH','Instructional reference record belongs to an unapproved package.',{store:store,importPackageId:record.importPackageId});
      }
    });
  }
  function assertLessonPolicy(rows){
    rows.forEach(function(version){
      if(version.instructionalAvailability!=='reference_only'||version.ordinarySchedulingEligible!==false||version.autoBuildEligible!==false||Object.prototype.hasOwnProperty.call(version,'teachingGuide')){
        fail('LEGACY_LESSON_POLICY_VIOLATION','Preserved Lessons must remain reference-only, unavailable to ordinary scheduling and Auto Build, and without fabricated teaching guidance.',{lessonVersionId:version.lessonVersionId});
      }
    });
  }
  function assertReferenceChecksums(reference,recovery,expectedChecksums){
    if(reference.state!=='accepted-instructional-reference')return;
    var verifiedPackage=recovery&&recovery.verification&&recovery.verification.package;
    var manifest=verifiedPackage&&verifiedPackage.manifest;
    var stores=manifest&&manifest.stores;
    Object.keys(ACCEPTED_REFERENCE_CHECKSUMS).forEach(function(store){
      var expectedChecksum=expectedChecksums[store],expectedCount=store===S.courses?2:REFERENCE_COUNTS[store],actual=stores&&stores[store];
      if(!expectedChecksum||!actual||actual.recordCount!==expectedCount||actual.checksumAlgorithm!=='SHA-256'||actual.checksum!==expectedChecksum){
        fail('REFERENCE_CONTENT_CHECKSUM_MISMATCH','Verified recovery store checksum differs from the accepted instructional-reference content.',{store:store,expectedRecordCount:expectedCount,actualRecordCount:actual&&actual.recordCount,expectedChecksum:expectedChecksum||null,actualChecksum:actual&&actual.checksum||null});
      }
    });
  }

  function create(options){
    options=options||{};
    var storage=options.storage,backup=options.backup,actor=String(options.actor||''),now=options.now||function(){return new Date().toISOString();};
    var environment=options.environment||'production',realData=options.realStudentDataAuthorized===true;
    var expectedDatabaseName=String(options.expectedDatabaseName||Storage.DATABASE_NAME),requiredProtectionMode=String(options.requiredProtectionMode||'Production/Classroom Protected');
    var packageModule=options.packageModule||(getPackages&&getPackages()),acceptedReferenceChecksums=options.acceptedReferenceChecksums||ACCEPTED_REFERENCE_CHECKSUMS;
    if(!storage||!backup||!actor)throw Error('Academic cutover requires storage, backup, and actor authority.');
    if(!packageModule||typeof packageModule.create!=='function')throw Error('Academic cutover requires instructional-content package authority.');
    var academic=Academic.create({storage:storage,actor:actor,now:now});

    async function referencePrerequisite(db){
      var rowsByStore={},allEmpty=true;
      for(var store of REFERENCE_STORES){
        var rows=await db.query(store);rowsByStore[store]=rows;
        if(rows.length)allEmpty=false;
      }
      for(var absentStore of INTENTIONAL_EMPTY){
        var absent=await db.query(absentStore);
        if(absent.length)fail('INTENTIONAL_ABSENCE_VIOLATED','An instructional relationship frozen as intentionally absent is populated.',{store:absentStore,recordCount:absent.length});
      }
      var courses=await db.query(S.courses);
      if(allEmpty){
        if(courses.length!==0&&!acceptedCourses(courses))fail('CANONICAL_COURSE_MISMATCH','Historical empty Stage-1 authority may contain no Courses or only the exact canonical WT/AWT Courses.',{recordCount:courses.length});
        return{state:'empty-stage1',packageId:null,courses:courses};
      }
      REFERENCE_STORES.forEach(function(store){
        var rows=rowsByStore[store],expected=REFERENCE_COUNTS[store];
        if(rows.length!==expected)fail('REFERENCE_CONTENT_SHAPE_MISMATCH','Instructional reference store count differs from the accepted package.',{store:store,expectedRecordCount:expected,actualRecordCount:rows.length});
        assertPackageOwnership(store,rows);
      });
      if(!acceptedCourses(courses))fail('CANONICAL_COURSE_MISMATCH','Instructional reference authority requires the exact canonical WT/AWT Courses.',{courses:courses});
      assertLessonPolicy(rowsByStore[S.lessonVersions]);
      var packages=packageModule.create({storage:db,actor:actor,now:now});
      var history=await packages.getPackageHistory({packageId:ACCEPTED_PACKAGE_ID});
      if(history.length!==12)fail('REFERENCE_PACKAGE_MISMATCH','Accepted instructional package must have exactly twelve authority events.',{recordCount:history.length});
      history.forEach(function(event,index){
        if(event.packageId!==ACCEPTED_PACKAGE_ID||Number(event.sequence)!==index+1)fail('REFERENCE_PACKAGE_MISMATCH','Instructional package history identity or sequence differs from accepted authority.',{index:index,record:event});
      });
      if(history[11].recordType!=='PACKAGE_AVAILABLE')fail('REFERENCE_PACKAGE_MISMATCH','Instructional package event 12 must be PACKAGE_AVAILABLE.',{recordType:history[11]&&history[11].recordType});
      var projection=await packages.assertOrdinaryReadGate({packageId:ACCEPTED_PACKAGE_ID});
      if(projection.state!=='available'||projection.lastSequence!==12)fail('REFERENCE_PACKAGE_MISMATCH','Instructional package ordinary-read gate is not the accepted available authority.',{projection:projection});
      return{state:'accepted-instructional-reference',packageId:ACCEPTED_PACKAGE_ID,courses:courses,packageProjection:projection};
    }

    async function prerequisites(){
      if(storage.constants.databaseName!==expectedDatabaseName||storage.constants.schemaVersion!==8||storage.constants.indexedDbVersion!==Storage.IDB_VERSION){
        fail('PRODUCTION_IDENTITY_REQUIRED','Academic cutover requires its exact configured Schema-v8 authority.',{constants:storage.constants,expectedDatabaseName:expectedDatabaseName});
      }
      var db=await storage.open(),infra=await db.query(S.infrastructure),init=row(infra,'production-v8-initialization-manifest'),recon=row(infra,'production-v8-reconciliation-manifest'),protection=row(infra,'database-protection');
      if(!init||init.status!=='complete'||init.authorityState!=='V7_ONLY'||init.classroomAuthorityTransferred!==false)fail('STAGE1_PREREQUISITE_MISSING','Stage 1 initialization manifest is missing or incompatible.');
      if(!recon||recon.importedRecordCount!==0)fail('STAGE1_PREREQUISITE_MISSING','Stage 1 reconciliation manifest is missing or incompatible.');
      if(!protection||protection.mode!==requiredProtectionMode)fail('PROTECTION_REQUIRED','Configured protected authority is required.',{expectedMode:requiredProtectionMode});
      for(var transactionStore of CLASSROOM_TRANSACTIONS){
        var transactionRows=await db.query(transactionStore);
        if(transactionRows.length)fail('CLASSROOM_TRANSACTION_RECORDS_PRESENT','Student, Enrollment, and Schedule Assignment records block bounded academic cutover.',{store:transactionStore,recordCount:transactionRows.length});
      }
      for(var blockedStore of BLOCKED){
        var blockedRows=await db.query(blockedStore);
        if(blockedRows.length)fail('LATER_DOMAIN_RECORDS_PRESENT','Classroom transaction/domain records block bounded academic cutover.',{store:blockedStore,recordCount:blockedRows.length});
      }
      var reference=await referencePrerequisite(db);
      var audit=await backup.auditDatabase();
      if(!audit.healthy)fail('DATABASE_INTEGRITY_FAILED','Database integrity audit failed.',{audit:audit});
      var recovery=await backup.exportBackup({purpose:'pre-academic-cutover-recovery'});
      if(!recovery.verification.verified)fail('RECOVERY_VERIFICATION_FAILED','Academic cutover recovery package did not verify.');
      assertReferenceChecksums(reference,recovery,acceptedReferenceChecksums);
      return{db:db,init:init,reconciliation:recon,protection:protection,reference:reference,audit:audit,recovery:recovery};
    }

    async function courseManifest(){
      var courses=await academic.initialize();
      COURSE_MANIFEST.forEach(function(expected,index){if(!sameCourse(courses[index],expected))fail('COURSE_MANIFEST_MISMATCH','WT/AWT stable Course authority differs from approved manifest.');});
      return courses;
    }
    async function setupSummary(day){
      var db=await storage.open(),out={courses:await db.query(S.courses),schoolYears:await db.query(S.schoolYears),semesters:await db.query(S.semesters),gradingPeriods:await db.query(S.gradingPeriods),sections:await db.query(S.sections),students:await db.query(S.students),enrollments:await db.query(S.enrollments),scheduleAssignments:await db.query(S.scheduleAssignments)};
      if(day){out.rosters={};for(var sec of out.sections)out.rosters[sec.sectionId]=await academic.rosterForSection(sec.sectionId,day);}
      return out;
    }
    async function activate(authority){
      var gate=await prerequisites(),db=gate.db,courses=await courseManifest(),summary=await setupSummary();
      if(courses.length!==2||!summary.schoolYears.length||!summary.semesters.length||!summary.gradingPeriods.length||!summary.sections.length)fail('ACADEMIC_CONFIGURATION_INCOMPLETE','Manual academic configuration is incomplete.');
      if(summary.students.length||summary.enrollments.length||summary.scheduleAssignments.length)fail('REAL_DATA_NOT_AUTHORIZED','Stage 2 production activation requires an empty Student/roster authority until real-data authorization.');
      if(!authority||!authority.startingCommit||!authority.startingTree||!authority.rollbackRef)fail('ROLLBACK_AUTHORITY_REQUIRED','Academic cutover requires exact Git rollback authority.');
      var manifest={id:MANIFEST,type:'AcademicAuthorityCutoverManifest',status:'implemented-locally-physical-verification-pending',authorityState:'V7_ONLY',targetAuthorityState:'V8_AUTHORITATIVE',productionActivated:false,samsungVerified:false,v7WritesDisabled:false,realStudentDataAuthorized:false,courseIds:courses.map(function(x){return x.courseId;}),createdAt:now(),createdBy:actor,startingCommit:String(authority.startingCommit),startingTree:String(authority.startingTree),rollbackRef:String(authority.rollbackRef)};
      await db.put(S.infrastructure,manifest);
      return{manifest:manifest,recovery:gate.recovery,audit:gate.audit,summary:summary};
    }
    function manual(){
      return{verifyCourses:courseManifest,createSchoolYear:academic.createSchoolYear,createSemester:academic.createSemester,createGradingPeriod:academic.createGradingPeriod,createSection:academic.createSection,archiveSection:academic.archiveSection,createStudent:function(input){if(environment==='production'&&!realData)fail('REAL_DATA_NOT_AUTHORIZED','Real student production data is not authorized.');return academic.createStudent(input);},updateStudent:academic.updateStudent,archiveStudent:academic.archiveStudent,createEnrollment:function(input){if(environment==='production'&&!realData)fail('REAL_DATA_NOT_AUTHORIZED','Real student production data is not authorized.');return academic.createEnrollment(input);},closeEnrollment:academic.closeEnrollment,assignSection:academic.createScheduleAssignment,endAssignment:academic.endScheduleAssignment,moveSection:academic.moveEnrollment,rosterForSection:academic.rosterForSection,gradingPeriodForDate:academic.gradingPeriodForDate,summary:setupSummary};
    }
    return{preflight:prerequisites,activate:activate,manual:manual(),constants:{manifestId:MANIFEST,currentAuthorityState:'V7_ONLY',targetAuthorityState:'V8_AUTHORITATIVE',acceptedInstructionalPackageId:ACCEPTED_PACKAGE_ID,acceptedReferenceStoreChecksums:Object.assign({},ACCEPTED_REFERENCE_CHECKSUMS),academicStores:ACADEMIC.slice(),configurableAcademicStores:CONFIGURABLE.slice(),referenceStoreCounts:Object.assign({},REFERENCE_COUNTS),intentionalEmptyStores:INTENTIONAL_EMPTY.slice(),laterStores:BLOCKED.slice()}};
  }
  return{create:create};
}));
