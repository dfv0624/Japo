import { describe, it, expect } from 'vitest';
import {
  convertRomajiToHiragana,
  evaluateWritingAnswer,
  katakanaToHiragana,
  normalizeJapaneseInput
} from './romaji-to-kana';
import { WRITING_EXERCISES } from '../data/writing-data';

describe('romaji-to-kana utility', () => {
  it('should convert basic Ko-So-A-Do words and particles', () => {
    expect(convertRomajiToHiragana('kore')).toBe('これ');
    expect(convertRomajiToHiragana('sore')).toBe('それ');
    expect(convertRomajiToHiragana('are')).toBe('あれ');
    expect(convertRomajiToHiragana('kono')).toBe('この');
    expect(convertRomajiToHiragana('sono')).toBe('その');
    expect(convertRomajiToHiragana('ano')).toBe('あの');
    expect(convertRomajiToHiragana('koko')).toBe('ここ');
    expect(convertRomajiToHiragana('soko')).toBe('そこ');
    expect(convertRomajiToHiragana('asoko')).toBe('あそこ');
    expect(convertRomajiToHiragana('kochira')).toBe('こちら');
    expect(convertRomajiToHiragana('ha')).toBe('は');
    expect(convertRomajiToHiragana('wo')).toBe('を');
    expect(convertRomajiToHiragana('no')).toBe('の');
    expect(convertRomajiToHiragana('mo')).toBe('も');
    expect(convertRomajiToHiragana('ka')).toBe('か');
  });

  it('should convert yoon, sokuon and syllabic n correctly', () => {
    expect(convertRomajiToHiragana('jisho')).toBe('じしょ');
    expect(convertRomajiToHiragana('shokudou')).toBe('しょくどう');
    expect(convertRomajiToHiragana('kyoushitsu')).toBe('きょうしつ');
    expect(convertRomajiToHiragana('zasshi')).toBe('ざっし');
    expect(convertRomajiToHiragana('ikkai')).toBe('いっかい');
    expect(convertRomajiToHiragana('nihongo')).toBe('にほんご');
    expect(convertRomajiToHiragana('nn')).toBe('ん');
    expect(convertRomajiToHiragana("n'")).toBe('ん');
    // Live typing leaves trailing 'n' pending unless flushTrailingN is true
    expect(convertRomajiToHiragana('hon', false)).toBe('ほn');
    expect(convertRomajiToHiragana('hon', true)).toBe('ほん');
  });

  it('should convert katakana to hiragana and normalize input', () => {
    expect(katakanaToHiragana('ワイン')).toBe('わいん');
    expect(normalizeJapaneseInput('  kore ha hon desu. ')).toBe('これはほんです');
  });

  it('should evaluate exact and kana answers as correct', () => {
    const honExercise = WRITING_EXERCISES.find(ex => ex.id === 'w-koso-4')!;
    expect(evaluateWritingAnswer('これは 本です。', honExercise).isCorrect).toBe(true);
    expect(evaluateWritingAnswer('kore ha hon desu', honExercise).isCorrect).toBe(true);

    const erebeetaaEx = WRITING_EXERCISES.find(ex => ex.id === 'w-koso-11')!;
    const kanaRes = evaluateWritingAnswer('えれべーたーは あちらです', erebeetaaEx);
    expect(kanaRes.isCorrect).toBe(true);
  });

  it('should diagnose common particle and demonstrative mistakes', () => {
    const honExercise = WRITING_EXERCISES.find(ex => ex.id === 'w-koso-4')!;
    const waError = evaluateWritingAnswer('これわほんです', honExercise);
    expect(waError.isCorrect).toBe(false);
    expect(waError.feedbackType).toBe('particle_wa_error');

    const kudasaiExercise = WRITING_EXERCISES.find(ex => ex.id === 'w-part-7')!;
    const woError = evaluateWritingAnswer('これおください', kudasaiExercise);
    expect(woError.isCorrect).toBe(false);
    expect(woError.feedbackType).toBe('particle_wo_error');

    const konoHonExercise = WRITING_EXERCISES.find(ex => ex.id === 'w-koso-6')!;
    const demError = evaluateWritingAnswer('これほんはわたしのです', konoHonExercise);
    expect(demError.isCorrect).toBe(false);
    expect(demError.feedbackType).toBe('demonstrative_confusion');

    const jishoQuestionEx = WRITING_EXERCISES.find(ex => ex.id === 'w-koso-5')!;
    const missingKa = evaluateWritingAnswer('それはじしょです', jishoQuestionEx);
    expect(missingKa.isCorrect).toBe(false);
    expect(missingKa.feedbackType).toBe('missing_question_ka');
  });
});

