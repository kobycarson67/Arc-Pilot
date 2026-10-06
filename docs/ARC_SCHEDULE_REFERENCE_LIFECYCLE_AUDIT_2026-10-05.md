# ARC Schedule Reference Lifecycle Audit — 2026-10-05

## Boundary

This bounded read-only authority audit classifies the schedule references already persisted in `infrastructure_records`. It does not create a new authority, migrate records, or change normal ARC. The audit uses the injected academic-administration date to separate ended history from authority reaching today or the future.

## Reference classification

| Owning authority | Referenced authority | Current/future hard reference | Historical retained reference | Lifecycle-only / informational | Repair 7 rule |
|---|---|---|---|---|---|
| Weekly Schedule Mode | Bell Schedule for each configured weekday | An active mode with no end or an end on/after today requires an active Bell Schedule | An active mode whose bounded interval ended before today may use a retained active or retired Bell Schedule | A deliberately retired mode is excluded from current schedule selection | Bell retirement is refused for the current/future case. Ended active history does not block retirement and reads the retained Bell. Missing Bell identity is always an integrity error. |
| Date Override | Optional Bell Schedule | An active override dated today/future requires its instructional Bell to remain active | A past override may use a retained active or retired Bell | A noninstructional override does not require an active Bell merely because it retains an incidental Bell ID | Bell retirement is refused for the current/future dated reference. Missing Bell identity is always an integrity error. |
| Date Override | Optional Weekly Schedule Mode | An active override dated today/future requires the named mode to remain active | A past override may retain the mode identity | None | Mode retirement is refused for the current/future dated reference. Missing mode identity is always an integrity error. |
| Calendar Day | Optional Bell Schedule | An active instructional calendar day dated today/future requires an active Bell | A past calendar day may use retained Bell identity | `no_school`, `holiday`, `pd`, `other`, or `instructionMode: none` do not require an active Bell | Bell retirement is refused for any current/future calendar-day reference, preserving the explicit configured record. Backup applies active-Bell usability only when the day is instructional. |
| Section Placement | Global period identity from retained Bell definitions | A placement whose end is today/future requires that period code in active Bell authority | An ended placement may resolve the period code through active or retired Bell authority | Placement never owns a Bell template | Repair 6 behavior remains unchanged. |
| Planning Placement | Global period identity from retained Bell definitions | Same as Section Placement | Same as Section Placement | Planning remains independent placement authority | Repair 6 behavior remains unchanged. |
| Calendar Event | None | None | None | Date-range information only | No Bell or Schedule Mode lifecycle dependency is introduced. |

## Deterministic read behavior

- `scheduleForDate()` fails with `SCHEDULE_AUTHORITY_UNAVAILABLE` when a today/future Date Override names an unavailable Schedule Mode.
- A today/future instructional schedule fails with the same explicit error when its selected Bell identity is absent or not active. It never returns an apparently normal school day with an empty period list for that broken authority.
- Noninstructional days remain valid without Bell authority and return no instructional periods.
- Ended active weekly modes, past Calendar Days, and past Date Overrides may read retained retired Bell records. This matches Repair 6's retained-history rule.

## Backup and recovery integrity

Backup/Recovery now checks every Weekly Schedule Mode weekday Bell reference, Date Override Bell/Mode reference, and Calendar Day Bell reference. Missing referenced identity is an error. Active current/future instructional authority requires an active referenced Bell, and a current/future Date Override requires an active named Schedule Mode. Ended history may use retained active or retired parents. Noninstructional dated authority does not require an active Bell solely because it retains an incidental Bell ID.

## `UNRESOLVED` historical lifecycle point

The accepted records do not freeze whether a deliberately retired Weekly Schedule Mode should remain selectable for historical `scheduleForDate()` reconstruction. Repair 7 does not invent that policy. The existing behavior remains: deliberately retired modes are excluded, so a historical date depending only on such a mode resolves as unconfigured. This narrow point is `UNRESOLVED` for instructor/product review and does not weaken the current/future fail-safe rules or Backup reference integrity implemented here.

## Preserved authority

Normal ARC remains Schema 7 / `V7_ONLY`. No production database, Samsung device, academic configuration, real Student data, instructional-package state, dual write, normal-v8 activation, or authority transfer is part of this audit.

## Repair 8 resolved-reference addendum

Repair 8 extends this lifecycle audit from literal stored references to the fully resolved current/future dated schedule path. Academic Administration and Backup/Recovery now apply the same precedence: Date Override, Calendar Day, explicit named mode or one effective default mode, weekday entry, and a direct dated Bell over the selected mode's Bell.

Current/future dated instructional authority is invalid when that resolution is ambiguous or does not produce a usable active Bell. This includes a named mode with no entry for the date's weekday, an ended but explicitly reused mode whose Bell is retired, overlapping active defaults, and duplicate active Calendar Day or Date Override records. Explicit mode reuse outside its default interval remains allowed, and a direct dated Bell remains authoritative over a missing mode weekday.

Bell/Mode retirement now tests indirect resolved dependencies as well as the Repair 7 literal dependencies. Backup/Recovery reports the same invalid resolved state that `scheduleForDate()` refuses. The deliberately retired historical Weekly Schedule Mode rule above remains `UNRESOLVED` and unchanged.
