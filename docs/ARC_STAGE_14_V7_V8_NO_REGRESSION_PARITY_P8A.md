# Stage 14 P8A — Behavior/Incident Structural Foundation

## Authority and boundary

P8A begins from P7 commit `abd1d885c0fa1f49771f0d8617b4aeb4ef444317`. ARC logical schema remains 8. IndexedDB structural authority advances from 10 to 11 and the exact store manifest advances from 53 to 54 stores. Academic authority remains `V7_ONLY`.

This stage supplies the missing durable Behavior/Incident authority. It does not resume P8 Workplace/Safety/Behavior UI conversion, connect normal ARC UI, transfer classroom authority, mutate production, authorize real Student data, or publish the build.

## Structural migration

The ordered `indexeddb-10-to-11` migration adds only `behavior_events`. A successful migration records `storesAdded: ['behavior_events']`, updates database metadata to IndexedDB 11, and leaves the logical schema at 8. No Workplace or Safety row is copied, reclassified, or interpreted as Behavior.

Existing stores and records remain unchanged. The migration test begins with a representative version-10 database containing the complete prior 53-store manifest and an existing Booth record, then proves the record remains byte-equivalent in meaning while the new Behavior store starts empty. An injected store-creation failure proves the prior version, metadata, migration log, store inventory, and existing record remain unchanged. Browser IndexedDB provides the atomic version-change transaction for the real upgrade.

## BehaviorEvent contract

`behavior_events` uses `behaviorEventId` as its stable key. Its indexes are:

- `by_student` → `studentId`
- `by_enrollment` → `enrollmentId`
- `by_section` → `sectionId`
- `by_date` → `schoolDate`
- `by_occurred_at` → `occurredAt`
- `by_category` → `category`
- `by_severity` → `severity`
- `by_workplace_event` → `relatedWorkplaceEventId`
- `by_safety_event` → `relatedSafetyEventId`
- `by_lifecycle` → `lifecycle`

The repository requires stable Student and Enrollment scope and validates an optional Section against that Enrollment. It stores occurrence date/time, private instructor documentation, the existing instructor-supplied category, severity, action, description, and follow-up values, optional explicit Workplace/Safety links, lifecycle, revision, operator, reason, and timestamps. Optional links must share the exact Student and Enrollment lineage.

Corrections append a new event and supersede or void the prior event with an explicit reason and optimistic revision check. Student and class projections deterministically separate current events from complete history. Every BehaviorEvent declares `privateInstructorDocumentation: true` and `gradeEffect: 'none'`. P8A defines no disciplinary taxonomy, severity scale, grade consequence, Safety escalation, or institutional policy.

## Recovery and compatibility

Backup, export, package verification, store checksums, integrity audit, restore staging, atomic activation, readback, and parity verification now cover all 54 stores. Behavior relationships to Student, Enrollment, optional Section, and optional Workplace/Safety links are audited. Backup filenames identify `schema8-idb11`.

The already initialized Samsung production database remains Schema 8 / IndexedDB 10 / 53 stores until a separately authorized published build first opens it. Its historical initialization manifest remains valid evidence that it was initialized at version 10 with 53 stores. After an authorized atomic upgrade, production inspection requires the live database metadata and store manifest to be version 11 with 54 stores while recognizing that historical initialization manifest.

Before any physical production upgrade, the instructor must authorize and verify a complete pre-upgrade recovery package from the current protected version-10 database. Publication must then be separately authorized for the exact tested P8A commit/tree. The first production open must be bounded to the structural upgrade, followed by exact metadata/store inspection, migration-log readback, zero-record confirmation for `behavior_events`, integrity audit, complete version-11 recovery/readback verification, protected-reset refusal, and confirmation that `V7_ONLY`, v7 data, photo authority, engineering data, and real-data authorization remain unchanged. A blocked, interrupted, mismatched, unhealthy, or incomplete result stops the procedure and uses the verified pre-upgrade recovery authority.

## Parity state

The frozen `behavior-incidents` row advances only to `service-ready` based on local structural, repository, migration, and recovery evidence. It is not UI-connected, behaviorally verified on normal ARC, Samsung verified, or accepted. Workplace and Safety receive no new P8 conversion claim from this structural stage.

## Next boundary

Full P8 may resume only after explicit publication and protected Samsung production-upgrade authorization, successful physical upgrade verification, and confirmation of the exact 54-store recovery authority. P8 must then reconnect the retained Workplace, Safety, and Behavior/Incident workflows through exclusive adapters without dual writing or independent academic scope reconstruction.
