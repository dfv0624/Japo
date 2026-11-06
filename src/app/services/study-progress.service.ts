import { Service, signal, computed } from '@angular/core';
import { DisplayMode } from '../models/japanese.models';

export type ActiveTab =
  | 'kana'
  | 'flashcards'
  | 'sentences'
  | 'particles'
  | 'demonstratives'
  | 'dialogues'
  | 'quiz'
  | 'grammar'
  | 'dictionary';

export type LessonFilter = 1 | 2 | 0; // 0 = ambas

const STORAGE_KEY = 'japo_learning_progress_v1';

@Service()
export class StudyProgressService {
  // Navigation & Preferences
  readonly activeTab = signal<ActiveTab>('flashcards');
  readonly selectedLesson = signal<LessonFilter>(0); // Default: All (Lección 1 y 2)
  readonly displayMode = signal<DisplayMode>('kanji'); // kanji with furigana/kana
  readonly scriptMode = signal<'furigana' | 'hiragana'>('furigana');
  readonly showRomaji = signal<boolean>(false);

  // Progress metrics
  readonly completedExercisesCount = signal<number>(0);
  readonly correctCount = signal<number>(0);
  readonly masteredWordIds = signal<Set<string>>(new Set());
  readonly starredWordIds = signal<Set<string>>(new Set());

  // Accuracy computed
  readonly accuracyRate = computed(() => {
    const total = this.completedExercisesCount();
    if (total === 0) return 0;
    return Math.round((this.correctCount() / total) * 100);
  });

  constructor() {
    this.loadFromStorage();
  }

  setTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }

  goHome(): void {
    this.activeTab.set('flashcards');
  }

  setLesson(lesson: LessonFilter): void {
    this.selectedLesson.set(lesson);
  }

  setDisplayMode(mode: DisplayMode): void {
    this.displayMode.set(mode);
  }

  toggleRomaji(): void {
    this.showRomaji.update(r => !r);
  }

  toggleScriptMode(): void {
    this.scriptMode.update(m => m === 'furigana' ? 'hiragana' : 'furigana');
  }

  recordAnswer(isCorrect: boolean): void {
    this.completedExercisesCount.update(c => c + 1);
    if (isCorrect) {
      this.correctCount.update(c => c + 1);
    }
    this.saveToStorage();
  }

  toggleMastered(wordId: string): void {
    this.masteredWordIds.update(set => {
      const updated = new Set(set);
      if (updated.has(wordId)) {
        updated.delete(wordId);
      } else {
        updated.add(wordId);
      }
      return updated;
    });
    this.saveToStorage();
  }

  toggleStarred(wordId: string): void {
    this.starredWordIds.update(set => {
      const updated = new Set(set);
      if (updated.has(wordId)) {
        updated.delete(wordId);
      } else {
        updated.add(wordId);
      }
      return updated;
    });
    this.saveToStorage();
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const data = {
        completed: this.completedExercisesCount(),
        correct: this.correctCount(),
        mastered: Array.from(this.masteredWordIds()),
        starred: Array.from(this.starredWordIds())
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage unavailable
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.completed === 'number') this.completedExercisesCount.set(parsed.completed);
        if (typeof parsed.correct === 'number') this.correctCount.set(parsed.correct);
        if (Array.isArray(parsed.mastered)) this.masteredWordIds.set(new Set(parsed.mastered));
        if (Array.isArray(parsed.starred)) this.starredWordIds.set(new Set(parsed.starred));
      }
    } catch {
      // ignore
    }
  }
}

