import { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, ChevronRight, RotateCcw,
  Trophy, BookOpen, ArrowRight, Info,
} from 'lucide-react';
import { questions, practiceCategories } from '../data/practiceQuestions';

const skillLevels = [
  { id: 'beginner',     label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced',     label: 'Advanced' },
];

export default function PracticeModule({ defaultCategory, defaultSkill }) {
  const [category,    setCategory]    = useState(defaultCategory || 'quantitative');
  const [skill,       setSkill]       = useState(defaultSkill    || 'beginner');
  const [qIndex,      setQIndex]      = useState(0);
  const [selected,    setSelected]    = useState(null);
  const [submitted,   setSubmitted]   = useState(false);
  const [score,       setScore]       = useState(0);
  const [total,       setTotal]       = useState(0);
  const [finished,    setFinished]    = useState(false);

  const qBank = questions[category]?.[skill] || [];
  const q     = qBank[qIndex];

  // Reset when category/skill changes
  useEffect(() => {
    setQIndex(0); setSelected(null); setSubmitted(false);
    setScore(0);  setTotal(0);       setFinished(false);
  }, [category, skill]);

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    const correct = selected === q.correct;
    setScore(s => s + (correct ? 1 : 0));
    setTotal(t => t + 1);
  }

  function handleNext() {
    if (qIndex + 1 >= qBank.length) { setFinished(true); return; }
    setQIndex(i => i + 1);
    setSelected(null);
    setSubmitted(false);
  }

  function handleRestart() {
    setQIndex(0); setSelected(null); setSubmitted(false);
    setScore(0);  setTotal(0);       setFinished(false);
  }

  if (!qBank.length) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
        <BookOpen size={32} className="text-slate-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-500">No questions available for this combination yet.</p>
        <p className="text-xs text-slate-400 mt-1">Try a different category or skill level.</p>
      </div>
    );
  }

  return (
    <div id="practice" className="space-y-5">
      {/* Selectors */}
      <div className="flex flex-wrap gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {practiceCategories.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                  category === c.id
                    ? 'bg-ktu-navy text-white border-ktu-navy'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-navy-300'
                }`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Skill Level</p>
          <div className="flex gap-2">
            {skillLevels.map(s => (
              <button
                key={s.id}
                onClick={() => setSkill(s.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                  skill === s.id
                    ? 'bg-ktu-violet text-white border-ktu-violet'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-slate-500">Progress</p>
            <p className="text-xs text-slate-400">{qIndex + 1} / {qBank.length}</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-ktu-violet to-ktu-cyan transition-all duration-300"
              style={{ width: `${((qIndex + 1) / qBank.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-ktu-violet">{score}/{total} correct</p>
        </div>
      </div>

      {/* Finished screen */}
      {finished ? (
        <div className="card text-center py-10 space-y-4">
          <Trophy size={40} className="text-yellow-400 mx-auto" />
          <div>
            <p className="text-xl font-bold text-ktu-blue">{score} / {total}</p>
            <p className="text-sm text-slate-500 mt-1">
              {score === total ? 'Perfect score! Excellent work! 🎉' :
               score >= total * 0.7 ? 'Good job! Keep practising to improve.' :
               'Keep going — regular practice will improve your scores.'}
            </p>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            score === total ? 'bg-emerald-50 text-emerald-700' :
            score >= total * 0.7 ? 'bg-blue-50 text-blue-700' :
            'bg-amber-50 text-amber-700'
          }`}>
            Score: {Math.round((score / total) * 100)}%
          </div>
          <button onClick={handleRestart} className="btn-primary mx-auto gap-2">
            <RotateCcw size={15} /> Restart Practice
          </button>
        </div>
      ) : q ? (
        <div className="card space-y-5">
          {/* Question header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium mb-1">
                Question {qIndex + 1} of {qBank.length}
              </p>
              <p className="text-sm font-semibold text-ktu-blue leading-relaxed whitespace-pre-wrap">{q.question}</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              let style = 'bg-white border-slate-200 text-slate-700 hover:border-ktu-violet hover:bg-violet-50';
              if (submitted) {
                if (i === q.correct) style = 'bg-emerald-50 border-emerald-400 text-emerald-700';
                else if (i === selected) style = 'bg-red-50 border-red-400 text-red-600';
                else style = 'bg-white border-slate-100 text-slate-400 opacity-60';
              } else if (selected === i) {
                style = 'bg-violet-50 border-ktu-violet text-ktu-violet';
              }

              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition ${style} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                    submitted && i === q.correct ? 'bg-emerald-500 border-emerald-500 text-white' :
                    submitted && i === selected && i !== q.correct ? 'bg-red-500 border-red-500 text-white' :
                    selected === i && !submitted ? 'bg-ktu-violet border-ktu-violet text-white' :
                    'border-slate-300 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                  {submitted && i === q.correct && <CheckCircle size={15} className="text-emerald-500 ml-auto shrink-0" />}
                  {submitted && i === selected && i !== q.correct && <XCircle size={15} className="text-red-500 ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {submitted && (
            <div className={`p-3 rounded-xl flex items-start gap-2 ${
              selected === q.correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
            }`}>
              {selected === q.correct
                ? <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                : <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
              }
              <div>
                <p className={`text-xs font-semibold mb-0.5 ${selected === q.correct ? 'text-emerald-700' : 'text-red-700'}`}>
                  {selected === q.correct ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 justify-end">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className="btn-primary gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <>
                <button onClick={handleRestart} className="btn-secondary gap-1.5">
                  <RotateCcw size={14} /> Restart
                </button>
                <button onClick={handleNext} className="btn-primary gap-1.5">
                  {qIndex + 1 >= qBank.length ? 'See Score' : 'Next Question'}
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}

      <div className="flex items-start gap-2 p-2.5 bg-blue-50 rounded-xl border border-blue-100">
        <Info size={13} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-600">
          All questions are from local predefined data. No external API is used. Score is tracked in React state only.
        </p>
      </div>
    </div>
  );
}
