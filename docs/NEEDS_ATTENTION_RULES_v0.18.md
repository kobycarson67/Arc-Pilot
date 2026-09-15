# ARC v0.18 — Needs Attention Rule Contract

Status: design contract before UI implementation.

## Purpose
Needs Attention answers one classroom question: **Who needs the instructor today, and why?**

The engine is deterministic and explainable. It does not grade students, change evidence, or use AI judgment. It only reads existing ARC records and produces attention items that link the instructor to the relevant student and workflow.

## Principles
1. **Explain every flag.** Each item includes the rule that triggered it and the evidence/date behind it.
2. **No silent academic decisions.** Attention items never create zeros, change competency ratings, alter attendance, or complete projects.
3. **Current opportunity matters.** Missing evidence is not a problem merely because a competency exists; ARC must have evidence that the skill has been taught/forecast as due or an assessment opportunity exists.
4. **Absence-aware.** Excused Absence, School Activity, and No Class do not create missing-work penalties or false urgency.
5. **Current enrollment/term first.** Historical records remain visible in student history but should not create today's normal attention queue.
6. **Instructor judgment wins.** Items can be opened and acted on; future versions may support snooze/dismiss with audit history, but v0.18 should not hide evidence automatically.

## Priority levels

### P1 — Needs instructor intervention
Use sparingly for conditions likely to require action during the current class/day.

- **Essential competency at risk** — an essential standard/competency that should already have meaningful evidence is still Not Assessed/NE, or the student's latest meaningful rating is below Proficient after sufficient opportunity.
- **Serious/repeated shop concern requiring follow-up** — recent serious Workplace or Behavior evidence, or repeated significant concerns, where follow-up is appropriate.
- **Ready for instructor review/reassessment** — student/project/evidence is explicitly ready and waiting for instructor verification.

### P2 — Needs follow-up soon
- **Project stalled** — active project has no meaningful progress/evidence for a configurable number of instructional opportunities while the student was available.
- **Repeated Workplace concern** — multiple recent deductions/concerns indicate a pattern but do not meet P1 severity.
- **Missing Technical evidence** — a due/current Technical assessment has no eligible evidence after an available opportunity.
- **Developing competency needs another look** — recent rating remains below Proficient and the curriculum/current work makes another evidence opportunity appropriate.

### P3 — Opportunity / positive next action
- **Reassessment opportunity** — prior evidence is below Proficient and newer work suggests the student may be ready to demonstrate growth.
- **Evidence gap** — curriculum is approaching an essential skill and the student has little/no evidence; useful for Open Shop planning before it becomes P1.

## Required attention-item shape
Every generated item should contain at least:

```text
id                stable/generated item identifier
studentId         student
sectionId         current class/section
priority          P1 | P2 | P3
ruleId            stable machine-readable rule
category          Competency | Project | Workplace | Behavior | Technical | Review
headline          short instructor-facing reason
explanation       plain-language explanation of why ARC flagged it
evidenceDate      most relevant date when available
relatedId         competency/project/assessment/event id when available
actionTarget      destination workflow
```

## Initial rule IDs
- `essential_competency_risk`
- `serious_shop_followup`
- `ready_for_review`
- `project_stalled`
- `repeated_workplace_concern`
- `technical_evidence_missing`
- `developing_competency`
- `reassessment_opportunity`
- `essential_evidence_gap`

## Sorting
Default queue order:
1. Current section/class first when opened from a class.
2. P1 before P2 before P3.
3. Within priority, items with explicit waiting/review status first.
4. Then oldest unresolved evidence/opportunity first.
5. Student name only as final stable tie-breaker.

## Deduplication
A student may have multiple legitimate reasons to appear, but ARC should avoid noisy duplicates. Multiple triggers for the same student + same related record should combine into one attention card with the strongest priority and all relevant reasons available in details.

## Attendance safeguards
Do not generate missing-evidence/stalled-project urgency from days recorded as Excused Absence, School Activity, or No Class. Tardy and Left Early may contribute only when the underlying workflow already requires Teacher Review; they should not silently be treated as full missed opportunities.

## Grade safeguards
Needs Attention is advisory. It must never directly modify the 50/25/15/10 grade categories, competency ratings, project rubric scores, Technical scores, Workplace scores, attendance, or behavior records.

## v0.18 first implementation target
Implement the engine separately from rendering so it can be regression-tested. Start with high-confidence rules using records ARC already has:

1. essential competency risk
2. ready-for-review/reassessment signals that already exist
3. repeated/recent Workplace concerns
4. active project inactivity where dates are reliable
5. missing Technical evidence only where a due/opportunity date is reliable

If ARC cannot reliably establish that an opportunity occurred, the engine should **not flag the student** rather than inventing urgency.

## Future extensions
- Instructor snooze/dismiss with reason and audit history.
- Open Shop priority suggestions sourced from the same engine.
- Class dashboard counts and Main Menu cross-class queue.
- Configurable thresholds after real classroom use.
- Portfolio/growth signals can later create positive P3 opportunities.
