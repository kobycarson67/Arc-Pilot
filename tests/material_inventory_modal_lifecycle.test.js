const assert=require('assert'),Lifecycle=require('../src/material_inventory_modal_lifecycle');
function fixture(){let overlay=false,backs=0,pushes=0,history={state:null,pushState(value){this.state=value;pushes++;},back(){backs++;this.state=null;}},life=Lifecycle.create({history,getOverlay:()=>overlay,removeOverlay:()=>{overlay=false;}});return {history,life,open(){overlay=true;life.opened();},isOpen:()=>overlay,backs:()=>backs,pushes:()=>pushes};}
let x=fixture();
x.open();assert(x.isOpen());assert.equal(x.pushes(),1);
x.life.close(false);assert(!x.isOpen());assert.equal(x.backs(),1);
x.open();assert(x.isOpen(),'modal must reopen after a saved transaction');
x.life.beforeNavigate();assert(!x.isOpen(),'Main Menu/global navigation must not orphan modal');assert.equal(x.backs(),2);
x.open();x.life.onPopState();assert(!x.isOpen(),'Android/browser Back must dismiss modal');assert.equal(x.backs(),2,'popstate dismissal must not issue another history back');
x=fixture();x.open();x.life.close(false);x.open();assert.equal(x.pushes(),2,'each true reopen gets one dismissible history entry');
console.log('PASS exact Material Inventory save/reopen/navigation/Android Back modal lifecycle');
