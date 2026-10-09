import { useState } from 'react';
import {
  BarChart2, TrendingUp, Award, CheckCircle,
  BookOpen, Download, Printer, ChevronRight,
  Info, AlertTriangle, Target, Zap
} from 'lucide-react';
import { SGPAChart, CGPAChart, GradeDistributionChart } from '../components/ResultsChart';
import PlacementPreparation from '../components/PlacementPreparation';
import PracticeModule       from '../components/PracticeModule';
import {
  sampleStudent, semesterResults,
} from '../data/resultsData';

const GRADE_COLORS = {
  'A+': 'text-violet-700 bg-violet-50 border-violet-200',
  'A':  'text-blue-700   bg-blue-50   border-blue-200',
  'A-': 'text-cyan-700   bg-cyan-50   border-cyan-200',
  'B+': 'text-indigo-700 bg-indigo-50 border-indigo-200',
  'B':  'text-slate-600  bg-slate-50  border-slate-200',
};

function downloadResultCSV(sem, data) {
  const student = sampleStudent;
  const header  = ['Subject Code', 'Subject Name', 'Credits', 'Grade', 'Grade Points', 'Status'];
  const rows    = data.subjects.map(s => [
    s.code, `"${s.name}"`, s.credits, s.grade, s.gradePoints, s.status,
  ]);
  const summary = [
    [], ['Semester', sem], ['SGPA', data.sgpa],
    ['Student', student.name], ['Roll Number', student.rollNumber],
  ];
  const csv = [
    ['KTU REFORGE — SAMPLE RESULT DATA (NOT OFFICIAL)'],
    header.map(h => `"${h}"`),
    ...rows.map(r => r.join(',')),
    [],
    ...summary.map(r => r.join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `ktu_sample_result_${sem}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Results() {
  const [activeTab,      setActiveTab]      = useState('results');
  const [selectedSem,    setSelectedSem]    = useState('S5');
  const [practiceArea,   setPracticeArea]   = useState(null);
  const [practiceSkill,  setPracticeSkill]  = useState(null);

  const semData    = semesterResults[selectedSem];
  const semKeys    = Object.keys(semesterResults);

  function handleStartPractice(area, skill) {
    setPracticeArea(area);
    setPracticeSkill(skill);
    setActiveTab('practice');
    setTimeout(() => document.getElementById('practice')?.scrollIntoView({ behavior:'smooth' }), 150);
  }

  const tabs = [
    { id: 'results',   label: 'Semester Results',    icon: BookOpen },
    { id: 'dashboard', label: 'Performance',         icon: BarChart2 },
    { id: 'placement', label: 'Placement Prep',      icon: Target },
    { id: 'practice',  label: 'Practice',            icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-ktu-light">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="bg-hero-gradient pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-2 mb-3">
            <span className="sample-badge bg-white/10 border-white/20 text-white/70">Sample Academic Data</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Results & Placement</h1>
          <p className="text-white/60 text-sm max-w-xl">
            View semester results, analyse your academic performance, build a personalised placement preparation plan and practise aptitude and coding questions.
          </p>
        </div>
      </div>

      {/* ── Summary Cards ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Current SGPA',       val: sampleStudent.latestSgpa, icon: TrendingUp, color: 'from-violet-500 to-purple-600' },
            { label: 'Overall CGPA',       val: sampleStudent.cgpa,       icon: Award,      color: 'from-blue-500 to-cyan-500'    },
            { label: 'Subjects Passed',    val: Object.values(semesterResults).flatMap(s => s.subjects).filter(s => s.status === 'Pass').length,
              icon: CheckCircle, color: 'from-emerald-500 to-teal-600' },
            { label: 'Semesters Completed',val: semKeys.length,            icon: BookOpen,   color: 'from-amber-400 to-orange-500'  },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className={`rounded-2xl p-5 text-white bg-gradient-to-br ${color} shadow-card`}>
              <Icon size={22} className="text-white/70 mb-3" />
              <p className="text-2xl font-extrabold">{val}</p>
              <p className="text-xs text-white/70 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Sample notice */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-6">
          <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            <strong>Sample Data Notice:</strong> All results, CGPA, SGPA and academic data shown are illustrative mock data for the REFORGE design challenge. They are not connected to any official KTU system.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl border-b-2 transition -mb-px ${
                activeTab === id
                  ? 'border-ktu-violet text-ktu-violet bg-violet-50'
                  : 'border-transparent text-slate-500 hover:text-ktu-blue hover:bg-slate-50'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Semester Results Tab ──────────────────────────────── */}
        {activeTab === 'results' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="section-label">Academic Results</p>
                <h2 className="section-title">Semester Results</h2>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selectedSem}
                  onChange={e => setSelectedSem(e.target.value)}
                  className="input-field w-auto"
                >
                  {semKeys.map(s => <option key={s}>{s}</option>)}
                </select>
                <button onClick={() => window.print()} className="btn-secondary gap-1.5 text-xs py-2 px-3">
                  <Printer size={14} /> Print
                </button>
                <button onClick={() => downloadResultCSV(selectedSem, semData)} className="btn-primary gap-1.5 text-xs py-2 px-3">
                  <Download size={14} /> CSV
                </button>
              </div>
            </div>

            {/* Student Info */}
            <div className="card mb-6 flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { l: 'Student Name', v: sampleStudent.name       },
                  { l: 'Roll Number',  v: sampleStudent.rollNumber },
                  { l: 'Programme',    v: 'B.Tech CSE'             },
                  { l: 'Semester',     v: selectedSem              },
                  { l: 'SGPA',         v: semData?.sgpa            },
                  { l: 'Overall CGPA', v: sampleStudent.cgpa       },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">{l}</p>
                    <p className="text-sm font-semibold text-ktu-blue mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <span className="sample-badge">Sample Data</span>
            </div>

            {/* Results Table */}
            {semData && (
              <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-card mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Subject Code', 'Subject Name', 'Credits', 'Grade', 'Grade Points', 'Status'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {semData.subjects.map(s => (
                      <tr key={s.code} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3 text-xs font-mono text-slate-500">{s.code}</td>
                        <td className="px-4 py-3 text-xs font-medium text-ktu-blue max-w-[220px]">
                          <span className="line-clamp-2">{s.name}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 text-center">{s.credits}</td>
                        <td className="px-4 py-3">
                          <span className={`badge border text-xs font-bold ${GRADE_COLORS[s.grade] || 'badge-blue'}`}>
                            {s.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-center font-semibold text-slate-700">{s.gradePoints}</td>
                        <td className="px-4 py-3">
                          {s.status === 'Pass'
                            ? <span className="badge-green gap-1"><CheckCircle size={11} />Pass</span>
                            : <span className="badge-red">Fail</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-100">
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-xs font-bold text-ktu-blue">Semester Summary</td>
                      <td className="px-4 py-3 text-xs font-bold text-ktu-blue text-center">
                        {semData.subjects.reduce((a, s) => a + s.credits, 0)}
                      </td>
                      <td colSpan={2} className="px-4 py-3">
                        <span className="badge bg-violet-50 border border-violet-200 text-violet-700 font-bold">
                          SGPA: {semData.sgpa}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="badge-green gap-1">
                          <CheckCircle size={11} />
                          All Passed
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Dashboard Tab ─────────────────────────────────────── */}
        {activeTab === 'dashboard' && (
          <div id="performance">
            <div className="mb-6">
              <p className="section-label">Academic Analytics</p>
              <h2 className="section-title">Performance Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <SGPAChart />
              <CGPAChart />
            </div>
            <GradeDistributionChart />

            <div className="mt-6 card">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Semester-wise Summary</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {['Semester', 'Credits', 'SGPA', 'CGPA', 'Trend'].map(h => (
                        <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {Object.entries(semesterResults).map(([sem, data], i, arr) => {
                      const prev = i > 0 ? arr[i-1][1].sgpa : null;
                      const up   = prev === null ? null : data.sgpa >= prev;
                      return (
                        <tr key={sem} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 font-semibold text-ktu-blue text-xs">{sem}</td>
                          <td className="px-4 py-3 text-xs text-slate-600">{data.totalCredits}</td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-bold text-ktu-blue">{data.sgpa}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-600">
                              {i === 0
                                ? data.sgpa.toFixed(2)
                                : (arr.slice(0, i+1).reduce((a, [, d]) => a + d.sgpa, 0) / (i+1)).toFixed(2)
                              }
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {up === null ? <span className="text-xs text-slate-400">—</span>
                              : up
                                ? <span className="text-emerald-500 text-xs font-medium flex items-center gap-1">▲ Improved</span>
                                : <span className="text-red-400 text-xs font-medium flex items-center gap-1">▼ Declined</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Placement Tab ─────────────────────────────────────── */}
        {activeTab === 'placement' && (
          <div>
            <div className="mb-6">
              <p className="section-label">Career Readiness</p>
              <h2 className="section-title">Your Placement Preparation Plan</h2>
            </div>
            <PlacementPreparation onStartPractice={handleStartPractice} />
          </div>
        )}

        {/* ── Practice Tab ──────────────────────────────────────── */}
        {activeTab === 'practice' && (
          <div>
            <div className="mb-6">
              <p className="section-label">Aptitude & Coding</p>
              <h2 className="section-title">Practice Module</h2>
              <p className="text-sm text-slate-500 mt-1">
                Multiple-choice questions with instant feedback. All questions are from local predefined data — no external API.
              </p>
            </div>
            <PracticeModule
              defaultCategory={practiceArea}
              defaultSkill={practiceSkill}
            />
          </div>
        )}
      </div>
    </div>
  );
}
