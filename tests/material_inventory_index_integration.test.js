const assert=require('assert'),fs=require('fs');
const html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('app-build.js','utf8');
assert(html.includes('src/material_inventory.js'));assert(sw.includes('./src/material_inventory.js'));
assert(html.includes('Current Stock')&&html.includes('History / Usage')&&html.includes('Definitions'));
assert(html.includes('+ Record Material Use/Waste'));assert(html.includes('commitMaterialInventory'));
assert(html.includes('Project assignment never consumes material automatically.'));
assert(build.includes("build:'arc-schema-v8-integration-verification-12-sidebar-repair-2-repair-1-fixture-init-repair-1-stage2-physical-verification-bridge-1-reload-rehydration-repair-1-repair-2-cleanup-isolation-repair-1-production-academic-configuration-1-parity-p3-schedule-adapter-1-parity-p4-academic-consumers-1-parity-p5-attendance-pass-1-parity-p6-project-technical-1-parity-p7-competency-evidence-open-shop-1-parity-p8a-behavior-structural-foundation-1-parity-p8-workplace-safety-behavior-1-parity-p9-gradebook-authority-1'"));assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'));
console.log('PASS Material Inventory v1 host, project context, build, schema, and offline integration');
