# ARC Post-Build-9 Classroom Ready Convergence

Date: 2026-10-20  
Status: Local candidate; independent technical and instructor review required  
Starting commit: `4e692c9c12082f7136a83e5d2c16cfbcb7cbffbc`  
Starting tree: `314729a681212fb481722ec1f77ae5982b18944b`

## Implemented result

- The instructional review surface now groups all replacement Lessons and proposed Activity relationships by Course, Quarter, and Unit. Each group exposes preserved source Lessons, source review status, Standards, visible learning targets, success criteria, differentiation, hands-on strategies, checks for understanding, and proposed Activity relationships.
- An instructor can record `RECOMMEND_ACCEPT`, `REVISE`, or `REJECT` recommendations at the unit level. Corrections append a superseding event and preserve prior events. These records never change Lesson or Activity status and never constitute instructional acceptance.
- The normal Live Administration view now reports the accepted one-database P4-P10C rehearsal as local engineering evidence while accurately keeping Live transaction authority `V7_ONLY`. It no longer presents that accepted rehearsal as a current classroom error.
- Administration now presents separate recovery status for Schema 8 / IDB 14 / 74-store data, protected media, legacy V7 photographs, persistent browser storage, and external OneDrive custody.
- The persistent-storage control distinguishes observation from the instructor-initiated request. Neither path configures OneDrive or claims institutional approval.
- A district / IT decision sheet covers Microsoft Entra and OneDrive configuration, retention and deletion, privacy and access, recovery custody, and any temporary manual-export arrangement.
- Classroom Ready requirements and future production-cutover preparation are visible as explicit matrices. The cutover checklist is inert: it has no activation or write API, performs zero writes, and preserves P4-P10C `V7_ONLY`.

## Authority boundaries

- Academic and schedule authority remains the accepted `V8_AUTHORITATIVE` foundation.
- Production P4-P10C remains `V7_ONLY`.
- Real Student data remains unauthorized.
- Original 124 Lessons remain `reference_only`.
- All replacement Lessons and Activity content remain `DRAFT_INSTRUCTOR_REVIEW`.
- Review recommendations do not assign work, grade, create Evidence, qualify a Student, complete or unlock a Project, or accept instructional content.
- No OneDrive credentials, tenant configuration, automatic synchronization, FERPA approval, physical acceptance, publication, or production cutover is claimed.

## Recovery model

ARC continues to use two distinct custody paths:

1. the accepted Schema 8 / IDB 14 / 74-store V8 backup and protected-media package; and
2. the checksum-bound V7 legacy-photo export covering `weld_v013` metadata and `WeldingClassroomPhotoStore` blobs.

Both paths retain corruption and authority refusal. Remote or session-only photos remain explicitly uncovered where they are not present in either owned store. Persistent browser storage is a local durability signal and never substitutes for a verified external recovery copy.

## Decisions still requiring authority

### Instructor

- Grouped acceptance, revision, or rejection of the draft Lesson and Activity collection.
- Exact Activity prerequisite, Evidence, qualification, and Project-unlock rules.
- Final useful or sellable Project product definitions, drawings, bills of material, tolerances, rubrics, and any exact advanced process choice.
- Initial trigger rules for Today's Focus and Notifications.
- The approved Administration report catalog.

### District / IT

- Microsoft Entra / OneDrive application and account configuration.
- FERPA/privacy review, roles, support access, incident response, retention, and deletion.
- Approved recovery destination, custodian, cadence, restore authority, and any temporary manual-transfer rule.

### Separately authorized production and physical work

- A fresh physical recovery package, exact semantic preconditions, and explicit P4-P10C cutover authorization.
- Samsung preflight, recovery custody, Apply, cold reopen, and physical acceptance.
- Real Student authorization.

## Verification expectation

The local review package must include focused convergence tests, the complete JavaScript inventory, 47 static checks, parse and whitespace checks, installed Edge online/offline/cold-start evidence, Simulation isolation, exact 74-store restore evidence, and legacy-photo corruption/round-trip evidence. Final identities and results are recorded in the detached review manifest.
