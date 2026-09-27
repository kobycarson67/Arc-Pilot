# ARC Schema v8 Stage 14 — Cutover Implementation Stage 1

## Production initialization and protection foundation

This bounded implementation provides explicit tooling for the first implementation stage authorized by the Stage 13 Classroom Integration and Cutover Design Authority. It does not initialize a production database as part of repository verification and is not loaded by the normal classroom, service worker, or PWA shell.

## Authority and boundaries

- Exact production database identity: `arc_classroom_v8`
- ARC schema: 8
- IndexedDB structural version: 10
- Exact store inventory: 53 stores from `ArcV8BackupRecovery.EXPECTED_STORES`
- Classroom authority: `V7_ONLY`
- Classroom authority transferred: false
- Real student production data authorized: false
- Reusable content imported: false
- Classroom transactions imported: false

The coordinator never reads or writes `weld_v013` or `WeldingClassroomPhotoStore`. It does not import students, fixtures, simulation data, engineering data, reusable instructional content, Project Bank content, competency catalogs, or classroom transactions.

## Explicit API

`src/arc_v8_production_initialization.js` exports `ArcV8ProductionInitialization.create(options)`.

The returned service exposes:

- `inspect()` — performs non-upgrading inspection of the exact production database identity;
- `initialize(authority)` — initializes only after inspection proves the production identity is absent, or deterministically verifies an already completed Stage 1 authority;
- `constants` — exposes the exact database, schema, store, exclusion, manifest, and `V7_ONLY` contracts.

The required authority object records the operator plus exact starting commit, tree, and rollback reference. The service refuses initialization without all four values.

No normal classroom code imports this module. A later separately authorized operational procedure must supply the verified authority and invoke it deliberately.

## Existing-database safety

Before opening the production storage service, the native inspector uses `indexedDB.databases()` and opens an existing database without a requested version. It does not run an upgrade.

An existing database is accepted only when it is already a completed Stage 1 authority with:

- the exact database identity;
- IndexedDB version 10;
- the exact 53-store inventory;
- valid Schema 8 metadata;
- zero records in every classroom-domain store;
- the completed initialization manifest;
- the zero-import reconciliation manifest;
- `Production/Classroom Protected` authority.

Any unrecognized database, incompatible schema/version, mismatched store inventory, missing manifest, missing protection, or classroom-domain record causes refusal without overwrite. If safe database enumeration is unavailable, initialization refuses rather than opening the production identity speculatively.

## New-database sequence

1. Prove that `arc_classroom_v8` is absent.
2. Use `ArcV8Storage` to create Schema 8 / IndexedDB 10 with the established 53-store structure.
3. Verify storage constants, metadata, store inventory, zero classroom-domain records, and database-wide integrity.
4. Use `ArcV8BackupRecovery` to create and read back the pre-protection recovery package.
5. Atomically write three infrastructure records:
   - `production-v8-initialization-manifest`;
   - `production-v8-reconciliation-manifest`;
   - `database-protection` in `Production/Classroom Protected` mode.
6. Close and inspect the database through the non-upgrading inspector.
7. Reopen through `ArcV8Storage` and repeat identity, store, empty-authority, and integrity verification.
8. Create the initial protected recovery point and verify its media inventory, per-store SHA-256 checksums, completed-package checksum, and serialized readback.
9. Prove that ordinary development reset returns `PROTECTED_DATABASE`.

The initialization manifest preserves `V7_ONLY`, records no classroom authority transfer, and explicitly denies real-student-data authorization. The reconciliation manifest records zero imports and names the excluded engineering, simulation, pilot, test, and fictional-transactional data classes.

## Atomic and failure behavior

The three initialization/protection records are committed in one infrastructure transaction. A failure before that transaction completes removes only the newly created, previously proven-absent database. It never touches v7 storage or any engineering/test database. A completed protected authority is retained and can be deterministically verified on reopen.

## Verification authority

`tests/arc_v8_production_initialization.test.js` covers:

- exact database identity;
- Schema 8 and IndexedDB 10;
- exact 53-store inventory;
- empty classroom-domain authority;
- zero excluded identities and zero imported records;
- v7 photo and localStorage isolation;
- engineering/test database isolation;
- complete recovery package, empty media coverage, SHA-256, readback, and integrity audit;
- initialization and reconciliation manifest contents;
- protected-mode reset refusal;
- unexpected existing records and unrecognized database refusal;
- incompatible metadata and store-manifest refusal;
- required operator and rollback authority;
- atomic transaction failure and cleanup of only a newly created database;
- deterministic reopen verification;
- absence from normal classroom and service-worker runtime.

## Samsung requirement

This implementation does not alter browser lifecycle behavior. It adds an explicit module that is not loaded by `index.html`, `sw.js`, or the installed PWA. No Samsung physical verification is required for this stage.

## Status

- Classroom Authority: **V7_ONLY**
- Production Readiness: **NOT ACHIEVED**
- Classroom Readiness: **NOT ACHIEVED**
- Real Student Production Data: **NOT AUTHORIZED**
