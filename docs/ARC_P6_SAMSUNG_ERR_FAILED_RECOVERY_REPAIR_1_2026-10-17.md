# ARC P6 Samsung `ERR_FAILED` Recovery Repair 1

**Date:** 2026-10-17  
**Status:** local candidate for independent review  
**Starting publication:** `37fe675356469c6ba6158ddc73473686d143093d` / `a1cc9c99ab07d2e2261e766a466137ee2b29a6d2`

## Incident and reproduced failure

The physical Samsung reported `ERR_FAILED` immediately after P6 Repair 1 Apply. The device was not inspected or changed during this task, so its exact thrown exception remains unobserved.

The published service worker had the same availability defect in both fetch branches: a rejection from verified-release discovery escaped `respondWith()`. Installed Edge reproduced that failure family under `/Arc-Pilot/` by applying the exact P6 publication, preserving a fictional Schema 8 / IDB 14 / 74-store state, and introducing a malformed recovery-selection record. The published worker failed to complete a new document load and recorded `net::ERR_FAILED` resource failures.

## Bounded repair

- Navigation and asset fetches now always resolve to a response.
- A recovery-selection error may bypass only the selection record and only after the active worker independently revalidates its exact primary verified release.
- The primary release still requires its canonical manifest, receipt, closure, complete asset hashes, build identity, and active lifecycle sentinel.
- If the primary release cannot be revalidated, ARC returns an explicit no-store 503 response. It does not fall back to network files, a legacy cache, or a mixed release.
- A current-build cache with missing or invalid routing metadata also fails closed. Only a true preverified legacy installation retains the established network/cache bootstrap behavior.
- Release closure remains exactly 103 authority assets and 11 reviewed visual assets.

## Browser evidence

The repaired working tree passed the exact P6-to-candidate installed Edge transition at `/Arc-Pilot/`, one explicit Apply, injected recovery-selection failure, three full browser cold restarts, an offline restart, and task-profile cleanup. The injected failure routed the exact revalidated primary release. The rehearsal retained:

- Schema 8 / IDB 14 / 74 stores;
- `V8_AUTHORITATIVE` academic authority;
- P5-P10 `V7_ONLY` transaction authority;
- `realStudentDataAuthorized: false`;
- exact legacy-state SHA-256;
- verified backup and restore with exact per-store checksum parity.

All browser data was fictional and task-owned. Samsung and production were not accessed.

## Physical recovery boundary

This candidate does not prove that publishing alone can recover the already inaccessible Samsung. The active published worker may prevent the page that normally stages and applies a replacement from loading. After independent acceptance and guarded publication, a separately authorized device recovery must first inspect the active worker, primary release cache, recovery-control record, and existing recovery custody without clearing site data. Any mutation must be limited to an independently reviewed action supported by those observed facts. Uninstalling ARC, clearing Chrome data, deleting caches broadly, restoring a backup speculatively, or transferring authority remains prohibited.

No publication, release-evidence provisioning, Samsung action, protected-data mutation, real-Student authorization, or authority transfer occurred.
