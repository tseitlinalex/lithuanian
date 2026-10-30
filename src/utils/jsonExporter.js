/**
 * Utility to filter and export topic word lists as downloadable JSON files on client side.
 */

export function filterTopicItems(topic, filterType = 'all') {
  if (!topic || !Array.isArray(topic.items)) {
    return [];
  }

  if (filterType === 'need_practice') {
    return topic.items.filter(item =>
      item.hasIssue === true ||
      item.status === 'need_practice' ||
      item.timesIncorrect > item.timesCorrect ||
      (item.status !== 'known' && item.timesIncorrect > 0)
    );
  }

  if (filterType === 'known') {
    return topic.items.filter(item =>
      !item.hasIssue &&
      (item.status === 'known' || (item.timesCorrect > 0 && item.timesCorrect >= item.timesIncorrect))
    );
  }

  return topic.items;
}

export function exportTopicAsJson(topic, filterType = 'all', customFilename = null) {
  if (!topic) return false;

  const itemsToExport = filterTopicItems(topic, filterType);

  let suffix = '';
  if (filterType === 'need_practice') suffix = '-need-practice';
  if (filterType === 'known') suffix = '-known-words';

  const exportPayload = {
    id: `${topic.id}${suffix}`,
    title: `${topic.title}${filterType === 'need_practice' ? ' (Need Practice)' : filterType === 'known' ? ' (Mastered)' : ''}`,
    description: topic.description || 'Exported vocabulary list',
    category: topic.category || 'Custom',
    exportDate: new Date().toISOString(),
    filterType,
    totalItems: itemsToExport.length,
    items: itemsToExport.map(item => ({
      id: item.id,
      prompt: item.prompt,
      answer: item.answer,
      acceptableAnswers: item.acceptableAnswers || [item.answer],
      hint: item.hint || '',
      rule: item.rule || '',
      rule_ru: item.rule_ru || '',
      hasIssue: !!item.hasIssue,
      status: item.hasIssue ? 'need_practice' : (item.status || 'untested'),
      timesCorrect: item.timesCorrect || 0,
      timesIncorrect: item.timesIncorrect || 0
    }))
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const cleanTitle = (topic.title || 'words').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const filename = customFilename || `${cleanTitle}${suffix}.json`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);

  return true;
}
