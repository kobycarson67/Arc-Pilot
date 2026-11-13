# Today schedule read-only destination repair

Date: 2026-11-13. Local isolated candidate only, atop c7f08a98f20818c282a3cb55381a2c180eff41bf.

## Governing scope
Dashboard View Full Schedule, navRender('schedule'), and Schedule Setup Back all referenced absent renderScheduleHome. Available Git history contains no prior function implementation. Surviving navigation labels identify Today's Schedule, not a calendar or editor. The authorized repair supplies the missing read-only today destination; it is not restoration of recovered historical code.

## Authority and presentation
- Current-date schedule comes from existing scheduleAdmin.scheduleForDate(day); planning comes from planningForDate(currentSchoolYear,day).
- Classes use academicConsumerProjection(day) effective Section contexts, not static Section.period.
- Today and exact date are explicit; timetable contains resolved period/time/class/planning facts only.
- Noninstructional dates display no instructional periods. Missing authority fails closed, without substituting a default timetable. Empty supported result is explicit.
- Existing Dashboard, Calendar, Setup and class links remain navigation only. No owner mutation, default creation or classroom-data persistence was added.
- Async read completion checks both DOM identity and active route, so older/repeated requests cannot hijack subsequent navigation.
- Legacy/scenario branch uses its existing resolved-day compatibility helpers; no authority transition is performed.

## Focused verification
Seven focused tests cover regular and modified bells, effective placement differing from static period, planning, holiday/noninstructional mode, empty/missing/mismatched date, unavailable authority, delayed success/failure after navigation and repeated view requests. Existing schedule adapter8/8 and exact resolver20/20 pass.
Full gate and independent native/visual results are recorded in the external final report. No production/tablet/publication actions or shared schedule changes.
