# ARC Repository Continuity & Source Authority Inventory

## Authority and boundary

This inventory starts from P10D-R1A commit `fee5f0d5a0461e32fb2e613b1bc40a88b60bbb6e`, tree `0f305308a560e64c026e530f9138205ab431d2ea`, and rollback reference `rollback/pre-stage-14-continuity-source-inventory`.

It inventories the complete current repository and reachable Git history. It changes no runtime, build, cache, Schema, IndexedDB, database, P10D manifest, review queue, reconciliation disposition, parity state, or academic authority. `V7_ONLY` remains authoritative. P10D-R1B has not begun.

## Authority model used by this inventory

| Level | Meaning |
|---|---|
| A — controlling source evidence | An original external source or an instructor-approved exact transcription that can control wording or policy. |
| B — governing accepted design | Approved ARC design authority that controls future implementation within its stated boundary. It does not prove runtime implementation. |
| C — accepted implementation evidence | Current accepted runtime, tests, or machine-readable artifacts that prove present behavior. |
| D — continuity / roadmap | Durable product intent and deferred docking ports. These must survive conversion but do not become present-day parity blockers merely by appearing in the roadmap. |
| E — engineering history | Milestone, diagnostic, verification, and handoff records. These explain provenance and constraints but are superseded where later governing authority conflicts. |

## Search coverage and negative findings

The inventory covered every tracked file at the starting tree and every path reachable from all Git refs. It searched current content, path history, deleted/renamed paths, object paths, and content history for continuity, SLO, Standards, curriculum, Lesson/Planbook, portfolio, Student ARC, projects, notifications, pacing, inventory, recovery, administration, competition, employment, and longitudinal-growth terms.

No deleted or renamed documentation path exists in reachable history. No dated continuation file separate from the current continuity pair exists. The only image/document extensions ever stored are ARC branding artwork, generated app icons, and their runtime derivatives. There is no standards photograph, scanned standards packet, SLO packet, PDF, DOC, DOCX, HEIC, TIFF, or other photographed instructional source in reachable repository history.

## Continuity and controlling architecture artifacts

| Path | Purpose | Level / classification | Capability effect | Omission or conflict finding |
|---|---|---|---|---|
| `docs/ARC_MASTER_PLAN.md` | Preserves the original product vision, deployment priorities, future modules, and product decision filter. It explicitly calls itself the north star rather than a mandate to build every future feature before deployment. | D — current roadmap | Touches all 47 parity rows and the future ecosystem inventory below. | P1–P10D preserved its core source-of-truth, optional ARC Student, evidence, inventory, Project Bank, administrative-output, and tablet principles. Some roadmap items are not explicit parity rows; that is correct for future-only items, subject to the annotations below. |
| `docs/ARC_CONTINUITY_LOG.md` | Preserves settled reasoning across engineering threads, Project Bank boundaries, collaboration protocol, and deferred docking ports. | B/D — settled design plus roadmap | Projects, competencies, evidence, student-facing language, SLO, Project Bank, pacing, inventory, PWA. | It explicitly requires photographed South Dakota Standards and the SLO packet to be deliberately reconciled. P10D correctly left source verification unresolved. |
| `docs/ARC_CONTINUATION_HANDOFF.md` | Summarizes the accepted September classroom milestones, settled implementation boundaries, important documents, and intentionally deferred work for later threads. | D/E — continuity handoff and engineering history | Broad present behavior; ARC Student, Planbook/SLO, recommendations, ordering, security, Project Bank population. | Its milestone status is historical and cannot override later Stage 13/14 authority. Its deferred list remains valid roadmap evidence where later design has not superseded it. |
| `docs/ARC_CAPABILITY_REGISTRY.md` | Running status registry separating Implemented, Partial, Foundation, Docked/Future, and Missing capabilities. | B/C/D — status index, not a source packet | All runtime and future capabilities. | It contains later Stage 14 entries but its header still describes the Stage 12 publication as its verification baseline. Use later bounded milestone documents and the frozen parity contract for exact Stage 14 status. |
| `docs/ARC_SCHEMA_V8_STAGE_13_CLASSROOM_CUTOVER_DESIGN.md` | Governs v7 data-family classification, authority transitions, rollback gates, production protection, Samsung verification, and the bounded cutover sequence. | B — governing cutover design | All production-critical parity rows; instructional-content reconciliation; privacy/recovery. | P1–P10D follows the `RECONCILE_AND_PORT` versus transactional discard/rebuild boundary. It does not replace product roadmap authority. |
| `parity/stage14_v7_v8_parity_contract.js` and `docs/ARC_STAGE_14_V7_V8_NO_REGRESSION_PARITY_P1.md` | Machine-readable and human-readable frozen 47-row no-regression contract. | B/C — governing cutover inventory and executable contract | Exact 47 present-day capability rows. | It is deliberately narrower than the Master Plan. Future-only ecosystem items must remain documented without being promoted automatically to parity blockers. |
| `docs/ARC_STAGE_14_V7_V8_NO_REGRESSION_PARITY_P2.md` through `P10D_R1A.md` | Bounded design, structural, service, adapter, UI-verification, and reconciliation evidence for each parity stage. | B/C/E according to each document's explicit boundary | Academic administration, consumers, Attendance/Pass, Projects/Technical, Competency/Evidence, Workplace/Safety/Behavior, Gradebook, Student History, Curriculum/Pacing, Lessons, content reconciliation. | They provide achieved evidence only. They do not erase unresolved roadmap items or external-source gates. |

Git history shows `ARC_MASTER_PLAN.md` was introduced once at `6a4cc985fd543349c84092b5d788704ab496b678`. The continuity log and continuation handoff were incrementally updated across the accepted Project Bank through Titanium milestones; no alternate or dated continuity authority survives in history.

## South Dakota WT/AWT Standards source authority

### Repository evidence

| Artifact | Finding | Authority |
|---|---|---|
| `index.html` — `TECHNICAL_STANDARDS` | Exact repository transcription: 9 WT and 20 AWT statements, with Boolean priority/essential flags. It contains neither course number `13207`/`13208` nor the label `Adopted May 2022`. | C for accepted current runtime wording; not original source evidence. |
| `index.html` — `ESSENTIAL_STANDARDS` | Exact repository list of four WT and six AWT designations. | C for accepted current runtime behavior; not proof of the external source's visual markings. |
| `reconciliation/p10d/instructional-content-manifest.json` | Preserves the repository transcriptions, source hashes, proposed stable identities, and unresolved external comparison. | C for deterministic reconciliation evidence; not source-photo authority. |
| `reconciliation/p10d/consolidated-review-queue.json` | Contains separate `SV-WT-STANDARDS-SOURCE` and `SV-AWT-STANDARDS-SOURCE` gates. | B/C for the unresolved review boundary. |
| `docs/ARC_STAGE_14_V7_V8_NO_REGRESSION_PARITY_P10D.md` and `...P10D_R1A.md` | State that external source-photo/document authority is absent and repository wording cannot be selected over unavailable source evidence. | B — current reconciliation rule. |
| `docs/ARC_CONTINUITY_LOG.md` | States that exact standards language must not be fabricated and repository data remains provisional until photographed South Dakota standards are deliberately reconciled. | B/D — settled continuity rule. |

### Source conclusion

The instructor's photographs identify controlling external candidates as South Dakota DOE Welding Technology course `13207` and Advanced Welding Technology course `13208`, both adopted May 2022. Equivalent photographs, documents, or verified photo transcriptions do **not** exist anywhere in the current repository or reachable Git history. The repository contains an accepted runtime transcription, but no chain of custody tying that transcription to those photographs.

The photographs must therefore be compared directly in P10D-R1B (or a preceding source-ingestion review) before WT/AWT Standard wording, catalog metadata, Essential designations, and dependent normalized links can receive final source dispositions. Repository wording may be preserved as current behavior while that comparison occurs; it must not be called verified external wording yet.

### Orange highlighting

No surviving ARC document states that orange highlighting in the South Dakota source means `Essential Standard`. Repository `true` flags and `ESSENTIAL_STANDARDS` prove ARC's current selected set, not the semantic meaning of orange in the external photographs. Other ARC color authority defines orange as Significant Concern in application semantics and is unrelated to a photographed-document legend. Orange-highlight meaning remains an explicit instructor/source-document question.

## SLO authority findings

| Path | Purpose and authority | Finding |
|---|---|---|
| `docs/ARC_MASTER_PLAN.md` | D — identifies SLO evidence and administrator-ready documents as long-range program readiness. | Requires capture-once/reuse and authentic classroom evidence, but supplies no district packet fields or reporting template. |
| `docs/ARC_CONTINUITY_LOG.md` | B/D — authentic performance evidence should support future SLO documentation where requirements allow; photographed standards and the SLO packet require deliberate reconciliation. | Establishes principle and missing-source gate. |
| `docs/ARC_ASSESSMENT_GRADEBOOK_DESIGN.md` | B — approved future SLO/reporting architecture. | SLO consumes existing Evidence, Competency snapshots, Gradebook history, academic scope, and population. It must not create parallel evidence. Only finalized administratively required snapshots persist. |
| `docs/ARC_CAPABILITY_REGISTRY.md` | C/D — `SLO/reporting` is only Foundation; Administration and Administrative Document Engine are Docked/Future. | Current grades/history and limited reporting do not equal administrator-ready SLO generation. |

No SLO specification, packet transcription, photographed packet, reporting template, scoring rubric, required population rule, district form, or verified external SLO source exists in the repository or reachable history. The governing design is sufficient to preserve ownership boundaries, but implementation and final report fields remain blocked by the missing authoritative packet and instructor/administrator review.

## Instructional, assessment, and reporting authority map

| Artifact family | Purpose | Level / classification | Frozen parity effects | Omission/conflict finding |
|---|---|---|---|---|
| `index.html`: `MASTER_CURRICULUM_MAPS`, `MASTER_LESSON_BANKS`, `TECHNICAL_STANDARDS`, `ESSENTIAL_STANDARDS`, `COMP` | Accepted v7 instructional content and workflow literals. | C — current accepted behavior/transcription | `curriculum-standards`, `pacing`, `lesson-plans`, competency rows, technical assessments. | P10D preserved exact content. External Standards verification, stable-ID approval, and human-reviewed relationship authority remain open. |
| `docs/ARC_STAGE_14_V7_V8_NO_REGRESSION_PARITY_P10B_A1.md` through `P10B_UI.md` | Frozen Standards/Curriculum/Pacing contracts, structural/service authority, and isolated UI evidence. | B/C/E | `curriculum-standards`, `pacing`. | Correctly leaves real content reconciliation, production import, and Forecast conversion open. |
| `docs/ARC_STAGE_14_V7_V8_NO_REGRESSION_PARITY_P10C_A1.md` through `P10C_UI.md` | Frozen Lesson contracts, structural/service authority, and isolated Lesson Bank/Auto Build evidence. | B/C/E | `lesson-plans`, `pacing`. | Correctly leaves real Lesson reconciliation, Planbook approval state, Resources, Weekly Plans, production import, and Forecast open. |
| `docs/ARC_STAGE_14_V7_V8_NO_REGRESSION_PARITY_P10D.md`, `...P10D_R1A.md`, and `reconciliation/p10d/*` | Exact repository-content manifest and compressed review/source-verification queue. | B/C — reconciliation evidence | Curriculum, Lessons, Standards, Competencies, Activity relationships. | R1A correctly determines that candidate links can remain absent and that the two source gates are the only current import blockers for Standards/Essential authority. |
| `docs/ARC_ASSESSMENT_GRADEBOOK_DESIGN.md` | Approved Evidence, Activity Library, Resources, Gradebook, Showcase, Administration, weekly planning, Workplace, state/color, and conceptual Schema v8 design. | B — governing accepted future design; its current-boundary passages describe older runtime snapshots. | Most assessment, planning, Gradebook, Student History/Showcase, notifications, inventory-readiness, and administrative capabilities. | P1–P10D implemented bounded pieces but did not erase unresolved thresholds, Resources, administrative documents, or external posting. Runtime-status prose must be read alongside later Stage 14 evidence. |
| `docs/PROJECT_BANK_PROGRESSION_v0.18.md`, `docs/NEEDS_ATTENTION_RULES_v0.18.md` | Accepted Project Bank progression and Needs Attention derivation boundaries. | B/C — retained behavior design | Project library/assignment/checkpoints, Fast Roster, Forecast, Open Shop. | Later P6/P7 conversions preserve these boundaries. Full Project Bank population and advanced recommendations remain future. |

## Long-range and deliberately deferred ARC ecosystem

These items are durable ARC intent. Their absence from current implementation does not remove them from the roadmap and does not automatically block the current no-regression cutover.

| Intended capability | Durable sources | Current classification | Parity treatment |
|---|---|---|---|
| ARC Student, student dashboard, optional PIN access, project requests, `View as Student` | Master Plan §§2, 9, 13; Continuity Log; Continuation Handoff | D — future optional module | Not a current parity blocker. Preserve instructor independence. Student-facing targets are documented future authority associated with Lessons/Administration. |
| Student portfolio / Showcase, employment-ready competencies, projects, photos, multi-year growth, job applications | Master Plan §9; Assessment/Gradebook `Student Showcase`; capability registry | B/D — approved future projection | `student-work-library`, `student-history`, `photo-capture` preserve prerequisites. Full family/student-facing Showcase is not a standalone 47-row capability and must remain explicitly docked. |
| Growth Milestones and longitudinal progression | Continuity Log; Continuation Handoff; Master Plan student portfolio | D — deliberately separate/future | Must not be inferred from Project clearance or completion. Not a present parity blocker. |
| Advanced Welding Competition | Continuity Log and Continuation Handoff | D — incomplete future rules | No implementation authority or completed rules. Preserve docking port; do not infer eligibility or scoring. |
| Recommendations, Open Shop intelligence, misconception follow-up, project coverage-gap suggestions | Master Plan §§5, 7, 10, 15; Assessment/Gradebook recommendation sections | B/D — approved boundaries, unresolved algorithms | Current `open-shop`, `class-forecast`, notifications and Teaching Tips rows cover retained behavior. Broader intelligence remains advisory and instructor-controlled. |
| Project Bank population, Community Project Bank, Project Planner/CAD/3D, blueprints, BOM/cut lists | Master Plan §§7, 14; Continuation Handoff | D — major future ecosystem | `project-library` protects current Bank. Community sharing, comprehensive population, and Planner/CAD are roadmap items, not cutover blockers. |
| Daily Knowledge Checks and richer digital assessments | Master Plan §10; Assessment/Gradebook Activity authority | B/D — future student-enabled assessment modes | `technical-assessments` preserves current parity. Automated daily Student flow and question types remain future. |
| Notification queue, Planning Period Workspace, Weekly Focus, pacing intelligence, Today's Focus | Assessment/Gradebook planning and notification sections; Master Plan §§15–17; capability registry | B/D — approved design with unresolved UI/algorithms | `notifications`, `pacing`, `class-forecast`, `lesson-plans` cover current boundaries. Weekly Focus/Today's Focus remain documented dependencies, not current accepted behavior. |
| Inventory intelligence, material demand, cut optimization, reservations, shortages, cost savings, automatic ordering advice | Master Plan §6; Assessment/Gradebook material-readiness sections; Continuity Log/Handoff | B/D — future advisory intelligence | `general-inventory` and `material-inventory` protect current stock workflows. Purchasing is instructor authority; ARC must never place orders or consume stock merely from assignment. |
| OneDrive/cloud sync, authentication, encryption, key management, cross-device recovery | Master Plan deployment status; Continuation Handoff; capability registry; backup/recovery docs | D — unimplemented production protection | `backup-restore` protects local recovery parity. Cloud/security remain Production/Classroom Readiness gates where real data demands them, without pretending the local recovery implementation provides them. |
| Administrator documentation/reporting, SLO, Weekly Plans, Plan Preflight, rubric/walk-through alignment, document engine | Master Plan §17; Assessment/Gradebook Administration sections; capability registry | B/D — approved future architecture | Not explicit standalone 47-row capabilities. They depend on Lesson, Evidence, Gradebook, History and reporting authority; must remain in the roadmap and readiness inventory. |
| Recommendation letters/employment documentation | Master Plan portfolio/employment language; Assessment/Gradebook Showcase/export uses | D — outcome/use case, no frozen document workflow | Preserve as future export/report use. No repository template or policy exists. |
| Other CTE pathways and themes | Master Plan §19; Continuation Handoff | D — platform expansion | Not a Welding cutover blocker. Avoid premature generalization. |
| AI Weld Coach, advisory image feedback | Master Plan §12 | D — future advisory module | Instructor verification remains final. No present parity row or implementation authority. |

## Frozen 47-row parity audit

The machine-readable contract contains exactly 47 rows. At this checkpoint it reports 40 `service-ready`, four `not-started`, and three `accepted`; no row is `ui-connected`. Academic authority remains `V7_ONLY`.

### Existing accepted behavior requiring clearer contract coverage

1. **Teaching Tips** is current accepted functionality (`src/teaching_tips.js` and current Lesson UI) but has no standalone parity row. P10D already associates it with `lesson-plans` and retains it outside v8 persistence. This is adequate only if the `lesson-plans` acceptance criteria explicitly carry Teaching Tips behavior through production cutover. It is a no-regression obligation, not a reason to invent a new data authority.
2. **Basic notification behavior** exists today, while the `notifications` row is still `not-started` because v8 notification authority is absent. This is not a contradiction if the row's acceptance tests preserve the current v7 due grouping and clearing behavior before authority transfer. The future Planning Period queue is additional roadmap scope.
3. **Limited Student profile/report output** exists today, while administrator-ready reporting and Showcase remain future. `student-history` and `student-work-library` cover underlying retained records but the final acceptance inventory should explicitly test the existing limited report so it is not lost.
4. **Teaching Tips favorites** are stated in the Master Plan as desired early behavior, but current runtime implements contextual recommendations without a favorite authority. This is an unimplemented roadmap detail, not accepted parity.

No other accepted normal-v7 production workflow was found outside the 47 rows after accounting for these associated obligations. The contract covers schedule/calendar, roster and academic consumers, Attendance/Pass, Curriculum/Lessons/Pacing/Forecast/notifications, Project/Competency/Technical/Open Shop, Workplace/Safety/Behavior/Gradebook, media/history, Booth/inventory, recovery/PWA/navigation, and simulation isolation.

### Roadmap items that must remain documented without becoming current parity blockers

ARC Student/View as Student; Student Showcase/portfolio/employment export; Growth Milestones; Advanced Welding Competition; Project Planner/CAD/3D and Community Project Bank; full Project Bank population; Daily Knowledge Checks on student devices; AI Weld Coach; Resources; Weekly Focus/Today's Focus; Plan Preflight; Administrative Document Engine; automated Planbook/SLO generation; purchasing/readiness intelligence; OneDrive/cloud/auth/encryption; other pathway themes; and recommendation/employment/competition outputs.

### Conflicts and superseded statements

| Artifact or statement | Treatment |
|---|---|
| `ARC_MASTER_PLAN.md` says Level 4 is Proficient. | Superseded by the approved proficiency authority: Level 1 Introduced 60%, Level 2 Developing 75%, Level 3 Proficient 90%, Level 4 Advanced 100%. It must not control P7/P10D or future grading work. |
| Older current-boundary/status passages in `ARC_ASSESSMENT_GRADEBOOK_DESIGN.md`, `ARC_CAPABILITY_REGISTRY.md`, and `ARC_CONTINUATION_HANDOFF.md`. | Retain as historical boundary statements. Later Stage 14 commits and the parity contract control achieved implementation state. Their approved architectural rules remain governing where not superseded. |
| Stage 1–13 milestone documents and engineering diagnostics. | Engineering history and bounded authority for their subject. They do not override later contracts or expand present scope. |
| Runtime `TECHNICAL_STANDARDS` / `ESSENTIAL_STANDARDS`. | Accepted current behavior, but not a substitute for the absent May 2022 source photographs or an explicit orange-highlight legend. |

## Recommendation for P10D-R1B

Do not freeze Standards or Essential dispositions from repository transcription alone. Proceed in this order:

1. Bring the instructor-supplied WT course `13207` and AWT course `13208`, Adopted May 2022 photographs into an explicit review boundary without treating them as repository authority until their identity and completeness are recorded.
2. Transcribe each source exactly with page/image provenance and perform a deterministic line-by-line comparison against `TECHNICAL_STANDARDS` and `ESSENTIAL_STANDARDS`.
3. Ask one separate question about the source's orange highlighting or locate an authoritative legend. Until then, preserve ARC's current Essential set as current runtime behavior and leave its external-source justification unresolved.
4. Obtain the controlling SLO packet separately before any SLO field/report freeze. It is not required to preserve/import Curriculum or Lesson content.
5. In R1B, apply R1A's mechanical content/relationship separation: preserve exact Curriculum and Lesson content; retain explicit exact-code links; leave candidate-only Curriculum→Competency, Lesson→Competency, Lesson→Curriculum, and Activity/Evidence links absent.
6. Update only the two source-verification gates and directly dependent Standard/Essential dispositions after comparison. Do not import content, advance parity, or turn roadmap items into present-day blockers in R1B.

If the photographs cannot be made available to the bounded R1B process, choose the existing R1A **Defer** option. That permits exact non-Standards Curriculum/Lesson preservation while keeping WT/AWT Standards, Essential designations, and dependent normalized Standard links blocked.

## Recovered source-authority resolution

The missing source package was subsequently recovered and is preserved at `source_authority/recovered_2026-09-29/`. Its deterministic manifest covers 25 originals.

- Official South Dakota DOE PDFs now establish WT `13207` and AWT `13208`, adopted May 2022, exact wording, course metadata and Webb levels.
- Current ARC contains all 29 codes in order. WT 2.2 and AWT 2.2 abbreviate `American National Standards Institute (ANSI)/American Welding Society (AWS)` as `ANSI/AWS`; the other 27 statements match exactly. Current runtime also omits official metadata, parent Standard statements and Webb levels.
- Instructor confirmation, highlighted photographs and recovered curriculum maps agree on all ten instructor-selected Essential Standards. Orange highlighting is now resolved as the instructor's selection mark, not a DOE designation.
- The recovered curriculum maps, competency guides, weekly-plan examples, administrative rubrics, SLO form and FERPA notice supply durable source authority described in `SOURCE_AUTHORITY_FINDINGS.md`.
- Weekly Lesson Plan and SLO generators are required future Administrative capabilities. The state-provided education OneDrive account is the approved durable destination within an offline-first, verified synchronization/recovery architecture. None is implemented by source preservation.

P10D-R1B may now resolve the two Standards source-verification gates, record the two wording discrepancies, and freeze Essential provenance. It must remain a disposition-only stage with no import or parity advance.
