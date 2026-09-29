# Stage 14 P8 — Workplace, Safety, and Behavior/Incident Conversion

## Authority and scope

P8 begins from accepted P8A commit `d30ff9e961c4fa98dd74df96f0f952f9044a936b`, tree `ff05534c0397eca1ea36d53e6cb2eeba56d9f0ec`. Schema 8, IndexedDB 11, and the 54-store manifest remain unchanged. Academic authority remains `V7_ONLY`.

Normal ARC retains the accepted Schema 7 Workplace and Behavior interfaces and performs exactly one legacy mutation through `ArcWorkplaceSafetyBehaviorAuthorityAdapter`. Isolated v8 verification is hard-bound to `arc_classroom_v8_p8_verification`. It cannot access `arc_classroom_v8`, and there is no dual write or fallback mutation.

## Three authorities

### Workplace & Shop Practices

The adapter delegates isolated work to `ArcV8WorkplaceSafety` using the effective Student, Enrollment, Section, School Year, and Semester scope supplied only by the P4 projection. It preserves applicable/nonapplicable days, retained deductions, same-day occurrence rules, legitimate repeats, full-period refusal, positive observations, live weekly calculation, finalization/correction history, and student-facing normal UI.

The accepted Schema 7 event set maps explicitly to v8 event authority, including attire/footwear, PPE, repeated PPE, preparedness, off-task work, cleanup, tool care, procedure, horseplay, misuse, refusal, disruption, serious safety, endangerment, and severe misuse. `REPEATED_PPE` is explicit because the accepted v7 control carries a fixed two-point consequence even when selected without an earlier single PPE event. No grade floor is added.

The Workplace → Gradebook boundary returns the latest authoritative WeekFinalization and explicitly reports that no Gradebook write occurred. Gradebook transaction authority remains outside P8.

### Safety

Safety remains `safety_events` authority. Recording and correction use the same P4 academic scope. Any Safety-to-Competency Evidence action must carry an explicit accepted qualification and reason, then cross exclusively through the P7 Competency/Evidence adapter. Missing policy returns `SAFETY_EVIDENCE_POLICY_REQUIRED`; P8 does not choose escalation, mastery, recurrence, qualification, recency, or threshold policy.

### Behavior & Incidents

Behavior uses the P8A `behavior_events` store and repository. Records remain private instructor documentation with `gradeEffect: 'none'`. Corrections append, supersede, and optionally void. Optional Workplace/Safety links must share the same Student and Enrollment authority. Behavior writes never create Workplace events, Safety Evidence, Evidence records, or Gradebook records.

## Student projections

The bounded P8 Student projection returns only Workplace, Safety, and private Behavior history needed by the existing profile workflows. It declares `unifiedStudentHistoryComplete: false`; the wider Student History parity capability remains open. Duplicate names never determine identity, and effective class movement is resolved by stable P4 IDs and dates.

## Verification state

The parity rows for Workplace, Safety, and Behavior/Incidents remain `service-ready`. P8 adds isolated adapter, cross-boundary, correction, rollback, history, and UI routing evidence. It does not mark any row UI-connected, Samsung verified, or accepted because normal ARC remains authoritative Schema 7.

The build/cache suffix is `parity-p8-workplace-safety-behavior-1`. The adapter and Behavior repository are cached and covered by Pages asset parity, while their runtime mode in normal ARC is `V7_ONLY`.

## Production and next boundary

The protected Samsung `arc_classroom_v8` remains at its deployed IndexedDB-10/53-store authority. No production open or upgrade occurred. Publication and the protected 10→11 physical upgrade require separate authorization and the recovery procedure recorded in the P8A authority.

The next bounded domain stage may convert Gradebook transaction authority through the shared P4 scope and completed domain handoff boundaries. It must not begin until separately authorized. Full unified Student History also remains a separate open capability.
