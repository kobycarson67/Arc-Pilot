# ARC Academic Administration / Schedule Parity Repair 3 — 2026-10-05

## Authority and boundary

Repair 3 began from local Repair 2 commit `6d187e1c9803bd46f3bef332b652e22e550b8705`, tree `ccb35e0972f6fd3002e046effbed56768298b1db`, with rollback `rollback/pre-academic-administration-schedule-parity-repair-3`. Normal ARC remains Schema 7 / `V7_ONLY`.

The independent Repair 2 review established that replacement rows could lose their original end boundary, move validation considered only the first day, known Semester schedules could omit Planning, target Semester validation did not cover the full interval, and several v8 consumers still read static Section period/Semester metadata.

## Completed repair

- Section and Planning movements preserve the source `effectiveTo`. Later moves close the source on the previous day; same-day changes revise the starting row without creating an invalid interval.
- Movement creates all candidate rows first and checks their complete intervals against active and future Section and Planning authority. A later conflict fails before any write.
- Newly created Semester-scoped Section and Planning placements default to the Semester end when no earlier end is supplied.
- A known Semester Transition requires explicit Planning, validates every class and Planning interval through the target Semester end, revalidates persisted authority during apply, preserves continue identity, and never truncates preconfigured future authority. Unknown future schedule remains nonmutating.
- `ArcEffectiveSectionContext` is the shared read-only current-v8 resolver. It returns durable Section, Course, School Year, Semester, period, placement identity, and effective dates; missing or ambiguous placement fails closed.
- Static `Section.period` and `Section.semesterId` remain creation/bootstrap metadata only after v8 placement authority exists.

## Consumers reconciled

- `ArcAcademicConsumerProjection`
- `ArcAttendanceAuthorityAdapter` and `ArcV8Attendance`
- `ArcV8BoothOperations`
- `ArcStudentHistoryProjection`
- `ArcDailyTeachingProjection` and its isolated verification composition
- `ArcV8CurriculumPacing`
- `ArcV8BackupRecovery`

Sequential Semester placements for the same durable Section now support exact historical S1 context and current S2 context without changing the Section identity.

## Normal ARC action contract

The existing normal Schedule UI, labels, controls, navigation, defaults, and Schema-7 mutations remain unchanged. Payload-only enrichment passes values the UI already owns for calendar day, calendar event, Planning/Section movement, and Semester Transition. `ArcScheduleAuthorityAdapter` normalizes isolated product actions, requires deterministic academic resolution, refuses missing or ambiguous context, and never dual writes. `V7_ONLY` still invokes exactly one legacy callback.

## Static audit

[`ARC_SCHEDULE_SECTION_CONTEXT_STATIC_AUDIT_2026-10-05.md`](ARC_SCHEDULE_SECTION_CONTEXT_STATIC_AUDIT_2026-10-05.md) classifies all 42 direct named Section period/Semester matches: 40 `LEGACY_V7_ONLY`, 1 `CREATION_METADATA_ONLY`, 1 `HISTORICAL_ORIGIN_CORRECT`, 0 unclassified, and 0 `UNRESOLVED`. Current-v8 consumer reads listed above were repaired and no longer contain direct static Section field reads.

## Preserved boundaries

No production database or Samsung was accessed. No academic configuration, real Student data, package transition, Lesson policy/content change, publication, deployment, dual write, normal-v8 activation, or authority transfer occurred. No schema, IndexedDB version, store, build identifier, or service-worker cache authority changed.

## Remaining boundary

This is local service, adapter, projection, and compatibility evidence. Production migration/application, Student/Enrollment/Schedule Assignment coordination, build/cache integration for any future publication, production-shaped browser verification, Samsung verification, and authority transition remain separately authorized work. The next bounded step should be independent review of Repair 3 followed by a separately authorized publication/physical-verification checkpoint; it must not configure or activate academics.
