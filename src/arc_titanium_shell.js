(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ArcTitaniumShell=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var CORE_NAME='Advanced Readiness Classroom';
  var MASTER_TAGLINE='Skills Today. Stronger Tomorrow.';
  var PATHWAYS={welding:{id:'welding',name:'Advanced Welding Classroom',statement:'More Than Welding. A Brighter Future.',theme:'titanium-welding'}};
  var GROUPS=[
    {id:'classroom',label:'Classroom',items:[
      {id:'main',label:'Dashboard',icon:'dashboard',action:'renderMainMenu'},
      {id:'roster',label:'Students / Roster',icon:'students',action:'renderRoster',classScoped:true},
      {id:'forecast',label:'Class Forecast',icon:'forecast',action:'renderClassForecast',classScoped:true},
      {id:'attendance',label:'Attendance & Passes',icon:'attendance',action:'renderAttendance',classScoped:true},
      {id:'projects',label:'Projects',icon:'projects',action:'showClassProjects',classScoped:true},
      {id:'openshop',label:'Open Shop',icon:'openshop',action:'renderOpenShopAll',classScoped:true}
    ]},
    {id:'instruction',label:'Instruction',items:[
      {id:'today-focus',label:"Today's Focus",icon:'focus',future:true},
      {id:'lessonbank',label:'Lesson Plan Bank',icon:'lessonbank',action:'renderLessonBank'},
      {id:'projectbank',label:'Project Bank',icon:'projectbank',action:'renderProjectBank'},
      {id:'standards',label:'Curriculum & Standards',icon:'standards',action:'renderActiveCurriculum'}
    ]},
    {id:'shop',label:'Shop',items:[
      {id:'inventory',label:'Material Inventory',icon:'inventory',action:'renderInventory'},
      {id:'booths',label:'Booth Manager',icon:'booths',action:'showBoothManager',classScoped:true}
    ]},
    {id:'arc',label:'ARC',items:[
      {id:'notifications',label:'Notifications',icon:'notifications',action:'showNotifications'},
      {id:'search',label:'Search',icon:'search',action:'showGlobalSearch'},
      {id:'help',label:'Help',icon:'help',future:true},
      {id:'settings',label:'Settings',icon:'settings',action:'renderAppSettings'}
    ]}
  ];
  function pathwayId(section){
    var value=String(section&&(section.pathwayId||section.programId||section.course)||'').toLowerCase();
    return value==='welding'||value==='wt'||value==='awt'||value.indexOf('weld')>=0?'welding':'welding';
  }
  function identityFor(section){return PATHWAYS[pathwayId(section)];}
  function selectedClass(state){
    state=state||{};
    return (state.sections||[]).find(function(section){return section&&section.id===state.activeSectionId;})||null;
  }
  function currentClass(state,scheduleContext){
    state=state||{};
    if(!scheduleContext||scheduleContext.kind!=='class')return null;
    return (state.sections||[]).find(function(section){return section&&Number(section.period)===Number(scheduleContext.period);})||null;
  }
  function navigationContextKey(base,activeSimulation){return String(base||'arc_navigation')+(activeSimulation&&activeSimulation.scenarioId?':simulation:'+activeSimulation.scenarioId:':live');}
  function simulationStart(definition){
    var start=definition&&definition.start;
    return start&&start.view?{view:start.view,sectionId:start.sectionId||''}:{view:'main',sectionId:''};
  }
  function navigation(){return GROUPS.map(function(group){return {id:group.id,label:group.label,items:group.items.map(function(item){return Object.assign({},item);})};});}
  function actionMap(){var result={};GROUPS.forEach(function(group){group.items.forEach(function(item){if(item.action)result[item.id]=item.action;});});return result;}
  return {CORE_NAME:CORE_NAME,MASTER_TAGLINE:MASTER_TAGLINE,PATHWAYS:PATHWAYS,navigation:navigation,actionMap:actionMap,identityFor:identityFor,selectedClass:selectedClass,currentClass:currentClass,navigationContextKey:navigationContextKey,simulationStart:simulationStart};
});
