/* Pure P10D-P1 review-output compiler. No ARC runtime or database access. */
'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {validateRelationships}=require('./generate_p10d_r1b_source_disposition_freeze.js');
const FORMAT='arc-p10d-proposed-instructional-payload-v1';
const PLAN={path:'ARC_P10D_IMPORT_DRY_RUN_PLAN.md',byteLength:29120,sha256:'cfad483e3266a646d8efc2d40581b0d834940cd38e62bc25c8b262f106b5932b'};
const INPUTS={
 manifest:['reconciliation/p10d/instructional-content-manifest.json',1642864,'f6471c88e846dd811aa8603b494611d4f5efc23a7c03eb554589f9f6d732a24d'],
 queue:['reconciliation/p10d/human-review-queue.json',150011,'d59bcfc812ac9247170d64ea5c0c41a5621a81e174e3ebb0a65b8b5cb8ab0d88'],
 consolidated:['reconciliation/p10d/consolidated-review-queue.json',9286,'f09a181f9ffef6d7749639de3d924ae853ca2a187f1d140409808c4f29c44d81'],
 map:['reconciliation/p10d/original-item-resolution-map.json',294006,'f867cf3251599844e93d87aec6967c5416220442649786e679d47e9d32018a57'],
 r1b:['reconciliation/p10d/r1b-source-disposition-freeze.json',462783,'6bf00f4973aa6e7be8860d810190df22c9ddf40787998fb0198e2216e0e3e22a'],
 sourceManifest:['source_authority/recovered_2026-09-29/source-manifest.json',24626,'368abefcd489a70ff20178c34d62067a705c68641b202ea20a0384187e9d01a7'],
 comparison:['source_authority/recovered_2026-09-29/standards-comparison.json',18223,'ab7bb4ee7cdbae22d0538c60e856a03492bfff8c5d1ea12e40bd14ca5549221a'],
 transcription:['source_authority/recovered_2026-09-29/transcriptions/south-dakota-welding-standards.json',7683,'f7ee8d19dd99bc6d1d404f6f3449d121b30d2bf50e648818a89ce4f7942c7d55'],
 findings:['source_authority/recovered_2026-09-29/SOURCE_AUTHORITY_FINDINGS.md',9220,'241e2ea9e159f07cbb08fae37025badaf009f10c2dbcd3ba979d9126b6ec1eee']
};
const BLOCKERS=[
 ['COURSE_STANDARD_METADATA','Official Course, parent Standard, and Webb metadata ownership remains unresolved.'],
 ['TARGET_IDENTITY_VERSION','Final target identity/version rules and dependent-link rebinding remain unresolved.'],
 ['COMPETENCY_PERSISTENCE','Complete Competency persistence and identity authority remains unresolved.'],
 ['CURRICULUM_REPRESENTATION','Curriculum quarter, per-item provenance, and scalar/array representation remain unresolved.'],
 ['LESSON_REPRESENTATION','Lesson conversion/provenance and preservation-versus-availability treatment remain unresolved.'],
 ['ESSENTIAL_PROVENANCE','Structured Essential-selection provenance and historical selection/import-event separation remain unresolved.'],
 ['LINK_PROVENANCE','Exact normalized-link provenance remains unresolved.'],
 ['PACKAGE_RECOVERY','Package completion and recovery authority remains unresolved.']
].map((x,i)=>({order:i+1,code:x[0],status:'UNRESOLVED',detail:x[1]}));
const ROLE_CONFIG={
 standardCatalogs:['STANDARD_CATALOG','createStandardCatalog','standard_catalogs','standardCatalogId'],
 standardCatalogVersions:['STANDARD_CATALOG_VERSION','createStandardCatalogVersion','standard_catalog_versions','standardCatalogVersionId'],
 essentialStandardDesignations:['ESSENTIAL_STANDARD_DESIGNATION','designateEssentialStandard','essential_standard_designations','essentialStandardDesignationId'],
 curriculumMaps:['CURRICULUM_MAP','createCurriculumMap','curriculum_maps','curriculumMapId'],
 curriculumMapVersions:['CURRICULUM_MAP_VERSION','createCurriculumMapVersion','curriculum_map_versions','curriculumMapVersionId'],
 curriculumMapItems:['CURRICULUM_MAP_ITEM','createCurriculumMapItem','curriculum_map_items','curriculumMapItemId'],
 curriculumItemStandardLinks:['CURRICULUM_STANDARD_LINK','linkCurriculumItemStandard','curriculum_item_standard_links','curriculumItemStandardLinkId'],
 lessonDefinitions:['LESSON_DEFINITION','createLessonDefinition','lesson_definitions','lessonId'],
 lessonVersions:['LESSON_VERSION','createLessonVersionBundle','lesson_versions','lessonVersionId'],
 lessonVersionStandardLinks:['LESSON_STANDARD_LINK','createLessonVersionBundle.relationships.standards','lesson_version_standard_links','lessonStandardLinkId'],
 lessonVersionCompetencyLinks:['LESSON_COMPETENCY_LINK','createLessonVersionBundle.relationships.competencies','lesson_version_competency_links','lessonCompetencyLinkId']
};
function stable(v){if(Array.isArray(v))return v.map(stable);if(v&&typeof v==='object')return Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])]));return v;}
function digest(v){return crypto.createHash('sha256').update(Buffer.isBuffer(v)?v:JSON.stringify(stable(v))).digest('hex');}
function clone(v){return JSON.parse(JSON.stringify(v));}
function without(v,key){const x={...v};delete x[key];return x;}
function insertionDigest(v,key){return crypto.createHash('sha256').update(JSON.stringify(without(v,key))).digest('hex');}
function assert(value,message){if(!value)throw Error(message);}
function equal(actual,expected,message){if(actual!==expected)throw Error(`${message}: expected ${expected}, received ${actual}`);}
function readAcceptedInputs(root){
 const bytes={},parsed={};
 for(const [name,[relative,size,hash]] of Object.entries(INPUTS)){
  const absolute=path.join(root,relative),value=fs.readFileSync(absolute);bytes[name]=value;
  equal(value.length,size,`${name} byte length`);equal(digest(value),hash,`${name} frozen byte authority`);
  if(relative.endsWith('.json'))parsed[name]=JSON.parse(value.toString('utf8'));
 }
 return{bytes,parsed};
}
function validateAcceptedInputs(root,accepted){
 const p=accepted.parsed,M=p.manifest,Q=p.queue,C=p.consolidated,R=p.map,B=p.r1b,S=p.sourceManifest,X=p.comparison,T=p.transcription;
 equal(digest(without(M,'manifestHash')),M.manifestHash,'P10D manifest internal digest');
 equal(digest(without(C,'artifactHash')),C.artifactHash,'R1A consolidated internal digest');
 equal(digest(without(R,'artifactHash')),R.artifactHash,'R1A map internal digest');
 equal(digest(without(B,'artifactHash')),B.artifactHash,'R1B internal digest');
 equal(insertionDigest(S,'manifestSha256'),S.manifestSha256,'source manifest internal digest');
 equal(insertionDigest(X,'comparisonSha256'),X.comparisonSha256,'Standards comparison internal digest');
 equal(M.manifestHash,'960dc548c984c0f6aed591f40856cb2947491928e31d71e3a8d65b0fbca501a2','manifest authority');
 equal(B.artifactHash,'ce7ba279ba4e6958144c58ae76b756c0ead535b3a52f96da93eb06aaca3fbd76','R1B authority');
 equal(Q.count,408,'queue count');equal(B.effectiveDispositions.length,408,'R1B disposition count');
 validateRelationships(M,Q,C,R);
 const byIndex=new Map(B.effectiveDispositions.map(x=>[x.originalQueueIndex,x]));
 equal(byIndex.size,408,'unique R1B disposition indexes');
 for(const mapping of R.mappings){const b=byIndex.get(mapping.originalQueueIndex);assert(b,'R1B disposition missing');equal(b.originalItemFingerprint,mapping.originalItemFingerprint,'R1B backreference');equal(b.manifestRecordId,mapping.manifestRecordId,'R1B manifest identity');}
 equal(S.sourceCount,S.sources.length,'source manifest count');
 const ids=new Set();for(const source of S.sources){assert(!ids.has(source.sourceId),`duplicate source ${source.sourceId}`);ids.add(source.sourceId);const value=fs.readFileSync(path.join(root,source.repositoryPath));equal(value.length,source.byteLength,`${source.originalFilename} bytes`);equal(digest(value),source.sha256,`${source.originalFilename} hash`);}
 equal(T.transcriptionId,'sd-doe-welding-standards-may-2022','official transcription identity');
 for(const course of ['wt','awt']){equal(X.courses[course].allCodesMatch,true,`${course} Standards order`);equal(X.courses[course].allEssentialSelectionsMatch,true,`${course} Essential selections`);}
 equal(Object.values(X.courses).flatMap(x=>x.rows).filter(x=>!x.wordingMatch).map(x=>x.code).join('|'),'WT 2.2|AWT 2.2','official wording differences');
 return true;
}
function dispositionIndex(r1b){return new Map(r1b.effectiveDispositions.map(x=>[`${x.course}|${x.family}|${x.manifestRecordId}`,x]));}
function officialByCode(transcription){const map=new Map();for(const course of ['wt','awt'])for(const row of transcription.courses[course].standards)map.set(row.code,row);return map;}
function targetProposal(roleType,method,store,record,official){
 const proposal={owningService:roleType.startsWith('LESSON')?'ArcV8LessonPlans':'ArcV8CurriculumPacing',writerMethod:method,targetStore:store,targetId:null,targetVersionId:null,targetPayloadHash:null,targetAvailability:'UNRESOLVED',representationStatus:'PROPOSED_INCOMPLETE'};
 const transformations=[];
 if(roleType==='STANDARD_VERSION'&&official){proposal.proposedOfficialWording=official.wording;proposal.historicalRepositoryWording=record.wording;proposal.officialMetadata={parentStandard:official.parentStandard,webbLevel:official.webbLevel,webbLabel:official.webbLabel};transformations.push({type:'OFFICIAL_WORDING_CONTROLS_PROPOSED_CONTENT',reversible:true,historicalSourceRetained:true});}
 if(roleType==='LESSON_VERSION'&&typeof record.engagementStrategies==='string'){proposal.proposedEngagementStrategies=[record.engagementStrategies];transformations.push({type:'SCALAR_TO_SINGLETON_ARRAY_CANDIDATE',field:'engagementStrategies',originalValue:record.engagementStrategies,candidateValue:[record.engagementStrategies],status:'PROPOSED_REPRESENTATION_UNRESOLVED'});}
 return{proposal,transformations};
}
function makeRole(course,family,roleType,method,store,idField,record,effective,official){
 const sourceIdentity=record[idField];assert(sourceIdentity,`${course}.${family} source identity missing`);
 const proposed=targetProposal(roleType,method,store,record,official);
 const role={reviewRecordKey:`${roleType}|${course}|${sourceIdentity}`,roleType,course,sourceFamily:family,sourceIdentity,sourceRecord:clone(record),effectiveR1BDisposition:effective?clone(effective):{effectiveDisposition:record.disposition,reason:'Accepted source record did not require the historical review queue.'},targetProposal:proposed.proposal,proposedTransformations:proposed.transformations,unresolvedBlockerCodes:BLOCKERS.map(x=>x.code),sourceInclusionStatus:'INCLUDED_FOR_REVIEW',targetReadiness:'BLOCKED',finalTargetIdentityEstablished:false,finalTargetPayloadHashEstablished:false};
 role.reviewEnvelopeHash=digest(role);return role;
}
function compileModel(parsed){
 const M=parsed.manifest,B=parsed.r1b,T=parsed.transcription,disp=dispositionIndex(B),official=officialByCode(T),roles=[],exclusions=[];
 const add=(course,family,record,config,roleOverride,idOverride)=>{const c=config||ROLE_CONFIG[family],role=roleOverride||c[0],idField=idOverride||c[3],id=record[idField],e=disp.get(`${course}|${family}|${id}`);roles.push(makeRole(course,family,role,c[1],c[2],idField,record,e,official.get(record.externalCode)));};
 for(const course of ['wt','awt']){const data=M.courses[course];
  for(const family of ['standardCatalogs','standardCatalogVersions'])for(const row of data[family])add(course,family,row);
  for(const row of data.standards){add(course,'standards',row,['STANDARD_DEFINITION','createStandardDefinition','standard_definitions','standardId']);add(course,'standards',row,['STANDARD_VERSION','createStandardVersion','standard_versions','standardVersionId']);}
  for(const row of data.essentialStandardDesignations)add(course,'essentialStandardDesignations',row);
  for(const row of data.competencies){add(course,'competencies',row,['COMPETENCY_DEFINITION','P7 competency authority (representation unresolved)','competency_definitions','competencyId']);add(course,'competencies',row,['COMPETENCY_VERSION','P7 competency authority (representation unresolved)','competency_versions','competencyVersionId']);}
  for(const family of ['curriculumMaps','curriculumMapVersions','curriculumMapItems','curriculumItemStandardLinks','lessonDefinitions','lessonVersions','lessonVersionStandardLinks'])for(const row of data[family])add(course,family,row);
  for(const row of data.lessonVersionCompetencyLinks){if(row.disposition==='APPROVE_AS_IS')add(course,'lessonVersionCompetencyLinks',row);else exclusions.push(exclusion(course,'lessonVersionCompetencyLinks',row,disp));}
  for(const family of ['curriculumItemCompetencyLinks','lessonVersionCurriculumLinks','lessonVersionActivityLinks'])for(const row of data[family])exclusions.push(exclusion(course,family,row,disp));
 }
 equal(roles.length,859,'potential content-role count');equal(new Set(roles.map(x=>x.reviewRecordKey)).size,859,'unique content-role keys');
 equal(exclusions.length,259,'optional exclusion count');equal(roles.filter(x=>x.roleType==='LESSON_COMPETENCY_LINK').length,51,'approved WT Lesson Competency links');
 equal(roles.filter(x=>x.roleType==='LESSON_VERSION'&&typeof x.sourceRecord.engagementStrategies==='string').length,124,'Lesson scalar Engagement Strategies');
 const counts={courseContextValidations:2,potentialContentRoles:roles.length,historicalQueueDispositions:B.effectiveDispositions.length,nonblockingOptionalRelationshipExclusions:exclusions.length,approvedWtLessonCompetencyRelationships:51,uniqueUnresolvedBlockers:BLOCKERS.length,blockedContentRoles:roles.filter(x=>x.targetReadiness==='BLOCKED').length};
 const payload={format:FORMAT,status:'PROPOSED_UNIMPORTED',readiness:'NOT_READY_FOR_REHEARSAL',academicAuthority:'V7_ONLY',planAuthority:PLAN,inputValidation:'passed',compilation:'completed',authorizations:{import:false,persistedRehearsal:false,production:false,authorityTransfer:false,realStudentData:false},targetInspection:{databaseInspected:false,targetReadbackPerformed:false},courseContextValidations:[{sourceCourse:'wt',canonicalCourseId:'arc-course-wt',result:'CONTEXT_ONLY_NO_COURSE_CREATE'},{sourceCourse:'awt',canonicalCourseId:'arc-course-awt',result:'CONTEXT_ONLY_NO_COURSE_CREATE'}],unresolvedBaseline:{version:'p10d-p1-unresolved-baseline-v1',blockers:BLOCKERS},counts,roles,nonblockingExclusions:exclusions,historicalDispositions:clone(B.effectiveDispositions)};
 payload.reviewPackageHash=digest(payload);
 const identity={format:'arc-p10d-source-to-target-identity-map-v1',status:'PROPOSED_UNIMPORTED',readiness:'NOT_READY_FOR_REHEARSAL',entries:roles.map(x=>({reviewRecordKey:x.reviewRecordKey,course:x.course,roleType:x.roleType,sourceFamily:x.sourceFamily,sourceIdentity:x.sourceIdentity,targetStore:x.targetProposal.targetStore,targetId:null,targetVersionId:null,targetPayloadHash:null,status:'BLOCKED_UNRESOLVED_TARGET_IDENTITY',reviewEnvelopeHash:x.reviewEnvelopeHash})),counts:{entries:roles.length,resolvedTargetIdentities:0,blockedTargetIdentities:roles.length}};identity.reviewMapHash=digest(identity);
 const report={format:'arc-p10d-p1-dry-run-report-v1',status:'PROPOSED_UNIMPORTED',readiness:'NOT_READY_FOR_REHEARSAL',inputValidation:'passed',compilation:'completed',counts,blockers:BLOCKERS,exclusionCounts:{curriculumToCompetency:45,lessonToCompetency:107,lessonToCurriculum:105,activityEvidence:2,total:259},fieldLossRisks:[{field:'engagementStrategies',affectedRecords:124,risk:'Source scalar requires a reviewed target representation; exact source strings remain visible.'},{field:'official Standard metadata',affectedRecords:29,risk:'Course, parent Standard, and Webb metadata have no approved persisted ownership.'}],authorizations:{import:false,persistedRehearsal:false,production:false,authorityTransfer:false},targetDatabaseInspected:false,targetReadbackPerformed:false};report.reviewReportHash=digest(report);
 return{payload,identity,report};
}
function exclusion(course,family,record,disp){const id=record.curriculumMapItemId||record.lessonVersionId;const effective=disp.get(`${course}|${family}|${id}`);assert(effective,`${course}.${family}.${id} missing R1B absence disposition`);return{course,sourceFamily:family,sourceIdentity:id,sourceRecord:clone(record),effectiveR1BDisposition:clone(effective),storageRowsCreated:0,blocksContentPreservation:false,status:'SETTLED_OPTIONAL_RELATIONSHIP_ABSENT'};}
function validateProposalModel(model){
 const roles=model.payload.roles,keys=new Set(),standards=new Map(),competencies=new Map(),lessons=new Set();
 for(const role of roles){
  assert(!keys.has(role.reviewRecordKey),`duplicate review role ${role.reviewRecordKey}`);keys.add(role.reviewRecordKey);
  if(Object.prototype.hasOwnProperty.call(role.sourceRecord,'courseId'))assert(role.sourceRecord.courseId===role.course,`${role.reviewRecordKey} wrong Course scope`);
  assert(role.targetProposal.targetId===null&&role.targetProposal.targetVersionId===null&&role.targetProposal.targetPayloadHash===null,`${role.reviewRecordKey} stale or resolved target proposal`);
  if(role.roleType==='STANDARD_VERSION')standards.set(`${role.course}|${role.sourceRecord.standardVersionId}`,role);
  if(role.roleType==='COMPETENCY_VERSION')competencies.set(`${role.course}|${role.sourceRecord.competencyVersionId}`,role);
  if(role.roleType==='LESSON_VERSION')lessons.add(`${role.course}|${role.sourceRecord.lessonVersionId}`);
 }
 for(const role of roles){const row=role.sourceRecord;
  if(role.roleType==='CURRICULUM_STANDARD_LINK'||role.roleType==='LESSON_STANDARD_LINK')assert(standards.has(`${role.course}|${row.standardVersionId}`),`${role.reviewRecordKey} broken or cross-Course Standard Version reference`);
  if(role.roleType==='LESSON_COMPETENCY_LINK'){assert(lessons.has(`${role.course}|${row.lessonVersionId}`),`${role.reviewRecordKey} broken Lesson Version reference`);assert(competencies.has(`${role.course}|${row.competencyVersionId}`),`${role.reviewRecordKey} broken or cross-Course Competency Version reference`);assert(row.disposition==='APPROVE_AS_IS',`${role.reviewRecordKey} contradictory approved-link disposition`);}
 }
 for(const item of model.payload.nonblockingExclusions){assert(item.effectiveR1BDisposition.effectiveDisposition==='LEAVE_OPTIONAL_RELATIONSHIP_ABSENT',`${item.sourceIdentity} contradictory optional-link disposition`);assert(item.storageRowsCreated===0,`${item.sourceIdentity} optional exclusion became a storage row`);}
 return true;
}
function reportMarkdown(r){return `# ARC P10D-P1 proposed instructional payload report\n\n- Status: **${r.status}**\n- Readiness: **${r.readiness}**\n- Input validation: **${r.inputValidation}**\n- Compilation: **${r.compilation}**\n- Potential content roles: **${r.counts.potentialContentRoles}**\n- Blocked content roles: **${r.counts.blockedContentRoles}**\n- Historical queue dispositions: **${r.counts.historicalQueueDispositions}**\n- Nonblocking optional relationship exclusions: **${r.counts.nonblockingOptionalRelationshipExclusions}**\n- Unique unresolved blockers: **${r.counts.uniqueUnresolvedBlockers}**\n\nThis is a deterministic review package. It is not an import, a persisted rehearsal, instructional acceptance, production authorization, or authority transfer. No target database was inspected and no target readback was performed.\n\n## Unresolved blockers\n\n${r.blockers.map(x=>`${x.order}. **${x.code}** — ${x.detail}`).join('\n')}\n`}
function serialize(model){const files={
  'proposed-instructional-payload.json':JSON.stringify(model.payload,null,2)+'\n',
  'source-to-target-identity-map.json':JSON.stringify(model.identity,null,2)+'\n',
  'dry-run-report.json':JSON.stringify(model.report,null,2)+'\n',
  'dry-run-report.md':reportMarkdown(model.report)
 };const inventory=['# Included files — SHA-256','','This inventory intentionally excludes itself.',''];for(const name of Object.keys(files).sort())inventory.push(`- \`${name}\` — ${Buffer.byteLength(files[name])} bytes — \`${digest(Buffer.from(files[name]))}\``);files['INCLUDED_FILES_SHA256.md']=inventory.join('\n')+'\n';return files;}
function overlaps(a,b){const rel=path.relative(a,b);return rel===''||(!rel.startsWith('..'+path.sep)&&rel!=='..'&&!path.isAbsolute(rel));}
function validateOutputPath(root,output){const rootReal=fs.realpathSync(root),resolved=path.resolve(output);assert(!fs.existsSync(resolved),'Output directory must not already exist.');let parent=path.dirname(resolved);assert(fs.existsSync(parent),'Output parent directory must already exist.');const parentReal=fs.realpathSync(parent),final=path.join(parentReal,path.basename(resolved));assert(!overlaps(rootReal,final)&&!overlaps(final,rootReal),'Output directory must not overlap the repository.');const stat=fs.lstatSync(parent);assert(!stat.isSymbolicLink(),'Output parent must not be a symbolic link or junction.');return final;}
function publishFiles(root,output,files){const final=validateOutputPath(root,output),parent=path.dirname(final),stage=path.join(parent,`.p10d-p1-stage-${process.pid}`);assert(!fs.existsSync(stage),'Compiler staging path already exists.');try{fs.mkdirSync(stage);for(const [name,text] of Object.entries(files))fs.writeFileSync(path.join(stage,name),text,{flag:'wx'});for(const [name,text] of Object.entries(files))equal(fs.readFileSync(path.join(stage,name),'utf8'),text,`${name} staged readback`);fs.renameSync(stage,final);}catch(error){if(fs.existsSync(stage))fs.rmSync(stage,{recursive:true,force:true});throw error;}return final;}
function compile(options){const root=path.resolve(options.root),accepted=readAcceptedInputs(root);validateAcceptedInputs(root,accepted);const model=compileModel(accepted.parsed);validateProposalModel(model);const files=serialize(model);const output=publishFiles(root,options.outputDirectory,files);return{outputDirectory:output,files:Object.keys(files).sort(),counts:model.report.counts,status:model.report.status,readiness:model.report.readiness};}
function parseCli(argv){assert(argv.length===2&&argv[0]==='--output-directory'&&argv[1],'Usage: node scripts/compile_p10d_proposed_instructional_payload.js --output-directory <new-external-directory>');assert(!/(context|identity|ready|hash|import|database)/i.test(argv.join(' ')),'Unsupported authority/context option.');return argv[1];}
function main(){try{const output=parseCli(process.argv.slice(2)),result=compile({root:path.resolve(__dirname,'..'),outputDirectory:output});process.stdout.write(JSON.stringify(result,null,2)+'\n');}catch(error){process.stderr.write(`P10D-P1 compiler refused: ${error.message}\n`);process.exitCode=1;}}
if(require.main===module)main();
module.exports={FORMAT,INPUTS,BLOCKERS,stable,digest,readAcceptedInputs,validateAcceptedInputs,compileModel,validateProposalModel,serialize,validateOutputPath,compile,parseCli};
