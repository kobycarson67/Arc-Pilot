/* ARC Project Checkpoints foundation.
   Universal fabrication workflow shared by WT/AWT projects.
   Checkpoints are progress evidence, not automatic grades. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcProjectCheckpoints=api;
}(this,function(){
  var DEFINITIONS=[
    {id:'plan',name:'Plan & Understand',description:'Understand the drawing or instructions, dimensions, materials, welding or joining requirements, and expected finished product.'},
    {id:'material_prep',name:'Material Preparation',description:'Select, cut, clean, and prepare the correct material for fabrication.'},
    {id:'layout_measurement',name:'Layout & Measurement',description:'Lay out and verify required dimensions, locations, angles, holes, and cut lines.'},
    {id:'fit_up',name:'Fit-Up',description:'Position parts and verify dimensions, alignment, squareness, gaps, and joint preparation.'},
    {id:'tack_pre_weld',name:'Tack & Pre-Weld Check',description:'Secure the assembly with tacks and verify final dimensions and alignment before full welding.'},
    {id:'welding_joining',name:'Welding / Joining',description:'Complete required joining operations using the appropriate process, settings, technique, and sequence.'},
    {id:'finish_cleanup',name:'Finish & Cleanup',description:'Complete required grinding, cleanup, edge finishing, spatter removal, and surface preparation without damaging the project.'},
    {id:'final_inspection',name:'Final Inspection',description:'Check dimensions, weld quality, workmanship, function, completeness, and project requirements.'}
  ];
  var STATUSES=['not_started','in_progress','ready_for_review','verified'];
  function definitions(){return DEFINITIONS.map(function(x){return Object.assign({},x);});}
  function validStatus(status){return STATUSES.indexOf(status)>=0;}
  function create(options){options=options||{};var disabled=options.disabled||{};return DEFINITIONS.map(function(d,index){return {id:d.id,name:d.name,order:index+1,enabled:disabled[d.id]!==true,status:'not_started',startedAt:'',updatedAt:'',verifiedAt:'',verifiedBy:'',photoIds:[],note:'',measurement:'',competencyEvidence:[]};});}
  function normalize(checkpoints){var existing={};(Array.isArray(checkpoints)?checkpoints:[]).forEach(function(c){if(c&&c.id)existing[c.id]=c;});return DEFINITIONS.map(function(d,index){var c=existing[d.id]||{};return {id:d.id,name:d.name,order:index+1,enabled:c.enabled!==false,status:validStatus(c.status)?c.status:'not_started',startedAt:c.startedAt||'',updatedAt:c.updatedAt||'',verifiedAt:c.verifiedAt||'',verifiedBy:c.verifiedBy||'',photoIds:Array.isArray(c.photoIds)?c.photoIds.slice():[],note:c.note||'',measurement:c.measurement||'',competencyEvidence:Array.isArray(c.competencyEvidence)?c.competencyEvidence.slice():[]};});}
  function progress(checkpoints){var active=normalize(checkpoints).filter(function(c){return c.enabled;});var verified=active.filter(function(c){return c.status==='verified';}).length;var ready=active.filter(function(c){return c.status==='ready_for_review';});var current=active.find(function(c){return c.status!=='verified';})||null;return {activeCount:active.length,verifiedCount:verified,complete:active.length>0&&verified===active.length,readyForReview:ready.length>0,readyCheckpointIds:ready.map(function(c){return c.id;}),currentCheckpointId:current?current.id:''};}
  function hasCheckpointData(project){return !!(project&&Array.isArray(project.checkpoints));}
  function viewForProject(project){if(!hasCheckpointData(project))return {legacy:true,checkpoints:[],progress:{activeCount:0,verifiedCount:0,complete:false,readyForReview:false,readyCheckpointIds:[],currentCheckpointId:''}};var checkpoints=normalize(project.checkpoints);return {legacy:false,checkpoints:checkpoints,progress:progress(checkpoints)};}
  function initializeProject(project,options){var copy=Object.assign({},project||{});if(hasCheckpointData(copy))copy.checkpoints=normalize(copy.checkpoints);else copy.checkpoints=create(options);return copy;}
  function readyForReview(project){var view=viewForProject(project);return !view.legacy&&view.progress.readyForReview;}
  return {DEFINITIONS:DEFINITIONS,STATUSES:STATUSES,definitions:definitions,create:create,normalize:normalize,progress:progress,validStatus:validStatus,hasCheckpointData:hasCheckpointData,viewForProject:viewForProject,initializeProject:initializeProject,readyForReview:readyForReview};
}));
