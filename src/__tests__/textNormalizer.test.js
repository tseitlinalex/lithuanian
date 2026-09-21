import { describe, it, expect } from 'vitest';
import { normalizeText, checkAnswerMatch } from '../utils/textNormalizer';

describe('Lithuanian Text Normalizer', () => {
  it('converts text to lowercase', () => {
    expect(normalizeText('NIUJORKAS')).toBe('niujorkas');
    expect(normalizeText('Rokiškis')).toBe('rokiskis');
  });

  it('removes Lithuanian special diacritic letters', () => {
    expect(normalizeText('ąčęėįšųūž')).toBe('aceeisuuz');
    expect(normalizeText('ĄČĘĖĮŠŲŪŽ')).toBe('aceeisuuz');
  });

  it('trims and normalizes whitespace', () => {
    expect(normalizeText('   Vilniuje   ')).toBe('vilniuje');
    expect(normalizeText('Kauno   gatve')).toBe('kauno gatve');
  });

  it('matches diacritic-less typing with Lithuanian answers', () => {
    expect(checkAnswerMatch('Niujorke', 'Niujorke')).toBe(true);
    expect(checkAnswerMatch('niujorke', 'Niujorke')).toBe(true);
    expect(checkAnswerMatch('rokiskis', 'Rokiškis')).toBe(true);
    expect(checkAnswerMatch('ROKISKIS', 'Rokiškis')).toBe(true);
    expect(checkAnswerMatch('suniukas', 'šuniukas')).toBe(true);
    expect(checkAnswerMatch('zemaite', 'Žemaitė')).toBe(true);
    expect(checkAnswerMatch('azuolas', 'Ąžuolas')).toBe(true);
  });

  it('supports array of accepted answers', () => {
    const acceptableAnswers = ['Niujorke', 'Niujorkas'];
    expect(checkAnswerMatch('niujorke', acceptableAnswers)).toBe(true);
    expect(checkAnswerMatch('niujorkas', acceptableAnswers)).toBe(true);
    expect(checkAnswerMatch('vilniuje', acceptableAnswers)).toBe(false);
  });

  it('handles empty input gracefully', () => {
    expect(normalizeText('')).toBe('');
    expect(normalizeText(null)).toBe('');
    expect(checkAnswerMatch('', 'Atsakymas')).toBe(false);
  });
});
