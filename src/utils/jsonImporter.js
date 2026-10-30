/**
 * Utility to parse and normalize flexible JSON formats into standard game topic format.
 */

export function parseAndNormalizeJson(rawInput, fileName = 'custom-words') {
  let data = rawInput;
  if (typeof rawInput === 'string') {
    try {
      data = JSON.parse(rawInput);
    } catch (e) {
      throw new Error(`Invalid JSON syntax: ${e.message}`);
    }
  }

  if (!data || (typeof data !== 'object' && !Array.isArray(data))) {
    throw new Error('JSON content must be an object or an array.');
  }

  const topicId = data.id || `custom-${Date.now()}`;
  const topicTitle = data.title || data.name || fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Custom Vocabulary';
  const topicDesc = data.description || 'Imported custom word list';
  const category = data.category || 'Custom';

  let rawItems = [];

  if (Array.isArray(data)) {
    rawItems = data;
  } else if (Array.isArray(data.items)) {
    rawItems = data.items;
  } else if (Array.isArray(data.words)) {
    rawItems = data.words;
  } else if (Array.isArray(data.vocabulary)) {
    rawItems = data.vocabulary;
  } else if (typeof data === 'object') {
    // Check if it's a key-value dictionary { "hello": "labas", "cat": "katė" }
    // ignoring standard metadata keys if present
    const keys = Object.keys(data).filter(
      k => !['id', 'title', 'name', 'description', 'category', 'icon', 'instructions', 'instructions_ru', 'title_ru', 'description_ru'].includes(k)
    );
    if (keys.length > 0) {
      rawItems = keys.map(k => ({ prompt: k, answer: data[k] }));
    }
  }

  if (!rawItems || rawItems.length === 0) {
    throw new Error('No valid words found in the uploaded JSON file.');
  }

  const normalizedItems = [];

  rawItems.forEach((item, idx) => {
    if (!item) return;

    let prompt = '';
    let answer = '';
    let acceptableAnswers = [];
    let hint = item.hint || '';
    let rule = item.rule || '';
    let rule_ru = item.rule_ru || '';
    let status = item.status || 'untested';
    let timesCorrect = typeof item.timesCorrect === 'number' ? item.timesCorrect : 0;
    let timesIncorrect = typeof item.timesIncorrect === 'number' ? item.timesIncorrect : 0;

    if (typeof item === 'string') {
      prompt = item;
      answer = item;
    } else if (typeof item === 'object') {
      prompt = item.prompt || item.word || item.term || item.front || item.question || item.en || item.ru || item.key || '';
      answer = item.answer || item.translation || item.definition || item.back || item.lt || item.value || '';

      if (Array.isArray(item.acceptableAnswers)) {
        acceptableAnswers = item.acceptableAnswers;
      }
    }

    prompt = String(prompt).trim();
    answer = String(answer).trim();

    if (!prompt && !answer) return;
    if (!prompt) prompt = answer;
    if (!answer) answer = prompt;

    if (acceptableAnswers.length === 0) {
      acceptableAnswers = [answer];
    } else if (!acceptableAnswers.includes(answer)) {
      acceptableAnswers.unshift(answer);
    }

    if (!hint && answer.length > 2) {
      hint = answer.substring(0, 2) + '...';
    }

    normalizedItems.push({
      id: item.id || `word-${idx + 1}-${Date.now()}`,
      prompt,
      answer,
      acceptableAnswers,
      hint,
      rule,
      rule_ru,
      status,
      timesCorrect,
      timesIncorrect
    });
  });

  if (normalizedItems.length === 0) {
    throw new Error('Could not extract any valid word and translation pairs from the file.');
  }

  return {
    id: topicId,
    title: topicTitle,
    description: topicDesc,
    category,
    icon: data.icon || 'BookOpen',
    instructions: data.instructions || 'Type the correct translation for each word.',
    instructions_ru: data.instructions_ru || 'Введите правильный перевод для каждого слова.',
    isCustom: true,
    items: normalizedItems
  };
}
