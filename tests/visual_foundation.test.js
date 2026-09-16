const assert=require('assert'),fs=require('fs'),path=require('path');
const css=fs.readFileSync(path.join(__dirname,'../src/arc_visual_foundation.css'),'utf8');
let pass=0,total=0;function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
test('defines royal blue identity token',()=>assert.ok(css.includes('--arc-blue:#2457d6')));
test('defines restrained gold identity token',()=>assert.ok(css.includes('--arc-gold:#c89b32')));
test('defines neutral charcoal foundation',()=>assert.ok(css.includes('--arc-charcoal:#171a21')));
test('button has minimum touch height',()=>assert.ok(/\.arc-btn\{[^}]*min-height:46px/.test(css)));
test('coarse pointer increases touch height',()=>assert.ok(css.includes('@media (pointer:coarse)')&&css.includes('min-height:50px')));
test('button physically moves when pressed',()=>assert.ok(css.includes('transform:translateY(var(--arc-press-distance))')));
test('pressed shadow compresses',()=>assert.ok(css.includes('--arc-shadow-pressed:')));
test('button surface includes restrained highlight',()=>assert.ok(css.includes('.arc-btn::before')&&css.includes('rgba(255,255,255,.48)')));
test('primary button uses blue dimensional gradient',()=>assert.ok(css.includes('.arc-btn-primary')&&css.includes('var(--arc-blue)')));
test('gold button uses dimensional gradient',()=>assert.ok(css.includes('.arc-btn-gold')&&css.includes('#f5df91')));
test('functional success remains green not gold',()=>assert.ok(css.includes('--arc-success:#16834a')));
test('functional danger remains red',()=>assert.ok(css.includes('--arc-danger:#b42318')));
test('keyboard focus remains visible',()=>assert.ok(css.includes('.arc-btn:focus-visible')));
test('disabled state cannot appear pressable',()=>assert.ok(css.includes('.arc-btn:disabled')&&css.includes('cursor:not-allowed')));
test('reduced motion preference is respected',()=>assert.ok(css.includes('@media (prefers-reduced-motion:reduce)')));
if(!process.exitCode)console.log('\n'+pass+'/'+total+' ARC Visual Foundation tests passed.');