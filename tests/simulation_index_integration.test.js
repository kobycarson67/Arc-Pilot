const assert=require('assert'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('app-build.js','utf8');
['src/simulation_foundation.js','src/simulation_fixtures.js'].forEach(asset=>{assert(html.includes(asset),'host must load '+asset);assert(sw.includes('./'+asset),'offline shell must cache '+asset);});
assert(html.includes('Demo & Testing'));assert(html.includes('Back Up & Enter Simulation'));assert(html.includes('Safety snapshot verified'));assert(html.includes('Leave Simulation'));assert(html.includes('Reset Simulation'));assert(html.includes('FICTIONAL DATA'));
assert(html.includes('simulationManager.resume()'),'restart must resume active simulation');assert(html.includes('simulationManager.saveActive(state)'),'ordinary save must route to active simulation store');assert(html.includes('Leave the simulation before importing'),'backup import must not cross the active simulation boundary');
assert(html.includes('.simulation-banner{display:flex'),'persistent simulation banner must participate in measured sticky header layout');assert(html.includes('requestAnimationFrame(updateStickyHeaderOffset)'),'navigation changes must remeasure the full header');
assert(html.includes('✓ Backup exported successfully'));assert(build.includes("build:'pre-titanium-ux-stabilization-1'"));
assert(!html.includes('Create Simulation from Live Classroom'));assert(!html.includes('Fast Forward'));
console.log('PASS Simulation Foundation host, offline, build, and safety UI contracts');
