/* ARC v0.18 Needs Attention engine. Pure/deterministic: reads normalized facts, never mutates classroom records. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcNeedsAttention=api;
}(this,function(){
  var rank={P1:1,P2:2,P3:3};
  function arr(x){return Array.isArray(x)?x:[];}
  function dateMs(x){var n=Date.parse(x||'');return isNaN(n)?null:n;}
  function daysBetween(a,b){var x=dateMs(a),y=dateMs(b);return x===null||y===null?null:Math.floor((y-x)/86400000);}
  function item(s,priority,ruleId,category,headline,explanation,relatedId,evidenceDate,actionTarget){
    return {id:[s.studentId,ruleId,relatedId||'general'].join(':'),studentId:s.studentId,studentName:s.studentName||'',sectionId:s.sectionId||'',priority:priority,ruleId:ruleId,category:category,headline:headline,explanation:explanation,relatedId:relatedId||'',evidenceDate:evidenceDate||'',actionTarget:actionTarget||''};
  }
  function strongest(a,b){return rank[a]<=rank[b]?a:b;}
  function merge(items){
    var by={}; arr(items).forEach(function(x){var k=[x.studentId,x.category,x.relatedId||x.ruleId].join('|');if(!by[k]){by[k]=x;by[k].reasons=[x.explanation];return;}var y=by[k];y.priority=strongest(y.priority,x.priority);if(y.reasons.indexOf(x.explanation)<0)y.reasons.push(x.explanation);if(!y.evidenceDate||((x.evidenceDate||'')<y.evidenceDate))y.evidenceDate=x.evidenceDate||y.evidenceDate;});
    return Object.keys(by).map(function(k){var x=by[k];x.explanation=x.reasons.join(' • ');delete x.reasons;return x;});
  }
  function generate(ctx){
    ctx=ctx||{};var today=ctx.today||new Date().toISOString().slice(0,10),out=[];
    arr(ctx.students).forEach(function(s){
      if(s.active===false)return;
      arr(s.competencies).forEach(function(c){
        if(!c.essential||!c.opportunityConfirmed)return;
        var rating=Number(c.rating||0);
        if(c.readyForReassessment){out.push(item(s,'P1','ready_for_review','Review','Ready for reassessment',c.name+' is waiting for instructor verification.',c.id,c.evidenceDate,'competency'));return;}
        if(rating===0||c.noEvidence===true)out.push(item(s,'P1','essential_competency_risk','Competency','Essential competency needs evidence',c.name+' is essential and has had a confirmed evidence opportunity.',c.id,c.evidenceDate,'competency'));
        else if(rating<3)out.push(item(s,'P1','essential_competency_risk','Competency','Essential competency below proficient',c.name+' is essential; latest meaningful rating is '+rating+' after a confirmed opportunity.',c.id,c.evidenceDate,'competency'));
      });
      arr(s.projects).forEach(function(p){
        if(p.readyForReview)out.push(item(s,'P1','ready_for_review','Review','Project ready for review',p.name+' is waiting for instructor review.',p.id,p.lastEvidenceDate,'project'));
        var gap=daysBetween(p.lastEvidenceDate,today);
        if(p.active&&p.opportunityConfirmed&&Number(p.eligibleOpportunities||0)>=3&&gap!==null&&gap>=7)out.push(item(s,'P2','project_stalled','Project','Project may be stalled',p.name+' has no meaningful progress evidence for '+gap+' days across '+p.eligibleOpportunities+' eligible opportunities.',p.id,p.lastEvidenceDate,'project'));
      });
      var recent=arr(s.workplace).filter(function(w){var d=daysBetween(w.date,today);return d!==null&&d>=0&&d<=10;});
      var serious=recent.filter(function(w){return Number(w.points||0)>=3;});
      var significant=recent.filter(function(w){return Number(w.points||0)>=2;});
      if(serious.length)out.push(item(s,'P1','serious_shop_followup','Workplace','Serious shop concern needs follow-up',serious.length+' serious Workplace concern'+(serious.length===1?'':'s')+' recorded in the last 10 days.','workplace',serious[serious.length-1].date,'workplace'));
      else if(significant.length>=2)out.push(item(s,'P2','repeated_workplace_concern','Workplace','Repeated Workplace concerns',significant.length+' significant Workplace concerns recorded in the last 10 days.','workplace',significant[significant.length-1].date,'workplace'));
      arr(s.technical).forEach(function(t){if(t.opportunityConfirmed&&t.due&&t.status!=='completed'&&t.status!=='excused')out.push(item(s,'P2','technical_evidence_missing','Technical','Technical evidence missing',t.name+' is due after a confirmed assessment opportunity.',t.id,t.date,'technical'));});
    });
    return merge(out).sort(function(a,b){var r=rank[a.priority]-rank[b.priority];if(r)return r;if(a.ruleId==='ready_for_review'&&b.ruleId!=='ready_for_review')return -1;if(b.ruleId==='ready_for_review'&&a.ruleId!=='ready_for_review')return 1;var ad=a.evidenceDate||'9999',bd=b.evidenceDate||'9999';if(ad!==bd)return ad<bd?-1:1;return (a.studentName||'').localeCompare(b.studentName||'');});
  }
  return {generate:generate,merge:merge,daysBetween:daysBetween};
}));
