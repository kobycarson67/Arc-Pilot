# Stage 14 P9 — Gradebook Transaction Authority Conversion

## Authority and isolation

P9 begins from accepted P8 commit `890dcbd0831c1b1754832d9c35b9bc187ffdc02b`, tree `9d427f17dd3b280c932d2b8c11e11f3c0bb7c4c9`. Schema 8, IndexedDB 11, and the 54-store manifest remain unchanged. Academic authority remains `V7_ONLY`.

Normal ARC retains its accepted Schema 7 Gradebook interface and mutation path through `ArcGradebookAuthorityAdapter`. Isolated v8 verification is hard-bound to `arc_classroom_v8_p9_verification`; it cannot access `arc_classroom_v8`. There is no dual write, production fallback, SIS integration, or automatic external posting.

## Academic and source authority

Every v8 Gradebook operation resolves Student, Enrollment, Section, Course, School Year, Semester, and Grading Period through the P4 academic projection. Duplicate names never identify a Student. Effective-dated movement changes the current scope without rewriting historical Enrollment or Section truth.

The adapter accepts only these approved sources:

- P6 finalized Activity/Technical `AssessmentResult`;
- P6 finalized Project rubric `AssessmentResult`;
- P7 resolved official competency level through an explicit `CompetencyResolution` result;
- P8 finalized Workplace week through `WorkplaceWeekFinalization`;
- P5 instructor-confirmed Attendance grade decisions.

Behavior and Incident records remain `gradeEffect: 'none'`. Standalone Safety records are rejected. Safety may affect the Gradebook only when another approved upstream authority has produced an independently gradeable result.

P7 competency results freeze Level 1/2/3/4 as `60/75/90/100`. Level 3 remains Proficient and Level 4 remains Advanced. The result records the competency/version, strategy version, resolution and evidence fingerprints, override reference when present, official level, authority source, actor, and time.

## Entries, corrections, and calculation

A stable source identity creates one Gradebook Entry per Student and Grading Period. Duplicate posting of the same Activity, Project, competency, or Workplace week is refused. Corrections and reassessments append AssessmentResult and GradebookEntryRevision lineage; stale entry revisions fail. Approved GradebookPolicyVersion records remain immutable, so historical entries and Quarter Snapshots retain their policy context.

The accepted categories and default weights remain Skills & Competency 50%, Fabrication & Projects 25%, Technical Knowledge 15%, and Workplace & Shop Practices 10%. NYA categories are excluded and active weights renormalize. Natural points remain natural points. The scale remains A ≥90, B ≥80, C ≥70, D ≥60, F <60. No grade floor is applied.

Weekly coverage remains policy driven. P9 does not create a compulsory one-grade-per-category-per-week rule or invent category weights, rounding, late-work, or posting policy.

## Manual posting and Quarter Close

Posting Instance, Membership, and Event authority derives Create Assignment, Add Student, Update Grade, or Synchronized status. Only an instructor-confirmed manual action may append an external posting event. ARC does not claim it transmitted data to a school system.

Quarter Snapshots require current authoritative revision IDs, explicit instructor approval, frozen policy identity, and valid synchronization authority. Corrections append a superseding snapshot; prior snapshots remain immutable.

## Verification state and next boundary

The Gradebook and manual-posting parity rows remain `service-ready`. P9 adds isolated source-lineage, transaction, correction, calculation, posting, persistence, and snapshot evidence. It does not mark normal UI authority transferred, Samsung verified, or accepted.

The protected Samsung production database remains untouched at its deployed IndexedDB-10/53-store authority. Publication, physical IndexedDB upgrade, and authority activation require later explicit authorization.

The next bounded parity stage should address another production-critical open domain chosen from the frozen contract. Unified Student History remains open and must not be inferred complete from the bounded P5–P9 history projections.
