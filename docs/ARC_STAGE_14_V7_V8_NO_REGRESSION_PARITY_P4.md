# ARC Stage 14 — No-Regression Parity P4

## Authority

- Starting commit: `74ffcfaf08d506fd98a9a40dd4c5dd5651f540f2`
- Starting tree: `7a15b63109c2736cb78e33a05cf7c34e9f0d0986`
- Rollback reference: `rollback/pre-stage-14-parity-program-p4`
- Academic authority: `V7_ONLY`
- Production mutation: prohibited and not performed
- Real Student data: prohibited
- IndexedDB structural version: `10` (unchanged)

## Student / Enrollment / Schedule Assignment transition boundary

`ArcV8Academic` remains the sole owner of v8 Student, Course Enrollment, and Schedule Assignment mutations. P4 adds bounded atomic operations for:

- creating a Student with an initial Enrollment and Schedule Assignment;
- re-enrolling an existing stable Student identity after a closed Enrollment;
- closing the current Enrollment and Schedule Assignment together;
- moving an Enrollment through the existing effective-dated atomic move;
- stale-revision refusal and transactional rollback.

`ArcAcademicAuthorityAdapter` exposes those operations only in `V8_ISOLATED_VERIFICATION`, hard-bound to `arc_classroom_v8_p4_verification`. Its normal ARC mode is `V7_ONLY` and invokes exactly one supplied legacy mutation. It cannot dual write and it cannot name or open `arc_classroom_v8`.

## Shared projection architecture

`ArcAcademicConsumerProjection` derives one academic context from Student, Enrollment, Schedule Assignment, Section, Course, School Year, Semester, and effective Section-placement authority. It persists no view state.

The projection owns these shared answers:

- stable Student identity and display name;
- current versus archived Student context;
- current and historical Enrollments;
- current and historical Schedule Assignments;
- effective Section roster;
- selected Section and current-period Section;
- School Year, Semester, Course, Section, Enrollment, and Schedule Assignment scope IDs.

Dashboard, class selector, Students directory, global search, Fast Roster, Student Profile, current-class detection, Gradebook, Projects, Technical, and Workplace consume the same projection contract. Their domain transaction authorities remain unchanged.

Normal ARC now routes its common `allStudents`, `activeSection`, `sectionStudents`, `currentEnrollment`, Dashboard current/selected-class resolution, and class-selector membership through the shared projection. While authority remains `V7_ONLY`, that projection is derived from the one accepted Schema 7 state. Isolated v8 verification derives the same contract from the P4 verification database. There is no mixed live authority and no permanent dual write.

## History and semester behavior

- Duplicate names retain distinct Student UUIDs.
- Drop and re-enrollment preserve the Student identity and prior academic history.
- A Section move ends the prior Schedule Assignment on the previous day and appends the new assignment.
- A future semester may have no Student assignment until its schedule is known.
- Once authorized academic records exist, every consumer receives the same new Enrollment and Schedule Assignment scope.
- Archived Students remain available to history/search projections and are excluded from current rosters.

## Build, cache, and publication

Build and shell authority advance with suffix `parity-p4-academic-consumers-1`. Both P4 modules are included in the service-worker core and Pages asset-parity list.

No publication or deployment occurred.

## Parity evidence

P4 records automated service evidence for:

- Student records;
- Student directory/search;
- roster add/drop/re-enrollment;
- effective-dated Student movement;
- Dashboard/class/current-class context;
- Fast Roster;
- academic scope consumed by Gradebook, Projects, Technical, and Workplace.

These rows remain `service-ready`. No row advances to `ui-connected`, because normal classroom ARC intentionally remains `V7_ONLY` and no authoritative v8 classroom activation was performed. Domain write conversion is not claimed.

## Remaining mixed-truth risks

There is no mixed truth in the P4 adapter or projection. A future activation would create mixed truth if any normal consumer bypassed the shared projection, if any Student/Enrollment mutation remained on Schema 7, or if domain services accepted independently reconstructed academic scope. Activation must therefore convert and verify the complete consumer set as one checkpoint and refuse partial enablement.

The following remain outside P4:

- production academic configuration and production Student creation;
- v8 classroom authority activation or v7 write shutdown;
- Attendance, Gradebook, Project, Technical, Workplace, Safety, Evidence, Booth, or Artifact transaction conversion;
- migration/import of v7 records;
- real Student data;
- publication and deployment.

## Samsung physical verification required

After separately authorized publication and after a complete classroom activation candidate exists, installed PWA and direct Chrome must verify:

- duplicate-name Student selection by stable identity;
- create, edit, archive, drop, re-enroll, and effective-dated move flows;
- Students directory, search, Fast Roster, Student Profile, Dashboard, and class selector agreement;
- current-class changes at bell boundaries;
- Gradebook, Projects, Technical, and Workplace showing the same Student/Enrollment/Section scope;
- Semester transition with unknown future schedule, then later configured schedule;
- conflict refusal and failed-operation rollback;
- reload, cold start, offline reopen, update lifecycle, portrait/landscape, background/foreground, and sleep/wake.

Samsung verification is pending and cannot be accepted against v8 while classroom authority is `V7_ONLY`.

## Proposed P5 boundary

**P5 — Convert Attendance, Pass, and student-history domain workflows** may connect normal ARC Attendance, out-of-room Passes, Attendance history, and shared Student history to existing v8 authority using the P4 academic scope contract.

P5 must keep Attendance-linked grading instructor reviewed, preserve Pass independence, keep history append-first, and prove Student Profile, Fast Roster, Attendance, Gradebook review context, and history agree after corrections and reload. It must not activate production, introduce dual writes, import real records, or convert unrelated domain transactions.
