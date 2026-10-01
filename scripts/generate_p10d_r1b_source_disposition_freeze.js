/* P10D-R1B deterministic source-verification and disposition overlay. No runtime/database access. */
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..'),P10D=path.join(ROOT,'reconciliation','p10d'),SOURCE=path.join(ROOT,'source_authority','recovered_2026-09-29'),OUT=path.join(P10D,'r1b-source-disposition-freeze.json');
const byteCache=new Map();
const read=p=>{if(!byteCache.has(p))byteCache.set(p,fs.readFileSync(path.join(ROOT,p)));return byteCache.get(p);};
const parse=p=>JSON.parse(read(p));
function stable(v){if(Array.isArray(v))return v.map(stable);if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])]));return v;}
const sha=v=>crypto.createHash('sha256').update(Buffer.isBuffer(v)?v:JSON.stringify(stable(v))).digest('hex');
const fileRef=p=>({path:p,sha256:sha(read(p)),byteLength:read(p).length});
function requireEqual(actual,expected,label){if(actual!==expected)throw Error(`${label}: expected ${expected}, received ${actual}`);}
function requireCondition(value,label){if(!value)throw Error(label);}
function without(object,key){const copy={...object};delete copy[key];return copy;}
function insertionHashWithout(object,key){return crypto.createHash('sha256').update(JSON.stringify(without(object,key))).digest('hex');}

const paths={manifest:'reconciliation/p10d/instructional-content-manifest.json',queue:'reconciliation/p10d/human-review-queue.json',consolidated:'reconciliation/p10d/consolidated-review-queue.json',map:'reconciliation/p10d/original-item-resolution-map.json',sourceManifest:'source_authority/recovered_2026-09-29/source-manifest.json',comparison:'source_authority/recovered_2026-09-29/standards-comparison.json',transcription:'source_authority/recovered_2026-09-29/transcriptions/south-dakota-welding-standards.json',findings:'source_authority/recovered_2026-09-29/SOURCE_AUTHORITY_FINDINGS.md'};
function validateRelationships(M,Q,C,R){
requireCondition(Array.isArray(Q.items)&&Q.items.length===Q.count,'Queue items must match declared count');
requireCondition(Array.isArray(C.decisions),'Consolidated decisions must be an array');
requireCondition(Array.isArray(R.mappings),'Resolution mappings must be an array');
const decisionById=new Map();
for(const decision of C.decisions){requireCondition(decision&&typeof decision.decisionId==='string', 'Every consolidated decision needs an identity');requireCondition(!decisionById.has(decision.decisionId),`Duplicate decision identity ${decision.decisionId}`);decisionById.set(decision.decisionId,decision);}
const expectedRoute={
  curriculumMapItems:['MF-CURRICULUM-CONTENT-SEPARATION','mechanical follow-on mapping','MECHANICAL_AFTER_CONTENT_RELATIONSHIP_SPLIT'],
  lessonDefinitions:['MF-LESSON-CONTENT-SEPARATION','mechanical follow-on mapping','MECHANICAL_AFTER_CONTENT_RELATIONSHIP_SPLIT'],
  lessonVersions:['MF-LESSON-CONTENT-SEPARATION','mechanical follow-on mapping','MECHANICAL_AFTER_CONTENT_RELATIONSHIP_SPLIT'],
  curriculumItemCompetencyLinks:['SU-CURRICULUM-COMPETENCY-CANDIDATES','safe unresolved relationship','SAFE_TO_REMAIN_ABSENT'],
  lessonVersionCompetencyLinks:['SU-LESSON-COMPETENCY-CANDIDATES','safe unresolved relationship','SAFE_TO_REMAIN_ABSENT'],
  lessonVersionCurriculumLinks:['SU-LESSON-CURRICULUM-CANDIDATES','safe unresolved relationship','SAFE_TO_REMAIN_ABSENT'],
  lessonVersionActivityLinks:['SU-ACTIVITY-EVIDENCE-IDENTITIES','safe unresolved relationship','SAFE_TO_REMAIN_ABSENT']
};
const idField={curriculumMapItems:'curriculumMapItemId',lessonDefinitions:'lessonId',lessonVersions:'lessonId',curriculumItemCompetencyLinks:'curriculumMapItemId',lessonVersionCompetencyLinks:'lessonVersionId',lessonVersionCurriculumLinks:'lessonVersionId',lessonVersionActivityLinks:'lessonVersionId'};
const seenIndexes=new Set(),seenFingerprints=new Set();
for(const mapping of R.mappings){
  const index=mapping.originalQueueIndex,item=Q.items[index],route=expectedRoute[mapping.family],decision=decisionById.get(mapping.decisionId);
  requireCondition(Number.isInteger(index)&&index>=0&&index<Q.items.length,`Invalid queue index ${index}`);
  requireCondition(!seenIndexes.has(index),`Duplicate queue index ${index}`);seenIndexes.add(index);
  requireCondition(item,`Missing queue item ${index}`);
  requireEqual(mapping.originalItemFingerprint,sha(item),`Queue fingerprint ${index}`);
  requireCondition(!seenFingerprints.has(mapping.originalItemFingerprint),`Duplicate queue fingerprint ${mapping.originalItemFingerprint}`);seenFingerprints.add(mapping.originalItemFingerprint);
  for(const field of ['course','family'])requireEqual(mapping[field],item[field],`Queue ${index} ${field}`);
  requireEqual(mapping.manifestRecordId,item.id,`Queue ${index} manifest identity`);
  requireEqual(mapping.originalDisposition,item.disposition,`Queue ${index} disposition`);
  requireEqual(JSON.stringify(mapping.originalReasons),JSON.stringify(item.reasons),`Queue ${index} reasons`);
  requireCondition(route,`Unsupported mapping family ${mapping.family}`);
  requireEqual(mapping.decisionId,route[0],`Queue ${index} decision route`);
  requireEqual(mapping.classification,route[1],`Queue ${index} classification`);
  requireEqual(mapping.status,route[2],`Queue ${index} status`);
  requireEqual(mapping.blocksImport,false,`Queue ${index} blocksImport`);
  requireCondition(decision,`Unknown decision ${mapping.decisionId}`);
  requireEqual(decision.decisionClass,mapping.classification,`Queue ${index} decision class`);
  requireCondition(decision.course==='both'||decision.course===mapping.course,`Queue ${index} decision course conflict`);
  const records=M.courses[mapping.course]&&M.courses[mapping.course][mapping.family];
  requireCondition(Array.isArray(records),`Missing manifest family ${mapping.course}.${mapping.family}`);
  requireCondition(records.some(record=>record[idField[mapping.family]]===mapping.manifestRecordId),`Queue ${index} missing ${mapping.course}.${mapping.family} manifest record ${mapping.manifestRecordId}`);
}
requireEqual(seenIndexes.size,Q.items.length,'Complete queue-index coverage');
for(let index=0;index<Q.items.length;index++)requireCondition(seenIndexes.has(index),`Missing queue index ${index}`);
for(const decision of C.decisions){const affected=R.mappings.filter(mapping=>mapping.decisionId===decision.decisionId).length;requireEqual(affected,decision.affectedOriginalItemCount,`${decision.decisionId} affected count`);}
requireEqual(R.sourceManifestHash,M.manifestHash,'mapping manifest authority');
requireEqual(C.sourceManifestHash,M.manifestHash,'consolidated manifest authority');
requireEqual(R.sourceQueueCount,Q.count,'mapping queue count');
requireEqual(C.sourceQueueCount,Q.count,'consolidated queue count');
requireEqual(R.consolidatedQueueHash,C.artifactHash,'mapping consolidated authority');
}

function main(){
const frozenInputs={
  manifest:['f6471c88e846dd811aa8603b494611d4f5efc23a7c03eb554589f9f6d732a24d',1642864],
  queue:['d59bcfc812ac9247170d64ea5c0c41a5621a81e174e3ebb0a65b8b5cb8ab0d88',150011],
  consolidated:['f09a181f9ffef6d7749639de3d924ae853ca2a187f1d140409808c4f29c44d81',9286],
  map:['f867cf3251599844e93d87aec6967c5416220442649786e679d47e9d32018a57',294006],
  sourceManifest:['368abefcd489a70ff20178c34d62067a705c68641b202ea20a0384187e9d01a7',24626],
  comparison:['ab7bb4ee7cdbae22d0538c60e856a03492bfff8c5d1ea12e40bd14ca5549221a',18223],
  transcription:['f7ee8d19dd99bc6d1d404f6f3449d121b30d2bf50e648818a89ce4f7942c7d55',7683],
  findings:['241e2ea9e159f07cbb08fae37025badaf009f10c2dbcd3ba979d9126b6ec1eee',9220]
};
for(const [name,[digest,bytes]] of Object.entries(frozenInputs)){const input=read(paths[name]);requireEqual(input.length,bytes,`${name} byte length`);requireEqual(sha(input),digest,`${name} frozen byte authority`);}
const M=parse(paths.manifest),Q=parse(paths.queue),C=parse(paths.consolidated),R=parse(paths.map),S=parse(paths.sourceManifest),X=parse(paths.comparison),T=parse(paths.transcription);
requireCondition(M&&Q&&C&&R&&S&&X&&T,'Required reconciliation inputs must be JSON objects');
requireEqual(sha(without(M,'manifestHash')),M.manifestHash,'P10D manifest internal digest');
requireEqual(sha(without(C,'artifactHash')),C.artifactHash,'R1A consolidated internal digest');
requireEqual(sha(without(R,'artifactHash')),R.artifactHash,'R1A mapping internal digest');
requireEqual(insertionHashWithout(S,'manifestSha256'),S.manifestSha256,'source manifest internal digest');
requireEqual(insertionHashWithout(X,'comparisonSha256'),X.comparisonSha256,'Standards comparison internal digest');
requireEqual(M.manifestHash,'960dc548c984c0f6aed591f40856cb2947491928e31d71e3a8d65b0fbca501a2','P10D manifest authority');
requireEqual(Q.count,408,'original queue count');requireEqual(Q.manifestHash,M.manifestHash,'queue manifest authority');
requireEqual(C.artifactHash,'623692e763031dede4d5a23d5bab076d10b9da84f2c3ab61535c86df9e40a0e2','R1A consolidated authority');
requireEqual(R.artifactHash,'9116b256ac41ee69e91ebc26aa87a6d1a5a854ea5a6ff08d13c53288da551fef','R1A mapping authority');
requireEqual(S.manifestSha256,'88b79cded80141c598058268e9bc69367b4c28a80403584a5bcba5970a46a62d','source manifest authority');
requireEqual(X.comparisonSha256,'20121d19c78e7909ca267ec8e85cbdc942642de844f97b8af14571ef7cca4330','Standards comparison authority');
requireEqual(T.transcriptionId,'sd-doe-welding-standards-may-2022','Standards transcription authority');
requireEqual(R.mappings.length,408,'R1A mapping coverage');

validateRelationships(M,Q,C,R);
requireEqual(S.sourceCount,S.sources.length,'source manifest count');
const sourceIds=new Set(),sourceNames=new Set();
for(const sourceEntry of S.sources){requireCondition(!sourceIds.has(sourceEntry.sourceId),`Duplicate source identity ${sourceEntry.sourceId}`);sourceIds.add(sourceEntry.sourceId);requireCondition(!sourceNames.has(sourceEntry.originalFilename),`Duplicate source filename ${sourceEntry.originalFilename}`);sourceNames.add(sourceEntry.originalFilename);const bytes=read(sourceEntry.repositoryPath);requireEqual(bytes.length,sourceEntry.byteLength,`${sourceEntry.originalFilename} source byte length`);requireEqual(sha(bytes),sourceEntry.sha256,`${sourceEntry.originalFilename} source digest`);}

const sourceByName=new Map(S.sources.map(x=>[x.originalFilename,x]));
function source(name){const x=sourceByName.get(name);if(!x)throw Error(`Missing preserved source ${name}`);const p=`source_authority/recovered_2026-09-29/source_material/${name}`;requireEqual(sha(read(p)),x.sha256,`${name} byte authority`);return{sourceId:x.sourceId,path:p,sha256:x.sha256,byteLength:x.byteLength};}
const sourceFiles={wtPdf:source('13207-WeldingTech.pdf'),awtPdf:source('13208-Adv-Welding.pdf'),wtHighlight:source('1000012648.jpg'),awtHighlight1:source('1000012642.jpg'),awtHighlight2:source('1000012643.jpg'),wtMap:source('Welding Technology Curriculum Map Revised.docx'),awtMap:source('Advanced Welding Technology Curriculum Map.docx')};

const discrepancies=Object.values(X.courses).flatMap(x=>x.rows).filter(x=>!x.wordingMatch);
requireEqual(discrepancies.length,2,'wording discrepancy count');
requireEqual(discrepancies.map(x=>x.code).join('|'),'WT 2.2|AWT 2.2','wording discrepancy identities');
for(const course of ['wt','awt']){requireEqual(X.courses[course].allCodesMatch,true,`${course} code/order comparison`);requireEqual(X.courses[course].allEssentialSelectionsMatch,true,`${course} Essential comparison`);}
const gateConfig={wt:{decisionId:'SV-WT-STANDARDS-SOURCE',pdf:sourceFiles.wtPdf,photos:[sourceFiles.wtHighlight],map:sourceFiles.wtMap},awt:{decisionId:'SV-AWT-STANDARDS-SOURCE',pdf:sourceFiles.awtPdf,photos:[sourceFiles.awtHighlight1,sourceFiles.awtHighlight2],map:sourceFiles.awtMap}};
const sourceResolutions=['wt','awt'].map(course=>{const t=T.courses[course],x=X.courses[course],g=gateConfig[course],differences=x.rows.filter(r=>!r.wordingMatch).map(r=>({code:r.code,officialWording:r.officialWording,repositoryWording:r.repositoryWording,parentStandard:r.parentStandard,webbLevel:r.webbLevel,webbLabel:r.webbLabel,controllingWording:'official'}));return{decisionId:g.decisionId,course,gateStatus:'RESOLVED_SOURCE_VERIFIED',selectedAuthority:'South Dakota Department of Education official course Standards, adopted May 2022',courseIdentity:{courseName:t.courseName,courseCode:t.courseCode,adopted:T.adopted,prerequisites:t.prerequisites,credit:t.credit},controllingSources:[g.pdf],comparison:{comparisonId:X.comparisonId,comparisonFile:fileRef(paths.comparison),standardCount:x.officialCount,codesAndOrderMatch:x.allCodesMatch,wordingMatchCount:x.rows.filter(r=>r.wordingMatch).length,wordingDifferences:differences,repositoryOmissions:x.repositoryOmissions},result:'Official wording controls a later separately authorized import. Existing abbreviated runtime text is preserved unchanged in R1B.',remainingImportDesignQuestions:['Define the authorized target representation for course metadata, parent Standard statements, and Webb levels/labels.','Validate or replace proposed target-version identities and hashes against the official-source content during later import planning.'],importAuthorized:false};});

const essentialProvenance=['wt','awt'].map(course=>{const t=T.courses[course],g=gateConfig[course];return{course,selections:t.instructorSelectedEssentialStandards,designationAuthority:'instructor-selected Essential Standards; not South Dakota DOE designations',provenance:[{kind:'explicit instructor confirmation',evidence:[fileRef(paths.findings),fileRef(paths.transcription)]},{kind:'orange-highlighted source photographs',evidence:g.photos},{kind:'recovered Curriculum Map',evidence:[g.map]}],newSelectionCreated:false};});
requireEqual(essentialProvenance.flatMap(x=>x.selections).length,10,'Essential selection count');

const effectiveDispositions=R.mappings.map(m=>{const mechanical=m.classification==='mechanical follow-on mapping',effectiveDisposition=mechanical?'PRESERVE_EXACT_CONTENT':'LEAVE_OPTIONAL_RELATIONSHIP_ABSENT';return{originalQueueIndex:m.originalQueueIndex,originalItemFingerprint:m.originalItemFingerprint,course:m.course,family:m.family,manifestRecordId:m.manifestRecordId,originalDisposition:m.originalDisposition,effectiveDisposition,reasonCode:m.decisionId,reason:mechanical?'Preserve the exact source record and text independently from optional normalized relationships.':'The source does not assert this optional normalized relationship; absence does not block content preservation.',controllingEvidence:{r1aDecisionId:m.decisionId,r1aMappingArtifact:R.artifactId,r1aMappingHash:R.artifactHash},blocksContentPreservation:false,authorizesImport:false};});
requireEqual(new Set(effectiveDispositions.map(x=>x.originalQueueIndex)).size,408,'unique original queue indexes');
requireEqual(new Set(effectiveDispositions.map(x=>x.originalItemFingerprint)).size,408,'unique original queue fingerprints');
requireEqual(effectiveDispositions.filter(x=>x.effectiveDisposition==='PRESERVE_EXACT_CONTENT').length,149,'content preservation count');
requireEqual(effectiveDispositions.filter(x=>x.effectiveDisposition==='LEAVE_OPTIONAL_RELATIONSHIP_ABSENT').length,259,'absent optional relationship count');

const preservedExplicitWtLessonCompetencyLinks=M.courses.wt.lessonVersionCompetencyLinks.filter(x=>x.disposition==='APPROVE_AS_IS').map(x=>({lessonCompetencyLinkId:x.lessonCompetencyLinkId,lessonVersionId:x.lessonVersionId,competencyId:x.competencyId,competencyVersionId:x.competencyVersionId,relationshipType:x.relationshipType,basis:x.basis,sourceRecordFingerprint:sha(x)}));
requireEqual(preservedExplicitWtLessonCompetencyLinks.length,51,'explicit WT Lesson-to-Competency link count');
requireEqual(M.courses.awt.lessonVersionCompetencyLinks.filter(x=>x.disposition==='APPROVE_AS_IS').length,0,'explicit AWT Lesson-to-Competency link count');
const exactStandardLinkCounts={};for(const course of ['wt','awt'])exactStandardLinkCounts[course]={curriculum:M.courses[course].curriculumItemStandardLinks.filter(x=>x.disposition==='APPROVE_AS_IS').length,lessons:M.courses[course].lessonVersionStandardLinks.filter(x=>x.disposition==='APPROVE_AS_IS').length};

const artifact={artifactId:'arc-p10d-r1b-source-disposition-freeze-v1',generatedBy:'scripts/generate_p10d_r1b_source_disposition_freeze.js',authorityType:'source reconciliation and disposition overlay only',startingAuthority:{commit:'16f7e186051d2778a6e8e0afb0fad4dfc72787d4',tree:'7893d41e59c3e20417ccc1cfcac3745afc88417e',academicAuthority:'V7_ONLY'},baseArtifacts:{instructionalManifest:{...fileRef(paths.manifest),manifestHash:M.manifestHash},humanReviewQueue:{...fileRef(paths.queue),count:Q.count,manifestHash:Q.manifestHash},consolidatedReviewQueue:{...fileRef(paths.consolidated),artifactHash:C.artifactHash},originalItemResolutionMap:{...fileRef(paths.map),artifactHash:R.artifactHash},sourceManifest:{...fileRef(paths.sourceManifest),manifestSha256:S.manifestSha256},standardsComparison:{...fileRef(paths.comparison),comparisonSha256:X.comparisonSha256},officialTranscription:fileRef(paths.transcription)},sourceResolutions,essentialProvenance,contentPreservation:{principle:'Preserve exact Curriculum and Lesson content independently from optional normalized relationships.',counts:{curriculumItems:35,lessonDefinitions:57,lessonVersions:57,total:149},requiredFields:['all exact source fields','ordering','instructional text','rawStandardsText','sourceStandardsText'],contextualTextTreatment:'Ranges and contextual text remain source prose; they are not expanded into unsupported links.'},optionalRelationships:{counts:{curriculumToCompetency:45,lessonToCompetency:107,lessonToCurriculum:105,activityEvidence:2,total:259},effectiveDisposition:'LEAVE_OPTIONAL_RELATIONSHIP_ABSENT',nonblocking:true},effectiveDispositions,preservedApprovedRelationships:{explicitWtLessonCompetencyLinks:preservedExplicitWtLessonCompetencyLinks,awtLessonCompetencyLinksCreated:0,exactCodeStandardLinks:{counts:exactStandardLinkCounts,rule:'Retain existing exact-code relationships subject to the resolved official source/version boundary. A later importer must validate target-version references; R1B does not rewrite historical identities or hashes.'}},lessonAcceptanceBoundary:'Preservation of 124 Lessons does not establish instructional acceptance. Differentiation and content improvement remain Classroom Readiness requirements.',remainingLimits:['No instructional content import is authorized.','No runtime, UI, build, cache, schema, store, database, parity, production, or Samsung authority changes.','Target representation and target-version identity for official metadata, parent Standards, Webb levels/labels, and official wording remain later import-design work.','The two Activity/Evidence relationships remain absent until exact P6 identities are separately authorized.'],importAuthorization:{authorized:false,dryRunAuthorized:false,databaseMutationAuthorized:false,nextPossibleStep:'Separately scoped reviewed import/dry-run planning after R1B acceptance.'}};
artifact.artifactHash=sha({...artifact,artifactHash:undefined});
fs.writeFileSync(OUT,JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({artifactId:artifact.artifactId,artifactHash:artifact.artifactHash,sourceGates:artifact.sourceResolutions.map(x=>({decisionId:x.decisionId,status:x.gateStatus,differences:x.comparison.wordingDifferences.length})),essentialSelections:essentialProvenance.flatMap(x=>x.selections).length,effectiveDispositions:effectiveDispositions.length,contentOnly:149,absentOptional:259,preservedExplicitWtLinks:preservedExplicitWtLessonCompetencyLinks.length,importAuthorized:false},null,2));
}
if(require.main===module)main();
module.exports={validateRelationships};
