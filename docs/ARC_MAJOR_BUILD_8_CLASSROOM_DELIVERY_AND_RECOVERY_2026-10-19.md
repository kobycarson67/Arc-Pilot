# ARC Major Local Build 8 — Classroom Delivery and Recovery

**Status:** LOCAL CANDIDATE — independent review required
**Authority:** production P4–P10C remains `V7_ONLY`; real Student data remains unauthorized.

## Working result

Build 8 turns accepted recovery and Administration owners into usable local delivery workflows while preserving their authority boundaries.

### Complete Schema 8 recovery delivery

- Uses `ArcV8BackupRecovery` as the only Schema 8 backup and restore authority.
- Exports and verifies all 74 stores.
- Includes each `artifact_media_blobs` byte payload in the recovery package and binds each item to its size, artifact identity, and SHA-256.
- Refuses incomplete media, wrong store inventories, altered bytes, and invalid package checksums.
- Requires an exact instructor confirmation and `TASK_OWNED_NONPRODUCTION` environment for the new Build 8 restore wrapper.
- Creates an independently verified recovery point before restore and requires exact post restore package parity.
- Discloses that legacy still-V7 photo blob storage is outside the Schema 8 artifact-media package. Build 8 does not claim those bytes were migrated.

### OneDrive education-account boundary

Build 8 prepares a verified local file and a manual transfer checklist. ARC does not request or store Microsoft credentials, configure a tenant, perform automatic sync, claim institutional approval, or resolve retention and conflict policy. An instructor may transfer the exact file through an institution-approved OneDrive client and verify its SHA-256 before recovery.

### Administration delivery

- Upcoming-week lesson plans remain derived from calendar, Section, and pacing facts; unknown Lessons stay blank.
- SLO drafts contain recorded growth facts and empty human narrative fields.
- Grade and coverage reports remain reviewable and suitable for manual school-gradebook or administrative transfer.
- Each draft can be edited, validated as JSON, exported, printed, or saved as PDF.
- A combined package records explicit `false` values for submission, approval, school-gradebook posting, content acceptance, and invented assessment.

### Instructional review

WT and AWT draft collections can be searched and filtered by review unit and exported as course review packets. Packets include all unit reviews, exact shared Standard and competency identifiers, candidate Activity relationships, unresolved mappings, and authority boundaries. The 124 original Lessons remain `reference_only`; all replacement Lessons and Activities remain `DRAFT_INSTRUCTOR_REVIEW`.

### Production cutover

The accepted Build 7 production-shaped assessment remains inert and read-only. Build 8 adds no production writer, dual write, authority transfer, or real-Student permission. The task-owned unified P4–P10C verification path and exact rollback remain available for isolated rehearsal only.

## Remaining external and policy gates

1. Institution-approved OneDrive education tenant, retention, conflict, and recovery configuration.
2. Institutional FERPA/privacy review and real-Student authorization.
3. Deliberate migration or separately protected export of legacy still-V7 photo blobs.
4. Instructor acceptance of lesson and Activity draft content and exact mappings.
5. Separate production cutover authorization and Samsung physical acceptance.
