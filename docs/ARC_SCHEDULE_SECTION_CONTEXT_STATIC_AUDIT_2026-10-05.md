# ARC Schedule Section Context Static Audit — 2026-10-05

## Scope and rule

Repair 3 searched repository runtime and integration sources for direct `Section.period`, `Section.semesterId`, and equivalent named-variable reads. In isolated/current v8, effective `section-placement` is the only current period and Semester authority. Static Section fields remain bootstrap/creation metadata. Schema-7 normal ARC remains `V7_ONLY` and retains its existing state model.

Command family: `rg` over `index.html`, `src/`, `engineering/`, and `parity/`, excluding tests and documentation, for named Section variables followed by `.period` or `.semesterId`; a broader `.period` / `.semesterId` review was then used to find aliases and creation paths.

## Classified direct-field matches

| Classification | Matches | Files | Finding |
|---|---:|---|---|
| `LEGACY_V7_ONLY` | 40 | `index.html` (37), `src/arc_titanium_shell.js` (1), `src/simulation_fixtures.js` (1), `src/arc_academic_consumer_projection.js` legacy-only helper (1) | Accepted Schema-7 state and simulation behavior. These reads do not execute as v8 current authority. |
| `CREATION_METADATA_ONLY` | 1 | `src/arc_v8_production_academic_configuration.js` | Copies instructor-entered Section bootstrap period into Section creation. Effective placement remains required for current v8 reads. |
| `HISTORICAL_ORIGIN_CORRECT` | 1 | `parity/stage14_v7_v8_parity_contract.js` | Describes the historical v7 source field in the frozen parity contract; it is not an executable current-context read. |
| `CURRENT_V8_REPAIRED` | 0 remaining direct-field matches | See consumer inventory below | Direct current-v8 static reads were removed. |
| `UNRESOLVED` | 0 | — | No product decision was required by a remaining match. |

Total classified direct-field matches: **42**. Unclassified: **0**.

## Current-v8 consumer repairs

The following consumers now resolve effective Section context through `src/arc_effective_section_context.js` or an already-authoritative placement read:

- shared academic projection: current/selected Section and Student scope;
- Attendance adapter and Attendance/Pass/Supplemental runtime;
- Booth scheduled physical context;
- Student History dated academic context;
- Daily Teaching selected Section and pacing Semester;
- Curriculum/Pacing Section/Semester lineage;
- Backup/Recovery pacing-lineage integrity;
- Daily Teaching isolated verification composition.

The resolver fails closed for missing or duplicate effective placements. It creates no store and persists no competing current context.

## Activation conclusion

The source audit found no unresolved current-v8 static Section field read. Normal ARC remains Schema 7 / `V7_ONLY`; therefore the retained Schema-7 reads are correct until a separately authorized authority transition reconnects the normal UI.
