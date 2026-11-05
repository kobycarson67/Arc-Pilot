# ARC Live Classroom Launch Build — local candidate

Date: 2026-11-04
Starting commit: `4c0f6a7e360f7ba8fff6b67c9237798fff8c1bde`
Starting tree: `e1ff44c59c8d923a3a22db8c1d526a29993e61bf`
Rollback: `rollback/pre-live-classroom-launch-build`
Status: local fictional-data candidate; independent technical review required

## Delivered classroom workflow

Students is now the normal management location for durable Student identity and Enrollment operations. It exposes Add Student, class selection during creation, Add Existing Student, Edit Student, Manage Enrollment, Drop, Move, Re-enroll, Archive, and permanent History access. The v8 owner performs multi-Section placement as one transaction, refuses a second active Enrollment for the same Course and School Year, refuses normalized duplicate identities, preserves stable IDs, and revision-binds archived restoration.

Every authoritative Student mutation carries an explicit `REAL_STUDENT` or `FICTIONAL_STUDENT` classification. Fictional writes require Simulation or an independently verified task-owned gate. Real writes require both the academic activation record and the P4 transaction-domain gate to carry `realStudentDataAuthorized: true`. This build does not set either record. The reviewed runtime closure still records `realStudentDataAuthorized: false`, and production P4–P10C remains `V7_ONLY`.

Existing Attendance, passes, Projects, checkpoints, Technical work, Competencies, reassessments, Gradebook, derived History, Booth Manager, Fast Roster, Class Forecast, and Open Shop owners are preserved. The retained one-database verification rehearsal exercises P4–P10C with fictional records only; it does not convert its `V8_UNIFIED_VERIFICATION` evidence into production authority.

## School Microsoft OneDrive recovery

ARC now has an instructor-initiated Microsoft Graph recovery client:

- Microsoft Entra SPA authorization-code flow with PKCE;
- exact tenant ID, application client ID, and same-origin HTTPS redirect validation;
- delegated `openid profile Files.ReadWrite.AppFolder` request;
- no client secret;
- access token retained in memory only;
- backup upload only after the existing ARC package verifier accepts the complete package;
- SHA-256 sidecar bound to the exact uploaded backup;
- browser-safe Graph metadata lookup followed by its short-lived preauthenticated HTTPS download URL;
- downloaded package verification plus sidecar SHA-256 verification before ARC offers the file for a separately controlled restore;
- no background sync and no individual-photo sync claim;
- offline classroom operation independent of Microsoft sign-in.

The local test uses a deterministic fake Graph transport and fictional package. No school tenant was contacted and no cloud success is claimed.

### Exact school IT setup request

1. Register ARC as a Microsoft Entra **Single-page application**.
2. Register the exact production redirect URI: `https://kobycarson67.github.io/Arc-Pilot/`.
3. Provide the school tenant ID and ARC application client ID. Do not create or provide a client secret.
4. Confirm that delegated `Files.ReadWrite.AppFolder` is supported and permitted for the instructor account. If district policy requires a broader delegated permission, that is a new institutional decision and the client must be independently reviewed before changing scopes.
5. Confirm user/admin consent and Conditional Access requirements for the instructor's Samsung Chrome/WebAPK session.
6. Provide an approved test account/destination and approve retention, deletion, custodian, restore-authority, breach/incident, and account-offboarding rules for recovery files.
7. Permit one fictional upload → download → verifier → task-owned restore rehearsal. Production recovery readiness remains false until that exact rehearsal passes.

Microsoft's current documentation supports SPA authorization code with PKCE and the Graph App Folder API. Its JavaScript download guidance requires obtaining `@microsoft.graph.downloadUrl` rather than following the authenticated `/content` redirect; this implementation follows that boundary.

## Real Student activation prerequisites

School permission for local Samsung storage is recorded as instructor-reported evidence, not as automatic product authority. A separate activation may be considered only when every item below is independently evidenced:

1. exact application publication and compatibility receipt accepted;
2. Samsung startup and classroom workflow physically accepted;
3. protected `arc_classroom_v8`, Schema 8 / IndexedDB 14 / 74 stores verified;
4. academic/schedule remains `V8_AUTHORITATIVE`;
5. P4–P10C has one exclusive production v8 authority and no dual write;
6. school OneDrive tenant configuration is accepted;
7. fresh recovery is uploaded, downloaded, checksum-verified, and restored in a task-owned environment with semantic parity;
8. institutional privacy, retention, access, deletion, incident response, and recovery custody are approved;
9. exact preactivation semantic state and rollback custody pass;
10. the instructor separately authorizes the exact evidence bundle and the reviewed production control records the real-Student gate.

Any identity, checksum, authority, store-count, semantic, recovery, tenant, or privacy mismatch is a mandatory stop. This build contains no automatic real-Student activation.

## Samsung publication and acceptance plan

1. Independently review this local commit/tree, changed-path boundary, 113-asset closure, regressions, and browser evidence.
2. Publish only an independently accepted candidate through the established non-force application workflow and exact live-byte verification.
3. Obtain an independent compatibility receipt; publish immutable manifest/receipt before a separately bound channel pointer.
4. Perform read-only Samsung preflight: current worker, release evidence, IDB 14 / 74 stores, academic marker, current recovery custody, and Simulation preservation.
5. Stage and Apply only through ARC's verified-release protocol, with separate instructor authorization and existing stop conditions.
6. Reverify startup, offline restart, classroom views, recovery, and authority records before considering any production transaction cutover.
7. Complete the school OneDrive fictional restore rehearsal and institutional approvals.
8. Authorize production P4–P10C cutover and real Student data only as separately reviewed actions. App installation alone transfers no authority.

## Verification scope

The focused suites cover duplicate detection, atomic multi-class placement, partial-failure rollback, archived restoration, classified mutation gates, activation prerequisite reporting, PKCE, memory-only tokens, Graph upload/download byte binding, tamper refusal, and page composition. The full discovered JavaScript inventory, static regression, parse checks, source-closure checks, and `git diff --check` are required for closeout.

Installed Edge evidence uses task-owned profiles and fictional data. It proves the Students create/enroll/edit workflow, attendance and returned-pass history, OneDrive setup boundary, offline reload, full-process cold restart, exact normalized Simulation state, Live restoration, and cleanup. The retained unified rehearsal proves a single task-owned database across P4–P10C, connected UI, offline/cold restart, protected-media delivery, and 74-store restore parity. No real Student record, school cloud operation, Samsung operation, production mutation, publication, authority transfer, or instructional acceptance occurred.

## Remaining decisions

- School IT: Entra app registration, permitted Graph scope, consent/Conditional Access, approved test account, and recovery/privacy lifecycle.
- Instructor plus independent review: exact production P4–P10C cutover evidence and recovery package.
- Instructor: separate real-Student activation after every prerequisite is green.
- Instructor: all source Lessons remain `reference_only`; replacement Lessons and Activities remain `DRAFT_INSTRUCTOR_REVIEW` and are not prerequisites for basic roster tracking.
