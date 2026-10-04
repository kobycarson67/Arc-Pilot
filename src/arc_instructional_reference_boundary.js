/* ARC instructional reference read boundary.
   Read-only and inert: construction never opens IndexedDB or invokes an owner. */
(function(root,factory){
  var api=factory(
    root.ArcV8Storage||(typeof require==='function'?require('./arc_v8_storage'):null),
    root.ArcV8InstructionalContentPackages||(typeof require==='function'?require('./arc_v8_instructional_content_packages'):null),
    root.ArcV8CurriculumPacing||(typeof require==='function'?require('./arc_v8_curriculum_pacing'):null)
  );
  if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcInstructionalReferenceBoundary=api;
}(this,function(Storage,Packages,Curriculum){
  'use strict';
  var DATABASE_NAME='arc_classroom_v8';
  var PACKAGE_ID='ae06a3f8-cd1b-4a2a-943f-2f3d4e1f3f3b';
  var AUTHORITY_STATE='V7_ONLY';
  var COURSES=Object.freeze({WT:'arc-course-wt',AWT:'arc-course-awt'});
  function fail(code,message,context,cause){throw new Storage.StorageError(code,message,context||{},cause);}
  function copy(value){return value===undefined?undefined:structuredClone(value);}
  function text(value){return String(value==null?'':value).trim();}
  function courseId(value){var key=text(value).toUpperCase();if(!Object.prototype.hasOwnProperty.call(COURSES,key))fail('REFERENCE_COURSE_REQUIRED','Instructional reference reads accept only canonical WT or AWT Course scope.',{course:value||null,allowed:Object.keys(COURSES)});return COURSES[key];}
  function ensureCourse(expected,actual,operation){if(text(actual)!==expected)fail('REFERENCE_COURSE_MISMATCH','Instructional reference owner returned another Course scope.',{operation:operation,expectedCourseId:expected,actualCourseId:actual||null});}
  function validateStandards(result,expected){(result.catalogs||[]).forEach(function(row){ensureCourse(expected,row.courseId,'getCourseStandards');});(result.standards||[]).forEach(function(row){ensureCourse(expected,(row.definition||row).courseId,'getCourseStandards');});return result;}
  function validateMap(result,expected){if(!result)return result;ensureCourse(expected,(result.map||result.version||result).courseId,'getCurriculumMap');(result.items||[]).forEach(function(row){ensureCourse(expected,(row.item||row).courseId,'getCurriculumMap');});return result;}
  function create(options){
    options=options||{};
    var databaseName=text(options.databaseName||DATABASE_NAME),packageId=text(options.packageId||PACKAGE_ID),indexedDBApi=options.indexedDB||(typeof indexedDB!=='undefined'?indexedDB:null),cryptoApi=options.crypto||(typeof crypto!=='undefined'?crypto:null),services=options.services||null,opening=null;
    if(databaseName!==DATABASE_NAME)fail('REFERENCE_DATABASE_MISMATCH','Accepted production instructional references require exact arc_classroom_v8 identity.',{expected:DATABASE_NAME,actual:databaseName});
    if(packageId!==PACKAGE_ID)fail('REFERENCE_PACKAGE_MISMATCH','Instructional reference reads require the accepted physical package identity.',{expected:PACKAGE_ID,actual:packageId});
    async function getServices(){
      if(services)return services;
      if(opening)return opening;
      opening=(async function(){
        var controller=Storage.create({databaseName:DATABASE_NAME,indexedDB:indexedDBApi,crypto:cryptoApi}),db=await controller.open();
        db.constants=controller.constants;db.generateId=controller.generateId;
        var packageAuthority=Packages.create({storage:db,actor:'instructional-reference-read-boundary'});
        var curriculum=Curriculum.create({storage:db,packageAuthority:packageAuthority,crypto:cryptoApi,actor:'instructional-reference-read-boundary'});
        return{packageAuthority:packageAuthority,curriculum:curriculum};
      }()).then(function(value){services=value;return value;},function(error){opening=null;throw error;});
      return opening;
    }
    async function gated(){var value=await getServices();if(!value.packageAuthority||typeof value.packageAuthority.assertOrdinaryReadGate!=='function'||!value.curriculum)fail('REFERENCE_OWNER_UNAVAILABLE','Accepted package and Curriculum owners are required.');await value.packageAuthority.assertOrdinaryReadGate({packageId:PACKAGE_ID});return value.curriculum;}
    async function getStandards(input){var id=courseId(input&&input.course),owner=await gated(),result=await owner.getCourseStandards({courseId:id});return copy(validateStandards(result,id));}
    async function getEssentials(input){var id=courseId(input&&input.course),owner=await gated(),standards=validateStandards(await owner.getCourseStandards({courseId:id}),id),versions=standards.catalogVersions||[];if(versions.length!==1)fail('REFERENCE_CATALOG_AMBIGUOUS','Reference Course must resolve one authoritative Standard Catalog Version.',{courseId:id,count:versions.length});var result=await owner.getEssentialStandards({courseId:id,catalogVersionId:versions[0].standardCatalogVersionId});(result.designations||[]).forEach(function(row){ensureCourse(id,row.courseId,'getEssentialStandards');});return copy(result);}
    async function getMap(input){var id=courseId(input&&input.course),owner=await gated(),result=await owner.getCurriculumMap({courseId:id});return copy(validateMap(result,id));}
    async function getItem(input){var id=courseId(input&&input.course),itemId=text(input&&input.curriculumMapItemId);if(!itemId)fail('REFERENCE_ITEM_REQUIRED','Curriculum item identity is required.');var owner=await gated(),result=await owner.getCurriculumItem({curriculumMapItemId:itemId});if(!result)fail('REFERENCE_ITEM_NOT_FOUND','Curriculum item was not found.',{curriculumMapItemId:itemId});ensureCourse(id,(result.item||result).courseId,'getCurriculumItem');return copy(result);}
    async function getCoverage(input){var id=courseId(input&&input.course),owner=await gated(),map=validateMap(await owner.getCurriculumMap({courseId:id}),id);if(!map||!map.version||!map.version.curriculumMapVersionId)fail('REFERENCE_MAP_NOT_FOUND','Authoritative Curriculum Map is not available.',{courseId:id});var result=await owner.getCurriculumCoverage({curriculumMapVersionId:map.version.curriculumMapVersionId});if(result.courseId!==undefined)ensureCourse(id,result.courseId,'getCurriculumCoverage');return copy(result);}
    return Object.freeze({
      getStandards:getStandards,
      getEssentialStandards:getEssentials,
      getCurriculumMap:getMap,
      getCurriculumItem:getItem,
      getCurriculumCoverage:getCoverage,
      constants:Object.freeze({databaseName:DATABASE_NAME,packageId:PACKAGE_ID,authorityState:AUTHORITY_STATE,courses:COURSES})
    });
  }
  return Object.freeze({create:create,DATABASE_NAME:DATABASE_NAME,PACKAGE_ID:PACKAGE_ID,AUTHORITY_STATE:AUTHORITY_STATE,COURSES:COURSES});
}));
