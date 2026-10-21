# ARC Classroom Ready Assessment after Build 9

Date: 2026-10-20  
Scope: local fictional-data-only candidate

| Requirement | Classification | Evidence | Remaining gate |
|---|---|---|---|
| Dashboard | Implemented and accepted | Normal shell and retained regression/browser evidence | Physical acceptance for this candidate |
| Students | Implemented and accepted | Add, drop, re-enroll, move, duplicate safety, profiles, and roster integrations | Production transaction cutover and real Student authorization |
| Class Forecast | Implemented and accepted | Existing academic projection and schedule adapters | Physical acceptance |
| Attendance and Passes | Implemented and accepted | Correction/history and retained P5 owner tests | Production cutover |
| Projects and Open Shop | Implemented and accepted | P6/P7 services, cross-view projections, explicit instructor actions | Instructor acceptance of draft content/mappings |
| Gradebook and History | Implemented and accepted | Explicit grades, derived History, append-first corrections | Production cutover; manual external grade transfer remains |
| Today's Focus | Unresolved policy or external dependency | Existing surface | Instructor must choose initial trigger rules |
| Lesson Plans and Curriculum | Implemented but missing instructional acceptance | 124 preserved source Lessons, 124 replacements, grouped review workbench | Instructor grouped review; content remains draft |
| Project Library | Implemented but missing instructional acceptance | Useful-product direction and draft library | Final products, drawings, BOM, tolerances, rubrics |
| Technical Assignments | Implemented but missing instructional acceptance | Four retained practical draft concepts | Final activities, safety, equipment, and assessment details |
| Skill Challenges | Implemented but missing instructional acceptance | Draft library and proposed Lesson relationships | Instructor content and relationship review |
| Practice | Implemented but missing instructional acceptance | Draft library; non-graded/nonqualifying boundary | Instructor content review; no automatic Evidence |
| Material Inventory | Implemented but missing physical acceptance | Existing inventory workflow and retained tests | Physical operational acceptance |
| Booth Manager | Implemented but missing physical acceptance | Existing schedule/booth workflow and retained tests | Physical operational acceptance |
| Notifications | Implemented but missing policy | Existing notification view, badge, accessibility validation | Instructor must choose initial trigger rules |
| Search | Implemented and accepted | Existing normal-shell search tests | Physical acceptance for candidate |
| Administration | Partially implemented | Planning, SLO, coverage/readiness, instructional review, recovery and decision exports | Instructor-approved report catalog and external submission rules |
| Local V8 backup and protected media | Implemented locally | Schema 8 / IDB 14 / 74-store backup, inspect, corruption refusal, restore parity | Physical recovery acceptance |
| Legacy V7 photo custody | Implemented locally | Separate checksum-bound metadata/blob export and restore | Institutional custody and physical restore acceptance |
| OneDrive/off-device recovery | Unresolved institutional dependency | District / IT decision sheet; manual verified export boundary | Entra/OneDrive, privacy, retention, access, and custody approval |
| Unified P4-P10C production authority | Implemented as nonproduction proof; production unresolved | One task-owned database and activation lineage; inert cutover checklist | Fresh recovery, exact pre/post semantics, explicit cutover and physical acceptance |
| Real Student launch | Unresolved institutional and instructor authority | `realStudentDataAuthorized: false` | Privacy approval, recovery acceptance, production cutover, explicit authorization |

## Migration parity, Classroom Ready, and roadmap

- **Migration parity:** the academic foundation and domain owners are implemented and locally rehearsed. Production classroom transactions remain `V7_ONLY`; a successful nonproduction rehearsal is not a cutover.
- **Classroom Ready:** the main classroom workflows exist and are connected. Draft instructional content, trigger policy, report catalog, recovery custody, physical acceptance, and real Student approval are still required.
- **Long-term roadmap:** automatic institutional cloud integration, expanded reporting, and later feature growth remain outside the Classroom Ready finish line unless separately approved.

## Honest conclusion

This candidate closes locally implementable review, status, recovery, and preparation gaps. It does not declare ARC ready for real Students or production P4-P10C authority. Those decisions remain with the instructor, district / IT, and a separately authorized physical cutover.
