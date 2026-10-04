const assert=require('assert'),fs=require('fs');
const Storage=require('../src/arc_v8_storage');
const Boundary=require('../src/arc_instructional_reference_boundary');
const PKG=Boundary.PACKAGE_ID;
const EXPECTED_STORES=Array.from(new Set(Object.values(Storage.STORES))).sort();

function fakeIndexedDB(options={}){
  let exists=options.exists!==false,version=options.version===undefined?Storage.IDB_VERSION:options.version;
  const stores=(options.stores||EXPECTED_STORES).slice(),calls=[],state={upgradeCalls:0,abortCalls:0,closeCalls:0};
  return{calls,state,get exists(){return exists},open:function(name,requestedVersion){
    const request={result:null,error:null,transaction:null},argCount=arguments.length;
    calls.push({name,args:argCount,version:argCount>1?requestedVersion:null});
    queueMicrotask(()=>{
      if(!exists){
        state.upgradeCalls++;let aborted=false;
        request.result={version:requestedVersion||1,objectStoreNames:[],close(){state.closeCalls++}};
        request.transaction={abort(){aborted=true;state.abortCalls++;exists=false}};
        if(request.onupgradeneeded)request.onupgradeneeded({oldVersion:0,newVersion:requestedVersion||1});
        if(aborted){request.error=new Error('AbortError');if(request.onerror)request.onerror();return}
        exists=true;if(request.onsuccess)request.onsuccess();return;
      }
      request.result={version,objectStoreNames:stores.slice(),close(){state.closeCalls++}};
      if(argCount>1&&requestedVersion>version){state.upgradeCalls++;if(request.onupgradeneeded)request.onupgradeneeded({oldVersion:version,newVersion:requestedVersion});version=requestedVersion}
      if(request.onsuccess)request.onsuccess();
    });
    return request;
  }};
}

function fixture(options={}){
  let gateCalls=0,ownerCalls=[],available=options.available!==false;
  const indexedDB=options.indexedDB||fakeIndexedDB(),counts={WT:{standards:9,essentials:4,items:29},AWT:{standards:20,essentials:6,items:27}};
  const code=id=>id==='arc-course-wt'?'WT':'AWT';
  const packageAuthority={assertOrdinaryReadGate:async input=>{gateCalls++;assert.equal(input.packageId,PKG);if(!available)throw new Storage.StorageError('PACKAGE_READ_GATE_CLOSED','Package unavailable.');return{state:'available'};}};
  const curriculum={
    getCourseStandards:async input=>{ownerCalls.push(['getCourseStandards',input]);let c=code(input.courseId),n=counts[c].standards;return{catalogs:[{courseId:input.courseId}],catalogVersions:[{standardCatalogVersionId:c+'-catalog-v1'}],standards:Array.from({length:n},(_,i)=>({definition:{courseId:options.wrongOwnerCourse&&i===0?'arc-course-awt':input.courseId},version:{standardVersionId:c+'-standard-'+i}}))};},
    getEssentialStandards:async input=>{ownerCalls.push(['getEssentialStandards',input]);let c=code(input.courseId);return{designations:Array.from({length:counts[c].essentials},(_,i)=>({courseId:input.courseId,essentialStandardDesignationId:c+'-essential-'+i}))};},
    getCurriculumMap:async input=>{ownerCalls.push(['getCurriculumMap',input]);let c=code(input.courseId);return{map:{courseId:input.courseId,curriculumMapId:c+'-map'},version:{courseId:input.courseId,curriculumMapVersionId:c+'-map-v1'},items:Array.from({length:counts[c].items},(_,i)=>({item:{courseId:input.courseId,curriculumMapItemId:c+'-item-'+i}}))};},
    getCurriculumItem:async input=>{ownerCalls.push(['getCurriculumItem',input]);let c=input.curriculumMapItemId.startsWith('WT-')?'WT':'AWT';return{item:{courseId:c==='WT'?'arc-course-wt':'arc-course-awt',curriculumMapItemId:input.curriculumMapItemId},standardLinks:[]};},
    getCurriculumCoverage:async input=>{ownerCalls.push(['getCurriculumCoverage',input]);let c=input.curriculumMapVersionId.startsWith('WT-')?'WT':'AWT';return{courseId:c==='WT'?'arc-course-wt':'arc-course-awt',curriculumMapVersionId:input.curriculumMapVersionId,itemCount:counts[c].items};}
  };
  return{api:Boundary.create({indexedDB,services:{packageAuthority,curriculum}}),indexedDB,get gateCalls(){return gateCalls},ownerCalls};
}

let pass=0,total=0;async function test(name,fn){total++;try{await fn();pass++;console.log('PASS',name)}catch(error){console.error('FAIL',name,error);process.exitCode=1}}
(async()=>{
await test('construction is inert and performs no database package or owner read',async()=>{let f=fixture();assert.equal(f.indexedDB.calls.length,0);assert.equal(f.gateCalls,0);assert.equal(f.ownerCalls.length,0)});
await test('surface contains only approved reference reads and constants',async()=>{let f=fixture(),keys=Object.keys(f.api).sort();assert.deepEqual(keys,['constants','getCurriculumCoverage','getCurriculumItem','getCurriculumMap','getEssentialStandards','getStandards']);for(const forbidden of ['write','create','update','delete','getSectionPacing','getSectionPacingHistory','appendPacingCommand','getLessons','getCompetencies','getStudents','getEvidence','getGradebook'])assert.equal(f.api[forbidden],undefined)});
await test('exact IDB 14 and exact 74-store manifest proceed to package and owner reads',async()=>{assert.equal(EXPECTED_STORES.length,74);let f=fixture(),result=await f.api.getStandards({course:'WT'});assert.equal(result.standards.length,9);assert.deepEqual(f.indexedDB.calls,[{name:'arc_classroom_v8',args:1,version:null}]);assert.equal(f.indexedDB.state.closeCalls,1);assert.equal(f.gateCalls,1);assert.equal(f.ownerCalls.length,1)});
await test('native inspection connection remains open until same-version owner open succeeds',async()=>{
  let idb=fakeIndexedDB(),events=[],packageAuthority={assertOrdinaryReadGate:async()=>({state:'available'})},curriculum={getCourseStandards:async input=>({catalogs:[{courseId:input.courseId}],catalogVersions:[],standards:[]})};
  let api=Boundary.create({indexedDB:idb,storageFactory:()=>({constants:{},generateId:()=>'',open:async()=>{events.push('owner-open');assert.equal(idb.state.closeCalls,0);idb.calls.push({name:'arc_classroom_v8',args:2,version:14});return{}}}),packageFactory:()=>packageAuthority,curriculumFactory:()=>curriculum});
  await api.getStandards({course:'WT'});assert.deepEqual(events,['owner-open']);assert.equal(idb.state.closeCalls,1);assert.deepEqual(idb.calls.map(x=>x.args),[1,2]);
});
await test('existing IDB 13 fails before any versioned open or upgrade callback',async()=>{let f=fixture({indexedDB:fakeIndexedDB({version:13})});await assert.rejects(f.api.getStandards({course:'WT'}),e=>e.code==='REFERENCE_DATABASE_VERSION_MISMATCH');assert.deepEqual(f.indexedDB.calls.map(x=>x.args),[1]);assert.equal(f.indexedDB.state.upgradeCalls,0);assert.equal(f.gateCalls,0);assert.equal(f.ownerCalls.length,0)});
await test('newer IndexedDB version fails before owner or package access',async()=>{let f=fixture({indexedDB:fakeIndexedDB({version:15})});await assert.rejects(f.api.getStandards({course:'WT'}),e=>e.code==='REFERENCE_DATABASE_VERSION_MISMATCH');assert.deepEqual(f.indexedDB.calls.map(x=>x.args),[1]);assert.equal(f.indexedDB.state.upgradeCalls,0);assert.equal(f.gateCalls,0)});
await test('absent database creation is aborted and database remains absent',async()=>{let f=fixture({indexedDB:fakeIndexedDB({exists:false})});await assert.rejects(f.api.getStandards({course:'WT'}),e=>e.code==='REFERENCE_DATABASE_REQUIRED');assert.equal(f.indexedDB.exists,false);assert.equal(f.indexedDB.state.upgradeCalls,1);assert.equal(f.indexedDB.state.abortCalls,1);assert.deepEqual(f.indexedDB.calls.map(x=>x.args),[1]);assert.equal(f.gateCalls,0)});
await test('missing and extra stores fail closed before package or owner access',async()=>{for(const stores of [EXPECTED_STORES.slice(1),EXPECTED_STORES.concat('unexpected_store')]){let f=fixture({indexedDB:fakeIndexedDB({stores})});await assert.rejects(f.api.getStandards({course:'WT'}),e=>e.code==='REFERENCE_STORE_MANIFEST_MISMATCH');assert.equal(f.gateCalls,0);assert.equal(f.ownerCalls.length,0)}});
await test('structural preflight failure constructs no storage package or Curriculum owner',async()=>{let calls=[];let api=Boundary.create({indexedDB:fakeIndexedDB({version:13}),storageFactory:()=>{calls.push('storage')},packageFactory:()=>{calls.push('package')},curriculumFactory:()=>{calls.push('curriculum')}});await assert.rejects(api.getStandards({course:'WT'}),e=>e.code==='REFERENCE_DATABASE_VERSION_MISMATCH');assert.deepEqual(calls,[])});
await test('WT and AWT Standards remain separate canonical owner reads',async()=>{let f=fixture(),wt=await f.api.getStandards({course:'WT'}),awt=await f.api.getStandards({course:'AWT'});assert.equal(wt.standards.length,9);assert.equal(awt.standards.length,20);assert.deepEqual(f.ownerCalls.map(x=>x[1].courseId),['arc-course-wt','arc-course-awt']);assert.equal(f.gateCalls,2)});
await test('available package returns exact Essential and Curriculum counts',async()=>{let f=fixture(),wtE=await f.api.getEssentialStandards({course:'WT'}),awtE=await f.api.getEssentialStandards({course:'AWT'}),wtM=await f.api.getCurriculumMap({course:'WT'}),awtM=await f.api.getCurriculumMap({course:'AWT'});assert.deepEqual([wtE.designations.length,awtE.designations.length],[4,6]);assert.deepEqual([wtM.items.length,awtM.items.length],[29,27])});
await test('Curriculum item and coverage reads remain Course-scoped owner delegates',async()=>{let f=fixture(),item=await f.api.getCurriculumItem({course:'WT',curriculumMapItemId:'WT-item-3'}),coverage=await f.api.getCurriculumCoverage({course:'AWT'});assert.equal(item.item.courseId,'arc-course-wt');assert.equal(coverage.itemCount,27);assert(f.ownerCalls.some(x=>x[0]==='getCurriculumItem'));assert(f.ownerCalls.some(x=>x[0]==='getCurriculumCoverage'))});
await test('unavailable package fails closed before any curriculum owner read',async()=>{let f=fixture({available:false});await assert.rejects(f.api.getStandards({course:'WT'}),e=>e.code==='PACKAGE_READ_GATE_CLOSED');assert.equal(f.ownerCalls.length,0)});
await test('wrong database package Course and cross-Course owner identities fail closed',async()=>{assert.throws(()=>Boundary.create({databaseName:'arc_classroom_v8_stage2_verification'}),e=>e.code==='REFERENCE_DATABASE_MISMATCH');assert.throws(()=>Boundary.create({packageId:'another-package'}),e=>e.code==='REFERENCE_PACKAGE_MISMATCH');let f=fixture();await assert.rejects(f.api.getStandards({course:'OTHER'}),e=>e.code==='REFERENCE_COURSE_REQUIRED');assert.equal(f.indexedDB.calls.length,0);let cross=fixture({wrongOwnerCourse:true});await assert.rejects(cross.api.getStandards({course:'WT'}),e=>e.code==='REFERENCE_COURSE_MISMATCH')});
await test('boundary reads no stores directly and normal ARC stays Schema 7 V7_ONLY unwired',async()=>{let source=fs.readFileSync('src/arc_instructional_reference_boundary.js','utf8'),index=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');for(const token of ['.query(','.read(','.put(','.add(','deleteDatabase('])assert(!source.includes(token));assert(index.includes('const CURRENT_SCHEMA_VERSION = 7;'));assert(!index.includes('arc_instructional_reference_boundary'));assert(!sw.includes('arc_instructional_reference_boundary'))});
if(!process.exitCode)console.log(`\n${pass}/${total} ARC instructional reference read boundary tests passed.`)
})();
