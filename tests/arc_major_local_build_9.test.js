const assert=require('assert'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
let passed=0,failed=0;function test(name,fn){try{fn();console.log('PASS',name);passed++;}catch(error){console.error('FAIL',name,error);failed++;}}
const index=read('index.html'),sw=read('sw.js'),build=read('app-build.js'),closure=JSON.parse(read('runtime/arc_authority_closure_v1.json'));
test('Build 9 identity is coherent across shell, worker closure, and live contract',()=>{
  const identity='integrated-classroom-completion-major-local-build-9';
  assert(build.includes(identity));assert.equal(closure.buildIdentity.includes(identity),true);assert(read('.github/workflows/pages-live-verification.yml').includes(identity));
});
test('authority closure advances exactly from 109 to 110 for the legacy custody owner',()=>{
  assert.equal(closure.approvedPaths.length,110);assert.equal(closure.approvedPaths.filter(x=>x.path==='src/arc_legacy_photo_custody.js').length,1);assert(sw.includes('src/arc_legacy_photo_custody.js'));
});
test('normal Administration exposes a separate V7 photo custody export',()=>{
  assert(index.includes('<script src="src/arc_legacy_photo_custody.js"></script>'));
  assert(index.includes('Export verified legacy photo custody'));
  assert(index.includes('WeldingClassroomPhotoStore'));
  assert(index.includes('It does not migrate or dual-write them into V8.'));
});
test('legacy photo export refuses Simulation and binds exact live weld_v013 bytes',()=>{
  assert(index.includes('if(simulationActive())return alert("Leave Simulation before exporting Live Classroom legacy photo custody.")'));
  assert(index.includes('localStorage.getItem(STORAGE_KEY)'));
  assert(index.includes('listRows:listLegacyPhotoRows'));
});
test('task-owned restore primitive replaces only the legacy photo object store',()=>{
  assert(index.includes('function replaceLegacyPhotoRows(rows)'));
  assert(index.includes('db.transaction(PHOTO_STORE_NAME,"readwrite")'));
  assert(index.includes('store.clear()'));
});
test('production transaction authority and instructional statuses remain bounded',()=>{
  const registry=read('docs/ARC_CAPABILITY_REGISTRY.md'),continuity=read('docs/ARC_CONTINUITY_LOG.md');
  assert(registry.includes('production P4–P10C remains `V7_ONLY`')||registry.includes('Production P4–P10C remains `V7_ONLY`'));
  assert(continuity.includes('DRAFT_INSTRUCTOR_REVIEW'));
  assert(index.includes('realStudentDataAuthorized'));
});
console.log(`\n${passed}/${passed+failed} ARC Major Local Build 9 tests passed.`);if(failed)process.exit(1);
