# ARC Daily Teaching First Slice 1

Status: locally implemented for isolated review only. Normal classroom authority remains Schema 7 / `V7_ONLY`.

## Teacher result

The dedicated engineering page lets an instructor explicitly open a fictional sample dataset, choose one of two independently planned WT sample classes or an AWT absence case, see that Section's exact planned Lesson Version, and open concise differentiated guidance. The four lap-joint cards are stored Lesson content, not hard-coded groups. The view never assigns students, grades work, creates Evidence, advances pacing, or grants safety clearance.

## Owner contracts

`ArcV8LessonPlans` now accepts an optional `arc-teaching-guide-v1` object on an immutable Lesson Version. It validates exact Course scope, ordered text, unique pathway/help keys, safety prompts, draft-review provenance and source locators. Missing guidance remains valid for old Lessons. Corrections use the existing replacement Version lineage, so historical reads remain exact.

`ArcV8CurriculumPacing` now owns append-first `FOCUS_WINDOW_SET` events through `previewTeachingFocus`, `commitTeachingFocus`, and `getSectionTeachingFocus`. Focus uses an existing pacing item and exact Lesson Version, inclusive Semester-bounded dates, full/brief shared instruction, preview fingerprint, stale-revision protection, explicit correction/clear chains, overlap refusal and as-of reads. Generic pacing commands cannot create this event family. Focus changes do not alter progress, order, duration, anchor or completion.

## Isolation and fixture

The page is `engineering/arc_daily_teaching_verification.html`. Its coordinator is hard-bound to `arc_classroom_v8_daily_teaching_verification`; a competing name is rejected before open. Page load has no database side effect. **Open review dataset** is explicit, and fixture preparation is a second explicit action. Existing or unrecognized data is never cleared or overwritten.

The fixture contains no Students. It creates fictional 2031 academic records through existing Academic services, one fictional WT Lesson Version, two independent WT focus windows, and one AWT no-focus case. The exact draft source checksum is `bb11ff2828d0ffa3eddcb81801934a6207fc1d829fb7993928fc39718ee7eda9`; selected locators are recorded in the fixture. This is `draft_review_fixture` content and is not production instructional acceptance or a legacy import.

## Difference from the first-build plan

This milestone follows the later handoff's narrower allowlist. It does not alter the normal index, Titanium shell, existing P10B/P10C adapters, build/cache/service worker, schema or storage manifest. It uses a separate fixed coordinator because the existing isolated adapters deliberately bind other databases. Normal Today's Focus remains inert.

## Remaining boundaries

- No normal-shell or installed-PWA integration, publication, Samsung acceptance or classroom activation.
- No real instructional import, Student-to-path relationship, administrative output, Resources, Weekly Plans or Plan Preflight.
- Review navigation is local to the engineering page; installed-shell Android Back/reload behavior remains a later physical gate.
- Sample guidance is review material. Improved WT/AWT Lessons still require human-reviewed content authority before classroom use.

## Verification meaning

Focused Node tests cover Lesson validation and rollback, focus preview/commit and generic-route refusal, selected-class projection, safe renderer source contracts, and fixed-database/page boundaries. Full repository regression is required for the commit. Unless a browser run is separately recorded, UI interaction results are simulated/DOM-source contracts and browser visual acceptance remains pending.

## Next bounded recommendation

After independent review, authorize an isolated browser verification checkpoint for this exact engineering page using a new task-owned browser profile. Do not activate normal ARC or publish until browser behavior, content review, build/cache integration and the separate classroom-authority boundary are explicitly authorized.
