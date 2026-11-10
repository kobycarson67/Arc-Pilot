# ARC Publication Byte Representation Repair 1

Date: 2026-11-09
Status: LOCAL CANDIDATE — INDEPENDENT SOURCE REVIEW REQUIRED

## Scope

This is a publication-integrity correction only. It preserves the published Sidebar Hubs, Gradebook, Attendance, and Technical Assignment application behavior at `3aca4f1e8afe82f56b10bad5b269de4984db98e0` and does not alter ARC runtime, database, classroom, authority, grading, recovery, or instructional semantics.

## Root cause

The publication-stop comparison labeled a Windows `git archive` extraction as immutable Git bytes. With system `core.autocrlf=true` and no explicit release-text attributes, that archive materialized CRLF working-tree bytes. Direct `git cat-file blob` inspection proved the published Git objects were already LF and matched GitHub Pages exactly:

- 114/114 authority assets: exact raw-byte match;
- 11/11 reviewed visuals: exact raw-byte match;
- 125/125 total release files: exact raw-byte match.

The manifest generator was already correct because it reads immutable blobs with `git cat-file`. The defective part was the external parity method and the live workflow's reliance on checkout-materialized files.

## Durable correction

- `.gitattributes` now fixes release text families to LF so clean checkouts and archives do not depend on machine-level `core.autocrlf`.
- Pages Live Verification discovers the exact 114-authority/11-visual inventory from the reviewed closure using immutable Git bytes.
- Every expected public file is materialized with `git cat-file blob "$GITHUB_SHA:<path>"` and compared byte-for-byte with the downloaded Pages response.
- Readiness markers also compare against immutable blobs rather than checkout files.
- Regression coverage refuses CRLF or bare CR in current immutable authority blobs, refuses checkout-byte comparisons in the workflow, and verifies the LF attribute contract.

No normalized comparison is accepted as release evidence. Exact-byte verification remains fail closed.

## Boundaries

No application build identity, authority closure, service-worker behavior, release manifest, compatibility receipt, release-evidence branch, Samsung state, IndexedDB record, Student, grade, V8 authority, or OneDrive recovery object is changed by this local candidate.

Publication of this candidate and any subsequent compatibility/distribution/Samsung action remain separately gated after independent source review.

## Verification

- Direct published-baseline proof: 114/114 immutable authority blobs and 11/11 reviewed visuals match live Pages bytes exactly.
- Focused manifest and Pages guardrails: passed.
- Retained physical-boundary and visual guardrails updated to consume the mechanically discovered closure: passed.
- Complete JavaScript inventory: 184/184 files passed.
- Static regression: 47/47 checks passed.
- Workflow Bash syntax, JavaScript parse checks, and `git diff --check`: passed.
- Installed-Edge classroom rehearsal was not repeated because no application, runtime, service-worker, database, or classroom byte changed; the accepted Sidebar/Technical browser evidence remains the applicable functional evidence.
