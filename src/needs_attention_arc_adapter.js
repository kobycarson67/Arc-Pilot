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
  function standardsForCompetency(comp){
    return String((comp&&comp.standard)||'').split(';').map(function(x){return x.trim();}).filter(Boolean);
  }
  function lessonAddressesCompetency(lesson,comp){
    var standards=standardsForCompetency(comp);
    if(!standards.length) return false;
    return arr(lesson&&lesson.standards).some(function(ls){
      var text=String(ls||'');
      return standards.some(function(code){return text.indexOf(code)!==-1;});
    });
  }
  function completedPacingOpportunity(state,course,sectionId,comp){
    var plan=obj(obj(state.pacingPlans)[sectionId]), bank=arr(obj(state.lessonBank)[course]);
    var matching=arr(plan.items).filter(function(item){
      if(!item||item.status!=='completed') return false;
      var lesson=bank.find(function(l){return l&&l.id===item.lessonId;});
      return lessonAddressesCompetency(lesson,comp);
    });
    if(!matching.length) return {confirmed:false,date:''};
    var dates=[];
    matching.forEach(function(item){arr(item.actualDates).forEach(function(d){if(typeof d==='string'&&d)dates.push(d);});});
    dates.sort();
    return {confirmed:true,date:dates.length?dates[dates.length-1]:''};
  }
  function competencyDefinitions(config,course){
    var defs=obj(config.competencyDefinitions);
    return arr(defs[course]);
  }
  function adapt(state,config){
    state=state||{};config=config||{};
    var sectionId=config.sectionId||state.activeSectionId||'', section=arr(state.sections).find(function(x){return x.id===sectionId;});
    var courses=section?[section.course]:['wt','awt'];
    var essential=obj(config.essentialCodes), opportunities=obj(config.competencyOpportunities), reassess=obj(config.readyForReassessment), evidenceDates=obj(config.competencyEvidenceDates);
    var students=[];
    courses.forEach(function(course){
      var definitions=competencyDefinitions(config,course), defByCode={};
      definitions.forEach(function(c){if(c&&c.code)defByCode[c.code]=c;});
      arr(obj(state.classes)[course]).forEach(function(s){
        var enrollment=activeEnrollment(s,state,course,sectionId||null); if(!enrollment)return;
        var facts={studentId:s.id,studentName:s.name||'',sectionId:enrollment.sectionId,active:true,competencies:[],projects:[],workplace:[],technical:[]};
        var codes={}; Object.keys(obj(s.ratings)).forEach(function(k){codes[k]=true;}); Object.keys(obj(s.ratingScopes)).forEach(function(k){codes[k]=true;}); definitions.forEach(function(c){if(c&&c.code)codes[c.code]=true;});
        Object.keys(codes).forEach(function(code){
          var comp=defByCode[code]||{code:code,name:code,standard:''};
          var pacing=completedPacingOpportunity(state,course,enrollment.sectionId,comp);
          var explicitOpportunity=boolMapHas(opportunities,s.id,code);
          var explicitDate=dateMapValue(evidenceDates,s.id,code);
          facts.competencies.push({id:code,name:comp.name||code,essential:essential[code]===true,rating:scopedRating(s,code,state,enrollment),opportunityConfirmed:explicitOpportunity||pacing.confirmed,readyForReassessment:boolMapHas(reassess,s.id,code),evidenceDate:explicitDate||pacing.date});
        });
        students.push(facts);
      });
    });
    return {today:config.today||'',students:students};
  }
  return {adapt:adapt,activeEnrollment:activeEnrollment,scopedRating:scopedRating,standardsForCompetency:standardsForCompetency,lessonAddressesCompetency:lessonAddressesCompetency,completedPacingOpportunity:completedPacingOpportunity};
}));
