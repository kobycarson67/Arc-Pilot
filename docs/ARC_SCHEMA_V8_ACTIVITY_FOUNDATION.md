# ARC Schema v8 Activity Foundation

Stage 3 advances `arc_classroom_v8` to IndexedDB structural version 3 while ARC schema authority remains 8 and classroom runtime remains schema 7. It adds `activity_definitions`, `activity_versions`, `activity_evidence_declarations`, `activity_assignments`, `student_activities`, and `activity_attempts` with bounded query indexes.

Definition is reusable identity; Version is exact historically meaningful configuration. Duplicate titles are valid. Draft Versions are revision-editable until used. Once referenced by StudentActivity, Version and Declaration configuration lock; substantive change creates a new Version.

Persisted Version grading configuration owns the approved defaults: Practice ungraded; Skill Challenge Skills & Competency at 100 points with 60/75/90/100 conversion and reassessment; Technical Assignment natural Technical points and reassessment; Test natural Technical points and final-by-default policy; Project final 100-point configuration with no ordinary generic reassessment.

Evidence Declarations are prospective configuration only. They create no EvidenceSource or EvidenceRecord. Standards remain structured references rather than a new Standards domain.

Assignment preserves the exact Version and atomically creates recipient StudentActivities. Individual and selected targets require explicit eligible Student/Enrollment pairs. Section targeting snapshots the effective Stage-2 roster; later roster changes do not change recipients. StudentActivity owns generic workflow only. Attempt 1 is first real work; make-up creates none, pre-finalization revision remains the same Attempt, and later Attempts follow persisted policy plus authorization.

No Project runtime, Evidence runtime, Gradebook, Workplace/Safety, Attendance, Supplemental Session, Artifact, backup conversion, content population, v7 migration, or classroom UI conversion is implemented. Production/Classroom Readiness remains unachieved.
