// ─── SAMPLE DATA — NOT OFFICIAL KTU STUDENT DATA ──────────────────────────
// All student results and academic performance data below are illustrative
// mock data created for the REFORGE design challenge.

export const sampleStudent = {
  name: 'Arjun Krishnan',
  rollNumber: 'KTU21CS045',
  programme: 'B.Tech Computer Science and Engineering',
  college: 'College of Engineering, Trivandrum',
  currentSemester: 'S5',
  batch: '2021–2025',
  cgpa: 8.42,
  latestSgpa: 8.75,
  totalCreditsEarned: 112,
  totalCreditsRequired: 160,
};

export const semesterResults = {
  S1: {
    semester: 'S1',
    sgpa: 7.85,
    totalCredits: 20,
    subjects: [
      { code: 'MA101', name: 'Engineering Mathematics I', credits: 4, grade: 'B+', gradePoints: 8, status: 'Pass' },
      { code: 'PH101', name: 'Engineering Physics', credits: 4, grade: 'B', gradePoints: 7, status: 'Pass' },
      { code: 'CY101', name: 'Engineering Chemistry', credits: 3, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'BE101', name: 'Engineering Mechanics', credits: 4, grade: 'B+', gradePoints: 8, status: 'Pass' },
      { code: 'CS101', name: 'Basics of Civil and Mechanical Engineering', credits: 3, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'EC101', name: 'Basics of Electrical and Electronics Engineering', credits: 2, grade: 'B+', gradePoints: 8, status: 'Pass' },
    ],
  },
  S2: {
    semester: 'S2',
    sgpa: 8.10,
    totalCredits: 22,
    subjects: [
      { code: 'MA102', name: 'Engineering Mathematics II', credits: 4, grade: 'A-', gradePoints: 8.5, status: 'Pass' },
      { code: 'CS102', name: 'Programming in C', credits: 4, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'EC102', name: 'Electronics Circuits', credits: 3, grade: 'B+', gradePoints: 8, status: 'Pass' },
      { code: 'ME102', name: 'Engineering Drawing', credits: 4, grade: 'B+', gradePoints: 8, status: 'Pass' },
      { code: 'PH102', name: 'Engineering Physics Lab', credits: 2, grade: 'A+', gradePoints: 10, status: 'Pass' },
      { code: 'CS103', name: 'Python Programming', credits: 3, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'HS101', name: 'Life Skills', credits: 2, grade: 'A+', gradePoints: 10, status: 'Pass' },
    ],
  },
  S3: {
    semester: 'S3',
    sgpa: 8.30,
    totalCredits: 24,
    subjects: [
      { code: 'MA201', name: 'Discrete Mathematical Structures', credits: 4, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'CS201', name: 'Object Oriented Programming', credits: 4, grade: 'A-', gradePoints: 8.5, status: 'Pass' },
      { code: 'CS203', name: 'Logic System Design', credits: 4, grade: 'B+', gradePoints: 8, status: 'Pass' },
      { code: 'CS205', name: 'Data Structures', credits: 4, grade: 'A+', gradePoints: 10, status: 'Pass' },
      { code: 'CS207', name: 'Design and Analysis of Algorithms', credits: 4, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'CS209', name: 'Systems Programming Lab', credits: 2, grade: 'A+', gradePoints: 10, status: 'Pass' },
      { code: 'CS211', name: 'OOP Lab', credits: 2, grade: 'A+', gradePoints: 10, status: 'Pass' },
    ],
  },
  S4: {
    semester: 'S4',
    sgpa: 8.55,
    totalCredits: 24,
    subjects: [
      { code: 'MA202', name: 'Graph Theory', credits: 4, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'CS202', name: 'Computer Organisation', credits: 4, grade: 'A-', gradePoints: 8.5, status: 'Pass' },
      { code: 'CS204', name: 'Operating Systems', credits: 4, grade: 'A+', gradePoints: 10, status: 'Pass' },
      { code: 'CS206', name: 'Database Management Systems', credits: 4, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'CS208', name: 'Computer Networks', credits: 4, grade: 'B+', gradePoints: 8, status: 'Pass' },
      { code: 'CS210', name: 'DBMS Lab', credits: 2, grade: 'A+', gradePoints: 10, status: 'Pass' },
      { code: 'CS212', name: 'Networks Lab', credits: 2, grade: 'A', gradePoints: 9, status: 'Pass' },
    ],
  },
  S5: {
    semester: 'S5',
    sgpa: 8.75,
    totalCredits: 22,
    subjects: [
      { code: 'CS301', name: 'Data Structures and Algorithms', credits: 4, grade: 'A+', gradePoints: 10, status: 'Pass' },
      { code: 'CS303', name: 'Computer Organisation and Architecture', credits: 4, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'CS305', name: 'Theory of Computation', credits: 4, grade: 'B+', gradePoints: 8, status: 'Pass' },
      { code: 'CS307', name: 'Database Management Systems', credits: 4, grade: 'A', gradePoints: 9, status: 'Pass' },
      { code: 'MA301', name: 'Probability and Statistics', credits: 4, grade: 'A-', gradePoints: 8.5, status: 'Pass' },
      { code: 'CS309', name: 'Operating Systems', credits: 4, grade: 'A+', gradePoints: 10, status: 'Pass' },
    ],
  },
};

export const sgpaHistory = [
  { semester: 'S1', sgpa: 7.85 },
  { semester: 'S2', sgpa: 8.10 },
  { semester: 'S3', sgpa: 8.30 },
  { semester: 'S4', sgpa: 8.55 },
  { semester: 'S5', sgpa: 8.75 },
];

export const cgpaHistory = [
  { semester: 'S1', cgpa: 7.85 },
  { semester: 'S2', cgpa: 7.98 },
  { semester: 'S3', cgpa: 8.08 },
  { semester: 'S4', cgpa: 8.20 },
  { semester: 'S5', cgpa: 8.42 },
];

export const gradeDistribution = [
  { grade: 'A+', count: 8, color: '#6366F1' },
  { grade: 'A',  count: 10, color: '#06B6D4' },
  { grade: 'A-', count: 4, color: '#0EA5E9' },
  { grade: 'B+', count: 6, color: '#1A3A7C' },
  { grade: 'B',  count: 2, color: '#64748B' },
];
