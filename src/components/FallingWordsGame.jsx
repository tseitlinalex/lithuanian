import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Zap, Snowflake, Bomb, Pause, Play, RotateCcw, Volume2, VolumeX, ShieldAlert, Award, Sparkles } from 'lucide-react';
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
  const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'paused', 'gameover', 'victory'
  const [activeWords, setActiveWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [wordsCleared, setWordsCleared] = useState(0);

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

  // Start / Reset Game
  const startGame = () => {
    // Shuffle pool of topic items into queue
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
    setFreezeCharges(2);
    setBombCharges(1);
    setIsFrozen(false);
    setGameState('playing');
    lastTimeRef.current = performance.now();
  };

  // Spawn Next Word
  const spawnWord = () => {
    if (gameStateRef.current !== 'playing') return;
    const config = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;

    if (activeWordsRef.current.length >= config.maxWordsOnScreen) return;

    // Refill queue if empty and game still running
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

  // Main Game Animation Loop (Updates Y coordinates of falling words)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const updateLoop = (now) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const deltaTime = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isFrozenRef.current) {
        const gameHeight = gameAreaRef.current ? gameAreaRef.current.clientHeight : 500;

        setActiveWords(prevWords => {
          const nextWords = [];
          let lostLives = 0;

          for (const word of prevWords) {
            const nextY = word.y + word.speed * (deltaTime * 0.06);

            // Check if word reached bottom boundary
            if (nextY >= gameHeight - 90) {
              lostLives++;
              soundFx.playWordHitBottom();
              // Create red splash particles at bottom
              setParticles(p => [...p, ...createBurstParticles(word.x + 100, gameHeight - 40, 15, '#ef4444')]);
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

    // Search for any word on screen that matches user input
    const matchedIndex = activeWords.findIndex(word =>
      checkAnswerMatch(value, word.acceptableAnswers)
    );

    if (matchedIndex !== -1) {
      const matchedWord = activeWords[matchedIndex];

      // Calculate score points
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

      // Update streaks & multipliers
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

      // Trigger particle effects at word position
      setParticles(p => [
        ...p,
        ...createBurstParticles(matchedWord.x + 120, matchedWord.y + 30, 30, '#10b981')
      ]);

      // Trigger floating text popup
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

      // Remove matched word from screen and clear input box
      setActiveWords(prev => prev.filter((_, idx) => idx !== matchedIndex));
      setInputValue('');
    }
  };

  // Activate Freeze Powerup
  const activateFreeze = () => {
    if (freezeCharges <= 0 || isFrozen || gameState !== 'playing') return;
    setFreezeCharges(c => c - 1);
    setIsFrozen(true);
    soundFx.playFreezeSound();
    setTimeout(() => {
      setIsFrozen(false);
    }, 4500);
  };

  // Activate Bomb Powerup
  const activateBomb = () => {
    if (bombCharges <= 0 || activeWords.length === 0 || gameState !== 'playing') return;
    setBombCharges(c => c - 1);
    soundFx.playBombSound();

    // Clear all words on screen and gain partial points
    activeWords.forEach(word => {
      setParticles(p => [...p, ...createBurstParticles(word.x + 100, word.y + 30, 20, '#ef4444')]);
    });

    setScore(s => s + activeWords.length * 50);
    setActiveWords([]);
  };

  // End Game
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

        {/* Lives, Score, Multiplier Display */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Hearts / Health */}
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

          {/* Score & High Score */}
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase font-semibold">Score</div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 font-mono text-glow">
              {score}
            </div>
          </div>

          {/* Multiplier Badge */}
          {multiplier > 1 && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-black px-2.5 py-1 rounded-xl text-xs sm:text-sm animate-bounce-short shadow-lg">
              {multiplier}x MULTI!
            </div>
          )}

          {/* Controls */}
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

      {/* Main Falling Game Canvas Container */}
      <div
        ref={gameAreaRef}
        className="relative flex-1 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl min-h-[420px]"
      >
        {/* Particle and Floating Text Overlay */}
        <ParticleCanvas particles={particles} floatingTexts={floatingTexts} isFrozen={isFrozen} />

        {/* Danger Danger Bottom Red Zone */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-red-600/30 to-transparent border-t border-red-500/30 pointer-events-none flex items-end justify-center pb-2">
          <span className="text-[10px] tracking-widest text-red-400/80 uppercase font-semibold">
            ⚠️ Danger Zone ⚠️
          </span>
        </div>

        {/* Falling Word Cards */}
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
              {word.hint && (
                <div className="text-[11px] text-slate-400 italic">
                  Hint: {word.hint}
                </div>
              )}
            </div>
          ))}

        {/* Ready / Start Instructions Overlay */}
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

        {/* Pause Overlay */}
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

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-2 animate-bounce-short" />
            <h2 className="text-3xl font-black text-red-400 mb-1">Game Over!</h2>
            <p className="text-slate-400 mb-6">Don't worry, practice makes perfect!</p>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 w-full max-w-xs mb-6 space-y-3 font-mono text-sm">
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

      {/* Input Control Box & Power-ups */}
      <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
        {/* Main Typing Input */}
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

        {/* Power-up Buttons */}
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
