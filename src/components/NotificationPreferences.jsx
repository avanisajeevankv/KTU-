import { useState, useEffect } from 'react';
import { Bell, Mail, Phone, MessageSquare, Save, CheckCircle, AlertCircle, Info } from 'lucide-react';

const STORAGE_KEY = 'ktu_notif_prefs';

const defaultPrefs = {
  email: '',
  phone: '',
  emailEnabled: false,
  smsEnabled: false,
  timetableReminders: false,
  deadlineReminders: false,
  announcementReminders: false,
};

function validate(prefs) {
  const errors = {};
  if (prefs.emailEnabled && !prefs.email.trim()) {
    errors.email = 'Email address is required to enable email notifications.';
  } else if (prefs.emailEnabled && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(prefs.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (prefs.smsEnabled && !prefs.phone.trim()) {
    errors.phone = 'Phone number is required to enable SMS notifications.';
  } else if (prefs.smsEnabled && !/^(\+91)?[6-9]\d{9}$/.test(prefs.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  }
  return errors;
}

export default function NotificationPreferences() {
  const [prefs,   setPrefs]   = useState(defaultPrefs);
  const [errors,  setErrors]  = useState({});
  const [saved,   setSaved]   = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  // Restore on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setPrefs(JSON.parse(stored)); } catch {}
    }
    setLoaded(true);
  }, []);

  function set(key, value) {
    setPrefs(p => ({ ...p, [key]: value }));
    setErrors(e => ({ ...e, [key]: undefined }));
    setSaved(false);
  }

  function handleSave() {
    const errs = validate(prefs);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setSaved(true);
    setErrors({});
    setTimeout(() => setSaved(false), 4000);
  }

  if (!loaded) return null;

  return (
    <div className="card space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
          <Bell size={20} className="text-ktu-violet" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ktu-blue">Notification Preferences</h3>
          <p className="text-xs text-slate-400">Saved locally in your browser · No real notifications are sent</p>
        </div>
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700">
          Preferences are saved to your browser's localStorage only. This is a frontend-only demo — no email or SMS is actually delivered.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact Details</h4>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            <Mail size={13} className="inline mr-1 text-slate-400" /> Email Address
          </label>
          <input
            type="email"
            value={prefs.email}
            onChange={e => set('email', e.target.value)}
            placeholder="your.email@example.com"
            className={`input-field ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={11} /> {errors.email}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            <Phone size={13} className="inline mr-1 text-slate-400" /> Phone Number
          </label>
          <input
            type="tel"
            value={prefs.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="+91 9876543210"
            className={`input-field ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={11} /> {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Notification Channels */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Channels</h4>
        {[
          { key: 'emailEnabled', icon: Mail,          label: 'Email Notifications',   desc: 'Receive updates via email' },
          { key: 'smsEnabled',   icon: MessageSquare, label: 'SMS Notifications',     desc: 'Receive updates via SMS' },
        ].map(({ key, icon: Icon, label, desc }) => (
          <label key={key} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition">
            <div className="flex items-center gap-2.5">
              <Icon size={16} className="text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-700">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={prefs[key]}
                     onChange={e => set(key, e.target.checked)} />
              <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-ktu-violet transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        ))}
      </div>

      {/* Reminder Types */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reminder Types</h4>
        {[
          { key: 'timetableReminders',    label: 'Timetable Publication Reminders',    desc: 'When new timetables are published' },
          { key: 'deadlineReminders',     label: 'Registration Deadline Reminders',    desc: '3 days and 1 day before deadlines' },
          { key: 'announcementReminders', label: 'Examination Announcement Reminders', desc: 'Important exam-related announcements' },
        ].map(({ key, label, desc }) => (
          <label key={key} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={prefs[key]}
              onChange={e => set(key, e.target.checked)}
              className="w-4 h-4 accent-ktu-violet cursor-pointer"
            />
            <div>
              <p className="text-sm font-medium text-slate-700">{label}</p>
              <p className="text-xs text-slate-400">{desc}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button onClick={handleSave} className="btn-primary gap-2">
          <Save size={15} /> Save Preferences
        </button>
        {saved && (
          <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
            <CheckCircle size={16} /> Preferences saved!
          </div>
        )}
      </div>
    </div>
  );
}
