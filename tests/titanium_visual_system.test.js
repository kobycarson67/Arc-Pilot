const assert=require('assert');
const fs=require('fs');

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('src/arc_titanium_visual_system.css','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const build=fs.readFileSync('app-build.js','utf8');

const inlineEnd=html.indexOf('</style>');
const visualLink=html.indexOf('src/arc_titanium_visual_system.css');
assert(visualLink>inlineEnd,'Titanium design system must load after legacy inline presentation');
assert(sw.includes("'./src/arc_titanium_visual_system.css'"),'offline shell must cache the visual system');
assert(build.includes("build:'arc-schema-v8-integration-verification-12-sidebar-repair-2-repair-1-fixture-init-repair-1-stage2-physical-verification-bridge-1-reload-rehydration-repair-1-repair-2-cleanup-isolation-repair-1-production-academic-configuration-1-parity-p3-schedule-adapter-1-parity-p4-academic-consumers-1-parity-p5-attendance-pass-1-parity-p6-project-technical-1-parity-p7-competency-evidence-open-shop-1-parity-p8a-behavior-structural-foundation-1-parity-p8-workplace-safety-behavior-1-parity-p9-gradebook-authority-1-parity-p10a-unified-student-history-1-parity-p10b-ui-1-parity-p10c-ui-1'"));
assert(html.includes('const CURRENT_SCHEMA_VERSION = 7;'));

['--t-bg-canvas','--t-surface-1','--t-text','--t-blue','--t-success','--t-warning','--t-danger','--t-shadow-focus'].forEach(token=>assert(css.includes(token),'missing semantic token '+token));
assert(css.includes('[data-arc-theme="titanium-welding"]'),'theme must remain pathway-scoped');
assert(css.includes('body[data-arc-theme="titanium-welding"]'));
assert(css.includes('@media (prefers-reduced-motion:reduce)'));
assert(css.includes(':focus-visible'));

['.arc-sidebar','.arc-context-header','.card','.btn','.tab','input,select,textarea','table','.modalbox','.student-profile-nav','.roster-project-button','.arc-dashboard-hero','.inventory-item','.material-family-card','.booth-badge','.arc-project-card','.arc-teaching-tips','.simulation-banner','.arc-environment-notice'].forEach(selector=>assert(css.includes(selector),'representative component missing '+selector));
assert(css.includes('.pill.good')&&css.includes('.pill.warn')&&css.includes('.pill.bad'),'functional statuses must retain distinct semantics');
assert(html.includes('id="arcEnvironmentNotice"'));
['FICTIONAL STUDENT DATA ONLY','OneDrive sync is architected but not connected','not cross-device protection','Encryption and login are not yet available'].forEach(fact=>assert(html.includes(fact),'pilot safety fact missing: '+fact));
assert(html.includes('document.body.classList.toggle("arc-simulation-active", !!marker)'));
assert(html.includes('More Than Welding. A Brighter Future.'));
assert(!/https?:\/\//.test(css),'visual system must not introduce remote imagery or dependencies');

console.log('PASS Titanium Visual System semantic, representative-surface, accessibility, safety, offline, and pathway-scope contracts');
