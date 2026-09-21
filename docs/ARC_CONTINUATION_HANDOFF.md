# ARC Continuation Handoff

## Repository state

- Branch: `samsung-stabilization` in the Engineering workspace; publication targets remain the established development branch and then `main`.
- Pre-Project-Bank rollback checkpoint: `2eead96e94167b15d20839e7e1127c36c589771a`
- Current HEAD: the commit containing this handoff (`git rev-parse HEAD` is authoritative)

## Completed milestones

- Project checkpoint engine, presenter/cards, transactional persistence, history, undo, and autosave integration.
- Titanium visual foundation, Teaching Tips v1, Inventory v1, deployment/readiness hardening.
- Samsung tablet stabilization: overscroll protection, navigation restoration, direct attendance controls, sticky profile navigation, persistent competency/workplace feedback, and stable pass roster behavior.
- Booth Manager v1: booth/resource setup, assignment history, shared booths, period closure, issue warnings/override, and Fast Roster booth visibility.
- Project Bank v1 foundation: reusable definitions, independent student assignments, configurable stages/checkpoints, instructor-controlled needs, primary project context, clearance review/override, starter WT Level 1–2 content, and Fast Roster project/need visibility.
- Samsung manual update controls: Settings shows the running build and online/update state, performs an explicit service-worker update request, and applies only a verified waiting shell through controlled activation/reload without clearing classroom data.
- Pages deployment diagnosis: the public site remained on `main` commit `1b15374b32d0a189a18888af18a75fc5950e7377` while development advanced separately. The branch-based Pages source remains `main`/root; release now requires an explicit fast-forward promotion plus public-asset verification.
- Booth Manager Samsung repair: Booth Manager is a normal navigable class view rather than a viewport-blocking modal, its full list scrolls below the global header, and instructors can add or safely soft-remove booths while preserving resource/assignment history.
- Booth Manager repair physically verified on the Samsung tablet and closed.
- Checkpoint/Fast Roster refresh repair: Ready for Review derives a temporary Instructor Review need; Verify and Needs More Work persist their authoritative checkpoint transitions, refresh the underlying Fast Roster immediately, and preserve the instructor-selected operational need.
- Checkpoint/Fast Roster refresh physically verified on Samsung using Layout & Measurement → Verify → Fit-Up and closed.
- Student booth-assignment lifecycle repair: assignment, move, End Assignment, occupancy, persistence, and automatic closure use one authoritative history; after-period assignments are no longer erased by the immediate roster refresh; Booth Manager displays current occupants from that same state.
- Class Forecast v1: a deterministic, read-only class preparation view organizes current attendance, active-project, operational/derived need, booth, Project Bank, and checkpoint records into Class Pulse, Needs You Now, Up Next, and Shop Position without adding a second source of truth or claiming when work will occur.
- Class Forecast live-state repair: checkpoint actions opened from Forecast refresh the Forecast page beneath the student modal after the authoritative transaction, preventing pre-action HTML from remaining visible while preserving shared Project Bank need derivation.
- ARC Simulation Foundation v1: Live Classroom remains in its established persistence record while Presentation Mode and four deterministic test scenarios use independent, versioned stores. Verified Live Safety Snapshots gate entry, scenario changes persist independently, restart resumes the active simulation, and reset restores only the selected canonical fictional fixture.
- Backup export confirmation now visibly reports a completed export action and generated filename.
- Material Inventory v1: authoritative fabrication stock separates reusable material definitions from stable physical piece records. Linear availability is evaluated piece-by-piece, plate/sheet cuts preserve deterministic rectangular remnants, and receipts/use/waste/adjustments append audit rows. Project assignment never consumes stock automatically.
- Material Inventory Samsung repair: the nested project-context modal now owns a complete navigation/backdrop/Android-Back lifecycle above fixed chrome; linear teacher entry uses feet plus inches; Current Stock and History organize by authoritative material family; source selection uses exact material and grouped usable dimensions without displaying internal piece IDs; new ledger rows preserve transaction-time before/after, disposition, class, project, and checkpoint context; Student History derives Materials from that same ledger.
- Pre-Titanium UX Stabilization: true global navigation clears the complete transient modal stack; the Material dialog's higher layer now wins the CSS cascade in Live and Simulation and owns an independently scrolling body; Booth Manager uses an ARC-native Manage Station form; Open Shop recommendations lead to exact competency detail; student assignments expose Project Bank information when it exists and clearly fall back to stored assignment authority when it does not; Live Material Inventory receives common zero-stock definition starters; Teaching Tips use a broader lesson-connected shop catalog.
- Titanium Foundation: ARC now has a persistent, collapsible tablet sidebar/icon rail, compact contextual header, selected-route state, class switching, and a factual class dashboard. ARC Core navigation is separate from the class/program-derived Welding/Titanium identity. All former header capabilities retain their established function owners, while normal global navigation remains reachable above transient work surfaces.
- Titanium Foundation Repair 1: Current Class is now schedule/calendar/time-derived and distinct from Selected Class; scenarios enter/reset at Dashboard/Home without a selected class; Live and scenario session-navigation contexts are isolated; normal transients begin at the rail-reserved workspace boundary; portrait drawer and Android Back behavior are coherent; redundant legacy Main Menu cards are retired while unique resources remain.
- Titanium Visual System 1: pathway-scoped semantic tokens and shared components replace the remaining prototype-light presentation with a coherent charcoal/silver/electric-blue Welding/Titanium system across the shell and representative ARC workflows. Functional state colors, tablet geometry, class context, Simulation isolation, domain calculations, and schema remain unchanged.
- Titanium Visual Refinement 1: exact approved ARC artwork now anchors Dashboard and Welding/Titanium identity; authoritative schedule and Forecast facts form the first-view hierarchy; a coherent icon family replaces emoji; Open Shop priorities, Projects, and modal headers receive bounded repairs; Add Station and issue resolution use native ARC dialogs.
- Titanium Visual Refinement 1 Repair 1: one explicit Dashboard boundary removes the Samsung portrait width stepping; the rail uses the approved ARC-only source crop; production general, maskable, Apple touch, and favicon artwork uses the same immutable lettermark over approved industrial atmosphere.
- Classes Dropdown Overlay Repair: the global Classes menu remains an overlay and is now right-anchored and bounded to the rail-reduced workspace. Opening it no longer extends document width or changes destination geometry; class selection and all classroom authority remain unchanged.

## Active milestone

Hold build `classes-dropdown-overlay-repair-1` for the focused Samsung overlay/geometry retest. The deployed Titanium Visual Refinement 1 Repair 1 publication commit remains the rollback baseline. This repair is not published, deployed, or physically verified.

## Immediate settled decisions

- Fast Roster answers: Where are they? What are they doing? What do they need?
- Students can work at different stages and hold multiple assignments.
- Stages, current needs, checkpoints, difficulty, competency evidence, growth, and grades remain separate.
- Instructor ARC remains complete without ARC Student. Instructor override remains final.
- Existing repository standards data remains authoritative until source-photo reconciliation.
- Repository HEAD, regression success, and public Pages state must be verified independently. A green regression run does not prove deployment.
- Booth removal is confirmed and non-destructive: active assignments and unresolved issues block removal, while equipment and assignment history remain stored.
- Checkpoint records are authoritative workflow state. Fast Roster derives temporary review needs at render time; it does not persist a second need value. Derived instructor action takes temporary display priority and the instructor-selected operational need remains intact underneath it.
- Booth assignment history is authoritative for both Fast Roster and Booth Manager. Shared occupancy is allowed; passes do not alter booths; soft-removed booths are not assignable.
- Class Forecast is preparation context, while Fast Roster remains the live shop-floor list. Forecast derives every value at render time; `Ready to Work` is excluded from Needs You Now, and Up Next names only the next defined workflow requirement—not a prediction that it will occur today.
- A successful project/checkpoint transaction must refresh whichever dependent class view is underneath the student modal. Fast Roster and Class Forecast both recalculate from the updated student/project record; neither persists a copied display need.
- Normal ARC is Live Classroom. Simulations are separate datasets, never a temporary replacement of the live persistence record. Entering requires a successfully written, read-back, integrity-verified Live Safety Snapshot. Leaving persists the scenario and restores the captured live state/navigation; reset never changes Live Classroom, other simulations, or safety snapshots.
- Material stock is authoritative at the physical-piece level. Total length is a summary only and never proves that a continuous required length exists. Definitions, current stock, and append-oriented history remain separate; corrections add audit rows instead of rewriting history.
- Student Project material use may carry student/project context, but assignment and checkpoint operations never deduct inventory. Skill Practice, Shop/School Project, Other Department, Waste/Scrap, and Adjustment remain valid without fake student records.
- Recovery backups are Live Classroom artifacts. Simulation states remain isolated, persistent, and resettable through Simulation Foundation; active simulations may neither export nor import a file labeled as a Live Classroom backup. Material Inventory backup round-trip testing therefore uses fictional records in Live Classroom after leaving Scenario 3.

## Intentionally deferred

ARC Student, automatic level promotion, Growth Milestones UI, completed Advanced Welding Competition rules, automated Planbook/SLO generation, intelligent recommendations, automatic material ordering/purchasing readiness, other pathway themes, OneDrive/auth/encryption, and full Project Bank population.

The code contains pacing forecasts and actual instructional dates but no authoritative class/date lesson-assignment record or active-class Today's Lesson surface. Adding that relationship is lesson-scheduling architecture, not a missing one-line route, so it is docked for a dedicated milestone. Scenario-owned school date/time also remains docked for Titanium/Presentation; simulations continue to use device date. A comprehensive authored Teaching Tips library remains future content work beyond the bounded source cleanup in this repair. Full equipment/resource management and workstation capability intelligence remain docked; Manage Station only edits existing supported station fields and adds a resource or issue.

## Important documents

- `docs/ARC_MASTER_PLAN.md`
- `docs/SAMSUNG_TABLET_TEST_2026-09-17.md`
- `docs/PROJECT_BANK_PROGRESSION_v0.18.md`
- `docs/ARC_CONTINUITY_LOG.md`

## Testing and next action

The repository's complete static and JavaScript regression suite is the code gate. Pages publishes `main` from the repository root, so a tested development commit must be deliberately promoted to `main`. Build `classes-dropdown-overlay-repair-1` must remain unpublished until the requested publication process is separately engaged; only the focused physical Samsung overlay/geometry pass closes this milestone.
