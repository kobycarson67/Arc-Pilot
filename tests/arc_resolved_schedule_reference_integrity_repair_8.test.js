const assert=require('assert');
const Backup=require('../src/arc_v8_backup_recovery');

const today='2026-09-27';
const bell=(id='bell',lifecycle='active')=>({id,authorityType:'bell-schedule',lifecycle,periods:[{code:'1'}]});
const mode=(id='mode',week={},extra={})=>({id,authorityType:'weekly-schedule-mode',effectiveFrom:'2026-08-01',effectiveTo:null,isDefault:true,week,lifecycle:'active',...extra});
const day=(id,date,extra={})=>({id,authorityType:'calendar-day',schoolDate:date,dayType:'school',instructionMode:'regular',bellScheduleId:null,lifecycle:'active',...extra});
const override=(id,date,extra={})=>({id,authorityType:'date-override',schoolDate:date,dayType:'school',instructionMode:'regular',bellScheduleId:null,scheduleModeId:null,lifecycle:'active',...extra});
const resolve=(rows,date='2026-09-29')=>Backup.resolveScheduleReference(rows,date,today);
let pass=0,total=0;
function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(error){console.error('FAIL',name,error);process.exitCode=1;}}

test('direct Date Override Bell resolves',()=>{let r=resolve([bell(),override('o','2026-09-29',{bellScheduleId:'bell'})]);assert(r.usable&&r.bellScheduleId==='bell');});
test('direct Calendar Day Bell resolves',()=>{let r=resolve([bell(),day('d','2026-09-29',{bellScheduleId:'bell'})]);assert(r.usable&&r.calendarDayId==='d');});
test('explicit named mode weekday Bell resolves',()=>{let r=resolve([bell(),mode('named',{tuesday:{bellScheduleId:'bell',instructionMode:'regular'}},{isDefault:false}),override('o','2026-09-29',{scheduleModeId:'named'})]);assert(r.usable&&r.scheduleModeId==='named');});
test('explicit named mode may resolve outside its default interval',()=>{let r=resolve([bell(),mode('ended',{tuesday:{bellScheduleId:'bell',instructionMode:'regular'}},{isDefault:true,effectiveTo:'2026-09-01'}),override('o','2026-09-29',{scheduleModeId:'ended'})]);assert(r.usable);});
test('named mode missing the weekday fails',()=>{let r=resolve([bell(),mode('named',{monday:{bellScheduleId:'bell',instructionMode:'regular'}},{isDefault:false}),override('o','2026-09-29',{scheduleModeId:'named'})]);assert.equal(r.reason,'NO_USABLE_BELL_SCHEDULE');});
test('direct Bell wins when named mode lacks weekday',()=>{let r=resolve([bell(),mode('named',{monday:{bellScheduleId:'bell',instructionMode:'regular'}},{isDefault:false}),override('o','2026-09-29',{scheduleModeId:'named',bellScheduleId:'bell'})]);assert(r.usable);});
test('unique active default weekday Bell resolves',()=>{let r=resolve([bell(),mode('default',{tuesday:{bellScheduleId:'bell',instructionMode:'regular'}}),day('d','2026-09-29')]);assert(r.usable&&r.scheduleModeId==='default');});
test('missing default and direct Bell fails instructional date',()=>{assert.equal(resolve([day('d','2026-09-29')]).reason,'NO_USABLE_BELL_SCHEDULE');});
test('overlapping defaults are ambiguous',()=>{let rows=[bell(),mode('a',{tuesday:{bellScheduleId:'bell'}}),mode('b',{tuesday:{bellScheduleId:'bell'}})];assert.equal(resolve(rows).reason,'AMBIGUOUS_DEFAULT_MODE');});
test('duplicate Calendar Days fail',()=>{assert.equal(resolve([day('a','2026-09-29'),day('b','2026-09-29')]).reason,'DUPLICATE_CALENDAR_DAY');});
test('duplicate Date Overrides fail',()=>{assert.equal(resolve([override('a','2026-09-29'),override('b','2026-09-29')]).reason,'DUPLICATE_DATE_OVERRIDE');});
test('Date Override fields take precedence over Calendar Day fields',()=>{let r=resolve([bell('a'),bell('b'),day('d','2026-09-29',{bellScheduleId:'a'}),override('o','2026-09-29',{bellScheduleId:'b'})]);assert.equal(r.bellScheduleId,'b');});
test('Calendar Day direct Bell takes precedence over weekly Bell',()=>{let r=resolve([bell('a'),bell('b'),mode('m',{tuesday:{bellScheduleId:'a'}}),day('d','2026-09-29',{bellScheduleId:'b'})]);assert.equal(r.bellScheduleId,'b');});
test('noninstructional dated authority needs no Bell',()=>{let r=resolve([day('d','2026-09-29',{dayType:'pd',instructionMode:'none'})]);assert(r.usable&&!r.instructional);});
test('retired Bell is unusable for current or future authority',()=>{assert.equal(resolve([bell('bell','retired'),override('o','2026-09-29',{bellScheduleId:'bell'})]).reason,'NO_USABLE_BELL_SCHEDULE');});
test('retained retired Bell remains readable for ended history',()=>{let r=resolve([bell('bell','retired'),override('o','2026-09-26',{bellScheduleId:'bell'})],'2026-09-26');assert(r.usable&&r.bellSchedule);});
test('deliberately retired historical mode remains excluded without new policy',()=>{let r=resolve([mode('old',{saturday:{bellScheduleId:'bell'}},{lifecycle:'retired'}),override('o','2026-09-26',{scheduleModeId:'old'})],'2026-09-26');assert(r.usable&&r.scheduleMode===null);});
test('unavailable named mode fails current or future authority',()=>{assert.equal(resolve([override('o','2026-09-29',{scheduleModeId:'missing'})]).reason,'UNAVAILABLE_NAMED_MODE');});
test('weekday identity is deterministic UTC date authority',()=>{assert.equal(resolve([]).weekday,'tuesday');});
test('resolved result exposes exact source identities',()=>{let r=resolve([bell(),day('d','2026-09-29',{bellScheduleId:'bell'}),override('o','2026-09-29',{bellScheduleId:'bell'})]);assert.deepEqual([r.calendarDayId,r.dateOverrideId,r.bellScheduleId],['d','o','bell']);});

if(!process.exitCode)console.log(`\n${pass}/${total} ARC Resolved Schedule Reference Integrity Repair 8 focused tests passed.`);
