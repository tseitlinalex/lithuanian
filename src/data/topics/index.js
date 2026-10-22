import locativeEndings from './locative-endings.json';
import countryEndings from './country-endings.json';
import basicVocabulary from './basic-vocabulary.json';
import essentialVerbs from './essential-verbs.json';

export const topics = [
  locativeEndings,
  countryEndings,
  basicVocabulary,
  essentialVerbs
];

export function getTopicById(id) {
  return topics.find(topic => topic.id === id) || topics[0];
}
