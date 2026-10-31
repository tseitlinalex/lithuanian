import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight, HelpCircle, Award, Volume2, ArrowRight, RotateCcw } from 'lucide-react';
import { checkAnswerMatch } from '../utils/textNormalizer';
import { soundFx } from '../utils/audio';

export default function LessonViewer({ lessons, currentLessonId, onSelectLesson, onBack, lang = 'ru' }) {
  const isRu = lang === 'ru';

  const initialIndex = Math.max(0, lessons.findIndex(l => l.id === currentLessonId));
  const [lessonIndex, setLessonIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [activeTab, setActiveTab] = useState('grammar'); // 'grammar', 'vocab', 'exercises'

  // Exercise states for current lesson
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const lesson = lessons[lessonIndex] || lessons[0];

  const handleLessonChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < lessons.length) {
      setLessonIndex(newIndex);
      setUserAnswers({});
      setFeedback({});
      setScore(0);
      setCompleted(false);
      setActiveTab('grammar');
      if (onSelectLesson) onSelectLesson(lessons[newIndex].id);
    }
  };

  const handleChoiceSelect = (exId, choice, ex) => {
    if (feedback[exId]) return; // already answered
    const isCorrect = choice === ex.answer;
    if (isCorrect) soundFx.playCorrect(1);
    else soundFx.playWordHitBottom();

    setUserAnswers(prev => ({ ...prev, [exId]: choice }));
    setFeedback(prev => ({
      ...prev,
      [exId]: {
        isCorrect,
        explanation: isRu ? ex.explanation_ru : (ex.explanation_en || ex.explanation_ru)
      }
    }));
  };

  const handleFillSubmit = (exId, ex, e) => {
    if (e) e.preventDefault();
    const val = userAnswers[exId] || '';
    if (!val.trim()) return;

    const acceptable = ex.acceptableAnswers || [ex.answer];
    const isCorrect = checkAnswerMatch(val, acceptable);
    if (isCorrect) soundFx.playCorrect(1);
    else soundFx.playWordHitBottom();

    setFeedback(prev => ({
      ...prev,
      [exId]: {
        isCorrect,
        correctAnswer: ex.answer,
        explanation: isRu ? ex.explanation_ru : (ex.explanation_en || ex.explanation_ru)
      }
    }));
  };

  const resetExercises = () => {
    setUserAnswers({});
    setFeedback({});
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition"
        >
          <ChevronLeft className="w-4 h-4" /> {isRu ? 'Назад к темам' : 'Back to Menu'}
        </button>

        {/* Chapter Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLessonChange(lessonIndex - 1)}
            disabled={lessonIndex === 0}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition"
            title="Previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <select
            value={lessonIndex}
            onChange={(e) => handleLessonChange(parseInt(e.target.value, 10))}
            className="bg-slate-800 border border-indigo-500/50 text-white font-bold text-xs sm:text-sm px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {lessons.map((l, idx) => (
              <option key={l.id} value={idx}>
                Knyga {l.book} • {l.chapter} skyrius: {l.title} ({l.level})
              </option>
            ))}
          </select>

          <button
            onClick={() => handleLessonChange(lessonIndex + 1)}
            disabled={lessonIndex === lessons.length - 1}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition"
            title="Next chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-indigo-500 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
            Sėkmės! {lesson.book} knyga
          </span>
          <span className="bg-slate-800 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
            {lesson.level}
          </span>
          <span className="text-slate-400 text-xs font-semibold">
            {lesson.chapter} skyrius iš 21
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          {lesson.title}
        </h1>
        <p className="text-indigo-200 text-sm sm:text-base font-medium max-w-2xl mb-4">
          {isRu ? lesson.title_ru : (lesson.title_en || lesson.title)}
        </p>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          {isRu ? lesson.summary_ru : (lesson.summary_en || lesson.summary_ru)}
        </p>

        {/* Tab Buttons */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-slate-700/60">
          {[
            { id: 'grammar', label: isRu ? '📖 Грамматика и правила' : '📖 Grammar & Rules' },
            { id: 'vocab', label: isRu ? '🔤 Словарь и фразы' : '🔤 Vocabulary & Phrases' },
            { id: 'exercises', label: `${isRu ? '✍️ Упражнения' : '✍️ Exercises'} (${lesson.exercises?.length || 0})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Grammar Content */}
      {activeTab === 'grammar' && (
        <div className="space-y-6 animate-fadeIn">
          {lesson.grammar?.map((item, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                {item.topic}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {isRu ? item.explanation_ru : (item.explanation_en || item.explanation_ru)}
              </p>

              {item.table && (
                <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-950/60">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-800/80 text-indigo-300 uppercase tracking-wider text-[11px] font-bold">
                      <tr>
                        <th className="py-2.5 px-4">Lietuviškai (Лит.)</th>
                        <th className="py-2.5 px-4">{isRu ? 'По-русски' : 'In English'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-medium">
                      {item.table.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/30 transition">
                          <td className="py-2 px-4 text-white font-bold">{row.lt}</td>
                          <td className="py-2 px-4 text-slate-300">{isRu ? row.ru : (row.en || row.ru)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Vocabulary Content */}
      {activeTab === 'vocab' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {lesson.vocabulary?.map((word, wIdx) => (
              <div
                key={wIdx}
                className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/60 p-4 rounded-xl shadow transition"
              >
                <div className="text-lg font-black text-white mb-1 tracking-tight">
                  {word.lt}
                </div>
                <div className="text-xs text-indigo-300 font-medium mb-1">
                  {isRu ? word.ru : (word.en || word.ru)}
                </div>
              </div>
            ))}
          </div>

          {lesson.dialogues && lesson.dialogues.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl mt-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>💬 {isRu ? 'Диалог из урока' : 'Lesson Dialogue'}</span>
              </h3>
              <div className="space-y-3">
                {lesson.dialogues[0].lines.map((line, lIdx) => (
                  <div key={lIdx} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                    <span className="text-xs font-bold text-indigo-400 block mb-1">
                      {line.speaker}:
                    </span>
                    <div className="text-sm font-bold text-white mb-0.5">
                      {line.lt}
                    </div>
                    <div className="text-xs text-slate-400">
                      {isRu ? line.ru : (line.en || line.ru)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Interactive Exercises */}
      {activeTab === 'exercises' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs sm:text-sm font-semibold text-slate-300">
              {isRu ? 'Проверьте понимание материала главы:' : 'Test your knowledge on this chapter:'}
            </span>
            <button
              onClick={resetExercises}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {isRu ? 'Сбросить' : 'Reset'}
            </button>
          </div>

          <div className="space-y-4">
            {lesson.exercises?.map((ex, idx) => {
              const currentFeedback = feedback[ex.id];
              const isAnswered = !!currentFeedback;

              return (
                <div
                  key={ex.id}
                  className={`p-5 rounded-2xl border-2 transition shadow-xl bg-slate-900/90 ${
                    !isAnswered
                      ? 'border-slate-800'
                      : currentFeedback.isCorrect
                      ? 'border-emerald-500/60 bg-emerald-950/10'
                      : 'border-rose-500/60 bg-rose-950/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      {isRu ? `Вопрос ${idx + 1}` : `Question ${idx + 1}`}
                    </span>
                    {isAnswered && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        currentFeedback.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {currentFeedback.isCorrect ? (isRu ? 'Верно! ✅' : 'Correct! ✅') : (isRu ? 'Неверно ❌' : 'Incorrect ❌')}
                      </span>
                    )}
                  </div>

                  <div className="text-base sm:text-lg font-bold text-white mb-3">
                    {ex.question}
                  </div>
                  {isRu && ex.question_ru && (
                    <div className="text-xs text-slate-400 mb-4 italic">
                      {ex.question_ru}
                    </div>
                  )}

                  {/* Multiple Choice Format */}
                  {ex.type === 'choice' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {ex.options.map((opt, oIdx) => {
                        const isChosen = userAnswers[ex.id] === opt;
                        const isCorrectOption = opt === ex.answer;

                        let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700';
                        if (isAnswered) {
                          if (isCorrectOption) btnStyle = 'bg-emerald-600 text-white border-emerald-400 font-bold';
                          else if (isChosen) btnStyle = 'bg-rose-600 text-white border-rose-400 line-through';
                          else btnStyle = 'bg-slate-800/50 text-slate-500 border-slate-700/50';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => handleChoiceSelect(ex.id, opt, ex)}
                            className={`p-3 rounded-xl border text-left font-medium text-sm transition ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Fill in the blank Format */}
                  {ex.type === 'fill' && (
                    <form
                      onSubmit={(e) => handleFillSubmit(ex.id, ex, e)}
                      className="flex flex-col sm:flex-row gap-2 mb-3"
                    >
                      <input
                        type="text"
                        disabled={isAnswered}
                        value={userAnswers[ex.id] || ''}
                        onChange={(e) => setUserAnswers({ ...userAnswers, [ex.id]: e.target.value })}
                        placeholder={isRu ? 'Введите ответ на литовском...' : 'Type answer in Lithuanian...'}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500"
                      />
                      {!isAnswered && (
                        <button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition shadow"
                        >
                          {isRu ? 'Проверить' : 'Check'}
                        </button>
                      )}
                    </form>
                  )}

                  {/* Immediate Explanation */}
                  {isAnswered && (
                    <div className={`mt-3 p-3 rounded-xl text-xs ${
                      currentFeedback.isCorrect ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-800/40' : 'bg-rose-950/40 text-rose-200 border border-rose-800/40'
                    }`}>
                      <div className="font-bold mb-0.5">
                        {isRu ? 'Объяснение правила:' : 'Grammar Explanation:'}
                      </div>
                      <div>{currentFeedback.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
