# Titanium Foundation route and surface audit

Baseline audited: `0b3ed5e5c6d18b2fe13a26309600cf4377e8d0db` / tree `651e3902272c97f0d5efadbaa8d360962b02b179`.

## Former top-header actions

| Existing action | Existing owner | Titanium placement |
|---|---|---|
| Back | `navBack()` | Context header; continues to close the top child before route history |
| Main Menu | `renderMainMenu()` | Sidebar Dashboard |
| Classes | `toggleClassMenu()` / `navSwitchClass()` | Compact context header; class switch still opens Fast Roster |
| Quick Add | `showQuickAdd()` | Persistent sidebar footer |
| Search | `showGlobalSearch()` | ARC sidebar group |
| Notifications | `showNotifications()` | ARC sidebar group; existing badge remains in the context header |
| Settings | `renderAppSettings()` | ARC sidebar group |
| Leave Simulation | `leaveSimulation()` | Existing persistent simulation banner in the context header |

No action was reimplemented in the shell. Global destinations still enter their existing render functions, whose `navMark()` call clears normal transient UI before rendering.

## Route inventory

| Scope | Existing route/function | Titanium reachability |
|---|---|---|
| Global | Dashboard / `renderMainMenu` | Sidebar |
| Global | Schedule / `renderScheduleHome` | Dashboard |
| Global | Schedule setup / `renderScheduleSetup` | Settings |
| Global | All Student Profiles / `renderAllStudentProfiles` | Dashboard |
| Global | Student Work Library / `renderPhotoLibrary` | Dashboard |
| Global | WT/AWT curriculum, pacing, history / `renderCurriculumHub`, `renderPacingPlanner`, `renderPacingHistory` | Sidebar Curriculum & Standards, then existing child routes |
| Global | Lesson Plan Bank / `renderLessonBank` | Sidebar |
| Global | Project Bank / `renderProjectBank` | Sidebar |
| Global | Material Inventory / `renderInventory` | Sidebar |
| Global | Advanced Welder Challenge / `renderChallengeHub` | Dashboard; remains explicitly proposed/non-authoritative |
| Global | App & Updates, Demo & Testing / settings child routes | Sidebar Settings |
| Class | Fast Roster / `renderRoster` | Sidebar and dashboard |
| Class | Class Forecast / `renderClassForecast` | Sidebar and dashboard |
| Class | Attendance & Passes / `renderAttendance` | Sidebar |
| Class | Class Projects / `showClassProjects` | Sidebar |
| Class | Open Shop / `renderOpenShopAll` | Sidebar |
| Class | Booth Manager / `showBoothManager` | Sidebar and dashboard |
| Class | Gradebook, Technical Scoring, Workplace, Behavior | Existing Fast Roster action row |
| Student | Summary, competencies, projects, technical, workplace, behavior, attendance, evidence/history, photos | Existing Student profile tabs |

## State and ownership boundary

- ARC Core owns the shell, global grouping, selected-route presentation, and collapse preference.
- The active section supplies pathway/program identity. The Welding/Titanium identity accepts `pathwayId`, `programId`, or the existing WT/AWT course code; it is not inferred from an instructor account.
- Collapse state is a device-local presentation preference and is not part of schema-v7 classroom state or backups.
- Student profiles and the three global transient surfaces (Search, Notifications, Quick Add) register a browser-history marker; Material dialogs retain their established lifecycle. Android Back consumes the active marker and closes that surface before app exit.
- Today’s Focus and Help are disabled, visibly future docking points. No lesson, guidance, or Help content is fabricated.
- Domain records and mutations remain owned by their existing modules and render/action functions.
