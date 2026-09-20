const assert=require('assert'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('app-build.js','utf8');
assert(html.includes('src/material_inventory.js'));assert(sw.includes('./src/material_inventory.js'));
assert(html.includes('Current Stock')&&html.includes('History / Usage')&&html.includes('Definitions'));
assert(html.includes('+ Record Material Use/Waste'));assert(html.includes('commitMaterialInventory'));
assert(html.includes('Project assignment never consumes material automatically.'));
assert(build.includes("build:'titanium-foundation-repair-1'"));assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'));
console.log('PASS Material Inventory v1 host, project context, build, schema, and offline integration');
