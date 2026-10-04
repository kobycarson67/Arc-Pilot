# ARC Academic Cutover Prerequisite Reconciliation 1

Date: 2026-10-04
Status: Implemented locally; not published; no production execution
Normal classroom authority: Schema 7 / `V7_ONLY`

## Purpose

The Stage 14 academic-cutover preflight previously classified every nonacademic, noninfrastructure v8 record as later-domain data. That rule protected the original empty Stage-1 foundation, but it also rejected the accepted instructional-reference package that now exists in protected production.

This repair replaces that broad emptiness rule with an explicit prerequisite classification. It recognizes the historical empty Stage-1 profile and the exact approved instructional-reference profile. It continues to reject all classroom transactions and any partial, foreign, altered, or expanded instructional state.

## Accepted instructional-reference profile

The accepted package ID is `ae06a3f8-cd1b-4a2a-943f-2f3d4e1f3f3b`. Its required populated stores and exact record counts are:

| Store | Count |
|---|---:|
| `standard_catalogs` | 2 |
| `standard_catalog_versions` | 2 |
| `standard_definitions` | 29 |
| `standard_versions` | 29 |
| `essential_standard_designations` | 10 |
| `competency_definitions` | 60 |
| `competency_versions` | 60 |
| `curriculum_maps` | 2 |
| `curriculum_map_versions` | 2 |
| `curriculum_map_items` | 56 |
| `curriculum_item_standard_links` | 80 |
| `lesson_definitions` | 124 |
| `lesson_versions` | 124 |
| `lesson_version_standard_links` | 228 |
| `lesson_version_competency_links` | 51 |
| `instructional_content_packages` | 12 |

`curriculum_item_competency_links`, `lesson_version_curriculum_links`, and `lesson_version_activity_links` must remain empty. The package history must contain exactly sequences 1 through 12 for the accepted package, event 12 must be `PACKAGE_AVAILABLE`, and the owning package service ordinary-read gate must resolve the package as `available`.

The Course authority must contain exactly:

- `arc-course-wt` / `WT` / `Welding Technology`
- `arc-course-awt` / `AWT` / `Advanced Welding Technology`

All 124 preserved Lesson Versions must remain `reference_only`, with `ordinarySchedulingEligible=false`, `autoBuildEligible=false`, and no `teachingGuide` field.

## Explicit rejection boundary

The repaired preflight refuses:

- every Student, Enrollment, or Schedule Assignment record;
- Project, Activity, Evidence, Workplace, Safety, Behavior, Gradebook, Attendance, Pass, Artifact, Booth, pacing, assessment, and other classroom transaction/domain records;
- any changed approved store count;
- any foreign `importPackageId` found on an instructional record;
- any package event 13, missing event, wrong sequence, wrong package identity, unavailable package, or package history whose event 12 is not `PACKAGE_AVAILABLE`;
- any populated relationship frozen as intentionally absent;
- any Lesson that becomes ordinary-scheduling eligible, Auto Build eligible, accepted rather than reference-only, or gains fabricated teaching guidance;
- any Course set other than the exact canonical WT/AWT pair for the accepted instructional profile.

Reviewed School Year, Semester, Grading Period, and Section configuration may coexist for a later separately authorized activation check. Students, Enrollments, and Schedule Assignments remain prohibited.

## Historical compatibility

The original empty Stage-1 profile remains explicitly identifiable as `empty-stage1`. It may contain no Courses or the exact canonical WT/AWT pair. This compatibility does not permit partial instructional content or classroom transactions.

The original initialization and reconciliation manifests remain historical authority. The repair does not rewrite their original IDB/store expectations or `importedRecordCount=0` record.

## Production configuration boundary

The existing protected Production Academic Configuration engineering page now loads the already existing instructional-content package owner before the academic-cutover service. Its preparation path can therefore validate the accepted reference package, create the required verified recovery package, and reach instructor review without configuring academics or writing any record.

No configuration was entered or applied in this milestone. No Student, Enrollment, Schedule Assignment, authority-transfer, package-availability, Samsung, production, publication, or deployment action occurred.

## Evidence

The supplied read-only Samsung post-reference backup was verified at SHA-256 `bc886278406b2462b1c65b311c72b39e0bdacc6b9cc17af9b1ee981a6c5db509`; its internal package checksum is `828cb95281c72bb2cdc58db97682e2ee7490eeb380564512b79b7ab6a89a4bd0`. Direct read-only execution of the repaired preflight against that backup resolved `accepted-instructional-reference`, package sequence 12, and left the file hash unchanged.

Focused tests cover exact acceptance, historical empty compatibility, all prohibited classroom transaction classes, count/package/history deviations, Lesson policy, intentional absences, canonical Courses, configurable academic coexistence, recovery creation, and nonmutating Production Academic Configuration preparation.

## Remaining boundary

This checkpoint repairs prerequisite recognition only. It does not authorize Production Academic Configuration execution, academic activation, Student data, normal v8 classroom authority, v7 write shutdown, dual write, Stage 3, publication, deployment, or Samsung execution.
