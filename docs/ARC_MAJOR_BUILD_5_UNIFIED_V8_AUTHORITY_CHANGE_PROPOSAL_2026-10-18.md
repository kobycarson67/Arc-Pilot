# ARC Major Build 5 — bounded unified v8 authority change proposal

Status: **REQUIRES SEPARATE AUTHORIZATION**
Current result: `BLOCKED_AUTHORITY_CHANGE_REQUIRED`

## Verified boundary

Build 5 exercises P4–P10A through the accepted `arc_classroom_v8_batch_b_verification` owner chain. It does not claim one-database P4–P10C authority because:

- `src/arc_curriculum_pacing_authority_adapter.js` accepts only `V7_ONLY` and `V8_ISOLATED_VERIFICATION`, and binds the latter to `arc_classroom_v8_p10b_verification`.
- `src/arc_lesson_authority_adapter.js` accepts only `V7_ONLY` and `V8_ISOLATED_VERIFICATION`, and binds the latter to `arc_classroom_v8_p10c_verification`.
- `src/arc_batch_b_authority_activation.js` authorizes P8–P10A only and allows activation only in its dedicated verification database.
- Production P4–P10C authority remains `V7_ONLY`; there is no accepted activation lineage or rollback record for a combined owner.

Changing database names or bypassing these checks would create an unreviewed authority path. Build 5 fails closed instead.

## Exact separately authorized change

A later milestone may change only the following authority boundary after approval:

1. Add a reviewed unified fictional-verification state to `src/arc_curriculum_pacing_authority_adapter.js` and `src/arc_lesson_authority_adapter.js`. It must bind to one explicitly named task-owned database and must remain nonproduction.
2. Extend the coordinated activation record in `src/arc_batch_b_authority_activation.js` or a single successor owner so P4–P10C share one activation lineage, database identity, recovery version, and rollback identity.
3. Replace the protective preflight in `src/arc_classroom_completion_readiness.js` only after that authority record is independently accepted.
4. Add one atomic transition and rollback protocol covering all 74 stores. A failed owner write, reload, reopen, backup, or semantic postcondition must restore exact pretransition bytes.
5. Refuse mixed authority, missing owner records, stale activation records, dual write, database identity drift, incomplete recovery custody, real Student data, and any downstream automatic Evidence, grade, qualification, or Project completion.

## Required acceptance tests

- One database and one activation record are observed by P4–P10C after full process restart.
- Every owner reads and writes only through its existing service and adapter.
- P10B and P10C no longer need their separate verification databases for the authorized rehearsal.
- Wrong database, mixed states, stale records, partial transitions, worker restart, close/reopen, and restore failure all fail closed.
- Exact 74-store backup/restore parity and exact legacy-state preservation pass.
- Practice stays non-graded and nonqualifying; Gradebook and Evidence remain explicit instructor actions; History remains derived.
- Production remains `V7_ONLY`; no real Student authorization, Samsung action, publication, or authority transfer occurs.

This proposal is a bounded authority decision record. It is not implementation authorization.
