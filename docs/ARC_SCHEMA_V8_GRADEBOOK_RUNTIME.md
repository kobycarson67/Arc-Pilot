# ARC Schema v8 Stage 7 — Gradebook Runtime

Stage 7 advances the isolated `arc_classroom_v8` database from IndexedDB structural version 6 to 7. ARC schema remains 8, the classroom runtime remains schema 7, and the application remains 0.18. The classroom interface loads but does not invoke this future service.

## Persisted authority

Stage 7 adds `activity_assessment_finalizations`, `assessment_results`, `gradebook_policy_versions`, `gradebook_entries`, `gradebook_entry_revisions`, `gradebook_posting_instances`, `gradebook_posting_memberships`, `gradebook_posting_events`, and `quarter_grade_snapshots`. The small Activity finalization store supplies the score authority absent from Stage 3; it does not duplicate Gradebook identity or current grade truth.

An `AssessmentResult` standardizes a finalized eligible ActivityAttempt, finalized Project rubric, or persisted WorkplaceWeekFinalization. Skill Challenges consume the exact ActivityVersion `60 / 75 / 90 / 100` conversion. Technical Assignments and Tests retain natural points. Practice cannot create an ordinary result, Projects use the Stage 4 rubric percentage, and Workplace uses Stage 6 normalized posting points. Results never store competency conclusions.

`GradebookEntry` is the stable student, enrollment, grading period and underlying item identity. Scored values exist only through append-first `GradebookEntryRevision` records. Better reassessments may append a replacement revision; worse results remain historical without lowering the accepted value. Project and Workplace corrections append revisions. Exempt creates no fake score.

## Policy and derived calculations

Versioned policy holds the WT/AWT weights: Skills 50%, Projects 25%, Technical 15%, and Workplace 10%. It also holds the A/B/C/D/F boundaries, NYA behavior, weekly coverage policy, and Quarter Close policy. There is no hidden floor.

Category averages, active weights, represented original weight, provisional course grade, and letter grade are rebuilt from current revisions. Technical uses total earned divided by total possible. Categories without legitimate scored entries remain NYA and active categories renormalize proportionally. No Grade Ready queue, category average, or current course grade is persisted.

## Manual external synchronization

`GradebookPostingInstance` represents a manually created school assignment. Compatible differentiated students can share the same period and source identity. `GradebookPostingMembership` links one student and Entry. Append-first `GradebookPostingEvent` records an instructor-confirmed Added, Posted, Updated, Marked Exempt, or corrected action. Internal authority alone never claims external posting.

The service derives `Create Assignment`, `Add Student`, `Update Grade`, or `Synchronized`. There is no external school-gradebook API.

## Weekly coverage and Quarter Close

Weekly coverage is derived by instructional-week identity and counts each legitimate Entry once regardless of revisions. Two or more is Sufficient. Fewer than two is Attention when legitimate circumstances may explain it, or Review when an unresolved or potentially legitimate assessment opportunity is explicitly represented.

Quarter Close preflight reports synchronization work, Pending Make-Ups, incomplete authority, active Project carry-forward candidates, NYA, unresolved Workplace finalizations, Override review, coverage concerns, and exceptions. It performs no automatic close.

Explicit instructor approval creates an immutable `QuarterGradeSnapshot` with policy, category results, authoritative revision IDs, grade, carry-forward, synchronization state, exceptions, actor and time. A correction appends a superseding snapshot and preserves the original. ARC Grade Complete and School Gradebook Synchronized remain separate. Policy may allow explicitly authorized unresolved synchronization, which is recorded rather than hidden. No historical v7 snapshots are fabricated.

## Boundaries

Stage 7 does not access or migrate `weld_v013`, photos, pilot data, or deployed state. It adds no Attendance, Pass Event, Supplemental Session, Artifact, photo, Booth, external API, Planning UI, or classroom UI capability. Production and Classroom Readiness are not achieved.
