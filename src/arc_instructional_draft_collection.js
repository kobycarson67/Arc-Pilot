/* ARC Integrated Classroom Completion - draft instructional collection.
   Pure and inert: it projects complete review drafts from the preserved lesson
   source without accepting, scheduling, assigning, grading, or writing them. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ArcInstructionalDraftCollection=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var STATUS='DRAFT_INSTRUCTOR_REVIEW';
  var COURSE_IDS={wt:'13207',awt:'13208'};
  function clone(x){return JSON.parse(JSON.stringify(x));}
  function list(x){return Array.isArray(x)?x:[];}
  function codes(text,course){
    var prefix=course==='awt'?'AWT':'WT',found=String(text||'').match(new RegExp('\\b'+prefix+'\\s+[1-9]\\.[1-9]','g'))||[];
    return Array.from(new Set(found.map(function(x){return x.replace(/\s+/g,' ');}))).sort();
  }
  function competencyCodes(source,course,competencies){
    var text=JSON.stringify(source),allowed=new Set(list(competencies&&competencies[course]).map(function(x){return x.code;}));
    return Array.from(allowed).filter(function(code){return text.indexOf(code)>=0;}).sort();
  }
  function mapUnits(course,maps){
    var out=[];
    list(maps&&maps[course]).forEach(function(q,qi){list(q.units).forEach(function(u,ui){out.push({
      sourceKey:course+'-q'+(qi+1)+'-u'+(ui+1),course:course,quarterIndex:qi,unitIndex:ui,
      quarter:q.name,timeframe:u.timeframe,focus:u.focus,standards:u.standards,
      learningTargets:u.learningTargets,criteria:u.criteria,strategies:u.strategies,assessment:u.assessment,
      standardCodes:codes(u.standards,course)
    });});});
    return out;
  }
  function handsOn(title,course){
    var t=String(title).toLowerCase();
    if(/safety|ppe/.test(t))return['Inspect actual PPE and a task-owned work area.','Demonstrate the applicable pre-use or hazard-control check under instructor supervision.'];
    if(/cut/.test(t))return['Use instructor-approved material to rehearse layout, setup, cutting, and edge inspection.','Compare a practice result with the stated success criteria before another attempt.'];
    if(/gmaw/.test(t))return['Use the approved GMAW station or physical training components for setup and diagnosis.','Produce or inspect a labeled sample only after the instructor confirms the safety boundary.'];
    if(/smaw|arc|electrode|bead|weld/.test(t))return['Use the approved SMAW station or physical samples for demonstration and guided practice.','Compare technique and visible results with instructor feedback; Practice does not become Evidence automatically.'];
    if(/draw|layout|measure|math|symbol/.test(t))return['Interpret, measure, mark, sketch, or arrange actual shop material and joint samples.','Verify the result with a second method before requesting instructor review.'];
    if(/fabricat|project|fit/.test(t))return['Plan and carry out the applicable fabrication step with explicit hold points.','Inspect dimensions, fit-up, workmanship, and the next safe action.'];
    if(/inspect|quality|troubleshoot|discontinuit/.test(t))return['Inspect instructor-approved physical or deidentified samples.','Separate observation, possible cause, and corrective action before instructor feedback.'];
    if(/career|workplace|employ/.test(t))return['Connect the concept to an authentic shop role, work order, or workplace scenario.','Demonstrate the communication or planning behavior in current shop work.'];
    return['Use actual shop examples, tools, material, drawings, or work samples where safe and applicable.','Explain or demonstrate the concept before selecting the next learning option.'];
  }
  function candidatesFor(source,course,maps){
    var lessonCodes=codes(list(source.standards).join(' '),course),tokens=String(source.title||'').toLowerCase().split(/[^a-z0-9]+/).filter(function(x){return x.length>4;});
    return mapUnits(course,maps).map(function(u){
      var shared=u.standardCodes.filter(function(code){return lessonCodes.indexOf(code)>=0;});
      var titleMatch=tokens.some(function(token){return String(u.focus).toLowerCase().indexOf(token)>=0;});
      return shared.length||titleMatch?Object.assign({},u,{basis:shared.length?'shared exact Standard code':'shared source wording',sharedStandards:shared}):null;
    }).filter(Boolean);
  }
  function differentiation(source,course){
    var firstTarget=list(source.learningTargets)[0]||'the lesson target';
    if(course==='wt')return{
      enteringOrDeveloping:['Preview vocabulary, hazards, tools, and a completed example.','Model one step at a time, then use guided rehearsal and an instructor checkpoint.'],
      readyForCore:['Apply '+firstTarget.replace(/^I am learning to\s*/i,'')+' with stated checkpoints and self-checks.','Explain the result using the Lesson criteria.'],
      readyForExtension:['Increase accuracy, joint/application variety, or independence without skipping safety gates.','Diagnose one error and justify the correction.'],
      enrollmentTiming:['Use the prerequisite check to place a later-entering student at the first safe missing concept.','Do not require a universal linear starting point when prior evidence supports another entry.']
    };
    return{
      enteringOrDeveloping:['Verify WT prerequisite skills and reteach only the missing safety or process foundation.','Use a bounded model and one guided attempt before independent diagnosis.'],
      readyForCore:['Plan, execute, inspect, and explain '+firstTarget.replace(/^I am learning to\s*/i,'')+'.','Use technical language and documented quality checks.'],
      readyForExtension:['Increase process complexity, tolerance, troubleshooting depth, or justified independence.','Compare alternatives and defend the selected process or correction.'],
      enrollmentTiming:['Use practical prerequisite evidence to establish a safe starting point.','Preserve unknown future placement until the instructor observes readiness.']
    };
  }
  function makeDraft(source,course,maps,competencies){
    var standardCodes=codes(list(source.standards).join(' '),course),curriculumCandidates=candidatesFor(source,course,maps);
    return{
      draftLessonId:'icmlb1-'+course+'-'+String(source.code).toLowerCase().replace(/[^a-z0-9]+/g,'-'),
      course:course,courseCode:COURSE_IDS[course],lessonCode:String(source.code),title:source.title,reusable:!!source.reusable,
      status:STATUS,accepted:false,ordinarySchedulingEligible:false,autoBuildEligible:false,assignmentAllowed:false,
      sourcePreservation:{availability:'reference_only',sourceAuthority:'MASTER_LESSON_BANKS',sourceRecordExact:clone(source)},
      standardsReferences:standardCodes,competencyReferences:competencyCodes(source,course,competencies),
      curriculumReferences:[],curriculumCandidates:curriculumCandidates,
      conceptIntroduction:'Connect '+source.title+' to a real shop task, prior Student experience, and the reason the skill matters before demonstration or practice.',
      learningTargets:clone(list(source.learningTargets)),successCriteria:clone(list(source.criteria)),
      instructionalStrategies:[source.strategies,'Use a brief model - guided attempt - independent application sequence, adjusted to demonstrated readiness.'],
      understandingChecks:['Ask the Student to explain the next safe step and why.','Observe a labeled example, setup, sketch, sample, or performance before independent work.','Use the success criteria for a Student self-check and an instructor check.'],
      differentiation:differentiation(source,course),handsOnOpportunities:handsOn(source.title,course),
      feedbackPlan:['Give immediate, specific feedback tied to one success criterion.','Require the Student to identify and try the next correction.','Record Evidence only through a separately authorized instructor action.'],
      assessmentBoundary:{sourceAssessment:source.assessment,instructorDecisionRequired:true,automaticGrade:false,automaticEvidence:false,automaticQualification:false},
      nextLearningOptions:[
        {type:'Practice',rule:'Instructor selects ungraded repetition when readiness is not yet demonstrated.'},
        {type:'Skill Challenge',rule:'Instructor may assign a bounded demonstration; no automatic Evidence.'},
        {type:'Technical Assignment',rule:'Instructor may assign knowledge work and explicitly score or reassess it.'},
        {type:'Project',rule:'Instructor may select a purposeful application after prerequisites and content acceptance.'}
      ],
      unresolved:curriculumCandidates.length?['Exact Curriculum Map binding requires instructor acceptance; candidates are shown with their derivation basis.']:['No Curriculum Map candidate was derived; instructor mapping remains required.']
    };
  }
  function build(input){
    input=input||{};var banks=input.lessonBanks||{},maps=input.curriculumMaps||{},competencies=input.competencies||{},out=[];
    ['wt','awt'].forEach(function(course){list(banks[course]).forEach(function(source){out.push(makeDraft(source,course,maps,competencies));});});
    return clone(out);
  }
  function validate(drafts){
    var issues=[],ids=new Set();list(drafts).forEach(function(x){
      if(ids.has(x.draftLessonId))issues.push({id:x.draftLessonId,issue:'duplicate'});ids.add(x.draftLessonId);
      ['conceptIntroduction','learningTargets','successCriteria','instructionalStrategies','understandingChecks','handsOnOpportunities','feedbackPlan','nextLearningOptions'].forEach(function(k){if(!x[k]||(Array.isArray(x[k])&&!x[k].length))issues.push({id:x.draftLessonId,issue:k});});
      if(x.status!==STATUS||x.accepted||x.ordinarySchedulingEligible||x.autoBuildEligible||x.assignmentAllowed)issues.push({id:x.draftLessonId,issue:'authority-boundary'});
      if(!x.differentiation||!x.differentiation.enteringOrDeveloping||!x.differentiation.readyForCore||!x.differentiation.readyForExtension||!x.differentiation.enrollmentTiming)issues.push({id:x.draftLessonId,issue:'differentiation'});
      if(!x.sourcePreservation||x.sourcePreservation.availability!=='reference_only')issues.push({id:x.draftLessonId,issue:'source-preservation'});
      if(!x.assessmentBoundary||x.assessmentBoundary.automaticEvidence||x.assessmentBoundary.automaticGrade||x.assessmentBoundary.automaticQualification)issues.push({id:x.draftLessonId,issue:'assessment-boundary'});
    });
    return{valid:issues.length===0,count:list(drafts).length,byCourse:{wt:list(drafts).filter(function(x){return x.course==='wt';}).length,awt:list(drafts).filter(function(x){return x.course==='awt';}).length},issues:issues};
  }
  function coverage(drafts,maps){
    var out={};['wt','awt'].forEach(function(course){
      var rows=list(drafts).filter(function(x){return x.course===course;}),units=mapUnits(course,maps),candidateKeys=new Set();rows.forEach(function(x){list(x.curriculumCandidates).forEach(function(u){candidateKeys.add(u.sourceKey);});});
      out[course]={lessons:rows.length,standardCodes:Array.from(new Set(rows.flatMap(function(x){return x.standardsReferences;}))).sort(),competencyCodes:Array.from(new Set(rows.flatMap(function(x){return x.competencyReferences;}))).sort(),curriculumUnits:units.length,curriculumUnitsWithCandidate:units.filter(function(u){return candidateKeys.has(u.sourceKey);}).length,completeTeachingDesign:rows.filter(function(x){return validate([x]).valid;}).length,accepted:0};
    });return clone(out);
  }
  function alignActivities(activities,drafts){
    return list(activities).map(function(activity){
      var activityStandards=new Set(list(activity.standardsReferences));
      var matches=list(drafts).filter(function(lesson){return lesson.course===activity.course&&lesson.standardsReferences.some(function(code){return activityStandards.has(code);});}).map(function(x){return x.draftLessonId;});
      return Object.assign(clone(activity),{proposedLessonReferences:matches,status:STATUS,alignmentAccepted:false,automaticUnlock:false});
    });
  }
  return Object.freeze({STATUS:STATUS,build:build,validate:validate,coverage:coverage,alignActivities:alignActivities,mapUnits:mapUnits});
});
