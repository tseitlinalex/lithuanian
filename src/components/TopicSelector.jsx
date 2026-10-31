import React from 'react';
import { MapPin, BookOpen, Zap, Trophy, Play, Upload, CheckCircle2, AlertCircle, Award, Sparkles, GraduationCap } from 'lucide-react';

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
  onCustomTopicUpload,
  onStartLesson,
  onStartExam,
  lessons,
  exams,
  lang = 'ru'
}) {
  const [uploadError, setUploadError] = React.useState('');
  const [uploadSuccess, setUploadSuccess] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all'); // 'all', 'books', 'games'

  const isRu = lang === 'ru';

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
          throw new Error(isRu ? 'Требуются поля: id, title и непустой массив items.' : 'JSON format requires id, title, and non-empty items array.');
        }
        onCustomTopicUpload(json);
        setUploadSuccess(isRu ? `Успешно импортирована тема "${json.title}"!` : `Successfully imported topic "${json.title}"!`);
      } catch (err) {
        setUploadError(`Invalid JSON: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
          🇱🇹 Kalbos Lietus • {isRu ? 'Интерактивный курс и подготовка к экзамену A1 (Sėkmės! 1 & 2)' : 'Interactive Course & A1 Exam Prep (Sėkmės! 1 & 2)'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {isRu ? 'Изучайте литовский и сдайте экзамен' : 'Learn Lithuanian & Pass the A1 Exam'}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          {isRu
            ? 'Полный курс по учебникам Sėkmės! (Книги 1 и 2): 21 глава с грамматикой, правилами, словарем и официальными тестами проверки знаний для сдачи экзамена.'
            : 'Complete curriculum based on Sėkmės! Books 1 & 2: 21 chapters of grammar, vocabulary, rules, and official review tests for the A1 exam.'}
        </p>
      </div>

      {/* Quick Launch Cards: Lessons & Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Card */}
        <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border-2 border-indigo-500/40 hover:border-indigo-500 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
                <BookOpen className="w-8 h-8" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full">
                21 {isRu ? 'Глава' : 'Chapters'} (A1.1 + A1.2)
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">
              {isRu ? 'Уроки по учебникам Sėkmės! 1 & 2' : 'Lessons from Sėkmės! 1 & 2'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              {isRu
                ? 'Грамматические правила, таблицы окончаний, лексика по темам, диалоги и интерактивные упражнения с моментальным объяснением ошибок.'
                : 'Grammar tables, endings declensions, thematic vocabulary, dialogues, and practice drills with instant feedback.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => onStartLesson && onStartLesson('ch-1')}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              <GraduationCap className="w-5 h-5" />
              {isRu ? 'Открыть интерактивные уроки' : 'Open Interactive Lessons'}
            </button>
          </div>
        </div>

        {/* Exam Card */}
        <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 border-2 border-emerald-500/40 hover:border-emerald-500 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                {isRu ? 'Официальный формат' : 'Official Format'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">
              {isRu ? 'Симулятор экзамена A1 (Pasitikrinkime)' : 'A1 Exam Simulator (Pasitikrinkime)'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              {isRu
                ? 'Итоговые проверочные тесты из книг Sėkmės! 1 и 2 и полная симуляция государственного экзамена A1 с подсчетом баллов и разбором ошибок.'
                : 'Official final review tests from Sėkmės! 1 & 2 plus a full simulation of the Lithuanian State A1 exam with scoring and mistake review.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => onStartExam && onStartExam('exam-a1-full')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              <Award className="w-5 h-5" />
              {isRu ? 'Пройти симуляцию экзамена A1' : 'Take A1 Exam Simulation'}
            </button>
          </div>
        </div>
      </div>

      {/* Chapters Carousel / Quick List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            {isRu ? 'Все главы курса (21 skyrius)' : 'All Course Chapters (21 Chapters)'}
          </h3>
          <span className="text-xs text-slate-400">
            {isRu ? 'Нажмите для перехода к уроку' : 'Click to jump to lesson'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {lessons?.map(l => (
            <button
              key={l.id}
              onClick={() => onStartLesson && onStartLesson(l.id)}
              className="bg-slate-800 hover:bg-indigo-600 hover:border-indigo-400 border border-slate-700/80 rounded-xl p-2.5 text-center transition group flex flex-col items-center justify-center"
            >
              <div className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-200">
                {l.level} • Knyga {l.book}
              </div>
              <div className="text-sm font-black text-white my-0.5">
                {l.chapter} sk.
              </div>
              <div className="text-[11px] text-slate-300 truncate w-full group-hover:text-white">
                {l.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section Divider: Word Rain Arcade */}
      <div className="pt-4 border-t border-slate-800 text-center">
        <h2 className="text-2xl font-black text-white mb-2">
          {isRu ? 'Игровая тренировка слов (Kalbos Lietus)' : 'Word Rain Arcade Training'}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mb-6">
          {isRu
            ? 'Тренируйте скорость реакции и запоминание окончаний в игровом режиме падающих слов!'
            : 'Train quick recall of declensions and vocabulary in the arcade word rain game!'}
        </p>

        {/* Difficulty Selector */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg max-w-md mx-auto mb-8">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
            {isRu ? 'Уровень сложности игры' : 'Choose Game Difficulty'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'easy', label: isRu ? 'Легко' : 'Easy', desc: isRu ? 'Медленно' : 'Slow speed' },
              { id: 'medium', label: isRu ? 'Средне' : 'Medium', desc: isRu ? 'Обычный' : 'Normal speed' },
              { id: 'hard', label: isRu ? 'Сложно' : 'Hard', desc: isRu ? 'Быстро' : 'Fast speed' }
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
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => {
          const IconComp = ICON_MAP[topic.icon] || BookOpen;
          const savedHighScore = localStorage.getItem(`highscore_${topic.id}_${difficulty}`) || 0;
          const displayTitle = isRu && topic.title_ru ? topic.title_ru : topic.title;
          const displayDesc = isRu && topic.description_ru ? topic.description_ru : topic.description;

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
                      <span>{savedHighScore} {isRu ? 'очков' : 'pts'}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {displayTitle}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {displayDesc}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>{topic.items?.length || topic.countries?.length || 0} {isRu ? 'вопросов' : 'Questions'}</span>
                  <span>{topic.category || 'General'}</span>
                </div>

                <button
                  onClick={() => onSelectTopic(topic)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  <Play className="w-4 h-4 fill-white" /> {isRu ? 'Начать игру' : 'Start Game'}
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
          <h3 className="font-bold text-slate-200 text-sm">
            {isRu ? 'Загрузить свою тему (JSON)' : 'Upload Custom Topic JSON'}
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          {isRu
            ? 'Хотите учить свои слова? Загрузите JSON файл с вопросами и ответами.'
            : 'Want to learn your own Lithuanian list? Upload a custom JSON file with questions and answers.'}
        </p>
        <label className="inline-block bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition">
          {isRu ? 'Выбрать файл (.json)' : 'Choose File (.json)'}
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
