# ARC MASTER PRODUCT AUTHORITY — RECOVERED AND CONSOLIDATED

**Required repository starting point:** local commit `7aaeb91615c4bcfc87751a49e37c85dad6659ec4`, tree `1e01f53fa7fe0f44786aeccf23b8b22128e5a6dd`  
**Academic authority at recovery:** `V7_ONLY`

## Authority rules
This is the consolidated product authority, not a replacement for source files, design-lineage files, milestone reports, or code. Future ARC work must read this file and the Classroom Readiness Contract before product/architecture changes. Never silently redesign ARC, invent missing policy, treat the 47-row parity contract as the whole product, or treat a data model as proof that instructional content/UI is accepted. Preserve current behavior, parity requirements, Classroom Ready requirements, institutional requirements, instructor decisions, roadmap items, unresolved questions, and superseded history as distinct categories.

## ARC identity
ARC = **Advanced Readiness Classroom**. Core statement: **Readiness for the Whole Classroom.** ARC Welding mission: **More Than Welding. A Brighter Future.**

ARC is one classroom record that many views understand differently. Core philosophy: **Teach once. Record once. Use everywhere.** Authentic classroom activity should be recorded once by its owning domain and reused for operations, grades, Evidence, reassessment, SLOs, weekly plans, curriculum/Standards coverage, administrator reports, Student history, portfolios, planning, inventory forecasting and later analytics.

Operational north star: **The instructor should not spend the period acting as the classroom's database. ARC remembers who, where, what, when, what's next, and what needs attention. The instructor gets to teach.**

## Six readiness dimensions
1. **Student:** skills, safety, employability, independence, technical knowledge, competency progression and evidence-backed growth.
2. **Instructor:** who needs attention, what to teach, what is next, preparation and teaching support.
3. **Shop:** equipment, booths, materials, cleanup, safety and inventory.
4. **Instructional:** Lessons, Standards, targets, assessments, Projects, Activities, strategies and pacing.
5. **Administrative/program:** SLOs, curriculum maps, weekly plans, Standards coverage, Essential Standards, growth evidence and reports.
6. **Budget/material:** stock, drops, waste, forecasting, low-stock warnings and purchasing.

Historical build rule: **If it prevents successful classroom use, build now. Otherwise preserve it in the roadmap unless unusually high immediate value.**

## Core data/UX rules
- Student identity is durable across periods, Semesters, years, re-enrollment and WT→AWT. Period/Section is context, not identity.
- One source of truth per domain. Do not persist duplicate Forecast/Fast Roster/Open Shop/notification truth.
- Current state and history are both valuable.
- Mis-tap Undo evolved into safe correction + append-first history + destructive-action confirmation.
- Autosave is desired and therefore requires stronger history/recovery/conflict protection.
- Local/offline tablet operation is required. Approved storage direction: `durable local working storage → verified automatic sync/recovery → state-provided education OneDrive`.
- Instructor ARC must never depend on optional ARC Student.
- Provenance matters: know who performed an action. Future View as Student must show **INSTRUCTOR PREVIEW** and avoid false Student-authored records.
- Tablet-first; desktop useful for reports/admin. Large shop-friendly controls, tactile press feedback, reload/offline/rotation/background/sleep-wake resilience.
- ARC must reduce workload, not create another chore.
- Titanium visual direction: royal/ARC blue, black/charcoal, white/silver, restrained gold, industrial/premium/professional. Approved branding is not to be casually redesigned.

## Sidebar authority

### Dashboard
Whole-class readiness overview and entry point. Current/selected class, Class Pulse, schedule/calendar context, Today’s Focus, upcoming work and Quick Access. It derives state; it does not own competing truth.

### Students
Roster/directory plus private longitudinal Student Profile. Profile families include Summary, Competencies/Reassessments, Attendance & Passes, Workplace, Behavior, Projects, Technical, Photos, Grades, Open Shop and History. Individual workflow is partly a privacy architecture: make-up grades/private records must not require displaying the class list. Class and profile actions operate on the same records.

### Class Forecast
Operational instructor queue: **Who needs me right now, what is happening, and what happens next?**
- Needs Attention = operational demand.
- Fast Roster = rapid class control surface.
- Class Forecast = current class state + defined next workflow.
Forecast is deterministic/read-only; no competing Project/checkpoint/need store.

### Attendance & Passes
Daily attendance plus separate out-of-room/pass tracking. Passes do not alter Attendance. Attendance-linked grade effects require instructor review/confirmation.

### Projects
Current Student/class Project execution: reusable definition → Student assignment → Instance/Build → checkpoints → Ready for Review → instructor Verify/Needs More Work → corrections/reopen → rubric/finalization. Supports notes, measurements and manual operational needs. **Ready for Review is Student readiness for instructor judgment, not verification.**

### Open Shop
Friday/open-work priorities. Show multiple useful competency, reassessment/remediation/extension and Project/Activity options. One supposedly “best” answer was rejected because equipment, materials, prerequisites, timing and instructional goals matter. **ARC informs; instructor decides.**

### Gradebook
Internal grade authority and reliable handoff for manual entry into the school gradebook. Approved categories: Skills & Competency 50%, Fabrication & Projects 25%, Technical Knowledge 15%, Workplace & Shop Practices 10%. A≥90, B80–89, C70–79, D60–69, F<60. No general 60% floor. Competency conversion: 1 Introduced=60, 2 Developing=75, 3 Proficient=90, 4 Advanced=100. Behavior/Incident is not a grade source. Standalone Safety is not automatically a grade source. Preserve revisions/source lineage and explicit manual posting events; do not pretend SIS posting occurred automatically.

### Today’s Focus
Instructor instructional/preparation direction: **What should I be focused on today?** Distinct from Forecast. Purpose is recovered, but the exact deterministic selection/ranking algorithm is not fully recovered and must not be invented as historical authority. Likely inputs include calendar/schedule, Section pacing, curriculum position, planned Lessons/Activities, Open Shop day and preparation needs.

### Lesson Plans
Reusable WT/AWT Lesson authority tied to exact versions of Standards/Curriculum/Competencies/Activities where explicitly mapped. Learning Targets begin `I am learning to ...`; Criteria for Success begin `I can ...`. Existing `MASTER_LESSON_BANKS` are preservation/reconciliation input, **not proof of future instructional acceptance**. Instructor had already decided existing Lessons need improvement, especially differentiation. Future versions should support scaffolding, active engagement, Student ownership, purposeful questioning, checks for understanding, actionable feedback, instructional adjustment and hands-on/project-based learning.

### Curriculum & Standards
Official WT/AWT Standards, instructor-selected Essential Standards, Curriculum Maps, sequencing, items, exact links, Section pacing, independent Section position, history/snapshots, flexible pacing and unknown future Semester as valid. Official courses: WT 13207 and AWT 13208, adopted May 2022; WT is AWT prerequisite. Essential Standards: WT 1.1, 2.1, 3.3, 4.3; AWT 1.1, 3.2, 5.3, 6.1, 7.3, 9.1. Orange highlight = instructor selection, not DOE designation.

### Project Library
Reusable Project definitions separate from Student assignment. Mature definitions may include process, competencies, Standards, difficulty, prerequisites, estimated **Student** time, materials, equipment, checkpoints, learning purpose, drawings, instructor guidance, Student instructions and assessment opportunities. Project Bank exists because the instructor needs meaningful Projects now and cannot invent years of content alone. Strong curated starter bank required. Retained progression concept: Foundations → Guided Fabrication → Independent Fabrication → Advanced/Integrated → Capstone/Student Design.

### Technical Assignments
Reusable Technical Knowledge definitions/versions, assignment, scoring/statuses, authorized Tests/reassessment, natural-point finalization and Gradebook handoff.

### Skill Challenges
Short purposeful hands-on skill demonstrations/challenges, narrower than full Projects. May provide qualifying Evidence only when explicitly designed/authorized.

### Practice
Assignable remediation/repetition/preparation. Can consume material without becoming a formal Project. Normally ungraded/nonqualifying Evidence unless an explicit approved rule says otherwise.

### Activity Library
Four banks: Project Library, Technical Assignments, Skill Challenges, Practice. Classroom Ready requires enough curated WT/AWT starter content to operate while the library continues growing. Related learning progression: **Problem → Resource → Practice → Challenge → Assessment → Evidence → Competency.**

### Material Inventory
Inventory v1 is independently useful. Track raw materials, worthwhile consumables, equipment/tools, dimensions, quantity/length, minimum stock, receive/add, use, waste, adjust, usable drops, scrap and transaction history. Lifecycle: **Stock → Reserved → Cut → Usable Drop / Waste / Scrap**. Distinguish planned material, actual consumption, kerf/process loss, usable drops, Student/error waste, unavoidable scrap and rework/replacement. Aggregate footage alone was rejected; physical-piece truth matters. Counting every trivial consumable was rejected. Practice need not become Project merely for inventory. Do not automatically punish beginners through grades for waste.

Future docking: Project reservation → shortage detection → Prep Ahead → Notifications → waste factors/drop matching/cut optimization → purchasing recommendations → Design From Inventory.

### Booth Manager
Booth/station definitions, capability/resources, assignment, occupancy, current work, issues and shop position; later checkout/maintenance/readiness. Different booths can support different processes. Timestamped history supports investigation, but **last user is evidence, not automatic blame.**

### Notifications
Actionable readiness reminders, not generic announcements. Recovered lineage: physical inventory → Project material requirements → shortage detection → advance warning → Prep Ahead/Notifications. Later: need date → supplier delivery opportunity → ordering deadline → notification. Temporary supplier schedule term: **Special Delivery**, not “Exception.” Full trigger catalog remains unfinished.

### Search
Global retrieval across ARC, especially Students and operational records, without manually navigating class screens.

### Administration
Confirmed four families:
1. **Weekly Lesson Plans** — generate the upcoming week, normally Friday, for instructor review/edit/export/submission at the beginning of the next week. Derive known facts from ARC; do not mutate authority.
2. **SLO Documentation** — on-demand baseline → growth instruction/evidence → final assessment → results → reflection package using authentic ARC records. Do not invent instructor rationale/reflection, IEP decisions, reteach/extend decisions, administrator feedback/approval or signatures.
3. **Reports** — administrator-ready reporting such as curriculum/Standards coverage, Essential Standards evidence, Student-growth evidence and other supported program/class reports.
4. **Generated Documents / Exports** — reusable ARC-produced administrative outputs.

Administration exists because one 50-minute planning period cannot support manually rebuilding Planbook, grades, trackers, curriculum maps, Essential Standards and SLO paperwork. Digital forms alone are not the goal; reuse is.

### Resources
Trusted instructional Resource Bank concept: troubleshooting, charts/setup information, examples, terminology, technique guides, inspection help, drawings, material/equipment/safety guidance, media and instructor tips. Independent durable Resource authority remains unresolved. Resources may follow Classroom Ready.

### Help
User assistance/documentation. May follow Classroom Ready.

### Settings
Operational/app configuration: school calendar, bell schedules, Planning Period, Section placement, Semester Transition, app/update/device/storage/recovery, Demo & Testing. Calendar/bell values are instructor-entered operational truth, not hard-coded source authority. Future Semester schedules may legitimately remain unknown.

## Workplace / Safety / Behavior boundaries
Workplace proficiency scoring was rejected because refusal/repeated unsafe behavior cannot be fairly represented by a skill scale with a 60% Level-1 conversion. Workplace uses concrete daily points/deductions, including repeated occurrences, positive observations and weekly finalization. No grade floor. Serious Behavior/Incident documentation is separate/private and `gradeEffect: none`. Safety is separate again. Do not collapse these authorities.

## Evidence and administration
Normal classroom activity should produce reusable Evidence. Competency history can support SLO growth; Projects support Standards/Evidence; Technical assessments document knowledge; photos document work. Evidence can support grades, SLOs, curriculum/Standards coverage, administrator reports and future portfolios without creating parallel evidence systems.

## Photos / employability
Photos began as teacher Evidence and later became a future employment/skills portfolio input. Preserve provenance, Project/competency linkage and verified progress. Future Student Showcase/portfolio may support job applications and recommendations.

## Checkpoints and Student-time analytics
“In Progress” was too vague. Common checkpoints + Project-specific detail make progress observable. Analytics were a consequence, not the reason. Checkpoint timestamps can eventually estimate real Student completion windows, difficulty, pacing and waiting time. Instructor fabrication speed is not a reliable Student-time estimate.

## Teaching Tips
Optional, contextual, collapsible/configurable, never condescending. Useful for demonstrations, safety, questioning, checks for understanding, troubleshooting, differentiation, Project launches, classroom management and assessment. Potential Save Tip. Later recommendations may use Lessons, competencies, results and misconceptions. Teaching Tips are instructor-readiness support, not generic Help.

## Classroom rhythm / optional ARC Student
Long-term rhythm: **sign in → assignment/booth → knowledge check → work → feedback/inspection → cleanup → booth checkout → sign out.**
Optional Student ARC concepts: name+PIN, assignments/Projects, booth, daily checks, inspection requests, cleanup timer, Project browsing, AI practice feedback. Instructor ARC must remain complete without them.

## AI Weld Coach / inspection queue
Original attention bottleneck: Students may wait for instructor feedback. Future flow: **weld → AI preliminary feedback → correct/recheck → Ready for Instructor Inspection → instructor verifies.** AI never awards official competency ratings. AI is a practice coach/attention multiplier, not an automated grader.

## Roadmap preserved, not Classroom Ready blockers
- ARC Student / PIN / View as Student
- daily knowledge checks / micro-quizzes
- cleanup timer/alarm
- Student inspection requests
- AI Weld Coach
- Project Planner
- 2D blueprints
- 3D models
- Community Project Bank
- Student Showcase / evidence-backed employment portfolio
- advanced inventory intelligence
- cut optimization/drop matching
- purchasing forecasts
- Design From Inventory
- other CTE pathways
- eventual multi-school/commercial architecture
- additional paperless assignments and future analytics

Roadmap preservation does not make these immediate blockers.

## Rejected/superseded ideas that must stay rejected unless explicitly reopened
- Level 4 = Proficient. Current authority: Level 3 Proficient, Level 4 Advanced.
- One “best” Open Shop recommendation.
- Generic proficiency scoring for Workplace.
- Aggregate inventory footage as sufficient physical truth.
- Counting every routine consumable.
- Making every Practice activity a Project.
- Exposing engineering/testing tools in normal instructor workflow.
- Treating prediction as certainty.
- Treating last booth user as automatic blame.
- Treating Ready for Review as automatic verification.
- Requiring ARC Student for Instructor ARC.
- Silently inventing future Semester schedules.
- Permanent dual-write or multiple competing authorities.

## v8 relationship to the product
v8 is the replacement data engine under the already-designed ARC application, not permission to redesign ARC around the schema. One write authority per domain; no permanent dual-write; no lazy whole-state copy; derived views remain derived. `V7_ONLY` has intentionally protected normal ARC while isolated v8 services are built/verified. Production authority transfer must convert coherent consumer/write boundaries, not create mixed truth.

## Continuity mandate
Future sessions must preserve product intent, verify repository state, distinguish Classroom Ready from roadmap, avoid silent redesign and explain meaningful architectural choices. If a requirement is unclear, search continuity/design lineage/source authority before asking the instructor to remember it again.
