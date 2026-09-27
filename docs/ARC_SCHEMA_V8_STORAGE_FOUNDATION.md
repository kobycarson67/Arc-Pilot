# ARC Schema v8 Storage Foundation

Implementation Stage 1 establishes storage infrastructure only. All classroom domains continue to read and write Schema v7 under `localStorage["weld_v013"]`. Loading the Stage-1 module has no persistence side effect; v8 opens only through explicit API invocation.

## Database identity

- Technology: browser-native IndexedDB
- Database: `arc_classroom_v8`
- ARC schema family: `arc-classroom`
- ARC domain schema version: `8`
- Stage-1 IndexedDB structural version: `1`; Stage 2 advanced the same database to `2`, Stage 3 to `3`, Stage 4 to `4`, and Stage 5 advances it in place to `5`

The ARC domain schema version describes ARC's conceptual persisted authority. The IndexedDB version is only the ordered browser database-structure transition number. They are recorded separately and must not be treated as interchangeable.

## Infrastructure stores

- `metadata`: database identity, creation time, schema family/version, IndexedDB version, last successful upgrade, build context, and initialization state.
- `migration_log`: successful ordered IndexedDB structure transitions.
- `infrastructure_records`: explicitly non-domain infrastructure/development records used to prove transaction behavior. It is not Student, Activity, Project, Evidence, Gradebook, or other classroom authority.

Stage 1 created no classroom-domain stores. Stage 2 subsequently adds the bounded academic stores documented in `ARC_SCHEMA_V8_ACADEMIC_FOUNDATION.md`; the infrastructure boundaries in this document remain authoritative.

## Identity and writes

`ArcV8Storage.generateId()` creates RFC 4122 version-4 UUIDs through `crypto.randomUUID()` or a `crypto.getRandomValues()` fallback. It never derives identity from names, titles, periods, array positions, or timestamps alone.

The storage API exposes explicit `open`, `close`, `read`, `add`, `put`, `delete`, and multi-operation read-write transactions. Calls resolve only after the IndexedDB transaction completes. Request, transaction, open, metadata, blocked-upgrade, newer-version, and reset failures reject with structured `ArcV8StorageError` codes. No volatile memory fallback claims that durable persistence succeeded.

`putIfRevision` supplies optimistic revision checking for records that need cross-tab lost-update protection. Compound writes use one IndexedDB transaction.

Opening and reading are read-safe. Initialization creates only required infrastructure metadata during the version upgrade transaction. Normal reads and rendering never normalize or rewrite persisted records.

## Upgrade and concurrency model

IndexedDB `onupgradeneeded` owns ordered structural transitions. The initial `0 → 1` transition creates the three infrastructure stores and atomically records database and successful-migration metadata. Missing paths and incompatible newer databases fail explicitly. IndexedDB abort semantics roll back a failed structural upgrade; therefore a failed attempt may not be writable inside the database it failed to create or upgrade, and the surfaced recovery-required error is the external authority for future recovery UI/logging.

Each connection handles `versionchange` by closing itself immediately. Blocked upgrades and resets are surfaced instead of waiting silently. A browser `BroadcastChannel` announces connection, stale-connection closure, blocked, and reset events when available; IndexedDB behavior remains authoritative when BroadcastChannel is unavailable.

## Development reset

`resetDevelopmentDatabase()` explicitly deletes only `arc_classroom_v8`. It does not inspect or delete `weld_v013`, v7 recovery keys, `WeldingClassroomPhotoStore`, simulation storage, session/local-storage preferences, or service-worker caches. Opening a newer build never invokes reset.

## Readiness boundary

This foundation does not switch the classroom runtime to v8 and does not reset or migrate pilot data. Production/Classroom Readiness has not been achieved. Domain stores, complete media-aware backup/restore, recovery UI, domain integrity validation, physical-device verification, and subsequent approved implementation stages remain required before real student production data may enter v8.
