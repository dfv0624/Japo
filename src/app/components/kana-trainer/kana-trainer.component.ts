import { Component, computed, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { KanaItem } from '../../models/japanese.models';
import { HIRAGANA_DATA, KATAKANA_DATA, ALL_KANA_DATA } from '../../data/kana-data';
import { SpeechService } from '../../services/speech.service';
import { StudyProgressService } from '../../services/study-progress.service';

type KanaViewMode = 'drill' | 'chart';
type ScriptFilter = 'all' | 'hiragana' | 'katakana';
type GroupFilter = 'all' | 'basic' | 'dakuten' | 'exceptions';
type DirectionMode = 'kana-to-romaji' | 'romaji-to-kana';

@Component({
  selector: 'app-kana-trainer',
  imports: [UpperCasePipe],
  templateUrl: './kana-trainer.component.html',
  styleUrl: './kana-trainer.component.css'
})
export class KanaTrainerComponent {
  protected readonly speechService = inject(SpeechService);
  protected readonly studyProgress = inject(StudyProgressService);

  // View state
  readonly viewMode = signal<KanaViewMode>('drill');
  readonly scriptFilter = signal<ScriptFilter>('all');
  readonly groupFilter = signal<GroupFilter>('all');
  readonly direction = signal<DirectionMode>('kana-to-romaji');

  // Chart specific state
  readonly chartScript = signal<'hiragana' | 'katakana'>('hiragana');
  readonly inspectedKana = signal<KanaItem | null>(null);

  // Drill state
  readonly currentKana = signal<KanaItem>(HIRAGANA_DATA[0]);
  readonly options = signal<string[]>([]);
  readonly selectedOption = signal<string | null>(null);
  readonly isAnswered = signal<boolean>(false);
  readonly isCorrect = signal<boolean>(false);

  // Performance stats
  readonly streak = signal<number>(0);
  readonly bestStreak = signal<number>(0);
  readonly totalAnswered = signal<number>(0);
  readonly correctCount = signal<number>(0);

  readonly accuracyRate = computed(() => {
    const total = this.totalAnswered();
    if (total === 0) return 100;
    return Math.round((this.correctCount() / total) * 100);
  });

  // Filtered pool of kana based on user filters
  readonly filteredPool = computed<KanaItem[]>(() => {
    let pool = ALL_KANA_DATA;
    const script = this.scriptFilter();
    if (script === 'hiragana') {
      pool = HIRAGANA_DATA;
    } else if (script === 'katakana') {
      pool = KATAKANA_DATA;
    }

    const group = this.groupFilter();
    if (group === 'basic') {
      pool = pool.filter(k => k.group === 'basic');
    } else if (group === 'dakuten') {
      pool = pool.filter(k => k.group === 'dakuten' || k.group === 'handakuten');
    } else if (group === 'exceptions') {
      pool = pool.filter(k => k.isException === true);
    }

    return pool.length > 0 ? pool : ALL_KANA_DATA;
  });

  // Chart groups for Hiragana
  readonly hiraganaBasic = computed(() => HIRAGANA_DATA.filter(k => k.group === 'basic'));
  readonly hiraganaDakuten = computed(() => HIRAGANA_DATA.filter(k => k.group === 'dakuten' || k.group === 'handakuten'));
  readonly hiraganaSpecial = computed(() => HIRAGANA_DATA.filter(k => k.group === 'special' || k.isException === true));

  // Chart groups for Katakana
  readonly katakanaBasic = computed(() => KATAKANA_DATA.filter(k => k.group === 'basic'));
  readonly katakanaDakuten = computed(() => KATAKANA_DATA.filter(k => k.group === 'dakuten' || k.group === 'handakuten'));
  readonly katakanaSpecial = computed(() => KATAKANA_DATA.filter(k => k.group === 'special' || k.isException === true));

  constructor() {
    this.nextQuestion();
  }

  setViewMode(mode: KanaViewMode): void {
    this.viewMode.set(mode);
  }

  setScriptFilter(script: ScriptFilter): void {
    this.scriptFilter.set(script);
    this.nextQuestion();
  }

  setGroupFilter(group: GroupFilter): void {
    this.groupFilter.set(group);
    this.nextQuestion();
  }

  setDirection(direction: DirectionMode): void {
    this.direction.set(direction);
    this.nextQuestion();
  }

  setChartScript(script: 'hiragana' | 'katakana'): void {
    this.chartScript.set(script);
  }

  inspect(item: KanaItem): void {
    this.inspectedKana.set(item);
    this.playAudio(item.char);
  }

  closeInspection(): void {
    this.inspectedKana.set(null);
  }

  playAudio(char: string): void {
    this.speechService.speak(char);
  }

  nextQuestion(): void {
    const pool = this.filteredPool();
    if (pool.length === 0) return;

    // Pick random item (avoid repeating the exact same if pool has > 1 items)
    const currentId = this.currentKana()?.id;
    let nextItem: KanaItem;
    if (pool.length > 1) {
      const candidates = pool.filter(k => k.id !== currentId);
      nextItem = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      nextItem = pool[0];
    }

    this.currentKana.set(nextItem);
    this.selectedOption.set(null);
    this.isAnswered.set(false);
    this.isCorrect.set(false);

    this.generateOptions(nextItem);
  }

  private generateOptions(item: KanaItem): void {
    const isKanaToRomaji = this.direction() === 'kana-to-romaji';
    const correctAnswer = isKanaToRomaji ? item.romaji : item.char;

    // Gather distinct distractors
    const distractors: string[] = [];
    const pool = this.filteredPool().length >= 4 ? this.filteredPool() : ALL_KANA_DATA;

    // Shuffle pool to pick random distractors
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());

    for (const candidate of shuffledPool) {
      if (candidate.id === item.id) continue;
      const optionValue = isKanaToRomaji ? candidate.romaji : candidate.char;
      if (optionValue !== correctAnswer && !distractors.includes(optionValue)) {
        distractors.push(optionValue);
      }
      if (distractors.length >= 3) break;
    }

    // Fallback if somehow not enough distractors in pool
    if (distractors.length < 3) {
      for (const candidate of ALL_KANA_DATA) {
        const optionValue = isKanaToRomaji ? candidate.romaji : candidate.char;
        if (optionValue !== correctAnswer && !distractors.includes(optionValue)) {
          distractors.push(optionValue);
        }
        if (distractors.length >= 3) break;
      }
    }

    const allOptions = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
    this.options.set(allOptions);
  }

  selectOption(option: string): void {
    if (this.isAnswered()) return;

    const item = this.currentKana();
    const isKanaToRomaji = this.direction() === 'kana-to-romaji';
    const correctAnswer = isKanaToRomaji ? item.romaji : item.char;
    const correct = option === correctAnswer;

    this.selectedOption.set(option);
    this.isAnswered.set(true);
    this.isCorrect.set(correct);

    // Audio pronunciation
    this.playAudio(item.char);

    // Metrics
    this.totalAnswered.update(t => t + 1);
    this.studyProgress.recordAnswer(correct);

    if (correct) {
      this.correctCount.update(c => c + 1);
      this.streak.update(s => {
        const next = s + 1;
        if (next > this.bestStreak()) {
          this.bestStreak.set(next);
        }
        return next;
      });
    } else {
      this.streak.set(0);
    }
  }

  resetStats(): void {
    this.streak.set(0);
    this.totalAnswered.set(0);
    this.correctCount.set(0);
  }
}
