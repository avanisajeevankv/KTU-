import { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, XCircle, Calendar, ChevronRight, X, Info } from 'lucide-react';

function getDaysRemaining(deadlineStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const deadline = new Date(deadlineStr);
  deadline.setHours(0, 0, 0, 0);
  return Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
}

function getStatus(reg) {
  const now = new Date();
  const open     = new Date(reg.openDate);
  const regular  = new Date(reg.regularDeadline);
  const late     = reg.lateDeadline ? new Date(reg.lateDeadline) : null;

  if (now < open)     return { label: 'Not Yet Open', color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200', icon: Info };
  if (now <= regular) {
    const days = getDaysRemaining(reg.regularDeadline);
    if (days <= 5)    return { label: 'Closing Soon', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertCircle };
    return              { label: 'Open',          color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle };
  }
  if (late && now <= late) return { label: 'Late Fee Period', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: AlertCircle };
  return                  { label: 'Closed',        color: 'text-red-600',   bg: 'bg-red-50',   border: 'border-red-200',   icon: XCircle };
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function DeadlineCard({ reg }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const status = getStatus(reg);
  const StatusIcon = status.icon;
  const regularDays = getDaysRemaining(reg.regularDeadline);
  const lateDays = reg.lateDeadline ? getDaysRemaining(reg.lateDeadline) : null;

  return (
    <>
      <div className={`card-hover border-l-4 ${
        status.label === 'Open'          ? 'border-l-emerald-400' :
        status.label === 'Closing Soon'  ? 'border-l-amber-400'   :
        status.label === 'Closed'        ? 'border-l-red-400'     :
        status.label === 'Late Fee Period'? 'border-l-orange-400' :
        'border-l-slate-300'
      }`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs text-slate-400 mb-1">{reg.programme} · {reg.semester} · {reg.type}</p>
            <h3 className="text-sm font-semibold text-ktu-blue leading-snug">{reg.name}</h3>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${status.bg} ${status.color}`}>
            <StatusIcon size={12} />
            {status.label}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">Regular Deadline</p>
            <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Calendar size={11} className="text-ktu-violet" />
              {formatDate(reg.regularDeadline)}
            </p>
            {regularDays >= 0 && status.label !== 'Closed' && (
              <p className={`text-[11px] mt-0.5 font-medium ${regularDays <= 5 ? 'text-amber-600' : 'text-slate-400'}`}>
                {regularDays === 0 ? 'Due today!' : `${regularDays} day${regularDays !== 1 ? 's' : ''} remaining`}
              </p>
            )}
          </div>
          {reg.lateDeadline && (
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-0.5">Late Deadline</p>
              <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Calendar size={11} className="text-amber-500" />
                {formatDate(reg.lateDeadline)}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{reg.lateFee}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">Opens: {formatDate(reg.openDate)}</p>
          <button onClick={() => setModalOpen(true)}
                  className="flex items-center gap-1 text-xs font-medium text-ktu-violet hover:underline">
            View Details <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-card-hover max-w-md w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-400">
              <X size={16} />
            </button>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 ${status.bg} ${status.color}`}>
              <StatusIcon size={12} />
              {status.label}
            </div>
            <h2 className="text-base font-bold text-ktu-blue mb-1 pr-6">{reg.name}</h2>
            <p className="text-sm text-slate-500 mb-4">{reg.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-1">Opens</p>
                <p className="text-sm font-semibold text-ktu-blue">{formatDate(reg.openDate)}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-1">Regular Deadline</p>
                <p className="text-sm font-semibold text-ktu-blue">{formatDate(reg.regularDeadline)}</p>
              </div>
              {reg.lateDeadline && (
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-[10px] text-amber-600 uppercase tracking-wide font-medium mb-1">Late Deadline</p>
                  <p className="text-sm font-semibold text-amber-700">{formatDate(reg.lateDeadline)}</p>
                  <p className="text-xs text-amber-600 mt-0.5">{reg.lateFee}</p>
                </div>
              )}
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-1">Exam Fee</p>
                <p className="text-sm font-semibold text-ktu-blue">{reg.fee}</p>
              </div>
            </div>

            {reg.requirements && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Requirements</p>
                <ul className="space-y-1.5">
                  {reg.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 mb-4">
              ⚠ This is sample registration data. This portal does NOT submit actual university registration.
              Complete registration at the official KTU portal.
            </div>

            <div className="flex gap-2">
              <button onClick={() => setModalOpen(false)} className="btn-secondary flex-1 justify-center">Close</button>
              <button
                onClick={() => { alert('This is a demo portal. Please register at the official KTU website: www.ktu.edu.in'); }}
                className="btn-primary flex-1 justify-center"
              >
                Register (Official Site)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
