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

Current expected status: native lifecycle passes Practice, Challenge version/assessment/reassessment, project checkpoint/rubric/finalization and manual-posting records, then exposes a KNOWN DEFECT at evidence declaration historical lock.
Do not count the whole native run as passing.
Native IndexedDB throws NotFoundError(code8) because arc_v8_activity.revise transaction lacks student_activities required by used().
tests/arc_v8_sweep_transaction_scope.test.js intentionally reproduces this and asserts no write. Its PASS means reproduction succeeded, not that the app is fixed.
Do not weaken owner history locks to turn this test green.

Unit/isolation:
node tests/arc_v8_sweep_verification.test.js
node tests/arc_v8_sweep_transaction_scope.test.js

Normal UI verification uses separate existing accepted unified-verification setup and another task-owned profile. Owner-service passes here do not certify normal UI or physical Samsung.
