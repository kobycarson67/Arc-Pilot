# ARC PACR Capture → Review Wiring Repair 1

**Status:** Local implementation candidate pending independent review  
**Starting authority:** `67bf4d4a53484b9d0b22c33ea98d68182c2bc248` / tree `57e1f2ede2aab027058b2397cc4256b185acb572`  
**Normal classroom authority:** Schema 7 / `V7_ONLY`

## Bounded correction

The PACR engineering page now writes exactly the successful capture's `result.snapshot` into the Schedule Snapshot field. When that snapshot contains `academicStructure`, the controller independently writes that exact object into Academic Configuration. PACR Review therefore receives the reviewed academic structure plus the exact captured schedule without manual copying.

The capture wrapper, fingerprints, and migration metadata are not substituted for Schedule Snapshot. Capture remains a deep-whitelisted, read-only access to `weld_v013`; Student and private classroom data remain excluded by the owning capture helper.

If Academic Structure is absent, Schedule Snapshot still populates while Academic Configuration remains blank. Missing or malformed review inputs produce explicit actionable codes rather than an empty-input `JSON.parse` failure. Review remains read-only.

## Cache and publication boundary

The changed engineering controller is requested and precached as:

`arc_v8_production_academic_configuration_page.js?v=pacr-capture-review-wiring-repair-1`

The unchanged capture helper retains `academic-structure-operational-truth-1-repair-1`. The service worker still activates updates only through the existing user-controlled `SKIP_WAITING` message; no automatic install-time activation was introduced.

## Preserved limits

- No normal ARC UI or `index.html` change.
- No production or Samsung access.
- No PACR Prepare or Apply.
- No live Academic Structure or schedule mutation.
- No invented Semester 2 Section or Planning placement.
- No Student, Enrollment, Schedule Assignment, package event 13, Lesson acceptance, dual write, v8 activation, or authority transfer.
- Historical retired Weekly Schedule Mode behavior remains unresolved.

## Local verification

- Capture → Review controller composition: `4/4`.
- Production Academic Configuration: `10/10`.
- PACR reconciliation/closure: `46/46`.
- Schedule Configuration Migration: `17/17`.
- Academic Cutover: `17/17`.
- Schedule Cutover Closure/oracles: `5/5`.
- Backup/Recovery: `20/20`.
- App Update Controller: `10/10`.
- Pages live-verification contract: passed locally; no deployment was run.
- Static regression: `47/47`.
- Complete JavaScript test-file gate: `119/119`.
- Modified JavaScript/inline parse and `git diff --check`: passed.

Independent review and separately authorized publication/physical verification remain required.
