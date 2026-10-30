import React, { useState } from 'react';
import { MapPin, BookOpen, Zap, Trophy, Play, Upload, CheckCircle2, AlertCircle, Download, FileJson, Trash2, Flag, ChevronDown, ChevronUp, CheckSquare, CloudRain, HelpCircle, Code } from 'lucide-react';
import { parseAndNormalizeJson } from '../utils/jsonImporter';
import { exportTopicAsJson } from '../utils/jsonExporter';

const ICON_MAP = {
  MapPin,
  BookOpen,
  Zap
};

export default function TopicSelector({
  topics,
  onSelectTopic,
  difficulty,
  onChangeDifficulty,
  gameMode = 'falling',
  onChangeGameMode,
  onCustomTopicUpload,
  onDeleteCustomTopic,
  onToggleWordIssue,
  lang = 'ru'
}) {
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [activeExportMenu, setActiveExportMenu] = useState(null);
  const [expandedTopicWords, setExpandedTopicWords] = useState(null);
  const [showJsonGuide, setShowJsonGuide] = useState(false);

  const isRu = lang === 'ru';

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadSuccess('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const normalizedTopic = parseAndNormalizeJson(event.target.result, file.name);
        onCustomTopicUpload(normalizedTopic);
        setUploadSuccess(
          isRu
            ? `Успешно импортирована тема "${normalizedTopic.title}" (${normalizedTopic.items.length} слов)!`
            : `Successfully imported "${normalizedTopic.title}" (${normalizedTopic.items.length} words)!`
        );
      } catch (err) {
        setUploadError(err.message || 'Error processing JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExport = (topic, filterType) => {
    exportTopicAsJson(topic, filterType);
    setActiveExportMenu(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
          🇱🇹 Kalbos Lietus • {isRu ? 'Изучение литовского языка' : 'Lithuanian Learning Games'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isRu ? 'Выберите тему и режим игры' : 'Select Topic & Game Mode'}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          {isRu
            ? 'Используйте готовый словарь или импортируйте свой JSON со словами. Играйте в падающие слова или викторину из 4 вариантов!'
            : 'Use standard vocabulary or import your custom word JSON. Play falling words or 4-choice quiz mode!'}
        </p>
      </div>

      {/* Game Mode & Difficulty Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* Game Mode Selector */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
            {isRu ? 'Режим игры' : 'Game Mode'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChangeGameMode && onChangeGameMode('falling')}
              className={`p-2.5 rounded-xl text-center border transition-all flex flex-col items-center justify-center gap-1 ${
                gameMode === 'falling'
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/30 scale-102 font-bold'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <CloudRain className="w-4 h-4" />
              <div className="text-xs">{isRu ? 'Падающие слова' : 'Falling Words'}</div>
            </button>
            <button
              onClick={() => onChangeGameMode && onChangeGameMode('choice')}
              className={`p-2.5 rounded-xl text-center border transition-all flex flex-col items-center justify-center gap-1 ${
                gameMode === 'choice'
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/30 scale-102 font-bold'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <div className="text-xs">{isRu ? '4 Варианта ответа' : '4-Choice Quiz'}</div>
            </button>
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
            {isRu ? 'Сложность' : 'Difficulty'}
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'easy', label: isRu ? 'Легко' : 'Easy' },
              { id: 'medium', label: isRu ? 'Средне' : 'Medium' },
              { id: 'hard', label: isRu ? 'Сложно' : 'Hard' }
            ].map(level => (
              <button
                key={level.id}
                onClick={() => onChangeDifficulty(level.id)}
                className={`p-2.5 rounded-xl text-center border transition-all ${
                  difficulty === level.id
                    ? 'bg-indigo-600 border-indigo-400 text-white font-bold scale-102 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs">{level.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Topic Upload Box */}
      <div className="bg-slate-800/60 border-2 border-dashed border-indigo-500/40 hover:border-indigo-500 rounded-2xl p-5 text-center max-w-xl mx-auto space-y-3 transition-colors shadow-lg">
        <div className="flex items-center justify-center text-indigo-400 gap-2">
          <Upload className="w-5 h-5" />
          <h3 className="font-bold text-slate-200 text-base">
            {isRu ? 'Импортировать JSON со словами' : 'Import Word List JSON'}
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {isRu
            ? 'Загрузите любой JSON файл со словами. Всё происходит локально в браузере!'
            : 'Upload any JSON file containing words & translations. Fully client-side!'}
        </p>

        <div className="flex items-center justify-center gap-3">
          <label className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition shadow-md shadow-indigo-500/20">
            <FileJson className="w-4 h-4" />
            {isRu ? 'Загрузить .json файл' : 'Upload .json File'}
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => setShowJsonGuide(!showJsonGuide)}
            className="inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-bold px-3 py-2.5 rounded-xl transition"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>{isRu ? 'Формат JSON' : 'JSON Format'}</span>
          </button>
        </div>

        {/* JSON Format Guide Expandable Note */}
        {showJsonGuide && (
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-xl p-4 text-left text-xs space-y-3 mt-3 animate-fadeIn">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-amber-400" />
              <span>{isRu ? 'Поддерживаемые форматы JSON файлов:' : 'Supported JSON Formats:'}</span>
            </div>

            <div className="space-y-2">
              <div>
                <span className="font-bold text-slate-200">1. {isRu ? 'Массив пар слов' : 'Array of Word Pairs'}:</span>
                <pre className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] font-mono text-emerald-400 mt-1 overflow-x-auto">
                  {`[\n  { "word": "Кошка", "translation": "katė" },\n  { "word": "Собака", "translation": "šuo" }\n]`}
                </pre>
              </div>

              <div>
                <span className="font-bold text-slate-200">2. {isRu ? 'Простой словарь' : 'Key-Value Dictionary'}:</span>
                <pre className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] font-mono text-amber-400 mt-1 overflow-x-auto">
                  {`{\n  "Кошка": "katė",\n  "Собака": "šuo"\n}`}
                </pre>
              </div>

              <div>
                <span className="font-bold text-slate-200">3. {isRu ? 'Полный объект темы' : 'Full Topic Schema'}:</span>
                <pre className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] font-mono text-cyan-400 mt-1 overflow-x-auto">
                  {`{\n  "title": "Животные",\n  "items": [\n    { "prompt": "Кошка", "answer": "katė", "hint": "ka..." }\n  ]\n}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {uploadSuccess && (
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {uploadSuccess}
          </div>
        )}
        {uploadError && (
          <div className="flex items-center justify-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {uploadError}
          </div>
        )}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => {
          const IconComp = ICON_MAP[topic.icon] || BookOpen;
          const savedHighScore = localStorage.getItem(`highscore_${topic.id}_${difficulty}`) || 0;
          const displayTitle = isRu && topic.title_ru ? topic.title_ru : topic.title;
          const displayDesc = isRu && topic.description_ru ? topic.description_ru : topic.description;

          const totalItems = topic.items?.length || 0;
          const knownCount = topic.items?.filter(i => !i.hasIssue && (i.status === 'known' || (i.timesCorrect > 0 && i.timesCorrect >= i.timesIncorrect))).length || 0;
          const practiceCount = topic.items?.filter(i => i.hasIssue || i.status === 'need_practice' || i.timesIncorrect > i.timesCorrect).length || 0;
          const isExpanded = expandedTopicWords === topic.id;

          return (
            <div
              key={topic.id}
              className="group relative bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700/80 hover:border-indigo-500 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    {topic.isCustom && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Custom
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {savedHighScore > 0 && (
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{savedHighScore}</span>
                      </div>
                    )}

                    {topic.isCustom && onDeleteCustomTopic && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(isRu ? `Удалить тему "${topic.title}"?` : `Delete custom topic "${topic.title}"?`)) {
                            onDeleteCustomTopic(topic.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title={isRu ? 'Удалить тему' : 'Delete Topic'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {displayTitle}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {displayDesc}
                </p>

                {/* Knowledge Stats Badges */}
                {totalItems > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <button
                      onClick={() => setExpandedTopicWords(isExpanded ? null : topic.id)}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>{totalItems} {isRu ? 'слов' : 'words'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    {knownCount > 0 && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        ✓ {knownCount} {isRu ? 'знаю' : 'known'}
                      </span>
                    )}
                    {practiceCount > 0 && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400">
                        ⚡ {practiceCount} {isRu ? 'повторить' : 'practice'}
                      </span>
                    )}
                  </div>
                )}

                {/* Expandable Word List Viewer with Issue Marking */}
                {isExpanded && (
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 mb-4 max-h-48 overflow-y-auto space-y-1.5 text-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
                      <span>{isRu ? 'Слова в теме:' : 'Topic Words:'}</span>
                      <span>{isRu ? 'Отметить проблему 🚩' : 'Flag Issue 🚩'}</span>
                    </div>
                    {topic.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-800/80 p-1.5 rounded border border-slate-700/60">
                        <div className="truncate pr-2">
                          <span className="text-white font-medium">{item.prompt}</span>
                          <span className="text-slate-400 mx-1">→</span>
                          <span className="text-emerald-400 font-bold">{item.answer}</span>
                        </div>
                        <button
                          onClick={() => onToggleWordIssue && onToggleWordIssue(topic.id, item.id)}
                          className={`p-1 rounded transition flex-shrink-0 ${
                            item.hasIssue ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' : 'text-slate-500 hover:text-amber-400'
                          }`}
                          title={item.hasIssue ? (isRu ? 'Есть проблема' : 'Has Issue') : (isRu ? 'Отметить проблему' : 'Flag Issue')}
                        >
                          <Flag className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700/60">
                <button
                  onClick={() => onSelectTopic(topic)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  <Play className="w-4 h-4 fill-white" /> {isRu ? 'Начать игру' : 'Start Game'}
                </button>

                {/* Export Options Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => setActiveExportMenu(activeExportMenu === topic.id ? null : topic.id)}
                    className="w-full bg-slate-700/60 hover:bg-slate-700 text-slate-300 font-semibold py-1.5 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isRu ? 'Экспорт JSON' : 'Export JSON'}</span>
                  </button>

                  {activeExportMenu === topic.id && (
                    <div className="absolute bottom-full mb-2 inset-x-0 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-20 space-y-1 text-xs">
                      <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                        {isRu ? 'Варианты экспорта JSON:' : 'Export Options:'}
                      </div>
                      <button
                        onClick={() => handleExport(topic, 'need_practice')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-rose-300 hover:bg-rose-500/20 transition flex items-center justify-between"
                      >
                        <span>⚡ {isRu ? 'Слова для повторения' : 'Words to Practice'}</span>
                        <span className="text-[10px] text-slate-400">({practiceCount})</span>
                      </button>
                      <button
                        onClick={() => handleExport(topic, 'known')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-emerald-300 hover:bg-emerald-500/20 transition flex items-center justify-between"
                      >
                        <span>✓ {isRu ? 'Выученные слова' : 'Mastered Words'}</span>
                        <span className="text-[10px] text-slate-400">({knownCount})</span>
                      </button>
                      <button
                        onClick={() => handleExport(topic, 'all')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-indigo-300 hover:bg-indigo-500/20 transition flex items-center justify-between"
                      >
                        <span>📦 {isRu ? 'Весь список со статистикой' : 'All Words + Stats'}</span>
                        <span className="text-[10px] text-slate-400">({totalItems})</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
