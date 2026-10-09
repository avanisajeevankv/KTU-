import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, BarChart2, BookOpen, Briefcase, Building2,
  Calendar, Search, ChevronRight, ExternalLink, Clock,
  MapPin, Phone, Mail, Globe, AlertTriangle, ArrowRight,
  TrendingUp, Award, GraduationCap, Bell
} from 'lucide-react';
import AnnouncementCard from '../components/AnnouncementCard';
import { announcements, categories, upcomingEvents } from '../data/announcements';
import { sampleStudent } from '../data/resultsData';

const quickCards = [
  {
    title: 'Examination Timetable',
    desc:  'View and download November 2026 exam schedule',
    icon:  FileText,
    to:    '/exam',
    hash:  'timetable',
    color: 'bg-gradient-to-br from-navy-700 to-navy-800',
    accent:'border-l-4 border-ktu-violet',
  },
  {
    title: 'Registration Deadlines',
    desc:  'Track open registrations with live countdowns',
    icon:  Clock,
    to:    '/exam',
    hash:  'registration',
    color: 'bg-gradient-to-br from-amber-500 to-orange-500',
    accent:'',
  },
  {
    title: 'Semester Results',
    desc:  'View grades, SGPA and CGPA by semester',
    icon:  BarChart2,
    to:    '/results',
    hash:  '',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    accent:'',
  },
  {
    title: 'Placement Preparation',
    desc:  'Personalised plans for aptitude and coding',
    icon:  Briefcase,
    to:    '/results',
    hash:  'placement',
    color: 'bg-gradient-to-br from-violet-500 to-purple-600',
    accent:'',
  },
  {
    title: 'University Information',
    desc:  'Contact, address, links and official resources',
    icon:  Building2,
    to:    '/',
    hash:  'university-info',
    color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    accent:'',
  },
];

const eventTypeColors = {
  deadline:  { dot: 'bg-red-400',    text: 'text-red-600',    bg: 'bg-red-50'    },
  exam:      { dot: 'bg-violet-400', text: 'text-violet-600', bg: 'bg-violet-50' },
  placement: { dot: 'bg-emerald-400',text: 'text-emerald-600',bg: 'bg-emerald-50'},
  academic:  { dot: 'bg-blue-400',   text: 'text-blue-600',   bg: 'bg-blue-50'   },
  event:     { dot: 'bg-amber-400',  text: 'text-amber-600',  bg: 'bg-amber-50'  },
};

function daysUntil(dateStr) {
  const d = new Date(dateStr); d.setHours(0,0,0,0);
  const n = new Date();        n.setHours(0,0,0,0);
  return Math.ceil((d - n) / 86400000);
}

export default function Home() {
  const [annCategory, setAnnCategory] = useState('All');
  const [annSearch,   setAnnSearch]   = useState('');

  const filteredAnns = announcements.filter(a => {
    if (annCategory !== 'All' && a.category !== annCategory) return false;
    if (annSearch) {
      const q = annSearch.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    }
    return true;
  });

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="min-h-screen bg-ktu-light">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-hero-gradient pt-24 pb-16 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-ktu-violet/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-5">
                <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full border border-white/20 font-medium">
                  REFORGE Design Challenge
                </span>
                <span className="px-3 py-1 bg-ktu-violet/30 text-violet-200 text-xs rounded-full border border-violet-400/30 font-medium">
                  Sample Data Only
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Everything KTU,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                  in one place.
                </span>
              </h1>
              <p className="text-base text-white/65 max-w-lg leading-relaxed mb-8">
                Access university updates, exam schedules, registration deadlines, academic results
                and placement preparation — all from a single, reimagined student portal.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/exam" className="btn-accent py-3 px-6">
                  View Exam Schedule <ArrowRight size={16} />
                </Link>
                <Link to="/results" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition">
                  My Results
                </Link>
              </div>
            </div>

            {/* Student summary card */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide">Sample Student</p>
                  <span className="sample-badge bg-white/10 border-white/20 text-white/70 text-[10px]">Demo Data</span>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                    <GraduationCap size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{sampleStudent.name}</p>
                    <p className="text-[11px] text-white/60 leading-snug">{sampleStudent.programme}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Current', val: sampleStudent.currentSemester, sub: 'Semester' },
                    { label: 'SGPA',    val: sampleStudent.latestSgpa,      sub: 'Latest' },
                    { label: 'CGPA',    val: sampleStudent.cgpa,            sub: 'Overall' },
                  ].map(({ label, val, sub }) => (
                    <div key={label} className="bg-white/10 rounded-xl p-2.5 text-center">
                      <p className="text-base font-bold text-white">{val}</p>
                      <p className="text-[10px] text-white/50">{sub}</p>
                    </div>
                  ))}
                </div>
                <Link to="/results" className="flex items-center justify-center gap-1.5 w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-xs font-medium transition">
                  View Full Results <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Access Cards ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickCards.map(({ title, desc, icon: Icon, to, hash, color }) => (
            <Link
              key={title}
              to={to}
              onClick={() => hash && setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior:'smooth' }), 200)}
              className="group relative overflow-hidden rounded-2xl p-5 text-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col gap-3"
              style={{ background: '' }}
            >
              <div className={`absolute inset-0 ${color}`} />
              <div className="relative z-10 flex flex-col h-full gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="font-bold text-sm leading-snug">{title}</p>
                <p className="text-white/65 text-[11px] leading-snug flex-1">{desc}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-white/80 group-hover:text-white transition mt-1">
                  Explore <ChevronRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 pb-16">

        {/* ── University Information ──────────────────────────────── */}
        <section id="university-info">
          <div className="mb-6">
            <p className="section-label">University</p>
            <h2 className="section-title">University Information</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-hero-gradient flex items-center justify-center shrink-0">
                  <GraduationCap size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ktu-blue">APJ Abdul Kalam Technological University</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Established 2015 · State Technical University of Kerala</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                APJ Abdul Kalam Technological University (KTU) is a state technical university established in 2015 by the Government of Kerala under the Kerala Technological University Act, 2015.
                The university is named after Dr. A.P.J. Abdul Kalam, former President of India and renowned scientist. It affiliates engineering, technology and management colleges across the state of Kerala.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: 'Address',  val: 'CET Campus, Thiruvananthapuram, Kerala — 695 016' },
                  { icon: Mail,   label: 'Email',    val: 'info@ktu.edu.in' },
                  { icon: Phone,  label: 'Phone',    val: '+91 471 2598 122' },
                  { icon: Globe,  label: 'Website',  val: 'www.ktu.edu.in', link: 'https://www.ktu.edu.in' },
                ].map(({ icon: Icon, label, val, link }) => (
                  <div key={label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <Icon size={16} className="text-ktu-violet shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">{label}</p>
                      {link
                        ? <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ktu-blue hover:underline flex items-center gap-1">{val} <ExternalLink size={12} /></a>
                        : <p className="text-sm font-medium text-slate-700">{val}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  Contact details shown are from publicly available records. Always verify at the official KTU website before contacting.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Useful University Links</p>
                {[
                  { label: 'KTU Official Portal',      url: 'https://www.ktu.edu.in' },
                  { label: 'Student Login',             url: '#' },
                  { label: 'Exam Results',              url: '#' },
                  { label: 'Fee Payment Portal',        url: '#' },
                  { label: 'Academic Regulations',      url: '#' },
                  { label: 'Affiliated Colleges List',  url: '#' },
                  { label: 'NAAC / NBA Accreditation',  url: '#' },
                ].map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target={url === '#' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-ktu-blue transition py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ktu-violet shrink-0" />
                    {label}
                    {url !== '#' && <ExternalLink size={11} className="text-slate-300 ml-auto" />}
                  </a>
                ))}
              </div>

              <div className="card bg-gradient-to-br from-violet-50 to-cyan-50 border-violet-100 space-y-2">
                <p className="text-xs font-semibold text-ktu-blue uppercase tracking-wide">Quick Stats</p>
                {[
                  { label: 'Affiliated Colleges', val: '160+' },
                  { label: 'Enrolled Students',   val: '~1 Lakh+' },
                  { label: 'Programmes Offered',  val: '15+' },
                  { label: 'Established',         val: '2015' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm font-bold text-ktu-blue">{val}</p>
                  </div>
                ))}
                <p className="text-[10px] text-slate-400 pt-1">* Approximate figures. Verify at ktu.edu.in</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Announcements + Events ──────────────────────────────── */}
        <section id="announcements">
          <div className="mb-6">
            <p className="section-label">Latest Updates</p>
            <h2 className="section-title">Announcements & Events</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Announcements */}
            <div className="lg:col-span-2 space-y-4">
              {/* Search + filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={annSearch}
                    onChange={e => setAnnSearch(e.target.value)}
                    placeholder="Search announcements…"
                    className="input-field pl-9"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setAnnCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                      annCategory === cat
                        ? 'bg-ktu-navy text-white border-ktu-navy'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-navy-300 hover:text-ktu-blue'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredAnns.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-slate-100">
                  <Bell size={28} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No announcements match your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredAnns.map(a => <AnnouncementCard key={a.id} announcement={a} />)}
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div id="events" className="space-y-4">
              <h3 className="text-sm font-bold text-ktu-blue">Upcoming Events & Deadlines</h3>
              <div className="space-y-3">
                {upcomingEvents.map(ev => {
                  const days = daysUntil(ev.date);
                  const tc   = eventTypeColors[ev.type] || eventTypeColors.academic;
                  const formatted = new Date(ev.date).toLocaleDateString('en-IN', { day:'numeric', month:'short' });
                  return (
                    <div key={ev.id} className="card-hover flex items-start gap-3 p-4">
                      <div className={`w-10 h-10 rounded-xl ${tc.bg} flex flex-col items-center justify-center shrink-0`}>
                        <span className={`text-sm font-bold ${tc.text}`}>
                          {formatted.split(' ')[0]}
                        </span>
                        <span className={`text-[10px] ${tc.text}`}>
                          {formatted.split(' ')[1]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ktu-blue leading-snug">{ev.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">{ev.description}</p>
                        <div className={`mt-2 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${tc.dot}`} />
                          {days < 0 ? 'Past' : days === 0 ? 'Today' : `${days} day${days > 1 ? 's' : ''} away`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Student overview */}
              <div className="card bg-gradient-to-br from-navy-800 to-navy-900 text-white mt-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide">Student Overview</p>
                  <span className="sample-badge bg-white/10 border-white/20 text-white/60 text-[10px]">Sample Data</span>
                </div>
                <p className="font-bold text-base">{sampleStudent.name}</p>
                <p className="text-xs text-white/60 mb-4">{sampleStudent.programme}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { l: 'Batch',    v: sampleStudent.batch },
                    { l: 'College',  v: 'CET Trivandrum' },
                    { l: 'SGPA',     v: sampleStudent.latestSgpa },
                    { l: 'CGPA',     v: sampleStudent.cgpa },
                  ].map(({ l, v }) => (
                    <div key={l} className="bg-white/10 rounded-xl p-2.5">
                      <p className="text-[10px] text-white/40 uppercase tracking-wide">{l}</p>
                      <p className="text-sm font-bold text-white mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
                <Link to="/results" className="flex items-center justify-center gap-1.5 w-full py-2 bg-ktu-violet hover:bg-violet-600 rounded-xl text-white text-xs font-medium transition">
                  <TrendingUp size={13} /> View Full Results
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
