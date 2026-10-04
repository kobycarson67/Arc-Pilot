# ARC Academic Cutover Prerequisite Reconciliation 1 — Repair 1

Date: 2026-10-04
Status: Implemented locally; not published; no production execution
Normal classroom authority: Schema 7 / `V7_ONLY`

## Independent-review defect

The initial reconciliation candidate recognized the exact instructional store counts, package identity and event state, canonical WT/AWT Courses, intentional relationship absences, and protected Lesson policy. A content-only change that preserved those shapes could still pass. The candidate was therefore not accepted.

Repair 1 binds the accepted populated instructional-reference state to the canonical per-store SHA-256 checksums recorded by the existing verified Backup/Recovery authority. It does not add another hashing implementation or package truth.

## Integrity contract

After the existing count, package-owner, package-history, Course, intentional-absence, and Lesson-policy checks pass, preflight creates and readback-verifies the required recovery package. For the `accepted-instructional-reference` profile, it then requires the recovery manifest's `SHA-256` record count and checksum for:

- `courses`;
- all accepted Standard catalog, definition, and version stores;
- Essential Standard designations;
- Competency definitions and versions;
- Curriculum maps, versions, items, and Standard links;
- preserved Lesson definitions and versions;
- Lesson Standard and Competency links; and
- instructional package history.

The expected values are the accepted Samsung POST backup values supplied with this repair. Any missing manifest entry, wrong algorithm, changed count, or changed checksum fails with `REFERENCE_CONTENT_CHECKSUM_MISMATCH` and identifies the affected store.

Whole-package checksum is not used for this comparison because legitimate recovery export time and purpose change it. The existing Backup/Recovery service remains responsible for canonical serialization, per-store hashing, package readback verification, and package integrity.

The `empty-stage1` compatibility profile remains separately bounded and does not claim the accepted instructional-reference identity. Reviewed School Year, Semester, Grading Period, and Section records may coexist for a later separately authorized activation check because they are outside the frozen instructional-reference checksum set. Students, Enrollments, and Schedule Assignments remain prohibited.

## Verification evidence

The unchanged attached Samsung POST backup:

- file SHA-256: `bc886278406b2462b1c65b311c72b39e0bdacc6b9cc17af9b1ee981a6c5db509`;
- package-integrity SHA-256: `828cb95281c72bb2cdc58db97682e2ee7490eeb380564512b79b7ab6a89a4bd0`.

Read-only execution against that exact backup resolves `accepted-instructional-reference`. Changing only `curriculum_map_items[0].focus`, while preserving counts, package ID, event history, Courses, and Lesson policy, fails closed on `curriculum_map_items` with `REFERENCE_CONTENT_CHECKSUM_MISMATCH`.

Focused tests also alter content without changing count or binding in `standard_versions`, `competency_versions`, `lesson_definitions`, an instructional package-event payload, canonical Course lifecycle metadata, and `standard_catalogs`; every alteration fails on the affected store.

Production Academic Configuration `prepare()` still creates verified recovery and reaches review without configuration mutation. Existing academic, package, instructional-reference, Stage-2, and recovery protections remain in force.

## Export repair

The initial external review manifest was malformed by unsafe string interpolation. The Repair 1 export is generated with literal-safe content and validated before packaging for actual repository path, branch, commits, trees, rollback, changed paths, working-tree state, test results, absence of unresolved shell variables and unexpected control characters, complete SHA-256 inventory, zero Git-byte mismatches, and reconstructed Git tree equality.

## Preserved boundaries

No academic configuration, Student/Enrollment/Schedule Assignment data, package transition, event 13, Lesson acceptance, production or Samsung access, publication, deployment, normal-v8 activation, or authority transfer is authorized or performed. Normal ARC remains Schema 7 / `V7_ONLY`.
