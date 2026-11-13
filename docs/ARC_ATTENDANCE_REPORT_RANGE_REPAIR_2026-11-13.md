# Attendance reporting range repair — 2026-11-13

## Scope and authority

Local candidate based on `24e9597`. Read-only global Attendance & Passes reporting only. No attendance entry, pass owner, grade rule, classroom data, deployment or Samsung change.

Historical authority: ChatGPT conversation https://chatgpt.com/c/6aba0a54-9648-83ea-8253-260b3606fd1f, messages `bbb214aa-89a7-478b-837d-875d45d493fe`, `bbb21a1d-76e1-4ccd-bedd-599fc354b31b`, `ddb046a2-020a-4274-9c17-ef94738531c1` (September 22–23): global all-class reporting with academic period/class filters is distinct from selected-class operations. Later milestone explicitly leaves master reporting definitions subject to instructor approval. Therefore this repair corrects date selection, not reporting policy or KPI mathematics. First anchor has an omitted attachment; textual request was accessible.

Sweep evidence: private `ARC_SWEEP_ATTENDANCE_ANALYTICS_2026-11-13.md` recorded rolling academic presets, stale date fields and silent reversed ranges.

## Behavior

- Quarter, semester and school-year presets resolve the unique canonical academic period containing a reference date. Bounds are inclusive and must be valid and nested. Quarter must identify itself as Q1–Q4 or Quarter 1–4.
- Missing, ambiguous, malformed or synthetic unbounded calendar authority produces explicit Report unavailable. No rolling fallback misrepresented as an academic period.
- Reference date permits reporting an earlier configured period. Displayed Start/End are actual effective bounds.
- Editing either date changes to Custom after controls are read. Reversed/invalid dates show an actionable alert, never an empty success report, and do not read attendance records.
- Cards retain status/pass-type filters; daily charts/table retain all statuses/pass types within date/class/student scope. UI explicitly states this distinction. Present/tardy/left-early, absence, noclass and dual-period definitions unchanged.
- Daily, last-seven-days and rolling-month calculations otherwise unchanged. Known inherited rolling-month end-of-month Date.setMonth overflow remains outside this academic-period repair; not represented as a calendar month.

## Verification

- Focused range/model/render regressions: 10/10.
- Full JavaScript test files: 208/208.
- Static regression gate: 47/47.
- Fresh task-owned native Edge normal V8 shell with fictional fixture: 12/12 desktop (1396px), 12/12 narrow (480px), no dialogs or exceptions.
- Native checks: exact quarter/semester/year fields; preset-to-custom edit; reversed rejection then recovery; October 14/15 quarter boundary; missing calendar alert; reset; inclusive/filter explanation; exact full snapshot equality across all 74 stores.
- Screenshots visually inspected at both widths. Narrow controls remain usable; report scrolls vertically.
- Synthetic physical DB remapped within dedicated profile; real-student write authority closed. No production DB accessed.
- Independent review by resume_arc_sweep reran focused 10/10 and found no blocker. Native checks owned by implementer, not independently rerun.

Evidence retained in sibling `normal-shell-results` and `full-tests-final.json` under the isolated Attendance delivery directory. Windows worktree byte-pinned historical authority markdown was restored from committed bytes for two integrity tests; no source-authority content change is part of this commit.

## Acceptance boundary

Local tested candidate only, not CI-published, deployed or physically accepted. Any change to attendance opportunity policy, pass/attendance separation, or status-filter trend semantics is a separate product decision.
