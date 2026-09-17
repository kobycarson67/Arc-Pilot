# ARC Pilot Candidate Deployment Checklist

This release is for a controlled, fictional-data tablet pilot. The school gradebook and attendance system remain authoritative. Do not use real student information until privacy, recovery, and real-device gates are approved.

## Host

1. Host only the application files in this repository over HTTPS.
2. Confirm the chosen HTTPS host is reachable through the school firewall. GitHub Pages is known to be blocked in the classroom environment and is not an acceptable dependency for normal operation.
3. Do **not** upload classroom backup JSON files, student photos, passwords, Microsoft tokens, client secrets, or other private school data.
4. Keep the existing `weld_v013` storage key so upgrades can migrate existing pilot records.

## Install on the Samsung tablet

1. Open the approved HTTPS address in Chrome.
2. Use **Install app** or **Add to Home screen**, then launch ARC from its icon.
3. Confirm ARC opens in standalone mode without normal browser controls.
4. In **Settings → App & Sync**, request persistent storage and export a recovery backup.

## Required real-device tests

1. Create only fictional test records, close ARC completely, reopen it, and confirm the records remain.
2. Restart the tablet and repeat the persistence check.
3. Turn off Wi-Fi, reopen ARC from its icon, and confirm the main menu and normal cached workflows open.
4. Reconnect Wi-Fi and confirm ARC reports online status.
5. Capture and upload a fictional work photo; close and reopen ARC and confirm the image remains available.
6. Export a backup, import it on a clean test profile/device, and confirm counts and representative records.
7. Alter a copy of a new backup file and confirm ARC rejects it with an integrity error.
8. Install a later build and confirm ARC offers **Reload & Update** between entries rather than changing the running app mid-entry.

## Still blocked before real student data

- OneDrive recovery/synchronization is not connected.
- Backup JSON is not encrypted and must be handled as private school data.
- Authentication and role access are not implemented.
- Device-only photos are not cross-device protection.
- Long-running accumulation, semester/year rollover, and version migration still require real-device validation.
