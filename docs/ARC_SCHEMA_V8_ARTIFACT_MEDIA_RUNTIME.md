# ARC Schema v8 Stage 9 — Artifact and Student-Work Media Runtime

Stage 9 advances isolated `arc_classroom_v8` storage from IndexedDB structural version 8 to 9. ARC schema remains 8, classroom runtime remains schema 7, and application version remains 0.18. The classroom interface loads but does not invoke this prospective service.

## Artifact, blob, and link authority

Stage 9 adds `artifacts`, `artifact_media_blobs`, and `artifact_links`. Artifact stores one student's immutable media identity and descriptive metadata. The blob store holds binary bytes under stable Artifact/media identity. ArtifactLink independently relates one Artifact to StudentActivity, ActivityAttempt, Project, Build, checkpoint event, rubric assessment, EvidenceSource, or Student Work Library visibility.

Media ingestion accepts Blob, ArrayBuffer, or typed-array bytes regardless of camera or upload acquisition. SHA-256 is calculated through Web Crypto before persistence. Artifact metadata, media bytes, and required initial links commit in one IndexedDB transaction. Any metadata, blob, or link failure aborts the transaction and reports failure.

Filename and checksum are not identity. Separate ingestion of identical bytes creates separate Artifacts. Exact duplicate active links are rejected, while one Artifact may retain multiple distinct links.

## Integrity and relationships

All targets use stable IDs and are validated against the Artifact's Student. Build, checkpoint, and rubric targets validate Project lineage. ActivityAttempt validates StudentActivity lineage. EvidenceSource validates student ownership. A Project or checkpoint attachment never creates Evidence, and an EvidenceSource link never changes EvidenceRecord level or qualification.

Optional Supplemental acquisition context validates Student, home Enrollment, session date, and occurrence time. Scheduled photos require no Supplemental Session, and physical context never changes academic ownership.

Student Work Library is a deterministic projection of active Artifacts and visibility links. No duplicate student photo collection is persisted.

## Protection and corruption handling

Unprotected accidental Artifacts may be hard deleted with explicit reason; metadata, blob, and active links are removed atomically. Activity, Project, checkpoint, rubric, and Evidence relationships protect historical media. Protected links need explicit correction authority to archive, protected blobs cannot be replaced, and ordinary visibility removal never destroys media.

Unprotected replacement updates bytes, size, MIME type, checksum, revision, and provenance atomically. Missing media, checksum mismatch, and size mismatch produce structured errors without deleting metadata.

Read-only audit reports metadata without blob, blob without metadata, checksum mismatch, broken targets, Student lineage mismatch, and duplicate active link identity. Enumeration and readback APIs expose Artifacts, Links, blob records, media bytes, checksums, sizes, and MIME types for a future backup stage. Stage 9 does not implement export or restore.

## Boundaries

Stage 9 does not access or migrate `weld_v013`, `photoEvidence`, or `WeldingClassroomPhotoStore`. It adds no Booth runtime, production backup/archive/restore, camera UI, or classroom UI conversion. Production and Classroom Readiness are not achieved.
