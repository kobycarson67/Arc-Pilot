(function(){'use strict';
var out=document.getElementById('output'),build=window.ARC_BUILD||{},runtime=ArcV8ProductionAcademicConfiguration.RUNTIME_REVISION||'unknown-runtime',params=new URLSearchParams(window.location.search),publicationCommit=(params.get('publicationCommit')||'').trim(),publicationTree=(params.get('publicationTree')||'').trim(),storage=ArcV8Storage.create({databaseName:ArcV8ProductionAcademicConfiguration.DATABASE_NAME,build:build}),coordinator=ArcV8ProductionAcademicConfiguration.create({storage:storage,actor:'stage14-instructor-production-academic-configuration',build:build,expectedPublicationCommit:publicationCommit,expectedPublicationTree:publicationTree}),recoveryText='';
document.getElementById('identity').textContent='Build '+(build.build||'unknown')+' · runtime '+runtime+' · publication '+(publicationCommit||'MISSING')+' / '+(publicationTree||'MISSING')+' · production DB '+coordinator.constants.databaseName+' · '+coordinator.constants.authorityState;document.getElementById('commit').value=publicationCommit;document.getElementById('tree').value=publicationTree;
function show(value){out.textContent=JSON.stringify(value,function(key,item){return key==='text'&&this.filename?'[verified recovery package prepared for download]':item;},2);}
function field(id){return document.getElementById(id).value.trim();}
function parsed(id){return JSON.parse(field(id));}
function input(){var academic=parsed('configuration'),snapshot=parsed('scheduleSnapshot');return Object.assign({},academic,{scheduleSnapshot:snapshot});}
function authority(confirm){return{confirmedBy:field('operator'),startingCommit:field('commit'),startingTree:field('tree'),rollbackRef:field('rollback'),confirmation:confirm?field('confirmation'):undefined};}
function download(pkg){var url=URL.createObjectURL(new Blob([pkg.text],{type:pkg.mimeType})),a=document.createElement('a');a.href=url;a.download=pkg.filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);}
async function selectedRecovery(){var file=document.getElementById('recoveryFile').files[0];if(file)recoveryText=await file.text();if(!recoveryText)throw Object.assign(new Error('Select the exact downloaded recovery JSON first.'),{code:'RECOVERY_FILE_REQUIRED'});return recoveryText;}
var actions={
  capture:async function(){var result=await coordinator.captureLiveSchedule(window.localStorage);document.getElementById('scheduleSnapshot').value=JSON.stringify(result.snapshot,null,2);return result;},
  review:function(){return coordinator.review(input());},
  prepare:async function(){var result=await coordinator.prepare(input(),authority(false));download(result.recoveryPackage);return result;},
  inspectState:function(){return coordinator.inspectState();},
  loadRecovery:async function(){return coordinator.loadRecovery(await selectedRecovery(),input(),authority(false));},
  apply:function(){return coordinator.apply(authority(true),input());},
  recoverInterrupted:async function(){return coordinator.recoverInterrupted(authority(false),await selectedRecovery(),field('recoveryConfirmation'));},
  summary:function(){return coordinator.summary();},
  reopenSummary:function(){return coordinator.reopenSummary();}
};
var controls=Array.from(document.querySelectorAll('[data-action],input,textarea'));function disabled(value){controls.forEach(function(control){control.disabled=value;});}document.querySelectorAll('[data-action]').forEach(function(button){button.addEventListener('click',async function(){disabled(true);out.textContent='Running '+button.textContent+'…';try{show(await actions[button.dataset.action]());}catch(error){show({ok:false,code:error.code||error.name,message:error.message,context:error.context||null,runtimeRevision:runtime,authorityState:'V7_ONLY'});}finally{disabled(false);}});});
}());
