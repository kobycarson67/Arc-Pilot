# ARC Stage 14 — Stage 2 Production Initialization Checkpoint

## Purpose and authority

This checkpoint prepares the next bounded Stage 2 action after acceptance of the engineering physical checkpoint. It does not authorize or perform the production mutation.

- Documentation authority before this checkpoint: `6b0c9e3788cc70a49f30f97b53bd7dc00152d4d3`, tree `6186a7a782e8136fda043ba0d23c8177be77bb82`
- Published runtime authority: `52b7d1b3ed920c0e889e211e41ea34b6e0395bbd`, tree `521e44fa1254e3f70b47b91d99d5749f7dabdcc0`
- Published build suffix: `cleanup-isolation-repair-1`
- Published runtime revision: `stage2-reload-rehydration-repair-2-cleanup-isolation-repair-1`
- Pre-initialization Git rollback reference: `rollback/pre-stage-14-stage-2-production-v8-initialization` → `52b7d1b3ed920c0e889e211e41ea34b6e0395bbd`
- Academic authority before and after this bounded step: `V7_ONLY`

The accepted Samsung evidence remains unchanged. The historical cleanup remains **FAILED — `ISOLATION_VIOLATION`**. The Stage 2 verification database remains absent and must not be recreated.

## Existing implementation authority

`ArcV8ProductionInitialization` and the published Stage 2 engineering page already implement the required bounded production initialization. No additional runtime implementation or publication is required before the instructor-authorized execution.

The coordinator:

1. inspects only the exact `arc_classroom_v8` identity;
2. refuses missing operator, Git, tree, or rollback authority;
3. creates the exact Schema 8 / IndexedDB 10 / 53-store database only when inspection proves production absent;
4. verifies zero classroom-domain records and a healthy database audit;
5. creates and verifies a complete pre-protection recovery package;
6. atomically writes the initialization, zero-import reconciliation, and `Production/Classroom Protected` manifests;
7. closes, reopens, and re-inspects the exact production database;
8. creates and independently reads back the initial protected production recovery package, including store inventory, media inventory, SHA-256 integrity, and package checksum;
9. proves ordinary development reset is refused; and
10. returns `authorityState: V7_ONLY`, `classroomAuthorityTransferred: false`, and `realStudentDataAuthorized: false`.

No v7 content, fictional/test transaction, photo authority, Stage 12 engineering content, or Stage 2 verification content is imported.

## Immediate read-only gate

Immediately before any authorized mutation, Samsung Chrome must use the published Stage 2 engineering page to run **Inspect production only** once more.

Required result:

- `databaseName: "arc_classroom_v8"`;
- `exists: false`;
- `knownDatabases` contains only expected external discovery authorities;
- no unexplained production identity or content exists; and
- the page visibly shows build suffix `cleanup-isolation-repair-1` and runtime revision `stage2-reload-rehydration-repair-2-cleanup-isolation-repair-1`.

Inspection is read-only. If production exists or any authority is unexplained, stop without pressing initialization.

### Immediate gate result

**PASSED — instructor-reported Samsung Chrome inspection**

- `arc_classroom_v8`: `exists: false`
- complete `knownDatabases`: `arc_classroom_v8_engineering_verification` only
- `arc_classroom_v8_stage2_verification`: absent
- initialization performed: no
- academic activation performed: no
- verification fixture recreated: no
- cleanup rerun: no
- other mutation performed: no

This result authorizes requesting the separately bounded production-initialization decision. It does not itself authorize the mutation.

## Separately authorized initialization action

Only after the read-only result is returned and the instructor separately authorizes the production mutation may the Samsung operator enter:

- Operator authority: the instructor/operator identity entered by the instructor;
- Exact deployed commit: `52b7d1b3ed920c0e889e211e41ea34b6e0395bbd`;
- Exact deployed tree: `521e44fa1254e3f70b47b91d99d5749f7dabdcc0`;
- Exact rollback ref: `rollback/pre-stage-14-stage-2-production-v8-initialization`;
- Exact confirmation: `INITIALIZE PROTECTED EMPTY PRODUCTION`.

The operator may then press **Initialize protected empty production** exactly once.

The required authorization must identify the operator string and be equivalent to:

> I authorize one bounded Samsung Chrome execution of **Initialize protected empty production** against exact database `arc_classroom_v8`, using published commit `52b7d1b3ed920c0e889e211e41ea34b6e0395bbd`, tree `521e44fa1254e3f70b47b91d99d5749f7dabdcc0`, rollback reference `rollback/pre-stage-14-stage-2-production-v8-initialization`, and operator authority `<EXACT OPERATOR IDENTITY>`. This authorization creates only the protected empty Schema 8 / IndexedDB 10 / 53-store production foundation and its verified recovery packages. Academic authority remains `V7_ONLY`. It does not authorize Students, imports, academic configuration or activation, v7 write shutdown, fixture recreation, cleanup, or Stage 3.

Without that explicit authorization and exact operator identity, do not enter the confirmation or press initialization.

## Required success evidence

The complete returned result must be retained. Success requires all of the following:

- exact database identity `arc_classroom_v8`;
- Schema 8 and IndexedDB 10;
- exact 53-store inventory;
- zero classroom-domain records;
- recognized initialization, reconciliation, and protection manifests;
- zero imports and zero excluded identities;
- healthy audit;
- verified pre-protection recovery package;
- verified initial protected recovery package and completed-package readback;
- media inventory present and empty;
- package checksum recorded;
- protected reset refusal passed;
- `authorityState: V7_ONLY`;
- `classroomAuthorityTransferred: false`; and
- `realStudentDataAuthorized: false`.

After success, run read-only **Inspect production only** and retain the exact post-initialization output. Do not proceed to academic configuration or activation in the same authorization.

## Stop conditions

Stop without retry or scope expansion if:

- the immediate inspection does not report production absent;
- build, runtime, commit, tree, or rollback authority differs;
- the database identity is not exactly `arc_classroom_v8`;
- an unexpected existing database or record is found;
- the store manifest, schema, metadata, audit, media inventory, checksum, or readback differs;
- manifest provenance differs;
- recovery verification fails;
- protected reset refusal fails;
- the action would import v7, fictional, test, pilot, engineering, or photo data;
- the action would recreate `arc_classroom_v8_stage2_verification`;
- the action would create a Student or academic transaction;
- the action would activate academic consumers, disable v7 writes, or transfer authority; or
- the action would begin Stage 3.

## Exit boundary

This checkpoint exits only with a verified protected empty production database and its verified recovery point. It does not formally accept the Stage 2 academic authority transition. The next separately bounded work remains production academic configuration and consumer verification while classroom authority stays `V7_ONLY` until all transition gates pass.
