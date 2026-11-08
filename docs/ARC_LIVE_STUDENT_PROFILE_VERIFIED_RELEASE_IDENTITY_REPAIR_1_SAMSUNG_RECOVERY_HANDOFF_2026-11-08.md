# ARC Live Student Profile Verified-Release Identity Repair 1 — Samsung Recovery Handoff

Date: 2026-11-08
Status: PROPOSED PHYSICAL PROCEDURE — NOT AUTHORIZED OR EXECUTED

## Preserved physical baseline

- The existing Samsung holds protected Live Classroom data, including one real Student and one Enrollment.
- Production P4–P10C and Academic authority are `V8_AUTHORITATIVE`.
- `realStudentDataAuthorized` is true; dual writing is false.
- IndexedDB remains version 14 with 74 stores.
- Post-failure database hashes were reported unchanged.
- The current worker fails closed because two retained verified releases share one accepted build identity.

No step below authorizes clearing storage, deleting caches, unregistering a worker, uninstalling ARC, selecting a cache by name, rewriting authority, or modifying a Student or Enrollment.

## Required off-device gates

Before any device action:

1. Independently accept the exact repair commit/tree and sanitized review package.
2. Publish only that accepted application using normal non-force Git operations; require candidate/main regression, Pages deployment, Pages live verification, exact 114-file authority/visual byte verification, and immutable Git identity.
3. Generate the canonical manifest from immutable published Git bytes and obtain independent compatibility acceptance. ARC must not self-approve the receipt.
4. Publish immutable manifest/receipt evidence first and the release-channel pointer second, using the actual evidence commit SHA. Validate the complete public distribution with unchanged production validators.
5. Before Apply, preserve and reverify fresh school-OneDrive recovery custody: upload, exact-byte download, SHA-256, package integrity, and isolated recovery validation. Retain the prior recoverable backup under the approved policy. No identifiable backup content belongs in review evidence.

## Exact first physical action requiring instructor confirmation

After all off-device gates pass, request separate instructor authorization for exactly **one guarded `ServiceWorker.updateRegistration` request on the existing ARC registration and scope**. This is the minimum non-destructive way to fetch the independently accepted worker whose build identity is distinct from both ambiguous caches.

The guarded request must:

1. Reconfirm the existing device, ARC scope, registration, active/waiting workers, controlled clients, protected database identity, authority markers, and hash-only Student/Enrollment preservation evidence.
2. Attach lifecycle and network diagnostics before the one update request.
3. Verify the fetched `sw.js` exact SHA-256 and source commit against the independently accepted publication.
4. Stop if the worker, scope, registration, source bytes, storage state, or lifecycle differs from the accepted plan.
5. Permit normal install/waiting behavior only. Do not invoke manual `skipWaiting`, launch/reload ARC, clear caches, or make a second request.

That one registration update request is the exact device action awaiting instructor confirmation. It is not authorized by the local repair task.

## Subsequent separately gated delivery

Only after the new worker is verified may ARC's unchanged verified-release protocol stage the exact accepted manifest/receipt closure. Staging must prove the named candidate cache, 114/114 exact assets, canonical manifest and receipt hashes, and `verified_waiting` sentinel without manual cache writes. Stop after staging for observation.

A later explicit instructor Apply must use ARC's release-bound Apply token. Natural activation is permitted only through that protocol. No second Apply, manual `skipWaiting`, or forced activation is allowed. After activation, attach to the existing target and verify normal startup, offline reopening, full cold restart, `active_healthy`, exact build/source identity, IDB 14/74 stores, unchanged authority markers, no dual write, and unchanged hash-only protected records.

The existing Student must then open without deletion or recreation, show the correct Course and Section, and render all profile tabs. Any identity, recovery, authority, storage, profile, or record-preservation mismatch is a mandatory stop.
