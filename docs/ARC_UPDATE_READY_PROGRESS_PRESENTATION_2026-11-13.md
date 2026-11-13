# Verified updater progress presentation repair

Date: 2026-11-13
Base: installed source 24e959723d687a675e3d825a0f52dd55e546d8ac
Local candidate only. No worker/cache/protocol/release identity or classroom changes.

Observed presentation: updater ready with full verified release, while the earlier progress line still said 64 of 114 files. Source root cause: controller set() merges state; STAGING stores progress, and readyFrom() previously omitted that field, leaving the old partial count (and a prior worker timeout errorCode) attached to verified-ready status.

The bounded fix sets progress:null and errorCode:null only in existing readyFrom(). It leaves the existing verified-ready message and all readiness/Apply validation unchanged. No fabricated complete counter is supplied; the independently verified completion statement replaces partial staging information.

Verification:
- New focused tests3/3: staging64/114 to verified-ready; provisioning timeout/progress to verified-ready; rejected receipt/cache proof remains blocked, not ready and cannot Apply.
- Existing App Update Controller20/20 pass, including explicit identity token, takeover timing, mismatch, cancellation, health and recovery boundaries.

External authentication/pending-worker behavior is a separate code investigation and is not repaired by these two presentation fields. No real sign-in or device action performed.
