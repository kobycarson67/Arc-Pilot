# ARC Mixed-Asset Routing Repair 1

**Date:** 2026-10-18

**Status:** local candidate for independent review

**Starting publication:** `6a96d5fa0e8e711b20b5fdb7c0ebcbd3ba1411a9` / `70c62843b92f5e0764c3c4e321d4df4410895c0a`

## Reproduced defect

The published legacy-controlled service-worker path used global CacheStorage lookup for navigation and authority assets. When an older ARC cache appeared first, a current `index.html` could load with an older `app-build.js`. The resulting runtime had a stale build identity and no current release-evidence endpoint even though the active worker and its own named cache held coherent current files.

## Bounded correction

- Legacy-controlled navigation now reads only the active worker's own named cache.
- Legacy-controlled authority assets now read only that same cache.
- Reviewed visual assets retain their bounded current-cache/network behavior.
- A missing required navigation or authority asset returns the existing no-store 503 response; routing never consults another ARC cache.
- Verified-release routing, recovery selection, explicit Apply, immutable release verification, prior-cache retention, and first uncontrolled bootstrap remain unchanged.
- The build, shell, frozen authority-closure identity, and publication contracts advance to `mixed-asset-routing-repair-1`. The closure remains exactly 103 authority assets and 11 reviewed visual assets.

## Verification

Focused service-worker tests reproduce historical-first cache ordering, prove the active worker cache wins, prove coherent offline startup, and prove missing required assets return bounded 503 responses. Complete JavaScript and static regressions pass.

Real installed Microsoft Edge under the `/Arc-Pilot/` subpath retained a deliberately older first cache while the repaired worker controlled the page. Online startup, offline reload, and a full offline browser restart all returned the coherent current shell and authority assets from the active worker cache. The historical cache remained present and unchanged, demonstrating that the repair does not clear or rewrite prior recovery material.

No publication, release-evidence change, Samsung or production access, storage clearing, database mutation, Test Scenario 1 action, real-Student authorization, or authority transfer occurred.
