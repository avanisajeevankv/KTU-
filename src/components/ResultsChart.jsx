import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
} from 'recharts';
import { sgpaHistory, cgpaHistory, gradeDistribution } from '../data/resultsData';

const COLORS = ['#6366F1', '#06B6D4', '#0EA5E9', '#1A3A7C', '#64748B'];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-card p-3">
      <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-sm font-bold" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

export function SGPAChart() {
  return (
    <div className="card">
      <p className="text-sm font-bold text-ktu-blue mb-1">Semester-wise SGPA</p>
      <p className="text-xs text-slate-400 mb-4">Performance trend across semesters</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sgpaHistory} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis domain={[5, 10]} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="sgpa" fill="#6366F1" radius={[6, 6, 0, 0]} name="SGPA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CGPAChart() {
  return (
    <div className="card">
      <p className="text-sm font-bold text-ktu-blue mb-1">CGPA Trend</p>
      <p className="text-xs text-slate-400 mb-4">Cumulative GPA progress over time</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={cgpaHistory} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis domain={[5, 10]} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone" dataKey="cgpa" stroke="#06B6D4"
            strokeWidth={2.5} dot={{ r: 4, fill: '#06B6D4', strokeWidth: 2, stroke: '#fff' }}
            name="CGPA"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GradeDistributionChart() {
  return (
    <div className="card">
      <p className="text-sm font-bold text-ktu-blue mb-1">Grade Distribution</p>
      <p className="text-xs text-slate-400 mb-4">All semesters combined</p>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="50%" height={160}>
          <PieChart>
            <Pie
              data={gradeDistribution}
              cx="50%" cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={3}
              dataKey="count"
            >
              {gradeDistribution.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(val, name) => [val, 'Subjects']} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 flex-1">
          {gradeDistribution.map(({ grade, count, color }) => (
            <div key={grade} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs font-semibold text-slate-600 w-6">{grade}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${(count / 30) * 100}%`, backgroundColor: color }}
                />
              </div>
              <span className="text-xs text-slate-400">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
