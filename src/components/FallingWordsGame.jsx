import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Zap, Snowflake, Bomb, Pause, Play, RotateCcw, Volume2, VolumeX, ShieldAlert, Award, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { checkAnswerMatch, normalizeText } from '../utils/textNormalizer';
import { soundFx } from '../utils/audio';
import ParticleCanvas, { createBurstParticles } from './ParticleCanvas';

const DIFFICULTY_SETTINGS = {
  easy: { speedMultiplier: 0.35, spawnInterval: 4500, maxWordsOnScreen: 3, label: 'Easy (Lengva)' },
  medium: { speedMultiplier: 1.0, spawnInterval: 2400, maxWordsOnScreen: 4, label: 'Medium (Vidutinė)' },
  hard: { speedMultiplier: 1.4, spawnInterval: 1700, maxWordsOnScreen: 5, label: 'Hard (Sunkus)' }
};

export default function FallingWordsGame({ topic, difficulty = 'medium', onBackToTopics, soundMuted, onToggleSound }) {
  // Game State
  const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'paused', 'gameover', 'victory', 'practice'
  const [activeWords, setActiveWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [wordsCleared, setWordsCleared] = useState(0);
  const [missedWords, setMissedWords] = useState([]);

  // Practice Mode State (Untimed flashcard practice for missed words)
  const [practiceList, setPracticeList] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState(null); // { isCorrect: boolean, msg: string }
  const [practiceMasteredCount, setPracticeMasteredCount] = useState(0);

  // Power-ups
  const [freezeCharges, setFreezeCharges] = useState(2);
  const [isFrozen, setIsFrozen] = useState(false);
  const [bombCharges, setBombCharges] = useState(1);

  // Visual FX State
  const [particles, setParticles] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [shakeScreen, setShakeScreen] = useState(false);

  // References for Animation & Game Loop
  const gameAreaRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const queueRef = useRef([]);
  const activeWordsRef = useRef([]);
  const gameStateRef = useRef(gameState);
  const isFrozenRef = useRef(isFrozen);

  // Sync refs with state
  useEffect(() => { activeWordsRef.current = activeWords; }, [activeWords]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { isFrozenRef.current = isFrozen; }, [isFrozen]);

  // High score tracking
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`highscore_${topic.id}_${difficulty}`);
    if (saved) setHighScore(parseInt(saved, 10));
  }, [topic.id, difficulty]);

  // Reset lastTimeRef when game starts or unpauses to prevent deltaTime jump
  useEffect(() => {
    if (gameState === 'playing') {
      lastTimeRef.current = performance.now();
    }
  }, [gameState]);

  // Start / Reset Game
  const startGame = () => {
    const items = [...topic.items].sort(() => Math.random() - 0.5);
    queueRef.current = items;
    activeWordsRef.current = [];
    setActiveWords([]);
    setInputValue('');
    setScore(0);
    setLives(5);
    setStreak(0);
    setMaxStreak(0);
    setMultiplier(1);
    setWordsCleared(0);
    setMissedWords([]);
    setFreezeCharges(2);
    setBombCharges(1);
    setIsFrozen(false);
    setGameState('playing');
    lastTimeRef.current = performance.now();
  };

  // Start Practice Mode for Missed Words
  const startPracticeMode = () => {
    if (missedWords.length === 0) return;
    setPracticeList([...missedWords]);
    setPracticeIndex(0);
    setPracticeInput('');
    setPracticeFeedback(null);
    setPracticeMasteredCount(0);
    setGameState('practice');
  };

  const handlePracticeSubmit = (e) => {
    e.preventDefault();
    if (!practiceInput.trim()) return;

    const currentWord = practiceList[practiceIndex];
    const isMatch = checkAnswerMatch(practiceInput, [currentWord.answer, ...(currentWord.acceptableAnswers || [])]);

    if (isMatch) {
      soundFx.playCorrect(2);
      setPracticeFeedback({ isCorrect: true, msg: 'Puikiai! (Perfect!)' });

      setTimeout(() => {
        setPracticeFeedback(null);
        setPracticeInput('');
        const nextIndex = practiceIndex + 1;
        setPracticeMasteredCount(c => c + 1);

        if (nextIndex < practiceList.length) {
          setPracticeIndex(nextIndex);
        } else {
          // Mastered all missed words!
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
      }, 1000);
    } else {
      soundFx.playWordHitBottom();
      setPracticeFeedback({
        isCorrect: false,
        msg: `Neteisingai. (Correct answer: ${currentWord.answer})`
      });
    }
  };

  // Spawn Next Word
  const spawnWord = () => {
    if (gameStateRef.current !== 'playing') return;
    const config = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;

    if (activeWordsRef.current.length >= config.maxWordsOnScreen) return;

    if (queueRef.current.length === 0) {
      queueRef.current = [...topic.items].sort(() => Math.random() - 0.5);
    }

    const item = queueRef.current.shift();
    if (!item) return;

    const gameWidth = gameAreaRef.current ? gameAreaRef.current.clientWidth : 600;
    const cardWidth = 260;
    const minX = 10;
    const maxX = Math.max(minX + 20, gameWidth - cardWidth - 10);
    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

    const newWord = {
      id: `${item.id}-${Date.now()}-${Math.random()}`,
      prompt: item.prompt,
      answer: item.answer,
      acceptableAnswers: item.acceptableAnswers || [item.answer],
      hint: item.hint || '',
      x: randomX,
      y: -60,
      speed: (Math.random() * 0.4 + 0.8) * config.speedMultiplier * (1 + score / 2000)
    };

    setActiveWords(prev => [...prev, newWord]);
  };

  // Main Game Animation Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const updateLoop = (now) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const rawDeltaTime = now - lastTimeRef.current;
      const deltaTime = Math.min(rawDeltaTime, 64);
      lastTimeRef.current = now;

      if (!isFrozenRef.current) {
        const gameHeight = gameAreaRef.current ? gameAreaRef.current.clientHeight : 500;

        setActiveWords(prevWords => {
          const nextWords = [];
          let lostLives = 0;

          for (const word of prevWords) {
            const nextY = word.y + word.speed * (deltaTime * 0.06);

            if (nextY >= gameHeight - 90) {
              lostLives++;
              soundFx.playWordHitBottom();
              setMissedWords(prevMissed => {
                if (!prevMissed.some(m => m.prompt === word.prompt)) {
                  return [...prevMissed, { prompt: word.prompt, answer: word.answer, hint: word.hint }];
                }
                return prevMissed;
              });
              setParticles(createBurstParticles(word.x + 100, gameHeight - 40, 15, '#ef4444'));
            } else {
              nextWords.push({ ...word, y: nextY });
            }
          }

          if (lostLives > 0) {
            setLives(l => {
              const newLives = l - lostLives;
              if (newLives <= 0) {
                endGame(false);
              }
              return Math.max(0, newLives);
            });
            setStreak(0);
            setMultiplier(1);
            setShakeScreen(true);
            setTimeout(() => setShakeScreen(false), 400);
          }

          return nextWords;
        });
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  // Spawning Interval Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const config = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;

    spawnTimerRef.current = setInterval(() => {
      spawnWord();
    }, config.spawnInterval);

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [gameState, difficulty, score]);

  // Check typed input against active words
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (gameState !== 'playing' || !value.trim()) return;

    const matchedIndex = activeWords.findIndex(word =>
      checkAnswerMatch(value, word.acceptableAnswers)
    );

    if (matchedIndex !== -1) {
      const matchedWord = activeWords[matchedIndex];

      const basePoints = 100;
      const speedBonus = Math.round(Math.max(0, (500 - matchedWord.y) / 5));
      const earnedPoints = (basePoints + speedBonus) * multiplier;

      setScore(s => {
        const newScore = s + earnedPoints;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem(`highscore_${topic.id}_${difficulty}`, newScore.toString());
        }
        return newScore;
      });

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

      setParticles(createBurstParticles(matchedWord.x + 120, matchedWord.y + 30, 30, '#10b981'));

      setFloatingTexts(t => [
        ...t,
        {
          id: Date.now(),
          text: `+${earnedPoints}${newMult > 1 ? ` (${newMult}x)` : ''}`,
          x: matchedWord.x + 120,
          y: matchedWord.y + 20,
          life: 1.0,
          color: newMult > 2 ? '#f59e0b' : '#34d399'
        }
      ]);

      setActiveWords(prev => prev.filter((_, idx) => idx !== matchedIndex));
      setInputValue('');
    }
  };

  const activateFreeze = () => {
    if (freezeCharges <= 0 || isFrozen || gameState !== 'playing') return;
    setFreezeCharges(c => c - 1);
    setIsFrozen(true);
    soundFx.playFreezeSound();
    setTimeout(() => {
      setIsFrozen(false);
    }, 4500);
  };

  const activateBomb = () => {
    if (bombCharges <= 0 || activeWords.length === 0 || gameState !== 'playing') return;
    setBombCharges(c => c - 1);
    soundFx.playBombSound();

    const bombParticles = [];
    activeWords.forEach(word => {
      bombParticles.push(...createBurstParticles(word.x + 100, word.y + 30, 20, '#ef4444'));
    });
    setParticles(bombParticles);

    setScore(s => s + activeWords.length * 50);
    setActiveWords([]);
  };

  const endGame = (isVictory) => {
    setGameState(isVictory ? 'victory' : 'gameover');
    if (isVictory) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } else {
      soundFx.playGameOver();
    }
  };

  return (
    <div className={`relative flex flex-col h-[calc(100vh-80px)] max-w-5xl mx-auto p-2 sm:p-4 ${shakeScreen ? 'animate-shake' : ''}`}>
      {/* Top Game Bar HUD */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-3 sm:p-4 mb-3 flex flex-wrap items-center justify-between gap-3 shadow-xl z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToTopics}
            className="text-xs sm:text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition font-medium"
          >
            ← Topics
          </button>
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{topic.title}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {DIFFICULTY_SETTINGS[difficulty]?.label}
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
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
            <div className="text-xs text-slate-400 uppercase font-semibold">Score</div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono text-glow">
              {score}
            </div>
          </div>

          {multiplier > 1 && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-black px-2.5 py-1 rounded-xl text-xs sm:text-sm animate-bounce-short shadow-lg">
              {multiplier}x MULTI!
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
            {gameState === 'playing' && (
              <button
                onClick={() => setGameState('paused')}
                className="p-2 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition"
                title="Pause Game"
              >
                <Pause className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        ref={gameAreaRef}
        className="relative flex-1 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl min-h-[420px]"
      >
        <ParticleCanvas particles={particles} floatingTexts={floatingTexts} isFrozen={isFrozen} />

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-red-600/30 to-transparent border-t border-red-500/30 pointer-events-none flex items-end justify-center pb-2">
          <span className="text-[10px] tracking-widest text-red-400/80 uppercase font-semibold">
            ⚠️ Danger Zone ⚠️
          </span>
        </div>

        {gameState === 'playing' &&
          activeWords.map(word => (
            <div
              key={word.id}
              style={{
                transform: `translate3d(${word.x}px, ${word.y}px, 0)`,
                transition: isFrozen ? 'none' : 'transform 0.05s linear'
              }}
              className="absolute left-0 top-0 w-64 bg-slate-800/95 border-2 border-indigo-500/60 rounded-xl p-3 shadow-xl backdrop-blur-md transition-shadow hover:shadow-indigo-500/20 z-10"
            >
              <div className="text-sm font-semibold text-indigo-200 mb-1 leading-snug">
                {word.prompt}
              </div>
              {difficulty === 'easy' && word.hint && (
                <div className="text-[11px] text-slate-400 italic">
                  Hint: {word.hint}
                </div>
              )}
            </div>
          ))}

        {gameState === 'ready' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <Sparkles className="w-16 h-16 text-indigo-400 mb-4 animate-pulse" />
            <h2 className="text-3xl font-extrabold text-white mb-2">{topic.title}</h2>
            <p className="text-slate-300 max-w-md mb-6">{topic.instructions}</p>
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl mb-6 max-w-sm text-left text-xs text-slate-300 space-y-2">
              <p className="text-amber-400 font-bold">✨ Quick Gamification Tips:</p>
              <p>• Type the answer to vaporize falling words!</p>
              <p>• Special Lithuanian letters (š, ž, ą, ė...) are optional!</p>
              <p>• Build streaks for up to 5x score multipliers!</p>
              <p>• Use Power-ups: Freeze Time ❄️ & Bomb Blast 💣</p>
            </div>
            <button
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              Start Game! 🚀
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <h2 className="text-3xl font-bold text-white mb-6">Game Paused</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setGameState('playing')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> Resume
              </button>
              <button
                onClick={startGame}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Restart
              </button>
            </div>
          </div>
        )}

        {/* Untimed Missed Words Practice Mode */}
        {gameState === 'practice' && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="bg-slate-800/90 border border-indigo-500/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider mb-4 border-b border-slate-700/80 pb-2">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-amber-400" /> Untimed Practice</span>
                <span>{practiceIndex < practiceList.length ? `Word ${practiceIndex + 1} of ${practiceList.length}` : 'Completed!'}</span>
              </div>

              {practiceIndex < practiceList.length ? (
                <div>
                  <div className="text-sm text-slate-400 mb-1">Fill in the correct Lithuanian answer:</div>
                  <div className="text-2xl font-black text-white mb-3 text-glow">
                    {practiceList[practiceIndex].prompt}
                  </div>
                  {practiceList[practiceIndex].hint && (
                    <div className="text-xs text-slate-400 italic mb-4">
                      Hint: {practiceList[practiceIndex].hint}
                    </div>
                  )}

                  <form onSubmit={handlePracticeSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={practiceInput}
                      onChange={(e) => setPracticeInput(e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full bg-slate-900 border-2 border-indigo-500 text-white text-lg px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium text-center"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                    >
                      Check Answer <ArrowRight className="w-4 h-4" />
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
                  <h3 className="text-2xl font-black text-white">All Missed Words Mastered! 🎉</h3>
                  <p className="text-xs text-slate-300">You completed practice mode for all missed words.</p>
                  <button
                    onClick={startGame}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                  >
                    Play Main Game Again 🚀
                  </button>
                </div>
              )}

              <button
                onClick={() => setGameState('gameover')}
                className="mt-4 text-xs text-slate-400 hover:text-slate-200 underline"
              >
                ← Back to Game Over Screen
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-2 animate-bounce-short" />
            <h2 className="text-3xl font-black text-red-400 mb-1">Game Over!</h2>
            <p className="text-slate-400 mb-6">Don't worry, practice makes perfect!</p>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 w-full max-w-sm mb-6 space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Final Score:</span>
                <span className="text-amber-400 font-bold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Words Cleared:</span>
                <span className="text-indigo-300 font-bold">{wordsCleared}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Max Streak:</span>
                <span className="text-emerald-400 font-bold">{maxStreak}x</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2">
                <span className="text-slate-400">Personal Best:</span>
                <span className="text-amber-300 font-bold">{highScore}</span>
              </div>

              {missedWords.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-700 text-left font-sans">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>📖 Missed Words ({missedWords.length})</span>
                    <span className="text-[10px] text-slate-400">Review & Learn</span>
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 mb-3">
                    {missedWords.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-700/60 text-xs">
                        <div className="text-slate-300 font-medium">{item.prompt}</div>
                        <div className="text-emerald-400 font-bold mt-0.5">Answer: {item.answer}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={startPracticeMode}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <BookOpen className="w-4 h-4" /> Practice Missed Words (Untimed)
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <RotateCcw className="w-5 h-5" /> Try Again
              </button>
              <button
                onClick={onBackToTopics}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-6 py-3 rounded-xl transition"
              >
                Change Topic
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            disabled={gameState !== 'playing'}
            placeholder={gameState === 'playing' ? 'Type your answer here...' : 'Game paused'}
            className="w-full bg-slate-800 border-2 border-indigo-500/80 text-white placeholder-slate-500 text-base sm:text-lg px-4 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition shadow-inner font-medium"
            autoFocus
          />
          {streak > 1 && (
            <div className="absolute right-3 top-3 text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
              🔥 {streak} Streak
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-stretch">
          <button
            onClick={activateFreeze}
            disabled={gameState !== 'playing' || freezeCharges <= 0 || isFrozen}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-bold text-sm border transition shadow-md ${
              freezeCharges > 0 && !isFrozen && gameState === 'playing'
                ? 'bg-cyan-600/90 hover:bg-cyan-500 border-cyan-400 text-white active:scale-95'
                : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            title="Freeze falling words for 4.5 seconds"
          >
            <Snowflake className="w-4 h-4" />
            <span>Freeze ({freezeCharges})</span>
          </button>

          <button
            onClick={activateBomb}
            disabled={gameState !== 'playing' || bombCharges <= 0 || activeWords.length === 0}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-bold text-sm border transition shadow-md ${
              bombCharges > 0 && activeWords.length > 0 && gameState === 'playing'
                ? 'bg-rose-600/90 hover:bg-rose-500 border-rose-400 text-white active:scale-95'
                : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
            title="Vaporize all current words on screen"
          >
            <Bomb className="w-4 h-4" />
            <span>Bomb ({bombCharges})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
