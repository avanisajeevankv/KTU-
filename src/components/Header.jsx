import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap, Search, Bell, User, Menu, X,
  ChevronDown, BookOpen, FileText, BarChart2,
  LogOut, Settings, ExternalLink, CheckCircle,
  AlertCircle, Info, Clock
} from 'lucide-react';

const notifications = [
  { id: 1, type: 'exam',     title: 'S5 Timetable Published',            time: '2 hours ago',  read: false, icon: Clock },
  { id: 2, type: 'deadline', title: 'Registration closes in 9 days',      time: '5 hours ago',  read: false, icon: AlertCircle },
  { id: 3, type: 'result',   title: 'S3 Supplementary Results Declared',  time: '1 day ago',    read: false, icon: CheckCircle },
  { id: 4, type: 'info',     title: 'Academic Calendar 2026-27 Updated',  time: '4 days ago',   read: true,  icon: Info },
  { id: 5, type: 'info',     title: 'IGNITE 2026 — Registrations Open',   time: '14 days ago',  read: true,  icon: Info },
];

const navLinks = [
  { path: '/',        label: 'Home',    icon: BookOpen },
  { path: '/exam',    label: 'Exam',    icon: FileText },
  { path: '/results', label: 'Results', icon: BarChart2 },
];

export default function Header() {
  const location = useLocation();
  const navigate  = useNavigate();

  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [notifOpen,     setNotifOpen]     = useState(false);
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [scrolled,      setScrolled]      = useState(false);
  const [notifs,        setNotifs]        = useState(notifications);

  const unread = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    if (q.includes('exam') || q.includes('timetable') || q.includes('schedule')) navigate('/exam');
    else if (q.includes('result') || q.includes('grade') || q.includes('cgpa') || q.includes('sgpa')) navigate('/results');
    else if (q.includes('placement') || q.includes('aptitude') || q.includes('practice')) navigate('/results');
    else navigate('/exam');
    setSearchQuery('');
    setSearchOpen(false);
  }

  const notifColor = {
    exam:     'text-ktu-violet',
    deadline: 'text-amber-500',
    result:   'text-emerald-500',
    info:     'text-ktu-cyan',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-nav' : 'border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">

          {/* ── Brand ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-hero-gradient flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-bold text-ktu-blue leading-none">KTU Portal</span>
              <span className="block text-[10px] text-slate-400 leading-none mt-0.5">REFORGE Edition</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-navy-50 text-ktu-navy border border-navy-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-ktu-blue'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          {/* ── Search ── */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search exams, results…"
                  className="w-56 px-3 py-1.5 text-sm border border-navy-200 rounded-lg outline-none focus:border-ktu-violet focus:ring-2 focus:ring-violet-100 transition"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="ml-1 p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-ktu-blue hover:bg-slate-50 rounded-lg transition"
                aria-label="Open search"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* ── Notification Bell ── */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
              className="relative p-2 text-slate-500 hover:text-ktu-blue hover:bg-slate-50 rounded-lg transition"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-card-hover border border-slate-100 overflow-hidden z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <span className="font-semibold text-sm text-ktu-blue">Notifications</span>
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-xs text-ktu-violet hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                  {notifs.map(n => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition cursor-pointer ${
                          !n.read ? 'bg-blue-50/40' : ''
                        }`}
                        onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                      >
                        <Icon size={16} className={`mt-0.5 shrink-0 ${notifColor[n.type]}`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium text-slate-800 leading-snug ${!n.read ? 'font-semibold' : ''}`}>
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{n.time}</p>
                        </div>
                        {!n.read && <span className="w-2 h-2 bg-ktu-violet rounded-full shrink-0 mt-1" />}
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
                  <p className="text-[11px] text-slate-400 text-center">
                    Notifications are demonstration mock data
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Profile Menu ── */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-50 transition"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
                <span className="text-white text-xs font-bold">AK</span>
              </div>
              <span className="hidden sm:block text-xs font-medium text-slate-700">Arjun K.</span>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-slate-100 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-ktu-blue">Arjun Krishnan</p>
                  <p className="text-xs text-slate-400">KTU21CS045 · B.Tech CSE S5</p>
                  <span className="mt-1 sample-badge">Sample Profile</span>
                </div>
                <div className="py-1">
                  <Link to="/results" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-ktu-blue transition">
                    <BarChart2 size={15} /> My Results
                  </Link>
                  <Link to="/exam" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-ktu-blue transition">
                    <FileText size={15} /> My Exams
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-ktu-blue transition">
                    <Settings size={15} /> Settings
                  </button>
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 text-slate-500 hover:text-ktu-blue hover:bg-slate-50 rounded-lg transition"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Nav Panel ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-navy-50 text-ktu-navy border border-navy-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-ktu-blue'
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 pb-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-hero-gradient flex items-center justify-center">
                <span className="text-white text-xs font-bold">AK</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-ktu-blue">Arjun Krishnan</p>
                <p className="text-xs text-slate-400">KTU21CS045 · B.Tech CSE S5</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
