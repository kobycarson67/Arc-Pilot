const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const fs = require('node:fs');
const vm = require('node:vm');
const Provenance = require('../src/arc_runtime_provenance');
const Closure = require('../src/arc_service_worker_closure');
const Transport = require('../src/arc_runtime_release_transport');

const ORIGIN = 'https://arc.invalid';
const FAILED = '6d74481f6b96adc602a0ce2536891d5d7406ac66';
const PREDECESSOR = 'adb6ede1bcd12b5e422c5dd6cd745df48df5e001';
const REVISION = 'live-student-profile-verified-release-identity-repair-1';
const CLASSROOM_OPERATIONS_REVISION = 'dual-period-temporary-shop-visitor-1';
const COMBINED_UPDATE_REVISION = 'combined-classroom-usability-autobackup-1';
const EQUIPMENT_AMENDMENT_REVISION = 'equipment-inventory-booth-amendment-1';
const EQUIPMENT_SELECTOR_UI_REVISION = 'equipment-selector-ui-completion-1';
const SIDEBAR_HUBS_REPAIR_REVISION = 'sidebar-hubs-gradebook-attendance-technical-repair-1-technical-profile-assignment-completion-1-technical-assignment-history-sidebar-dual-period-repair-1';
const COORDINATED_CLASSROOM_REPAIR_REVISION = 'coordinated-classroom-repair-10-findings-3';
const BATCH_B_MULTI_SECTION_STARTUP_REPAIR_REVISION = 'batch-b-multi-section-startup-repair-1';
const bounds = {
  compatibilityContractId: 'arc-academic-schedule-v1',
  academicSchedule: 'V8_AUTHORITATIVE',
  authorities: {
    attendancePasses: 'V7_ONLY', projectsTechnical: 'V7_ONLY', competencyEvidence: 'V7_ONLY',
    workplaceSafetyBehavior: 'V7_ONLY', gradebook: 'V7_ONLY', curriculumPacing: 'V7_ONLY', lessonPlans: 'V7_ONLY'
  },
  realStudentDataAuthorized: false,
  transfersAuthority: false
};

function buildAt(ref) {
  const source = ref ? cp.execFileSync('git', ['show', `${ref}:app-build.js`], { encoding: 'utf8' }) : fs.readFileSync('app-build.js', 'utf8');
  const context = {};
  vm.runInNewContext(source, context);
  return context.ARC_BUILD;
}

class FakeResponse {
  constructor(bytes, options = {}) { this.bytes = Buffer.from(bytes); this.ok = options.ok !== false; this.status = options.status || 200; this.redirected = !!options.redirected; this.url = options.url || ''; }
  async arrayBuffer() { return this.bytes.buffer.slice(this.bytes.byteOffset, this.bytes.byteOffset + this.bytes.byteLength); }
  async text() { return this.bytes.toString('utf8'); }
  clone() { return new FakeResponse(this.bytes, { ok: this.ok, status: this.status, redirected: this.redirected, url: this.url }); }
}
function pathOf(value) { const raw = typeof value === 'string' ? value : value.url; return new URL(raw, `${ORIGIN}/`).pathname.replace(/^\/+/, ''); }
class MemoryCache {
  constructor() { this.rows = new Map(); }
  async match(value) { const row = this.rows.get(pathOf(value)); return row && row.clone(); }
  async put(value, response) { this.rows.set(pathOf(value), new FakeResponse(Buffer.from(await response.arrayBuffer()), { url: `${ORIGIN}/${pathOf(value)}` })); }
  async keys() { return [...this.rows.keys()].map(path => ({ url: `${ORIGIN}/${path}` })); }
  async delete(value) { return this.rows.delete(pathOf(value)); }
}
class MemoryCaches {
  constructor() { this.map = new Map(); }
  async open(name) { if (!this.map.has(name)) this.map.set(name, new MemoryCache()); return this.map.get(name); }
  async keys() { return [...this.map.keys()]; }
  async delete(name) { return this.map.delete(name); }
}

async function evidence(commit, tree, buildIdentity) {
  const raw = { 'app-build.js': Buffer.from(`build=${buildIdentity}`), 'index.html': Buffer.from(`release=${commit}`) };
  const manifest = await Provenance.createReleaseManifest({
    commit, tree, buildIdentity, closureContractVersion: 1, schemaVersion: 8, indexedDbVersion: 14, storeCount: 74,
    domainBounds: bounds,
    assets: Object.entries(raw).map(([path, bytes]) => ({ path, role: path === 'index.html' ? 'normal-shell' : 'authority-executable', bytes }))
  });
  const receipt = {
    format: Provenance.constants.receiptFormat, formatVersion: 1,
    compatibilityContractId: Provenance.constants.contractId, threatModel: Provenance.constants.threatModel,
    commit, tree, releaseId: manifest.releaseId, manifestSha256: manifest.manifestSha256,
    closureSha256: manifest.closureSha256, transfersAuthority: false, realStudentDataAuthorized: false,
    independentReview: { status: 'accepted', evidenceSha256: crypto.createHash('sha256').update(commit).digest('hex'), reviewedAt: '2026-11-08T12:00:00Z', reviewerAuthority: 'isolated-repair-review' }
  };
  const manifestText = Provenance.canonicalize(manifest), receiptText = Provenance.canonicalize(receipt);
  return { raw, manifest, manifestText, receiptText, receiptSha256: await Provenance.sha256(receiptText) };
}

function coordinator(caches, release, roleRef) {
  const instance = Transport.createWorkerCoordinator({
    provenance: Provenance, closureVerifier: Closure, caches,
    fetch: async url => { const path = new URL(url).pathname.replace(/^\/+/, ''); return new FakeResponse(release.raw[path] || 'missing', { ok: !!release.raw[path], status: release.raw[path] ? 200 : 404, url }); },
    origin: ORIGIN, baseUrl: `${ORIGIN}/`, expectedBuildIdentity: release.manifest.buildIdentity,
    lifecycleRole: () => roleRef.value, skipWaiting: async () => { roleRef.skips++; }
  });
  const payload = {
    manifestBytes: release.manifestText, receiptBytes: release.receiptText,
    expectedReceiptSha256: release.receiptSha256, expectedReleaseId: release.manifest.releaseId,
    expectedManifestSha256: release.manifest.manifestSha256, expectedClosureSha256: release.manifest.closureSha256,
    expectedAssetCount: release.manifest.assets.length
  };
  return { instance, payload };
}
async function request(instance, type, nonce, payload = {}) {
  const response = await instance.dispatch(Transport.envelope(type, nonce, payload));
  if (!response.payload.ok) throw Object.assign(new Error(response.payload.error.message), response.payload.error);
  return response.payload.result;
}
async function activate(caches, release, healthy) {
  const role = { value: 'waiting', skips: 0 }, worker = coordinator(caches, release, role);
  const ready = await request(worker.instance, Transport.constants.types.provision, `p-${release.manifest.commit[0]}`, worker.payload);
  await request(worker.instance, Transport.constants.types.apply, ready.applyNonce, {
    applyToken: ready.applyToken, releaseId: ready.releaseId, manifestSha256: ready.manifestSha256,
    closureSha256: ready.closureSha256, receiptSha256: ready.receiptSha256
  });
  role.value = 'active';
  if (healthy) await request(worker.instance, Transport.constants.types.healthy, `h-${release.manifest.commit[0]}`, {
    applicationInitialized: true, releaseId: ready.releaseId, manifestSha256: ready.manifestSha256,
    closureSha256: ready.closureSha256, receiptSha256: ready.receiptSha256
  });
  return { role, worker, ready };
}

test('failed publication is independently reproduced as two eligible caches with one build identity', async () => {
  const failed = buildAt(FAILED), predecessor = buildAt(PREDECESSOR);
  assert.equal(failed.build, predecessor.build);
  const caches = new MemoryCaches();
  await activate(caches, await evidence(PREDECESSOR, '1'.repeat(40), predecessor.build), true);
  const candidate = await activate(caches, await evidence(FAILED, '2'.repeat(40), failed.build), false);
  const response = await candidate.worker.instance.dispatch(Transport.envelope(Transport.constants.types.query, 'ambiguous', {}));
  assert.equal(response.payload.ok, false);
  assert.equal(response.payload.error.code, 'AMBIGUOUS_VERIFIED_RELEASE');
  assert.equal(response.payload.error.details.cacheNames.length, 2);
});

test('current release identity is new, closure-bound, and distinct from both published releases', () => {
  const current = buildAt(), failed = buildAt(FAILED), predecessor = buildAt(PREDECESSOR);
  const closure = JSON.parse(fs.readFileSync('runtime/arc_authority_closure_v1.json', 'utf8'));
  assert.equal(failed.build, predecessor.build);
  assert.notEqual(current.build, failed.build);
  assert.equal(current.build, `${failed.build}-${REVISION}-${CLASSROOM_OPERATIONS_REVISION}-${COMBINED_UPDATE_REVISION}-${EQUIPMENT_AMENDMENT_REVISION}-${EQUIPMENT_SELECTOR_UI_REVISION}-${SIDEBAR_HUBS_REPAIR_REVISION}-${COORDINATED_CLASSROOM_REPAIR_REVISION}-${BATCH_B_MULTI_SECTION_STARTUP_REPAIR_REVISION}-technical-score-atomic-repair-1-technical-display-parity-repair-1-classroom-workflow-sweep-repair-1`);
  assert.equal(current.shell, `${failed.shell}-${REVISION}-${CLASSROOM_OPERATIONS_REVISION}-${COMBINED_UPDATE_REVISION}-${EQUIPMENT_AMENDMENT_REVISION}-${EQUIPMENT_SELECTOR_UI_REVISION}-${SIDEBAR_HUBS_REPAIR_REVISION}-${COORDINATED_CLASSROOM_REPAIR_REVISION}-${BATCH_B_MULTI_SECTION_STARTUP_REPAIR_REVISION}-technical-score-atomic-repair-1-technical-display-parity-repair-1-classroom-workflow-sweep-repair-1`);
  assert.equal(current.liveStudentProfileVerifiedReleaseIdentityRepair, REVISION);
  assert.equal(current.dualPeriodTemporaryShopVisitor, CLASSROOM_OPERATIONS_REVISION);
  assert.equal(current.combinedClassroomUsabilityAutoBackup, COMBINED_UPDATE_REVISION);
  assert.equal(current.equipmentInventoryBoothAmendment, EQUIPMENT_AMENDMENT_REVISION);
  assert.equal(current.equipmentSelectorUiCompletion, EQUIPMENT_SELECTOR_UI_REVISION);
  assert.equal(current.batchBMultiSectionStartupRepair, BATCH_B_MULTI_SECTION_STARTUP_REPAIR_REVISION);
  assert.equal(closure.buildIdentity, current.build);
  assert.equal(closure.approvedPaths.length, 114);
});

test('corrected candidate deterministically takes over, acknowledges health, and survives offline cold reconstruction', async () => {
  const current = buildAt(), predecessor = buildAt(PREDECESSOR), caches = new MemoryCaches();
  await activate(caches, await evidence(PREDECESSOR, '3'.repeat(40), predecessor.build), true);
  const correctedRelease = await evidence('4'.repeat(40), '5'.repeat(40), current.build);
  const corrected = await activate(caches, correctedRelease, false);
  const routed = await request(corrected.worker.instance, Transport.constants.types.query, 'controller-takeover');
  assert.equal(routed.releaseId, correctedRelease.manifest.releaseId);
  await request(corrected.worker.instance, Transport.constants.types.healthy, 'healthy', {
    applicationInitialized: true, releaseId: routed.releaseId, manifestSha256: routed.manifestSha256,
    closureSha256: routed.closureSha256, receiptSha256: routed.receiptSha256
  });
  const coldRole = { value: 'active', skips: 0 };
  const cold = coordinator(caches, correctedRelease, coldRole).instance;
  const offline = await request(cold, Transport.constants.types.query, 'offline-cold-restart');
  assert.equal(offline.releaseId, correctedRelease.manifest.releaseId);
  assert.equal(offline.state, 'VERIFIED_RELEASE');
});

test('incomplete and unauthorized candidates remain nonrouting and fail closed', async () => {
  const current = buildAt(), caches = new MemoryCaches(), release = await evidence('6'.repeat(40), '7'.repeat(40), current.build);
  const role = { value: 'active', skips: 0 }, worker = coordinator(caches, release, role);
  const partial = await caches.open(`arc-release-v1-${release.manifest.manifestSha256.slice(0, 24)}`);
  await partial.put(Transport.constants.stagingPath, new FakeResponse(Provenance.canonicalize({
    assetCount: 2, cachedAssetCount: 1, cacheName: `arc-release-v1-${release.manifest.manifestSha256.slice(0, 24)}`,
    closureSha256: release.manifest.closureSha256, format: 'ARC_RUNTIME_RELEASE_STAGING',
    manifestSha256: release.manifest.manifestSha256, receiptSha256: release.receiptSha256, releaseId: release.manifest.releaseId
  })));
  assert.equal((await request(worker.instance, Transport.constants.types.query, 'partial')).state, 'STAGING_INCOMPLETE');
  await assert.rejects(Provenance.createReleaseManifest({
    commit: '8'.repeat(40), tree: '9'.repeat(40), buildIdentity: current.build, closureContractVersion: 1,
    schemaVersion: 8, indexedDbVersion: 14, storeCount: 74,
    domainBounds: { ...bounds, realStudentDataAuthorized: true },
    assets: [{ path: 'index.html', role: 'normal-shell', bytes: 'x' }]
  }), error => error.code === 'POLICY_BOUNDARY_VIOLATION');
});
