/* Current enrollment directory: a read-only projection of sections and students. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ArcCurrentStudentDirectory=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function build(state,sectionStudents){
    return (state.sections||[]).slice().sort(function(a,b){return Number(a.period)-Number(b.period)||String(a.name).localeCompare(String(b.name));}).map(function(section){
      // One stable Student may legitimately appear in multiple same-course Sections.
      // This is visibility, not duplicated Student or Course Enrollment authority.
      var students=sectionStudents(section.id).slice().sort(function(a,b){return String(a.name).localeCompare(String(b.name));});
      return {section:section,students:students,count:students.length};
    });
  }
  function filter(groups,query){
    var q=String(query||'').trim().toLowerCase();
    return groups.map(function(group){
      return {section:group.section,count:group.count,students:group.students.filter(function(student){return !q||String(student.name).toLowerCase().includes(q);})};
    });
  }
  return {build:build,filter:filter};
});
