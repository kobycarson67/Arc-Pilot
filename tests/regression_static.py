#!/usr/bin/env python3
"""ARC Pilot dependency-free regression gate.
Run from repository root: python tests/regression_static.py
This suite protects deployment, persistence, migration, grading, attendance,
photo, and PWA contracts that must not silently disappear between releases.
"""
from pathlib import Path
import json, re, sys

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'index.html').read_text(encoding='utf-8')
MANIFEST=json.loads((ROOT/'app.webmanifest').read_text(encoding='utf-8'))
SW=(ROOT/'sw.js').read_text(encoding='utf-8')
checks=[]

def check(name, ok):
    checks.append((name,bool(ok)))

def has(text): return text in HTML

# Persistence / migration contracts
check('storage key preserved', 'const STORAGE_KEY = "weld_v013";' in HTML)
check('schema is v7', 'const CURRENT_SCHEMA_VERSION = 7;' in HTML)
check('pre-upgrade recovery preserved', 'weld_v013_preupgrade_recovery' in HTML)
check('import rollback preserved', 'weld_v013_import_rollback' in HTML)
check('migration function present', has('function migrateStateData('))
check('state validation present', has('validateCurrentStateShape'))
check('save persists current schema', has('state.schemaVersion = CURRENT_SCHEMA_VERSION'))
check('backup export present', has('WeldingClassroomBackup'))
check('rollback export present', has('WeldingClassroomRollback'))

# Classroom engine contracts
for label, token in [
 ('grade snapshot','function gradeSnapshot('),
 ('grade scope','function gradeRecordScopeState('),
 ('attendance records','function attendanceRecord('),
 ('attendance status','function attendanceStatus('),
 ('pacing forecast','function computePacingForecast('),
 ('student project save','function saveStudentProjectCopy('),
 ('technical scoring','function saveStudentTechnical('),
 ('class technical scoring','function saveClassTechScore('),
 ('behavior events','function saveBehaviorEvent('),
 ('photo save adapter','function savePhotoAsset('),
 ('photo load adapter','function loadPhotoAsset('),
 ('prepared photo workflow','function savePreparedStudentPhoto('),
]: check(label, has(token))

# PWA / installability contracts
check('standalone manifest', MANIFEST.get('display')=='standalone')
icons={i.get('sizes') for i in MANIFEST.get('icons',[])}
check('192 icon declared','192x192' in icons)
check('512 icon declared','512x512' in icons)
maskable={i.get('sizes') for i in MANIFEST.get('icons',[]) if 'maskable' in i.get('purpose','').split()}
check('192 maskable icon declared','192x192' in maskable)
check('512 maskable icon declared','512x512' in maskable)
check('192 icon exists',(ROOT/'icons/icon-192.png').is_file())
check('512 icon exists',(ROOT/'icons/icon-512.png').is_file())
check('192 maskable icon exists',(ROOT/'icons/icon-maskable-192.png').is_file())
check('512 maskable icon exists',(ROOT/'icons/icon-maskable-512.png').is_file())
check('touch icon exists',(ROOT/'icons/apple-touch-icon-180.png').is_file())
check('favicon exists',(ROOT/'icons/favicon-32.png').is_file())
check('service worker registered', has('serviceWorker'))
check('service worker caches index','./index.html' in SW)
check('service worker caches manifest','./app.webmanifest' in SW)
check('service worker caches 192','./icons/icon-192.png' in SW)
check('service worker caches 512','./icons/icon-512.png' in SW)
check('service worker caches maskable icons','./icons/icon-maskable-192.png' in SW and './icons/icon-maskable-512.png' in SW)
check('service worker caches touch and favicon','./icons/apple-touch-icon-180.png' in SW and './icons/favicon-32.png' in SW)
check('service worker caches deployment module','./src/deployment_readiness.js' in SW)
check('service worker update is user controlled','SKIP_WAITING' in SW and 'self.skipWaiting()' not in SW.split("message",1)[0])
check('navigation has offline fallback',"request.mode==='navigate'" in SW and "caches.match('./index.html')" in SW)
check('backup integrity present',has('ArcDeployment.stateIntegrity') and has('ArcDeployment.verifyStateIntegrity'))
check('persistent storage status present',has('navigator.storage.persist'))

# Compatibility / privacy guardrails
check('no executable optional chaining', not re.search(r'(?<![?])\?\.(?!\.)', HTML))
check('no executable nullish coalescing', '??' not in HTML)
check('no embedded Microsoft client secret', not re.search(r'client[_ -]?secret\s*[:=]\s*["\'][^"\']+', HTML, re.I))

failed=[name for name,ok in checks if not ok]
for name,ok in checks:
    print(('PASS' if ok else 'FAIL')+'  '+name)
print(f'\n{len(checks)-len(failed)}/{len(checks)} checks passed')
if failed:
    print('Regression gate FAILED:', ', '.join(failed))
    sys.exit(1)
print('ARC regression gate PASSED')
