# Classes Dropdown Overlay Repair Diagnostic

## Baseline and reproduction

The repair starts from deployed publication commit `e4a6a309c9d0fcc495fd7781aca73bb5b12e49b1`, tree `3f797515dae2236612e247b5b29db4ba75589820`, build `titanium-visual-refinement-1-repair-1`, schema v7. `rollback/classes-dropdown-overlay-repair` targets that exact commit.

The confirmed Samsung sequence was Classes closed → open → closed on Dashboard, Fast Roster, Material Inventory, and Lesson Plan Bank. Opening the menu exposed unused dark space at the right while closed-state geometry was correct. The amount varied by destination.

The deployed CSS reproduces the failure mechanism deterministically:

- the Classes wrapper is a grid item toward the right of the global header;
- the absolutely positioned menu is excluded from normal layout, but its left edge is anchored to that right-side wrapper;
- its width is `min(340px, calc(100vw - 24px))`, calculated from the entire viewport rather than the Titanium workspace remaining after the fixed rail;
- its right edge can therefore extend beyond the document in portrait;
- selected-class and destination breadcrumb widths move the containing block, changing the overflow amount by destination.

No open-state body class, overflow lock, shell class, grid-track mutation, domain save, or destination-specific layout rule participates in the failure.

## Repair boundary

The shared menu remains `position:absolute`. Its right edge is anchored to its header control and its maximum width subtracts `--arc-sidebar-width`. At 620 CSS pixels and below, the existing header grid gives the Classes wrapper a full row, and the menu overlays that row from left to right. The menu never reserves workspace space.

The open handler continues to mutate only the menu's `hidden` property and the trigger's `aria-expanded` value. Selection still closes the menu, updates only the established selected-class state, saves through the existing authority, and renders Fast Roster. Outside-click and existing keyboard behavior remain unchanged.

## Preservation

The repair changes no branding assets, icon declarations, Dashboard composition, domain calculations, records, persistence keys, Simulation storage, schema, or service-worker asset list. The new build marker changes the service-worker cache name so the modified shell can be updated through ARC's established controlled update flow.
