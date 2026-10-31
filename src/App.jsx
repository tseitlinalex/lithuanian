import React, { useState } from 'react';
import { topics as initialTopics } from './data/topics';
import lessonsData from './data/lessonsData.json';
import examData from './data/examData.json';
import TopicSelector from './components/TopicSelector';
import FallingWordsGame from './components/FallingWordsGame';
import CountryDeclensionGame from './components/CountryDeclensionGame';
import LessonViewer from './components/LessonViewer';
import ExamMode from './components/ExamMode';
import { soundFx } from './utils/audio';
import { BookOpen, Award, Gamepad2, GraduationCap } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sekmes_auth') === 'granted';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [topics, setTopics] = useState(initialTopics);
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'game', 'lessons', 'exam'
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState('ch-1');
  const [selectedExamId, setSelectedExamId] = useState('exam-a1-full');
  const [difficulty, setDifficulty] = useState('medium');
  const [soundMuted, setSoundMuted] = useState(false);
  const [lang, setLang] = useState('ru'); // Default translation language: Russian

  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMute();
    setSoundMuted(isMuted);
  };

  const handleCustomTopicUpload = (newTopic) => {
    setTopics(prev => [newTopic, ...prev]);
    setSelectedTopic(newTopic);
    setCurrentView('game');
  };

  const handleSelectGameTopic = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('game');
  };

  const handleOpenLesson = (lessonId = 'ch-1') => {
    setSelectedLessonId(lessonId);
    setCurrentView('lessons');
  };

  const handleOpenExam = (examId = 'exam-a1-full') => {
    setSelectedExamId(examId);
    setCurrentView('exam');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === '544') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sekmes_auth', 'granted');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-indigo-950/80 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl">
            🇱🇹
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">
            Sėkmės! Lietuvių Kalba A1
          </h1>
          <p className="text-xs text-slate-400 mb-6">
            Введите пароль для доступа к учебным материалам курса и экзаменационному симулятору.
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Введите пароль..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-center text-lg font-mono text-white placeholder-slate-500 focus:outline-none transition ${
                  passwordError
                    ? 'border-red-500 ring-2 ring-red-500/20'
                    : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
                autoFocus
              />
              {passwordError && (
                <p className="text-xs text-red-400 mt-2 font-medium">
                  Неверный пароль. Попробуйте еще раз.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/20"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Header Nav */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setCurrentView('menu');
              setSelectedTopic(null);
            }}
          >
            <div className="text-2xl">🇱🇹</div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Sėkmės! <span className="text-indigo-400">Lietuvių Kalba A1</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400">
                {lang === 'ru' ? 'Курс и подготовка к экзамену' : 'Curriculum & Exam Prep'}
              </span>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => {
                setCurrentView('menu');
                setSelectedTopic(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentView === 'menu' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              {lang === 'ru' ? 'Главная' : 'Overview'}
            </button>
            <button
              onClick={() => handleOpenLesson(selectedLessonId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentView === 'lessons' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {lang === 'ru' ? 'Уроки (21)' : 'Lessons (21)'}
            </button>
            <button
              onClick={() => handleOpenExam(selectedExamId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentView === 'exam' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {lang === 'ru' ? 'Экзамен A1' : 'A1 Exam'}
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-3">
            {/* Language Selector Toggle */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5">
              <button
                onClick={() => setLang('ru')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition ${
                  lang === 'ru' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇷🇺 RU
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition ${
                  lang === 'en' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6">
        {currentView === 'lessons' ? (
          <LessonViewer
            lessons={lessonsData}
            currentLessonId={selectedLessonId}
            onSelectLesson={(id) => setSelectedLessonId(id)}
            onBack={() => setCurrentView('menu')}
            lang={lang}
          />
        ) : currentView === 'exam' ? (
          <ExamMode
            examSuites={examData}
            currentExamId={selectedExamId}
            onSelectExam={(id) => setSelectedExamId(id)}
            onBack={() => setCurrentView('menu')}
            lang={lang}
          />
        ) : currentView === 'game' && selectedTopic ? (
          selectedTopic.id === 'country-endings' ? (
            <CountryDeclensionGame
              topic={selectedTopic}
              onBackToTopics={() => {
                setSelectedTopic(null);
                setCurrentView('menu');
              }}
              soundMuted={soundMuted}
              onToggleSound={handleToggleSound}
              lang={lang}
            />
          ) : (
            <FallingWordsGame
              topic={selectedTopic}
              difficulty={difficulty}
              onBackToTopics={() => {
                setSelectedTopic(null);
                setCurrentView('menu');
              }}
              soundMuted={soundMuted}
              onToggleSound={handleToggleSound}
              lang={lang}
            />
          )
        ) : (
          <TopicSelector
            topics={topics}
            onSelectTopic={handleSelectGameTopic}
            difficulty={difficulty}
            onChangeDifficulty={(diff) => setDifficulty(diff)}
            onCustomTopicUpload={handleCustomTopicUpload}
            onStartLesson={handleOpenLesson}
            onStartExam={handleOpenExam}
            lessons={lessonsData}
            exams={examData}
            lang={lang}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© Sėkmės! 1 & 2 • {lang === 'ru' ? 'Курс подготовки к сдаче экзамена A1 по литовскому языку' : 'A1 Lithuanian Exam Preparation Curriculum'}</span>
          <span>{lang === 'ru' ? 'Обычный ввод без спецсимволов' : 'Diacritic-insensitive typing'} • Web Audio Synthesizer</span>
        </div>
      </footer>
    </div>
  );
}
