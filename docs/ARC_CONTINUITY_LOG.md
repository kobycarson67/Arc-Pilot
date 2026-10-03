# ARC Continuity Log

This log preserves settled product reasoning that should survive individual engineering threads. The Master Plan remains the product north star.

## Recovered product-authority governance

- Future ARC product and architecture work must read `ARC_MASTER_PRODUCT_AUTHORITY.md`, `ARC_CLASSROOM_READINESS_CONTRACT.md`, and `ARC_AUTHORITY_GOVERNANCE.md` alongside this continuity log and the Master Plan.
- The 47-row v7→v8 parity contract is the required no-regression cutover contract. It is not the entire ARC roadmap and does not by itself establish Classroom Ready status.
- Classroom Ready requires the authority, UI, starter content, recovery/privacy protection, cross-view consistency, and physical Samsung acceptance specified by the Classroom Readiness Contract.
- This documentation checkpoint preserves `V7_ONLY`, the existing P10D/R1A reconciliation state, all parity states, and every source-authority artifact committed at `7aaeb91615c4bcfc87751a49e37c85dad6659ec4`.

## P10D-R1B source verification and disposition freeze

- Official South Dakota DOE WT course `13207` and AWT course `13208`, adopted May 2022, resolve the two R1A source-verification gates. All 29 codes/order match current ARC; WT 2.2 and AWT 2.2 are the only wording differences because current ARC abbreviates the issuing organizations as `ANSI/AWS`.
- Official wording controls a later authorized import. R1B leaves runtime text unchanged and records course metadata, parent Standards, Webb levels/labels, and future target-version identity as later import-design concerns.
- The ten existing instructor Essential selections are frozen with explicit instructor confirmation, highlighted photographs, and recovered Curriculum Maps as provenance. They are not DOE designations.
- All 408 historical queue items receive one effective overlay disposition: 149 preserve exact Curriculum/Lesson content and 259 leave unsupported optional relationships absent. The 51 approved exact WT Lesson-to-Competency links remain preserved; no AWT or P6 identity is invented.
- R1B imports nothing and changes no runtime, Schema/IndexedDB/store, parity, production, or classroom authority. `V7_ONLY` remains controlling. A reviewed import/dry-run plan is a separate future authorization.

## Settled classroom architecture

- Instructor ARC must operate independently of ARC Student and future ARC intelligence. Student devices may multiply value later; they are never a prerequisite for the instructor's dependable classroom core.
- Fast Roster has three shop-floor questions: **Where are they? What are they doing? What do they need?** Booth answers where; primary project and stage answer what; current need answers what the instructor should know next.
- Individual students may legitimately be at different project and fabrication stages at the same time. ARC must not force synchronized progression merely to simplify lesson planning.
- Administrative lesson plans describe the common instructional framework and differentiated pathways. Instructor ARC records each student's actual instructional position.
- Project stages, checkpoint status, time spent, and current need are operational state. They are not automatic grades, competency ratings, discipline evidence, or judgments about a student's effort.
- Project difficulty, competency evidence, course enrollment, project clearance, and student growth are separate concepts. A Level 3 project does not create Level 3 proficiency evidence, and AWT enrollment does not imply Level 4/5 readiness.
- Growth Milestones are separate from project-level clearance. Completion alone must not automatically promote either one.
- Student-facing ARC language should be simple, respectful, teenager-friendly, and actionable. Verified official standards language remains authoritative internally.
- Authentic performance evidence should support future SLO documentation where the applicable requirements permit it. Administrative documentation should flow downstream from authentic teaching and evidence whenever legitimate, rather than driving artificial classroom records.
- ARC's long-range architecture should preserve a broader CTE ecosystem while ARC Welding remains the proving ground. Do not prematurely generalize away the real welding-classroom workflow.

## Project Bank v1 boundaries

- Reusable Project Bank definitions and student assignment records are separate. Editing or archiving a definition does not rewrite a student's stage, need, rubric, checkpoint, or history.
- A student may have multiple active assignments. One may be designated primary/current for Fast Roster without deleting or hiding the others.
- Instructor checkpoints may create the operational need **Needs Instructor Check**. They do not infer competency ratings.
- Readiness and clearance checks are explainable warnings with explicit instructor override, never permanent locks.
- Exact standards language must not be fabricated from memory. Repository-verified codes/data remain authoritative until the photographed South Dakota standards and SLO packet are deliberately reconciled.

## Collaboration protocol

- **Captain** and **Data** terminology—and the occasional humor—are part of the established working style.
- **Engage** means continue from established ARC context; it does not mean restart discovery.
- Examine small classroom observations for larger system implications.
- Explore first, lock decisions second, then send bounded Engineering work.
- Challenge ideas that create unsafe, fragile, misleading, or classroom-hostile behavior rather than automatically agreeing.

## Deferred docking ports

ARC Student, Growth Milestones, Advanced Welding Competition, lesson-module links, Planbook generation, essential-standard coverage, SLO reporting, inventory/material forecasting, and intelligent recommendations remain future integrations. Project Bank v1 stores clean identifiers and structured fields without activating those systems.

## Recovered source-authority checkpoint

- `source_authority/recovered_2026-09-29/` preserves 25 originals byte-for-byte with a deterministic SHA-256 manifest. Future work must consult it where its domain applies.
- Official South Dakota DOE PDFs establish WT course `13207` and AWT course `13208`, adopted May 2022, exact Standard wording, metadata and Webb levels. Current ARC matches 27 statements exactly and abbreviates the organization names in WT 2.2 and AWT 2.2. Runtime and P10D remain unchanged pending R1B.
- Instructor-selected Essential Standards are WT 1.1, 2.1, 3.3, 4.3 and AWT 1.1, 3.2, 5.3, 6.1, 7.3, 9.1. Authority is explicit instructor confirmation plus highlighted photographs plus recovered curriculum maps. Orange is not treated as a DOE designation.
- Recovered WT/AWT curriculum maps and competency guides are instructor design authority. The existing Lesson Bank remains preservation input and requires improved future differentiation; immutable identity does not equal instructional approval.
- The recovered Lesson Plan Review Rubric, Walk-through Rubric, and SLO form constrain future Administrative outputs. ARC does not self-score administrator rubrics or invent approvals, feedback, reflections, signatures, or IEP decisions.
- The Oelrichs FERPA notice is institutional privacy authority and requires later product/security review across every student-record and export surface without speculative legal interpretation.
- The state-provided education OneDrive account is the approved durable synchronization/recovery destination. ARC remains offline-first and must retain local work and pending sync through outages. Verified sync, deterministic conflict/retry behavior, recovery packages, privacy/security review and truthful protection status remain required. OneDrive integration is not implemented.

## Samsung pilot update control

- Installed Android PWAs may not surface a newly deployed shell promptly enough for classroom testing. Settings therefore exposes the running version/build, online state, a real service-worker update check, waiting-update state, and an explicit Apply Update action.
- Manual controls supplement the automatic **Reload & Update** prompt. ARC activates only a verified waiting worker and reloads on the service worker's `controllerchange` event.
- Application-shell updates never intentionally clear classroom records or photo storage. Cache replacement and classroom-data migration remain separate responsibilities.

## Public deployment truth

- The September 18 Samsung reset proved the public Pages URL was still serving v0.17.1/schema 4 even though development HEAD and regression checks had advanced through Booth Manager, Project Bank, schema 7, and manual update controls.
- Root cause: GitHub Pages publishes `main` from the repository root. Development work was pushed to `dev/v0.18-needs-attention`, whose workflow tested the code but did not promote or deploy it. The public artifact therefore remained the September 15 `main` deployment at `1b15374b32d0a189a18888af18a75fc5950e7377`.
- Repository HEAD, regression success, and public deployment state are three separate facts. Engineering must verify all three rather than treating a green test workflow as proof that the tablet URL changed.
- Releases preserve the existing branch-based Pages model: promote the tested development commit to `main`, allow Pages to deploy it, then compare the public build marker and critical assets with that exact commit.

## Booth Manager tablet repair

- Physical Samsung testing found that Booth Manager had been modeled as a viewport-covering modal even though it behaves as a primary class view. The persistent modal intercepted the visible experience while global navigation changed content behind it, and its centered viewport layout allowed the sticky header to obscure the first booth controls.
- Booth Manager is now a normal routed ARC view beneath the global sticky header. Back, Main Menu, and class switching use the same navigation system as other class views; the document scroll owns the complete booth list in browser and installed modes.
- Booth configuration is persisted in the existing `state.booths` model. Adding creates a stable booth record. Removing is an explicit, confirmed soft removal: the booth stops accepting new assignments while its resource and assignment history records remain intact. Active assignments and unresolved issues must be ended/resolved first.
- The Booth Manager navigation, header clearance, full-list scrolling, and add/remove persistence repair was physically verified on the Samsung tablet on September 18, 2026 and is closed. Preserve its regression behavior.

## Checkpoint-derived Fast Roster state

- A student's instructor-selected operational need is stored on the project assignment. **Instructor Review — [checkpoint]** is temporary derived display state computed from authoritative checkpoint records; it is never written over the instructor-selected need.
- A checkpoint in **Ready for Review** takes temporary display priority because instructor action is required. **Verify** changes that checkpoint to verified and advances to the next active checkpoint; **Needs More Work** returns it to in-progress. Either transition immediately removes the derived review condition and reveals the still-preserved instructor-selected need.
- The September 18 Samsung test proved checkpoint mutation and persistence could succeed while Fast Roster remained visually stale: the student profile modal was refreshed, but the already-rendered roster underneath it was not. Any operation that changes roster-derived project context must refresh both the authoritative student view and the dependent roster view before the modal is dismissed.
- The Verify → Fast Roster refresh repair was physically verified on the Samsung tablet using Layout & Measurement → Verify → Fit-Up and is closed. Preserve that behavior.

## Student booth-assignment lifecycle

- Fast Roster and Booth Manager consume the same `boothAssignments` history. Assignment, reassignment, manual ending, period ending, occupancy, and reload restoration must never fork into separate booth state.
- Shared booths remain intentional. Each student retains an independent history record, and the instructor receives the established confirmation when adding another occupant.
- The September 18 Samsung assignment failure occurred during an after-period physical test. Assignment and save succeeded, but the immediate Fast Roster render ran period-end cleanup and closed the brand-new record because the selected class's scheduled end time had already passed.
- Scheduled cleanup now closes a same-day assignment at period end only when that assignment began on or before the cutoff. An assignment deliberately created after the cutoff remains visible for same-day navigation/reload testing and closes on the next day or through End Assignment. This preserves ordinary in-period automatic closure without instantly erasing an instructor action.
- Booth Manager shows current occupants directly from the authoritative assignment history. Temporary passes never alter booth assignment or roster position.

## Class Forecast v1

- Class Forecast answers **What should I be prepared for?** Fast Roster remains the live answer to **Where are they, what are they doing, and what do they need right now?** Forecast must not become a duplicate roster.
- Forecast is deterministic and read-only. It derives from current attendance, primary project/checkpoint, instructor-selected and checkpoint-derived needs, booth-assignment history, and Project Bank workflow definitions. It stores no forecast-specific student status and requires no routine instructor data entry.
- Class Pulse reports factual counts only: present, active project, current instructor-action needs, and occupied booths. Attendance and active work remain separate. Temporary passes do not alter attendance or booth position.
- Needs You Now uses the same operational/derived need authority as Fast Roster. Ready for Review appears as `Instructor Review — [checkpoint]`; existing actionable manual needs and Needs Next Project may appear; `Ready to Work` never appears in this queue.
- Up Next identifies only the next defined checkpoint, instructor check, completion requirement, or next-project requirement after the current recorded position. It never claims that a student will reach that step today.
- Shop Position groups current booth occupants with their primary project, current checkpoint/stage, and current need. Soft-removed booths are excluded. Fast Roster remains the detailed student list and all mutations continue through existing student/project/booth workflows.

## Class Forecast live-state refresh

- Physical Samsung testing confirmed the Class Forecast model and initial render were correct, then exposed stale HTML after Taylor Reed's Fit-Up checkpoint changed to Ready for Review while Forecast remained underneath the student modal.
- The checkpoint transition, persistence, Project Bank primary-project derivation, and Forecast calculation were correct. The failure was the dependent-view refresh boundary: `refreshProjectContextView` refreshed Fast Roster but not Class Forecast after a successful checkpoint transaction.
- Project/checkpoint actions now refresh the active dependent class view beneath the modal. Forecast then rebuilds from current section students and the shared `ArcProjectBank.primary(...)` operational derivation. No Forecast-specific need is stored.
- Ready for Review temporarily displays `Instructor Review — [checkpoint]` in both Fast Roster and Forecast while preserving the manual operational need. Verify or Needs More Work removes that derived condition, and both views reveal the preserved manual need from the updated authoritative project record.
- Up Next remains a separate deterministic next-workflow requirement. A current instructor action in Needs You Now does not turn Up Next into a prediction or timing claim.

## Simulation Foundation v1

- Live Classroom retains the established `weld_v013` state record. Presentation Mode and Test Scenarios 1–4 use explicit independent `arc_simulation_v1_state:*` persistence records; the active-session marker and bounded Live Safety Snapshot history are separate again.
- Simulation entry is transactional. ARC clones current live state and navigation, writes a safety snapshot, reads it back, verifies the existing FNV-1a integrity fingerprint, validates schema v7, and only then activates and loads the selected simulation. Any failure aborts entry without activating simulation state.
- The latest five Live Safety Snapshots are retained with timestamp, entry reason, scenario identity, integrity, navigation context, and state. They are recovery architecture only in v1; no casual restore control is exposed.
- Each scenario has stable identity, scenario version, and canonical seed version. Its mutable state persists across navigation, leaving, and PWA restart. Reset replaces only that scenario with its deterministic fictional canonical fixture and leaves Live Classroom, other simulations, and safety snapshots unchanged.
- A persistent text banner and large Leave Simulation control remain inside the measured sticky header. The banner does not rely on color and therefore participates in the existing Samsung header-offset contract.
- Presentation Mode contains 28 deterministic fictional students distributed across the six WT/AWT sections. Smaller Normal Shop Day, Busy Instructor, Projects & Materials, and Edge Cases fixtures exercise existing ARC workflows without adding Fast Forward, predictive behavior, Prep Ahead, or a new material-inventory model.
- Backup export now provides a visible completion message and generated filename after the browser download action is initiated. Backup import is blocked while a simulation is active to prevent crossing persistence boundaries.
- Schema remains v7. Simulation storage has its own version and does not add fictional metadata to Live Classroom student records.

## Material Inventory v1

- Fabrication material definitions and physical stock pieces are different records. A definition describes material/profile/storage and retention policy; every received stick, drop, sheet, or plate has a stable piece ID and independent dimensions/status.
- Linear stock uses inches as the authoritative persisted length. Identical pieces may be grouped for tablet display, but availability checks remain piece-level: four 24-inch pieces do not satisfy one 72-inch requirement even though both totals are 96 inches.
- A cut/use operation is a physical transformation. The selected source piece closes, used dimensions are appended to the ledger, and qualifying remnants receive new stable piece IDs. Below-threshold remnants become recorded scrap unless explicitly retained. Plate/sheet v1 records deterministic rectangular guillotine remnants without claiming nesting optimization.
- Ledger history snapshots the material plus source/result piece context. Supported purposes are Student Project, Skill Practice, Shop/School Project, Other Department, Waste/Scrap, and Adjustment; receipts remain an explicit transaction type. Nonstudent work never requires fake student or project records.
- Student/project context is a convenience entry point only. Assigning a project, advancing a checkpoint, changing a grade, or recording competency/workplace/behavior data never consumes material automatically. Future Project Bank material requirements remain planning metadata until an explicitly structured cut-list workflow exists.
- Current Stock, History/Usage, and Definitions are separate tablet views. Archived definitions stay available to historical snapshots; corrections require an audit reason and add a transaction instead of rewriting earlier history.
- `materialInventory` is an optional schema-v7 state field. Older live states/backups open with empty physical stock; no stock is inferred from legacy aggregate inventory. Whole-state backup/restore includes the field, while Simulation Foundation keeps each scenario fixture isolated in its existing state store.
- Test Scenario 3 is the deterministic material lab: 17 definitions cover healthy, low, and zero stock, grouped full sticks, the short-piece continuity trap, useful/scrap remnants, plate remnants, every transaction purpose, a fictional miscut, and nonstudent/practice use. Reset restores only the canonical fictional scenario.

## Material Inventory Samsung repair

- Physical Samsung testing proved the piece-level domain, continuous-length distinction, linear and plate transformations, remainder threshold/override, Student Project and Waste/Scrap attribution, read-only academic boundaries, persistence, offline behavior, Scenario 3 isolation/reset, exact timestamps, and exact-material aggregation. Those results are regression requirements, not areas for redesign.
- The confirmed defect was modal lifecycle, not transaction persistence. The Inventory child modal used generic z-index 40 beneath fixed header z-index 60, lacked a sticky in-modal escape header, was absent from navigation cleanup, and had no history entry for Android Back. The repair gives Inventory dialogs their own higher layer, safe-area-aware viewport, sticky title/Close, backdrop dismissal, one dismissible history state, and global-navigation cleanup.
- Linear teacher entry uses Feet plus Inches while storage remains deterministic inches. Plate/sheet entry retains precise rectangular dimensions. Internal physical-piece IDs remain authoritative but are no longer ordinary teacher-facing labels.
- Material family is authoritative definition metadata with deterministic read-time classification for older schema-v7 definitions. Current Stock and History use family → exact material → grouped usable physical dimensions. Group choice deterministically resolves to one stable underlying piece; no cut optimization or shortest-piece recommendation was introduced.
- New ledger transactions persist material snapshot, exact timestamp, purpose, student/class/project/checkpoint context when available, source dimensions before transformation, resulting physical stock, and disposition. Historical cards consume saved transaction context rather than recalculating new transactions from today's stock.
- Student Evidence & History includes a derived Materials view filtered from the authoritative Inventory ledger. It creates no copied student record and no grade, competency, Workplace, Behavior, need, or checkpoint consequence.
- The Samsung backup mismatch was a test-plan error plus a misleading export affordance: active Scenario 3 exported current scenario state in a `Welding_Classroom_Backup` wrapper even though Simulation Foundation correctly blocks Live import while active. No scenario import/export architecture was added. Active simulations now block Live export as well; Live Classroom backup round-trip is tested after leaving simulation with fictional Live material records.
- Schema remains v7. Future purchasing/readiness, cut optimization, Prep Ahead, Notifications, Special Delivery, Titanium shell work, Guided Presentation, and contextual Help remain explicitly deferred.

## Pre-Titanium UX stabilization

- Physical Samsung testing proved that global destination navigation and contextual modal closing were conflated. `navMark` previously dismissed only the Material child overlay, allowing student and Search overlays to remain above Main Menu or a newly selected class. Global navigation now clears all transient body modals plus the student profile before rendering a destination, while Close and Back still dismiss the top child and return to its student/page context.
- The Scenario 3 Material title/Close failure was a CSS cascade defect, not scroll position. The external `.inventory-modal` layer lost to the later equal-specificity inline `.modal` rule, placing it below the taller Simulation header. The higher-specificity Material selector now wins, fills the dynamic viewport with safe-area padding, keeps the title/Close fixed inside the dialog, and assigns scrolling only to the body.
- Booth Manager keeps its authoritative booth/resource/issue/assignment records and custom station names. Manage now uses one ARC-native Station form instead of a prompt chain; full equipment lifecycle and workstation/capability intelligence remain deferred.
- Open Shop ranking remains unchanged and derived from current competency ratings. Recommendations now open the exact competency detail without copying ratings or inventing advice. Closing the student profile returns to Open Shop.
- Student project assignments normally reference a Project Bank definition through `templateId`, but independent and historical assignments can legitimately lack a current definition. Project Info shows current Bank content when present and otherwise identifies the stored assignment as authoritative without creating a Bank record.
- Live Material Inventory receives a deterministic starter definition catalog only. Starter Angle, bars, tube, pipe, plate/sheet, channel, and expanded metal records begin with zero pieces and zero ledger rows. Simulation fixtures and physical stock remain unchanged.
- Teaching Tips v1 was seven fixed templates selected by broad keywords, causing repeated advice. The bounded cleanup adds distinct measurement, drawing, weld-feedback, transition, and career guidance. A comprehensive lesson-by-lesson authored support library is deferred.
- Pacing plans store forecast dates and actual instructional dates but do not store an authoritative class/date lesson assignment. Consequently ARC has no dependable Today's Lesson route to expose yet; adding that model is docked rather than inferred from a Sunday test. Scenario-owned school date/time is also docked.
- Build `pre-titanium-ux-stabilization-1`; schema remains v7. This repair must not be described as deployed or physically resolved until the focused Samsung pass succeeds.

## Titanium Foundation

- The verified starting point is commit `0b3ed5e5c6d18b2fe13a26309600cf4377e8d0db`, tree `651e3902272c97f0d5efadbaa8d360962b02b179`, build `pre-titanium-ux-stabilization-1`, schema v7. Rollback ref `rollback/titanium-foundation` targets that exact commit.
- ARC Core now owns a persistent collapsible left sidebar/icon rail, compact contextual header, selected-route state, responsive tablet behavior, and the factual dashboard shell. Existing domain render/action functions remain authoritative and every former top-header capability has a mapped owner documented in `docs/TITANIUM_FOUNDATION_ROUTE_AUDIT.md`.
- Welding/Titanium identity is supplied by the active class/program context through a separate `ArcTitaniumShell` configuration boundary. The shell preserves Advanced Welding Classroom, Skills Today. Stronger Tomorrow., and More Than Welding. A Brighter Future. It does not bind pathway identity to an instructor account or implement other pathways.
- The dashboard uses current authoritative Class Forecast inputs for Present, Active Projects, Need You Now, and Active Booths. Today’s Focus and Help remain visibly disabled future docking points; no lesson, presentation guidance, Help content, ETA, purchasing/readiness claim, or recommendation was fabricated.
- Normal transient surfaces remain below the persistent sidebar, while the existing deliberately blocking simulation confirmation remains a higher safety layer. Student profiles, Search, Notifications, Quick Add, and Material dialogs register dismissible browser-history state so Android Back closes the active surface before exit. Existing contextual Close/Back and global `clearTransientUi` behavior are preserved.
- Build `titanium-foundation-1`; schema remains v7. This milestone is packaged only and must not be described as published, deployed, or physically verified until the focused Samsung pass succeeds.

## Titanium Foundation Repair 1

- Samsung physically verified the collapsed/expanded sidebar, ARC/Welding identity, pathway statement, direct Inventory/Booth access, global cleanup from Student, Inventory grouping, and persistent Scenario banner. Those passes remain locked regression requirements.
- The deployed dashboard called the selected `activeSectionId` Current Class even when `currentScheduleContext()` correctly returned No School. Current Class now exists only when the schedule/calendar/time context identifies a class period; the instructor-selected working class is labeled Selected Class.
- Scenario entry/reset previously forced the first section and rendered Fast Roster. Every current scenario now explicitly starts at Dashboard/Home with no selected class. Live and each scenario also use distinct session-navigation keys; the Simulation manager continues to restore the exact captured Live state and selection.
- Fixed transient surfaces originated at viewport left while the persistent rail occupied the same space. Normal Student, Search, Notifications, Quick Add, Material, Station, and other modal surfaces now begin at the Titanium workspace boundary. The safety-critical Scenario-entry confirmation is deliberately full-viewport above the rail.
- The collapsed rail remains reserved at narrow widths. The expanded portrait drawer overlays temporarily, closes on navigation, and participates in Android Back history.
- Dashboard is no longer a second menu-of-menus. Sidebar/class-selector duplicates were removed; schedule/calendar, factual selected-class context, permanent Student Profiles, Student Work Library, and the proposed Challenge remain available.
- Build `titanium-foundation-repair-1`; schema remains v7. Do not describe the repair as published, deployed, or physically verified until the focused Samsung sequence passes.

## Titanium Visual System 1

- The exact deployed and physically verified starting point is commit `ff73f5149e1e475e19f56de493feaef8a68f52f7`, tree `947902805a031dab6a785e7af8e3a76ea8e517e8`, build `titanium-foundation-repair-1`, schema v7. Rollback ref `rollback/titanium-visual-system` targets that commit.
- A late-loaded, pathway-scoped Titanium stylesheet now supplies semantic canvas, surface, border, type, interaction, focus, and functional-status tokens. Shared cards, controls, tabs, forms, tables, dialogs, statuses, shell identity, and responsive states consume that system without changing ARC domain authority or Foundation geometry.
- Representative Dashboard, Fast Roster/student surfaces, Class Forecast cards, Projects/checkpoints, Project Bank, Material Inventory, Booth Manager, Teaching Tips, Settings/update controls, and Simulation state inherit one charcoal/silver/electric-blue visual language. Success, warning, danger, and information retain separate functional meaning.
- The Dashboard receives a visual identity hero while continuing to distinguish schedule-derived Current Class from instructor-selected Selected Class. It uses the existing class-context and Forecast authorities; no dashboard data or calculation was added.
- The persistent fictional-data/privacy notice is now a compact expandable pilot notice. All prior facts remain present. Simulation remains explicitly labeled in the sticky header and also sets a presentation-only body state; live and scenario persistence remain isolated.
- The visual layer loads after the legacy inline presentation and is included in the offline shell and Pages asset-verification list. Focus visibility, tablet touch targets, narrow portrait layout, increased contrast, and reduced-motion preferences remain explicit contracts.
- No authorized local hero image was available in the handoff/workspace. The milestone uses CSS-only industrial depth and introduces no remote or substitute imagery. Future authorized pathway photography remains an asset task.
- Build `titanium-visual-system-1`; schema remains v7. This milestone is packaged only and must not be described as published, deployed, or physically verified until its focused Samsung pass succeeds.

## Titanium Visual Refinement 1

- The exact deployed and physically verified starting point is commit `0c258c42d89087fac6f5d1d5118f1eaa503aecc5`, tree `9058307c2407dded7bc4366ee02b2bc76c7b4b99`, build `titanium-visual-system-1`, schema v7. Rollback ref `rollback/titanium-visual-refinement-1` targets that commit.
- Exact supplied ARC source artwork is retained with checksums; optimized local hero, industrial background, full logo, and compact approved-art crop are cached offline. No brand letters were redrawn, interlocked, or allowed to share edges.
- Dashboard now uses the approved visual composition with authoritative schedule, class, and Forecast facts. Today's Focus remains explicitly unconfigured. Challenge Hub and the established unique work destinations remain available.
- One recognizable SVG icon family replaces the ambiguous emoji rail presentation. Open Shop priorities, Project/checkpoint surfaces, and modal headers receive bounded Titanium treatments without changing their domain meaning.
- Add Station and station-issue resolution now use ARC-native dialogs. Remaining legacy prompts, exact production app-icon artwork, other pathway themes, and future systems are docked.
- Build `titanium-visual-refinement-1`; schema remains v7. This milestone is local, tested, and packaged only—not published, deployed, or physically verified.

## Titanium Visual Refinement 1 Repair 1

- The exact deployed starting point is commit `c11e5373a6ff9e9cd6290b0a280a52900439bb1d`, tree `522932164bf08aeb511d23035a68a8a05a5693df`, build `titanium-visual-refinement-1`, schema v7. Rollback ref `rollback/titanium-visual-refinement-1-repair-1` targets that commit.
- Samsung portrait testing proved a Dashboard-local width inconsistency. A single explicit Dashboard boundary now owns Hero, Class Pulse, Current/Selected Class, Today’s Focus/Upcoming Week, Quick Access, and footer, while lower-grid children no longer impose a separate min-content width. Global workspace and Material geometry are unchanged.
- The collapsed rail now uses an ARC-only crop from the immutable approved primary logo. The crop keeps the exact A/R/C and welding flare/streak pixels and excludes all subtitle, signature, and mastery copy.
- General, maskable, Apple touch, and favicon assets are deterministic composites of that same ARC-only derivative and the approved industrial source. Manifest, offline cache, Pages verification, and regression hashes cover every production output.
- Build `titanium-visual-refinement-1-repair-1`; schema remains v7. Do not describe the Samsung findings as physically resolved until this build is published separately and passes the focused tablet retest.

## Classes Dropdown Overlay Repair

- The exact deployed starting point is publication commit `e4a6a309c9d0fcc495fd7781aca73bb5b12e49b1`, tree `3f797515dae2236612e247b5b29db4ba75589820`, build `titanium-visual-refinement-1-repair-1`, schema v7. Rollback ref `rollback/classes-dropdown-overlay-repair` targets that exact publication commit.
- Samsung portrait testing proved that opening the shared Classes menu changed the underlying workspace geometry on Dashboard, Fast Roster, Material Inventory, and Lesson Plan Bank. Closed-state destination geometry remained correct.
- The menu was already absolutely positioned, but its deployed rule anchored its left edge at a right-side header control while sizing it from the full viewport (`100vw`). In the rail-reserved Titanium workspace, the resulting right edge exceeded the document. The exact overflow varied with the destination-specific breadcrumb and selected-class button width, producing the observed variable page shrink/black band.
- The authoritative shared menu now remains absolutely overlaid, anchors its right edge within the header control, and bounds its width to the viewport minus the current Titanium rail and header breathing room. At the narrow portrait breakpoint it occupies the existing full-width Classes row. Opening and closing it changes only `hidden` and `aria-expanded`; no body overflow lock, shell class, workspace width, destination layout, scroll position, classroom record, or selected-class state is mutated.
- Class selection retains the established `navSwitchClass` authority and Simulation continues to isolate and restore navigation/class context. Frozen ARC branding, launcher icons, Dashboard art, rail geometry, and schema remain unchanged.
- Build `classes-dropdown-overlay-repair-1`; schema remains v7. Do not describe the defect as physically resolved until the separately authorized publication passes the focused Samsung portrait, landscape, rail, rotation, scroll, Simulation, and offline sequence.

## Stage 14 P10D-R1B F1 validation follow-up

- Starting authority: commit `eeddaf071e9feff51ea8e492e533c394f34a2344`, tree `9fb90ab1c5764bb5dcd72cc753add2c95ce299b1`; rollback `rollback/pre-stage-14-parity-program-p10d-r1b-f1` preserves that exact checkpoint.
- An isolated reproduction proved the reviewed failure: the prior generator accepted a nonexistent decision ID and overwrote a sentinel output. The repair independently pins accepted bytes, recomputes producer-specific self-digests, validates preserved source bytes, and validates every queue/mapping/decision/manifest relationship before output side effects.
- The nine original R1B assertions remain, with isolated invalid-input and direct relationship-validation coverage added. Valid generation remains byte deterministic and preserves the accepted 462,783-byte artifact at SHA-256 `6bf00f4973aa6e7be8860d810190df22c9ddf40787998fb0198e2216e0e3e22a` and internal hash `ce7ba279ba4e6958144c58ae76b756c0ead535b3a52f96da93eb06aaca3fbd76`.
- Fresh local verification passed both changed-file syntax checks, 20/20 focused R1B tests, 47/47 static checks, all 91 JavaScript regression files, and pre/post SHA-256 identity for 15 protected files.
- This is tooling maintenance only. R1B decisions, preserved source authority, application behavior, parity states, Schema 7 / `V7_ONLY`, local isolated Schema 8 / IndexedDB 13 / 73 stores, and the protected Samsung Schema 8 / IndexedDB 10 / 53-store foundation remain unchanged. No import/dry run, remote action, publication, deployment, database, or Samsung work occurred.
- Independent review of the repaired checkpoint remains pending. After that review, the next possible boundary remains separately authorized reviewed import/dry-run planning; it is not authorized by this checkpoint.

## 2026-10-01 — P10D-P1 proposed instructional payload compiler

- Began from F1-complete commit `33be2d4073a7f5122cd4bccc5fc977f42c352b8b`, tree `a10be27d8cd55ec0dac47a7558a35e4053cf0580`, with rollback `rollback/pre-stage-14-parity-program-p10d-p1`.
- Added a pure, deterministic external-file compiler and focused regression suite. It validates the nine frozen authorities and preserved source files before producing five review artifacts outside the repository.
- The accepted baseline accounts for 859 proposed content roles, all blocked; 408 historical dispositions; 259 settled nonblocking absent relationships; 51 approved WT Lesson-to-Competency links; and eight unresolved representation/package areas.
- Outputs remain `PROPOSED_UNIMPORTED` / `NOT_READY_FOR_REHEARSAL`. Target identities and target payload hashes remain unresolved; no database is inspected and no readback or persistence occurs.
- Normal classroom authority remains Schema 7 / `V7_ONLY`. No application, UI, build/cache, schema, database, parity, production, publication, deployment, remote, or Samsung authority changes occurred.
- Next bounded recommendation: freeze the owning representation, identity/version rebinding, provenance, and recovery contracts, with any remaining instructional availability decision reserved to the instructor, before authorizing a persisted rehearsal.

## 2026-10-01 — P10D-P1 Repair 1 proposal fidelity and test isolation

- Began from P10D-P1 commit `947d1e29f592d7c6544c0bc4a4cbd5255b8dab20`, tree `e6a427ee09739a6af8e4b073e4044bc1215ad3b3`, with rollback `rollback/pre-stage-14-parity-program-p10d-p1-repair-1`.
- Corrected all 57 reviewed Lesson Version overlay joins while preserving Lesson Version review identity and full historical source records. All 149 accepted preservation decisions now bind exactly once.
- Preserved the two complete official source resolutions, all 29 official parent/Webb records, both complete Essential-provenance records, and exact evidence associations for all ten instructor-selected Essentials.
- Correctly named `ArcV8Evidence` as the owner of all 120 Competency roles and validated explicit owner/method/store routes for all 15 included role types.
- Replaced predictable temp paths before running the focused suite. All refusal and invalid-input cleanup is confined to exclusively allocated temporary roots, with sentinel, neighbor, and absent-output behavior verified.
- The compiler revision is `p10d-p1-proposal-fidelity-repair-1`. Counts and boundaries remain 859 blocked roles, 408 historical dispositions, 259 absent optional relationships, 51 approved WT links, and eight unresolved areas.
- Outputs remain `PROPOSED_UNIMPORTED` / `NOT_READY_FOR_REHEARSAL`. Schema 7 / `V7_ONLY` remains controlling; no runtime, database, parity, production, remote, publication, deployment, or Samsung authority changed. Independent review remains pending and no subsequent stage is authorized.

## 2026-10-01 — Daily Teaching First Slice 1 isolated review

- Began from commit `488b5d7f8d00bd25168e05b69abbe8da2d3eebb5`, tree `64b2922893161a2eae4f1f33d23b675cb141a420`, with rollback `rollback/pre-daily-teaching-first-slice-1`.
- Added optional validated teaching guidance to immutable Lesson Versions and append-first explicit Section focus windows to P10B pacing authority.
- Added a reusable read-only projection/UI and dedicated engineering review coordinator hard-bound to `arc_classroom_v8_daily_teaching_verification`. Page load does not open or seed data; fictional setup is explicit and no Students are created.
- Normal `index.html`, Titanium shell, existing adapters, schema/storage, build/cache/service worker and Today's Focus remain unchanged. Normal classroom authority remains Schema 7 / `V7_ONLY`.
- Draft lap-joint excerpts remain isolated review content with exact checksum/locators. They are not production instructional acceptance or an import.
- Browser/Samsung acceptance, publication, normal-shell activation, real content, Student-path connections and following stages remain separately authorized work.

## 2026-10-01 — Daily Teaching First Slice 1 Repair 1

- Continued from local First Slice 1 commit `5bb36b268274ceeaf2e068b3d05c93a9296c073e` on a bounded repair branch with rollback `rollback/pre-daily-teaching-first-slice-1-repair-1`.
- Corrected the actual opened-connection/storage-factory composition, explicit fictional Academic Administration setup, all-store fixture recognition, and durable preparation status.
- Made Teaching Focus correction/clear append-first and protected its event family from generic mutation routes; strengthened scope, date, chain, and exact Lesson/pacing validation.
- Completed the approved teaching interactions and stored guide visibility, including preparation, questions, coaching, nested help, reliable Back, context state, and asynchronous cancellation.
- Replaced excerpt-only provenance with complete source-text SHA-256/byte proof, exact field bindings, strict malformed-data refusal, and a deterministic fixture-content hash.
- Normal ARC remains Schema 7 / `V7_ONLY`; the local v8 declarations remain Schema 8 / IndexedDB 13 / 73 stores. No production/classroom database, global storage, navigation, build/cache/service worker, deployment, or Samsung authority changed.

## 2026-10-02 — P10D-R2 resolved instructional representation

- Began from Daily Teaching Repair 1 commit `48b1f6f49145ae95f85fb020004697a2012dbcd3`, tree `b0890b7fe114fedacc254ec2d0e928809af6f28e`, with rollback `rollback/pre-p10d-r2-resolved-representation-1`.
- Froze one pure representation context for all 859 accepted P10D roles and separated one-time opaque UUID allocation from deterministic compilation using exact frozen identity-map bytes.
- Preserved 408 dispositions, 149 overlays, 259 absent optional relationships, 80 Curriculum→Standard links, 228 Lesson→Standard links, 51 WT Lesson→Competency links, and zero invented AWT Lesson→Competency links.
- Carried the instructor decision that all 124 preserved legacy Lessons begin `reference_only`, without instructional acceptance, ordinary new-scheduling eligibility, Auto Build eligibility, or fabricated `teachingGuide` content.
- Resolved representation and provenance for 29 Standards, 10 Essentials, 60 Competencies, 56 Curriculum items, and 124 Lesson Versions while preserving exact source meaning and reversible source shapes.
- Outputs remain `PROPOSED_UNPERSISTED` / `READY_FOR_OWNER_IMPLEMENTATION`; persisted rehearsal remains blocked by owner-service, durable package storage, command/read gates, atomic recovery, and separate authorization.
- Normal ARC remains Schema 7 / `V7_ONLY`. No database, import, runtime/UI, build/cache/service worker, schema/store, parity, production, remote, publication, deployment, or Samsung authority changed.

## 2026-10-02 — P10D-R2 Repair 1

- Continued from R2 commit `efbc735dca4c8dd33609d683d1d40ef7b841b411`, tree `fe8bdd5a080ab98e2da39cdab500cad0c79489b9`, with rollback `rollback/pre-p10d-r2-resolved-representation-repair-1`.
- Preserved the exact accepted 627,717-byte identity map at SHA-256 `7ba2956022875c03cc1bea1ee9ffa205fa78c204bfdc967c06c66fc5b1c3b750`; no UUID was reallocated or replaced.
- Closed R2-01 by making every one of 859 target primary-key fields equal its frozen UUID.
- Closed R2-02 with allocation-independent semantic content hashes that retain logical relationship meaning and change on controlled semantic mutation.
- Closed R2-03 by placing the exact accepted official Course profile on the two Standard Catalog Versions and keeping wording/parent/Webb evidence on 29 Standard Versions.
- Closed R2-04 with machine-readable owner-ready field/translation contracts for all 15 role types, complete Competency fields, ordinary Curriculum/Lesson arrays, reversible exact source shapes, explicit Essential history/evidence, and exact retained-link provenance.
- Closed R2-05 with explicit machine-readable package completion and conflict-refusal criteria. No package store or database behavior was added.
- All prior R2 counts and decisions remain exact: 859 roles, 408 dispositions, 149 overlays, 259 optional absences, 359 retained links, 51 WT Lesson→Competency links, zero AWT links, and 124 `reference_only` legacy Lessons.
- Outputs remain `PROPOSED_UNPERSISTED` / `READY_FOR_OWNER_IMPLEMENTATION`; normal ARC remains Schema 7 / `V7_ONLY`. No database, import/rehearsal, owner service, runtime/UI, schema/store, build/cache, production, remote, publication, deployment, or Samsung action occurred.

## 2026-10-02 — P10D-O1 owner and durable package foundation

- Began from accepted P10D-R2 Repair 1 commit `7b53660cb9b1aa84f734b9499ed2102a9c6e4087`, tree `e8bdf94611c201a994055e0496ef0c097f150e9c`, with rollback `rollback/pre-p10d-o1-owner-package-foundation-1`.
- Preserved logical Schema 8 and advanced only local isolated IndexedDB authority from 13 to 14 and 73 to 74 stores. Ordered migration `indexeddb-13-to-14` adds only append-first `instructional_content_packages` authority.
- Added derived package lifecycle, strict completion, write, ordinary-read, and explicit audit/reference gates. Curriculum/Standards/Essentials, Competency, and preserved Lesson owners now accept exact package-bound R2 target representations while retaining ordinary authoring compatibility.
- Preserved the exact 859-UUID identity map, all accepted R2 relationship decisions, and the 124-Lesson `reference_only` boundary. No real R2 role was persisted and no teaching guidance was fabricated.
- Extended synthetic migration, integrity, backup, readback, restore, compatibility, owner, and package verification for 74 stores. Historical protected 10/53, 11/54, 12/67, and 13/73 production manifests remain recognized without production access or upgrade.
- The resolved R2 package remains `PROPOSED_UNPERSISTED`. Normal ARC remains Schema 7 / `V7_ONLY`; no UI, build/cache, service worker, production, publication, deployment, Samsung, real Student, or authority-transfer action occurred.
- After independent review, the next separately authorized boundary is one exact frozen-package rehearsal in a new isolated nonproduction database with recovery, phase readback, failure/retry, completion-gate, and backup/restore proof.

## 2026-10-02 — P10D-PR1 isolated persisted rehearsal and Essential history repair

- Continued from the accepted O1 commit on `codex/p10d-pr1-isolated-persisted-rehearsal-1` with rollback `rollback/pre-p10d-pr1-isolated-persisted-rehearsal-1`.
- Preserved the first failed Edge rehearsal as historical lineage. That run proved the accepted frozen Essential records omit unknown `recordedAt`/`recordedBy` fields and exposed an unsafe reader assumption.
- Repaired only Essential-history read ordering. Dated records sort first; undated records use deterministic Standard, chain-revision, and designation-identity fallbacks. No historical date or operator is fabricated.
- Completed a fresh installed-Edge rehearsal in only `arc_classroom_v8_p10d_persisted_rehearsal_1`: authorized injected stop, close/reopen persistence, 62-row idempotent resume, all eight phases, controlled conflict refusal, exact 859/359/259 readback, completion/read gates, rehearsal-only availability, and 74-store backup/reset/restore/reopen parity.
- All ten Essential projections retained null historical selection facts and absent import-history facts. All 124 legacy Lessons remained `reference_only`, instructionally unaccepted, ordinary-scheduling and Auto Build ineligible, and without fabricated `teachingGuide`.
- The dedicated database, Edge profile, loopback server, and temporary harness were removed after evidence capture. Normal ARC remains Schema 7 / `V7_ONLY`; production, Samsung, publication, deployment, and authority transfer remain untouched and unauthorized.
- Independent review is pending. Production structural upgrade/import requires separate authorization.

## 2026-10-03 — P10D-PU1 protected production structural-upgrade rehearsal

- Began from accepted PR1 commit `d20b472eff0ed282e1e0f81c1e395accad3ba498`, tree `67e3611c90b637bc2b99af083aa07a82a9238670`, with rollback `rollback/pre-p10d-pu1-protected-production-upgrade-rehearsal-1`.
- Reconstructed the exact published protected Schema 8 / IDB 10 / 53-store empty production foundation from commit `52b7d1b3ed920c0e889e211e41ea34b6e0395bbd` in a new task-owned Edge profile, then verified its backup and destructive restore before migration.
- Completed the existing ordered 10→11→12→13→14 path to exactly 74 stores. All 21 added stores remained empty; historical domain records and production initialization, zero-import reconciliation, and protection manifests were preserved.
- Verified healthy integrity, `V7_ONLY`, no classroom transfer, no real-Student authorization, protected-reset refusal, current 74-store backup, destructive restore, reopen, and per-store count/checksum parity.
- Imported no instructional content and created no package event. The task database, Edge profile, loopback server, and temporary execution machinery were removed after evidence capture. Physical Samsung production remained untouched.
- PU1 is isolated engineering evidence only. Publication, Samsung pre-upgrade recovery and structural upgrade, instructional import, normal v8 activation, and authority transfer require separate authorization after independent review.

## 2026-10-03 — P10D-PU2 protected Samsung upgrade bridge

- Began from accepted PU1 commit `93120846c0c90f5547385df80787b075f3066a95`, tree `1a47efcecda611ba5e7f29bcb1adc7a67b8bb78c`, with local rollback `rollback/pre-p10d-pu2-samsung-upgrade-bridge-publication-1` and publication rollback `rollback/pre-p10d-pu2-main-publication`.
- Extended only the existing Stage-2 engineering surface with an inert-on-load, exact-production physical bridge. It captures and verifies the historical backup before current storage opens, revalidates a downloaded backup after reload, requires exact operator/publication/tree/rollback/confirmation inputs, delegates 10→14 exclusively to PU1, and prepares a verified post-upgrade backup.
- Real installed-Edge rehearsal passed against the exact historical published 10/53 protected foundation. Exact 14/74 authority, four ordered migrations, 21 empty new stores, healthy integrity, protected manifests, protected-reset refusal, no instructional content, and `V7_ONLY` were verified.
- The pre-publication gate exposed five obsolete tests that pinned current runtime/cache bytes to historical P10D/source commits. All five now retain their actual historical reconciliation/source/parity pins while protecting current runtime through exact before/after bytes or direct Schema-7 / `V7_ONLY` / unwired assertions. The PU2 bridge/runtime bytes remained unchanged through both bounded guardrail repairs.
- The five repaired historical suites passed `9/9`, `8/8`, `20/20`, `7/7`, and `7/7`; the complete JavaScript gate passed `101/101` and static regression passed `47/47` before publication.
- Normal ARC, `index.html`, `app-build.js`, storage, migrations, backup/recovery, production initialization, instructional owners/package/coordinator, and physical Samsung state remain unchanged.
- The published engineering bridge does not authorize Samsung access. The next separately authorized physical checkpoint begins with read-only inspection and pre-upgrade recovery capture only; physical mutation requires a later explicit one-time authorization.

## 2026-10-03 — P10D-PI1 guarded production instructional-import bridge

- Began from accepted and published PU2 commit `44de8ee339ded9bbe820a684c7fc1204eb3ab3fb`, tree `3766a9f4d50a4771b3dcab026b495686596bd553`, with local rollback `rollback/pre-p10d-pi1-production-instructional-import-bridge-1` and publication rollback `rollback/pre-p10d-pi1-main-publication`.
- Extended only the existing Stage-2 engineering surface with an inert, exact-production instructional-import bridge and a separately explicit production coordinator factory. Normal `index.html` remains unwired.
- Preserved the exact frozen 859-UUID identity map and resolved payload bytes. The bridge requires exact protected 14/74 production, a fresh verified backup, URL-bound publication authority, and exact destructive confirmation.
- Completed a real installed-Edge production-shaped rehearsal from the supplied Samsung PU3 post-upgrade backup. The exact 859 roles, 359 retained links, 259 intentional absences, 51 WT links, zero AWT competency links, and 124 reference-only Lessons survived complete import, close/reopen, destructive backup restore, and exact per-store parity.
- The package remained `verified_complete` and unavailable; ordinary owner reads remained blocked. Only canonical WT/AWT Courses were created. No Student or other classroom transaction was created, no teaching guide was fabricated, and `V7_ONLY` was preserved.
- Physical Samsung production remained untouched. PI1 does not authorize Samsung instructional import, package availability, normal v8 activation, real Student data, or classroom authority transfer.
