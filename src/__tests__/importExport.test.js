import { describe, it, expect } from 'vitest';
import { parseAndNormalizeJson } from '../utils/jsonImporter';
import { filterTopicItems } from '../utils/jsonExporter';

describe('JSON Importer', () => {
  it('parses standard app topic schema correctly', () => {
    const input = {
      id: 'topic-1',
      title: 'Food Words',
      items: [
        { id: '1', prompt: 'Apple', answer: 'obuolys', hint: 'ob...' },
        { id: '2', prompt: 'Bread', answer: 'duona', acceptableAnswers: ['duona', 'duonele'] }
      ]
    };

    const topic = parseAndNormalizeJson(input);
    expect(topic.id).toBe('topic-1');
    expect(topic.title).toBe('Food Words');
    expect(topic.items).toHaveLength(2);
    expect(topic.items[0].prompt).toBe('Apple');
    expect(topic.items[0].answer).toBe('obuolys');
    expect(topic.items[0].status).toBe('untested');
    expect(topic.items[1].acceptableAnswers).toEqual(['duona', 'duonele']);
  });

  it('parses simple word array formats', () => {
    const input = [
      { word: 'Cat', translation: 'katė' },
      { prompt: 'Dog', answer: 'šuo' },
      { en: 'Sun', lt: 'saulė' }
    ];

    const topic = parseAndNormalizeJson(input, 'my-words.json');
    expect(topic.title).toBe('my words');
    expect(topic.items).toHaveLength(3);

    expect(topic.items[0].prompt).toBe('Cat');
    expect(topic.items[0].answer).toBe('katė');

    expect(topic.items[1].prompt).toBe('Dog');
    expect(topic.items[1].answer).toBe('šuo');

    expect(topic.items[2].prompt).toBe('Sun');
    expect(topic.items[2].answer).toBe('saulė');
  });

  it('parses key-value dictionary object format', () => {
    const input = {
      "Hello": "Labas",
      "Thank you": "Ačiū",
      "Goodbye": "Viso gero"
    };

    const topic = parseAndNormalizeJson(input, 'greetings.json');
    expect(topic.title).toBe('greetings');
    expect(topic.items).toHaveLength(3);
    expect(topic.items[0].prompt).toBe('Hello');
    expect(topic.items[0].answer).toBe('Labas');
  });

  it('preserves user flagged hasIssue property', () => {
    const input = [
      { prompt: 'Cat', answer: 'katė', hasIssue: true }
    ];

    const topic = parseAndNormalizeJson(input);
    expect(topic.items[0].hasIssue).toBe(true);
    expect(topic.items[0].status).toBe('need_practice');
  });

  it('throws descriptive error on invalid or empty json', () => {
    expect(() => parseAndNormalizeJson([])).toThrow('No valid words found');
    expect(() => parseAndNormalizeJson({})).toThrow('No valid words found');
    expect(() => parseAndNormalizeJson('invalid json {')).toThrow('Invalid JSON syntax');
  });
});

describe('JSON Exporter Filter', () => {
  const sampleTopic = {
    id: 'test-topic',
    title: 'Test Topic',
    items: [
      { id: '1', prompt: 'Cat', answer: 'katė', status: 'known', timesCorrect: 3, timesIncorrect: 0 },
      { id: '2', prompt: 'Dog', answer: 'šuo', status: 'need_practice', timesCorrect: 1, timesIncorrect: 3 },
      { id: '3', prompt: 'Sun', answer: 'saulė', status: 'known', timesCorrect: 5, timesIncorrect: 0, hasIssue: true }
    ]
  };

  it('filters words needing practice including manually flagged issues', () => {
    const practiceWords = filterTopicItems(sampleTopic, 'need_practice');
    expect(practiceWords).toHaveLength(2);
    const prompts = practiceWords.map(w => w.prompt);
    expect(prompts).toContain('Dog');
    expect(prompts).toContain('Sun');
  });

  it('filters known words excluding flagged issues', () => {
    const knownWords = filterTopicItems(sampleTopic, 'known');
    expect(knownWords).toHaveLength(1);
    expect(knownWords[0].prompt).toBe('Cat');
  });

  it('returns all words when filter is all', () => {
    const allWords = filterTopicItems(sampleTopic, 'all');
    expect(allWords).toHaveLength(3);
  });
});
