const assert=require('assert');
const T=require('../src/teaching_tips');
const fs=require('fs');
let pass=0,total=0;function test(name,fn){total++;try{fn();pass++;console.log('PASS',name);}catch(e){console.error('FAIL',name,e.message);process.exitCode=1;}}
test('safety lesson receives safety support',()=>assert(T.topics({title:'PPE and Shop Safety'}).includes('safety')));
test('welding demonstration receives demonstration support',()=>assert(T.topics({strategies:'Demonstrate welding machine setup'}).includes('demonstration')));
test('defect lesson receives troubleshooting support',()=>assert(T.topics({title:'Weld Defects and Corrections'}).includes('troubleshooting')));
test('project lesson receives launch support',()=>assert(T.topics({title:'Fabrication Project Blueprint'}).includes('launch')));
test('generic lesson receives practical fallback',()=>assert.deepEqual(T.topics({title:'Course Review'}),['questioning','checking']));
test('lesson can explicitly configure topics',()=>assert.deepEqual(T.topics({teachingTipTopics:['differentiation','questioning']}),['differentiation','questioning']));
test('unknown explicit topics are ignored',()=>assert.deepEqual(T.topics({teachingTipTopics:['unknown']}),['questioning','checking']));
test('recommendations never write lesson data',()=>{let l={title:'Safety'};let before=JSON.stringify(l);T.recommend(l);assert.equal(JSON.stringify(l),before);});
test('catalog covers all v1 topics',()=>['demonstration','questioning','troubleshooting','safety','checking','differentiation','launch'].forEach(k=>assert(T.catalog[k])));
test('lesson bank renders optional teaching tips',()=>{let html=fs.readFileSync('index.html','utf8');assert(html.includes('${teachingTipsHtml(l)}'));assert(html.includes('Teaching Tips</b> <span class="pill">Optional</span>'));});
test('offline shell caches teaching tips',()=>assert(fs.readFileSync('sw.js','utf8').includes('./src/teaching_tips.js')));
test('teaching tips use contextual titanium treatment',()=>assert(fs.readFileSync('src/arc_visual_foundation.css','utf8').includes('.arc-teaching-tips{')));
if(!process.exitCode)console.log('\n'+pass+'/'+total+' Teaching Tips tests passed.');
