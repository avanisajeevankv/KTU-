import { useState } from 'react';
import { Calendar, Tag, ChevronRight, X, AlertTriangle } from 'lucide-react';

const tagColors = {
  exam:         'badge-violet',
  registration: 'badge-amber',
  results:      'badge-green',
  placements:   'badge-cyan',
  academic:     'badge-blue',
  events:       'badge-blue',
  notice:       'badge-red',
};

export default function AnnouncementCard({ announcement }) {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    title, category, date, description, details, tag, important,
  } = announcement;

  const formatted = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <>
      <div className={`card-hover flex flex-col gap-3 ${important ? 'border-l-4 border-l-ktu-violet' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={tagColors[tag] || 'badge-blue'}>{category}</span>
            {important && (
              <span className="badge bg-red-50 text-red-600 gap-1">
                <AlertTriangle size={10} /> Important
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
            <Calendar size={12} />
            {formatted}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-ktu-blue leading-snug">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{description}</p>

        <button
          onClick={() => setModalOpen(true)}
          className="self-start flex items-center gap-1 text-xs font-medium text-ktu-violet hover:underline mt-auto"
        >
          View Details <ChevronRight size={13} />
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-card-hover max-w-lg w-full p-6 z-10">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-400"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={tagColors[tag] || 'badge-blue'}>{category}</span>
              {important && (
                <span className="badge bg-red-50 text-red-600 gap-1">
                  <AlertTriangle size={10} /> Important
                </span>
              )}
              <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                <Calendar size={12} /> {formatted}
              </span>
            </div>

            <h2 className="text-base font-bold text-ktu-blue mb-3 leading-snug pr-6">{title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">{description}</p>

            {details && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Full Details</p>
                <p className="text-sm text-slate-700 leading-relaxed">{details}</p>
              </div>
            )}

            <div className="mt-4 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-700">
                ⚠ This is sample data for the REFORGE design challenge. Always verify at the official KTU portal.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="btn-primary mt-4 w-full justify-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
