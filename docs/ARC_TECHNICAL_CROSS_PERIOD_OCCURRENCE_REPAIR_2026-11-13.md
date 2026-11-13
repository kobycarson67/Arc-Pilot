# Cross-period Technical occurrence repair

Date: 2026-11-13. Local isolated candidate only; no production, tablet or publication actions.
Base: 223c807a1d9242ddfcc473478d34ee20765a61be.

## Governing decision
The November 9 Technical repair explicitly used Section in occurrence identity, while it and the November 8 dual-period rule required shared Course Enrollment work. The current authorized repair narrowly supersedes Section-specific identity for matching Technical Assignment occurrences across two dated eligible placements of the same Enrollment. It does not generalize to Test, Practice, Skill Challenge or Project.
Different dates, content versions, labels, session keys and noncanonical explicit occurrence keys remain distinct. Both label and session are compared independently. Existing historical section-keyed records are read, not migrated, rewritten or deleted.

## Behavior
- Reuse matching active Technical StudentActivity for the same student/enrollment/version/date/repeat identity through another eligible placement.
- Mixed recipients create only new recipients; preserve shared recipients unchanged.
- All-reused request inserts no empty assignment, audit event, grade or evidence; assignment is null and response explicitly distinguishes created/reused rows.
- Same-section exact duplicate continues to reject atomically. A repeated mixed request with such a duplicate also rejects as before.
- UI feedback reports new and already-assigned counts rather than selected count.
- Academic adapter retains wrong-section rejection and propagates owner outcome metadata.

## Verification
- Focused owner: both placement directions, selected/whole-class mixed recipients, same label reuse, different enrollments, date/version/label/session/custom recurrence, no reuse outside eligible placement, invalid-batch rollback and other Activity type isolation.
- Focused adapter: wrong-section rejection and created/reused metadata, no Project side effect.
- Feedback unit tests: 5/5, including all-reused/mixed/new/legacy responses, errors and explicit occurrence label.
- Independent native IndexedDB acceptance: 12/12 in the dedicated isolated normal-shell profile. Both directions/mixed recipients, same-section abort, concurrent cross-period requests produce one create and one reuse, deliberate repeats, all-reused adapter no-write and wrong-section rejection. All unrelated stores unchanged, including grades/evidence/attendance. No runtime exceptions or dialogs.
- Native checks invoked real owners/adapters inside the current normal shell; this is not end-to-end physical clicking of the assignment dialog, and not Samsung acceptance.
- Full final JS/static gate totals recorded in the external result report.

## Remaining boundaries
Existing duplicates remain untouched. Withdraw -> reassign -> restore can reintroduce active historical duplicates under preexisting restoration rules; this repair makes no comprehensive uniqueness claim for restoration. Test/Practice/Challenge/Project semantics are unchanged. Production and release asset identities remain unchanged pending separate release authorization.

Next useful bounded sweep slice: repair the verified broken Dashboard Full Schedule route, then exercise its navigation/back flows; separately reconcile Administration/Curriculum read routes with current V8 owners rather than presenting legacy-gated paths as missing content.
