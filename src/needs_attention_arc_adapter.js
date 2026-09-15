/* ARC v0.18 Needs Attention adapter.
   Converts existing ARC state into normalized engine facts without mutating state.
   Conservative rule: if ARC cannot prove an opportunity, opportunityConfirmed stays false. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcNeedsAttentionAdapter=api;
}(this,function(){
  function arr(x){return Array.isArray(x)?x:[];}
  function obj(x){return x&&typeof x==='object'&&!Array.isArray(x)?x:{};}
  function activeEnrollment(student,state,course,sectionId){
    return arr(student.enrollments).find(function(e){return e&&e.active&&e.year===state.academicYear&&e.semester===state.semester&&e.course===course&&(!sectionId||e.sectionId===sectionId);})||null;
  }
  function scopedRating(student,code,state,enrollment){
    var ratings=obj(student.ratings), scopes=obj(student.ratingScopes), scope=scopes[code];
    if(!Object.prototype.hasOwnProperty.call(ratings,code)) return 0;
    if(!scope) return 0; // legacy/unscoped evidence is context, not silently current-term evidence
    if(scope.academicYear!==state.academicYear||scope.semester!==state.semester) return 0;
    if(enrollment&&scope.sectionId&&scope.sectionId!==enrollment.sectionId) return 0;
    return Number(ratings[code]||0);
  }
  function boolMapHas(map,studentId,key){
    var s=obj(obj(map)[studentId]); return s[key]===true;
  }
  function dateMapValue(map,studentId,key){
    var s=obj(obj(map)[studentId]); return typeof s[key]==='string'?s[key]:'';
  }
  function adapt(state,config){
    state=state||{};config=config||{};
    var sectionId=config.sectionId||state.activeSectionId||'', section=arr(state.sections).find(function(x){return x.id===sectionId;});
    var courses=section?[section.course]:['wt','awt'];
    var essential=obj(config.essentialCodes), opportunities=obj(config.competencyOpportunities), reassess=obj(config.readyForReassessment), evidenceDates=obj(config.competencyEvidenceDates);
    var students=[];
    courses.forEach(function(course){
      arr(obj(state.classes)[course]).forEach(function(s){
        var enrollment=activeEnrollment(s,state,course,sectionId||null); if(!enrollment)return;
        var facts={studentId:s.id,studentName:s.name||'',sectionId:enrollment.sectionId,active:true,competencies:[],projects:[],workplace:[],technical:[]};
        var codes={}; Object.keys(obj(s.ratings)).forEach(function(k){codes[k]=true;}); Object.keys(obj(s.ratingScopes)).forEach(function(k){codes[k]=true;});
        Object.keys(codes).forEach(function(code){
          facts.competencies.push({id:code,name:code,essential:essential[code]===true,rating:scopedRating(s,code,state,enrollment),opportunityConfirmed:boolMapHas(opportunities,s.id,code),readyForReassessment:boolMapHas(reassess,s.id,code),evidenceDate:dateMapValue(evidenceDates,s.id,code)});
        });
        students.push(facts);
      });
    });
    return {today:config.today||'',students:students};
  }
  return {adapt:adapt,activeEnrollment:activeEnrollment,scopedRating:scopedRating};
}));
