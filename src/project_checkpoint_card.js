/* ARC Project Checkpoint Card
   Shop-friendly HTML renderer for the tested Project Tab card view model.
   Rendering only; actions are delegated to the host bridge by data attributes. */
(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.ArcProjectCheckpointCard=api;
}(this,function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function pct(card){var m=String(card.progressText||'').match(/(\d+)\s*\/\s*(\d+)/);return m&&+m[2]?Math.round((+m[1]/+m[2])*100):0;}
  function actionClass(a){if(a.id==='ready')return 'arc-btn arc-btn-gold';if(a.id==='verify'||a.id==='start'||a.id==='initialize')return 'arc-btn arc-btn-primary';return 'arc-btn';}
  function actions(card,checkpointId){return (card.primaryActions||[]).map(function(a){return '<button type="button" class="'+actionClass(a)+'" data-arc-project-action="'+esc(a.id)+'" data-arc-project-id="'+esc(card.id)+'" data-arc-checkpoint-id="'+esc(checkpointId||'')+'">'+esc(a.label)+'</button>';}).join('');}
  function render(card){var current=(card.checkpointRows||[]).find(function(r){return r.current;})||null;
    if(card.legacy)return '<section class="arc-panel arc-panel-accent arc-project-card" data-arc-project-card="'+esc(card.id)+'"><div class="arc-project-card__body"><div class="arc-project-card__eyebrow">PROJECT</div><h3>'+esc(card.title)+'</h3><p class="arc-project-card__muted">Checkpoint tracking has not been started for this project.</p><div class="arc-project-card__actions">'+actions(card,'')+'</div></div></section>';
    var status=card.complete?'<span class="arc-status arc-status-verified">✓ Complete</span>':card.readyText?'<span class="arc-status arc-status-review">'+esc(card.readyText)+'</span>':'<span class="arc-status">In Progress</span>';
    return '<section class="arc-panel arc-panel-accent arc-project-card" data-arc-project-card="'+esc(card.id)+'"><div class="arc-project-card__body"><div class="arc-project-card__top"><div><div class="arc-project-card__eyebrow">PROJECT PROGRESS</div><h3>'+esc(card.title)+'</h3></div>'+status+'</div><div class="arc-project-card__progress"><div class="arc-project-card__progress-label"><strong>'+esc(card.progressText)+'</strong><span>'+pct(card)+'%</span></div><div class="arc-progress-track" aria-label="'+esc(card.progressText)+'"><div class="arc-progress-fill" style="width:'+pct(card)+'%"></div></div></div><div class="arc-project-card__current"><span class="arc-project-card__current-label">CURRENT CHECKPOINT</span><strong>'+(current?esc(current.name):esc(card.complete?'Project complete':'No active checkpoint'))+'</strong>'+(current&&current.measurement?'<span>'+esc(current.measurement)+'</span>':'')+'</div><div class="arc-project-card__actions">'+actions(card,current&&current.id)+'</div><button type="button" class="arc-project-card__details" data-arc-project-details="'+esc(card.id)+'">View all checkpoints</button></div></section>';
  }
  return {escape:esc,percent:pct,actionClass:actionClass,render:render};
}));
