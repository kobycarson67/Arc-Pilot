(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ArcInventory=factory();})(typeof self!=='undefined'?self:this,function(){
  'use strict';
  var CATEGORIES=['material','consumable','equipment'];
  var UNITS=['each','pieces','feet','inches','pounds','boxes','spools','cylinders'];
  var ACTIONS={
    add:{label:'Add stock',quantity:1},
    use:{label:'Use stock',quantity:-1},
    reserve:{label:'Reserve',reserved:1},
    release:{label:'Release reservation',reserved:-1},
    usable_drop:{label:'Record usable drop',quantity:-1,usableDrops:1},
    waste:{label:'Record waste',quantity:-1,waste:1},
    scrap:{label:'Record scrap',quantity:-1,scrap:1},
    correction:{label:'Count correction',quantity:0}
  };
  function number(value,fallback){var n=Number(value);return Number.isFinite(n)?n:(fallback||0);}
  function clean(value){return String(value==null?'':value).trim();}
  function round(value){return Math.round(number(value)*1000)/1000;}
  function normalizeItem(item){item=item||{};var category=CATEGORIES.indexOf(item.category)>=0?item.category:'material';var unit=UNITS.indexOf(item.unit)>=0?item.unit:'each';return {
    id:clean(item.id)||'inv_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),
    name:clean(item.name),category:category,unit:unit,location:clean(item.location),notes:clean(item.notes),
    quantity:Math.max(0,round(item.quantity)),reserved:Math.max(0,round(item.reserved)),lowStockAt:Math.max(0,round(item.lowStockAt)),
    usableDrops:Math.max(0,round(item.usableDrops)),waste:Math.max(0,round(item.waste)),scrap:Math.max(0,round(item.scrap)),
    createdAt:clean(item.createdAt)||new Date().toISOString(),updatedAt:clean(item.updatedAt)||new Date().toISOString()
  };}
  function normalize(model){model=model||{};return {items:(Array.isArray(model.items)?model.items:[]).map(normalizeItem),history:Array.isArray(model.history)?model.history.slice():[]};}
  function available(item){item=normalizeItem(item);return Math.max(0,round(item.quantity-item.reserved));}
  function isLow(item){item=normalizeItem(item);return item.lowStockAt>0&&available(item)<=item.lowStockAt;}
  function summary(model){var items=normalize(model).items,low=items.filter(isLow);return {total:items.length,low:low.length,materials:items.filter(function(x){return x.category==='material';}).length,consumables:items.filter(function(x){return x.category==='consumable';}).length,equipment:items.filter(function(x){return x.category==='equipment';}).length,lowItems:low};}
  function addItem(model,item,options){var out=normalize(model),next=normalizeItem(item);if(!next.name)throw new Error('Item name is required.');out.items.push(next);out.history.unshift({id:'invhist_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),itemId:next.id,itemName:next.name,action:'created',label:'Item created',amount:next.quantity,unit:next.unit,note:clean(options&&options.note),time:clean(options&&options.timestamp)||new Date().toISOString()});return out;}
  function adjust(model,itemId,action,amount,options){var out=normalize(model),index=out.items.findIndex(function(x){return x.id===itemId;});if(index<0)throw new Error('Inventory item was not found.');if(!ACTIONS[action])throw new Error('Unsupported inventory adjustment.');amount=Math.abs(number(amount));if(!(amount>0)&&action!=='correction')throw new Error('Adjustment amount must be greater than zero.');var item=out.items[index],before={quantity:item.quantity,reserved:item.reserved,usableDrops:item.usableDrops,waste:item.waste,scrap:item.scrap},target=options&&options.targetQuantity;
    if(action==='correction'){if(target==null||number(target)<0)throw new Error('Corrected quantity must be zero or greater.');item.quantity=round(target);amount=Math.abs(round(item.quantity-before.quantity));}
    else if(action==='add')item.quantity=round(item.quantity+amount);
    else if(action==='use'){if(amount>available(item))throw new Error('Usage exceeds available stock.');item.quantity=round(item.quantity-amount);}
    else if(action==='reserve'){if(amount>available(item))throw new Error('Reservation exceeds available stock.');item.reserved=round(item.reserved+amount);}
    else if(action==='release'){if(amount>item.reserved)throw new Error('Release exceeds reserved stock.');item.reserved=round(item.reserved-amount);}
    else {if(amount>available(item))throw new Error('Adjustment exceeds available stock.');item.quantity=round(item.quantity-amount);item[action==='usable_drop'?'usableDrops':action]=round(item[action==='usable_drop'?'usableDrops':action]+amount);}
    item.updatedAt=clean(options&&options.timestamp)||new Date().toISOString();out.items[index]=normalizeItem(item);out.history.unshift({id:'invhist_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),itemId:item.id,itemName:item.name,action:action,label:ACTIONS[action].label,amount:round(amount),unit:item.unit,note:clean(options&&options.note),time:item.updatedAt,before:before,after:{quantity:item.quantity,reserved:item.reserved,usableDrops:item.usableDrops,waste:item.waste,scrap:item.scrap}});return out;}
  function updateItem(model,itemId,changes){var out=normalize(model),index=out.items.findIndex(function(x){return x.id===itemId;});if(index<0)throw new Error('Inventory item was not found.');var before=out.items[index],next=normalizeItem(Object.assign({},before,changes,{id:before.id,createdAt:before.createdAt,updatedAt:new Date().toISOString()}));if(!next.name)throw new Error('Item name is required.');out.items[index]=next;return out;}
  return {CATEGORIES:CATEGORIES,UNITS:UNITS,ACTIONS:ACTIONS,normalize:normalize,normalizeItem:normalizeItem,available:available,isLow:isLow,summary:summary,addItem:addItem,adjust:adjust,updateItem:updateItem};
});
