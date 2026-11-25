import { Component, ElementRef, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import {
  HIRAGANA_QUICK_ROWS,
  WRITING_CATEGORY_LABELS,
  WRITING_EXERCISES
} from '../../data/writing-data';
import {
  WritingCategory,
  WritingEvaluationResult,
  WritingExercise
} from '../../models/japanese.models';
import { convertRomajiToHiragana, evaluateWritingAnswer } from '../../utils/romaji-to-kana';
import { WritingCanvasComponent } from './writing-canvas/writing-canvas.component';
import { WordLabComponent } from './word-lab/word-lab.component';

type WritingMode = 'keyboard' | 'draw' | 'lab';
type CategoryFilter = 'all' | WritingCategory;

@Component({
  selector: 'app-writing-practice',
  imports: [WritingCanvasComponent, WordLabComponent],
  templateUrl: './writing-practice.component.html',
  styleUrl: './writing-practice.component.css'
})
export class WritingPracticeComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly writingInput = viewChild<ElementRef<HTMLInputElement>>('writingInput');

  readonly activeMode = signal<WritingMode>('keyboard');
  readonly selectedCategory = signal<CategoryFilter>('all');
  readonly currentIndex = signal<number>(0);

  readonly userInput = signal<string>('');
  readonly imeEnabled = signal<boolean>(true);
  readonly showKanaKeypad = signal<boolean>(false);
  readonly hintLevel = signal<0 | 1 | 2 | 3>(0);
  readonly evaluation = signal<WritingEvaluationResult | null>(null);
  readonly hasRecordedAttempt = signal<boolean>(false);
  readonly sessionCorrect = signal<number>(0);
  readonly sessionTotal = signal<number>(0);

  readonly keypadRows = HIRAGANA_QUICK_ROWS;

  readonly categoryOptions: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'kosoado', label: 'これ・それ・あれ' },
    { id: 'particles', label: 'Partículas (は・の・も・か・を)' },
    { id: 'word_building', label: 'Armar Palabras' },
    { id: 'sentences', label: 'Frases Completas' }
  ];

  readonly particleSnippets = ['は', 'の', 'も', 'か', 'を'];
  readonly demonstrativeSnippets = ['これ', 'それ', 'あれ', 'この', 'その', 'あの', 'ここ', 'そこ', 'あそこ'];
  readonly endingSnippets = ['です', 'ですか', 'じゃありません', 'ください'];

  readonly filteredExercises = computed<WritingExercise[]>(() => {
    const lesson = this.studyProgress.selectedLesson();
    const cat = this.selectedCategory();
    return WRITING_EXERCISES.filter(ex => {
      const lessonMatch = lesson === 0 || ex.lesson === lesson;
      const catMatch = cat === 'all' || ex.category === cat;
      return lessonMatch && catMatch;
    });
  });

  readonly currentExercise = computed<WritingExercise | null>(() => {
    const list = this.filteredExercises();
    if (list.length === 0) return null;
    const idx = Math.min(this.currentIndex(), list.length - 1);
    return list[idx] ?? list[0] ?? null;
  });

  readonly imePreview = computed<string>(() => {
    return convertRomajiToHiragana(this.userInput(), true);
  });

  readonly categoryLabel = computed<string>(() => {
    const ex = this.currentExercise();
    if (!ex) return '';
    return WRITING_CATEGORY_LABELS[ex.category];
  });

  constructor() {
    effect(() => {
      this.studyProgress.selectedLesson();
      this.selectedCategory();
      untracked(() => {
        this.currentIndex.set(0);
        this.resetExerciseState();
      });
    });
  }

  setMode(mode: WritingMode): void {
    this.activeMode.set(mode);
  }

  setCategory(cat: CategoryFilter): void {
    this.selectedCategory.set(cat);
  }

  toggleIme(): void {
    this.imeEnabled.update(v => !v);
  }

  toggleKanaKeypad(): void {
    this.showKanaKeypad.update(v => !v);
  }

  onTextInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const raw = inputEl.value;

    if (this.imeEnabled()) {
      const cursor = inputEl.selectionStart ?? raw.length;
      const beforeCursor = raw.slice(0, cursor);
      const afterCursor = raw.slice(cursor);
      const convertedBefore = convertRomajiToHiragana(beforeCursor, false);
      const nextValue = convertedBefore + afterCursor;

      this.userInput.set(nextValue);

      if (nextValue !== raw) {
        inputEl.value = nextValue;
        const newPos = convertedBefore.length;
        if (typeof queueMicrotask === 'function') {
          queueMicrotask(() => {
            inputEl.setSelectionRange(newPos, newPos);
          });
        }
      }
    } else {
      this.userInput.set(raw);
    }

    if (this.evaluation() && !this.evaluation()?.isCorrect) {
      this.evaluation.set(null);
    }
  }

  onInputKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const currentEval = this.evaluation();
    if (currentEval?.isCorrect) {
      this.nextExercise();
    } else if (this.userInput().trim().length > 0) {
      this.checkAnswer();
    }
  }

  insertSnippet(snippet: string): void {
    const inputEl = this.writingInput()?.nativeElement;
    const current = this.userInput();

    if (inputEl) {
      const start = inputEl.selectionStart ?? current.length;
      const end = inputEl.selectionEnd ?? current.length;
      const prefix = convertRomajiToHiragana(current.slice(0, start), true);
      const suffix = current.slice(end);
      const updated = prefix + snippet + suffix;
      this.userInput.set(updated);
      inputEl.value = updated;
      const nextPos = prefix.length + snippet.length;
      inputEl.focus();
      inputEl.setSelectionRange(nextPos, nextPos);
    } else {
      const flushed = convertRomajiToHiragana(current, true);
      this.userInput.set(flushed + snippet);
    }

    if (this.evaluation() && !this.evaluation()?.isCorrect) {
      this.evaluation.set(null);
    }
  }

  backspaceInput(): void {
    const current = this.userInput();
    if (!current) return;
    const chars = Array.from(current);
    chars.pop();
    const updated = chars.join('');
    this.userInput.set(updated);

    const inputEl = this.writingInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = updated;
      inputEl.focus();
    }
  }

  clearInput(): void {
    this.userInput.set('');
    this.evaluation.set(null);
    const inputEl = this.writingInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
  }

  revealNextHint(): void {
    this.hintLevel.update(level => (level < 3 ? ((level + 1) as 0 | 1 | 2 | 3) : 3));
  }

  checkAnswer(): void {
    const ex = this.currentExercise();
    if (!ex) return;

    const finalInput = this.imeEnabled()
      ? convertRomajiToHiragana(this.userInput(), true)
      : this.userInput();

    this.userInput.set(finalInput);
    const inputEl = this.writingInput()?.nativeElement;
    if (inputEl && inputEl.value !== finalInput) {
      inputEl.value = finalInput;
    }

    const result = evaluateWritingAnswer(finalInput, ex);
    this.evaluation.set(result);

    if (!this.hasRecordedAttempt() && result.normalizedInput.length > 0) {
      this.hasRecordedAttempt.set(true);
      this.sessionTotal.update(t => t + 1);
      if (result.isCorrect) {
        this.sessionCorrect.update(c => c + 1);
      }
      this.studyProgress.recordAnswer(result.isCorrect);
    }

    if (result.isCorrect) {
      this.speechService.speak(ex.targetKana);
    }
  }

  nextExercise(): void {
    const total = this.filteredExercises().length;
    if (this.currentIndex() < total - 1) {
      this.currentIndex.update(i => i + 1);
      this.resetExerciseState();
    }
  }

  prevExercise(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.resetExerciseState();
    }
  }

  practiceInCanvas(): void {
    this.activeMode.set('draw');
  }

  onLabPracticeTopic(topic: WritingCategory): void {
    this.selectedCategory.set(topic);
    this.activeMode.set('keyboard');
  }

  private resetExerciseState(): void {
    this.userInput.set('');
    this.evaluation.set(null);
    this.hintLevel.set(0);
    this.hasRecordedAttempt.set(false);
    const inputEl = this.writingInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = '';
    }
  }
}

