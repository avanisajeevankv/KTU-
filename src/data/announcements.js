// ─── SAMPLE DATA — NOT OFFICIAL KTU DATA ───────────────────────────────────
// All announcements below are illustrative mock data created for the
// REFORGE design challenge and do not represent official KTU communications.

export const announcements = [
  {
    id: 1,
    title: 'B.Tech S5 Regular Examination November 2026 — Timetable Published',
    category: 'Examination',
    date: '2026-10-05',
    description:
      'The timetable for B.Tech Semester 5 Regular Examinations scheduled for November 2026 has been published. Students are advised to check their respective programme timetables.',
    details:
      'Examinations will be conducted across all affiliated colleges from 10:00 AM to 1:00 PM. Students must carry their hall ticket and a valid college ID. Mobile phones are strictly prohibited inside the examination hall.',
    tag: 'exam',
    important: true,
  },
  {
    id: 2,
    title: 'Online Registration for S5 Regular Exam — Last Date Extended',
    category: 'Registration',
    date: '2026-10-03',
    description:
      'The last date for online registration for B.Tech S5 Regular November 2026 examinations has been extended to 18 October 2026 without a late fee.',
    details:
      'Students who have not yet completed registration must log in to the KTU portal and complete the process before 11:59 PM on 18 October 2026. A late fee of ₹300 per subject will be charged from 19 October to 25 October 2026.',
    tag: 'registration',
    important: true,
  },
  {
    id: 3,
    title: 'Supplementary Examination Results — S3 2025 Declared',
    category: 'Results',
    date: '2026-09-28',
    description:
      'Results for S3 Supplementary Examinations conducted in August 2026 have been declared. Students may view their results on the KTU portal.',
    details:
      'Students who are not satisfied with their results may apply for revaluation within 15 days from the date of publication. The revaluation fee is ₹500 per paper.',
    tag: 'results',
    important: false,
  },
  {
    id: 4,
    title: 'Campus Recruitment Drive — Infosys Registration Open',
    category: 'Placements',
    date: '2026-09-25',
    description:
      'Infosys has announced a campus recruitment drive for 2027 passing-out batches of B.Tech programmes. Eligible students may register through their TPO.',
    details:
      'Eligibility: B.Tech final year students with a minimum CGPA of 6.0. The selection process includes an aptitude test, technical interview and HR interview. Registration closes on 30 October 2026.',
    tag: 'placements',
    important: false,
  },
  {
    id: 5,
    title: 'Academic Calendar 2026–27 — Updated Version Published',
    category: 'Academic',
    date: '2026-09-20',
    description:
      'The updated academic calendar for the year 2026–27 has been published. Key dates include semester start, mid-semester break and end-semester examination periods.',
    details:
      'Odd semester classes commenced on 1 August 2026. Mid-semester break is scheduled for 25 October to 3 November 2026. Even semester will commence in January 2027.',
    tag: 'academic',
    important: false,
  },
  {
    id: 6,
    title: 'KTU Annual Tech Fest — IGNITE 2026 Registrations Open',
    category: 'Events',
    date: '2026-09-15',
    description:
      'Registrations are now open for IGNITE 2026, the annual inter-college technical festival of KTU. Events include hackathons, paper presentations and project exhibitions.',
    details:
      'The fest will be held from 15 to 17 November 2026 at CET Campus, Trivandrum. Students may register individually or as teams of up to four members.',
    tag: 'events',
    important: false,
  },
  {
    id: 7,
    title: 'CGPA Improvement Scheme — Applications Invited',
    category: 'Academic',
    date: '2026-09-10',
    description:
      'Students who wish to improve their CGPA by re-appearing in previously passed subjects may apply under the CGPA Improvement Scheme for the upcoming examination session.',
    details:
      'Applications must be submitted through the college office with the prescribed fee. Only subjects from the immediately preceding two semesters are eligible under this scheme.',
    tag: 'academic',
    important: false,
  },
  {
    id: 8,
    title: 'Anti-Ragging Committee — Awareness Session Scheduled',
    category: 'Notice',
    date: '2026-09-05',
    description:
      'An awareness session on anti-ragging norms and student rights will be conducted across all KTU-affiliated colleges during the week of 13–17 October 2026.',
    details:
      'Attendance is mandatory for all first-year students. Faculty coordinators are requested to arrange the session and submit attendance reports to the college office by 20 October 2026.',
    tag: 'notice',
    important: false,
  },
];

export const categories = ['All', 'Examination', 'Registration', 'Results', 'Placements', 'Academic', 'Events', 'Notice'];

export const upcomingEvents = [
  {
    id: 1,
    title: 'S5 Exam Registration Closes',
    date: '2026-10-18',
    type: 'deadline',
    description: 'Last date for online registration without late fee',
  },
  {
    id: 2,
    title: 'S5 Regular Exams Begin',
    date: '2026-11-05',
    type: 'exam',
    description: 'B.Tech S5 Regular Examination November 2026 commences',
  },
  {
    id: 3,
    title: 'Infosys Campus Drive Registration',
    date: '2026-10-30',
    type: 'placement',
    description: 'Registration deadline for Infosys campus recruitment',
  },
  {
    id: 4,
    title: 'Mid-Semester Break',
    date: '2026-10-25',
    type: 'academic',
    description: 'Classes suspended from 25 Oct to 3 Nov 2026',
  },
  {
    id: 5,
    title: 'IGNITE 2026 Tech Fest',
    date: '2026-11-15',
    type: 'event',
    description: 'KTU Annual Tech Fest at CET Campus, Trivandrum',
  },
];
