import { useState } from 'react';
import {
  FileText, Clock, AlertCircle, CheckCircle, Bell,
  Calendar, X, ChevronRight, Info, BookOpen,
  Filter, Eye
} from 'lucide-react';
import TimetableTable   from '../components/TimetableTable';
import DeadlineCard     from '../components/DeadlineCard';
import NotificationPreferences from '../components/NotificationPreferences';
import {
  timetableEntries, registrations, examNotifications,
  programmes, semesters, examTypes,
} from '../data/examData';

function getDaysRemaining(str) {
  const d = new Date(str); d.setHours(0,0,0,0);
  const n = new Date();    n.setHours(0,0,0,0);
  return Math.ceil((d - n) / 86400000);
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const NOTIF_CAT_COLORS = {
  'Hall Ticket': 'badge-blue',
  'Fee':         'badge-amber',
  'Results':     'badge-green',
  'Policy':      'badge-violet',
};

export default function Exam() {
  const [activeTab,  setActiveTab]  = useState('timetable');
  const [notifModal, setNotifModal] = useState(null);

  // Overview stats
  const upcoming       = timetableEntries.filter(e => new Date(e.date) > new Date());
  const openRegs       = registrations.filter(r => {
    const now = new Date();
    return now >= new Date(r.openDate) && now <= new Date(r.lateDeadline || r.regularDeadline);
  });
  const closingSoon    = registrations.filter(r => {
    const days = getDaysRemaining(r.regularDeadline);
    return days >= 0 && days <= 7;
  });
  const published      = timetableEntries.filter(e => e.status === 'Published');

  const tabs = [
    { id: 'timetable',    label: 'Timetable',        icon: FileText },
    { id: 'registration', label: 'Registration',     icon: Clock    },
    { id: 'notifications',label: 'Notifications',    icon: Bell     },
    { id: 'preferences',  label: 'Preferences',      icon: Bell     },
  ];

  return (
    <div className="min-h-screen bg-ktu-light">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="bg-hero-gradient pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-2 mb-3">
            <span className="sample-badge bg-white/10 border-white/20 text-white/70">Sample Mock Data</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Examination Portal</h1>
          <p className="text-white/60 text-sm max-w-xl">
            View timetables, track registration deadlines, manage notification preferences and stay informed with examination announcements.
          </p>
        </div>
      </div>

      {/* ── Overview Cards ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Upcoming Exams',           val: upcoming.length,     icon: FileText,  color: 'from-violet-500 to-purple-600' },
            { label: 'Registration Open',         val: openRegs.length,     icon: CheckCircle,color: 'from-emerald-500 to-teal-600' },
            { label: 'Closing This Week',         val: closingSoon.length,  icon: AlertCircle,color: 'from-amber-400 to-orange-500' },
            { label: 'Timetables Published',      val: published.length,    icon: Calendar,  color: 'from-blue-500 to-cyan-500' },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className={`rounded-2xl p-5 text-white bg-gradient-to-br ${color} shadow-card`}>
              <Icon size={22} className="text-white/70 mb-3" />
              <p className="text-2xl font-extrabold">{val}</p>
              <p className="text-xs text-white/70 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Sample data notice */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-6">
          <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            <strong>Sample Data Notice:</strong> All timetables, registration deadlines and notifications displayed are mock data created for the REFORGE design challenge.
            They do not represent official KTU schedules. Always verify at <a href="https://www.ktu.edu.in" className="underline" target="_blank" rel="noopener noreferrer">ktu.edu.in</a>.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-0">
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

        {/* ── Timetable Tab ────────────────────────────────────── */}
        {activeTab === 'timetable' && (
          <div id="timetable">
            <div className="mb-6">
              <p className="section-label">November 2026 Session</p>
              <h2 className="section-title">Examination Timetable</h2>
              <p className="text-sm text-slate-500 mt-1">Search, filter, view details, print or download the timetable as a CSV file.</p>
            </div>
            <TimetableTable
              entries={timetableEntries}
              programmes={programmes}
              semesters={semesters}
              examTypes={examTypes}
            />
          </div>
        )}

        {/* ── Registration Tab ─────────────────────────────────── */}
        {activeTab === 'registration' && (
          <div id="registration">
            <div className="mb-6">
              <p className="section-label">November 2026 Session</p>
              <h2 className="section-title">Registration & Deadline Tracker</h2>
              <p className="text-sm text-slate-500 mt-1">
                Deadlines are calculated in your browser from the sample dates below. Countdowns update every minute.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {registrations.map(reg => <DeadlineCard key={reg.id} reg={reg} />)}
            </div>
          </div>
        )}

        {/* ── Notifications Tab ────────────────────────────────── */}
        {activeTab === 'notifications' && (
          <div>
            <div className="mb-6">
              <p className="section-label">Examination Updates</p>
              <h2 className="section-title">Examination Notifications</h2>
              <p className="text-sm text-slate-500 mt-1">
                Announcements sorted chronologically. Click <strong>Read More</strong> for full details.
              </p>
            </div>
            <div className="space-y-4">
              {examNotifications.map(n => (
                <div key={n.id} className="card-hover space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={NOTIF_CAT_COLORS[n.category] || 'badge-blue'}>{n.category}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={11} />
                        {formatDate(n.date)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-ktu-blue">{n.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{n.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-amber-600">
                      <Clock size={12} />
                      {n.deadline}
                    </div>
                    <button
                      onClick={() => setNotifModal(n)}
                      className="flex items-center gap-1 text-xs font-medium text-ktu-violet hover:underline"
                    >
                      Read More <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Preferences Tab ──────────────────────────────────── */}
        {activeTab === 'preferences' && (
          <div>
            <div className="mb-6">
              <p className="section-label">Settings</p>
              <h2 className="section-title">Notification Preferences</h2>
            </div>
            <div className="max-w-xl">
              <NotificationPreferences />
            </div>
          </div>
        )}
      </div>

      {/* Notification Read-More Modal */}
      {notifModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setNotifModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-card-hover max-w-md w-full p-6 z-10">
            <button onClick={() => setNotifModal(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-400">
              <X size={16} />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className={NOTIF_CAT_COLORS[notifModal.category] || 'badge-blue'}>{notifModal.category}</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar size={11} /> {formatDate(notifModal.date)}
              </span>
            </div>
            <h2 className="text-base font-bold text-ktu-blue mb-3 pr-6">{notifModal.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">{notifModal.description}</p>
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
              <Clock size={14} className="text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700 font-medium">{notifModal.deadline}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 mb-4">
              ⚠ This is sample notification data for the REFORGE design challenge. Please verify at ktu.edu.in.
            </div>
            <button onClick={() => setNotifModal(null)} className="btn-primary w-full justify-center">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
