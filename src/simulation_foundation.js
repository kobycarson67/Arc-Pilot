/* ARC Simulation Foundation v1.
   Keeps Live Classroom and every fictional scenario in explicit, independent
   persistence records. The host owns rendering; this module owns transactions. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcSimulationFoundation=api;
}(this,function(){
  var VERSION=1,MAX_SNAPSHOTS=5;
  var ACTIVE_KEY='arc_simulation_v1_active';
  var SNAPSHOT_KEY='arc_simulation_v1_live_safety_snapshots';
  var STATE_PREFIX='arc_simulation_v1_state:';
  var SCENARIOS=[
    {id:'presentation',displayName:'Presentation Mode',type:'presentation',scenarioVersion:1,seedVersion:1,start:{view:'main'}},
    {id:'test-1',displayName:'Test Scenario 1',subtitle:'Normal Shop Day',type:'test',scenarioVersion:1,seedVersion:1,start:{view:'main'}},
    {id:'test-2',displayName:'Test Scenario 2',subtitle:'Busy Instructor',type:'test',scenarioVersion:1,seedVersion:1,start:{view:'main'}},
    {id:'test-3',displayName:'Test Scenario 3',subtitle:'Projects & Materials',type:'test',scenarioVersion:1,seedVersion:1,start:{view:'main'}},
    {id:'test-4',displayName:'Test Scenario 4',subtitle:'Edge Cases',type:'test',scenarioVersion:1,seedVersion:1,start:{view:'main'}}
  ];
  function clone(value){return JSON.parse(JSON.stringify(value));}
  function parse(raw,fallback){try{return raw?JSON.parse(raw):fallback;}catch(e){return fallback;}}
  function scenario(id){return SCENARIOS.find(function(item){return item.id===id;})||null;}
  function create(options){
    options=options||{};
    var storage=options.storage,integrity=options.integrity,verify=options.verifyIntegrity,canonical=options.canonicalState,validate=options.validateState||function(){return true;},now=options.now||function(){return new Date().toISOString();};
    if(!storage||!integrity||!verify||!canonical)throw new Error('Simulation Foundation requires storage, integrity, verification, and canonical-state providers.');
    function writeVerified(key,payload){
      var text=JSON.stringify(payload),ok=storage.setItem(key,text);
      if(ok===false)throw new Error('Persistent storage rejected the write.');
      var saved=storage.getItem(key);
      if(saved!==text)throw new Error('Persistent storage readback did not match the requested write.');
      return parse(saved,null);
    }
    function stateEnvelope(scenarioId,state){
      validate(state);
      return {format:'ArcSimulationState',storageVersion:VERSION,scenarioId:scenarioId,savedAt:now(),integrity:integrity(state),state:clone(state)};
    }
    function verifiedState(envelope,expectedId){
      if(!envelope||envelope.format!=='ArcSimulationState'||envelope.storageVersion!==VERSION||envelope.scenarioId!==expectedId||!envelope.state)throw new Error('Simulation state record is invalid.');
      verify(envelope.state,envelope.integrity);validate(envelope.state);return clone(envelope.state);
    }
    function loadScenario(id){
      if(!scenario(id))throw new Error('Unknown simulation scenario.');
      var stored=parse(storage.getItem(STATE_PREFIX+id),null);
      if(stored)return verifiedState(stored,id);
      var initial=canonical(id);validate(initial);
      return verifiedState(writeVerified(STATE_PREFIX+id,stateEnvelope(id,initial)),id);
    }
    function snapshots(){var value=parse(storage.getItem(SNAPSHOT_KEY),[]);return Array.isArray(value)?value:[];}
    function active(){var value=parse(storage.getItem(ACTIVE_KEY),null);return value&&value.storageVersion===VERSION&&scenario(value.scenarioId)?value:null;}
    function enter(id,liveState,navigation){
      var definition=scenario(id);if(!definition)throw new Error('Unknown simulation scenario.');
      if(active())throw new Error('Leave the current simulation before entering another one.');
      validate(liveState);
      var createdAt=now(),snapshot={format:'ArcLiveSafetySnapshot',storageVersion:VERSION,id:'live-'+createdAt+'-'+id,createdAt:createdAt,reason:'Enter '+definition.displayName,scenarioId:id,integrity:integrity(liveState),navigation:clone(navigation||{}),state:clone(liveState)};
      var next=[snapshot].concat(snapshots()).slice(0,MAX_SNAPSHOTS);
      var readback=writeVerified(SNAPSHOT_KEY,next),saved=readback[0];
      if(!saved||saved.id!==snapshot.id)throw new Error('Live Safety Snapshot readback failed.');
      verify(saved.state,saved.integrity);validate(saved.state);
      var simulationState=loadScenario(id);
      var marker={format:'ArcActiveSimulation',storageVersion:VERSION,scenarioId:id,snapshotId:snapshot.id,enteredAt:createdAt,navigation:clone(navigation||{})};
      writeVerified(ACTIVE_KEY,marker);
      return {definition:definition,state:simulationState,snapshot:clone(saved),active:marker};
    }
    function saveActive(state){var marker=active();if(!marker)throw new Error('No simulation is active.');return verifiedState(writeVerified(STATE_PREFIX+marker.scenarioId,stateEnvelope(marker.scenarioId,state)),marker.scenarioId);}
    function resume(){var marker=active();if(!marker)return null;return {definition:scenario(marker.scenarioId),state:loadScenario(marker.scenarioId),active:marker};}
    function leave(state){
      var marker=active();if(!marker)throw new Error('No simulation is active.');saveActive(state);
      var live=snapshots().find(function(item){return item&&item.id===marker.snapshotId;});
      if(!live)throw new Error('The verified Live Safety Snapshot could not be found.');
      verify(live.state,live.integrity);validate(live.state);
      if(storage.removeItem(ACTIVE_KEY)===false||storage.getItem(ACTIVE_KEY)!==null)throw new Error('Simulation could not be deactivated safely.');
      return {state:clone(live.state),navigation:clone(live.navigation||{}),snapshot:clone(live)};
    }
    function reset(){var marker=active();if(!marker)throw new Error('No simulation is active.');var initial=canonical(marker.scenarioId);validate(initial);var state=verifiedState(writeVerified(STATE_PREFIX+marker.scenarioId,stateEnvelope(marker.scenarioId,initial)),marker.scenarioId);return {definition:scenario(marker.scenarioId),state:state};}
    return {active:active,enter:enter,leave:leave,resume:resume,reset:reset,saveActive:saveActive,loadScenario:loadScenario,snapshots:snapshots,keys:{active:ACTIVE_KEY,snapshots:SNAPSHOT_KEY,statePrefix:STATE_PREFIX}};
  }
  return {VERSION:VERSION,MAX_SNAPSHOTS:MAX_SNAPSHOTS,SCENARIOS:SCENARIOS,scenario:scenario,create:create};
}));
