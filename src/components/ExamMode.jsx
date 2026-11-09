import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Clock, HelpCircle, ChevronLeft, AlertTriangle } from 'lucide-react';
import { checkAnswerMatch } from '../utils/textNormalizer';
import { soundFx } from '../utils/audio';

export default function ExamMode({ examSuites, currentExamId, onSelectExam, onBack, lang = 'ru' }) {
  const isRu = lang === 'ru';

  const initialIndex = Math.max(0, examSuites.findIndex(e => e.id === currentExamId));
  const [selectedSuiteIdx, setSelectedSuiteIdx] = useState(initialIndex >= 0 ? initialIndex : 0);
  const exam = examSuites[selectedSuiteIdx] || examSuites[0];

  // Exam taking state
  const [examStatus, setExamStatus] = useState('intro'); // 'intro', 'testing', 'result'
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Timer loop
  useEffect(() => {
    let interval = null;
    if (examStatus === 'testing') {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStatus]);

  const startExam = () => {
    setUserAnswers({});
    setCurrentQIdx(0);
    setTimerSeconds(0);
    setExamStatus('testing');
  };

  const handleSelectOption = (qId, option) => {
    setUserAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleFillInput = (qId, val) => {
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const finishExam = () => {
    setExamStatus('result');
    const scorePct = calculateScore();
    if (scorePct >= exam.passingScore) {
      soundFx.playComboChord();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    } else {
      soundFx.playGameOver();
    }
  };

  const calculateScore = () => {
    if (!exam.questions || exam.questions.length === 0) return 0;
    let correctCount = 0;
    exam.questions.forEach(q => {
      const uAns = userAnswers[q.id] || '';
      if (q.type === 'choice') {
        if (uAns.trim() === q.answer.trim()) correctCount++;
      } else {
        const acceptable = q.acceptableAnswers || [q.answer];
        if (checkAnswerMatch(uAns, acceptable)) correctCount++;
      }
    });
    return Math.round((correctCount / exam.questions.length) * 100);
  };

  const scorePct = calculateScore();
  const isPassed = scorePct >= exam.passingScore;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition"
        >
          <ChevronLeft className="w-4 h-4" /> {isRu ? 'Назад к темам' : 'Back to Menu'}
        </button>

        <div className="flex items-center gap-2">
          {examSuites.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSuiteIdx(idx);
                setExamStatus('intro');
                if (onSelectExam) onSelectExam(s.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedSuiteIdx === idx
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {s.id === 'exam-b1' ? '1 Knyga (A1.1)' : s.id === 'exam-b2' ? '2 Knyga (A1.2)' : 'Full State A1'}
            </button>
          ))}
        </div>
      </div>

      {/* Intro Screen */}
      {examStatus === 'intro' && (
        <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-2xl space-y-6 animate-fadeIn">
          <div className="inline-flex p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <Award className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isRu ? exam.title_ru : (exam.title_en || exam.title)}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              {isRu ? exam.description_ru : (exam.description_en || exam.description_ru)}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">{isRu ? 'Вопросов' : 'Questions'}</div>
              <div className="text-xl font-black text-white">{exam.questions.length}</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">{isRu ? 'Проходной балл' : 'Pass Mark'}</div>
              <div className="text-xl font-black text-emerald-400">{exam.passingScore}%</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">{isRu ? 'Уровень' : 'Level'}</div>
              <div className="text-xl font-black text-indigo-400">A1</div>
            </div>
          </div>

          <div>
            <button
              onClick={startExam}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isRu ? 'Начать экзамен 🚀' : 'Start Exam 🚀'}
            </button>
          </div>
        </div>
      )}

      {/* Testing Screen */}
      {examStatus === 'testing' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Progress & Timer Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-sm text-indigo-300">
                {isRu ? 'Вопрос' : 'Question'} {currentQIdx + 1} / {exam.questions.length}
              </span>
              <div className="hidden sm:block w-36 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQIdx + 1) / exam.questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300 font-mono text-sm bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Current Question Card */}
          {(() => {
            const q = exam.questions[currentQIdx];
            const currentAns = userAnswers[q.id] || '';

            return (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
                    {q.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-4 leading-snug whitespace-pre-line">
                    {q.question}
                  </h3>
                  {isRu && q.question_ru && (
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 italic">
                      {q.question_ru}
                    </p>
                  )}
                </div>

                {/* Multiple Choice */}
                {q.type === 'choice' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(q.id, opt)}
                        className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all ${
                          currentAns === opt
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30'
                            : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Fill-in-the-blank */}
                {q.type === 'fill' && (
                  <div>
                    <input
                      type="text"
                      value={currentAns}
                      onChange={(e) => handleFillInput(q.id, e.target.value)}
                      placeholder={isRu ? 'Введите ответ на литовском...' : 'Type answer in Lithuanian...'}
                      className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl px-5 py-3.5 text-white font-medium text-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      autoFocus
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentQIdx(q => Math.max(0, q - 1))}
                    disabled={currentQIdx === 0}
                    className="text-xs font-bold text-slate-400 hover:text-white disabled:opacity-20 disabled:hover:text-slate-400 transition"
                  >
                    ← {isRu ? 'Предыдущий' : 'Previous'}
                  </button>

                  {currentQIdx < exam.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIdx(q => q + 1)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
                    >
                      {isRu ? 'Следующий' : 'Next'} <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={finishExam}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
                    >
                      {isRu ? 'Завершить экзамен ✅' : 'Finish Exam ✅'}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Result Screen */}
      {examStatus === 'result' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-4">
            <div className="inline-flex p-3 rounded-full bg-slate-800 border border-slate-700">
              {isPassed ? (
                <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce-short" />
              ) : (
                <AlertTriangle className="w-16 h-16 text-amber-400 animate-bounce-short" />
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {isPassed ? (isRu ? 'Экзамен сдан! 🎉' : 'Exam Passed! 🎉') : (isRu ? 'Нужно еще потренироваться' : 'Keep Practicing')}
            </h2>

            <div className="flex items-center justify-center gap-2">
              <span className={`text-4xl font-black font-mono ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {scorePct}%
              </span>
              <span className="text-xs text-slate-400">
                ({isRu ? `Проходной: ${exam.passingScore}%` : `Pass: ${exam.passingScore}%`})
              </span>
            </div>

            <p className="text-slate-300 text-sm max-w-md mx-auto">
              {isPassed
                ? (isRu ? 'Поздравляем! Вы продемонстрировали уверенное знание грамматики и словарного запаса на уровень A1!' : 'Congratulations! You demonstrated solid mastery of A1 Lithuanian!')
                : (isRu ? 'Не огорчайтесь! Ознакомьтесь с подробным разбором ошибок ниже и попробуйте снова.' : "Review your mistakes below and try again!")}
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={startExam}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> {isRu ? 'Пройти снова' : 'Retake Exam'}
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">
              {isRu ? 'Подробный анализ ответов и грамматические правила:' : 'Detailed Answer Review & Grammar Rules:'}
            </h3>

            <div className="space-y-4">
              {exam.questions.map((q, idx) => {
                const uAns = userAnswers[q.id] || '';
                let isCorrect = false;
                if (q.type === 'choice') {
                  isCorrect = uAns.trim() === q.answer.trim();
                } else {
                  const acceptable = q.acceptableAnswers || [q.answer];
                  isCorrect = checkAnswerMatch(uAns, acceptable);
                }

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border ${
                      isCorrect ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-rose-500/30 bg-rose-950/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-400">
                        {isRu ? `Вопрос ${idx + 1}` : `Question ${idx + 1}`} • {q.category}
                      </span>
                      <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? (isRu ? 'Верно ✅' : 'Correct ✅') : (isRu ? 'Ошибка ❌' : 'Incorrect ❌')}
                      </span>
                    </div>

                    <div className="text-white font-bold text-sm mb-2 whitespace-pre-line">
                      {q.question}
                    </div>

                    <div className="text-xs space-y-1 mb-2">
                      <div className="text-slate-300">
                        {isRu ? 'Ваш ответ:' : 'Your answer:'} <span className={isCorrect ? 'text-emerald-300 font-bold' : 'text-rose-400 font-bold line-through'}>{uAns || (isRu ? '(пусто)' : '(empty)')}</span>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-400 font-bold">
                          {isRu ? 'Правильный ответ:' : 'Correct answer:'} {q.answer}
                        </div>
                      )}
                    </div>

                    {q.explanation_ru && (
                      <div className="text-xs text-indigo-300 bg-slate-900/80 p-2.5 rounded-xl border border-indigo-900/50">
                        <span className="font-bold text-amber-300">{isRu ? '💡 Правило:' : '💡 Rule:'}</span> {q.explanation_ru}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
