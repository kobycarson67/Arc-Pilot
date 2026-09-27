# ARC Schema v8 Stage 13 — Classroom Integration and Cutover Design Authority

## Status and authority

This document is implementation authority for a future bounded classroom cutover. It does not perform that cutover.

| Item | Authority |
|---|---|
| Starting commit | `5e2335ba66ae5c807f1df324772f262fdf85a735` |
| Starting tree | `597c32c5420665f15d95dab77315e4c2e26f8401` |
| Application | `0.18` |
| Normal classroom runtime | Schema 7 in localStorage key `weld_v013` |
| ARC schema | 8 |
| v8 IndexedDB structural version | 10 |
| v8 database name | `arc_classroom_v8` |
| Starting build | `arc-schema-v8-integration-verification-12-sidebar-repair-2-repair-1-fixture-init-repair-1` |
| Stage 12 Samsung physical verification | **PASSED** |
| Production/Classroom Readiness | **NOT ACHIEVED** |
| Real student production data | **NOT AUTHORIZED** |

Stage 12 proved the isolated v8 engineering foundation and its recovery behavior. It did not transfer classroom authority from Schema 7, initialize the production v8 database, authorize real student data, or prove the instructional and privacy requirements in this document.

## Governing invariants

1. A classroom domain has one write authority.
2. There is no permanent v7-to-v8 synchronization layer and no default dual-write period.
3. A temporary `V8_SHADOW_READ_ONLY` consumer may compare projections, but it cannot write v8 from live v7 changes. It must have named parity criteria, a time-bounded test window, and a removal condition.
4. Once a domain is `V8_AUTHORITATIVE`, normal classroom writes use its v8 service and stores. Independent v7 writes for that domain are disabled.
5. Legacy duplication is reconciled through reviewed manifests. Whole-state copying is prohibited.
6. Existing v7 transactional student and classroom records are disposable development, pilot, or test data. No real student/classroom production data currently exists in ARC.
7. Stable v8 UUID identity and explicit relationships replace array position, display label, and embedded-copy identity.
8. Derived Dashboard, Student Profile, Fast Roster, Class Forecast, Booth Manager, Open Shop, and Gradebook views do not become competing stores.
9. Accepted Titanium/Samsung presentation and Sidebar Gesture Repair 2 Repair 1 behavior remain frozen during data cutover.
10. Instructor authority remains explicit for overrides, finalization, grade posting confirmation, attendance-linked grade decisions, and unresolved policy.

### Domain transition states

| State | Meaning | Permitted writes |
|---|---|---|
| `V7_ONLY` | Current classroom authority remains Schema 7. | v7 only |
| `V8_SHADOW_READ_ONLY` | A bounded v8 projection is compared against v7 without importing live changes or becoming authority. | v7 only; no shadow writes |
| `V8_AUTHORITATIVE` | The domain has passed its cutover gate and all classroom reads/writes use v8. | v8 only |
| `V7_RETIRED` | The v7 path is inaccessible to normal classroom workflows and retained only under approved recovery/archival policy. | none |

## Repository evidence used

This authority is grounded in the current `index.html` Schema 7 state, migrations, fixtures, and controllers; `ArcProjectBank`, `ArcMaterialInventory`, `ArcTeachingTips`, and other v7 modules; the Stage 1–11 v8 storage and domain services; the Stage 12 integration fixture and recovery harness; and the current design and capability registry. Where these sources do not determine a safe content or policy mapping, the item is marked `UNRESOLVED`.

## Complete Schema 7 family inventory and disposition

The disposition describes future cutover treatment. It does not authorize a data operation now.

| v7 family | Current representation / authority | Disposition | Future treatment and gate |
|---|---|---|---|
| Schema marker and build metadata | `state.schema`, application/build constants | `RETAIN_OUTSIDE_V8` | Runtime identifiers remain application/deployment authority. A cutover manifest records them; they are not classroom domain records. |
| v7 backup/recovery keys | `weld_v013_preupgrade_recovery`, `weld_v013_import_rollback`, `weld_v013_backup_meta` | `RETAIN_OUTSIDE_V8` | Preserve through the rollback window. Retire only after v8 recovery and final cutover acceptance. |
| Fictional student identities | `state.classes.*.students` and legacy embedded student objects | `DISCARD` | Do not import. Future real identities must be deliberately created through `ArcV8Academic`. |
| Student enrollment, section and schedule relationships | embedded class membership, `sections`, student enrollment fields | `DISCARD` for existing records; concept `REBUILD_IN_V8` | Existing fictional transactions are excluded. Future production records use `students`, `course_enrollments`, and `enrollment_schedule_assignments`. |
| WT/AWT course definitions | `classes.wt`, `classes.awt`, class/course labels and settings | `RECONCILE_AND_PORT` | Compare against the idempotent WT/AWT v8 course seeds. A reviewed manifest resolves labels/codes without creating duplicates. |
| Academic year and semester | `academicYear`, `semester` | `RECONCILE_AND_PORT` | Create reviewed `school_years`, `semesters`, and `grading_periods`; exact production dates and period boundaries require school/instructor approval. |
| Sections and bell/schedule configuration | `sections`, schedule settings, overrides and calendar context | `RECONCILE_AND_PORT` | Recreate approved sections and schedule assignments with stable UUIDs. Calendar/override semantics lacking a v8 store remain unresolved before cutover. |
| Calendar events and overrides | `calendarEvents`, `calendarOverrides` | `UNRESOLVED` | No equivalent v8 classroom authority is established. Do not embed these into unrelated stores or silently drop them. |
| WT/AWT competency definitions | runtime competency catalogs, keys, display names, descriptions, grouping and order | `RECONCILE_AND_PORT` | Freeze an audited catalog manifest, preserve WT/AWT distinction, issue stable definition/version UUIDs, and record every legacy-key-to-UUID decision. Do not infer mappings by label alone. |
| Current competency ratings and scopes | student `ratings`, `ratingScopes`, rating history | `DISCARD` for existing fictional records; concept `REBUILD_IN_V8` | Do not copy manual pilot ratings as Evidence. Future authority is Evidence Records, strategies, derivation, and explicit Overrides while retaining 60/75/90/100 grade conversion authority. |
| Standards definitions and competency links | static/state standards and curriculum relationships | `RECONCILE_AND_PORT` | Preserve only reviewed reusable authority. Source-photo reconciliation and unsupported relationship identity remain unresolved. |
| Curriculum maps and competency progression | lesson/curriculum configuration and section curriculum data | reusable definitions `RECONCILE_AND_PORT`; progress `DISCARD` | Port reviewed definitions through an instructional manifest. Discard fictional `sectionCurriculumProgress`, archives, history snapshots, and pacing transactions. |
| Project Bank definitions | `projectBank` | `RECONCILE_AND_PORT` | Treat as the current canonical v7 project-definition source after duplicate reconciliation. Convert approved definitions to Activity Definition/Version and project configuration through an explicit manifest. |
| Legacy Project Library definitions | `projectLibrary.{wt,awt}` merged into `projectBank` by Schema 7 migration | `RECONCILE_AND_PORT` | Compare by stable legacy identity and content. Resolve conflicts in favor of reviewed content, never by last-write or display-name matching. Do not port both copies. |
| Student project assignments, rubric values, checkpoints and history | student `projects`, assignments and embedded checkpoint/rubric state | `DISCARD` | Existing records are fictional transactions. Future work uses Activity assignment plus Project Instance, Build Attempt, checkpoint/manual-need events, and rubric assessment services. |
| Lesson Plan Bank and reusable lesson/curriculum content | lesson records, lesson bank, pacing configuration | `RECONCILE_AND_PORT` | Preserve approved reusable content after coverage and provenance review. No current v8 Lesson Plan store exists, so the durable target and consumer are unresolved. |
| Pacing plans, archives, progress and history | `pacingPlans`, `sectionCurriculumProgress`, `sectionArchives`, `pacingHistorySnapshots` | reusable plan templates `RECONCILE_AND_PORT`; transactional progress `DISCARD` | Do not treat historical fictional progress as production history. Exact future pacing authority remains unresolved. |
| Technical Assignment/Test definitions | `technicalLibrary.{wt,awt}` | `RECONCILE_AND_PORT` | Convert reviewed definitions to versioned Activity definitions of the correct type. Preserve natural points and explicit Test versus Technical Assignment intent. |
| Student Technical results | student `tech` | `DISCARD` | Existing assessment records are fictional. Future results flow through Activity attempts/finalization and Gradebook. They do not automatically become competency Evidence. |
| Other Activity-like reusable definitions | project, practice, skill challenge, and assignment-shaped configuration | `RECONCILE_AND_PORT` where an authoritative source exists; otherwise `UNRESOLVED` | Use a reviewed type/version/evidence-declaration manifest. Do not fabricate missing Practice, Skill Challenge, or evidence declarations. |
| Activity assignments and attempts | student-specific v7 work/progress | `DISCARD` | Existing transactions are excluded. Production work begins only after readiness authorization. |
| Material definitions | normalized material types/forms/dimensions and reusable project requirements | `RECONCILE_AND_PORT` | Preserve approved reusable definitions in a manifest. No v8 inventory domain currently exists; the target store/service remains unresolved. |
| Physical inventory | `inventory`, `materialInventory`, `ArcMaterialInventory` pieces/ledger | `DISCARD` for current fictional stock; future concept `REBUILD_IN_V8` | Reconcile the two legacy representations first. Never import both. A separately designed inventory authority is required before production inventory cutover. |
| Booth configuration | `booths`, booth labels/status/configuration | `RECONCILE_AND_PORT` | Convert approved booth definitions and resources to `booth_definitions` and `booth_resources` with a reviewed identity manifest. |
| Booth assignments and issues | `boothAssignments`, `boothIssues` | `DISCARD` | Existing physical-shop transactions are fictional. Future records use Stage 10 append-first authority. |
| Resources | links/media/support embedded in lessons/projects or absent as a shared authority | `UNRESOLVED` | No approved populated Resource Bank store or lifecycle exists. Do not extract heuristically or claim instructional coverage. |
| Teaching Tips | `ArcTeachingTips`, derived from lesson content | `RETAIN_OUTSIDE_V8` until a Resource authority is approved | Keep derivation behavior with its source lesson authority. Do not create duplicate persisted tips. |
| Grading policies and conversion | current calculations plus approved 50/25/15/10 v8 policy and 60/75/90/100 competency conversion | `RECONCILE_AND_PORT` | Seed a versioned reviewed Gradebook policy. Preserve category/evidence separation and manual external posting confirmation. Exact period activation requires approval. |
| Existing grades, posting-like state and snapshots | v7 derived/student grade state | `DISCARD` | Existing data is fictional. Do not manufacture Gradebook posting history or claim external posting. |
| Workplace taxonomy/configuration | current event types and approved Workplace design | `RECONCILE_AND_PORT` | Use reviewed policy/version authority. Safety-pattern and AWT-R4 thresholds remain unresolved and must return Review/Unresolved where designed. |
| Workplace, behavior and Safety events | daily records, deductions, `behaviorEvents` and incident history | `DISCARD` | Existing events are fictional. Future events use Stage 6 services and explicit linked Evidence where authorized. |
| Attendance records | `attendanceRecords` | `DISCARD` | Existing records are fictional. Future attendance uses correction chains in `attendance_records`. |
| Pass records | `passLog` | `DISCARD` | Existing records are fictional. Future Pass authority remains separate from Attendance. |
| Supplemental session records | no full v7 authority | `REBUILD_IN_V8` | Future physical context uses `supplemental_shop_sessions` and never rewrites academic enrollment. |
| Photo metadata | `photoEvidence` | `DISCARD` | Existing fixture metadata is not production authority. Future metadata uses `artifacts` and `artifact_links`; attaching media does not create Evidence. |
| Photo binary data | `WeldingClassroomPhotoStore` IndexedDB | `DISCARD` | Do not touch or migrate during design. Future media uses transactional Stage 9 blob authority after explicit cutover authorization. |
| Notifications and planning-period queues | `notifications`, `planningPeriod` | `DISCARD` for current transactions; future concept `UNRESOLVED` | No approved v8 consumer/store exists. Do not encode these into Gradebook or Activity records. |
| Navigation and display preferences | shell state and local UI preferences | `RETAIN_OUTSIDE_V8` | UI-only state remains outside classroom domain authority. Preserve accepted Samsung behavior. |
| Dashboard/Forecast/Fast Roster projections | derived from classroom records | `REBUILD_IN_V8` | Replace inputs with v8 reads. Persist no view-specific operational truth. |
| Simulation and engineering fixtures | `ArcSimulationFoundation`, Stage 12 isolated engineering DB | `RETAIN_OUTSIDE_V8` | Keep isolated from production database and manifests. Never import fixture records into `arc_classroom_v8`. |

### Reusable-authority reconciliation rules

1. Produce one machine-readable, human-reviewed manifest per reusable family. Each row records source identity, source hash, target type, proposed stable UUID, course scope, version, disposition, reviewer, and unresolved fields.
2. Reconcile `projectLibrary` against `projectBank` before conversion. The Schema 7 merge behavior is evidence of duplication, not permission to import both.
3. Reconcile `inventory` against `materialInventory` before any future inventory design. Current fictional physical stock is excluded.
4. Course-scoped content must retain explicit WT or AWT ownership. Shared content requires an affirmative reviewed decision.
5. Display-name equality is not identity. Conflicts, missing provenance, ambiguous ownership, and unsupported relationships stop that manifest row as `UNRESOLVED`.
6. Evidence declarations are prospective authoring authority. They cannot be inferred from current grades, rubric scores, labels, or photos.
7. Every manifest is dry-run validated for uniqueness, referential integrity, excluded test data, and deterministic repeatability before execution is authorized.

## Concrete v7-to-v8 authority map

“Stage” refers to the proposed sequence below. All rows remain design only.

| Domain / view | Current v7 source | Target v8 authority | Disposition / prerequisite | Stage; post-cutover path | Rollback and parity evidence | Unresolved decisions |
|---|---|---|---|---|---|---|
| Student identity | embedded students in class state | `ArcV8Academic`; `students` | Existing fictional records `DISCARD`; production identity entry requires authorization | 2; v8 read/write | restore pre-stage package; identity/duplicate audit | roles, authentication, identity source |
| Academic periods | `academicYear`, `semester` | `school_years`, `semesters`, `grading_periods` | reviewed dates and codes | 2; v8 read/write | manifest reversal; period/ownership parity | exact school calendar and grading periods |
| Sections, rosters, enrollments | `sections`, class student membership | `sections`, `course_enrollments` | reviewed course/section manifest | 2; v8 read/write | recovery package; roster membership parity | production roster source and role permissions |
| Schedule moves | enrollment/schedule fields and section movement logic | `enrollment_schedule_assignments`; `ArcV8Academic` atomic move | academic identities first | 2; v8 read/write | restore and effective-date roster parity | calendar/override mapping |
| Activities | library-like definitions and student technical/project work | `ArcV8Activity`; six Activity stores | reconciled definitions; no inferred declarations | 3/11; v8 read/write | definition-version and assignment/attempt parity | missing Practice/Skill Challenge population |
| Projects, builds, checkpoints, needs | `projectBank`, student projects/checkpoints | `ArcV8Project`; five Project stores plus Activity | definition manifest first; transactions begin fresh | 3; v8 read/write | Taylor workflow and event projection parity | exact content conversion rows |
| Competency catalog | WT/AWT runtime catalogs | `competency_definitions`, `competency_versions` | audited stable-key manifest | 4/11; v8 read, versioned writes | catalog count/order/text/hash comparison | unsupported descriptions/standards links |
| Evidence and Overrides | manual ratings/scopes/history | `ArcV8Evidence`; source/record/strategy/override stores | existing fictional ratings discarded; approved strategies/declarations required | 4; v8 read/write | derivation fingerprint and explanation parity where applicable | Safety, AWT-R4, curriculum thresholds |
| Workplace/Safety | daily workplace and behavior/incident state | `ArcV8WorkplaceSafety`; five stores | taxonomy/policy review | 5; v8 read/write | daily/week projections and linked-incident atomicity | unresolved blocker/pattern thresholds |
| Gradebook | v7 calculations and student results | `ArcV8Gradebook`; nine stores | versioned policy and upstream finalization | 6; v8 read/write | category/course/NYA/posting-state parity; manual posting proof | production period activation and permissions |
| Attendance | `attendanceRecords` | `ArcV8Attendance`; `attendance_records` | academic authority first | 7; v8 read/write | correction-chain/current-status parity | production entry roles |
| Pass | `passLog` | `pass_events` | academic/student identity first | 7; v8 read/write | lifecycle/open-pass parity | production policy/roles |
| Supplemental | no complete v7 authority | `supplemental_shop_sessions` | home enrollment must remain owner | 7; v8 read/write | context/denominator invariants | authorization workflow details |
| Attendance grade decisions | ad hoc/manual behavior | `attendance_grade_decisions` | explicit instructor confirmation | 7; v8 read/write | no-silent-grade-mutation test | UI and reviewer roles |
| Artifacts/media | `photoEvidence`, `WeldingClassroomPhotoStore` | `ArcV8Artifacts`; three stores | existing fixture media discarded; Stage 11 recovery ready | 8; v8 transactional write/read | checksum/readback/link parity; complete package | privacy, retention, consent, media limits |
| Booths | `booths`, assignments/issues | `ArcV8BoothOperations`; four stores | definition/resource manifest; fresh transactions | 9; v8 read/write | occupancy/move/reload parity | exact production booth/resource list |
| Dashboard | derived `dayPlan`, schedule and selected class | projection from v8 Academic/Activity/Project/etc. | relevant domains authoritative | 10; read-only v8 projection | baseline selected/current-class comparison | missing v8 lesson/focus consumer |
| Student Profile | assembled v7 student state | projection across v8 stores | upstream domains authoritative | 10; read-only plus service-routed actions | Taylor identity/work/status agreement | final interface and privacy fields |
| Fast Roster | derived roster/pass/booth/work state | v8 projection; no dedicated store | Academic, Attendance, Booth, Project authoritative | 10; read-only projection | same-student/current-context parity | final consumer conversion details |
| Class Forecast | `ArcClassForecast` derived from v7 | v8 projection; no dedicated store | Project/Activity/Booth/material inputs resolved | 10; read-only projection | Taylor readiness/review/manual-state parity | v8 inventory/material readiness authority |
| Booth Manager | v7 booth state | Stage 10 services/projections | Booth authority active | 9/10; v8 read and service writes | Booth 4 stability and occupancy parity | none structurally; production list pending |
| Open Shop | manual ratings/project/material-derived recommendations | v8 projection from competency Evidence, Projects, Activities and resources | Evidence and content readiness | 10/11; read-only projection with service-routed actions | exact competency deep-link and recommendation explanation | ranking, qualifying opportunity, resource availability |
| Technical Knowledge | `technicalLibrary`, student `tech` | Activity Definition/Version/Assignment/Attempt plus Gradebook | reviewed Technical/Test manifest | 3/11; v8 read/write | points/type/version/finalization parity | Evidence declarations cannot be inferred |
| Project Bank/content | `projectBank` plus merged `projectLibrary` | versioned Activity definitions plus project configuration | duplicate reconciliation | 11; v8 content read/version writes | manifest counts/hashes/course scope | unsupported or conflicting content rows |
| Inventory | `inventory`, `materialInventory`, `ArcMaterialInventory` | no approved v8 store/service | current transactions discard; future design required | unresolved before 10/13; remain v7-only | no cutover until complete recovery/parity exists | entire v8 inventory model and consumer contract |
| Backup/recovery/protection | v7 JSON/import rollback and Stage 11 v8 service | `ArcV8BackupRecovery`, metadata/infrastructure protection | exact production DB identity; complete package/media/readback | 1 and every stage; v8 authority | mandatory verified recovery point and parity audit | encryption/cloud optionality and policy |

No table row authorizes an unsupported deterministic mapping. Any unresolved cell is a stop condition for the affected future stage, not a reason to guess.

## Production `arc_classroom_v8` initialization design

Initialization is a future, separately authorized operation:

1. Verify the exact Git commit/tree/build, database name `arc_classroom_v8`, ARC schema 8, IndexedDB structural version 10, and expected 53-store manifest.
2. Verify that no classroom tab, service worker, or older build can write during initialization.
3. Enter a named initialization protection mode through existing infrastructure authority. Refuse ordinary reset and classroom writes.
4. If the database exists, audit its identity and contents. Unexpected records or a mismatched store manifest stop the procedure; they are not overwritten.
5. Create and read back a complete pre-initialization recovery point where applicable. Record package checksum, media coverage, audit result, Git rollback reference, and operator/time in the cutover record.
6. Apply only approved reusable-authority manifests. Explicitly exclude simulation, Stage 12 engineering, pilot, test, and fictional transactional data.
7. Validate stable IDs, course scopes, versions, referential integrity, manifest hashes, required relationships, media checksums, and zero excluded test identities.
8. Export a complete initialized v8 package, verify SHA-256 values, perform completed-package readback verification, and run the database integrity audit.
9. Record the initialization manifest and reconciliation report outside mutable domain truth and link them to the exact recovery point and Git authority.
10. Transition to `Production/Classroom Protected` only after an explicit readiness decision. Initialization alone does not authorize classroom use or real student data.

## Recovery and failure gates

Stage 11 and Stage 12 recovery behavior is frozen prerequisite authority.

| Gate | Required evidence | Failure action |
|---|---|---|
| Pre-change checkpoint | exact commit/tree/build; local rollback ref; DB identity; complete v8 package including media; SHA-256/readback; integrity audit; cutover manifest | stop before mutation |
| Isolation | engineering/test DBs distinct from `arc_classroom_v8`; v7 `weld_v013` and `WeldingClassroomPhotoStore` identified and protected | stop; do not reset, import, or initialize |
| Stage execution | only approved domain/service writes; transaction completion; no dual write; audit log and manifest row coverage | abort transaction and preserve prior authority |
| Post-change parity | store/referential audit; domain invariants; named UI projection comparisons; complete package/readback | roll back the stage; do not advance |
| Physical behavior | Samsung installed PWA and direct Chrome checks whenever classroom behavior changes | keep stage unaccepted; retain previous classroom authority |
| Final cutover | all domain exits passed; v7 writes demonstrably shut down; v8 recovery rehearsal passed; reconciliation signed | restore prior protected authority or hold classroom use |

A failed stage cannot silently continue. Rollback restores the last verified complete package and exact Git authority, then reruns integrity and parity checks. Recovery evidence must show the previous classroom dataset remains recoverable even when the attempted stage fails.

## Cross-view convergence authority

The Taylor Reed fixture remains the minimum deterministic cross-view scenario:

- student: Taylor Reed;
- academic context: 4th Period WT;
- project: Welding Coupon Holder;
- booth: Booth 4;
- underlying manual state: Ready to Work;
- checkpoint sequence: Material Preparation, Fit-Up, Tack & Pre-Weld Check.

Required sequence:

1. Baseline: Fit-Up is active, manual Ready to Work remains authoritative, and Booth 4 is assigned.
2. Ready for Review: derive `Instructor Review — Fit-Up` while preserving manual Ready to Work.
3. Verify: advance to Tack & Pre-Weld Check and preserve Ready to Work.
4. Needs More Work: return Fit-Up to active work while Booth 4 remains stable.
5. Reload: reproduce the same state deterministically.

After each relevant cutover stage, Student Profile, Fast Roster, Class Forecast, and Booth Manager must identify the same student, enrollment, project/build/checkpoint, readiness, and booth from shared v8 authorities. Forecast and Fast Roster store no independent operational truth.

## Privacy and security readiness blockers

Backup success is not a privacy, security, or FERPA compliance determination.

### Mandatory before real student data

- Approved identity and authentication model for instructor, administrator, student, and support access.
- Role-based authorization for records, grades, evidence, media, exports, reset, restore, and protection-mode operations.
- School/IT-approved device, browser-profile, physical-access, session-lock, update, incident, retention, deletion, and lost-device policies.
- Approved privacy boundaries for student/family views, Showcase, media, exports, cross-class access, and supplemental contexts.
- At-rest and export-package protection decision appropriate to school policy, including key custody if encryption is required.
- Auditable production initialization, recovery, restore authorization, and operator accountability.
- Verified media consent/provenance/retention rules and secure handling of backup files.
- Classroom consumer conversion, Samsung physical acceptance, and explicit Production/Classroom Readiness authorization.

### Controls satisfiable through local or deployment policy

- Dedicated managed classroom profile/device configuration and screen lock.
- Restricted filesystem location and access for exported packages.
- Exact Git/build publication and rollback records.
- Offline cache/version verification and prevention of stale writers during cutover.
- Scheduled local backup, checksum/readback, restore rehearsal, integrity audits, and protected-mode checks.
- Engineering, simulation, and production database isolation.

These controls still require approval and evidence; this design does not assert that they are currently active.

### Optional convenience, not a readiness prerequisite unless later required

- OneDrive or other cloud synchronization.
- Automatic school-gradebook API posting.
- Multi-device cloud replication.

### Decisions requiring school, IT, or instructor authority

- Authentication provider, account lifecycle, and role assignment.
- Encryption requirement, algorithm/service selection, and key recovery/custody.
- Approved storage locations, cloud use, backup retention, breach response, and device management.
- Student/family visibility, consent, media sharing, export permissions, and record retention.
- Who may initialize, restore, reset, override, finalize, post, reopen, or retire data.

## Year-One instructional readiness

Technical cutover and instructional readiness are separate gates. Before classroom readiness, WT and AWT must have sufficient reviewed content for their actual Year-One scope:

- Lesson Plans and curriculum sequences;
- Projects;
- Practice;
- Skill Challenges;
- Technical Assignments;
- Tests;
- instructor-approved Resources;
- qualifying Evidence Opportunities and declarations;
- remediation and reassessment paths;
- extension and differentiation;
- meaningful student choice.

Coverage must be auditable through:

`Standards → Curriculum Map → Competencies → Lesson Plans → Activities → Evidence Opportunities → Resources`

The audit records stable IDs, course scope, version, status, prerequisite relationships, evidence declaration, resource provenance, gaps, and instructor approval. A link existing somewhere is insufficient: every required standard and competency needs an explainable instructional and evidence path, and every Activity used for competency derivation needs a valid declaration. Missing content remains a visible gap. Stage 13 does not populate this library.

## Unresolved policy and product authority

The following remain unresolved and block only the stages that depend on them:

- exact Safety-pattern thresholds and detailed event/remediation policy;
- AWT-R4 blocker, review, and lowering thresholds;
- remaining curriculum Evidence qualification, strength, diversity, recency, and contradiction parameters;
- exact v7 reusable-content rows where identity, provenance, course scope, or target relationship cannot be proven;
- production authentication, authorization, encryption, cloud, key-management, and IT policy;
- required roles and privacy/visibility controls;
- production school calendar, grading-period, roster-source, and operator approval details;
- classroom interfaces that lack v8 consumers, including Lesson Plans/Weekly Focus, Resources, inventory/material readiness, notifications/planning workspace, and other future destinations;
- v8 inventory stores, services, migration/rebuild rules, and projection contract;
- Resource Bank schema, approval lifecycle, contextual uncertainty, and media behavior;
- Open Shop taxonomy, opportunity approval, ranking, repetition, and availability authority;
- student/family media, Showcase, consent, retention, and export rules;
- external school-gradebook reconciliation permissions and any future API integration.

## Proposed bounded implementation sequence

Every stage begins from a clean accepted authority, creates a pre-change checkpoint, and keeps real student production data prohibited unless Stage 15 explicitly authorizes it. “Samsung” means installed PWA and direct Samsung Chrome where classroom behavior changes.

| Stage | Scope and authoritative domains | Likely services/files | Forbidden scope | Required tests and parity | Samsung requirement | Rollback and exit criteria | Real data |
|---|---|---|---|---|---|---|---|
| 1. Production-v8 initialization/protection prerequisites | Validate empty production identity, 53 stores, protection lifecycle, recovery/readback and manifests; no classroom domain becomes authoritative | `arc_v8_storage.js`, `arc_v8_backup_recovery.js`, initialization tooling/docs | content import, UI conversion, v7 reset | store manifest, DB identity, complete package/media/checksum/readback, protected-mode refusal | only if browser lifecycle changes | restore/remove only the explicitly initialized empty DB; exit with verified protected empty authority and recovery point | Prohibited |
| 2. Academic identity/enrollment/schedule/rosters | Student, Course, School Year, Semester, Grading Period, Section, Enrollment, Schedule Assignment become v8 authoritative together at the approved boundary | `arc_v8_academic.js`, classroom academic adapters, roster/schedule consumers | Activities, grades, evidence, synthetic identities | referential/lifecycle/move tests; roster and schedule parity; no duplicate identities | required | restore v8 package and prior UI authority; exit with all academic writes routed only to v8 | Prohibited |
| 3. Activity and Project classroom workflows | Versioned Activity and Project operations, builds, checkpoints, needs, rubrics | `arc_v8_activity.js`, `arc_v8_project.js`, bounded classroom adapters | competency derivation, grade posting, content bulk population | assignment/version/project event tests; Taylor project sequence | required | restore pre-stage package and route workflows to prior authority; exit with no v7 Activity/Project writes | Prohibited |
| 4. Competency catalog/Evidence/projections | reviewed WT/AWT catalog, sources, records, strategies, overrides and explanations | `arc_v8_evidence.js`, catalog manifest/importer, competency consumers | invented mappings/thresholds, conversion changes | catalog manifest/hash/order, derivation fingerprints, override/history and deep-link parity | required | restore and retain prior rating authority; exit only with approved strategy/declaration coverage and v8-only writes | Prohibited |
| 5. Workplace/Safety | Workplace days/events/observations, Safety links, finalization and bounded R4 outputs | `arc_v8_workplace_safety.js`, classroom Workplace adapters | unresolved threshold invention, Attendance grading | daily/week/event atomicity, recurrence, denominators, Review/Unresolved behavior | required | restore and route to prior authority; exit with one v8 event authority and unresolved policies safely gated | Prohibited |
| 6. Gradebook | policies, assessment results, entries/revisions, posting instances/events, quarter snapshots | `arc_v8_gradebook.js`, Gradebook consumers | SIS auto-posting, Attendance silent mutation | weights/points/NYA/weekly coverage/quarter-close contracts; manual posting confirmation | required | restore; external gradebook unchanged; exit with v8-only ARC grade writes and explicit posting state | Prohibited |
| 7. Attendance/Pass/Supplemental | correction-chain Attendance, Pass lifecycle, Supplemental context, confirmed grade decisions | `arc_v8_attendance.js`, roster/attendance consumers | enrollment reassignment, automatic grade mutation | correction/lifecycle/denominator/home-enrollment tests | required | restore; exit with separate authorities and instructor-confirmed grade decisions | Prohibited |
| 8. Artifacts/media | transactional artifact metadata/blob/links, audit and deletion safeguards | `arc_v8_artifacts.js`, media adapters | v7 photo migration without separate authority, automatic Evidence | transaction failure, checksum, orphan/link/delete, backup/readback | required on camera/media device | restore package including media; exit with no partial-success path and approved privacy controls | Prohibited |
| 9. Booth/physical-shop projections | Booth definitions/resources/assignments/issues and physical context | `arc_v8_booth_operations.js`, Booth Manager adapters | academic ownership changes, inventory migration | occupancy/move/issue/supplemental/reload and Taylor Booth 4 parity | required | restore and use prior Booth authority; exit with v8-only Booth writes | Prohibited |
| 10. Cross-view convergence | Student Profile, Fast Roster, Class Forecast, Booth Manager and Dashboard read shared v8 authority | view controllers/adapters, no new domain store | visual redesign, persisted Forecast/Fast Roster truth | complete Taylor sequence across all views, reload and offline/cache behavior | required | revert adapters and restore package; exit with one consistent cross-view projection | Prohibited |
| 11. Reusable instructional/system reconciliation | reviewed competency, standards, curriculum, Project, Lesson, Technical/Test, Activity-like, material, Booth and policy manifests | bounded import tooling, v8 services, content docs | whole-state copy, fictional transactions, inferred Evidence declarations | dry run/repeatability/hash/count/reference/course-scope and coverage-gap reports | required only if classroom presentation changes | restore pre-import package; exit when every row is imported, excluded, or explicitly unresolved | Prohibited |
| 12. Disposable v7 development-data retirement | retire only approved fictional/pilot/test transactions after v8 parity | bounded retirement tooling and recovery records | real data, reusable authority, v7 photo authority without disposition | complete v7 recovery capture, exclusion manifest, no reusable loss, v8 integrity | required if normal classroom startup changes | recover exact v7 state; exit with signed retirement report and protected v8 package | Prohibited |
| 13. Final classroom cutover and v7 write shutdown | normal classroom routes all accepted domains to v8; v7 becomes read-disabled/retired per plan | bootstrap, service adapters, `index.html`, service worker/cache only as separately reviewed | new features, unrelated UI redesign, dual write | full suites, cold/reload/offline/update, no v7 writes, backup/restore and cross-view parity | required | exact Git and complete data rollback; exit with v8 authority and demonstrably disabled v7 writes | Prohibited |
| 14. Production/Classroom Readiness review | evidence-only gate across engineering, Samsung, recovery, privacy/security, content, operations and training | readiness report/checklists | implementation changes hidden inside review | independent evidence review; recovery rehearsal; Year-One coverage and blocker audit | required acceptance | no authority change on failure; exit only with explicit signed readiness decision | Prohibited |
| 15. Explicit real-student-data permission | record a separate school/IT/instructor authorization after Stage 14 | authorization and operational runbook | code changes, assumed permission, retrospective approval | verify exact accepted build/DB/protection/roles/backups and operator readiness | verify accepted classroom device state | revoke/stop intake and preserve protected empty baseline if gate fails; exit only with explicit permission | Authorized only by this separate gate |

## Stage 13 completion declaration

This design changes no runtime, schema, store, service worker, build identifier, test, database, v7 data, external state, or deployed publication. It authorizes no Stage 14 implementation. The normal classroom remains Schema 7 and real student production data remains prohibited.

- Stage 12 Samsung Physical Verification: **PASSED**
- Stage 13 Classroom Integration & Cutover Design Authority: **COMPLETE**
- Production Readiness: **NOT ACHIEVED**
- Classroom Readiness: **NOT ACHIEVED**
- Real Student Production Data: **NOT AUTHORIZED**
