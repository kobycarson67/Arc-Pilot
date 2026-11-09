# ARC Combined Classroom Usability and Automatic OneDrive Backup 1

Status: local candidate for independent source review only.

## Baseline and safety

- Parent: `9d4602788590f61d0962d6b7e43bfdb6792ed1cc`
- Parent tree: `1c721c9a982e440103d18fe480d9554a7cff212c`
- Rollback: `rollback/pre-combined-classroom-usability-autobackup-1`
- Authority-asset closure: unchanged at 114 paths; build/shell identity advanced.
- No GitHub publication, Pages update, release-evidence change, Samsung operation, production database access, real Student access, V8 cutover, or authority transfer occurred.

## Delivered behavior

### Attendance & Passes

The sidebar destination is now program-wide by default. It provides all-class and one-class filtering, Student/status/pass filters, day/week/month/quarter/semester/year/custom windows, reset, underlying daily totals, a daily attendance-rate graph, a pass-count graph, and a direct route to selected-class daily entry. The view is derived from authoritative records and creates no persistent analytics or grade changes. Distinct-period enrollments remain distinct attendance opportunities; Supplemental Sessions do not create host-class Attendance.

### Technical Assignments

The reported silent failure was caused by the normal V8 UI invoking an asynchronous P6 authoritative command without awaiting its result. A rejection could therefore disappear while the UI looked idle. The create action now awaits the command, prevents a duplicate click while saving, and exposes success or the exact actionable failure. The sidebar library supplies create, edit/version, copy/assign, archive, scoring, reassessment, and review through the existing P6 owner.

### Project planning and inventory

Project creation reads the canonical inventory model at render time and provides separately searchable Material and Equipment lists. Selected materials retain inventory ID, unit, planned quantity, and dimensions; equipment retains stable inventory IDs. Future inventory items appear without Project schema changes. Supplemental not-yet-inventory text remains available. Planning selections never reserve, consume, book, or decrement stock.

### Equipment Inventory and Booth Manager amendment

Equipment now has a direct sidebar inventory workflow and one stable item identity shared by Project Creation and Booth Manager. Both selectors search the live canonical Equipment Inventory, so additions and renames appear without hardcoded changes. Project selection records only a requirement; Booth selection records a reference to the existing item and does not copy, reserve, consume, or infer exclusive availability. Existing free-form Booth capabilities remain separate resource definitions.

Archive is non-destructive: new selection is refused while existing Project and Booth references remain visible with archived or historical status. Duplicate active item names within the same category and duplicate Booth associations are refused. The amendment adds no schema/store, quantity, booking, availability, or authority policy.

### Final selector UI completion

Project Materials, Project Equipment, and Booth Equipment now use the same compact native-details multiselect. Each selector is collapsed by default, exposes a clear Select control and selected-count badge, opens by keyboard or touch, searches the current inventory, and supports multiple checked selections. Selected and historical archived references remain visible. Material rows retain planned quantity and dimensions inside the dropdown.

This is a presentation-only completion over the accepted stable-ID relationships. It changes no inventory ownership, Project reservation/consumption semantics, Booth authority, database schema, store inventory, or production data.

### Sidebar

Administration now has a distinct icon from Settings. Attendance remains a global destination rather than a class-scoped navigation item. Applicable library/management destinations expose verified Create/Add actions; read-only analytics do not expose fake mutations.

### Automatic school OneDrive backup

The existing least-privilege Graph App Folder owner now supports an exact upload/download/package-integrity round trip and a bounded scheduler. Meaningful changes mark a pending backup; debounce, interval, app return, and online return can resume it; operations never overlap. Settings shows authentication, pending, last verified, and error state and retains Backup Now.

This is not a background service or cross-device sync. It runs only while ARC is open, online, and signed in. Tokens remain memory-only and delegated sessions may require sign-in again. Closed browser/process execution is not promised. A successful upload alone is not verified; exact-byte download and ARC package verification are required. The controller never automatically restores or deletes backups, and existing 30-day/sole-copy custody rules remain controlling.

## Verification

- Focused combined tests: 7/7.
- Complete JavaScript inventory after final selector completion: 183/183 test files.
- Static regression: 47/47.
- Installed Microsoft Edge, task-owned profile and fictional database:
  - whole-program Attendance dashboard and graphs;
  - Technical Assignment create and cold persistence;
  - dynamic material/equipment Project pickers;
  - offline-waiting and exact-verification automatic backup controller;
  - online reload, controlled offline reload, and process-cold restart;
  - Schema 8 / IndexedDB 14 / 74 stores;
  - exact backup verification and restore parity.

The amended rehearsal additionally creates one fictional equipment record, selects the same stable identity from Project Creation and Booth Manager, proves those relationships remain independent, verifies rename propagation, archives the item without breaking either historical reference, performs online/offline reload and process-cold restart, and re-verifies 74-store backup/restore parity.

The browser rehearsal used only task-owned fictional state and simulated the Graph transport contract. It did not contact the school tenant or claim fresh physical Samsung acceptance. Actual cloud/device acceptance remains a later guarded release boundary.
