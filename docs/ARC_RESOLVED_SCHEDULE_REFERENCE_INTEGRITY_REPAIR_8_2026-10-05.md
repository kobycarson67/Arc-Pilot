# ARC Resolved Schedule Reference Integrity Repair 8 — 2026-10-05

## Authority and boundary

Repair 8 began from accepted local Repair 7 commit `0d18bc1c16c4bf97d4ff7908396d5befb126b0db`, tree `9bd4fd76bac20ea7f1c37a027f8cecc254d83bbe`, with rollback `rollback/pre-academic-administration-schedule-parity-repair-8`. Normal ARC remains Schema 7 / `V7_ONLY`.

Independent review showed that literal parent checks were insufficient. A current/future instructional date could name a mode with no entry for that weekday, reuse an ended mode whose Bell had been retired, or depend on ambiguous default or duplicate dated authority. `scheduleForDate()` could fail while Backup/Recovery still reported healthy. Repair 8 closes that resolved-reference gap without changing normal ARC UI or authority routing.

## Completed repair

- Academic Administration and Backup/Recovery now share one pure resolver for the accepted precedence: Date Override, Calendar Day, explicit named mode or unique effective default, weekday entry, and direct dated Bell over the mode Bell.
- The resolver reports exact source identities, selected mode, weekday, selected Bell, day/instruction mode, instructional state, and a deterministic ambiguity or missing-authority reason.
- Current/future instructional Calendar Day and Date Override writes fail before mutation unless their fully resolved authority has a usable active Bell. An explicit direct Bell remains sufficient when a named mode lacks that weekday.
- Explicit named modes may still be reused outside their default effective interval. No new range policy was invented.
- `scheduleForDate()` fails closed for overlapping defaults, duplicate active Calendar Days, duplicate active Date Overrides, unavailable named modes, or missing resolved Bell authority.
- Bell and Schedule Mode retirement now follows indirect named-mode and default-fallback dependencies from active current/future dated authority. Retirement remains allowed when no such dated authority depends on the record.
- Backup/Recovery uses the same resolution result for every active current/future dated authority and also reports structural overlapping-default and duplicate-date errors.
- Repair 7 literal-reference, historical Bell identity, noninstructional-day, and atomic correction protections remain in force.

## Verification

The dedicated Repair 8 suite covers 20 precedence, current/future, historical, duplicate, ambiguity, direct-Bell, named-mode, default-mode, and exact-source cases. Academic Administration adds 15 integration cases and Backup/Recovery adds five audit cases. Repairs 2–7, schedule adapter, academic consumers, Daily Teaching, production configuration/cutover, parity/static/parse, storage/recovery, and the complete JavaScript suite remain closeout gates.

## Preserved unresolved point

The deliberately retired historical Weekly Schedule Mode readback rule remains `UNRESOLVED`. Repair 8 neither selects retired modes for historical dates nor invents a replacement historical policy. Retained retired Bell authority remains readable for ended dated history under the already accepted Repair 6/7 rule.

## Preserved authority and prohibitions

- Existing editable Schedule Setup, calendar, Planning Period, Section movement, Semester Transition, historical hierarchy, and Daily Teaching noninstructional semantics remain intact.
- No Schema, IndexedDB version, store, build identifier, cache, service worker, or normal `index.html` change occurred.
- No production/Samsung access, academic configuration, real Student data, publication, deployment, dual write, normal-v8 activation, or authority transfer occurred.

Repair 8 is local engineering evidence pending independent review.
