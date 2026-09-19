/* Deterministic fictional fixtures for ARC Simulation Foundation v1. */
(function(root,factory){
  var api=factory(root.ArcProjectBank||(typeof require==='function'?require('./project_bank'):null),root.ArcProjectCheckpoints||(typeof require==='function'?require('./project_checkpoints'):null),root.ArcMaterialInventory||(typeof require==='function'?require('./material_inventory'):null));
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcSimulationFixtures=api;
}(this,function(Bank,Checkpoints,Materials){
  var DAY='2026-09-19',STAMP=DAY+'T09:00:00.000Z',BOOTH_STAMP=DAY+'T23:59:00.000Z';
  var NAMES=['Avery Sparks','Blake Rivet','Cameron Torch','Dakota Steel','Emery Flux','Finley Forge','Gray Arc','Harper Shield','Indigo Clamp','Jules Ember','Kai Wrench','Lane Copper','Marley Gauge','Nico Plate','Oakley Bead','Parker Joint','Quinn Helmet','Reese Anvil','Rowan Current','Sage Grinder','Skyler Tack','Tatum Rod','Val Cable','Winter Jig','Zion Square','Arden Visor','Briar Chisel','Cleo Hammer'];
  function clone(x){return JSON.parse(JSON.stringify(x));}
  function id(value){return String(value).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');}
  function definition(state,index){var choices=['pb_wt_coupon_holder','pb_wt_helmet_rack','pb_wt_smaw_stringer','pb_wt_thermal_straight_cut'];return state.projectBank.find(function(x){return x.id===choices[index%choices.length];})||state.projectBank[index%state.projectBank.length];}
  function assignment(state,student,index,options){
    options=options||{};var d=definition(state,index),p=Bank.assignment(d,{assignmentId:'sim_project_'+student.id+'_'+index,sectionId:student.enrollments[0].sectionId,course:student.enrollments[0].course,academicYear:state.academicYear,semester:state.semester,timestamp:STAMP,source:'Simulation Fixture',isPrimary:true});
    p=Checkpoints.initializeProject(p);var verified=options.verified==null?(index%5):options.verified;
    p.checkpoints.forEach(function(c,i){c.status=i<verified?'verified':(i===verified?'in_progress':'not_started');c.startedAt=i<=verified?STAMP:'';c.updatedAt=i<=verified?STAMP:'';});
    if(options.ready&&p.checkpoints[verified])p.checkpoints[verified].status='ready_for_review';
    if(options.complete){p.checkpoints.forEach(function(c){c.status='verified';c.startedAt=STAMP;c.updatedAt=STAMP;c.verifiedAt=STAMP;c.verifiedBy='Instructor';});p.status='completed';}
    p.checkpointActivity=p.checkpoints.filter(function(c){return c.status==='verified'||c.status==='ready_for_review';}).map(function(c,n){return {id:'sim_activity_'+student.id+'_'+n,checkpointId:c.id,type:c.status==='verified'?'verification':'review',date:DAY,academicYear:state.academicYear,semester:state.semester,sectionId:student.enrollments[0].sectionId,attendanceStatus:'present',opportunityConfirmed:false,meaningfulProgress:false,note:'Fictional scenario history.'};});
    p.rubric={safety:3,measurement:2+(index%2),welding:2+(index%2),fabrication:3,finish:2};p.currentNeed=options.need||'Ready to Work';p.needSource='Simulation Fixture';return p;
  }
  function student(state,index,section,options){
    options=options||{};var course=section.course,prefix=course==='wt'?'WT':'AWT',s={id:'sim_student_'+(index+1),name:NAMES[index],pathway:['Placement','Core','Extension'][index%3],grade:9+(index%4),gradYear:2030-(index%4),ratings:{},ratingScopes:{},projects:[],tech:[],work:{rating:2+(index%3),code:''},workplaceWeeks:{},history:[],enrollments:[{year:state.academicYear,semester:state.semester,sectionId:section.id,period:section.period,course:course,active:options.inactive!==true}]};
    s.ratings[prefix+'-S1']=2+(index%3);s.ratings[prefix+'-M1']=1+(index%4);Object.keys(s.ratings).forEach(function(code){s.ratingScopes[code]={sectionId:section.id,course:course,academicYear:state.academicYear,semester:state.semester};});
    s.tech=[{id:'sim_tech_'+s.id,templateId:'sim_safety_check',name:'Safety & Shop Knowledge',title:'Safety & Shop Knowledge',type:'Knowledge Check',pointsPossible:20,pointsEarned:14+(index%7),status:'completed',date:DAY,sectionId:section.id,course:course,academicYear:state.academicYear,semester:state.semester}];
    s.workplacePoints={'2026-09-14':{days:{mon:{status:'present',deductions:[]},tue:{status:'present',deductions:index%7===2?[{id:'sim_work_'+index,ruleId:'cleanup',label:'Failed Cleanup / Organization',points:1,occurrence:1,at:STAMP}]:[]}},weeklyPercent:index%7===2?95:100,sectionId:section.id,course:course,academicYear:state.academicYear,semester:state.semester}};
    s.behaviorEvents=index%10===4?[{id:'sim_behavior_'+index,time:STAMP,category:'Safety',severity:'Routine',action:'Redirected / Warning',description:'Fictional reminder to reposition grinding sparks.',followUp:'Reviewed safe work direction.',workplaceDeductionId:''}]:[];
    if(!options.noProject)s.projects=[assignment(state,s,index,options)];
    if(index%6===0)s.history.push({id:'sim_history_'+index,time:STAMP,category:'workplace',type:'simulation_example',title:'Workplace coaching',oldValue:'',newValue:'Recorded',details:'Fictional simulation coaching example.'});
    return s;
  }
  function materialFixture(state){
    var model=Materials.normalize({}),defs=[
      ['angle_1_1_8','1 × 1 × 1/8 in Angle','linear',18],['angle_1_5_1_8','1-1/2 × 1-1/2 × 1/8 in Angle','linear',18],['flat_1_8','1 × 1/8 in Flat Bar','linear',12],['flat_2_1_4','2 × 1/4 in Flat Bar','linear',12],['square_1_16','1 × 1 × 16 ga Square Tube','linear',18],['square_1_5_14','1-1/2 × 1-1/2 × 14 ga Square Tube','linear',18],['round_1','1 in Round Tube','linear',18],['pipe_1','1 in Schedule 40 Pipe','linear',18],['rebar_3_8','3/8 in Rebar','linear',12],['rod_1_4','1/4 in Round Rod','linear',8],['sheet_16','16 ga Mild Steel Sheet','plate',6],['sheet_11','11 ga Mild Steel Sheet','plate',6],['plate_1_8','1/8 in Plate','plate',6],['plate_1_4','1/4 in Plate','plate',6],['expanded','Expanded Metal','plate',6],['mesh','Welded Wire Mesh','plate',6],['channel','2 in Channel','linear',18]
    ];
    defs.forEach(function(x,i){model=Materials.addDefinition(model,{id:'sim_mat_'+x[0],name:x[1],kind:x[2],minimumRetainedInches:x[3],lowStockPieceCount:i%3===0?2:1,location:i%2?'Steel Rack B':'Steel Rack A'},{timestamp:STAMP,ids:{definition:'sim_mat_'+x[0]}});});
    function receive(id,q,length,width,thickness,prefix){var ids=[];for(var i=0;i<q;i++)ids.push('sim_piece_'+prefix+'_'+(i+1));model=Materials.receive(model,'sim_mat_'+id,{quantity:q,lengthInches:length,widthInches:width,thicknessInches:thickness,note:'Scenario 3 fictional opening stock.'},{timestamp:STAMP,academicYear:state.academicYear,ids:{pieces:ids,ledger:'sim_receive_'+prefix}});}
    receive('angle_1_1_8',10,240,0,0,'angle20');receive('flat_1_8',4,24,0,0,'four2');receive('flat_2_1_4',1,96,0,0,'one8');receive('square_1_16',2,240,0,0,'square');receive('round_1',1,80,0,0,'round');receive('rod_1_4',1,14,0,0,'rod');receive('sheet_16',2,48,96,0.0598,'sheet16');receive('plate_1_8',2,18,24,0.125,'plate18');receive('plate_1_4',1,12,12,0.25,'platequarter');receive('expanded',1,24,48,0.12,'expanded');
    var uses=[['sim_piece_angle20_1',80,'Student Project',{studentId:'sim_student_3',studentName:'Cameron Torch',projectId:'sim_project_sim_student_3_2',projectName:'Welding Coupon Holder'}],['sim_piece_square_1',30,'Skill Practice',{}],['sim_piece_round_1',20,'Shop/School Project',{}],['sim_piece_one8_1',12,'Other Department',{department:'Agriculture'}],['sim_piece_rod_1',10,'Waste/Scrap',{note:'Fictional miscut.'}]];
    uses.forEach(function(x,i){model=Materials.useLinear(model,x[0],Object.assign({usedLengthInches:x[1],purpose:x[2]},x[3]),{timestamp:'2026-09-19T1'+i+':00:00.000Z',academicYear:state.academicYear,ids:{remainder:'sim_remainder_'+i,ledger:'sim_use_'+i}});});
    model=Materials.adjust(model,'sim_piece_four2_1',{lengthInches:23,reason:'Fictional physical count correction.'},{timestamp:'2026-09-19T15:00:00.000Z',academicYear:state.academicYear,ids:{ledger:'sim_adjust_1'}});
    return model;
  }
  function configure(base,scenarioId){
    var state=clone(base);state.activeSectionId=state.sections.slice().sort(function(a,b){return a.period-b.period;})[0].id;state.course=state.sections.find(function(s){return s.id===state.activeSectionId;}).course;state.classes={wt:[],awt:[]};state.attendanceRecords={};state.passLog=[];state.boothAssignments=[];state.boothIssues=[];state.notifications=[];state.photoEvidence=[];
    var count=scenarioId==='presentation'?28:scenarioId==='test-1'?8:scenarioId==='test-2'?12:scenarioId==='test-3'?10:9;
    var sections=state.sections.slice().sort(function(a,b){return a.period-b.period;});
    for(var i=0;i<count;i++){
      var sec=sections[i%sections.length],opts={verified:i%5};
      if(scenarioId==='test-2'){opts.ready=i<3;opts.need=['Ready to Work','Needs Help','Needs Material','Needs Demonstration','Equipment Problem'][i%5];}
      else if(scenarioId==='test-3'){opts.ready=i===2;opts.complete=i===7;opts.noProject=i===8;opts.need=i===4?'Needs Material':'Ready to Work';}
      else if(scenarioId==='test-4'){opts.ready=i===1;opts.complete=i===2;opts.noProject=i===3;opts.inactive=i===8;opts.need=i===4?'Needs Reassessment':'Ready to Work';}
      else {opts.ready=i%9===3;opts.noProject=i%13===12;opts.complete=i%14===11;opts.need=['Ready to Work','Ready to Work','Needs Help','Needs Instructor Check','Needs Material','Needs Demonstration','Equipment Problem'][i%7];}
      var s=student(state,i,sec,opts);state.classes[sec.course].push(s);
      var attendance=i%11===5?'tardy':i%13===7?'excused':i%17===9?'unexcused':'present';var key=sec.id+'::'+DAY;if(!state.attendanceRecords[key])state.attendanceRecords[key]={sectionId:sec.id,date:DAY,students:{}};state.attendanceRecords[key].students[s.id]={status:attendance,updatedAt:STAMP};
      if(i%8!==6&&state.booths.length){var booth=state.booths[i%Math.min(10,state.booths.length)];state.boothAssignments.push({id:'sim_booth_'+i,studentId:s.id,boothId:booth.id,sectionId:sec.id,date:DAY,startedAt:BOOTH_STAMP,endedAt:null});}
    }
    if(scenarioId==='test-4'&&state.boothAssignments.length>2)state.boothAssignments[state.boothAssignments.length-1].boothId=state.boothAssignments[1].boothId;
    if((scenarioId==='presentation'||scenarioId==='test-2')&&NAMES.length){var first=state.classes.wt[0]||state.classes.awt[0];if(first)state.passLog.push({id:'sim_pass_1',studentId:first.id,sectionId:first.enrollments[0].sectionId,date:DAY,reason:'office',reasonLabel:'Office',outAt:STAMP,returnedAt:null});}
    if(scenarioId==='test-4'&&state.booths[11])state.booths[11].removedAt=STAMP;
    state.materialInventory=scenarioId==='test-3'?materialFixture(state):Materials.normalize(state.materialInventory);
    state.simulationFixture={scenarioId:scenarioId,scenarioVersion:1,seedVersion:1,canonicalDate:DAY,fictional:true};return state;
  }
  function create(scenarioId,baseState){if(!baseState)throw new Error('A migrated schema-v7 base state is required.');return configure(baseState,scenarioId);}
  function summary(state){return {students:(state.classes.wt||[]).length+(state.classes.awt||[]).length,projects:(state.classes.wt||[]).concat(state.classes.awt||[]).reduce(function(n,s){return n+(s.projects||[]).length;},0),boothAssignments:(state.boothAssignments||[]).length,passes:(state.passLog||[]).length};}
  return {DAY:DAY,NAMES:NAMES,create:create,summary:summary};
}));
