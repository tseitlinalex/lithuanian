import React, { useState } from 'react';
import {
  BookOpen, CheckCircle, ChevronLeft, ChevronRight, HelpCircle,
  Award, Volume2, ArrowRight, RotateCcw, Eye, EyeOff, Layers, MessageSquare, Check, X
} from 'lucide-react';
import { checkAnswerMatch } from '../utils/textNormalizer';
import { soundFx } from '../utils/audio';

export default function LessonViewer({ lessons, currentLessonId, onSelectLesson, onBack, lang = 'ru' }) {
  const isRu = lang === 'ru';

  const initialIndex = Math.max(0, lessons.findIndex(l => l.id === currentLessonId));
  const [lessonIndex, setLessonIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [activeTab, setActiveTab] = useState('grammar'); // 'grammar', 'cards', 'dialogues', 'exercises'

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState({});

  // Exercise states for current lesson
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);

  const lesson = lessons[lessonIndex] || lessons[0];
  const vocabList = lesson.vocabulary || [];

  const handleLessonChange = (newIndex) => {
    if (newIndex >= 0 && newIndex < lessons.length) {
      setLessonIndex(newIndex);
      setUserAnswers({});
      setFeedback({});
      setScore(0);
      setCardIndex(0);
      setIsFlipped(false);
      setActiveTab('grammar');
      if (onSelectLesson) onSelectLesson(lessons[newIndex].id);
    }
  };

  const speakLithuanian = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'lt-LT';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleChoiceSelect = (exIdx, choice, ex) => {
    if (feedback[exIdx]) return;
    const isCorrect = choice === ex.answer;
    if (isCorrect) {
      soundFx.playCorrect(1);
      setScore(prev => prev + 1);
    } else {
      soundFx.playWordHitBottom();
    }

    setUserAnswers(prev => ({ ...prev, [exIdx]: choice }));
    setFeedback(prev => ({
      ...prev,
      [exIdx]: {
        isCorrect,
        explanation: ex.explanation || ex.explanation_ru
      }
    }));
  };

  const handleFillSubmit = (exIdx, ex, e) => {
    if (e) e.preventDefault();
    const val = userAnswers[exIdx] || '';
    if (!val.trim()) return;

    const acceptable = ex.acceptableAnswers || [ex.answer];
    const isCorrect = checkAnswerMatch(val, acceptable);
    if (isCorrect) {
      soundFx.playCorrect(1);
      setScore(prev => prev + 1);
    } else {
      soundFx.playWordHitBottom();
    }

    setFeedback(prev => ({
      ...prev,
      [exIdx]: {
        isCorrect,
        correctAnswer: ex.answer,
        explanation: ex.explanation || ex.explanation_ru
      }
    }));
  };

  const resetExercises = () => {
    setUserAnswers({});
    setFeedback({});
    setScore(0);
  };

  const toggleWordKnowledge = (wordKey) => {
    setKnownWords(prev => ({
      ...prev,
      [wordKey]: !prev[wordKey]
    }));
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
            title="Предыдущая глава"
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
                {l.book} knyga • {l.chapter} skyrius: {l.title} ({l.level})
              </option>
            ))}
          </select>

          <button
            onClick={() => handleLessonChange(lessonIndex + 1)}
            disabled={lessonIndex === lessons.length - 1}
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition"
            title="Следующая глава"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900/40 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-indigo-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow">
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
        <p className="text-indigo-200 text-sm sm:text-base font-semibold max-w-2xl mb-3">
          {lesson.title_ru}
        </p>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          {lesson.summary_ru}
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-700/60">
          {[
            { id: 'grammar', label: '📖 Грамматика и правила', count: lesson.grammar?.length },
            { id: 'cards', label: '🎴 Карточки для запоминания', count: vocabList.length },
            { id: 'dialogues', label: '💬 Диалоги из книги', count: lesson.dialogues?.length || 0 },
            { id: 'exercises', label: '✍️ Интерактивный тест', count: lesson.exercises?.length || 0 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-700 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Grammar Content */}
      {activeTab === 'grammar' && (
        <div className="space-y-6 animate-fadeIn">
          {lesson.grammar?.map((item, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
              <h3 className="text-lg sm:text-xl font-black text-indigo-400 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                {item.topic}
              </h3>
              <div className="text-slate-200 text-sm leading-relaxed mb-5 whitespace-pre-line bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                {item.explanation_ru}
              </div>

              {item.table && (
                <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-950/80 shadow-inner">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-indigo-950/60 text-indigo-200 uppercase tracking-wider text-[11px] font-bold border-b border-indigo-900/40">
                      <tr>
                        <th className="py-3 px-4">Литовская форма</th>
                        <th className="py-3 px-4">Перевод на русский</th>
                        <th className="py-3 px-4">Пояснение / Пример</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {item.table.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                          <td className="py-2.5 px-4 text-emerald-300 font-mono font-bold text-sm sm:text-base">
                            {row.lt}
                          </td>
                          <td className="py-2.5 px-4 text-slate-100 font-medium">
                            {row.ru}
                          </td>
                          <td className="py-2.5 px-4 text-slate-400 text-xs italic">
                            {row.note || '—'}
                          </td>
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

      {/* Tab 2: Interactive Flashcards (Study Cards) */}
      {activeTab === 'cards' && vocabList.length > 0 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>
              Карточка <strong>{cardIndex + 1}</strong> из <strong>{vocabList.length}</strong>
            </span>
            <span>
              Изучено: <strong className="text-emerald-400">{Object.values(knownWords).filter(Boolean).length}</strong> слов
            </span>
          </div>

          {/* Flashcard container */}
          <div className="flex flex-col items-center">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-xl min-h-[260px] bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500/40 hover:border-indigo-400 rounded-3xl p-8 cursor-pointer shadow-2xl flex flex-col justify-between transition-all select-none group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/80 border border-indigo-800/50 px-2.5 py-1 rounded-full">
                  {vocabList[cardIndex]?.category || 'Словарь'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakLithuanian(vocabList[cardIndex]?.word || vocabList[cardIndex]?.lt);
                  }}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                  title="Озвучить на литовском"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="my-6 text-center">
                {!isFlipped ? (
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                      {vocabList[cardIndex]?.word || vocabList[cardIndex]?.lt}
                    </div>
                    {vocabList[cardIndex]?.transcription && (
                      <div className="text-xs text-indigo-300 font-mono">
                        [{vocabList[cardIndex]?.transcription}]
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Нажмите, чтобы перевернуть карточку
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs text-emerald-400 uppercase font-bold tracking-widest mb-1">
                      Перевод на русский:
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-200">
                      {vocabList[cardIndex]?.translation || vocabList[cardIndex]?.ru}
                    </div>
                    <div className="text-xs text-slate-400 mt-3 font-mono">
                      {vocabList[cardIndex]?.word || vocabList[cardIndex]?.lt}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWordKnowledge(vocabList[cardIndex]?.word || vocabList[cardIndex]?.lt);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition ${
                    knownWords[vocabList[cardIndex]?.word || vocabList[cardIndex]?.lt]
                      ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {knownWords[vocabList[cardIndex]?.word || vocabList[cardIndex]?.lt] ? 'Знаю это слово' : 'Отметить как выученное'}
                </button>
                <span className="text-xs text-slate-500">
                  {cardIndex + 1} / {vocabList.length}
                </span>
              </div>
            </div>

            {/* Flashcard Navigation Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => {
                  setCardIndex(prev => Math.max(0, prev - 1));
                  setIsFlipped(false);
                }}
                disabled={cardIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs text-white transition flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Назад
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition shadow-lg shadow-indigo-600/30"
              >
                {isFlipped ? 'Показать оригинал' : 'Перевернуть'}
              </button>

              <button
                onClick={() => {
                  setCardIndex(prev => Math.min(vocabList.length - 1, prev + 1));
                  setIsFlipped(false);
                }}
                disabled={cardIndex === vocabList.length - 1}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs text-white transition flex items-center gap-1"
              >
                Вперед <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Vocabulary Grid List */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
              Полный список слов этой главы ({vocabList.length}):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {vocabList.map((w, wIdx) => {
                const wordKey = w.word || w.lt;
                const isKnown = knownWords[wordKey];
                return (
                  <div
                    key={wIdx}
                    onClick={() => {
                      setCardIndex(wIdx);
                      setIsFlipped(false);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      cardIndex === wIdx
                        ? 'border-indigo-500 bg-indigo-950/30'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-1.5">
                        {wordKey}
                        {isKnown && <span className="text-[10px] text-emerald-400">✓</span>}
                      </div>
                      <div className="text-xs text-slate-400">
                        {w.translation || w.ru}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakLithuanian(wordKey);
                      }}
                      className="p-1.5 text-slate-500 hover:text-indigo-400 transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dialogues from Textbook */}
      {activeTab === 'dialogues' && (
        <div className="space-y-6 animate-fadeIn">
          {(!lesson.dialogues || lesson.dialogues.length === 0) ? (
            <div className="p-8 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
              В этой главе диалог интегрирован в грамматические примеры.
            </div>
          ) : (
            lesson.dialogues.map((dial, dIdx) => (
              <div key={dIdx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  {dial.title}
                </h3>
                <div className="space-y-3">
                  {dial.lines.map((line, lIdx) => (
                    <div key={lIdx} className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="text-xs font-bold text-indigo-400 block mb-1">
                          {line.speaker}:
                        </span>
                        <div className="text-base font-bold text-white mb-1">
                          {line.lt}
                        </div>
                        <div className="text-xs text-slate-300">
                          {line.ru}
                        </div>
                      </div>
                      <button
                        onClick={() => speakLithuanian(line.lt)}
                        className="p-2 bg-slate-700/60 hover:bg-indigo-600 rounded-lg text-slate-300 hover:text-white transition"
                        title="Прослушать реплику"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Interactive Exercises */}
      {activeTab === 'exercises' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-sm font-bold text-white block">
                Интерактивные упражнения к главе {lesson.chapter}
              </span>
              <span className="text-xs text-slate-400">
                Правильно решено: <strong className="text-indigo-400">{score}</strong> из {lesson.exercises?.length || 0}
              </span>
            </div>
            <button
              onClick={resetExercises}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Сбросить
            </button>
          </div>

          <div className="space-y-4">
            {lesson.exercises?.map((ex, idx) => {
              const currentFeedback = feedback[idx];
              const isAnswered = !!currentFeedback;

              return (
                <div
                  key={idx}
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
                      Вопрос {idx + 1} из {lesson.exercises.length}
                    </span>
                    {isAnswered && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        currentFeedback.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {currentFeedback.isCorrect ? 'Верно! ✅' : 'Неверно ❌'}
                      </span>
                    )}
                  </div>

                  <div className="text-base sm:text-lg font-bold text-white mb-2">
                    {ex.question}
                  </div>
                  {ex.hint && !isAnswered && (
                    <div className="text-xs text-indigo-300/80 mb-3 italic">
                      💡 Подсказка: {ex.hint}
                    </div>
                  )}

                  {/* Multiple Choice Format */}
                  {ex.type === 'mc' && ex.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {ex.options.map((opt, oIdx) => {
                        const isChosen = userAnswers[idx] === opt;
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
                            onClick={() => handleChoiceSelect(idx, opt, ex)}
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
                      onSubmit={(e) => handleFillSubmit(idx, ex, e)}
                      className="flex flex-col sm:flex-row gap-2 mb-3"
                    >
                      <input
                        type="text"
                        disabled={isAnswered}
                        value={userAnswers[idx] || ''}
                        onChange={(e) => setUserAnswers({ ...userAnswers, [idx]: e.target.value })}
                        placeholder="Введите ответ на литовском (можно без диакритики)..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500"
                      />
                      {!isAnswered && (
                        <button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition shadow"
                        >
                          Проверить
                        </button>
                      )}
                    </form>
                  )}

                  {/* Immediate Explanation */}
                  {isAnswered && (
                    <div className={`mt-3 p-3.5 rounded-xl text-xs ${
                      currentFeedback.isCorrect ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-800/40' : 'bg-rose-950/40 text-rose-200 border border-rose-800/40'
                    }`}>
                      <div className="font-bold mb-1">
                        {!currentFeedback.isCorrect && ex.answer && (
                          <span className="text-white block mb-0.5">
                            Правильный ответ: <strong>{ex.answer}</strong>
                          </span>
                        )}
                        Объяснение правила:
                      </div>
                      <div className="leading-relaxed">{currentFeedback.explanation}</div>
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
