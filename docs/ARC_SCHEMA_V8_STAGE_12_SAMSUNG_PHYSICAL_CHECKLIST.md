# ARC v8 Stage 12 — Samsung Physical Verification

**Status: PENDING INSTRUCTOR**

Do not use real student data. This checklist uses only `arc_classroom_v8_engineering_verification`. Production/Classroom Readiness remains unapproved.

## Session information

- Device/model:
- Android version:
- Chrome version:
- Mode: Chrome direct URL / installed PWA
- Build: `arc-schema-v8-integration-verification-12`
- Date/time:
- Tester:

## Checklist

| # | Step | Pass/Fail | Observed result / exact error | Screenshot reference |
|---:|---|---|---|---|
| 1 | Open the explicit engineering verification URL in Samsung Chrome. | | | |
| 2 | Confirm Engineering Verification labeling and database `arc_classroom_v8_engineering_verification`. | | | |
| 3 | Initialize the isolated fixture. | | | |
| 4 | Confirm Taylor baseline: Booth 4, Welding Coupon Holder, Fit-Up, Ready to Work. | | | |
| 5 | Select Ready for Review; confirm `Instructor Review — Fit-Up` and Booth 4 unchanged. | | | |
| 6 | Verify Fit-Up; confirm Ready to Work, Tack & Pre-Weld Check, and Booth 4 unchanged. | | | |
| 7 | Reinitialize as needed and run the Needs More Work path; confirm Fit-Up returns to work. | | | |
| 8 | Confirm the generated test Artifact is present. If browser media input is added later, capture/upload only synthetic media. | | | |
| 9 | Run checksum/readback verification. | | | |
| 10 | Create the backup package. | | | |
| 11 | Confirm backup status is Verified Healthy and readback verified. | | | |
| 12 | Destructively reset the verification database only. | | | |
| 13 | Confirm the fixture is gone. | | | |
| 14 | Restore the verified backup. | | | |
| 15 | Run parity; confirm exact pass. | | | |
| 16 | Confirm Taylor state is restored. | | | |
| 17 | Confirm Artifact media is restored and readable with matching checksum. | | | |
| 18 | Enable Production/Classroom Protected mode on the verification database. | | | |
| 19 | Close the tab/app. | | | |
| 20 | Reopen the same engineering URL. | | | |
| 21 | Confirm protected mode remains active. | | | |
| 22 | Demonstrate that ordinary reset is blocked. | | | |
| 23 | Background and foreground the app. | | | |
| 24 | Sleep and wake the screen. | | | |
| 25 | Close and reopen the installed PWA. | | | |
| 26 | Reopen through the direct Chrome URL. | | | |
| 27 | Disconnect network and confirm an already cached verification page reopens where service-worker scope permits. | | | |
| 28 | Confirm no spontaneous reset or data loss. | | | |
| 29 | Confirm there is no navigation trap or overlap in the engineering surface. | | | |
| 30 | Record every discrepancy, console/browser error, and relevant screenshot. | | | |

## Final physical result

- Overall status: PASS / FAIL / BLOCKED
- Failed step numbers:
- Data-loss or recovery concern:
- Error text:
- Screenshot/photo references:
- Additional observations:

Return this completed file or the same fields to the engineering task. Do not approve Production/Classroom Readiness from an incomplete or partially passing checklist.
