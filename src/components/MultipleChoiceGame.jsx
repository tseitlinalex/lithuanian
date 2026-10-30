import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Volume2, VolumeX, ShieldAlert, Sparkles, BookOpen, CheckCircle2, ArrowRight, Info, Download, ArrowRightLeft, FileJson, Flag, HelpCircle, Check, X } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { exportTopicAsJson } from '../utils/jsonExporter';

export function generateQuestionOptions(currentItem, allItems, testDirection = 'normal') {
  if (!currentItem || !Array.isArray(allItems)) return [];

  const correctAnswer = testDirection === 'reverse' ? currentItem.prompt : currentItem.answer;

  const distractorCandidates = allItems
    .map(i => testDirection === 'reverse' ? i.prompt : i.answer)
    .filter(ans => ans && ans !== correctAnswer);

  // Deduplicate candidates
  const uniqueCandidates = Array.from(new Set(distractorCandidates));

  // Shuffle distractors
  const shuffledCandidates = [...uniqueCandidates].sort(() => Math.random() - 0.5);
  const selectedDistractors = shuffledCandidates.slice(0, 3);

  // Combine correct answer + distractors and shuffle
  const options = [correctAnswer, ...selectedDistractors].sort(() => Math.random() - 0.5);
  return options;
}

export default function MultipleChoiceGame({
  topic,
  onBackToTopics,
  soundMuted,
  onToggleSound,
  onUpdateTopicStats,
  onToggleWordIssue,
  lang = 'ru'
}) {
  const isRu = lang === 'ru';

  const [testDirection, setTestDirection] = useState('normal'); // 'normal' (prompt -> answer) or 'reverse' (answer -> prompt)
  const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'gameover', 'victory', 'practice'
  const [questionQueue, setQuestionQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [wordsCleared, setWordsCleared] = useState(0);
  const [missedWords, setMissedWords] = useState([]);

  const [topicStats, setTopicStats] = useState(topic);

  useEffect(() => {
    setTopicStats(topic);
  }, [topic]);

  // Practice Mode State
  const [practiceList, setPracticeList] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState(null);

  const currentQuestion = questionQueue[currentIndex] || null;

  const recordWordPerformance = (itemId, isCorrect) => {
    setTopicStats(prevTopic => {
      if (!prevTopic || !prevTopic.items) return prevTopic;

      const updatedItems = prevTopic.items.map(item => {
        if (item.id === itemId) {
          const timesCorrect = (item.timesCorrect || 0) + (isCorrect ? 1 : 0);
          const timesIncorrect = (item.timesIncorrect || 0) + (isCorrect ? 0 : 1);
          const hasIssue = item.hasIssue || !isCorrect;
          const status = hasIssue ? 'need_practice' : (timesCorrect > timesIncorrect ? 'known' : 'need_practice');

          return {
            ...item,
            timesCorrect,
            timesIncorrect,
            hasIssue,
            status
          };
        }
        return item;
      });

      const updatedTopic = { ...prevTopic, items: updatedItems };
      if (onUpdateTopicStats) {
        onUpdateTopicStats(updatedTopic);
      }
      return updatedTopic;
    });
  };

  const handleToggleWordIssueInGame = (itemId) => {
    setTopicStats(prevTopic => {
      if (!prevTopic || !prevTopic.items) return prevTopic;

      const updatedItems = prevTopic.items.map(item => {
        if (item.id === itemId) {
          const nextHasIssue = !item.hasIssue;
          return {
            ...item,
            hasIssue: nextHasIssue,
            status: nextHasIssue ? 'need_practice' : item.status
          };
        }
        return item;
      });

      const updatedTopic = { ...prevTopic, items: updatedItems };
      if (onUpdateTopicStats) {
        onUpdateTopicStats(updatedTopic);
      }
      return updatedTopic;
    });

    if (onToggleWordIssue) {
      onToggleWordIssue(topic.id, itemId);
    }
  };

  const startGame = () => {
    const items = [...topicStats.items].sort(() => Math.random() - 0.5);
    setQuestionQueue(items);
    setCurrentIndex(0);
    setScore(0);
    setLives(5);
    setStreak(0);
    setMaxStreak(0);
    setMultiplier(1);
    setWordsCleared(0);
    setMissedWords([]);
    setSelectedOption(null);
    setIsAnswered(false);

    if (items.length > 0) {
      const opts = generateQuestionOptions(items[0], topicStats.items, testDirection);
      setOptions(opts);
    }

    setGameState('playing');
  };

  const loadQuestion = (index, queue = questionQueue) => {
    if (index >= queue.length) {
      // Re-shuffle and loop if lives remain
      const reshuffled = [...topicStats.items].sort(() => Math.random() - 0.5);
      setQuestionQueue(reshuffled);
      setCurrentIndex(0);
      const opts = generateQuestionOptions(reshuffled[0], topicStats.items, testDirection);
      setOptions(opts);
      setSelectedOption(null);
      setIsAnswered(false);
      return;
    }

    setCurrentIndex(index);
    const opts = generateQuestionOptions(queue[index], topicStats.items, testDirection);
    setOptions(opts);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionSelect = (option) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const correctAnswer = testDirection === 'reverse' ? currentQuestion.prompt : currentQuestion.answer;
    const isCorrect = option === correctAnswer;

    if (isCorrect) {
      const basePoints = 100;
      const earnedPoints = basePoints * multiplier;

      setScore(s => s + earnedPoints);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const newMult = Math.min(5, Math.floor(newStreak / 3) + 1);
      setMultiplier(newMult);

      if (newStreak % 5 === 0) {
        soundFx.playComboChord();
      } else {
        soundFx.playCorrect(newMult);
      }

      setWordsCleared(c => c + 1);
      recordWordPerformance(currentQuestion.id, true);

      setTimeout(() => {
        loadQuestion(currentIndex + 1);
      }, 800);
    } else {
      soundFx.playWordHitBottom();
      setStreak(0);
      setMultiplier(1);
      recordWordPerformance(currentQuestion.id, false);

      setMissedWords(prev => {
        if (!prev.some(m => m.id === currentQuestion.id)) {
          return [...prev, currentQuestion];
        }
        return prev;
      });

      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setTimeout(() => {
          setGameState('gameover');
          soundFx.playGameOver();
        }, 1200);
      } else {
        setTimeout(() => {
          loadQuestion(currentIndex + 1);
        }, 1500);
      }
    }
  };

  const startPracticeMode = () => {
    if (missedWords.length === 0) return;
    setPracticeList([...missedWords]);
    setPracticeIndex(0);
    setPracticeInput('');
    setPracticeFeedback(null);
    setGameState('practice');
  };

  const handlePracticeSubmit = (e) => {
    if (e) e.preventDefault();
    if (!practiceInput.trim()) return;

    const currentWord = practiceList[practiceIndex];
    const targetAnswer = testDirection === 'reverse' ? currentWord.prompt : currentWord.answer;
    const isMatch = practiceInput.trim().toLowerCase() === targetAnswer.trim().toLowerCase();

    if (isMatch) {
      soundFx.playCorrect(2);
      recordWordPerformance(currentWord.id, true);
      setPracticeFeedback({ isCorrect: true, msg: isRu ? 'Отлично! (Puikiai!)' : 'Perfect! (Puikiai!)' });

      setTimeout(() => {
        setPracticeFeedback(null);
        setPracticeInput('');
        const nextIndex = practiceIndex + 1;

        if (nextIndex < practiceList.length) {
          setPracticeIndex(nextIndex);
        } else {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      }, 1000);
    } else {
      soundFx.playWordHitBottom();
      recordWordPerformance(currentWord.id, false);
      setPracticeFeedback({
        isCorrect: false,
        msg: isRu ? `Неправильно. (Ответ: ${targetAnswer})` : `Incorrect. (Answer: ${targetAnswer})`
      });
    }
  };

  const topicTitle = isRu && topic.title_ru ? topic.title_ru : topic.title;

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-80px)] max-w-3xl mx-auto p-3 sm:p-4">
      {/* Top Game Bar HUD */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToTopics}
            className="text-xs sm:text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition font-medium"
          >
            ← {isRu ? 'Темы' : 'Topics'}
          </button>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>{topicTitle}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                4-Choice Quiz
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-700">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-all ${
                  i < lives ? 'fill-red-500 text-red-500 scale-100' : 'text-slate-600 scale-90'
                }`}
              />
            ))}
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase font-semibold">{isRu ? 'Счёт' : 'Score'}</div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono text-glow">
              {score}
            </div>
          </div>

          <button
            onClick={onToggleSound}
            className="p-2 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition"
            title="Toggle Sound"
          >
            {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="flex-1 bg-slate-900/90 border-2 border-slate-700/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
        {gameState === 'ready' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-5">
            <Sparkles className="w-16 h-16 text-indigo-400 animate-pulse" />
            <h2 className="text-3xl font-extrabold text-white">{topicTitle}</h2>
            <p className="text-slate-300 max-w-md text-sm">
              {isRu
                ? 'Выберите один из 4 вариантов ответа для каждого вопроса!'
                : 'Select the correct option among 4 choices for each word prompt!'}
            </p>

            {/* Direction Selection Toggle */}
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-xl flex items-center gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase">{isRu ? 'Направление:' : 'Direction:'}</span>
              <button
                onClick={() => setTestDirection('normal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  testDirection === 'normal' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {isRu ? 'Вопрос: Перевод → Ответ: Литовский' : 'Prompt: Translation → Option: Lithuanian'}
              </button>
              <button
                onClick={() => setTestDirection('reverse')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  testDirection === 'reverse' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                {isRu ? 'Вопрос: Литовский → Ответ: Перевод' : 'Prompt: Lithuanian → Option: Translation'}
              </button>
            </div>

            <button
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isRu ? 'Начать викторину! 🚀' : 'Start Quiz! 🚀'}
            </button>
          </div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            {/* Header Question Prompt Box */}
            <div className="bg-slate-800/90 border-2 border-indigo-500/60 p-6 rounded-2xl shadow-xl text-center relative">
              <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-2">
                {isRu ? 'Вопрос / Prompt:' : 'Question Prompt:'}
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white text-glow mb-2">
                {testDirection === 'reverse' ? currentQuestion.answer : currentQuestion.prompt}
              </div>

              {currentQuestion.hint && (
                <div className="text-xs text-slate-400 italic">
                  💡 {isRu ? 'Подсказка:' : 'Hint:'} {currentQuestion.hint}
                </div>
              )}

              {/* Flag Issue button */}
              <button
                onClick={() => handleToggleWordIssueInGame(currentQuestion.id)}
                className={`absolute top-4 right-4 p-2 rounded-xl transition flex items-center gap-1 text-xs font-bold ${
                  currentQuestion.hasIssue
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700'
                }`}
                title={isRu ? 'Отметить как имеющее проблему' : 'Flag word issue'}
              >
                <Flag className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">{currentQuestion.hasIssue ? (isRu ? 'Проблема' : 'Has Issue') : (isRu ? 'Отметить' : 'Flag')}</span>
              </button>
            </div>

            {/* 4 Choices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((opt, idx) => {
                const correctAnswer = testDirection === 'reverse' ? currentQuestion.prompt : currentQuestion.answer;
                const isSelected = selectedOption === opt;
                const isCorrect = opt === correctAnswer;

                let btnStyle = 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-indigo-500 hover:bg-slate-800';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600/90 border-emerald-400 text-white shadow-lg shadow-emerald-500/30 scale-102';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-600/90 border-rose-400 text-white scale-98';
                  } else {
                    btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-600 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={isAnswered}
                    className={`p-5 rounded-2xl border-2 font-bold text-base sm:text-lg transition-all duration-200 text-center flex items-center justify-between shadow-md ${btnStyle}`}
                  >
                    <span className="flex-1 text-center">{opt}</span>
                    {isAnswered && isCorrect && <Check className="w-6 h-6 text-white flex-shrink-0 ml-2" />}
                    {isAnswered && isSelected && !isCorrect && <X className="w-6 h-6 text-white flex-shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Practice Mode */}
        {gameState === 'practice' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-slate-800/90 border border-indigo-500/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider mb-4 border-b border-slate-700/80 pb-2">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-amber-400" /> {isRu ? 'Тренировка без времени' : 'Untimed Practice'}</span>
                <span>{practiceIndex < practiceList.length ? `${isRu ? 'Слово' : 'Word'} ${practiceIndex + 1} ${isRu ? 'из' : 'of'} ${practiceList.length}` : (isRu ? 'Завершено!' : 'Completed!')}</span>
              </div>

              {practiceIndex < practiceList.length ? (
                <div>
                  <div className="text-sm text-slate-400 mb-1">{isRu ? 'Введите правильный ответ:' : 'Fill in the correct answer:'}</div>
                  <div className="text-2xl font-black text-white mb-3 text-glow">
                    {testDirection === 'reverse' ? practiceList[practiceIndex].answer : practiceList[practiceIndex].prompt}
                  </div>

                  <form onSubmit={handlePracticeSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={practiceInput}
                      onChange={(e) => setPracticeInput(e.target.value)}
                      placeholder={isRu ? 'Введите ответ здесь...' : 'Type your answer here...'}
                      className="w-full bg-slate-900 border-2 border-indigo-500 text-white text-lg px-4 py-3 rounded-xl focus:outline-none font-medium text-center"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                    >
                      {isRu ? 'Проверить ответ' : 'Check Answer'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {practiceFeedback && (
                    <div className={`mt-4 p-3 rounded-xl font-bold text-sm ${
                      practiceFeedback.isCorrect ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                    }`}>
                      {practiceFeedback.msg}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce-short" />
                  <h3 className="text-2xl font-black text-white">{isRu ? 'Все слова выучены! 🎉' : 'All Words Mastered! 🎉'}</h3>
                  <button
                    onClick={startGame}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                  >
                    {isRu ? 'Сыграть снова 🚀' : 'Play Again 🚀'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-2 animate-bounce-short" />
            <h2 className="text-3xl font-black text-red-400 mb-1">{isRu ? 'Викторина окончена!' : 'Quiz Completed!'}</h2>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 w-full max-w-sm space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">{isRu ? 'Финальный счёт:' : 'Final Score:'}</span>
                <span className="text-amber-400 font-bold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRu ? 'Правильных ответов:' : 'Correct Answers:'}</span>
                <span className="text-indigo-300 font-bold">{wordsCleared}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRu ? 'Макс. серия:' : 'Max Streak:'}</span>
                <span className="text-emerald-400 font-bold">{maxStreak}x</span>
              </div>
            </div>

            {/* Export buttons */}
            <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl w-full max-w-sm space-y-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isRu ? 'Экспорт результатов (JSON):' : 'Export Results (JSON):'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => exportTopicAsJson(topicStats, 'need_practice')}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 py-2 px-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-1"
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>{isRu ? 'Повторить' : 'Need Practice'}</span>
                </button>
                <button
                  onClick={() => exportTopicAsJson(topicStats, 'known')}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 py-2 px-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-1"
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>{isRu ? 'Выученные' : 'Mastered'}</span>
                </button>
              </div>
            </div>

            {missedWords.length > 0 && (
              <button
                onClick={startPracticeMode}
                className="w-full max-w-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <BookOpen className="w-4 h-4" /> {isRu ? `Учить пропущенные слова (${missedWords.length}) без времени` : `Practice Missed Words (${missedWords.length}) Untimed`}
              </button>
            )}

            <div className="flex gap-3">
              <button
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" /> {isRu ? 'Сыграть снова' : 'Play Again'}
              </button>
              <button
                onClick={onBackToTopics}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-5 py-2.5 rounded-xl text-sm transition"
              >
                {isRu ? 'Сменить тему' : 'Change Topic'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
