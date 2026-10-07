# Production Academic Configuration Reconciliation 1

## Local authority

- Starting commit: `cb227e721c64d883fdf61d333530c181f3beedf2`
- Starting tree: `faf815688d6058272b0965ad1a9b74d76c49e5f3`
- Rollback: `rollback/pre-production-academic-configuration-reconciliation-1`
- Academic authority: Schema 7 / `V7_ONLY`
- Runtime revision: `stage2-production-academic-configuration-reconciliation-1`

This local engineering reconciliation replaces the unsafe partial academic-only coordinator. It does not record publication, physical execution, production mutation, Student authorization, package transition, activation, or authority transfer.

## Reviewed input contract

The coordinator requires two separately reviewable inputs:

1. explicit School Year, Semester, and Grading Period identities and ordered date boundaries, including the exact current Semester key;
2. a Schema 7 schedule snapshot projected only by `ArcV8ScheduleConfigurationMigration.project()`.

Calendar Event titles are not academic-boundary authority. Missing structured boundaries fail closed. Future Semester schedule and placements may remain absent until the instructor knows them.

The engineering surface may read the same-origin `weld_v013` key through `ArcV7ScheduleConfigurationCapture`. Capture performs one read, never writes or removes Schema 7 state, fails when live state is absent/unreadable, and emits only the schedule/configuration whitelist. Student and classroom transaction families are excluded. Pasted reviewed snapshots remain supported.

## Complete prepared foundation

After the existing Academic Cutover prerequisite and recovery gate succeeds, the prepared operation is bound to SHA-256 fingerprints for:

- structured academic input;
- captured/reviewed schedule snapshot;
- migration plan;
- operator, starting commit/tree, and rollback authority.

Any changed input or authority after preparation requires a new recovery package.

The eventual guarded apply uses existing owners in this order:

1. canonical WT/AWT Courses;
2. School Year;
3. reviewed Semesters and Grading Periods;
4. Section definitions;
5. Bell Schedules;
6. one unique default Weekly Schedule Mode with reviewed weekday mappings;
7. Calendar Events;
8. Date Overrides;
9. effective current-Semester Section Placements;
10. separate effective Planning Placement.

Source Bell, Section, and Semester identities are mapped deterministically in memory. Noninstructional overrides preserve provenance but omit an active Bell dependency. Static Section period/Semester values remain creation metadata; effective placements are schedule authority.

## Validation and recovery

Academic Administration commands apply the shared Schedule Cutover Closure projected-state postcondition. Backup/Recovery must report a healthy zero-error audit before success. The manifest remains `configured-pending-activation`, `V7_ONLY`, `academicAuthorityTransferred: false`, and `realStudentDataAuthorized: false`.

Any failure after the first write restores the verified pre-configuration recovery, closes/reopens storage, and compares every store count/checksum with the pre-configuration state. A parity failure becomes `CONFIGURATION_ROLLBACK_FAILED`.

## Remaining physical blocker

No production execution is authorized by this milestone. Physical preparation still requires instructor-approved structured School Year, Semester, and Grading Period boundaries. Event-title inference remains prohibited.

The deliberately retired historical Weekly Schedule Mode readback question remains `UNRESOLVED`.

## Repair 1 — local candidate

PACR1 Repair 1 closes the five independently reproduced review findings while preserving the original reconciliation architecture:

- Schema-7 capture now rebuilds every permitted compound family through an explicit deep whitelist. Unknown nested data is omitted, malformed present families fail closed, and capture still performs exactly one read with no Schema-7 write or fallback.
- Apply now revalidates every protected store's count and checksum, Student/Enrollment/Schedule Assignment absence, and academic-foundation absence immediately before its first write. Any live drift invalidates preparation, remains untouched, and requires a new recovery package.
- Every stale reviewed-input or operator/Git authority refusal invalidates preparation. The previous recovery cannot be reused after a stale refusal.
- School Year identity is explicit; missing, empty, or whitespace-only keys fail before preparation.
- Noninstructional Date Overrides are Bell-independent, while instructional overrides still require a known Bell. Duplicate normalized Bell source identities fail deterministically.

Direct tests also preserve successful current-Semester foundation creation, zero Student/Enrollment/Schedule Assignment records, pending-activation `V7_ONLY` manifest state, healthy Backup/Recovery audit, deterministic reopen, current editable fixture projection, and exact full-store rollback after every major post-write failure phase.

This repair remains a local candidate pending independent review. It did not publish, deploy, access Samsung or production data, configure academics, create Student data, activate v8, or transfer authority. Historical deliberately retired Weekly Schedule Mode readback remains `UNRESOLVED`.

## Repair 2 — local candidate

PACR1 Repair 2 closes independent-review finding `PACR1-R1-01` by making the verified recovery, prepare baseline, final prewrite validation, and preparation lifecycle one coherent authority:

- Preparation compares the verified recovery package's complete store-key/count/checksum inventory with the final prepare baseline before establishing reusable preparation. Divergence fails without restore and leaves the newer live state untouched.
- Apply runs the Student/Enrollment/Schedule Assignment and academic-foundation semantic gates first. Its complete-store backup/checksum comparison is then the final awaited revalidation immediately before the owner-write sequence.
- Any prewrite drift consumes preparation and leaves the intervening state untouched. Once apply enters the write/restore path, preparation is one-shot whether the write succeeds, rollback succeeds, restore throws, or rollback parity proof fails.

Direct negative tests reproduce recovery/baseline divergence, unrelated protected-store drift during the awaited apply summary, restore failure, and rollback-parity failure. The retained all-major-phase injection matrix continues to prove exact rollback parity when recovery succeeds. All Repair 1 findings and Schedule Cutover Closure authority remain intact.

This repair remains a local candidate pending independent review. It did not publish, deploy, access Samsung or production data, configure academics, create Student data, activate v8, dual write, or transfer authority. Historical deliberately retired Weekly Schedule Mode readback remains `UNRESOLVED`.
