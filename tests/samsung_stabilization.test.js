const assert=require('assert');
const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
function has(text){return html.includes(text);}

assert(has('html,body{overscroll-behavior-y:none}'),'document must suppress browser overscroll refresh');
assert(has('installOverscrollGuard()'),'installed PWA must install touch overscroll guard');
assert(has('{ passive: false }'),'overscroll guard must be able to prevent the refresh gesture');

assert(has('const NAV_CONTEXT_KEY = "arc_v018_navigation_context"'),'navigation context must use isolated session metadata');
assert(has('sessionStorage.setItem(NAV_CONTEXT_KEY'),'navigation context must not be written into classroom state');
assert(has('if (!restoreNavigationContext()) renderMainMenu()'),'startup must restore safe context before falling back to Main Menu');

assert(has('id="navClassButton"'),'class chooser must use a controllable touch menu');
assert(has('function toggleClassMenu(event)'),'same class control must toggle its menu');
assert(has('if (!classWrap)\n        closeClassMenu();'),'outside-tap class menu dismissal must remain');
assert(!has('id="navClassSelect"'),'startup must not display a preselected native class selector outside class context');

assert(has('class="student-profile-nav"'),'student identity and tabs must have a sticky wrapper');
assert(has('.student-profile-nav{position:sticky'),'profile navigation must remain sticky while modal content scrolls');
assert(has('updateStickyHeaderOffset'),'profile modal must account for the measured global header');

assert(has('window.openCompetencyCode = code'),'rating changes must preserve the open competency');
assert(has('Saved: ${ratingDisplay(x.old)} → ${ratingDisplay(x.next)}'),'rating changes must show old-to-new confirmation');
assert(has('undoCompetencyChange'),'rating feedback must expose non-destructive undo');
assert(has('aria-pressed="${r === n ? "true" : "false"}"'),'selected competency rating must remain exposed');

assert(has('workplace-deduction ${activeRules.has(r.id) ? "is-active" : ""}'),'recorded Workplace rules must highlight their touch target');
assert(!/function attendanceRosterPriority\([^]*?if \(hasPass\)/.test(html),'active pass must not change roster priority');

const attendanceRow=html.slice(html.indexOf('function attendanceStudentRow'),html.indexOf('function renderAttendance'));
assert(attendanceRow.includes('attendance-choices'),'attendance row must render direct touch targets');
assert(!attendanceRow.includes('<select'),'attendance row must not use a status dropdown');
['present','unexcused','excused','tardy','activity','left_early','noclass'].forEach(status=>assert(html.includes(status),`attendance status ${status} must remain supported`));

assert(sw.includes("v0-18-samsung-stabilization-1"),'Samsung patch must use a fresh app-shell cache version');
assert(has('function showGlobalSearch()'),'existing student search must remain intact and unexpanded');
console.log('PASS Samsung stabilization contracts');
