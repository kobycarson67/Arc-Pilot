# History filter and calendar-date presentation repair

Date: 2026-11-13
Base: 6680d7a (local Global Search effective-context repair)
Status: local candidate only; not published or physically accepted.

The private ARC_SWEEP_PROFILE_HISTORY_2026-11-13.md records existing Gradebook and academic items visible in All but absent from Grades and Profile/System. It also records effective calendar dates displayed as the prior evening. Source inspection confirmed both duplicated profile renderers bypassed projectedHistoryCategory and discarded source date metadata.

Both rendering paths now use the existing domain/category map. They preserve sourceTimeValue, timeKind and timeField from the read-only owner projection. The profile compatibility mapping preserves these fields too and no longer invents an epoch date when no date exists. historyTimeLabel displays date-only values literally as calendar/effective dates, without a fabricated clock. Actual timestamps remain local timestamp display. Projection timestamp normalization used for chronology/scope is unchanged; no persisted records or policy changed.

Owner competency/Evidence items use their actual title/details rather than the legacy rating card unless legacy code/name/old/new fields truly exist. Legacy rating rendering is retained.

Verification:
- History UI regression: 5/5, real synthetic projection across all 11 domains, both duplicated renderers, filter-versus-All parity, immutable owner records, source date metadata, missing dates, genuine midnight timestamp distinction, legacy/owner competency rendering.
- Timezone subprocesses: America/Denver, Pacific/Kiritimati, UTC.
- Existing History projection suite: 11/11.
- Global Search context suite: 8/8.
- Inline script parse and diff whitespace checks pass.

Native normal-shell review and full gates remain coordinating-reviewer work. No production/tablet/release-identity change performed.
