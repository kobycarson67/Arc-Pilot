# ARC End-to-End Academic Activation Integration Rehearsal

Date: 2026-10-11
Authority: bounded local investigation and repair
Starting commit: `3f7bffbdf1aaf4fd2421cdf2d59b467ac53de4a3`
Starting tree: `9b0eb611cdcde90fa93bf7795f355c397850a41d`

## Reproduced failure and root cause

The published activation owner correctly preserved Sunday as `no_school + none + null Bell`, and its production readiness correctly accepted that noninstructional result. The real normal ARC shell then called `bellSchedule(plan.scheduleId)` unconditionally from `refreshArcTime()`. On Sunday, `plan.scheduleId` was null, so strict v8 Bell lookup raised `The authoritative schedule does not provide the requested Bell Schedule.` after the activation marker had already been accepted.

The adjacent normal-shell audit found the same assumption in startup booth-expiration cleanup. `boothEndForSection()` requested Bell times before checking whether the assignment date had instruction. This was a second latent cold-start failure.

Readiness and normal startup therefore evaluated different conditions: readiness correctly required Bell authority only on instructional days, while two normal-shell consumers required a Bell on every date.

## Bounded repair

Normal ARC now has one shared resolved-day-plan Bell boundary:

- noninstructional dates return an empty period-time set and never invent a Bell;
- instructional dates still require an exact authoritative Bell identity;
- an authoritative Bell missing a requested effective Section period fails closed;
- V7 fallback behavior remains available only while authority is `V7_ONLY`;
- clock refresh and booth-expiration cleanup consume the same rule.

No schedule fact, PACR record, database schema, Student authority, adapter authority, Lesson status, or Semester 2 placement changed. The build and shell cache identity advances so a later authorized publication can deliver the repaired normal shell through the existing user-controlled update flow.

## Installed Edge rehearsal

Installed Microsoft Edge was launched headless with a new task-owned profile and a unique physical IndexedDB name. A pre-document test boundary mapped only the code's logical `arc_classroom_v8` identity to that isolated physical name. The locally served candidate used the actual normal `index.html`, actual service worker/cache, actual storage/backup/package/academic/administration/projection/activation modules, and a no-Student fixture carrying the accepted 859-role, 359-link, 259-intentional-absence reference shape.

The rehearsal proved:

1. normal baseline startup at Schema 7 / `V7_ONLY`;
2. protected `configured-pending-activation` readiness with healthy 74-store audit and zero v8 Students;
3. wrong recovery refusal, exact v8 and V7 recovery re-ingest, and one activation marker;
4. actual normal-shell v8 startup with Academic Structure version 1, stable Sections, Planning period 6, Sunday No School, regular/late Monday, shortened Friday Open Shop, and December 14 `pd + none`;
5. warm reload and a new Edge-process cold restart with the same isolated profile;
6. Dashboard, class selection, Academic Structure, Schedule Setup/Bells, Planning, and calendar projections from the authoritative compatibility view;
7. P5–P10 transaction adapters remaining `V7_ONLY`, no dual write, and zero v8 Students;
8. broken instructional Bell authority refused before marker write and restored with exact backup parity;
9. marker/hint mismatch showing recovery-required UI without Schema 7 academic fallback;
10. verified rollback from `V8_AUTHORITATIVE` to normal V7 startup;
11. task database, local storage, cache, and service-worker cleanup.

This is isolated local evidence. It is not Samsung acceptance, publication, production activation, or authority transfer.

Repository verification passed static regression `47/47`, the complete full-history JavaScript inventory `132/132`, changed-script and inline-script parse checks, Pages/service-worker/cache contracts, and `git diff --check`.

## Authority and remaining boundary

Normal published ARC remains Schema 7 / `V7_ONLY`. P5–P10 transactions remain `V7_ONLY`; no permanent dual write exists. The historical retired Weekly Schedule Mode question remains unresolved. Independent review of the local commit, exact Git bytes, tests, and browser evidence is required before any publication or later physical retry can be authorized.

\n