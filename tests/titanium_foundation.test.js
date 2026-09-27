const assert=require('assert');
const shell=require('../src/arc_titanium_shell');

assert.strictEqual(shell.CORE_NAME,'Advanced Readiness Classroom');
assert.strictEqual(shell.MASTER_TAGLINE,'Skills Today. Stronger Tomorrow.');
const welding=shell.identityFor({course:'wt'});
assert.strictEqual(welding.name,'Advanced Welding Classroom');
assert.strictEqual(welding.statement,'More Than Welding. A Brighter Future.');
assert.strictEqual(shell.identityFor({course:'awt'}).id,'welding');
assert.strictEqual(shell.identityFor({pathwayId:'welding'}).theme,'titanium-welding');

const groups=shell.navigation();
assert.deepStrictEqual(groups.map(x=>x.id),['classroom','instruction','activity-library','shop','arc']);
const actions=shell.actionMap();
assert.deepStrictEqual(actions,{
  main:'renderMainMenu',roster:'renderCurrentStudentDirectory',forecast:'renderClassForecast',attendance:'renderAttendance',projects:'showClassProjects',openshop:'renderOpenShopAll',
  lessonbank:'renderLessonBank',projectbank:'renderProjectBank',standards:'renderActiveCurriculum',inventory:'renderInventory',booths:'showBoothManager',
  notifications:'showNotifications',search:'showGlobalSearch',settings:'renderAppSettings'
});
const future=groups.flatMap(x=>x.items).filter(x=>x.future);
assert.deepStrictEqual(future.map(x=>x.id),['gradebook-future','today-focus','technical-assignments','skill-challenges','practice','resources','administration','help']);
assert(future.every(x=>!x.action),'docked future items must not fabricate routes');
assert(groups.flatMap(x=>x.items).filter(x=>x.classScoped).every(x=>['forecast','attendance','projects','openshop','booths'].includes(x.id)));
console.log('Titanium Foundation model tests passed.');
