import { Link } from 'react-router-dom';
import {
  GraduationCap, MapPin, Phone, Mail, Globe,
  ExternalLink, Facebook, Twitter, Linkedin, Youtube,
  FileText, BarChart2, BookOpen, AlertCircle
} from 'lucide-react';

const quickLinks = [
  { label: 'Examination Timetable', path: '/exam' },
  { label: 'Registration Deadlines', path: '/exam' },
  { label: 'Semester Results',       path: '/results' },
  { label: 'Placement Preparation',  path: '/results' },
  { label: 'Announcements',          path: '/' },
  { label: 'University Information', path: '/' },
];

const resources = [
  { label: 'KTU Official Website', url: 'https://www.ktu.edu.in', external: true },
  { label: 'Student Login Portal',  url: '#', external: false },
  { label: 'Academic Regulations',  url: '#', external: false },
  { label: 'Grievance Portal',      url: '#', external: false },
  { label: 'Anti-Ragging Cell',     url: '#', external: false },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ktu-blue text-white mt-auto">
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-base leading-none">KTU Portal</p>
                <p className="text-[11px] text-white/50 mt-0.5">REFORGE Edition</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              APJ Abdul Kalam Technological University's reimagined student portal — built for the REFORGE Design Challenge.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Facebook,  label: 'Facebook'  },
                { icon: Twitter,   label: 'Twitter'   },
                { icon: Linkedin,  label: 'LinkedIn'  },
                { icon: Youtube,   label: 'YouTube'   },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-sm text-white/55 hover:text-white transition flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-ktu-violet inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5">
              {resources.map(({ label, url, external }) => (
                <li key={label}>
                  {external ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/55 hover:text-white transition flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-ktu-cyan inline-block" />
                      {label}
                      <ExternalLink size={11} className="text-white/30" />
                    </a>
                  ) : (
                    <span className="text-sm text-white/55 flex items-center gap-1.5 cursor-default">
                      <span className="w-1 h-1 rounded-full bg-ktu-cyan inline-block" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin size={15} className="text-ktu-cyan shrink-0 mt-0.5" />
                <span>CET Campus, Thiruvananthapuram, Kerala — 695 016</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone size={15} className="text-ktu-cyan shrink-0" />
                <span>+91 471 2598 122</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail size={15} className="text-ktu-cyan shrink-0" />
                <span>info@ktu.edu.in</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Globe size={15} className="text-ktu-cyan shrink-0" />
                <a href="https://www.ktu.edu.in" target="_blank" rel="noopener noreferrer"
                   className="hover:text-white transition">
                  www.ktu.edu.in
                </a>
              </li>
            </ul>
            <div className="mt-4 p-2.5 rounded-lg bg-amber-500/15 border border-amber-400/20">
              <div className="flex items-start gap-1.5">
                <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-300/80 leading-snug">
                  Contact details shown are from public records and may not reflect current information. Always verify at{' '}
                  <a href="https://www.ktu.edu.in" target="_blank" rel="noopener noreferrer" className="underline">ktu.edu.in</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-white/40">
          © {year} KTU REFORGE — Design Challenge Submission. Not affiliated with official KTU systems.
        </p>
        <p className="text-xs text-white/30">
          All data displayed is sample / mock data only.
        </p>
      </div>
    </footer>
  );
}
