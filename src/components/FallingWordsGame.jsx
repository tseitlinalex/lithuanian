import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Zap, Snowflake, Bomb, Pause, Play, RotateCcw, Volume2, VolumeX, ShieldAlert, Award, Sparkles, BookOpen, CheckCircle2, ArrowRight, Thermometer, Keyboard, Smartphone, Delete, Info } from 'lucide-react';
import { checkAnswerMatch, normalizeText } from '../utils/textNormalizer';
import { soundFx } from '../utils/audio';
import ParticleCanvas, { createBurstParticles } from './ParticleCanvas';

const DIFFICULTY_SETTINGS = {
  easy: {
    mode: 'static',
    maxCapacity: 5,
    spawnInterval: 3200,
    label_en: 'Level 1: Thermometer (L1)',
    label_ru: 'Уровень 1: Термометр (L1)',
    desc_en: 'Words stay on screen. Keep thermometer cool!',
    desc_ru: 'Слова не падают. Не дайте термометру перегреться!'
  },
  medium: {
    mode: 'falling',
    speedMultiplier: 0.35,
    spawnInterval: 3200,
    maxWordsOnScreen: 4,
    label_en: 'Level 2: Falling Rain (L2)',
    label_ru: 'Уровень 2: Плавный дождь (L2)',
    desc_en: 'Words fall gently down the screen.',
    desc_ru: 'Слова плавно падают вниз.'
  },
  hard: {
    mode: 'bubbles',
    speedMultiplier: 1.0,
    spawnInterval: 2200,
    maxWordsOnScreen: 5,
    label_en: 'Level 3: Bubble Burst (L3)',
    label_ru: 'Уровень 3: Пузыри (L3)',
    desc_en: 'Words float & bounce in colorful bubbles!',
    desc_ru: 'Слова летают и отскакивают в пузырях!'
  }
};

// On-screen virtual keyboard keys
const KEYBOARD_ROWS = [
  ['ą', 'č', 'ę', 'ė', 'į', 'š', 'ų', 'ū', 'ž'],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'],
  ['m', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'z', 'y']
];

export default function FallingWordsGame({ topic, difficulty = 'easy', onBackToTopics, soundMuted, onToggleSound, lang = 'ru' }) {
  const isRu = lang === 'ru';
  const config = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.easy;

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

  // Mobile / Virtual Keyboard Toggle
  const [useVirtualKeyboard, setUseVirtualKeyboard] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  });

  // Practice Mode State
  const [practiceList, setPracticeList] = useState([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState(null);

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

  useEffect(() => { activeWordsRef.current = activeWords; }, [activeWords]);
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { isFrozenRef.current = isFrozen; }, [isFrozen]);

  // High score tracking
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`highscore_${topic.id}_${difficulty}`);
    if (saved) setHighScore(parseInt(saved, 10));
  }, [topic.id, difficulty]);

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

  // Start Practice Mode
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
    const isMatch = checkAnswerMatch(practiceInput, [currentWord.answer, ...(currentWord.acceptableAnswers || [])]);

    if (isMatch) {
      soundFx.playCorrect(2);
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
      setPracticeFeedback({
        isCorrect: false,
        msg: isRu ? `Неправильно. (Ответ: ${currentWord.answer})` : `Incorrect. (Answer: ${currentWord.answer})`
      });
    }
  };

  // Helper function to find non-overlapping coordinates for Level 1
  const findNonOverlappingPosition = (existingCards, cardWidth, cardHeight, gameWidth, gameHeight) => {
    const padding = 15;
    const minY = 20;
    const maxY = Math.max(minY + 10, gameHeight - cardHeight - 60);
    const minX = 15;
    const maxX = Math.max(minX + 10, gameWidth - cardWidth - 15);

    for (let attempts = 0; attempts < 30; attempts++) {
      const candidateX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const candidateY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      const overlaps = existingCards.some(card => {
        return (
          candidateX < card.x + cardWidth + padding &&
          candidateX + cardWidth + padding > card.x &&
          candidateY < card.y + cardHeight + padding &&
          candidateY + cardHeight + padding > card.y
        );
      });

      if (!overlaps) {
        return { x: candidateX, y: candidateY };
      }
    }

    return {
      x: Math.floor(Math.random() * (maxX - minX + 1)) + minX,
      y: Math.floor(Math.random() * (maxY - minY + 1)) + minY
    };
  };

  // Spawn Next Word
  const spawnWord = () => {
    if (gameStateRef.current !== 'playing') return;

    const maxCapacity = config.mode === 'static' ? config.maxCapacity : config.maxWordsOnScreen;

    if (activeWordsRef.current.length >= maxCapacity) {
      if (config.mode === 'static') {
        const overflowWord = activeWordsRef.current[0];
        if (overflowWord) {
          soundFx.playWordHitBottom();
          setMissedWords(prev => {
            if (!prev.some(m => m.prompt === overflowWord.prompt)) {
              return [...prev, {
                prompt: overflowWord.prompt,
                answer: overflowWord.answer,
                hint: overflowWord.hint,
                rule: overflowWord.rule,
                rule_ru: overflowWord.rule_ru
              }];
            }
            return prev;
          });
          setLives(l => {
            const nl = l - 1;
            if (nl <= 0) endGame(false);
            return Math.max(0, nl);
          });
          setShakeScreen(true);
          setTimeout(() => setShakeScreen(false), 400);
          setActiveWords(prev => prev.slice(1));
        }
      }
      return;
    }

    if (queueRef.current.length === 0) {
      queueRef.current = [...topic.items].sort(() => Math.random() - 0.5);
    }

    const item = queueRef.current.shift();
    if (!item) return;

    const gameWidth = gameAreaRef.current ? gameAreaRef.current.clientWidth : 600;
    const gameHeight = gameAreaRef.current ? gameAreaRef.current.clientHeight : 450;
    const cardWidth = 240;
    const cardHeight = 80;

    let posX, posY;

    if (config.mode === 'static') {
      const pos = findNonOverlappingPosition(activeWordsRef.current, cardWidth, cardHeight, gameWidth, gameHeight);
      posX = pos.x;
      posY = pos.y;
    } else if (config.mode === 'bubbles') {
      const minX = 20;
      const maxX = Math.max(minX + 20, gameWidth - cardWidth - 20);
      posX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      posY = Math.floor(Math.random() * (gameHeight / 2)) + 30;
    } else {
      const minX = 10;
      const maxX = Math.max(minX + 20, gameWidth - cardWidth - 10);
      posX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      posY = -60;
    }

    const wordPrompt = isRu && item.prompt_ru ? item.prompt_ru : item.prompt;

    const vxDir = Math.random() < 0.5 ? -1 : 1;
    const vyDir = Math.random() < 0.5 ? -1 : 1;
    const bubbleVx = (Math.random() * 1.5 + 1.2) * vxDir;
    const bubbleVy = (Math.random() * 1.5 + 1.2) * vyDir;

    const newWord = {
      id: `${item.id}-${Date.now()}-${Math.random()}`,
      prompt: wordPrompt,
      answer: item.answer,
      acceptableAnswers: item.acceptableAnswers || [item.answer],
      hint: item.hint || '',
      rule: item.rule || '',
      rule_ru: item.rule_ru || '',
      x: posX,
      y: posY,
      vx: config.mode === 'bubbles' ? bubbleVx : 0,
      vy: config.mode === 'bubbles' ? bubbleVy : 0,
      speed: config.mode === 'falling' ? (Math.random() * 0.3 + 0.6) * config.speedMultiplier : 0,
      color: ['#38bdf8', '#a855f7', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)]
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
        const gameWidth = gameAreaRef.current ? gameAreaRef.current.clientWidth : 600;
        const gameHeight = gameAreaRef.current ? gameAreaRef.current.clientHeight : 450;

        setActiveWords(prevWords => {
          if (config.mode === 'static') return prevWords;

          const nextWords = [];
          let lostLives = 0;

          for (const word of prevWords) {
            if (config.mode === 'falling') {
              const nextY = word.y + word.speed * (deltaTime * 0.06);

              if (nextY >= gameHeight - 90) {
                lostLives++;
                soundFx.playWordHitBottom();
                setMissedWords(prevMissed => {
                  if (!prevMissed.some(m => m.prompt === word.prompt)) {
                    return [...prevMissed, {
                      prompt: word.prompt,
                      answer: word.answer,
                      hint: word.hint,
                      rule: word.rule,
                      rule_ru: word.rule_ru
                    }];
                  }
                  return prevMissed;
                });
                setParticles(createBurstParticles(word.x + 100, gameHeight - 40, 15, '#ef4444'));
              } else {
                nextWords.push({ ...word, y: nextY });
              }
            } else if (config.mode === 'bubbles') {
              let nextX = word.x + word.vx * (deltaTime * 0.06);
              let nextY = word.y + word.vy * (deltaTime * 0.06);
              let nextVx = word.vx;
              let nextVy = word.vy;

              const minBoundsX = 10;
              const maxBoundsX = Math.max(minBoundsX + 20, gameWidth - 250);
              const minBoundsY = 10;
              const maxBoundsY = Math.max(minBoundsY + 20, gameHeight - 80);

              if (nextX <= minBoundsX || nextX >= maxBoundsX) nextVx = -nextVx;
              if (nextY <= minBoundsY || nextY >= maxBoundsY) nextVy = -nextVy;

              nextX = Math.max(minBoundsX, Math.min(nextX, maxBoundsX));
              nextY = Math.max(minBoundsY, Math.min(nextY, maxBoundsY));

              nextWords.push({ ...word, x: nextX, y: nextY, vx: nextVx, vy: nextVy });
            }
          }

          if (lostLives > 0) {
            setLives(l => {
              const newLives = l - lostLives;
              if (newLives <= 0) endGame(false);
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
  }, [gameState, config.mode]);

  // Spawning Interval Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    spawnTimerRef.current = setInterval(() => {
      spawnWord();
    }, config.spawnInterval);

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [gameState, difficulty, score]);

  // Check typed input against active words
  const processAnswerCheck = (value) => {
    if (gameState !== 'playing' || !value.trim()) return;

    const matchedIndex = activeWords.findIndex(word =>
      checkAnswerMatch(value, word.acceptableAnswers)
    );

    if (matchedIndex !== -1) {
      const matchedWord = activeWords[matchedIndex];

      const basePoints = 100;
      const earnedPoints = basePoints * multiplier;

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

      setParticles(createBurstParticles(matchedWord.x + 120, matchedWord.y + 30, 30, matchedWord.color || '#10b981'));

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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    processAnswerCheck(value);
  };

  // Virtual Keyboard Key Press Handler
  const handleVirtualKeyPress = (key) => {
    if (gameState === 'practice') {
      if (key === 'BACKSPACE') {
        setPracticeInput(prev => prev.slice(0, -1));
      } else if (key === 'SPACE') {
        setPracticeInput(prev => prev + ' ');
      } else {
        setPracticeInput(prev => prev + key);
      }
      return;
    }

    if (gameState !== 'playing') return;

    if (key === 'BACKSPACE') {
      setInputValue(prev => prev.slice(0, -1));
    } else if (key === 'SPACE') {
      const nextValue = inputValue + ' ';
      setInputValue(nextValue);
      processAnswerCheck(nextValue);
    } else {
      const nextValue = inputValue + key;
      setInputValue(nextValue);
      processAnswerCheck(nextValue);
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

  const topicTitle = isRu && topic.title_ru ? topic.title_ru : topic.title;
  const topicInstructions = isRu && topic.instructions_ru ? topic.instructions_ru : topic.instructions;
  const diffLabel = isRu ? config.label_ru : config.label_en;

  const pressureRatio = Math.min(1, activeWords.length / (config.maxCapacity || 5));
  const thermoColor = pressureRatio > 0.8 ? 'bg-red-500' : pressureRatio > 0.5 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className={`relative flex flex-col min-h-[calc(100vh-80px)] max-w-5xl mx-auto p-2 sm:p-4 ${shakeScreen ? 'animate-shake' : ''}`}>
      {/* Top Game Bar HUD */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-3 sm:p-4 mb-3 flex flex-wrap items-center justify-between gap-3 shadow-xl z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToTopics}
            className="text-xs sm:text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg transition font-medium"
          >
            ← {isRu ? 'Темы' : 'Topics'}
          </button>
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{topicTitle}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {diffLabel}
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {config.mode === 'static' && (
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700" title="Thermometer Pressure">
              <Thermometer className={`w-5 h-5 ${pressureRatio > 0.8 ? 'text-red-500 animate-pulse' : 'text-amber-400'}`} />
              <div className="w-20 bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-300 ${thermoColor}`}
                  style={{ width: `${pressureRatio * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold font-mono text-slate-300">{activeWords.length}/{config.maxCapacity}</span>
            </div>
          )}

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

          {multiplier > 1 && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-black px-2.5 py-1 rounded-xl text-xs sm:text-sm animate-bounce-short shadow-lg">
              {multiplier}x MULTI!
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUseVirtualKeyboard(!useVirtualKeyboard)}
              className={`p-2 rounded-lg transition flex items-center gap-1 text-xs font-bold ${
                useVirtualKeyboard ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-slate-400 hover:text-white'
              }`}
              title={isRu ? 'Переключить виртуальную клавиатуру' : 'Toggle Built-in Virtual Keyboard'}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">{useVirtualKeyboard ? 'Virtual KB' : 'Native KB'}</span>
            </button>
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
        className="relative flex-1 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[420px]"
      >
        <ParticleCanvas particles={particles} floatingTexts={floatingTexts} isFrozen={isFrozen} />

        {config.mode === 'falling' && (
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-red-600/30 to-transparent border-t border-red-500/30 pointer-events-none flex items-end justify-center pb-2">
            <span className="text-[10px] tracking-widest text-red-400/80 uppercase font-semibold">
              ⚠️ {isRu ? 'Опасная зона' : 'Danger Zone'} ⚠️
            </span>
          </div>
        )}

        {/* Active Cards Rendering */}
        {gameState === 'playing' &&
          activeWords.map(word => {
            if (config.mode === 'bubbles') {
              return (
                <div
                  key={word.id}
                  style={{
                    transform: `translate3d(${word.x}px, ${word.y}px, 0)`,
                    borderColor: word.color || '#38bdf8'
                  }}
                  className="absolute left-0 top-0 bg-slate-900/95 border-2 rounded-3xl px-4 py-3 shadow-2xl backdrop-blur-md z-10 flex flex-col items-center justify-center animate-pulse min-w-[200px]"
                >
                  <div className="text-sm sm:text-base font-black text-white text-center">
                    {word.prompt}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={word.id}
                style={{
                  transform: `translate3d(${word.x}px, ${word.y}px, 0)`,
                  transition: isFrozen ? 'none' : 'transform 0.05s linear'
                }}
                className="absolute left-0 top-0 w-60 sm:w-64 bg-slate-800/95 border-2 border-indigo-500/60 rounded-xl p-3 shadow-xl backdrop-blur-md transition-shadow hover:shadow-indigo-500/20 z-10"
              >
                <div className="text-sm font-semibold text-indigo-200 mb-1 leading-snug">
                  {word.prompt}
                </div>
                {difficulty === 'easy' && word.hint && (
                  <div className="text-[11px] text-slate-400 italic">
                    {isRu ? 'Подсказка:' : 'Hint:'} {word.hint}
                  </div>
                )}
              </div>
            );
          })}

        {gameState === 'ready' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <Sparkles className="w-16 h-16 text-indigo-400 mb-4 animate-pulse" />
            <h2 className="text-3xl font-extrabold text-white mb-2">{topicTitle}</h2>
            <p className="text-slate-300 max-w-md mb-2">{topicInstructions}</p>
            <p className="text-amber-300 text-xs font-semibold mb-6">{isRu ? config.desc_ru : config.desc_en}</p>

            <button
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isRu ? 'Начать игру! 🚀' : 'Start Game! 🚀'}
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
            <h2 className="text-3xl font-bold text-white mb-6">{isRu ? 'Пауза' : 'Game Paused'}</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setGameState('playing')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> {isRu ? 'Продолжить' : 'Resume'}
              </button>
              <button
                onClick={startGame}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2.5 rounded-xl transition flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> {isRu ? 'Заново' : 'Restart'}
              </button>
            </div>
          </div>
        )}

        {/* Untimed Missed Words Practice Mode */}
        {gameState === 'practice' && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="bg-slate-800/90 border border-indigo-500/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider mb-4 border-b border-slate-700/80 pb-2">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-amber-400" /> {isRu ? 'Тренировка без времени' : 'Untimed Practice'}</span>
                <span>{practiceIndex < practiceList.length ? `${isRu ? 'Слово' : 'Word'} ${practiceIndex + 1} ${isRu ? 'из' : 'of'} ${practiceList.length}` : (isRu ? 'Завершено!' : 'Completed!')}</span>
              </div>

              {practiceIndex < practiceList.length ? (
                <div>
                  <div className="text-sm text-slate-400 mb-1">{isRu ? 'Введите правильный ответ на литовском:' : 'Fill in the correct Lithuanian answer:'}</div>
                  <div className="text-2xl font-black text-white mb-3 text-glow">
                    {practiceList[practiceIndex].prompt}
                  </div>
                  {practiceList[practiceIndex].hint && (
                    <div className="text-xs text-slate-400 italic mb-2">
                      {isRu ? 'Подсказка:' : 'Hint:'} {practiceList[practiceIndex].hint}
                    </div>
                  )}

                  {(practiceList[practiceIndex].rule_ru || practiceList[practiceIndex].rule) && (
                    <div className="bg-indigo-950/70 border border-indigo-500/40 p-2.5 rounded-xl text-xs text-indigo-200 mb-4 text-left flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">{isRu ? 'Грамматическое правило:' : 'Grammar Rule:'}</span>{' '}
                        {isRu ? practiceList[practiceIndex].rule_ru : (practiceList[practiceIndex].rule || practiceList[practiceIndex].rule_ru)}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handlePracticeSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={practiceInput}
                      onChange={(e) => setPracticeInput(e.target.value)}
                      readOnly={useVirtualKeyboard}
                      placeholder={isRu ? 'Введите ответ здесь...' : 'Type your answer here...'}
                      className="w-full bg-slate-900 border-2 border-indigo-500 text-white text-lg px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium text-center"
                      autoFocus={!useVirtualKeyboard}
                    />
                    {!useVirtualKeyboard && (
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                      >
                        {isRu ? 'Проверить ответ' : 'Check Answer'} <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
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
                  <h3 className="text-2xl font-black text-white">{isRu ? 'Все пропущенные слова выучены! 🎉' : 'All Missed Words Mastered! 🎉'}</h3>
                  <button
                    onClick={startGame}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                  >
                    {isRu ? 'Сыграть в основную игру 🚀' : 'Play Main Game Again 🚀'}
                  </button>
                </div>
              )}

              <button
                onClick={() => setGameState('gameover')}
                className="mt-4 text-xs text-slate-400 hover:text-slate-200 underline"
              >
                ← {isRu ? 'Назад к экрану результатов' : 'Back to Game Over Screen'}
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-2 animate-bounce-short" />
            <h2 className="text-3xl font-black text-red-400 mb-1">{isRu ? 'Игра окончена!' : 'Game Over!'}</h2>
            <p className="text-slate-400 mb-6">{isRu ? 'Не переживайте, повторение — мать учения!' : "Don't worry, practice makes perfect!"}</p>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 w-full max-w-sm mb-6 space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">{isRu ? 'Финальный счёт:' : 'Final Score:'}</span>
                <span className="text-amber-400 font-bold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRu ? 'Угадано слов:' : 'Words Cleared:'}</span>
                <span className="text-indigo-300 font-bold">{wordsCleared}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRu ? 'Макс. серия:' : 'Max Streak:'}</span>
                <span className="text-emerald-400 font-bold">{maxStreak}x</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-2">
                <span className="text-slate-400">{isRu ? 'Личный рекорд:' : 'Personal Best:'}</span>
                <span className="text-amber-300 font-bold">{highScore}</span>
              </div>

              {missedWords.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-700 text-left font-sans">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>📖 {isRu ? 'Пропущенные слова' : 'Missed Words'} ({missedWords.length})</span>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1 mb-3">
                    {missedWords.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs">
                        <div className="text-slate-300 font-medium">{item.prompt}</div>
                        <div className="text-emerald-400 font-bold mt-0.5">{isRu ? 'Ответ:' : 'Answer:'} {item.answer}</div>
                        {(item.rule_ru || item.rule) && (
                          <div className="text-[11px] text-indigo-300 mt-1 bg-indigo-950/60 p-1.5 rounded border border-indigo-800/40">
                            <span className="font-bold text-amber-300">💡 {isRu ? 'Правило:' : 'Rule:'}</span>{' '}
                            {isRu ? item.rule_ru : (item.rule || item.rule_ru)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={startPracticeMode}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <BookOpen className="w-4 h-4" /> {isRu ? 'Учить пропущенные слова (без времени)' : 'Practice Missed Words (Untimed)'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={startGame}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <RotateCcw className="w-5 h-5" /> {isRu ? 'Попробовать снова' : 'Try Again'}
              </button>
              <button
                onClick={onBackToTopics}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-6 py-3 rounded-xl transition"
              >
                {isRu ? 'Сменить тему' : 'Change Topic'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Input Box & Power-ups */}
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={gameState === 'practice' ? practiceInput : inputValue}
              onChange={handleInputChange}
              readOnly={useVirtualKeyboard}
              disabled={gameState !== 'playing' && gameState !== 'practice'}
              placeholder={gameState === 'playing' ? (isRu ? 'Введите ответ...' : 'Type answer...') : (isRu ? 'Пауза' : 'Game paused')}
              className="w-full bg-slate-800 border-2 border-indigo-500/80 text-white placeholder-slate-500 text-base sm:text-lg px-4 py-2.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition shadow-inner font-medium text-center sm:text-left"
              autoFocus={!useVirtualKeyboard}
            />
            {streak > 1 && (
              <div className="absolute right-3 top-2.5 text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                🔥 {streak} {isRu ? 'Серия' : 'Streak'}
              </div>
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-stretch">
            <button
              onClick={activateFreeze}
              disabled={gameState !== 'playing' || freezeCharges <= 0 || isFrozen}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm border transition shadow-md ${
                freezeCharges > 0 && !isFrozen && gameState === 'playing'
                  ? 'bg-cyan-600/90 hover:bg-cyan-500 border-cyan-400 text-white active:scale-95'
                  : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Snowflake className="w-4 h-4" />
              <span>{isRu ? 'Заморозка' : 'Freeze'} ({freezeCharges})</span>
            </button>

            <button
              onClick={activateBomb}
              disabled={gameState !== 'playing' || bombCharges <= 0 || activeWords.length === 0}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm border transition shadow-md ${
                bombCharges > 0 && activeWords.length > 0 && gameState === 'playing'
                  ? 'bg-rose-600/90 hover:bg-rose-500 border-rose-400 text-white active:scale-95'
                  : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Bomb className="w-4 h-4" />
              <span>{isRu ? 'Бомба' : 'Bomb'} ({bombCharges})</span>
            </button>
          </div>
        </div>

        {/* Built-in On-Screen Virtual Keyboard */}
        {useVirtualKeyboard && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-2.5 shadow-2xl space-y-1.5 backdrop-blur">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map(key => (
                  <button
                    key={key}
                    onClick={() => handleVirtualKeyPress(key)}
                    className="flex-1 max-w-[38px] h-10 sm:h-11 bg-slate-700 hover:bg-indigo-600 text-white font-bold text-sm sm:text-base rounded-lg border border-slate-600 shadow active:scale-95 transition"
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex justify-center gap-2 pt-1">
              <button
                onClick={() => handleVirtualKeyPress('SPACE')}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 rounded-lg border border-slate-600 text-xs uppercase tracking-wider"
              >
                {isRu ? 'Пробел (Space)' : 'Space'}
              </button>
              <button
                onClick={() => handleVirtualKeyPress('BACKSPACE')}
                className="px-4 bg-rose-600/80 hover:bg-rose-500 text-white font-bold py-2 rounded-lg border border-rose-500 text-xs flex items-center gap-1"
              >
                <Delete className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
