# Titanium Visual Refinement 1 diagnostic record

Authoritative deployed baseline: commit `0c258c42d89087fac6f5d1d5118f1eaa503aecc5`, tree `9058307c2407dded7bc4366ee02b2bc76c7b4b99`, build `titanium-visual-system-1`, schema v7. Rollback ref `rollback/titanium-visual-refinement-1` targets that exact commit.

## Reproduced findings and bounded corrections

| Finding | Reproduced baseline mechanism | Bounded correction |
|---|---|---|
| Dashboard lacked the approved first impression | Generic gradient hero, fabricated square ARC mark, no approved artwork | Approved logo and hero are composed locally; real schedule/class/Forecast data supplies Today and Class Pulse; the industrial artwork anchors the footer |
| Collapsed rail symbols were ambiguous | Navigation used unrelated emoji with inconsistent shapes | One local, stroked SVG family now maps every current route; labels/titles remain available in collapsed mode |
| Open Shop priority looked like danger state | `.p1/.p2/.p3` reused alarm-like red/orange/blue presentation | Dedicated priority tokens and cards distinguish ordered work from domain danger/warning status |
| Projects leaked legacy light surfaces | Foundation project panels, current checkpoint, links, buttons, details, and rating controls survived beneath Titanium | A late pathway-scoped refinement layer covers those existing components without changing project/checkpoint state |
| Material modal headers lost contrast | White legacy header backgrounds conflicted with Titanium inherited text | Inventory, transaction, history, and the new bounded dialogs share a dark high-contrast header primitive |
| Add Booth and issue resolution used browser prompts | The actions called blocking `prompt()` surfaces outside ARC geometry | Add Station and Resolve Station Issue use bounded native ARC dialogs and retain the same booth/issue records |
| Prototype wording persisted | Main Menu and Booth-only language no longer matched the persistent Dashboard or mixed shop locations | Main Menu becomes Dashboard; Add Booth becomes Add Station; booth evidence semantics remain explicit |

## Preservation evidence

The Foundation Repair suite caught an omitted Challenge Hub Dashboard entry during implementation; it was restored before the complete gate. Current Class remains schedule-derived, Selected Class remains instructor-selected, Simulation navigation remains isolated, the sidebar/transient geometry is unchanged, and Dashboard pulse values come from the existing `ArcClassForecast.build(...)` authority. No domain calculation, persisted record, or schema field changed.

## Asset handling

All four supplied files were inspected. Exact source bytes and hashes are retained under `assets/brand/source`; optimized local variants are under `assets/brand/runtime` and are cached for offline use. The logo remains PNG where transparency matters. The compact rail treatment is a crop/resize of the supplied artwork, never a reconstruction. Exact source hashes and derivation notes are recorded in `assets/brand/README.md` and enforced by regression.

## Deliberate boundaries

- The app/install icon is unchanged. No approved square logo conversion or mask-safe artwork was supplied.
- The repository contains many legacy browser prompts. Only the two findings named by this milestone—Add Station and station-issue resolution—were replaced; broad prompt conversion is a later surface-by-surface task.
- Today's Focus remains an honest disabled future connection because ARC still has no authoritative class/date lesson assignment.
- No purchasing/readiness, Presentation guidance, Help system, other pathway theme, or new Dashboard metric was fabricated.
- Browser-level Samsung visual acceptance remains a physical deployment gate; this Engineering milestone is not deployed.
