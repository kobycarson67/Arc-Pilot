# ARC Stage 14 / Stage 2 Production Academic Configuration Coordinator

## Authority and bounded status

This local implementation begins at accepted checkpoint commit `9fbbb9ae19d587a3c2af564842ec9e204a95fd10`. It adds an engineering-only coordinator and surface for the next protected production checkpoint. It does not record any production execution, publication, Samsung acceptance, or academic authority transfer.

Academic authority remains `V7_ONLY`. Real student data remains prohibited. The normal Schema 7 classroom runtime and navigation remain unchanged.

## Authorized sequence

The coordinator is hard-bound to `arc_classroom_v8` and exposes four bounded operations:

1. Review instructor-entered School Year, Semester, Grading Period, Section, period, and approved schedule-context values without opening storage.
2. Revalidate the protected Schema 8 / IndexedDB 10 production authority through the accepted Stage 2 preflight and create a complete, readback-verified pre-configuration recovery package.
3. After exact operator and Git rollback confirmation, reconcile only the stable canonical Course records `arc-course-wt` / `WT` / `Welding Technology` and `arc-course-awt` / `AWT` / `Advanced Welding Technology`, then persist the reviewed academic hierarchy.
4. Read a deterministic configuration summary, including after closing and reopening storage.

The input has no calendar, quarter, period, or schedule defaults. These values must be entered by the instructor and pass containment, identity, ordering, and reference validation.

## Failure and recovery behavior

The coordinator refuses to prepare when Student, Enrollment, Schedule Assignment, or existing academic-configuration records are present. It refuses configuration without the exact confirmation phrase and operator, starting commit, starting tree, and rollback reference.

If any write fails after configuration begins, the coordinator restores the verified pre-configuration recovery package before reporting the original failure. A recovery failure replaces success with `CONFIGURATION_ROLLBACK_FAILED`.

The resulting manifest remains `configured-pending-activation`, `V7_ONLY`, `academicAuthorityTransferred: false`, and `realStudentDataAuthorized: false`.

## Engineering surface and isolation

The engineering surface is `engineering/arc_v8_production_academic_configuration.html`. It is absent from normal ARC navigation. Its runtime revision is `stage2-production-academic-configuration-1` and its assets are query keyed and included in the service-worker and Pages parity manifests.

The surface does not expose Student, Enrollment, Schedule Assignment, activation, v7 write shutdown, dual writing, authority transfer, fixture creation, cleanup, or real-student-data controls.

## Next boundary

Publication is not part of this commit. Before physical use, the exact candidate must receive separate publication authorization, be published through the established conservative GitHub Pages path, pass public Git-blob parity and service-worker checks, and visibly report the accepted build and runtime revision.

On Samsung Chrome, the instructor must first use the read-only summary to revalidate the previously initialized protected production authority. Configuration may proceed only after the verified recovery package downloads and its checksum is recorded. The instructor then enters the approved academic values and provides the exact configuration confirmation. Reopen readback must match the applied summary. No Student records or academic activation may follow in that checkpoint.
