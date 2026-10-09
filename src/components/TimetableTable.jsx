import { useState } from 'react';
import { Search, Filter, Download, Printer, Grid, List, X, Eye, ChevronUp, ChevronDown } from 'lucide-react';

const STATUS_COLORS = {
  Published: 'badge-green',
  Upcoming:  'badge-blue',
  Draft:     'badge-amber',
};

const TYPE_COLORS = {
  Regular:      'badge-blue',
  Supplementary:'badge-amber',
  Improvement:  'badge-violet',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

function downloadCSV(data) {
  const headers = ['Exam Name','Programme','Semester','Subject Code','Subject Name','Date','Start','End','Type','Status','Venue'];
  const rows = data.map(e => [
    `"${e.examName}"`, e.programme, e.semester, e.subjectCode,
    `"${e.subjectName}"`, e.date, e.startTime, e.endTime, e.type, e.status, `"${e.venue}"`,
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'ktu_sample_timetable.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function TimetableTable({
  entries, programmes, semesters, examTypes,
}) {
  const [search,   setSearch]   = useState('');
  const [prog,     setProg]     = useState('All');
  const [sem,      setSem]      = useState('All');
  const [type,     setType]     = useState('All');
  const [view,     setView]     = useState('table'); // 'table' | 'cards'
  const [modal,    setModal]    = useState(null);
  const [sortCol,  setSortCol]  = useState('date');
  const [sortDir,  setSortDir]  = useState('asc');

  const filtered = entries
    .filter(e => {
      if (prog !== 'All' && e.programme !== prog) return false;
      if (sem  !== 'All' && e.semester  !== sem)  return false;
      if (type !== 'All' && e.type      !== type) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          e.subjectName.toLowerCase().includes(q) ||
          e.subjectCode.toLowerCase().includes(q) ||
          e.examName.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let va = a[sortCol] || '';
      let vb = b[sortCol] || '';
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  function toggleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  }

  function SortIcon({ col }) {
    if (sortCol !== col) return <ChevronUp size={12} className="text-slate-300" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-ktu-violet" />
      : <ChevronDown size={12} className="text-ktu-violet" />;
  }

  function clearFilters() {
    setSearch(''); setProg('All'); setSem('All'); setType('All');
  }

  const hasFilters = search || prog !== 'All' || sem !== 'All' || type !== 'All';

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search subject name or code…"
            className="input-field pl-9"
          />
        </div>

        <select value={prog} onChange={e => setProg(e.target.value)} className="input-field w-auto">
          {programmes.map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={sem} onChange={e => setSem(e.target.value)} className="input-field w-auto">
          {semesters.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className="input-field w-auto">
          {examTypes.map(t => <option key={t}>{t}</option>)}
        </select>

        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-slate-400 hover:text-red-500 transition">
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-ktu-blue">{filtered.length}</span> entries
        </p>
        <div className="flex items-center gap-2">
          <button onClick={() => setView(v => v === 'table' ? 'cards' : 'table')}
                  className="btn-secondary gap-1.5 py-1.5 px-3 text-xs">
            {view === 'table' ? <Grid size={14} /> : <List size={14} />}
            {view === 'table' ? 'Card View' : 'Table View'}
          </button>
          <button onClick={() => window.print()} className="btn-secondary gap-1.5 py-1.5 px-3 text-xs">
            <Printer size={14} /> Print
          </button>
          <button onClick={() => downloadCSV(filtered)} className="btn-primary gap-1.5 py-1.5 px-3 text-xs">
            <Download size={14} /> CSV
          </button>
        </div>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  { label: 'Subject', col: 'subjectName' },
                  { label: 'Code', col: 'subjectCode' },
                  { label: 'Date', col: 'date' },
                  { label: 'Time', col: 'startTime' },
                  { label: 'Sem', col: 'semester' },
                  { label: 'Type', col: 'type' },
                  { label: 'Status', col: 'status' },
                  { label: '', col: null },
                ].map(({ label, col }) => (
                  <th
                    key={label || 'action'}
                    onClick={col ? () => toggleSort(col) : undefined}
                    className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 tracking-wide whitespace-nowrap ${col ? 'cursor-pointer hover:text-ktu-blue select-none' : ''}`}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {col && <SortIcon col={col} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-400">
                    No entries match your filters. <button onClick={clearFilters} className="text-ktu-violet hover:underline ml-1">Clear filters</button>
                  </td>
                </tr>
              ) : filtered.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-xs font-medium text-ktu-blue max-w-[180px]">
                    <span className="line-clamp-2">{e.subjectName}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-mono">{e.subjectCode}</td>
                  <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">{formatDate(e.date)}</td>
                  <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{e.startTime} – {e.endTime}</td>
                  <td className="px-4 py-3 text-xs"><span className="badge-blue">{e.semester}</span></td>
                  <td className="px-4 py-3 text-xs"><span className={TYPE_COLORS[e.type] || 'badge-blue'}>{e.type}</span></td>
                  <td className="px-4 py-3 text-xs"><span className={STATUS_COLORS[e.status] || 'badge-blue'}>{e.status}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setModal(e)} className="flex items-center gap-1 text-xs text-ktu-violet hover:underline">
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {view === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-10 text-sm text-slate-400">
              No entries match your filters. <button onClick={clearFilters} className="text-ktu-violet hover:underline ml-1">Clear filters</button>
            </div>
          ) : filtered.map(e => (
            <div key={e.id} className="card-hover space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className={TYPE_COLORS[e.type] || 'badge-blue'}>{e.type}</span>
                <span className={STATUS_COLORS[e.status] || 'badge-blue'}>{e.status}</span>
              </div>
              <div>
                <p className="text-xs font-mono text-slate-400">{e.subjectCode}</p>
                <p className="text-sm font-semibold text-ktu-blue leading-snug mt-0.5">{e.subjectName}</p>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <p>📅 {formatDate(e.date)}</p>
                <p>⏰ {e.startTime} – {e.endTime}</p>
                <p>📍 {e.venue}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="badge-blue">{e.programme} {e.semester}</span>
                <button onClick={() => setModal(e)} className="flex items-center gap-1 text-xs text-ktu-violet hover:underline">
                  <Eye size={13} /> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-card-hover max-w-md w-full p-6 z-10">
            <button onClick={() => setModal(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-400">
              <X size={16} />
            </button>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className={TYPE_COLORS[modal.type] || 'badge-blue'}>{modal.type}</span>
              <span className={STATUS_COLORS[modal.status] || 'badge-blue'}>{modal.status}</span>
            </div>
            <p className="text-xs font-mono text-slate-400 mb-1">{modal.subjectCode}</p>
            <h2 className="text-base font-bold text-ktu-blue mb-4 pr-6">{modal.subjectName}</h2>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Examination', modal.examName],
                ['Programme',  modal.programme],
                ['Semester',   modal.semester],
                ['Date',       formatDate(modal.date)],
                ['Start Time', modal.startTime],
                ['End Time',   modal.endTime],
                ['Venue',      modal.venue],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-slate-400 font-medium">{k}</dt>
                  <dd className="text-sm font-semibold text-ktu-blue mt-0.5 break-words">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
              ⚠ This is sample mock data. Verify at the official KTU portal before any examination.
            </div>
            <button onClick={() => setModal(null)} className="btn-primary w-full justify-center mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
