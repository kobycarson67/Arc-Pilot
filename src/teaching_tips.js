/* ARC Teaching Tips v1.
   Optional, practical instructor support selected from lesson content.
   No student data, grades, or automatic instructional decisions. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcTeachingTips=api;
}(this,function(){
  var catalog={
    safety:{label:'Safety',tip:'Name the hazard before demonstrating the control. Then ask students to point out the same hazard before they begin.'},
    demonstration:{label:'Demonstration',tip:'Keep the first demonstration short: show the complete process once, then repeat it in small steps while students name the next move.'},
    questioning:{label:'Questioning',tip:'Ask “What would you check next, and why?” before supplying the answer. This reveals the student’s process, not just the final result.'},
    troubleshooting:{label:'Troubleshooting',tip:'Have students identify one visible symptom, one likely cause, and one adjustment. Change only one variable before checking the result again.'},
    checking:{label:'Checking Understanding',tip:'Before students spread out in the shop, ask each group to restate the first safe step and the evidence that will show success.'},
    differentiation:{label:'Differentiation',tip:'Keep the learning target the same while changing the support: reference sample, step card, peer explanation, or an added precision challenge.'},
    launch:{label:'Project Launch',tip:'Begin with the finished-product requirements, then work backward through quality checks, material needs, and the first build decision.'},
    measurement:{label:'Measurement Check',tip:'Have two students measure the same feature independently, compare results, and identify the reference edge before either marks the material.'},
    drawing:{label:'Drawing to Work',tip:'Ask students to locate one dimension, one joint, and one sequence decision on the drawing before they touch material.'},
    weld_quality:{label:'Weld Feedback',tip:'Place an acceptable sample beside one that needs correction. Ask students to name one visible difference and the single technique change they would try first.'},
    pacing:{label:'Shop Transition',tip:'End the demonstration with a three-part launch: first safe action, first quality check, and where students return when they need instructor review.'},
    career:{label:'Career Connection',tip:'Use one local shop role or job posting and ask students to connect today’s skill to a specific task, expectation, or hiring requirement.'}
  };
  function text(lesson){return [lesson&&lesson.title,lesson&&lesson.strategies,lesson&&lesson.assessment].concat(lesson&&lesson.learningTargets||[],lesson&&lesson.criteria||[]).join(' ').toLowerCase();}
  function explicit(lesson){return Array.isArray(lesson&&lesson.teachingTipTopics)?lesson.teachingTipTopics.filter(function(k){return catalog[k];}):[];}
  function topics(lesson){
    var chosen=explicit(lesson),s=text(lesson);
    if(!chosen.length){
      if(/safety|ppe|hazard|fire|ventilat/.test(s)) chosen.push('safety');
      if(/project|build|fabricat|blueprint|drawing/.test(s)) chosen.push('launch');
      if(/measure|layout|dimension|tolerance/.test(s)) chosen.push('measurement');
      if(/blueprint|drawing|symbol|sketch/.test(s)) chosen.push('drawing');
      if(/weld|bead|joint|inspection|discontinuit/.test(s)) chosen.push('weld_quality');
      if(/demonstrat|setup|technique|cut|fabricat/.test(s)) chosen.push('demonstration');
      if(/troubleshoot|defect|correct|adjust|repair|diagnos/.test(s)) chosen.push('troubleshooting');
      if(/transition|station|rotation|cleanup|open shop/.test(s)) chosen.push('pacing');
      if(/career|employ|industry|workplace|resume/.test(s)) chosen.push('career');
      if(/assess|check|criteria|exit|explain/.test(s)) chosen.push('checking');
    }
    if(!chosen.length) chosen=['questioning','checking'];
    if(chosen.length===1) chosen.push(chosen[0]==='checking'?'questioning':'checking');
    return chosen.filter(function(k,i,a){return a.indexOf(k)===i;}).slice(0,2);
  }
  function recommend(lesson){return topics(lesson).map(function(key){return {id:key,label:catalog[key].label,tip:catalog[key].tip};});}
  return {catalog:catalog,topics:topics,recommend:recommend};
}));
