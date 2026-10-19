# ARC Integrated Classroom Completion — Major Local Build 1

Date: 2026-10-18
Status: local candidate; technical and instructor-content review required

## Boundary

This build starts from published commit `c858c4849461ce73df6210f02cca71975577fe53` and carries forward the unpublished Activity Library Starter Content 1 candidate for completion in one reviewable local branch. It does not publish, operate Samsung, change the database schema, accept instructional content, authorize real Student data, or transfer classroom-domain authority.

Academic and schedule authority remains the accepted `V8_AUTHORITATIVE` boundary. P4 through P10C classroom transactions remain `V7_ONLY`. The normal data contract remains Schema 7; the protected academic database remains IndexedDB version 14 with 74 stores.

## Delivered local review surfaces

- A pure, inert replacement-Lesson projector creates 124 separate `DRAFT_INSTRUCTOR_REVIEW` designs from the 51 WT and 73 AWT preserved source Lessons.
- Each draft includes a concept introduction, existing source targets and criteria, hands-on opportunities, checks for understanding, feedback, four readiness and enrollment-timing differentiation paths, and instructor-selected next-learning options.
- Exact numbered Standard and exact source competency references are retained. Curriculum Map matches are disclosed as candidates with their basis and are not accepted relationships.
- The Activity Library contains 24 drafts: three WT and three AWT drafts in each of Projects, Technical Assignments, Skill Challenges, and Practice.
- Project direction follows instructor feedback: the WT frame remains; the other product concepts are useful, take-home, giftable, or potentially sellable choices whose exact design, drawings, bills of material, and rubrics remain unresolved.
- The four instructor-reviewed Technical Assignment concepts remain, with hands-on demonstrations, supervised WT application, and greater AWT independence and diagnosis.
- Project Library, Technical Assignments, Skill Challenges, Practice, Gradebook, Resources, and Administration are live sidebar actions. Today's Focus stays visibly docked because its selection and ranking policy remains unresolved.
- Administration produces editable, explicit-export drafts for the upcoming week, SLO documentation, and curriculum, competency, activity, grade, growth, and authority-readiness reporting. Unknown Lessons and human judgments remain blank.

## Safety and authority

The draft modules are inert at load. They expose no accept, schedule, Auto Build, assignment, grade, Evidence, qualification, database, authority, or publication operation. Practice remains ungraded, nonqualifying, and separate from Project completion. All scoring, reassessment, Evidence recording, project assignment, and grade transfer require the existing explicit instructor actions.

The existing Batch A/B owners and P10B/C adapters are inventoried for a later controlled cutover. This milestone performs no cutover, dual write, production migration, or retirement of V7 authority.

## External blockers

- Instructor content review and acceptance of every replacement Lesson and Activity draft.
- Exact choices, drawings, material lists, tolerances, finishes, safety procedures, and rubrics for product drafts.
- Review of proposed Lesson-to-Activity and Curriculum Map candidates.
- Today's Focus ranking and selection policy.
- Approved OneDrive configuration and full protected-media recovery coverage.
- Institutional FERPA/privacy approval and media-custody rules before real Student authorization.
- Independent technical review and later physical Samsung acceptance of any published successor.

## Local verification

- Complete JavaScript inventory: 160/160 files passed with full Git history available.
- Static regression: 47/47 checks passed.
- Changed JavaScript parse checks: 28/28 passed; workflow inline-script parsing passed.
- `git diff --check`: no findings.
- Installed Microsoft Edge rehearsal at the real `/Arc-Pilot/` subpath: passed online load, offline reload, full-process cold restart, normal sidebar use, 124-Lesson review, all four Activity libraries, Resources, and read-only Administration generation.
- Isolated fictional-data boundaries: 0 Students, 0 Enrollments, and 0 Schedule Assignments; Test Scenario 1 remained byte-exact across reload and Live state restored exactly.
- Protected storage and authority: IndexedDB 14 with 74 stores, `V8_AUTHORITATIVE` academic marker, all P5–P10 authorities `V7_ONLY`, and 74-store backup/restore parity passed.
