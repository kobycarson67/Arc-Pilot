/* Strict transaction-scope reproduction. Expected current defect, not a fix. */
const assert=require('node:assert/strict'),Activity=require('../src/arc_v8_activity'),S=require('../src/arc_v8_storage').STORES;
(async()=>{
let writes=0,observedScope;
const storage={generateId(){throw Error('unexpected');},async transaction(names,fn){observedScope=Array.isArray(names)?names:[names];const guard=s=>{if(!observedScope.includes(s)){const e=new Error('The specified object store was not found in this transaction.');e.name='NotFoundError';e.code=8;throw e;}};
return fn({get:async(s,id)=>{guard(s);return{declarationId:id,versionId:'synthetic-version',revision:1};},query:async s=>{guard(s);return[{studentActivityId:'synthetic-use'}];},put:async()=>{writes++;}});}};
const owner=Activity.create({storage});
await assert.rejects(owner.updateDeclaration('synthetic-declaration',1,{sourcePoint:'changed'}),e=>e.name==='NotFoundError'&&e.code===8);
assert.deepEqual(observedScope,[S.activityDeclarations]);assert.equal(writes,0);
console.log('KNOWN DEFECT REPRODUCED: declaration historical lock queries student_activities outside single-store transaction; no write. This test is not acceptance of the defect.');
})().catch(e=>{console.error(e);process.exitCode=1});
