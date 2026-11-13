/* Strict IndexedDB-like transaction scope; no cross-store access outside declared scope. */
const assert=require('node:assert/strict'),Activity=require('../src/arc_v8_activity'),S=require('../src/arc_v8_storage').STORES;
(async()=>{
let scope,writes=0;const rows=new Map();
rows.set(S.activityVersions,new Map([['draft',{versionId:'draft',revision:1,publicationState:'Draft'}],['used-draft',{versionId:'used-draft',revision:1,publicationState:'Draft'}],['approved',{versionId:'approved',revision:1,publicationState:'Approved'}]]));
rows.set(S.activityDeclarations,new Map([['unused',{declarationId:'unused',versionId:'draft',revision:1}],['used',{declarationId:'used',versionId:'used-draft',revision:1}]]));
rows.set(S.studentActivities,new Map([['use',{studentActivityId:'use',versionId:'used-draft'}]]));
rows.set(S.activityDefinitions,new Map([['definition',{definitionId:'definition',revision:1}]]));
const storage={generateId(){throw Error('unexpected');},async transaction(names,fn){scope=Array.isArray(names)?names:[names];const work=structuredClone(rows),guard=s=>{if(!scope.includes(s)){const e=new Error('Object store outside transaction');e.name='NotFoundError';e.code=8;throw e;}};
const result=await fn({get:async(s,id)=>{guard(s);return structuredClone(work.get(s).get(id));},query:async(s,index,id)=>{guard(s);return [...work.get(s).values()].filter(x=>x.versionId===id).map(x=>structuredClone(x));},put:async(s,x)=>{guard(s);writes++;work.get(s).set(x.declarationId||x.versionId||x.definitionId,structuredClone(x));}});
for(const s of scope)rows.set(s,work.get(s));return result;}};
const owner=Activity.create({storage});
let x=await owner.updateDeclaration('unused',1,{sourcePoint:'safe edit'});assert.equal(x.revision,2);assert.deepEqual(scope,[S.activityDeclarations,S.studentActivities]);
x=await owner.updateDraftVersion('draft',1,{instructions:'safe edit'});assert.equal(x.revision,2);assert.deepEqual(scope,[S.activityVersions,S.studentActivities]);
for(const [action,id,rev,code] of [['updateDeclaration','used',1,'HISTORICAL_LOCK'],['updateDraftVersion','used-draft',1,'HISTORICAL_LOCK'],['updateDraftVersion','approved',1,'HISTORICAL_LOCK'],['updateDeclaration','unused',1,'WRITE_CONFLICT'],['updateDraftVersion','draft',1,'WRITE_CONFLICT']]){
const before=JSON.stringify([...rows].map(([s,m])=>[s,[...m]])),n=writes;await assert.rejects(owner[action](id,rev,{instructions:'must not write'}),e=>e.code===code);assert.equal(writes,n);assert.equal(JSON.stringify([...rows].map(([s,m])=>[s,[...m]])),before);}
await owner.updateDefinition('definition',1,{title:'definition edit'});assert.deepEqual(scope,[S.activityDefinitions]);
console.log('PASS strict transaction scopes: unused declaration/Draft edits, used historical locks, approved lock, stale conflicts and no-write equality; ordinary definition remains single-store.');
})().catch(e=>{console.error(e);process.exitCode=1});
