import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, ArrowRight, CheckCircle2, XCircle, Info, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { checkAnswerMatch } from '../utils/textNormalizer';
import { soundFx } from '../utils/audio';

export default function CountryDeclensionGame({ topic, onBackToTopics, soundMuted, onToggleSound, lang = 'ru' }) {
  const isRu = lang === 'ru';
  const countries = topic.countries || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputs, setInputs] = useState({ 0: '', 1: '', 2: '' });
  const [statuses, setStatuses] = useState({ 0: null, 1: null, 2: null });
  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentCountry = countries[currentIndex] || countries[0];

  const handleInputChange = (qIdx, val) => {
    setInputs(prev => ({ ...prev, [qIdx]: val }));
  };

  const handleCheckQuestion = (qIdx) => {
    const q = currentCountry.questions[qIdx];
    const userVal = inputs[qIdx];
    if (!userVal || !userVal.trim()) return;

    const isMatch = checkAnswerMatch(userVal, [q.answer, ...(q.acceptableAnswers || [])]);

    if (isMatch) {
      soundFx.playCorrect(1);
      setStatuses(prev => ({ ...prev, [qIdx]: { isCorrect: true } }));
      setScore(s => s + 100);
      setStreak(s => s + 1);
    } else {
      soundFx.playWordHitBottom();
      setStatuses(prev => ({
        ...prev,
        [qIdx]: {
          isCorrect: false,
          answer: q.answer,
          rule: isRu ? q.rule_ru : (q.rule || q.rule_ru)
        }
      }));
      setStreak(0);
    }
  };

  const handleCheckAll = (e) => {
    if (e) e.preventDefault();
    currentCountry.questions.forEach((_, idx) => {
      if (statuses[idx]?.isCorrect !== true) {
        handleCheckQuestion(idx);
      }
    });
  };

  const handleNextCountry = () => {
    if (currentIndex + 1 < countries.length) {
      setCurrentIndex(prev => prev + 1);
      setInputs({ 0: '', 1: '', 2: '' });
      setStatuses({ 0: null, 1: null, 2: null });
      setActiveInputIndex(0);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setInputs({ 0: '', 1: '', 2: '' });
    setStatuses({ 0: null, 1: null, 2: null });
    setActiveInputIndex(0);
    setScore(0);
    setStreak(0);
    setIsCompleted(false);
  };

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-80px)] max-w-4xl mx-auto p-2 sm:p-4">
      {/* HUD Header */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToTopics}
            className="text-xs sm:text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition font-medium"
          >
            ← {isRu ? 'Темы' : 'Topics'}
          </button>
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{isRu && topic.title_ru ? topic.title_ru : topic.title}</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase font-semibold">{isRu ? 'Счёт' : 'Score'}</div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono text-glow">
              {score}
            </div>
          </div>

          {streak > 1 && (
            <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold px-2.5 py-1 rounded-xl text-xs sm:text-sm animate-pulse">
              🔥 {streak} {isRu ? 'Серия' : 'Streak'}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSound}
              className="p-2 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition"
              title="Toggle Sound"
            >
              {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Card Area */}
      {!isCompleted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex-1 flex flex-col justify-between">
          <div>
            {/* Country Header & Progress */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentCountry.flag}</span>
                <div>
                  <div className="text-xs text-indigo-400 uppercase font-bold tracking-wider">{isRu ? 'Страна' : 'Country'}</div>
                  <h3 className="text-2xl font-black text-white">{currentCountry.country}</h3>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                {isRu ? 'Страна' : 'Country'} {currentIndex + 1} / {countries.length}
              </div>
            </div>

            {/* 3 Declension Questions Form */}
            <form onSubmit={handleCheckAll} className="space-y-4">
              {currentCountry.questions.map((q, idx) => {
                const status = statuses[idx];
                const isFocused = activeInputIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveInputIndex(idx)}
                    className={`p-4 rounded-xl border transition-all ${
                      isFocused ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/30' : 'bg-slate-800/50 border-slate-700/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        {isRu ? q.label_ru : q.label}
                      </span>
                      {status?.isCorrect === true && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> {isRu ? 'Правильно!' : 'Correct!'}
                        </span>
                      )}
                      {status?.isCorrect === false && (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-400">
                          <XCircle className="w-4 h-4" /> {isRu ? 'Неправильно' : 'Incorrect'}
                        </span>
                      )}
                    </div>

                    {/* Lithuanian Phrase Prompt */}
                    <div className="text-base sm:text-lg font-bold text-slate-200 mb-2">
                      {q.prompt}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputs[idx] || ''}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        onFocus={() => setActiveInputIndex(idx)}
                        placeholder={isRu ? 'Введите окончание...' : 'Type answer...'}
                        className={`flex-1 bg-slate-900 border text-white px-3 py-2 rounded-lg font-medium focus:outline-none ${
                          status?.isCorrect === true
                            ? 'border-emerald-500/80 text-emerald-200'
                            : status?.isCorrect === false
                            ? 'border-rose-500/80 text-rose-200'
                            : 'border-slate-600 focus:border-indigo-400'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleCheckQuestion(idx)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                      >
                        {isRu ? 'Проверить' : 'Check'}
                      </button>
                    </div>

                    {/* Rule Explanation Display on Error */}
                    {status?.isCorrect === false && (
                      <div className="mt-3 bg-rose-950/60 border border-rose-500/40 p-3 rounded-lg text-xs text-rose-200 flex items-start gap-2 animate-fadeIn">
                        <Info className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-amber-300 mb-0.5">
                            {isRu ? 'Правильный ответ:' : 'Correct Answer:'} <span className="underline">{status.answer}</span>
                          </div>
                          <div><span className="font-bold">{isRu ? 'Правило:' : 'Rule:'}</span> {status.rule}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </form>
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={handleCheckAll}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-sm transition"
            >
              {isRu ? 'Проверить все' : 'Check All'}
            </button>

            <button
              onClick={handleNextCountry}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              <span>{currentIndex + 1 < countries.length ? (isRu ? 'Следующая страна' : 'Next Country') : (isRu ? 'Завершить' : 'Finish')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completion Victory Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
          <Trophy className="w-20 h-20 text-amber-400 mx-auto animate-bounce-short" />
          <h2 className="text-3xl font-black text-white">{isRu ? 'Отлично! Все страны пройдены! 🎉' : 'Awesome! All Countries Completed! 🎉'}</h2>
          <p className="text-slate-300">{isRu ? 'Вы усвоили правила склонения наименований стран по 3 падежным вопросам!' : 'You have mastered country declension rules across all 3 case questions!'}</p>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 max-w-xs mx-auto text-lg font-bold text-amber-400 font-mono">
            {isRu ? 'Итоговый счёт:' : 'Final Score:'} {score}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" /> {isRu ? 'Пройти снова' : 'Try Again'}
            </button>
            <button
              onClick={onBackToTopics}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-6 py-3 rounded-xl transition"
            >
              {isRu ? 'Выбрать другую тему' : 'Select Another Topic'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
