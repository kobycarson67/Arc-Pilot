# ARC Integrated Classroom Completion — Major Local Build 3

Date: 2026-10-18
Status: local candidate; independent technical and instructor content review required

## Starting authority

Build 3 begins from accepted local Build 2 commit `3cb404e8607fc029620af3b7fb13f0eee2b92f1b`, tree `b82e4d586b5dac9e04af90db697daaa876d05bf9`. Academic and schedule authority remains `V8_AUTHORITATIVE`. Production classroom transaction domains P4 through P10C remain `V7_ONLY`, dual write remains disabled, and real Student data remains unauthorized.

## Instructional source review

- All 124 preserved Lessons remain immutable `reference_only` sources: 51 WT and 73 AWT.
- Every replacement draft now records the governing course-description basis, process and prerequisite boundary, exact Standard identifiers, unresolved source wording, proposed Curriculum Map location, exact competency identifiers where present, a lesson-specific learning target and criterion, a lesson-specific instructor question/model/application/check, a hands-on requirement, meaningful WT/AWT differentiation, and the certification/qualification boundary.
- WT stays centered on supervised foundational safety, measurement, thermal cutting, joint preparation, SMAW, fit-up, inspection, and correction.
- AWT requires prior WT experience and increases planning, drawing interpretation, GMAW setup/diagnosis, dimensional control, inspection/correction, selected advanced-process boundaries, independence, and career-quality documentation.
- Exact Curriculum Map bindings remain unresolved proposals. Unresolved standards prose is carried visibly instead of parsed into invented authority. AWT competency links remain absent where the preserved Lesson sources contain no exact competency identifiers.
- All 124 replacements remain `DRAFT_INSTRUCTOR_REVIEW`; accepted count is zero.

The complete per-Lesson disposition is recorded in `ARC_MAJOR_LOCAL_BUILD_3_INSTRUCTIONAL_SOURCE_REVIEW_2026-10-18.md` with hashes for the six reviewed course, competency, and Curriculum Map sources.

## Activity alignment

All 32 Activity drafts now expose lesson-derived needs and only the exact Standard and competency identifiers shared with matching draft Lessons. Every link is `PROPOSED_FOR_INSTRUCTOR_REVIEW`; Curriculum relationships remain unresolved. Projects retain the instructor's useful, take-home, giftable, or potentially sellable direction. Technical Assignments emphasize practical demonstration and diagnosis. Skill Challenges remain bounded performance opportunities. Practice remains non-graded and nonqualifying by default.

No draft can automatically assign a Student, record Evidence, create a grade, qualify a competency, complete a Project, schedule a Lesson, or unlock another Activity. Exact drawings, bills of materials, tolerances, finishes, rubrics, scoring, selected advanced process, and final mappings remain instructor decisions.

## Integrated P10B/P10C rehearsal

Build 3 adds one all-or-nothing fictional rehearsal using the accepted `ArcCurriculumPacingAuthorityAdapter` and `ArcLessonAuthorityAdapter` gates and the real P10B/P10C owners. It requires the accepted upstream fictional classroom gate and dedicated database labels, creates an exact fictional Lesson Definition and immutable Version, projects it read-only, requires an explicitly configured Section pacing plan, previews and commits one exact-version pacing placement, and rereads both owners.

The browser rehearsal exposed and repaired a stale sequence integration defect: the coordinator now reads `lastSequence` from the authoritative pacing plan rather than a derived presentation object. Unknown future pacing, wrong gates, wrong database labels, stale writes, and downstream auto-promotion remain fail closed. The rehearsal proves zero Evidence, Gradebook, Project, or assignment mutation.

This does not activate P10B or P10C in production. It does not force a gate or represent a production cutover.

## Visible normal-application workflows

- Lesson Plans renders all 51 WT and 73 AWT drafts with their source review, course differentiation, instructional sequence, and unresolved boundaries.
- Project Library, Technical Assignments, Skill Challenges, and Practice each render four WT and four AWT drafts with proposed Lesson alignment.
- Classroom Workflow, Resources, Gradebook, and Administration remain visible normal-shell routes.
- Administration retains editable weekly, SLO, reporting, and instructional-review exports without inventing missing facts or submitting externally.

## Verification

| Gate | Result |
|---|---|
| Focused instructional collection | 9/9 PASS |
| Focused P10B/P10C rehearsal | 5/5 PASS |
| Complete JavaScript inventory | 163/163 PASS with full Git history |
| Static regression | 47/47 PASS |
| Parse and diff checks | PASS |
| Installed Edge normal UI | PASS: 124 Lesson cards, 32 Activity drafts, four library routes, Classroom Workflow, Resources, Administration |
| Actual P10B/P10C owner composition | PASS: exact Lesson Version placed into an explicitly configured pacing plan; zero downstream mutation |
| Retained P4–P10A normal workflow | PASS: fictional Student, Attendance/Pass, Project/Technical, Competency, Workplace/Safety/private Behavior, explicit Gradebook handoff, History, warm/offline/full-process-cold reload |
| Offline and full-process cold start | PASS with academic `V8_AUTHORITATIVE` rehydration |
| Simulation isolation | PASS: exact stabilized Test Scenario 1 bytes across reload and exact Live restoration |
| Backup/restore | PASS: IndexedDB 14 / 74 stores; complete-package restore parity matched |
| Production authority boundary | PASS: P4–P10C remain `V7_ONLY`; dual write false; real Student authorization false |

The retained Batch A/B harness now runs on ARC's actual `/Arc-Pilot/` subpath and passes its complete three-phase normal-app workflow, full-process cold restart, restore, and task-owned cleanup. P10B and P10C remain separately hard-bound to their accepted isolated authority labels; Build 3 composes them after the accepted fictional upstream gate without moving those domains into the Batch A/B database or production authority.

## Unresolved boundaries

1. Instructor acceptance or revision of every replacement Lesson and Activity draft.
2. Exact Curriculum Map bindings and the selected instructor-approved AWT advanced process.
3. Exact useful-product definitions, drawings, materials, tolerances, finishes, safety steps, rubrics, and scoring.
4. Today's Focus selection and ranking policy.
5. Institution-approved grading, OneDrive recovery, FERPA/privacy, protected media custody, and real Student authorization.
6. Separately authorized production cutovers, publication, and physical Samsung acceptance.

This build does not publish, deploy, change release evidence, operate Samsung, mutate production data, accept instructional content, authorize real Students, or transfer authority.
