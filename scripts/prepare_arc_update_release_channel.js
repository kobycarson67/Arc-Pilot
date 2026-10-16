const fs=require('node:fs');
const path=require('node:path');
const Provenance=require('../src/arc_runtime_provenance');

class ChannelPreparationError extends Error{constructor(code,message,details){super(message);this.name='ChannelPreparationError';this.code=code;this.details=details||null}}
function fail(code,message,details){throw new ChannelPreparationError(code,message,details)}
function exactCommit(value){if(!/^[0-9a-f]{40}$/.test(value||''))fail('EVIDENCE_COMMIT_INVALID','Evidence commit must be an exact lowercase 40-character Git commit.');return value}
function evidencePath(value,label){if(typeof value!=='string'||!value||value.startsWith('/')||value.includes('\\')||value.split('/').some(part=>!part||part==='.'||part==='..')||/[?#]/.test(value))fail('EVIDENCE_PATH_INVALID',label+' must be one unambiguous repository-relative path.');return value}
function prefixUrl(value){let url;try{url=new URL(value)}catch{fail('REPOSITORY_PREFIX_INVALID','Repository raw URL prefix is invalid.')}if(url.protocol!=='https:'||url.search||url.hash||!url.pathname.endsWith('/'))fail('REPOSITORY_PREFIX_INVALID','Repository raw URL prefix must be an exact HTTPS directory URL.');return url.href}
async function prepare(options){
  options=options||{};
  const manifestText=fs.readFileSync(path.resolve(options.manifestPath),'utf8');
  const receiptText=fs.readFileSync(path.resolve(options.receiptPath),'utf8');
  const manifest=await Provenance.validateReleaseManifest(manifestText);
  const checked=await Provenance.validateReceipt(receiptText,manifest);
  const evidenceCommit=exactCommit(options.evidenceCommit);
  const manifestRelativePath=evidencePath(options.manifestRelativePath,'Manifest path');
  const receiptRelativePath=evidencePath(options.receiptRelativePath,'Receipt path');
  const repositoryPrefix=prefixUrl(options.repositoryPrefix);
  const channel={
    assetCount:manifest.assets.length,
    closureSha256:manifest.closureSha256,
    evidenceCommit,
    format:'ARC_UPDATE_RELEASE_CHANNEL',
    formatVersion:1,
    manifestSha256:manifest.manifestSha256,
    manifestUrl:repositoryPrefix+evidenceCommit+'/'+manifestRelativePath,
    receiptSha256:checked.receiptSha256,
    receiptUrl:repositoryPrefix+evidenceCommit+'/'+receiptRelativePath,
    releaseId:manifest.releaseId,
    reviewedAt:checked.receipt.independentReview.reviewedAt,
    reviewerAuthority:checked.receipt.independentReview.reviewerAuthority,
    status:'accepted'
  };
  return{channel,channelText:Provenance.canonicalize(channel),manifest,receipt:checked.receipt,receiptSha256:checked.receiptSha256};
}
function args(argv){let out={};for(let i=0;i<argv.length;i++){let value=argv[i];if(value==='--manifest')out.manifestPath=argv[++i];else if(value==='--receipt')out.receiptPath=argv[++i];else if(value==='--evidence-commit')out.evidenceCommit=argv[++i];else if(value==='--repository-prefix')out.repositoryPrefix=argv[++i];else if(value==='--manifest-path')out.manifestRelativePath=argv[++i];else if(value==='--receipt-path')out.receiptRelativePath=argv[++i];else if(value==='--out')out.outputPath=argv[++i];else fail('UNKNOWN_ARGUMENT','Unknown argument.',{argument:value})}return out}
async function main(){let options=args(process.argv.slice(2));for(let key of ['manifestPath','receiptPath','evidenceCommit','repositoryPrefix','manifestRelativePath','receiptRelativePath','outputPath'])if(!options[key])fail('ARGUMENT_REQUIRED',key+' is required.');let result=await prepare(options);fs.writeFileSync(path.resolve(options.outputPath),result.channelText);process.stdout.write(JSON.stringify({output:path.resolve(options.outputPath),releaseId:result.channel.releaseId,manifestSha256:result.channel.manifestSha256,receiptSha256:result.channel.receiptSha256,assetCount:result.channel.assetCount})+'\n')}
if(require.main===module)main().catch(error=>{console.error(JSON.stringify({error:error.code||error.name,message:error.message,details:error.details||null}));process.exitCode=1});
module.exports={prepare,ChannelPreparationError};
