# Technical display parity repair

Date: 2026-11-13 UTC. Local candidate, not publication or physical acceptance.
Baseline: a16cadd1b558c189748cb72b73887bbbc62fbd21. Rollback ref: rollback/pre-technical-display-parity-repair-1.
Classification: corrective maintenance / Classroom Readiness Technical assignment and score display consistency.

Authority: Master Product Authority (one owning record, stable Student identity, historical truth), Authority Governance, Classroom Readiness Contract (cross-view consistency and Technical workflows). No policy invented.

## Cause and bounded change
The immediate assignment/score callbacks used raw Batch A overlay rows, while reopening used normalized profile rows. Raw Technical rows omitted the owning assignment date and version display metadata; legacy normalization then invented today's UTC date and generic type. Stored records and associations were correct.

The read-only Batch A Technical overlay now derives assignedDate/date from the exact ActivityAssignment and type/standard/topic/daySpecific/attendanceLinked from the exact ActivityVersion content. Both immediate and reopened consumers receive identical metadata. Existing source scores, history, identity, enrollment scope and Project projections are unchanged. Missing authoritative dates remain unknown rather than becoming today's date; legacy-only date fallback remains unchanged.

Build, shell and closure have a distinct technical-display-parity-repair-1 identity. No schema/store migration or classroom mutation. The old fictional source/ledger mismatch is not reconciled. No tests manipulate production data.

## Validation and delivery boundary
Focused regressions cover post-assignment and post-score/reopen parity, historical dates, UTC/local midnight, zero scores, missing metadata, Student isolation, unchanged source fixture data and retained legacy fallback. Full suite/static results recorded outside source. Independent review, exact release receipt, CI, immutable publication, current recovery custody and physical Samsung checks remain required. No prior CI exception inherited.
