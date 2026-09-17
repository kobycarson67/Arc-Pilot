const assert=require('assert');
const I=require('../src/inventory');
let tests=[];function test(name,fn){tests.push([name,fn]);}
function model(){return {items:[{id:'steel',name:'1 in square tube',category:'material',unit:'feet',quantity:40,reserved:10,lowStockAt:12,location:'Steel rack'}],history:[]};}
test('normalizes supported classroom inventory fields',()=>{let x=I.normalizeItem({name:' Wire ',category:'consumable',unit:'spools',quantity:'2',lowStockAt:'1'});assert.equal(x.name,'Wire');assert.equal(x.category,'consumable');assert.equal(x.unit,'spools');assert.equal(x.quantity,2);});
test('available stock excludes manual reservations',()=>assert.equal(I.available(model().items[0]),30));
test('low stock uses available quantity and configured threshold',()=>assert.equal(I.isLow({...model().items[0],quantity:20}),true));
test('adds an item and audit entry',()=>{let x=I.addItem({items:[],history:[]},{name:'Grinding discs',category:'consumable',unit:'boxes',quantity:3});assert.equal(x.items.length,1);assert.equal(x.history[0].action,'created');});
test('manual use reduces quantity and writes history',()=>{let x=I.adjust(model(),'steel','use',5,{timestamp:'2026-09-17T12:00:00Z',note:'Table project'});assert.equal(x.items[0].quantity,35);assert.equal(x.history[0].note,'Table project');});
test('reservations do not deduct on-hand quantity',()=>{let x=I.adjust(model(),'steel','reserve',5);assert.equal(x.items[0].quantity,40);assert.equal(x.items[0].reserved,15);});
test('prevents usage beyond available stock',()=>assert.throws(()=>I.adjust(model(),'steel','use',31),/exceeds available/));
test('records usable drops separately from remaining stock',()=>{let x=I.adjust(model(),'steel','usable_drop',4);assert.equal(x.items[0].quantity,36);assert.equal(x.items[0].usableDrops,4);});
test('records waste and scrap separately',()=>{let x=I.adjust(I.adjust(model(),'steel','waste',2),'steel','scrap',3);assert.equal(x.items[0].waste,2);assert.equal(x.items[0].scrap,3);});
test('count correction accepts zero',()=>{let x=I.adjust(model(),'steel','correction',0,{targetQuantity:0});assert.equal(x.items[0].quantity,0);});
test('summary separates item categories and low stock',()=>{let x=I.addItem(model(),{name:'Welder 1',category:'equipment',quantity:1,lowStockAt:0});let s=I.summary(x);assert.equal(s.total,2);assert.equal(s.materials,1);assert.equal(s.equipment,1);});
let failed=0;for(let [name,fn] of tests){try{fn();console.log('PASS',name);}catch(e){failed++;console.error('FAIL',name,e);}}if(failed)process.exit(1);console.log(`PASS ${tests.length} inventory tests`);
