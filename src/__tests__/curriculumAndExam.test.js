import { describe, it, expect } from 'vitest';
import lessonsData from '../data/lessonsData.json';
import examData from '../data/examData.json';
import { checkAnswerMatch, normalizeText } from '../utils/textNormalizer';

describe('Curriculum Data Integrity', () => {
  it('contains all 21 chapters from Sėkmės! 1 & 2', () => {
    expect(lessonsData.length).toBe(21);
    const chapterNumbers = lessonsData.map(l => l.chapter);
    for (let ch = 1; ch <= 21; ch++) {
      expect(chapterNumbers).toContain(ch);
    }
  });

  it('each chapter has essential grammar rules, vocabulary and interactive exercises', () => {
    lessonsData.forEach(chapter => {
      expect(chapter.id).toBeDefined();
      expect(chapter.title).toBeDefined();
      expect(chapter.grammar.length).toBeGreaterThanOrEqual(1);
      expect(chapter.vocabulary.length).toBeGreaterThanOrEqual(3);
      expect(chapter.exercises.length).toBeGreaterThanOrEqual(1);

      // Verify each exercise has valid question and answer
      chapter.exercises.forEach(ex => {
        expect(ex.id).toBeDefined();
        expect(ex.type).toMatch(/^(choice|fill)$/);
        expect(ex.question).toBeDefined();
        expect(ex.answer).toBeDefined();
        if (ex.type === 'choice') {
          expect(ex.options).toContain(ex.answer);
        }
      });
    });
  });

  it('covers Book 1 (A1.1) and Book 2 (A1.2) accurately', () => {
    const book1Chapters = lessonsData.filter(l => l.book === 1);
    const book2Chapters = lessonsData.filter(l => l.book === 2);
    expect(book1Chapters.length).toBe(9);
    expect(book2Chapters.length).toBe(12);
  });
});

describe('Exam Data & Scoring Integrity', () => {
  it('contains Book 1, Book 2, and Full State A1 exams', () => {
    expect(examData.length).toBe(3);
    const examIds = examData.map(e => e.id);
    expect(examIds).toContain('exam-b1');
    expect(examIds).toContain('exam-b2');
    expect(examIds).toContain('exam-a1-full');
  });

  it('each exam has passingScore = 60 and at least 15 comprehensive questions', () => {
    examData.forEach(exam => {
      expect(exam.passingScore).toBe(60);
      expect(exam.questions.length).toBeGreaterThanOrEqual(15);
      exam.questions.forEach(q => {
        expect(q.id).toBeDefined();
        expect(q.category).toBeDefined();
        expect(q.question).toBeDefined();
        expect(q.answer).toBeDefined();
        if (q.type === 'choice') {
          expect(q.options).toContain(q.answer);
        }
      });
    });
  });

  it('normalizes answers correctly ignoring accents and whitespace', () => {
    // Test diacritic insensitivity on Lithuanian case endings
    expect(checkAnswerMatch('vilniuje', ['Vilniuje'])).toBe(true);
    expect(checkAnswerMatch('kaune', ['Kaune'])).toBe(true);
    expect(checkAnswerMatch('biblioteka', ['biblioteką'])).toBe(true);
    expect(checkAnswerMatch('penktadieni', ['penktadienį'])).toBe(true);
    expect(checkAnswerMatch('saldytuva', ['šaldytuvą'])).toBe(true);
    expect(checkAnswerMatch('mokomes', ['mokomės'])).toBe(true);
  });
});
