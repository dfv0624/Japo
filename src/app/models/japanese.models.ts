export type DisplayMode = 'kanji' | 'hiragana' | 'romaji';

export interface KanaItem {
  id: string;
  type: 'hiragana' | 'katakana';
  char: string;
  romaji: string;
  group: 'basic' | 'dakuten' | 'handakuten' | 'yoon' | 'special';
  row: string;
  isException?: boolean;
  exceptionNote?: string;
  exampleWord?: {
    jp: string;
    reading: string;
    meaning: string;
  };
}

export interface VocabularyItem {
  id: string;
  lesson: 1 | 2 | 3;
  kanji?: string;
  kana: string;
  romaji: string;
  spanish: string;
  category: 'persona' | 'profesion' | 'pais' | 'objeto' | 'lugar' | 'expresion' | 'demostrativo' | 'numero' | 'otro';
  notes?: string;
  examples?: {
    jp: string;
    kana: string;
    romaji: string;
    es: string;
  }[];
}

export interface GrammarPoint {
  id: string;
  lesson: 1 | 2 | 3;
  pattern: string;
  title: string;
  explanation: string;
  keyRule: string;
  examples: {
    jp: string;
    kana: string;
    romaji: string;
    es: string;
    breakdown?: string;
  }[];
  tips?: string[];
}

export interface SentenceBuilderExercise {
  id: string;
  lesson: 1 | 2 | 3;
  promptEs: string;
  targetJp: string;
  targetKana: string;
  tokens: string[]; // shuffled tokens to tap
  correctOrder: string[];
  explanation: string;
}

export interface ParticleExercise {
  id: string;
  lesson: 1 | 2 | 3;
  sentencePre: string;
  sentencePost: string;
  sentencePreKana?: string;
  sentencePostKana?: string;
  romaji?: string;
  translation: string;
  correctParticle: string;
  options: string[];
  explanation: string;
}

export interface DemonstrativeScenario {
  id: string;
  lesson: 2 | 3;
  speakerLabel: string;
  listenerLabel: string;
  objectName: string;
  objectKana: string;
  objectSpanish: string;
  distance: 'near_speaker' | 'near_listener' | 'far_both';
  mode: 'pronoun' | 'adjective' | 'place' | 'direction'; // これ/それ/あれ vs この/その/あの vs ここ/そこ/あそこ vs こちら/そちら/あちら
  contextDescription: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  speakerRole: string;
  jp: string;
  kana: string;
  romaji: string;
  es: string;
  options?: {
    textJp: string;
    textKana: string;
    textEs: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface DialogueScenario {
  id: string;
  lesson: 1 | 2 | 3;
  title: string;
  description: string;
  lines: DialogueLine[];
}

export interface QuizQuestion {
  id: string;
  lesson: 1 | 2 | 3;
  type: 'meaning' | 'audio' | 'grammar' | 'fill_blank';
  prompt: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserStats {
  completedExercises: number;
  correctAnswers: number;
  masteredWords: string[];
  streakDays: number;
}

