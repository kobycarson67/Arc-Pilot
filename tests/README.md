# ARC regression tests

Run the permanent dependency-free gate from the repository root:

```bash
python tests/regression_static.py

# Schema v8 Stage 1 isolated IndexedDB storage, identity, transactions, upgrades, concurrency, and reset contracts
node tests/arc_v8_storage.test.js
node tests/arc_v8_academic.test.js
node tests/arc_v8_activity.test.js
node tests/arc_v8_project.test.js
node tests/arc_v8_evidence.test.js
node tests/arc_v8_workplace_safety.test.js
node tests/arc_v8_gradebook.test.js
node tests/arc_v8_attendance.test.js
node tests/arc_v8_artifacts.test.js
node tests/arc_v8_booth_operations.test.js
node tests/arc_v8_backup_recovery.test.js
node tests/arc_v8_stage12_integration.test.js
node tests/arc_v8_production_initialization.test.js
node tests/arc_v8_academic_cutover.test.js
node tests/arc_v8_stage2_verification.test.js
node tests/arc_v8_production_academic_configuration.test.js

# Stage 14 P1 frozen v7-to-v8 no-regression parity contract
node tests/stage14_parity_contract.test.js

# Stage 14 P2 academic-administration service authority
node tests/arc_v8_academic_administration.test.js

# Stage 14 P3 normal Schedule/calendar UI authority adapter
node tests/arc_schedule_authority_adapter.test.js

# Stage 14 P4 shared Student/Enrollment/Schedule Assignment projection and consumer scopes
node tests/arc_academic_consumer_projection.test.js

# Simulation Foundation isolation, deterministic fixtures, and host contracts
node tests/simulation_foundation.test.js
node tests/simulation_fixtures.test.js
node tests/simulation_index_integration.test.js

# Material Inventory physical-piece domain, host wiring, and Scenario 3 lab
node tests/material_inventory_v1.test.js
node tests/material_inventory_index_integration.test.js
node tests/simulation_fixtures.test.js
node tests/material_inventory_samsung_repair.test.js
node tests/material_inventory_samsung_repair_integration.test.js
node tests/material_inventory_modal_lifecycle.test.js

# Pre-Titanium global navigation, Samsung modal geometry, and bounded UX stabilization
node tests/pre_titanium_ux_stabilization.test.js
node tests/pre_titanium_modal_reproduction.test.js

# Titanium Foundation shell, identity boundary, navigation ownership, and tablet behavior
node tests/titanium_foundation.test.js
node tests/titanium_foundation_integration.test.js
node tests/titanium_foundation_repair_1.test.js
```

The gate protects contracts that should never disappear silently: the `weld_v013` storage key, schema/migration/recovery paths, grade and attendance engines, pacing, projects, Technical scoring, behavior, photo adapters, PWA installability/offline shell, older-Safari syntax compatibility, and a basic client-secret guardrail.

GitHub Actions runs this gate automatically on `main`, `dev/**`, and pull requests to `main`.

## Release rule

A version is not promoted to the known-good baseline merely because this static gate passes. Feature-specific behavioral tests and actual-device tests remain required where applicable. The hosted PWA must also be tested on unrestricted hardware for installation, camera, offline reopening, and storage behavior.

## Privacy rule

Never commit real student records, classroom backup JSON, student photos, Microsoft tokens, client secrets, passwords, or other private school data to this repository. Regression fixtures committed here must be fictional/synthetic only.
