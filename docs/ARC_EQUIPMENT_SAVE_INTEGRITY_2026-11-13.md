# ARC isolated inventory sweep and equipment persistence repair — 2026-11-13

## Scope and authority
Based on exact 24e959723d687a675e3d825a0f52dd55e546d8ac. Dedicated synthetic Edge normal-shell profile on loopback ports48981/48982, physical verification DB only; real-student write gate remains closed. No production origin, tablet, repository publication or real data touched.

Inventory remains the existing compatibility/localStorage-owned subsystem inside the normal V8 shell. This report does not mislabel inventory as a native V8 store owner.

## Additional coverage
- Normal Material Definition creation, receipt of two120-inch linear pieces,36-inch use yielding84-inch retained remainder, audited correction of another piece to108inches, and cold persistence passed.
- Excessive material use rejected visibly, editor retained and material model unchanged.
- Equipment creation and quantity correction2→3 persisted across independent browser launches; audit rows retained. Desktop screenshot visually inspected.
- Lifecycle mutation pass preserved all74 academic IndexedDB stores exactly.
- First chained expression did not await modal history settlement and ended with a navigated-context error after saves; cold inspection established exact outcomes, subsequent runs added settlement waits. Not counted as app failure.

## Confirmed defect and bounded repair
Equipment Add previously ignored save()===false. Injecting a synthetic rejected save kept disk bytes unchanged but changed memory, closed editor and displayed a nonexistent item. Cold reopen lost it, confirming false success.
Added commitEquipmentInventory(next), patterned after existing material commit semantics: save rejection or throw restores previous inventory model and surfaces error. Existing equipment create/edit/adjust/archive/restore handlers use it and only close/render on success. No storage schema, grading or automatic recovery changes.
-15 focused success/false/throw outcomes across five handlers pass.
-Native failed-create recheck: memory+disk unchanged, modal retained, no phantom item, clear alert.
-Native thrown failure + retry: editor retained, then ordinary Save button persists exactly one item, closes correctly; all74 IDB stores unchanged.
-Tests simulate rejection at persistence boundary, not actual disk exhaustion or partial underlying storage writes.

## Limits and next work
Not all combinations certified: plate cut geometry, reservations/release/waste/scrap variants, equipment-to-Booth references through every archive case, media/camera permissions/export, full enrollment/quarter-close UI, original Lesson viewer, and authoritative Administration generation remain separate. Owner regression suites are not substitutes for physical UI acceptance. No production deployment performed.

Evidence folder: 2026-11-13-remaining-sweep, expressions and normal-shell-results timestamped JSON/screenshots. Separate fresh profile retained for reproducibility. No private student content in fixtures.

## Independent-review correction and final checks
Reviewer identified rejected values could remain in memoryStorageFallback after the real wrapper rejects a write. Equipment helper now snapshots/restores only the exact fallback key presence/value on failure, leaving shared persistentStorage behavior and storageAvailable diagnostics unchanged. Actual wrapper tests with absent/present prior fallback and subsequent failed reads pass; unrelated state/reference behavior independently checked.
Native browser test intercepts the underlying Storage.prototype.setItem only for STORAGE_KEY, then exercises normal primary button. Disk, state and fallback remain identical after rejection, editor stays open, a later failed read returns only prior fallback, and ordinary retry saves exactly one record. All74 IndexedDB stores unchanged. No storage implementation stubs in that final browser check.
Full final gate and commit recorded in parent result; exact pinned reference Git bytes restored for local CRLF drift only, excluded from commit. No thresholds weakened.
