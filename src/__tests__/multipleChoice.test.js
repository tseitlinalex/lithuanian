import { describe, it, expect } from 'vitest';
import { generateQuestionOptions } from '../components/MultipleChoiceGame';

describe('Multiple Choice Option Generator', () => {
  const sampleItems = [
    { id: '1', prompt: 'Cat', answer: 'katė' },
    { id: '2', prompt: 'Dog', answer: 'šuo' },
    { id: '3', prompt: 'Sun', answer: 'saulė' },
    { id: '4', prompt: 'Water', answer: 'vanduo' },
    { id: '5', prompt: 'Bread', answer: 'duona' }
  ];

  it('generates 4 options including the correct answer in normal direction', () => {
    const currentItem = sampleItems[0]; // Cat -> katė
    const options = generateQuestionOptions(currentItem, sampleItems, 'normal');

    expect(options).toHaveLength(4);
    expect(options).toContain('katė');
  });

  it('generates 4 options including the correct answer in reverse direction', () => {
    const currentItem = sampleItems[0]; // Cat -> katė
    const options = generateQuestionOptions(currentItem, sampleItems, 'reverse');

    expect(options).toHaveLength(4);
    expect(options).toContain('Cat');
  });

  it('returns empty array when invalid arguments passed', () => {
    expect(generateQuestionOptions(null, [])).toEqual([]);
  });
});
