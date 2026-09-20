/* Inventory modal history/navigation lifecycle, isolated for Samsung regression testing. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ArcMaterialInventoryModalLifecycle=api;}(this,function(){
  function create(host){
    if(!host||!host.history||!host.getOverlay||!host.removeOverlay)throw new Error('Material modal lifecycle requires history and overlay hooks.');
    function marked(){return !!(host.history.state&&host.history.state.arcInventoryModal);}
    function opened(){if(!marked())host.history.pushState(Object.assign({},host.history.state||{},{arcInventoryModal:true}),'');}
    function close(fromPop){if(host.getOverlay())host.removeOverlay();if(!fromPop&&marked())host.history.back();}
    function beforeNavigate(){if(host.getOverlay())close(false);}
    function onPopState(){if(host.getOverlay())close(true);}
    return {opened:opened,close:close,beforeNavigate:beforeNavigate,onPopState:onPopState};
  }
  return {create:create};
}));
