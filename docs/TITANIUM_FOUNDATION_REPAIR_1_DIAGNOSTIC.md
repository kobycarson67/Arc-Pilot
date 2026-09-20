# Titanium Foundation Repair 1 diagnostic record

Authoritative deployed baseline: commit `77a11c281092da007ef64272b447a8a84370096b`, tree `9b34844899bb09f9d06b34b9a9f3dcc1dd097926`, build `titanium-foundation-1`, schema v7.

## Reproduced findings and causes

| Finding | Baseline evidence | Proven cause | Bounded correction |
|---|---|---|---|
| Sunday selected class shown as Current Class | Dashboard calculated `currentScheduleContext()` but separately rendered `activeSection()` under a Current Class heading | Selected working context and time-derived current context were conflated in dashboard presentation | `ArcTitaniumShell.currentClass()` accepts only schedule context with `kind === "class"`; selected context is separately labeled |
| Scenario 3 opened 1st Period | `enterSimulation()` sorted sections, assigned the first section, then called `renderRoster()` | Host rendering overrode the isolated scenario record after successful entry | Scenario definitions declare Dashboard/Home start; entry and reset clear selected class and render that start |
| Potential Live/Simulation selection leakage | Simulation manager test restored the exact Live state and captured navigation; host used one unscoped session-navigation key | Persistence isolation was correct, but browser-session navigation was shared between Live and every scenario | Navigation keys are namespaced `:live` or `:simulation:<scenario>`; leaving restores captured Live selection/navigation |
| Student and transient clipping under collapsed rail | Generic `.modal` was fixed at viewport `inset:0`; body padding does not offset fixed descendants | Modal geometry was viewport-relative rather than Titanium-workspace-relative | Normal transients begin at `left:var(--arc-sidebar-width)`; the rail remains visible and usable |
| Scenario confirmation clipped under rail | Confirmation used generic modal geometry while its dialog attempted a non-positioned z-index | Safety confirmation and normal transient layering were conflated | Scenario entry is an explicitly blocking full-viewport layer above the rail |
| Search, Notifications, Quick Add, Material, and Station geometry shared defect family | All use fixed `.modal` surfaces; Material had a specialized vertical lifecycle but no shell-relative horizontal offset | Common fixed-layer origin ignored rail width | Common modal and Inventory modal receive the same shell-relative left boundary |
| Main Menu duplicated persistent navigation | Dashboard repeated Curriculum, Lesson Bank, Project Bank, Inventory, and every class destination already owned by sidebar/class selector | Foundation added the sidebar without retiring the old menu-of-menus | Duplicated navigation cards and Current Classes grid removed; operational class context and unique resources retained |

## Dashboard capability audit

Removed as redundant navigation: WT/AWT curriculum cards, Lesson Plan Bank, Project Bank, Material Inventory, repeated Current Classes/Open Class cards, and the duplicate Today’s Focus dashboard dock. Their functions remain reachable through the persistent sidebar and class selector.

Retained because they are operational or do not yet have another coherent destination: Current Class, Selected Class actions, selected-class factual pulse, Today’s Schedule/calendar, upcoming week, All Student Profiles, Student Work Library, and the clearly proposed Advanced Welder Challenge.

## Boundaries

- No domain authority or schema changed.
- The large fictional-data warning and broader professional Simulation treatment are docked for Titanium Visual System.
- Today’s Lesson, Presentation guidance, Help, other pathways, purchasing/readiness, cut optimization, broad catalog, and workstation intelligence remain docked.

