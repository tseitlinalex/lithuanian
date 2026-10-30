import React, { useState } from 'react';
import { topics as initialTopics } from './data/topics';
import TopicSelector from './components/TopicSelector';
import FallingWordsGame from './components/FallingWordsGame';
import MultipleChoiceGame from './components/MultipleChoiceGame';
import CountryDeclensionGame from './components/CountryDeclensionGame';
import { soundFx } from './utils/audio';

const STORAGE_KEY_CUSTOM_TOPICS = 'kalbos_lietus_custom_topics';
const STORAGE_KEY_WORD_STATS = 'kalbos_lietus_word_stats';

export default function App() {
  const [topics, setTopics] = useState(() => {
    let storedCustom = [];
    try {
      const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM_TOPICS);
      if (customStr) storedCustom = JSON.parse(customStr);
    } catch (e) {
      console.error('Failed to load custom topics', e);
    }

    let wordStats = {};
    try {
      const statsStr = localStorage.getItem(STORAGE_KEY_WORD_STATS);
      if (statsStr) wordStats = JSON.parse(statsStr);
    } catch (e) {
      console.error('Failed to load word stats', e);
    }

    const mergedTopics = [...storedCustom, ...initialTopics];

    return mergedTopics.map(t => {
      if (!t.items) return t;
      const updatedItems = t.items.map(item => {
        const key = `${t.id}_${item.id}`;
        if (wordStats[key]) {
          return { ...item, ...wordStats[key] };
        }
        return item;
      });
      return { ...t, items: updatedItems };
    });
  });

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameMode, setGameMode] = useState('falling'); // 'falling' or 'choice'
  const [soundMuted, setSoundMuted] = useState(false);
  const [lang, setLang] = useState('ru'); // Default translation language: Russian

  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMute();
    setSoundMuted(isMuted);
  };

  const handleCustomTopicUpload = (newTopic) => {
    setTopics(prev => {
      const filtered = prev.filter(t => t.id !== newTopic.id);
      const updatedList = [newTopic, ...filtered];

      const customOnly = updatedList.filter(t => t.isCustom);
      try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_TOPICS, JSON.stringify(customOnly));
      } catch (e) {
        console.error('Failed to save custom topics', e);
      }

      return updatedList;
    });
    setSelectedTopic(newTopic);
  };

  const handleDeleteCustomTopic = (topicId) => {
    setTopics(prev => {
      const updatedList = prev.filter(t => t.id !== topicId);
      const customOnly = updatedList.filter(t => t.isCustom);
      try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_TOPICS, JSON.stringify(customOnly));
      } catch (e) {
        console.error('Failed to save custom topics', e);
      }
      return updatedList;
    });
    if (selectedTopic && selectedTopic.id === topicId) {
      setSelectedTopic(null);
    }
  };

  const handleUpdateTopicStats = (updatedTopic) => {
    setTopics(prev => {
      const newTopics = prev.map(t => t.id === updatedTopic.id ? updatedTopic : t);

      const customOnly = newTopics.filter(t => t.isCustom);
      try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_TOPICS, JSON.stringify(customOnly));
      } catch (e) {
        console.error('Failed to save custom topics', e);
      }

      let wordStatsMap = {};
      try {
        const existingStr = localStorage.getItem(STORAGE_KEY_WORD_STATS);
        if (existingStr) wordStatsMap = JSON.parse(existingStr);
      } catch (e) {
        // ignore
      }

      updatedTopic.items.forEach(item => {
        const key = `${updatedTopic.id}_${item.id}`;
        wordStatsMap[key] = {
          status: item.hasIssue ? 'need_practice' : item.status,
          hasIssue: !!item.hasIssue,
          timesCorrect: item.timesCorrect,
          timesIncorrect: item.timesIncorrect
        };
      });

      try {
        localStorage.setItem(STORAGE_KEY_WORD_STATS, JSON.stringify(wordStatsMap));
      } catch (e) {
        console.error('Failed to save word stats', e);
      }

      return newTopics;
    });

    if (selectedTopic && selectedTopic.id === updatedTopic.id) {
      setSelectedTopic(updatedTopic);
    }
  };

  const handleToggleWordIssue = (topicId, itemId) => {
    setTopics(prev => {
      return prev.map(t => {
        if (t.id !== topicId) return t;
        const newItems = t.items.map(item => {
          if (item.id !== itemId) return item;
          const nextHasIssue = !item.hasIssue;
          return {
            ...item,
            hasIssue: nextHasIssue,
            status: nextHasIssue ? 'need_practice' : item.status
          };
        });
        const updated = { ...t, items: newItems };
        handleUpdateTopicStats(updated);
        return updated;
      });
    });
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
          ) : gameMode === 'choice' ? (
            <MultipleChoiceGame
              topic={selectedTopic}
              onBackToTopics={() => setSelectedTopic(null)}
              soundMuted={soundMuted}
              onToggleSound={handleToggleSound}
              onUpdateTopicStats={handleUpdateTopicStats}
              onToggleWordIssue={handleToggleWordIssue}
              lang={lang}
            />
          ) : (
            <FallingWordsGame
              topic={selectedTopic}
              difficulty={difficulty}
              onBackToTopics={() => setSelectedTopic(null)}
              soundMuted={soundMuted}
              onToggleSound={handleToggleSound}
              onUpdateTopicStats={handleUpdateTopicStats}
              onToggleWordIssue={handleToggleWordIssue}
              lang={lang}
            />
          )
        ) : (
          <TopicSelector
            topics={topics}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            difficulty={difficulty}
            onChangeDifficulty={(diff) => setDifficulty(diff)}
            gameMode={gameMode}
            onChangeGameMode={(mode) => setGameMode(mode)}
            onCustomTopicUpload={handleCustomTopicUpload}
            onDeleteCustomTopic={handleDeleteCustomTopic}
            onToggleWordIssue={handleToggleWordIssue}
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
