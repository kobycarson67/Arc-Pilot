/* ARC Class Forecast v1.
   Deterministic, read-only preparation context derived from authoritative ARC records. */
(function(root,factory){
  var api=factory(
    typeof ArcProjectBank!=='undefined'?ArcProjectBank:(typeof require==='function'?require('./project_bank'):null),
    typeof ArcProjectCheckpoints!=='undefined'?ArcProjectCheckpoints:(typeof require==='function'?require('./project_checkpoints'):null),
    typeof ArcBoothAssignments!=='undefined'?ArcBoothAssignments:(typeof require==='function'?require('./booth_assignment_lifecycle'):null)
  );
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcClassForecast=api;
}(this,function(ProjectBank,ProjectCheckpoints,BoothAssignments){
  var ACTIONABLE_NEEDS=['Needs Help','Needs Instructor Check','Needs Material','Needs Demonstration','Equipment Problem','Needs Reassessment','Needs Next Project'];
  function arr(value){return Array.isArray(value)?value:[];}
  function text(value){return value==null?'':String(value);}
  function activeProject(student){return ProjectBank.primary(arr(student&&student.projects));}
  function attendanceStatus(state,studentId,sectionId,day){
    var bucket=(state.attendanceRecords||{})[sectionId+'::'+day]||{},record=(bucket.students||{})[studentId]||{};
    return record.status||'present';
  }
  function isPresent(status){return status==='present'||status==='tardy';}
  function booth(state,studentId,sectionId,day){
    var assignment=BoothAssignments.active(state.boothAssignments,studentId,sectionId,day);
    if(!assignment)return null;
    var resource=arr(state.booths).find(function(item){return item&&item.id===assignment.boothId&&!item.removedAt;});
    return resource?{id:resource.id,name:resource.name||'Booth',assignment:assignment}:null;
  }
  function needFor(student){
    var project=activeProject(student),need=project?(project.currentNeed||'Ready to Work'):'Needs Next Project';
    return {project:project,need:need,actionable:need!=='Ready to Work'};
  }
  function nextUniversalCheckpoint(project){
    if(!ProjectCheckpoints.hasCheckpointData(project))return null;
    var view=ProjectCheckpoints.viewForProject(project),active=view.checkpoints.filter(function(checkpoint){return checkpoint.enabled!==false;}),currentIndex=active.findIndex(function(checkpoint){return checkpoint.status!=='verified';});
    if(currentIndex<0)return {kind:'next_project',label:'Next Project Requirement',detail:'Current project checkpoints are complete.'};
    if(currentIndex+1<active.length)return {kind:'instructor_check',label:'Instructor Check',detail:active[currentIndex+1].name,checkpointId:active[currentIndex+1].id};
    return {kind:'project_completion',label:'Project Completion',detail:'Complete the final defined checkpoint.'};
  }
  function nextDefinedStage(project,definition){
    var stages=arr(project.stages),index=stages.findIndex(function(stage){return stage.id===project.currentStageId;}),next=index>=0?stages[index+1]:null;
    if(!next)return {kind:'project_completion',label:'Project Completion',detail:'Complete the current project workflow.'};
    var checks=arr(definition&&definition.instructorCheckpoints),check=checks.find(function(item){return item.stageId===next.id;});
    if(next.requiresInstructorCheck||check)return {kind:'instructor_check',label:'Instructor Check',detail:(check&&check.name)||next.name,stageId:next.id};
    return null;
  }
  function upNextFor(student,definitions){
    var project=activeProject(student);
    if(!project)return {studentId:student.id,studentName:student.name,project:null,next:{kind:'next_project',label:'Next Project Requirement',detail:'No active project is assigned.'}};
    var next=nextUniversalCheckpoint(project),definition=arr(definitions).find(function(item){return item.id===project.templateId;});
    if(!next)next=nextDefinedStage(project,definition);
    return next?{studentId:student.id,studentName:student.name,project:project,next:next}:null;
  }
  function build(input){
    input=input||{};
    var state=input.state||{},section=input.section||{},day=text(input.day),students=arr(input.students),definitions=arr(input.definitions),positions=[];
    students.forEach(function(student){
      var attendance=attendanceStatus(state,student.id,section.id,day),context=needFor(student),place=booth(state,student.id,section.id,day);
      positions.push({studentId:student.id,studentName:student.name,attendance:attendance,present:isPresent(attendance),project:context.project,need:context.need,actionable:context.actionable,booth:place});
    });
    var needs=positions.filter(function(item){return item.actionable;});
    var occupied={};positions.forEach(function(item){if(item.booth)occupied[item.booth.id]=true;});
    return {
      pulse:{present:positions.filter(function(item){return item.present;}).length,working:positions.filter(function(item){return !!item.project;}).length,needYouNow:needs.length,activeBooths:Object.keys(occupied).length,totalStudents:students.length},
      needs:needs,
      upNext:students.map(function(student){return upNextFor(student,definitions);}).filter(Boolean),
      positions:positions
    };
  }
  return {ACTIONABLE_NEEDS:ACTIONABLE_NEEDS,attendanceStatus:attendanceStatus,isPresent:isPresent,needFor:needFor,nextUniversalCheckpoint:nextUniversalCheckpoint,nextDefinedStage:nextDefinedStage,upNextFor:upNextFor,build:build};
}));
