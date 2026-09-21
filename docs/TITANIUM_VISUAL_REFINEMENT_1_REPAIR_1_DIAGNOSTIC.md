# Titanium Visual Refinement 1 Repair 1 diagnostic record

Authoritative deployed baseline: commit `c11e5373a6ff9e9cd6290b0a280a52900439bb1d`, tree `522932164bf08aeb511d23035a68a8a05a5693df`, build `titanium-visual-refinement-1`, schema v7. Rollback ref `rollback/titanium-visual-refinement-1-repair-1` targets that exact commit.

## Reproduced Samsung findings and proven causes

| Finding | Baseline reproduction | Proven cause | Bounded repair |
|---|---|---|---|
| Portrait Dashboard stepped between narrow and wide right boundaries | Hero, Pulse, Current/Selected, Quick Access, and footer were independent direct siblings; Today’s Focus/Upcoming Week lived in a separate nested grid | Dashboard had no common explicit width owner. The lower grid's default `min-width:auto` children retained their week-scroller min-content contribution, so that block established a different apparent outer boundary in Samsung portrait | One `.arc-dashboard` boundary now owns every major section at `inline-size:100%`; every direct major section resolves through it, and lower-grid children use `min-width:0`/`max-width:100%`. Internal grids, hero crop, and landscape rules remain unchanged |
| Collapsed rail showed miniature full branding | `index.html` loaded `arc-welding-compact-mark-720.png`; visual inspection proves that crop still contains `ADVANCED WELDING CLASSROOM` beneath ARC | The previous crop ended below the lettermark/subtitle boundary, so resizing reduced both the letters and forbidden copy into the rail | The rail now loads `arc-welding-lettermark-720.png`, cropped only from approved primary-logo source pixels `(0,0,2048,410)` and proportionally resized |
| Installed icon remained pre-Titanium | Manifest exposed only the existing generic `icon-192.png`/`icon-512.png` as combined `any maskable`; Apple touch used the 192 file; no favicon or dedicated mask-safe derivative existed | Visual Refinement 1 explicitly docked production icon conversion and left legacy install assets wired | Deterministic approved-source composition now produces favicon, Apple touch, general 192/512, and maskable 192/512 icons; manifest, HTML, service worker, Pages verification, and static regression cover them |

## Branding proof

- Approved primary source SHA-256: `dd0f686506ed0d05f986017b97af7a4808a47451e4fa5e002e40f1fba98c01d1`.
- The approved primary source remains byte-for-byte unchanged, as do the approved hero, industrial background, and visual-reference board.
- `scripts/build_arc_brand_derivatives.py` performs the fixed crop, proportional Lanczos resize, and approved-background icon composition. It contains no text/font rendering and no generative step.
- The same 720×144 transparent ARC-only derivative supplies both the collapsed rail and every icon composition.
- App-icon general and maskable variants differ only in fixed safe-area/border insets. The embedded A/R/C mark remains one proportional scaling of the same derivative.
- Complete derivative dimensions and hashes are recorded in `assets/brand/README.md` and enforced by `tests/titanium_visual_refinement_1_repair_1.test.js`.

## Preservation verification

The repair does not change Titanium sidebar widths, expanded drawer behavior, modal/workspace offsets, Material Inventory geometry, semantic navigation icons, Dashboard data, Current/Selected Class authority, Forecast calculations, Simulation isolation, persistence, or schema. The full preservation suite remains the release gate.

## Boundaries

- This is responsive geometry and small-format identity only; it does not redesign Dashboard content or hierarchy.
- Existing future systems, other pathway themes, broad prompt conversion, purchasing/readiness, and lesson-assignment architecture remain docked.
- Physical resolution remains open until the deployed build passes the focused Samsung sequence.
