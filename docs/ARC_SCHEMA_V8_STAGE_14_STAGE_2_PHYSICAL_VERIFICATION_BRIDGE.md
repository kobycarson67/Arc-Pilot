# ARC Stage 14 — Stage 2 Physical Verification Bridge

## Status

The engineering bridge is implemented locally. Academic classroom authority remains `V7_ONLY`; production activation and Samsung physical verification remain pending. Real student production data is not authorized.

## Boundaries

The engineering page `engineering/arc_v8_stage2_verification.html` is absent from classroom navigation. It separates read-only inspection and explicitly confirmed Stage 1 production initialization for `arc_classroom_v8` from fictional academic verification in `arc_classroom_v8_stage2_verification`.

The verification bridge orchestrates the production `ArcV8Storage`, `ArcV8Academic`, `ArcV8AcademicCutover`, `ArcV8ProductionInitialization`, and `ArcV8BackupRecovery` APIs. It does not define another academic model and does not add methods to an opened storage connection. Generated identities remain owned by the storage instance.

## Verification authority

The isolated fixture contains stable WT/AWT Courses, one School Year, one Semester, two Grading Periods, two Sections, and two fictional duplicate-name Students with distinct generated UUIDs. It supports Enrollment, effective roster projection, a failed atomic move rehearsal, a successful effective-dated Section move, reopen verification, backup, restore, and cleanup.

Cleanup is hard-bound to `arc_classroom_v8_stage2_verification`, requires the exact phrase `DELETE STAGE2 VERIFICATION`, creates a verified recovery package, and compares protected authority snapshots before and after deletion. It cannot target `arc_classroom_v8`, `arc_classroom_v8_engineering_verification`, `weld_v013`, or `WeldingClassroomPhotoStore`.

Protected snapshot equality includes database existence and identity plus the database-local IndexedDB version, store inventory, record counts, ARC metadata, infrastructure records, and the exact `weld_v013` local-storage value. The inspector's `knownDatabases` field is excluded because it is a global browser discovery observation: deleting the isolated verification database legitimately changes that list for every inspected database without changing their owned authority. Any other inspector field is rejected as unclassified. A real mismatch remains fail-closed as `ISOLATION_VIOLATION` and reports a minimal deterministic diff containing the protected authority, exact path, before value, after value, and owned-state classification.

## Publication checkpoint

The page, controller, production initialization module, academic cutover module, and their v8 dependencies are prepared for GitHub Pages and service-worker caching. This implementation does not publish them. After a separately authorized publication, Samsung verification must confirm database identity, duplicate-name UUID separation, roster parity, failed and successful move behavior, reload persistence, backup/restore, and isolated cleanup before Stage 2 can be accepted physically.

Production Readiness and Classroom Readiness are not achieved.
