# ARC Capability Registry

Verified against the local `arc-workflow-integration-1` candidate, schema v7. The commit and tree for this candidate are recorded in its implementation report. Update this registry whenever a later milestone changes a capability.

## Status key

- **Implemented:** a usable authoritative workflow exists, within stated limits.
- **Partial:** useful workflow exists, but a stated connection or route is incomplete.
- **Foundation:** data or engine exists before the full user workflow.
- **Docked / Future:** intentionally visible placeholder or deferred integration.
- **Missing:** no current implementation.

All classroom records below use the existing schema-v7 `state` stored under `weld_v013` in browser localStorage unless a row states otherwise. Simulation substitutes an isolated fictional state through `ArcSimulationFoundation`; it never writes Live classroom records. “Host tests” means source/integration contracts rather than physical tablet verification. The storage and Simulation columns call out departures from those defaults.

| Capability / domain | Status | Authority and primary UI entry | Persistence / Simulation | Test coverage | Known limit; remaining work; related future capability |
|---|---|---|---|---|---|
| Schedule/classes | Implemented | `index.html` sections, enrollment, bell schedules, overrides; Schedule Setup | State / fixture sections | Static gate; schedule host contracts | Scheduling remains instructor managed; future calendar integration. |
| Global Students / Roster | Implemented | `ArcCurrentStudentDirectory` projection; sidebar directory | Read only / fixture enrollments | `workflow_integration_1.test.js` | Current students only; archive stays in All Student Profiles. |
| Fast Roster | Implemented | `renderRoster`, `sectionStudents`; selected-class Dashboard action | Read/write through established student, pass, booth, project authorities / fixture class | Roster and workflow tests | Operational selected-class view; physical Samsung retest required. |
| Student profiles | Implemented | `openStudent`, `renderModal`; directory, roster, Search | State / fictional profiles | Static and modal tests | Inactive archive report is limited; full printable report future. |
| Competencies/reassessments | Implemented | `compCard`, scoped ratings, history; student Competencies | State / fictional ratings | Static gate; Open Shop tests | Instructor evaluation authority; future portfolio/reporting. |
| Open Shop | Implemented | `gaps`, `viewStudentCompetency`; class and student profile | Derived / fixture ratings | Pre-Titanium and workflow tests | Ranking uses existing assessed gaps; no new recommendation engine. |
| Projects | Implemented | `ArcProjectBank`, `student.projects`; class Projects, student Projects | Bank definitions and independent assignments / fixture assignments | Project Bank domain, integration, workflow tests | Content coverage limited; curated bank expansion future. |
| Global Project Bank | Implemented | `state.projectBank`; sidebar Project Bank and existing definition editor | State / fixture bank | Project Bank and workflow tests | Four WT starters, no AWT starter content; broader population future. |
| Checkpoints | Implemented | `ArcProjectCheckpoints` and controller; student Projects | Student assignment / fixture checkpoints | Checkpoint domain/integration suite | Progress evidence is separate from grade. |
| Project grading/rubrics | Implemented | `PROJECT_RUBRIC`, `projectScore`; student Projects/Grades | Student assignment rubric / fixture rubric | Static and project tests | Instructor ratings; no automatic grade from checkpoint. |
| Photo evidence | Partial | `photoEvidence` metadata, IndexedDB images; student Photos | Metadata in state; image in IndexedDB or session memory / fixture clears photos | Static gate | Stable project/Technical links, target galleries, cloud storage future. |
| Student Work Library | Partial | `renderPhotoLibrary`, same photo records | Same photo stores / fixture empty | Static gate | Filtering/gallery works; target-side links and cross-device media future. |
| Technical Knowledge | Implemented | `technicalLibrary`, student `tech`; class scoring/student Technical | State / fictional assessment records | Static gate | Reusable assessments separate from photo evidence links. |
| Workplace & Shop Practices | Implemented | Workplace day events and weekly scoring; class/student Workplace | State / fixture events | Static gate | Separate from behavior documentation. |
| Behavior events | Implemented | Student/class Behavior & Incidents | State / fictional events | Static gate | No automatic grade effect; reporting future. |
| Attendance | Implemented | `attendanceRecords`; class attendance and student history | State / fixture attendance | Static, Forecast tests | Independent from pass log. |
| Passes/out-of-room | Implemented | `passLog`; Fast Roster, Attendance & Passes | State / fixture passes | Pass and roster tests | Temporary pass does not change attendance. |
| Class Forecast | Implemented | `ArcClassForecast`; selected-class Forecast/Dashboard pulse | Derived, no forecast store / fixture inputs | Forecast domain/integration tests | Preparation facts, not predictions; exact-object links added here. |
| Booth Manager | Implemented | Booths, assignment lifecycle, issues; selected-class Booth Manager | State / fixture assignments | Booth suite | Physical device retest remains. |
| Material Inventory | Implemented | `ArcMaterialInventory` pieces/ledger; Material Inventory | State / fictional Scenario 3 stock | Material Inventory suite | Project assignment never consumes stock; purchasing future. |
| Lesson Plan Bank | Implemented | Master lesson bank and pacing; Lesson Plan Bank | State / fixture base | Static and Teaching Tips tests | Today's Focus class/date link deferred. |
| Curriculum/standards | Partial | Repository WT/AWT standards and curriculum map; Curriculum & Standards | State progress; static standards / fixture base | Static gate | Source-photo reconciliation and coverage reporting future. |
| Teaching Tips | Implemented | `ArcTeachingTips`; Lesson Plan Bank | Derived, no separate store / same lessons | Teaching Tips tests | Optional support, not required instruction. |
| Dashboard Current Class | Implemented | `dayPlan`, `currentScheduleContext`, `ArcTitaniumShell.currentClass`, time lifecycle; Dashboard | Derived / isolated scenario state with real device time | Workflow lifecycle tests | Device clock and physical sleep/wake retest required. |
| Dashboard Selected Class | Implemented | `state.activeSectionId`; Dashboard/class picker | State / isolated fixture selection | Titanium and workflow tests | Instructor controlled; never follows the clock. |
| Header live clock | Implemented | `ArcTimeLifecycle`; global header | Nonpersistent real device time in both modes | Workflow lifecycle tests | Informational, minute precision. |
| Today's Focus | Docked / Future | Disabled Dashboard/sidebar dock | None / disabled | Titanium shell tests | Needs authoritative class/date lesson schedule. |
| Notifications | Partial | State notifications and due grouping; ARC Notifications | State / fixture clears notifications | Static gate | Broader integrations and preparation alerts future. |
| Search | Partial | `showGlobalSearch`; ARC Search | Read only / fictional students | Static gate | Student-name search only; broad object search future. |
| Simulation | Implemented | `ArcSimulationFoundation`, fixtures; Demo & Testing | Isolated simulation storage / canonical fictional fixtures | Simulation suite | Real device clock is informational; no Live writes. |
| Offline/PWA | Implemented | `sw.js`, update controller, manifest; App & Updates | Cache and device browser storage / same shell | Deployment/update suite | Hardware install/offline retest required. |
| Backup/privacy | Partial | JSON backup/import, rollback, privacy warnings; Settings | State JSON excludes IndexedDB image bytes / simulation isolation | Static/deployment tests | Cloud/auth/encryption and media backup future. |
| SLO/reporting | Foundation | Grades/history and limited permanent report; profile/Grades | State / fictional evidence | Static gate | Administrator-ready SLO generation deferred. |
| Help | Docked / Future | Disabled sidebar destination | None | Titanium shell tests | Contextual Help system future. |
| Purchasing/readiness forecasting | Docked / Future | Inventory and project requirement metadata only | No purchasing authority / no fixture forecast | Inventory/project boundary tests | Cut planning, purchasing forecast and ordering future. |

The status reflects code and tests, with continuity constraints checked against `ARC_CONTINUITY_LOG.md` and `ARC_CONTINUATION_HANDOFF.md`. Physical Samsung acceptance is a separate verification step.
