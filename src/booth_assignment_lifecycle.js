/* ARC Booth Assignment Lifecycle.
   One authoritative assignment history serves Fast Roster and Booth Manager.
   Booth use is evidence, not automatic blame. Shared booths are intentional. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcBoothAssignments=api;
}(this,function(){
  function arr(value){return Array.isArray(value)?value:[];}
  function active(assignments,studentId,sectionId,day){return arr(assignments).find(function(a){return a.studentId===studentId&&a.sectionId===sectionId&&a.date===day&&!a.endedAt;})||null;}
  function occupants(assignments,boothId,sectionId,day,exceptStudentId){return arr(assignments).filter(function(a){return a.boothId===boothId&&a.sectionId===sectionId&&a.date===day&&!a.endedAt&&a.studentId!==exceptStudentId;}).map(function(a){return a.studentId;});}
  function shouldExpire(assignment,now,today,scheduledEnd){
    if(!assignment||assignment.endedAt)return false;
    if(assignment.date!==today)return true;
    if(!scheduledEnd||now<scheduledEnd)return false;
    var started=new Date(assignment.startedAt);
    return !isNaN(started.getTime())&&started<=scheduledEnd;
  }
  function closeExpired(assignments,now,today,endForAssignment){var changed=false;arr(assignments).forEach(function(a){var end=endForAssignment(a);if(!shouldExpire(a,now,today,end))return;a.endedAt=(end&&end<=now?end:now).toISOString();a.endReason='period_end';changed=true;});return changed;}
  function assign(assignments,input){
    var list=arr(assignments),prior=active(list,input.studentId,input.sectionId,input.date);
    if(prior&&prior.boothId===input.boothId)return {changed:false,assignment:prior,prior:prior};
    if(prior){prior.endedAt=input.startedAt;prior.endReason='reassigned';}
    var record={id:input.id,studentId:input.studentId,boothId:input.boothId,sectionId:input.sectionId,period:input.period,academicYear:input.academicYear,semester:input.semester,date:input.date,startedAt:input.startedAt,endedAt:null,endReason:null,source:input.source||'instructor'};
    list.push(record);return {changed:true,assignment:record,prior:prior};
  }
  function end(assignments,studentId,sectionId,day,endedAt){var assignment=active(assignments,studentId,sectionId,day);if(!assignment)return {changed:false,assignment:null};assignment.endedAt=endedAt;assignment.endReason='instructor_ended';return {changed:true,assignment:assignment};}
  function assignableBooths(booths){return arr(booths).filter(function(booth){return booth&&!booth.removedAt;});}
  return {active:active,occupants:occupants,shouldExpire:shouldExpire,closeExpired:closeExpired,assign:assign,end:end,assignableBooths:assignableBooths};
}));
