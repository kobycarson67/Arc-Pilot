# ARC Live Classroom Pilot — Final Activation and Delivery

Date: 2026-11-04
Status: LOCAL CANDIDATE — NO PRODUCTION TRANSITION, REAL-STUDENT AUTHORIZATION, PUBLICATION, OR SAMSUNG OPERATION PERFORMED

## Bounded result

ARC now contains a guarded production transition owner for exclusive P4–P10C V8 authority in `arc_classroom_v8`. It is inert on load and cannot transfer authority without all of the following: exact independently accepted release distribution, verified academic V8 authority, Schema 8 / IndexedDB 14 / 74 stores, accepted instructional package availability, zero preexisting Student/Enrollment/Schedule Assignment production rows, semantic and exclusive-owner preflight, an exact 74-store recovery export, reload/reverification of that same export, and the exact one-use confirmation.

The transition writes the Batch A, Batch B, and unified P4–P10C authority records in one infrastructure transaction. All records retain `dualWrite: false` and `realStudentDataAuthorized: false`. Any partial write or protected semantic-state drift invokes the exact preparation-bound recovery package and must restore parity.

Real-Student authorization is a second control and a second record. It cannot be inferred from database cutover. It requires a fresh recovery package, exact reload/reverification, Samsung physical acceptance, verified OneDrive upload/download/restore evidence, semantic preflight, recorded privacy/retention decisions, and an evidence-bound instructor authorization. This local candidate does not create that record.

## Minimum pilot versus full Classroom Readiness

The minimum pilot is Students → Add Student → Enroll → Track through Attendance, Passes, Projects, Checkpoints, Competencies, Corrections, Gradebook, History, Fast Roster, Class Forecast, Booth Manager, and Open Shop. The instructor may create Projects and lesson plans. Original Lessons remain `reference_only`; replacement Lessons and Activities remain `DRAFT_INSTRUCTOR_REVIEW`. No automatic grade, Evidence, qualification, Project unlock, or instructional acceptance was added.

The full Classroom Readiness Contract remains governing and unchanged. The pilot does not close unfinished instructional-content acceptance, institutional retention/deletion policy, incident response, long-term protected-media governance, or broader school deployment requirements.

## School OneDrive recovery

Public configuration:

- Entra tenant: `f358d453-5966-459d-85a2-4c98156c5465`
- SPA client: `d5426675-b46e-45b6-9895-bf9c2a4970b9`
- Redirect: `https://kobycarson67.github.io/Arc-Pilot/`
- Delegated permission: `Files.ReadWrite.AppFolder`
- Flow: authorization code with PKCE; no client secret

The preceding accepted local candidate recorded actual school-account authentication, Microsoft Graph App Folder upload, exact-byte download, SHA-256 verification, and isolated fictional 74-store restore. Tokens, session caches, account profile details, and backup payload bytes are excluded from source and review exports.

Until automatic sync is separately designed and approved, the temporary procedure is instructor initiated:

1. In Administration, export a fresh verified ARC v8 recovery package.
2. Sign in through the official Microsoft screen if the session is not active.
3. Upload only through ARC's App Folder integration.
4. Download the same named package and require exact SHA-256 and package verification.
5. Run restore validation only against an isolated fictional database.
6. Record date, package checksum, verified download result, and recovery custodian without recording tokens or student data in logs.
7. Stop and retain the last known-good package on any identity, permission, checksum, or restore mismatch.

## Decisions that remain outside local engineering authority

- School retention period, deletion process, access roles, incident-response contact, and named recovery custodian.
- Independent acceptance and guarded publication of the exact candidate release.
- Samsung staging, Apply, cold-start, offline, recovery, and physical classroom acceptance.
- Separate evidence-bound instructor authorization for `realStudentDataAuthorized` after production P4–P10C cutover and recovery verification.
- Entry of any real Student record.

## Guarded delivery order

1. Independently accept exact local commit/tree, 114-asset closure, tests, and review export.
2. Publish the exact application commit by normal non-force fast-forward; require candidate/main regression, Pages deployment, live verification, and 114 authority + 11 visual byte parity.
3. Generate the canonical release manifest from immutable published Git bytes; obtain independent compatibility acceptance.
4. Publish immutable manifest/receipt first, then a separate release-channel pointer using the actual evidence commit SHA.
5. On Samsung, perform read-only preflight; stage exactly once; verify cache, sentinel, and 114/114 assets; Apply exactly once; stop before additional workflows on mismatch.
6. Verify startup, offline/cold restart, academic V8, IDB 14 / 74 stores, existing classroom state, and OneDrive recovery custody.
7. Under separate production-cutover authorization, Prepare → export → externally retain → reload/reverify → activate P4–P10C → cold-start verify → rollback rehearsal evidence.
8. Under a later separate real-Student authorization, repeat fresh recovery and evidence checks, write the distinct real-Student gate once, cold-start verify, and only then use Students → Add Student.
