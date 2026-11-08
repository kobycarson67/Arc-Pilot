const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const build = fs.readFileSync('app-build.js', 'utf8');

function extracted(name) {
  const match = html.match(new RegExp(`function ${name}\\([^\\n]+`));
  assert(match, `${name} must remain directly testable`);
  const context = {};
  vm.runInNewContext(`${match[0]}; this.result = ${name};`, context);
  return context.result;
}

test('profile records receive safe empty collections without mutating persisted input', () => {
  const normalize = extracted('normalizeStudentProfileRecord');
  const persisted = { id: 'fictional-awt', name: 'Fictional AWT Student' };
  const profile = normalize(persisted);

  assert.notStrictEqual(profile, persisted);
  assert.deepEqual(persisted, { id: 'fictional-awt', name: 'Fictional AWT Student' });
  assert.equal(JSON.stringify(profile.ratings), '{}');
  assert.equal(JSON.stringify(profile.ratingScopes), '{}');
  assert.equal(JSON.stringify(profile.work), '{"rating":0,"code":""}');
  for (const key of ['enrollments', 'projects', 'tech', 'history', 'behaviorEvents']) {
    assert.equal(JSON.stringify(profile[key]), '[]', key);
  }
});

test('profile normalization preserves every existing assessment and history collection', () => {
  const normalize = extracted('normalizeStudentProfileRecord');
  const persisted = {
    id: 'existing',
    ratings: { 'AWT-P4': 3 },
    ratingScopes: { 'AWT-P4': 'section-1' },
    work: { rating: 9, code: 'documented' },
    projects: [{ id: 'project-1' }],
    tech: [{ id: 'technical-1' }],
    history: [{ id: 'history-1' }],
    behaviorEvents: [{ id: 'behavior-1' }],
    enrollments: [{ enrollmentId: 'enrollment-1', active: true }]
  };
  const profile = normalize(persisted);

  for (const key of ['ratings', 'ratingScopes', 'work', 'projects', 'tech', 'history', 'behaviorEvents', 'enrollments']) {
    assert.strictEqual(profile[key], persisted[key], key);
  }
});

test('student profiles reopen through the authoritative projection instead of legacy state.classes', () => {
  const block = html.slice(html.indexOf('function openStudent(id)'), html.indexOf('function closeStudent', html.indexOf('function openStudent(id)')));
  assert.match(block, /let all = allStudents\(\);/);
  assert.doesNotMatch(block, /state\.classes/);
  assert.match(html, /return normalizeStudentProfileRecord\(projected\);/);
});

test('unassessed authoritative students remain readable across profile and Gradebook surfaces', () => {
  for (const source of [
    'Object.values(s.ratings)',
    's.ratings[c.code]',
    's.projects.length',
    's.tech.length',
    '(s.history || []).slice()'
  ]) assert(html.includes(source), source);
  assert(html.includes('((row.authority && row.authority.approvedGradeSources) || [])'));
});

test('repair does not introduce fabricated assessment defaults or alternate authority', () => {
  const block = html.slice(html.indexOf('function normalizeStudentProfileRecord'), html.indexOf('function projectionStudentRecord'));
  assert.doesNotMatch(block, /AWT-P4|WT-|grade|attendance|evidence|qualification/i);
  assert.match(block, /ratings[^;]+\{\}/);
  assert.match(block, /projects[^;]+\[\]/);
  assert.match(block, /history[^;]+\[\]/);
});

test('repair advances only the successor shell identity needed for a fresh worker cache', () => {
  assert(build.includes("shell:'v0-18-"));
  assert(build.includes("-live-classroom-runtime-repair-1-live-student-profile-repair-1'"));
  assert(build.includes("liveStudentProfileRepair:'live-student-profile-repair-1'"));
});
