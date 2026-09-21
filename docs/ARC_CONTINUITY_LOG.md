# ARC Continuity Log

This log preserves settled product reasoning that should survive individual engineering threads. The Master Plan remains the product north star.

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
