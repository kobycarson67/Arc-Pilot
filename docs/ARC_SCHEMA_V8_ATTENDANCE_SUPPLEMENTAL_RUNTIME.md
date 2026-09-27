# ARC Schema v8 Stage 8 — Attendance, Pass, and Supplemental Runtime

Stage 8 advances isolated `arc_classroom_v8` storage from IndexedDB structural version 7 to 8. ARC schema remains 8, classroom runtime remains schema 7, and application version remains 0.18. The classroom interface loads but does not invoke this prospective service.

## Persisted authority

Stage 8 adds `attendance_records`, `pass_events`, `supplemental_shop_sessions`, and `attendance_grade_decisions`. The decision store contains only confirmed instructor actions and their provenance; pending review remains derived.

AttendanceRecord represents a scheduled obligation using Student, home Enrollment, effective Schedule Assignment, Section/session, school date, approved status, recorder, and time. Corrections append a superseding record and preserve the prior fact. Current Attendance is derived from the correction chain. Attendance never stores grade, Workplace, competency, or Supplemental conclusions.

PassEvent records temporary physical absence with approved reason, label, scheduled context, departure, optional return, authorization, and revision-safe close. Passes do not change Attendance, Workplace, Gradebook, or Evidence.

SupplementalShopSession records explicitly authorized physical presence. Start, meaningful-participation confirmation, and end use optimistic revisions. Overlap is rejected. Physical Section may belong to another Course, while home Enrollment continues to own Activity compatibility, Evidence scope, competency catalog, and Gradebook destination.

## Workplace and work context

Workplace applicability derives from scheduled Present, Tardy, or Left Early authority, or an explicitly confirmed meaningful Supplemental opportunity. Elapsed time alone never establishes participation. Scheduled and Supplemental opportunities still produce one 10-point Workplace denominator per Student, home Enrollment, and school date. Attendance is never rewritten.

ActivityAttempt and EvidenceSource may reference a validated Supplemental Session. The session must match Student and home Enrollment, and occurrence time must fit the session. Stored physical context describes Section/session location without changing academic ownership. Same-day Workplace recurrence continues across scheduled and supplemental periods.

## Attendance-linked Gradebook workflow

Attendance changes only produce derived review proposals. An ordinary day-specific Unexcused Absence may propose zero when opportunity policy is explicitly applicable. Excused Absence proposes Exempt for ordinary graded work. An Excused Test proposes Pending Make-Up without creating an Attempt, AssessmentResult, zero, or Evidence. Present Test refusal remains assessment authority outside Attendance.

Only explicit instructor confirmation persists an AttendanceGradeDecision and applies the proposed Gradebook treatment, append-first zero Result/Revision, or StudentActivity Pending Make-Up transition. Decisions retain Attendance, StudentActivity, Entry, actor, time, reason, resulting authority, and correction provenance. Later Attendance corrections derive another review; confirmation preserves earlier grade history and Stage 7 derives any required external Update Grade action.

## Boundaries

Stage 8 does not read, migrate, or infer historical `weld_v013` Attendance, passes, or supplemental presence. It adds no v8 Booth, Artifact, photo/blob, production backup/restore, external school-gradebook API, or classroom UI capability. Production and Classroom Readiness are not achieved.
