# Isolated V8 sweep verification (local engineering only)

Base accepted app source:38dfeb0420193684bd5282df0d2336102cefd4aa.
Not linked from index, not a production scenario selector, not deployment approval.

Serve repository on a task-owned localhost HTTP origin in a new browser profile.
Open /tests/engineering/arc_v8_sweep_verification.html.
This page has no service worker and refuses a controlling worker.
Inspect first, then Run once. Only arc_classroom_v8_sweep_verification is opened.
No production backup import, no external sync, no reset/delete control.
Fixture is synthetic; complete/failed markers prevent silent reseeding.
window.arcSweep.inspect() and .run() provide the same operations for browser automation.

## Verified status — 2026-11-13
Native Edge v3 completed all nine owner-service groups in a fresh task-owned profile.
Practice, Challenge version/assessment/reassessment, project checkpoint/rubric/finalization,
manual-posting records, and evidence declaration historical-lock checks passed.
Unused declaration and Draft-version edits succeed. Used declaration updates still reject
HISTORICAL_LOCK, and stale revisions reject WRITE_CONFLICT without changing prior rows.

The earlier v2 native failure evidence and failed profile are preserved. It exposed
NotFoundError(code8): arc_v8_activity.revise omitted student_activities from the transaction
used to check historical use. The bounded correction includes that dependency atomically
only for version/declaration updates; it does not weaken the historical lock.

tests/arc_v8_sweep_transaction_scope.test.js is now a strict acceptance regression,
not a known-defect reproducer. It checks unused edits, used Draft/declaration locks,
approved-version lock, stale conflicts, no-write equality, and unchanged single-store
scope for ordinary definition edits.

Current fixture marker is arc-synthetic-sweep-v3 (version3). Use a fresh profile for v3;
do not reset, overwrite or retry old failed fixtures automatically. Completed or failed
fixtures are inspect-only. Harness failures retain completed groups and exact failed
stage, expected/actual error codes, message and stack before rethrow.

Unit/isolation:
node tests/arc_v8_sweep_verification.test.js
node tests/arc_v8_sweep_transaction_scope.test.js

Normal UI verification uses separate existing accepted unified-verification setup and
another task-owned profile. Owner-service passes here do not certify normal UI, physical
Samsung, actual external posting or production release readiness.
