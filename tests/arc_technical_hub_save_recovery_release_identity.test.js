const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto'),cp=require('node:child_process');
const parent='317dbe2a94d3b619d88ee8477c243cfcd2338423',suffix='-technical-hub-save-assign-recovery-1';
function build(source){const c={};vm.runInNewContext(source,c);return c.ARC_BUILD;}
const old=build(cp.execFileSync('git',['show',parent+':app-build.js'],{encoding:'utf8'})),current=build(fs.readFileSync('app-build.js','utf8'));
assert.equal(current.build,old.build+suffix);assert.equal(current.shell,old.shell+suffix);assert.notEqual(current.shell,old.shell);
for(const key of Object.keys(old))if(!['build','shell'].includes(key))assert.deepEqual(current[key],old[key]);
const contract=JSON.parse(fs.readFileSync('runtime/arc_authority_closure_v1.json','utf8'));assert.equal(contract.buildIdentity,current.build);
const prior=JSON.parse(cp.execFileSync('git',['show',parent+':runtime/arc_authority_closure_v1.json'],{encoding:'utf8'}));const copy={...contract,buildIdentity:prior.buildIdentity};assert.deepEqual(copy,prior);
const pins={'index.html':'b127fb7e50509c2dfb0676052796682865c75ed4a5e943e9d66d1cfeab5b8817','src/arc_project_technical_authority_adapter.js':'df4561e90c7cb06fcb425b201e40b82516a8741e0ec3f6afdaafd8bd6edca054'};
for(const [name,hash] of Object.entries(pins))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(name)).digest('hex'),hash,name);
assert.equal(fs.readFileSync('sw.js','utf8'),cp.execFileSync('git',['show',parent+':sw.js'],{encoding:'utf8'}));
console.log('PASS exact317 build/shell advancement, unchanged closure policy/worker and browser-reviewed code bytes');
