import React, { useState } from 'react';
import { topics as initialTopics } from './data/topics';
import TopicSelector from './components/TopicSelector';
import FallingWordsGame from './components/FallingWordsGame';
import CountryDeclensionGame from './components/CountryDeclensionGame';
import { soundFx } from './utils/audio';

export default function App() {
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopic, setSelectedTopic] = useState(null);
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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Global Header Nav */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setSelectedTopic(null)}
          >
            <div className="text-2xl">🇱🇹</div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Kalbos <span className="text-indigo-400">Lietus</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400">
                {lang === 'ru' ? 'Изучение литовского языка' : 'Lithuanian Gamified Learning'}
              </span>
            </div>
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

            <span className="hidden md:inline">Netlify Ready</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-6">
        {selectedTopic ? (
          selectedTopic.id === 'country-endings' ? (
            <CountryDeclensionGame
              topic={selectedTopic}
              onBackToTopics={() => setSelectedTopic(null)}
              soundMuted={soundMuted}
              onToggleSound={handleToggleSound}
              lang={lang}
            />
          ) : (
            <FallingWordsGame
              topic={selectedTopic}
              difficulty={difficulty}
              onBackToTopics={() => setSelectedTopic(null)}
              soundMuted={soundMuted}
              onToggleSound={handleToggleSound}
              lang={lang}
            />
          )
        ) : (
          <TopicSelector
            topics={topics}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            difficulty={difficulty}
            onChangeDifficulty={(diff) => setDifficulty(diff)}
            onCustomTopicUpload={handleCustomTopicUpload}
            lang={lang}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© Kalbos Lietus • {lang === 'ru' ? 'Изучение литовского языка в игровой форме' : 'Reusable Gamified Lithuanian Learning Component'}</span>
          <span>{lang === 'ru' ? 'Обычный ввод без спецсимволов' : 'Diacritic-insensitive typing'} • Web Audio Synthesizer</span>
        </div>
      </footer>
    </div>
  );
}
