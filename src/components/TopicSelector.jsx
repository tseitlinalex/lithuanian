import React, { useState } from 'react';
import { MapPin, BookOpen, Zap, Trophy, Play, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

const ICON_MAP = {
  MapPin,
  BookOpen,
  Zap
};

export default function TopicSelector({ topics, onSelectTopic, difficulty, onChangeDifficulty, onCustomTopicUpload }) {
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadSuccess('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!json.id || !json.title || !Array.isArray(json.items) || json.items.length === 0) {
          throw new Error('JSON format requires id, title, and a non-empty items array with {prompt, answer}.');
        }
        onCustomTopicUpload(json);
        setUploadSuccess(`Successfully imported topic "${json.title}"!`);
      } catch (err) {
        setUploadError(`Invalid JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
          🇱🇹 Kalbos Lietus • Lithuanian Word Rain Game
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Select a Topic & Start Playing
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Catch falling Lithuanian words before they hit the bottom. Type the correct form or translation—diacritics (š, ž, ą, ė) are ignored!
        </p>
      </div>

      {/* Difficulty Level Selector */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg max-w-md mx-auto">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
          Choose Difficulty Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'easy', label: 'Easy', desc: 'Slow speed' },
            { id: 'medium', label: 'Medium', desc: 'Normal speed' },
            { id: 'hard', label: 'Hard', desc: 'Fast speed' }
          ].map(level => (
            <button
              key={level.id}
              onClick={() => onChangeDifficulty(level.id)}
              className={`p-2.5 rounded-xl text-center border transition-all ${
                difficulty === level.id
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/30 scale-105 font-bold'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <div className="text-sm">{level.label}</div>
              <div className="text-[10px] opacity-75">{level.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => {
          const IconComp = ICON_MAP[topic.icon] || BookOpen;
          const savedHighScore = localStorage.getItem(`highscore_${topic.id}_${difficulty}`) || 0;

          return (
            <div
              key={topic.id}
              className="group relative bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700/80 hover:border-indigo-500 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  {savedHighScore > 0 && (
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{savedHighScore} pts</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {topic.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>{topic.items?.length || 0} Questions</span>
                  <span>{topic.category || 'General'}</span>
                </div>

                <button
                  onClick={() => onSelectTopic(topic)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  <Play className="w-4 h-4 fill-white" /> Start Game
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Topic Upload Box */}
      <div className="bg-slate-800/50 border border-dashed border-slate-700 rounded-2xl p-5 text-center max-w-xl mx-auto space-y-3">
        <div className="flex items-center justify-center text-indigo-400 gap-2">
          <Upload className="w-5 h-5" />
          <h3 className="font-bold text-slate-200 text-sm">Upload Custom Topic JSON</h3>
        </div>
        <p className="text-xs text-slate-400">
          Want to learn your own Lithuanian list? Upload a custom JSON file with questions and answers.
        </p>
        <label className="inline-block bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition">
          Choose File (.json)
          <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
        </label>

        {uploadSuccess && (
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" /> {uploadSuccess}
          </div>
        )}
        {uploadError && (
          <div className="flex items-center justify-center gap-2 text-xs text-rose-400 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
            <AlertCircle className="w-4 h-4" /> {uploadError}
          </div>
        )}
      </div>
    </div>
  );
}
