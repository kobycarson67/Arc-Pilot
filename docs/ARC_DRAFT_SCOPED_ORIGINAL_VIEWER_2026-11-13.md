# Exact Draft-Scoped Preserved Original Viewer — Local Repair

Date: 2026-11-13. Base: 992834f. Koby approved viewing only the exact original linked to a replacement draft. No general archive access, editing, scheduling or instructional acceptance.

## Provenance
The generator reads the reviewed R2 Repair1 archive in memory. It requires identity-map SHA-256 7ba2956022875c03cc1bea1ee9ffa205fa78c204bfdc967c06c66fc5b1c3b750 and payload SHA-256 f1f7756242c1ef685ef4ce061507d03b8fc6834e0e448cde7510fc8e2ade79b1. It verifies all124 exact draft/source/definition/version bindings:51 WT and73 AWT. No title inference. The minimal mapping lives in the existing inert draft-collection module, not a new authority asset. It contains only IDs, field-name lists and checksums, no student information or original content.

## Read boundary
getPreservedLessonForDraft accepts only course, draftLessonId and exact draft source record. It requires its checksum to match the frozen binding, the exact package currently available, exact bound definition/version and course, immutable preserved reference-only policy, and checksums of all frozen fields. It rechecks package availability before returning a narrow read-only display projection. Missing, altered, cross-course or unavailable records fail closed. No audit path or raw-store enumeration is exposed.

The adapter exposes this one explicit read under its existing verified V8 gates. Ordinary Lesson reads, scheduling, AutoBuild, acceptance and all writes are unchanged. The source view has only a Back link, no edit or schedule action. Async responses cannot overwrite a different screen. General source navigation directs the instructor to each draft's scoped button.

## Local checks
-8/8 dedicated owner/UI tests, including124 mapping references, WT/AWT results, wrong scope/source/IDs/audit arguments, package denial, row/content/policy corruption, scheduling exclusion, adapter gates, stale async UI and escaped display.
-4/4 existing preserved navigation tests;15/15 Lesson owner tests.
-47/47 static gate and inline JavaScript parse.
-Full JavaScript suite212/212 passed. Two initial frozen-source byte checks exposed CRLF checkout expansion; exact accepted Git blob bytes restored locally, with no source-policy change. The final full rerun passed.
-Binding generator rerun reproduced identical bytes.
-Independent review: no blocking defect. Native isolated normal-UI23/23 passed: WT/AWT exact source/back, wrong scope and missing source/package denial, stale navigation, unchanged scheduling/AutoBuild gates, unchanged74stores and legacy state. Dedicated fictional profile only. Synthetic package fixture is not production import certification. Evidence: sibling2026-11-13-original-viewer-independent/normal-shell-results/independent-native-acceptance.json.

No production, tablet, deployment, weekly plan, Booth migration or classroom-data changes.
