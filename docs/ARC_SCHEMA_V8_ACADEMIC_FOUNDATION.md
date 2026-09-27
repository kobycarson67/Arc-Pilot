# ARC Schema v8 Academic Foundation

Stage 2 added the first v8 domain authorities without connecting classroom UI or reading Schema v7. It advanced `arc_classroom_v8` from IndexedDB structural version 1 to 2; Stage 3 advanced it to 3 and Stage 4 advances it to 4. ARC schema authority remains 8 and classroom runtime schema remains 7.

## Stores and indexes

- `students`: `by_lifecycle`
- `courses`: unique `by_code`, `by_lifecycle`
- `school_years`: `by_lifecycle`
- `semesters`: `by_school_year`
- `grading_periods`: `by_semester`, `by_school_year`
- `sections`: `by_school_year`, `by_course`, `by_semester`, `by_period`
- `course_enrollments`: `by_student`, `by_course_year`, `by_student_course_year`
- `enrollment_schedule_assignments`: `by_enrollment`, `by_section`

The ordered `1 → 2` IndexedDB upgrade creates these stores and indexes atomically and records successful migration metadata. Existing infrastructure stores and metadata remain intact.

## Boundaries

Student is longitudinal identity. Course is catalog identity. Section is a scheduled Course offering. Course Enrollment relates Student, Course, and School Year. Enrollment Schedule Assignment is the effective-dated Enrollment-to-Section relationship. Sections contain no roster arrays; rosters are derived for an effective date.

WT and AWT are explicit idempotent built-in Course seeds with stable configuration IDs `arc-course-wt` and `arc-course-awt`. Student and transactional academic records use ARC UUIDs. Names, codes, period numbers, and labels are never record identity.

The repository validates parent references, Course and School Year agreement, date ranges, overlapping assignments, and immutable identity. Mutable records use revisions; stale writes fail with `WRITE_CONFLICT`. A section move ends the prior assignment and creates the next assignment in one transaction. Student archive, Enrollment close, and Schedule Assignment end preserve history; no cascade-delete workflow exists.

`rosterForSection(sectionId, date)` derives active students through Schedule Assignment and Enrollment authority. `gradingPeriodForDate(date)` returns the owning Grading Period, Semester, and School Year with inclusive boundaries.

Stage 2 seeds no Students and performs no v7 migration. All classroom UI continues to use `weld_v013`. Production/Classroom Readiness remains unachieved.
