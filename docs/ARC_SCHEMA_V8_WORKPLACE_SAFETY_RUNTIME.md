# ARC Schema v8 Stage 6 — Workplace and Safety Runtime

Stage 6 advances the isolated `arc_classroom_v8` database from IndexedDB structural version 5 to 6. ARC schema authority remains 8, classroom runtime remains schema 7, and application version remains 0.18. The classroom interface does not read this foundation.

## Persisted stores and indexes

| Store | Key | Indexes |
|---|---|---|
| `workplace_days` | `workplaceDayId` | `by_student`; `by_enrollment`; unique `by_student_enrollment_date`; `by_date`; `by_applicability` |
| `workplace_events` | `workplaceEventId` | `by_day`; `by_day_type`; `by_severity`; `by_occurred_at`; `by_lifecycle` |
| `positive_workplace_observations` | `observationId` | `by_day`; `by_dimension`; `by_occurred_at`; `by_lifecycle` |
| `safety_events` | `safetyEventId` | `by_student`; `by_enrollment`; `by_date`; `by_type`; `by_severity`; `by_lifecycle` |
| `workplace_week_finalizations` | `weekFinalizationId` | `by_student`; `by_enrollment`; `by_student_week`; `by_lifecycle` |

The ordered `indexeddb-5-to-6` upgrade preserves all Stage 1–5 authority. Daily scores, live-week percentages, recurrence button values, Safety patterns and current Workplace/Safety competency states are derived and are not persisted as competing truth.

## Workplace days and applicability

One `WorkplaceDay` may exist for each Student, Enrollment and school date. Applicability is explicit persisted instructor/test authority with structured source and context. Stage 6 does not infer attendance or supplemental participation. Applicability updates use optimistic revisions.

An applicable day begins at 10/10. A nonapplicable day has no denominator. School-date identity controls recurrence; a physical period change does not reset it.

## Event taxonomy and recurrence

The service uses stable machine codes for all approved Minor, Significant, Serious and Full-Period Refusal events. Each event stores the exact applied deduction and policy version so later policy changes cannot rewrite history.

- First legitimate same-day occurrence of a Minor type: normally −1.
- A distinct explicitly authorized same-day repeat: normally −2.
- Repeats require `legitimateRepeat` authority; elapsed time or another period cannot establish legitimacy.
- The occurrence sequence resets on the next school date.
- Significant events apply −2 and Serious events apply −3.
- An incident key prevents overlapping Workplace deductions for the same real incident.

Corrections and voids append superseding events. Active recurrence and results rebuild from the remaining authority.

## Full-Period Refusal

Full-Period Refusal / No Meaningful Participation is stored as a real `DAILY_ZERO` event with deduction `0`, never a fabricated −10 event. It resolves an applicable day to 0/10 while retaining all other legitimate event history. It creates no competency Level 1.

## Positive Workplace observations

The approved stable dimensions are Initiative, Responsibility / Ownership, Professional Communication, Teamwork / Supports Others and Problem Solving. Observations carry explicit dimension, time, recorder and physical context. Notes cannot create or infer dimensions.

Positive observations add no points, cancel no deductions and never change daily, weekly or normalized posting values. Correction and void history is append-first.

## Daily and live-week calculations

Daily authority is rebuilt as `max(0, 10 − active deductions)` unless an active DAILY_ZERO event applies. Results expose applicability, points, percentage, contributing event IDs, positive observation IDs and policy reasons.

Live-week results sum applicable earned points over applicable possible points. Nonapplicable days create no denominator, and short weeks require no special case. Reads do not mutate persisted facts.

## Week finalization

Explicit finalization persists the exact applicable WorkplaceDay IDs, earned/possible points, percentage, class posting scale, decimal normalized posting points, calculation policy, actor/time and provenance. Corrections append a new finalization that supersedes the current chain head. Stage 6 creates no AssessmentResult or GradebookEntry.

## Safety events and linked incidents

`SafetyEvent` is independent factual authority with Student, Enrollment, stable event type, severity, school date/time, physical context, optional ActivityAttempt/Project reference, and optional Workplace link. Workplace-only and Safety-only events remain valid where appropriate.

For configured dual-domain incidents, one service operation atomically creates mutually linked Workplace and Safety records. A failed write rolls back the Workplace event, Safety event and WorkplaceDay revision together, so the instructor never needs two unrelated entries for one incident.

Safety corrections and voids preserve the original and use optimistic revisions. No mutable Student Safety flag or persisted pattern conclusion exists.

## Evidence integration

Stage 6 uses Stage-5 Evidence Sources and one-competency Records. An approved SafetyEvent can create a `Continuous Safety` Source and nullable-level Habit/Continuous Record only when the selected strategy explicitly permits that evidence form. Operational Safety status is derived through Evidence and strategy authority.

A technical performance Source remains intact when Safety prerequisite failure makes its technical Record Nonqualifying with structured reason `SAFETY_PREREQUISITE_FAILED`. The engine neither deletes performance nor invents Level 1.

Workplace facts and observations are exposed as deterministic inputs for the `Continuous Workplace` family without duplicating every fact into another truth system.

## Continuous Workplace and unresolved policy

The input builder returns the ten most recent applicable Workplace days, their results, aggregate percentage, the frozen 90% Proficient floor capability and explicit positive dimensions. One isolated poor day or refusal does not mechanically force Developing. Zero deductions alone cannot establish Advanced; the Advanced-quality path requires at least three explicit positive dimensions in addition to the Proficient floor.

Exact incompatible-pattern blockers remain unresolved. Therefore the Stage-6 resolver returns `Review/Unresolved` without a supplied approved blocker policy, even when the 90% floor or three-dimension capability is satisfied. Continuous Safety likewise returns `Review/Unresolved` without approved pattern rules. No blocker count, pattern threshold or recency window is invented.

## Boundaries

- No Attendance, Pass Event or Supplemental Session records exist. Physical-period context is descriptive only.
- No Gradebook, AssessmentResult, Artifact/photo/blob or Booth runtime store is added.
- `weld_v013`, v7 photo authority, pilot records and simulation records are never read, migrated, reset or modified.
- No production student or curriculum seed is added.
- Classroom UI remains v7 and Production/Classroom Readiness is not achieved.
