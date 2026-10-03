# ARC P10D-PU2 Samsung Upgrade Bridge Publication

Date: 2026-10-03  
Classification: engineering-only protected-production upgrade bridge and guarded publication  
Normal classroom authority: Schema 7 / `V7_ONLY`

## Implemented boundary

The existing Stage-2 engineering verification page now contains one separated **Protected production structural upgrade — engineering only** section. Normal ARC navigation and `index.html` remain unchanged.

The explicit physical bridge:

- accepts only exact database identity `arc_classroom_v8`;
- performs an unversioned read-only inspection before current storage can open production;
- requires exact protected Schema 8 / IndexedDB 10 / 53-store empty authority;
- captures a complete historical portable backup directly from the live database without requesting an upgrade;
- verifies the generated or reloaded backup through the accepted PU1 verifier;
- requires operator, publication commit/tree, rollback reference, and exact confirmation `UPGRADE PROTECTED PRODUCTION TO IDB14`;
- delegates the structural migration exclusively to the accepted PU1 coordinator;
- verifies exact Schema 8 / IndexedDB 14 / 74 stores, the 21 added stores empty, healthy integrity, preserved protection, protected-reset refusal, and `V7_ONLY`;
- exposes a verified current 74-store recovery backup; and
- contains no instructional import, package-event, delete, reset-success, authority-transfer, or normal-UI path.

The page publication identity is supplied in the engineering URL as exact `publicationCommit` and `publicationTree` parameters. Entered identity must match those values before the upgrade control can enable. Page load itself opens no database and cannot upgrade production.

Runtime revision: `p10d-pu2-protected-upgrade-bridge-1`.

## Real Edge rehearsal

Installed Microsoft Edge 154.0.4258.37 and a new task-owned profile exercised the physical bridge itself against the exact historical protected production foundation reconstructed from published commit `52b7d1b3ed920c0e889e211e41ea34b6e0395bbd`, tree `521e44fa1254e3f70b47b91d99d5749f7dabdcc0`.

The rehearsal passed:

1. exact read-only 10/53 inspection;
2. live 53-store recovery capture and accepted PU1 verification;
3. page-style reload and downloaded-backup revalidation;
4. exact operator/publication/tree/rollback/confirmation gates;
5. ordered 10→11→12→13→14 execution through PU1;
6. exact 14/74 verification;
7. all 21 added stores empty;
8. no instructional content or package events;
9. preserved `V7_ONLY`, no real-Student authorization, no classroom transfer, healthy integrity, and protected-reset refusal;
10. verified current 74-store recovery backup; and
11. task database/profile/harness cleanup.

| Recovery artifact | File SHA-256 | Package SHA-256 |
|---|---|---|
| Physical-bridge pre-upgrade IDB-10 backup | `8710ef78b5b3150b5a5bb6472c08eb2e289b2c031ac6f4b8c46518719f88d05d` | `493e60303d0bfd491b32e31bbf223add6796112b3ac32ba2bad27df08a57d2c4` |
| Physical-bridge post-upgrade IDB-14 backup | `acdb375fb3c142d372d1839896a013ae3e6db28d8916d85204f749ab30499a6d` | `23c78ee56a83e27656960fe75a871e9ab33b90825838386ef5950aa6ae2f2619` |

Failed engineering attempts remain preserved as lineage. They exposed only clock-contract adaptation defects in the new physical bridge. Existing storage, migrations, backup/recovery, production initialization, and PU1 coordinator required no changes.

## Regression-gate maintenance

The pre-publication gate initially stopped on five historical P10D/source tests that correctly protected their accepted historical artifacts but also pinned the current service worker and other runtime files forever to older commits. The first `p10d_instructional_reconciliation` pin and the remaining four P10D-R1A, P10D-R1B, repository-inventory, and source-authority pins were repaired without changing PU2 bridge/runtime bytes.

Generator-driven tests now capture exact current raw runtime bytes before execution and require exact byte equality afterward. The repository-inventory test retains its historical reconciliation/parity pins while directly proving normal ARC remains Schema 7 / `V7_ONLY` and does not load P10D artifacts as runtime authority. All historical manifest, queue, disposition, source, transcription, and parity pins remain intact.

The repaired suites passed `9/9`, `8/8`, `20/20`, `7/7`, and `7/7`; the full real-checkout JavaScript gate passed `101/101` and the static gate passed `47/47`.

## Publication and authority boundary

PU2 authorizes a guarded, no-force fast-forward publication after candidate regression succeeds and remote `main` is reverified unchanged. Pages must verify exact public bytes for the engineering page/controller, PU1 coordinator, physical bridge, service worker, and normal Schema-7 shell.

PU2 does not authorize opening, inspecting, backing up, or upgrading the physical Samsung database. It does not authorize instructional content import, normal v8 activation, real Student data, or classroom authority transfer.

After independent PU2 review, the next physical checkpoint begins with read-only Samsung inspection and pre-upgrade recovery capture only. Actual physical 10→14 mutation requires another explicit one-time authorization.
