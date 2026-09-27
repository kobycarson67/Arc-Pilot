# ARC Schema v8 Stage 11 — Backup, Integrity, Restore, and Recovery Runtime

Stage 11 retains IndexedDB structural version 10. It adds no object store: portable packages are external authority and the durable protection-mode guard uses the existing `infrastructure_records` store. ARC schema remains 8, classroom runtime remains schema 7, and application version remains 0.18. The classroom shell passively loads this service but does not invoke it.

## Portable package format

Format `arc-v8-portable-backup`, version 1, is canonical JSON (`application/json`). Its manifest records schema family/version, IndexedDB version, database identity, application/build provenance, export time and purpose, all 53 expected Stage 10 stores, record counts, SHA-256 store checksums, Artifact media inventory, byte sizes, per-blob SHA-256 checksums, audit summary, and a SHA-256 checksum over the complete package with its checksum field blanked during calculation.

Every expected store has a payload, including zero-record stores. Records preserve stable IDs, nulls, numbers, strings, arrays, objects, lifecycle, and provenance. Artifact blob bytes are encoded as base64 with exact blob and Artifact identities. Derived Forecast, current grade, and other rebuildable projections are not added as payloads.

Export reads all expected stores through one IndexedDB transaction, audits them, verifies Artifact bytes, builds the package, serializes it, independently parses it, and verifies inventory, IDs, counts, store checksums, media sizes/checksums, and package checksum before reporting success. A created file alone is never success.

## Integrity and compatibility

The read-only audit covers missing parents and lineage across academic, Activity, Project, Evidence, Workplace/Safety, Gradebook, Attendance/Supplemental, Artifact/media/link, and Booth authority. It also reports missing/orphan/corrupt media and duplicate logical identities. It never repairs or deletes records.

Backup health is `Verified Healthy`, `Verified With Warnings`, or `Recovery Backup — Integrity Errors`. A damaged database may still be preserved as a clearly marked recovery backup. Compatibility inspection verifies the package before reporting format, schema, build, inventory, direct-restore support, upgrade requirement, newer-package incompatibility, and audit state. Unknown stores and newer schemas are never discarded or downgraded.

## Restore and recovery

Normal restore first verifies compatibility and package integrity, then audits the staged decoded payload. Before any active record changes, ARC creates and readback-verifies a complete media-inclusive backup of the current database. Failure to create that recovery point stops restore.

Activation uses one IndexedDB transaction spanning all 53 stores: it clears and repopulates every store together, so a write or activation failure aborts the transaction. IndexedDB cannot make an external package and a database replacement one cross-system transaction; the verified recovery package remains the explicit recovery point. After activation, ARC re-exports and compares store checksums, counts, IDs, and media parity. A post-commit parity failure is reported with the verified recovery package rather than claimed as success.

Future schema-upgrade orchestration must call `requireVerifiedUpgradeRecovery` before transforming real classroom data. No hypothetical migration is implemented.

## Protection and boundaries

Storage protection mode defaults to `Development`. Explicit instructor authority can persist `Production/Classroom Protected` in `infrastructure_records`; it survives reopen and blocks ordinary `resetDevelopmentDatabase()`. There is no casual protected-mode reset bypass.

Packages remain local and user controlled. Stage 11 performs no network request, telemetry, OneDrive/cloud transfer, or v7 backup/migration. Package encryption is deferred until approved user key-management requirements exist; no custom encryption is used. Classroom UI remains v7. Production and Classroom Readiness are not achieved until Stage 12 physical and recovery rehearsal succeeds.
