# ARC Single Coordinated Live Classroom Launch

Date: 2026-11-07
Status: LOCAL CANDIDATE — FICTIONAL-DATA VERIFICATION ONLY

## Result

This candidate closes the locally implementable launch controls without transferring production authority or enabling real Student data. Students remains the normal identity and Enrollment workspace. The accepted P4–P10C production transition remains one-shot, exclusive, recovery-bound, semantic-state-bound, and fail closed. Real-Student authorization remains a separate record and separate exact confirmation.

No publication, release-evidence change, Samsung operation, production database mutation, authority transfer, real Student entry, or instructional-content acceptance occurred.

## Instructor-approved backup custody policy

- School OneDrive App Folder is the intended recovery destination.
- The instructor is the recovery custodian, primary accessor, and initial incident-response owner.
- Upload alone never replaces the current verified recovery.
- A new recovery becomes current only after exact download and checksum/package verification. An isolated 74-store restore with semantic parity remains required evidence for activation.
- A superseded verified recovery is retained at least 30 days.
- The sole recoverable backup and the current verified backup cannot be deleted.
- Deletion is explicit and instructor initiated; ARC performs no automatic sync or automatic deletion.
- ARC minimizes Student information and stores no Microsoft password, MFA code, authorization code, client secret, access token, refresh token, or backup payload in Git or review evidence.

The runtime stores only a local verification ledger containing filenames, hashes, verification times, and retention state. Reusing a current verified filename with different bytes is refused.

## Real-Student gate

School permission to store Student records on the instructor Samsung is recorded as instructor direction, not as automatic runtime authority. Preparation of the separate real-Student gate now requires exact evidence bindings for:

- independent release acceptance and Samsung physical acceptance;
- active production P4–P10C V8 authority with no dual write;
- fresh recovery custody and semantic preflight;
- OneDrive upload, exact download/checksum verification, and isolated restore evidence;
- policy `arc-live-classroom-pilot-backup-retention-v1`;
- custodian and incident-response owner `Instructor`;
- 30-day superseded retention and sole-backup protection;
- an evidence SHA-256 and explicit instructor authorization identity.

Any missing or mismatched binding refuses before mutation. This candidate leaves `realStudentDataAuthorized: false`.

## Minimum classroom pilot

The bounded pilot remains Students → Add Student → Enroll → Track through Attendance, Passes, Projects, Checkpoints, Competencies, Corrections, Gradebook, History, Fast Roster, Class Forecast, Booth Manager, and Open Shop. The instructor may create Projects and lesson plans through existing controls. No automatic grade, Evidence, qualification, Project unlock, or instructional acceptance was added.

The full Classroom Readiness Contract remains governing. All source Lessons remain `reference_only`; replacement Lessons and Activities remain `DRAFT_INSTRUCTOR_REVIEW`.

## Manual OneDrive procedure

1. Export a fresh complete 74-store recovery package from Live Classroom.
2. Upload it through ARC's configured Microsoft Graph App Folder flow.
3. Download that exact named package through ARC and require the exact sidecar SHA-256 and package verifier.
4. Restore only into an isolated fictional database and prove store and semantic parity.
5. Record the candidate release, backup filename, checksum, verification time, restore evidence, and custodian without Student data or credentials.
6. Keep the prior current recovery throughout the process. After the new recovery passes every gate, retain the prior one at least 30 days.
7. Stop on identity, tenant, permission, checksum, package, store-count, semantic, or restore mismatch.

## Guarded completion sequence

1. Independently accept this exact local commit/tree, 114-asset closure, tests, browser evidence, and review export.
2. Publish only the accepted application through normal non-force Git operations; require candidate/main regression, Pages deployment, live verification, and 114 authority plus 11 visual byte parity.
3. Generate the canonical manifest from immutable published Git bytes and obtain independent compatibility acceptance.
4. Publish immutable manifest/receipt first, then a separate channel pointer using the actual evidence commit SHA.
5. Perform Samsung read-only preflight, one verified stage, one Apply, startup/offline/cold verification, authority/state preservation, and recovery-custody verification under separate physical authorization.
6. Under one separately approved bundled activation, perform production P4–P10C Prepare, export/custody, reload/reverification, exact activation, semantic verification, cold restart, and rollback evidence.
7. Only after that production gate and fresh OneDrive recovery evidence pass may the instructor separately create the real-Student authorization record. Only then may Students → Add Student accept real Student data.

Independent technical acceptance, publication, physical Samsung acceptance, production authority transfer, and the final evidence-bound real-Student authorization are genuine remaining authority boundaries.
