/* ARC Schema v8 Storage Foundation.
   Infrastructure only: loading this module never opens, upgrades, or resets a
   database. Classroom domains continue to use the Schema v7 runtime. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcV8Storage=api;
}(this,function(){
  'use strict';
  var DATABASE_NAME='arc_classroom_v8';
  var IDB_VERSION=3;
  var SCHEMA_FAMILY='arc-classroom';
  var SCHEMA_VERSION=8;
  var STORES=Object.freeze({metadata:'metadata',migrations:'migration_log',infrastructure:'infrastructure_records',students:'students',courses:'courses',schoolYears:'school_years',semesters:'semesters',gradingPeriods:'grading_periods',sections:'sections',enrollments:'course_enrollments',scheduleAssignments:'enrollment_schedule_assignments',activityDefinitions:'activity_definitions',activityVersions:'activity_versions',activityDeclarations:'activity_evidence_declarations',activityAssignments:'activity_assignments',studentActivities:'student_activities',activityAttempts:'activity_attempts'});
  var STORE_NAMES=Object.freeze(Object.keys(STORES).map(function(key){return STORES[key];}));

  function StorageError(code,message,context,cause){
    this.name='ArcV8StorageError';this.code=code;this.message=message;
    this.context=context||{};if(cause)this.cause=cause;
    if(Error.captureStackTrace)Error.captureStackTrace(this,StorageError);
  }
  StorageError.prototype=Object.create(Error.prototype);
  StorageError.prototype.constructor=StorageError;
  function error(code,message,context,cause){return new StorageError(code,message,context,cause);}
  function iso(now){return (now?now():new Date()).toISOString();}
  function requestPromise(request,context){return new Promise(function(resolve,reject){request.onsuccess=function(){resolve(request.result);};request.onerror=function(){reject(error('REQUEST_FAILED','IndexedDB request failed.',context,request.error));};});}
  function transactionDone(tx,context){return new Promise(function(resolve,reject){tx.oncomplete=function(){resolve();};tx.onabort=function(){reject(error('TRANSACTION_ABORTED','IndexedDB transaction aborted.',context,tx.error));};tx.onerror=function(){};});}
  function assertStore(name){if(STORE_NAMES.indexOf(name)<0)throw error('UNKNOWN_STORE','Unknown ARC v8 infrastructure store.',{store:name});}
  function clone(value){return value===undefined?undefined:JSON.parse(JSON.stringify(value));}

  function uuid(cryptoProvider){
    var c=cryptoProvider||(typeof crypto!=='undefined'?crypto:null);
    if(c&&typeof c.randomUUID==='function')return c.randomUUID();
    if(!c||typeof c.getRandomValues!=='function')throw error('SECURE_RANDOM_UNAVAILABLE','Secure random UUID generation is unavailable.');
    var bytes=new Uint8Array(16);c.getRandomValues(bytes);bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
    var h=Array.prototype.map.call(bytes,function(x){return x.toString(16).padStart(2,'0');}).join('');
    return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20);
  }
  function validId(value){return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value||''));}

  function nativeDriver(indexedDBProvider){
    var idb=indexedDBProvider||(typeof indexedDB!=='undefined'?indexedDB:null);
    if(!idb)throw error('INDEXEDDB_UNAVAILABLE','IndexedDB is required for ARC Schema v8 durable storage.');
    function open(config){return new Promise(function(resolve,reject){
      var request,settled=false;
      try{request=idb.open(config.name,config.version);}catch(e){return reject(error('OPEN_FAILED','ARC v8 database could not be opened.',{database:config.name},e));}
      request.onupgradeneeded=function(event){
        try{config.upgrade(request.result,event.oldVersion,event.newVersion,request.transaction);}
        catch(e){try{request.transaction.abort();}catch(ignore){} config.upgradeError=e;}
      };
      request.onblocked=function(){if(settled)return;settled=true;config.blocked();reject(error('UPGRADE_BLOCKED','ARC v8 database upgrade is blocked by another open tab.',{database:config.name,requestedVersion:config.version}));};
      request.onerror=function(){if(settled)return;settled=true;var cause=config.upgradeError||request.error,code=cause&&cause.name==='VersionError'?'INCOMPATIBLE_DATABASE_VERSION':'OPEN_FAILED';reject(cause instanceof StorageError?cause:error(code,code==='INCOMPATIBLE_DATABASE_VERSION'?'The stored ARC database is newer than this build supports.':'ARC v8 database could not be opened.',{database:config.name,requestedVersion:config.version},cause));};
      request.onsuccess=function(){if(settled){request.result.close();return;}settled=true;resolve(request.result);};
    });}
    function remove(name,blocked){return new Promise(function(resolve,reject){var request,settled=false;try{request=idb.deleteDatabase(name);}catch(e){return reject(error('RESET_FAILED','ARC v8 development reset could not start.',{database:name},e));}request.onblocked=function(){if(settled)return;settled=true;if(blocked)blocked();reject(error('RESET_BLOCKED','ARC v8 development reset is blocked by another open tab.',{database:name}));};request.onerror=function(){if(settled)return;settled=true;reject(error('RESET_FAILED','ARC v8 development reset failed.',{database:name},request.error));};request.onsuccess=function(){if(settled)return;settled=true;resolve();};});}
    return {open:open,remove:remove};
  }

  function create(options){
    options=options||{};
    var driver=options.driver||nativeDriver(options.indexedDB);
    var now=options.now||function(){return new Date();};
    var build=options.build||{};
    var channelFactory=options.channelFactory||(typeof window!=='undefined'&&typeof BroadcastChannel!=='undefined'?function(name){return new BroadcastChannel(name);}:null);
    var onBlocked=options.onBlocked||function(){};
    var channel=null,connection=null,opening=null;
    function announce(type,detail){if(channel&&typeof channel.postMessage==='function')channel.postMessage({source:'arc-v8-storage',type:type,database:DATABASE_NAME,detail:detail||{},at:iso(now)});}
    function upgrade(db,oldVersion,newVersion,tx){
      if(oldVersion<0||oldVersion>=newVersion)throw error('INVALID_UPGRADE_PATH','Invalid ARC v8 IndexedDB upgrade path.',{oldVersion:oldVersion,newVersion:newVersion});
      var at=iso(now);
      if(oldVersion<1){
        var metadata=db.createObjectStore(STORES.metadata,{keyPath:'key'});
        var migrations=db.createObjectStore(STORES.migrations,{keyPath:'id'});
        db.createObjectStore(STORES.infrastructure,{keyPath:'id'});
        metadata.add({key:'database',schemaFamily:SCHEMA_FAMILY,schemaVersion:SCHEMA_VERSION,indexedDbVersion:IDB_VERSION,createdAt:at,lastSuccessfulUpgrade:{fromIndexedDbVersion:2,toIndexedDbVersion:3,at:at},build:{version:String(build.version||''),build:String(build.build||'')},initializationState:'ready'});
        migrations.add({id:'indexeddb-0-to-1',fromIndexedDbVersion:0,toIndexedDbVersion:1,status:'succeeded',startedAt:at,completedAt:at,schemaVersion:SCHEMA_VERSION});
      }
      if(oldVersion<2){
        function store(name,key){return db.createObjectStore(name,{keyPath:key});}
        var students=store(STORES.students,'studentId');students.createIndex('by_lifecycle','lifecycle',{unique:false});
        var courses=store(STORES.courses,'courseId');courses.createIndex('by_code','code',{unique:true});courses.createIndex('by_lifecycle','lifecycle',{unique:false});
        var years=store(STORES.schoolYears,'schoolYearId');years.createIndex('by_lifecycle','lifecycle',{unique:false});
        var semesters=store(STORES.semesters,'semesterId');semesters.createIndex('by_school_year','schoolYearId',{unique:false});
        var periods=store(STORES.gradingPeriods,'gradingPeriodId');periods.createIndex('by_semester','semesterId',{unique:false});periods.createIndex('by_school_year','schoolYearId',{unique:false});
        var sections=store(STORES.sections,'sectionId');sections.createIndex('by_school_year','schoolYearId',{unique:false});sections.createIndex('by_course','courseId',{unique:false});sections.createIndex('by_semester','semesterId',{unique:false});sections.createIndex('by_period','period',{unique:false});
        var enrollments=store(STORES.enrollments,'enrollmentId');enrollments.createIndex('by_student','studentId',{unique:false});enrollments.createIndex('by_course_year',['courseId','schoolYearId'],{unique:false});enrollments.createIndex('by_student_course_year',['studentId','courseId','schoolYearId'],{unique:false});
        var assignments=store(STORES.scheduleAssignments,'scheduleAssignmentId');assignments.createIndex('by_enrollment','enrollmentId',{unique:false});assignments.createIndex('by_section','sectionId',{unique:false});
        (oldVersion<1?migrations:tx.objectStore(STORES.migrations)).add({id:'indexeddb-1-to-2',fromIndexedDbVersion:1,toIndexedDbVersion:2,status:'succeeded',startedAt:at,completedAt:at,schemaVersion:SCHEMA_VERSION});
        if(oldVersion===1&&newVersion===2){var metaStore=tx.objectStore(STORES.metadata),getMeta=metaStore.get('database');getMeta.onsuccess=function(){var value=getMeta.result;if(!value)return;value.indexedDbVersion=2;value.lastSuccessfulUpgrade={fromIndexedDbVersion:1,toIndexedDbVersion:2,at:at};value.build={version:String(build.version||''),build:String(build.build||'')};metaStore.put(value);};}
      }
      if(oldVersion<3){
        function activityStore(name,key){return db.createObjectStore(name,{keyPath:key});}
        var definitions=activityStore(STORES.activityDefinitions,'definitionId');definitions.createIndex('by_type','type',{unique:false});definitions.createIndex('by_lifecycle','lifecycle',{unique:false});definitions.createIndex('by_course','courseIds',{unique:false,multiEntry:true});
        var versions=activityStore(STORES.activityVersions,'versionId');versions.createIndex('by_definition','definitionId',{unique:false});versions.createIndex('by_definition_number',['definitionId','versionNumber'],{unique:true});versions.createIndex('by_publication','publicationState',{unique:false});
        var declarations=activityStore(STORES.activityDeclarations,'declarationId');declarations.createIndex('by_version','versionId',{unique:false});
        var assignments=activityStore(STORES.activityAssignments,'assignmentId');assignments.createIndex('by_version','versionId',{unique:false});assignments.createIndex('by_section','sectionId',{unique:false});assignments.createIndex('by_assigned_date','assignedDate',{unique:false});
        var studentActivities=activityStore(STORES.studentActivities,'studentActivityId');studentActivities.createIndex('by_student','studentId',{unique:false});studentActivities.createIndex('by_enrollment','enrollmentId',{unique:false});studentActivities.createIndex('by_assignment','assignmentId',{unique:false});studentActivities.createIndex('by_version','versionId',{unique:false});studentActivities.createIndex('by_workflow','workflowState',{unique:false});studentActivities.createIndex('by_assignment_student',['assignmentId','studentId'],{unique:true});
        var attempts=activityStore(STORES.activityAttempts,'attemptId');attempts.createIndex('by_student_activity','studentActivityId',{unique:false});attempts.createIndex('by_activity_sequence',['studentActivityId','sequence'],{unique:true});attempts.createIndex('by_workflow','workflowState',{unique:false});
        (oldVersion<1?migrations:tx.objectStore(STORES.migrations)).add({id:'indexeddb-2-to-3',fromIndexedDbVersion:2,toIndexedDbVersion:3,status:'succeeded',startedAt:at,completedAt:at,schemaVersion:SCHEMA_VERSION});
        if(oldVersion>0){var stage3Meta=tx.objectStore(STORES.metadata),stage3Get=stage3Meta.get('database');stage3Get.onsuccess=function(){var value=stage3Get.result;if(!value)return;value.indexedDbVersion=3;value.lastSuccessfulUpgrade={fromIndexedDbVersion:2,toIndexedDbVersion:3,at:at};value.build={version:String(build.version||''),build:String(build.build||'')};stage3Meta.put(value);};}
      }
      if(oldVersion>2)throw error('MISSING_UPGRADE','No ordered ARC v8 upgrade is registered.',{oldVersion:oldVersion,newVersion:newVersion});
      if(tx)tx.arcUpgrade={from:oldVersion,to:newVersion,status:'in_progress'};
    }
    function transact(db,stores,mode,operation){
      stores=(Array.isArray(stores)?stores:[stores]);stores.forEach(assertStore);
      var tx;
      try{tx=db.transaction(stores,mode);}catch(e){return Promise.reject(error('TRANSACTION_START_FAILED','ARC v8 transaction could not start.',{stores:stores,mode:mode},e));}
      var done=transactionDone(tx,{stores:stores,mode:mode});
      var api={
        get:function(store,key){assertStore(store);return requestPromise(tx.objectStore(store).get(key),{store:store,operation:'get',key:key});},
        add:function(store,value){assertStore(store);return requestPromise(tx.objectStore(store).add(clone(value)),{store:store,operation:'add'});},
        put:function(store,value){assertStore(store);return requestPromise(tx.objectStore(store).put(clone(value)),{store:store,operation:'put'});},
        delete:function(store,key){assertStore(store);return requestPromise(tx.objectStore(store).delete(key),{store:store,operation:'delete',key:key});},
        query:function(store,indexName,key){assertStore(store);var source=indexName?tx.objectStore(store).index(indexName):tx.objectStore(store);return requestPromise(key===undefined?source.getAll():source.getAll(key),{store:store,index:indexName||'',operation:'query'});},
        abort:function(reason){try{tx.abort();}catch(ignore){}throw error('TRANSACTION_ABORTED',reason||'ARC v8 transaction was explicitly aborted.',{stores:stores,mode:mode});}
      };
      var result;
      try{result=operation(api);}catch(e){try{tx.abort();}catch(ignore){}return done.then(function(){throw e;},function(){throw e;});}
      return Promise.resolve(result).then(function(value){return done.then(function(){return value;});},function(e){try{tx.abort();}catch(ignore){}return done.then(function(){throw e;},function(){throw e;});});
    }
    function validateMetadata(db){return transact(db,STORES.metadata,'readonly',function(tx){return tx.get(STORES.metadata,'database');}).then(function(meta){
      if(!meta||meta.schemaFamily!==SCHEMA_FAMILY||meta.schemaVersion!==SCHEMA_VERSION||meta.indexedDbVersion!==IDB_VERSION||meta.initializationState!=='ready')throw error('METADATA_INCONSISTENT','ARC v8 database metadata is missing or inconsistent.',{metadata:meta||null,expectedSchemaVersion:SCHEMA_VERSION,expectedIndexedDbVersion:IDB_VERSION});
      return meta;
    });}
    function open(){
      if(connection)return Promise.resolve(connection);
      if(opening)return opening;
      if(channelFactory&&!channel){try{channel=channelFactory('arc-v8-storage-coordination');}catch(ignore){channel=null;}}
      opening=driver.open({name:DATABASE_NAME,version:IDB_VERSION,upgrade:upgrade,blocked:function(){onBlocked({database:DATABASE_NAME,operation:'open'});announce('upgrade-blocked');}}).then(function(db){
        db.onversionchange=function(event){try{db.close();}finally{connection=null;announce('stale-connection-closed',{oldVersion:event.oldVersion,newVersion:event.newVersion});}};
        return validateMetadata(db).then(function(metadata){connection={
          metadata:metadata,
          read:function(store,key){return transact(db,store,'readonly',function(tx){return tx.get(store,key);});},
          add:function(store,value){return transact(db,store,'readwrite',function(tx){return tx.add(store,value);});},
          put:function(store,value){return transact(db,store,'readwrite',function(tx){return tx.put(store,value);});},
          putIfRevision:function(store,value,expectedRevision){return transact(db,store,'readwrite',function(tx){return tx.get(store,value.id).then(function(current){var actual=current&&Number.isInteger(current.revision)?current.revision:0;if(actual!==expectedRevision)throw error('WRITE_CONFLICT','ARC v8 record changed after it was read.',{store:store,id:value.id,expectedRevision:expectedRevision,actualRevision:actual});var next=clone(value);next.revision=actual+1;return tx.put(store,next).then(function(){return next;});});});},
          delete:function(store,key){return transact(db,store,'readwrite',function(tx){return tx.delete(store,key);});},
          query:function(store,indexName,key){return transact(db,store,'readonly',function(tx){return tx.query(store,indexName,key);});},
          transaction:function(stores,operation){return transact(db,stores,'readwrite',operation);},
          close:function(){db.close();connection=null;announce('connection-closed');}
        };announce('connection-opened');return connection;},function(e){db.close();throw e;});
      }).catch(function(e){connection=null;throw e;}).finally(function(){opening=null;});
      return opening;
    }
    function resetDevelopmentDatabase(){
      if(connection)connection.close();
      return driver.remove(DATABASE_NAME,function(){onBlocked({database:DATABASE_NAME,operation:'reset'});announce('reset-blocked');}).then(function(){announce('development-reset-complete');});
    }
    return {open:open,resetDevelopmentDatabase:resetDevelopmentDatabase,generateId:function(){return uuid(options.crypto);},validId:validId,constants:{databaseName:DATABASE_NAME,indexedDbVersion:IDB_VERSION,schemaFamily:SCHEMA_FAMILY,schemaVersion:SCHEMA_VERSION,stores:STORES}};
  }
  return {create:create,nativeDriver:nativeDriver,generateId:uuid,validId:validId,StorageError:StorageError,DATABASE_NAME:DATABASE_NAME,IDB_VERSION:IDB_VERSION,SCHEMA_FAMILY:SCHEMA_FAMILY,SCHEMA_VERSION:SCHEMA_VERSION,STORES:STORES};
}));
