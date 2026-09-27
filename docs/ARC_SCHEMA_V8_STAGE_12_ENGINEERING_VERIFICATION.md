# ARC Schema v8 Stage 12 — Engineering Verification Architecture

Stage 12 retains ARC schema 8 and IndexedDB structural version 10. It adds no classroom domain and does not connect the schema-v7 classroom interface to v8.

The explicit engineering page `engineering/arc_v8_verification.html` uses only `arc_classroom_v8_engineering_verification`. The storage factory defaults remain `arc_classroom_v8`; the harness asserts the engineering identity before every destructive operation. The page is absent from normal classroom navigation and displays No Real Student Data, Not Classroom Runtime, and readiness warnings.

The deterministic test-only fixture is created through v8 service APIs. It includes WT and AWT academic contexts, similar-name Students, Taylor Reed's Welding Coupon Holder Project and checkpoint history, Booth 4, and Artifact media. Automated integration expands representative Attendance, Supplemental, Workplace/Safety, Evidence, Gradebook, reassessment, posting, and protection coverage through the accepted domain services.

Four ephemeral adapters compose Student Profile, Fast Roster, Class Forecast, and Booth Manager summaries from current Project and Booth services. They persist no projection state and must return identical Taylor identity, academic ownership, Project, checkpoint, need, and Booth values.

The destructive rehearsal creates and readback-verifies a complete Stage 11 package, fingerprints store and media checksums plus selected projections, resets only the isolated verification database in Development mode, restores, audits, and compares exact parity. Failure rehearsal covers malformed input, media corruption, broken references, staging failure, activation failure, and recovery-package availability. Protected-mode rehearsal proves persistence across reopen and blocks ordinary reset.

The engineering checkpoint does not include Samsung execution. Production Readiness and Classroom Readiness are not achieved. Samsung Physical Verification remains PENDING INSTRUCTOR. A separate deployment authorization is required if the instructor needs the harness hosted rather than opened from an already authorized local/test origin.

Fixture Initialization Repair 1 preserves Stage-1 ID ownership: the storage instance owns `generateId`, while the opened database connection owns durable CRUD and transaction operations. The engineering verification service now supplies repositories an explicit composite interface instead of assuming the opened browser connection owns ID generation. Browser-shaped regression coverage keeps `generateId` absent from the opened connection and proves full fixture initialization succeeds.
