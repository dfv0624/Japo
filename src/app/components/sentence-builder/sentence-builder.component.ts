import { Component, computed, inject, signal } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { SENTENCE_BUILDER_DATA } from '../../data/lessons-data';
import { SentenceBuilderExercise } from '../../models/japanese.models';

@Component({
  selector: 'app-sentence-builder',
  template: `
    <div class="sentence-builder-wrapper">
      <!-- Header meta -->
      <div class="module-header">
        <div>
          <span class="badge">Lección {{ currentExercise().lesson }} • Constructor de Oraciones</span>
          <h2 class="module-title">Ordena las palabras y partículas</h2>
          <p class="module-desc">Toca los bloques para construir la oración correcta en japonés.</p>
        </div>
        <div class="exercise-progress">
          {{ currentIndex() + 1 }} / {{ filteredExercises().length }}
        </div>
      </div>

      <!-- Main Workout Card -->
      <div class="workout-card">
        <!-- Target Prompt in Spanish -->
        <div class="prompt-box">
          <span class="prompt-label">Oración objetivo (Español):</span>
          <div class="prompt-text">{{ currentExercise().promptEs }}</div>
        </div>

        <!-- Assembly Drop Zone -->
        <div class="assembly-zone" [class.has-error]="checkStatus() === 'incorrect'" [class.is-correct]="checkStatus() === 'correct'">
          <div class="assembly-header">
            <span>Tu construcción:</span>
            @if (constructedTokens().length > 0) {
              <button type="button" class="clear-btn" (click)="resetConstruction()">Deshacer todo</button>
            }
          </div>

          <div class="tokens-slot-area">
            @if (constructedTokens().length === 0) {
              <div class="slot-placeholder">Toca los bloques inferiores para colocarlos aquí en orden...</div>
            } @else {
              @for (token of constructedTokens(); track $index) {
                <button 
                  type="button" 
                  class="token-chip in-slot jp-text"
                  (click)="removeToken($index)"
                  title="Toca para devolver al banco">
                  @if (studyProgress.scriptMode() === 'hiragana') {
                    {{ getTokenKana(token) }}
                  } @else if (hasFurigana(token)) {
                    <ruby>
                      {{ token }}
                      <rt class="token-rt">{{ getTokenKana(token) }}</rt>
                    </ruby>
                  } @else {
                    {{ token }}
                  }
                  <span class="remove-x">×</span>
                </button>
              }
            }
          </div>
        </div>

        <!-- Available Token Bank -->
        <div class="token-bank">
          <span class="bank-label">Banco de bloques disponibles:</span>
          <div class="bank-tokens">
            @for (token of availableTokens(); track $index) {
              <button 
                type="button" 
                class="token-chip bank-item jp-text"
                (click)="addToken(token, $index)">
                @if (studyProgress.scriptMode() === 'hiragana') {
                  {{ getTokenKana(token) }}
                } @else if (hasFurigana(token)) {
                  <ruby>
                    {{ token }}
                    <rt class="token-rt">{{ getTokenKana(token) }}</rt>
                  </ruby>
                } @else {
                  {{ token }}
                }
              </button>
            }
          </div>
        </div>

        <!-- Feedback & Explanation Box -->
        @if (checkStatus() === 'correct') {
          <div class="feedback-box success-feedback">
            <div class="feedback-top">
              <span class="feedback-icon">
                <span class="material-symbols-outlined icon-inline">check_circle</span>
                ¡Excelente! 正解 (Correcto)
              </span>
              <button 
                type="button" 
                class="audio-btn" 
                (click)="speechService.speak(currentExercise().targetJp)">
                <span class="material-symbols-outlined">volume_up</span>
              </button>
            </div>
            <div class="target-jp-reveal jp-serif">
              @if (studyProgress.scriptMode() === 'hiragana') {
                {{ currentExercise().targetKana }}
              } @else {
                {{ currentExercise().targetJp }}
              }
            </div>
            <div class="feedback-explanation">
              <strong>Gramática:</strong> {{ currentExercise().explanation }}
            </div>
          </div>
        } @else if (checkStatus() === 'incorrect') {
          <div class="feedback-box error-feedback">
            <div class="feedback-icon">
              <span class="material-symbols-outlined icon-inline">cancel</span>
              El orden no es el correcto todavía. Intenta reordenar los bloques.
            </div>
          </div>
        }

        <!-- Actions -->
        <div class="actions-bar">
          <button 
            type="button" 
            class="btn-secondary"
            (click)="prevExercise()"
            [disabled]="currentIndex() === 0">
            <span class="material-symbols-outlined">arrow_back</span>
            Anterior
          </button>

          @if (checkStatus() !== 'correct') {
            <button 
              type="button" 
              class="btn-primary"
              [disabled]="constructedTokens().length === 0"
              (click)="checkAnswer()">
              <span class="material-symbols-outlined">done_all</span>
              Comprobar respuesta
            </button>
          } @else {
            <button 
              type="button" 
              class="btn-primary"
              (click)="nextExercise()"
              [disabled]="currentIndex() >= filteredExercises().length - 1">
              Siguiente ejercicio
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sentence-builder-wrapper {
      max-width: 860px;
      margin: 1.5rem auto;
      padding: 0 1rem;
    }

    .module-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }

    .module-title {
      font-size: 1.45rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-top: 0.35rem;
    }

    .module-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .exercise-progress {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-muted);
      border: 1px solid var(--border-medium);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      background-color: var(--bg-primary);
    }

    .workout-card {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 1.85rem;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .prompt-box {
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 1rem;
    }

    .prompt-label {
      font-size: 0.78rem;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    .prompt-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-top: 0.35rem;
      line-height: 1.3;
    }

    /* Assembly Zone */
    .assembly-zone {
      border: 2px dashed var(--border-medium);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      background-color: var(--bg-subtle);
      transition: all 0.2s ease;
    }

    .assembly-zone.has-error {
      border-color: #000;
      background-color: #fff;
    }

    .assembly-zone.is-correct {
      border-style: solid;
      border-color: var(--accent-black);
      background-color: var(--bg-subtle);
    }

    .assembly-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }

    .clear-btn {
      font-size: 0.75rem;
      color: var(--text-secondary);
      background: none;
      border: none;
      text-decoration: underline;
      cursor: pointer;
    }

    .tokens-slot-area {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      min-height: 58px;
      align-items: center;
    }

    .slot-placeholder {
      font-size: 0.95rem;
      color: var(--text-muted);
      font-style: italic;
    }

    /* Tokens */
    .token-chip {
      font-size: 1.25rem;
      padding: 0.65rem 1.15rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      transition: all 0.15s ease;
    }

    .token-chip.bank-item {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-strong);
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .token-chip.bank-item:hover {
      background-color: var(--accent-black);
      color: var(--text-inverted);
      transform: translateY(-2px);
    }

    .token-chip.in-slot {
      background-color: var(--accent-black);
      color: var(--text-inverted);
      border: 1px solid var(--accent-black);
    }

    .token-rt {
      font-size: 0.62rem;
      font-weight: 500;
      color: inherit;
      opacity: 0.85;
      display: block;
      margin-bottom: 2px;
      line-height: 1;
    }

    .token-chip.in-slot .token-rt {
      color: var(--text-inverted);
      opacity: 0.9;
    }

    .remove-x {
      font-size: 0.95rem;
      opacity: 0.7;
    }

    .token-bank {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .bank-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .bank-tokens {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
    }

    /* Feedback */
    .feedback-box {
      border-radius: var(--radius-md);
      padding: 1.15rem 1.4rem;
      animation: fadeIn 0.2s ease-in;
    }

    .success-feedback {
      background-color: var(--bg-secondary);
      border: 1px solid var(--accent-black);
    }

    .error-feedback {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      color: var(--text-primary);
    }

    .feedback-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .feedback-icon {
      font-weight: 700;
      font-size: 1rem;
      color: var(--text-primary);
    }

    .target-jp-reveal {
      font-size: 1.65rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
    }

    .feedback-explanation {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    .actions-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class SentenceBuilderComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly currentIndex = signal<number>(0);
  readonly constructedTokens = signal<string[]>([]);
  readonly availableTokens = signal<string[]>([]);
  readonly checkStatus = signal<'idle' | 'correct' | 'incorrect'>('idle');

  readonly filteredExercises = computed(() => {
    const lesson = this.studyProgress.selectedLesson();
    return SENTENCE_BUILDER_DATA.filter(ex => lesson === 0 || ex.lesson === lesson);
  });

  readonly currentExercise = computed<SentenceBuilderExercise>(() => {
    const list = this.filteredExercises();
    const idx = Math.min(this.currentIndex(), list.length - 1);
    return list[idx] || list[0];
  });

  constructor() {
    this.initExercise();
  }

  private initExercise(): void {
    const ex = this.currentExercise();
    if (!ex) return;
    this.constructedTokens.set([]);
    // Shuffle tokens
    const shuffled = [...ex.tokens];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.availableTokens.set(shuffled);
    this.checkStatus.set('idle');
  }

  addToken(token: string, bankIndex: number): void {
    if (this.checkStatus() === 'correct') return;
    this.constructedTokens.update(list => [...list, token]);
    this.availableTokens.update(list => list.filter((_, idx) => idx !== bankIndex));
    this.checkStatus.set('idle');
  }

  removeToken(slotIndex: number): void {
    if (this.checkStatus() === 'correct') return;
    const token = this.constructedTokens()[slotIndex];
    this.constructedTokens.update(list => list.filter((_, idx) => idx !== slotIndex));
    this.availableTokens.update(list => [...list, token]);
    this.checkStatus.set('idle');
  }

  resetConstruction(): void {
    this.initExercise();
  }

  checkAnswer(): void {
    const userOrder = this.constructedTokens();
    const correct = this.currentExercise().correctOrder;

    const isMatch = userOrder.length === correct.length &&
      userOrder.every((tok, idx) => tok === correct[idx]);

    if (isMatch) {
      this.checkStatus.set('correct');
      this.studyProgress.recordAnswer(true);
      this.speechService.speak(this.currentExercise().targetJp);
    } else {
      this.checkStatus.set('incorrect');
      this.studyProgress.recordAnswer(false);
    }
  }

  nextExercise(): void {
    if (this.currentIndex() < this.filteredExercises().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.initExercise();
    }
  }

  private readonly tokenKanaMap: Record<string, string> = {
    '学生': 'がくせい',
    '会社員': 'かいしゃいん',
    '社員です': 'しゃいんです',
    'アメリカ人': 'アメリカじん',
    'あの方は': 'あのかたは',
    '辞書です': 'じしょです',
    '傘ですか': 'かさですか',
    'この本は': 'このほんは',
    '佐藤さんの': 'さとうさんの',
    '本です': 'ほんです',
    '違います': 'ちがいます'
  };

  hasFurigana(token: string): boolean {
    return token in this.tokenKanaMap;
  }

  getTokenKana(token: string): string {
    return this.tokenKanaMap[token] || token;
  }

  prevExercise(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.initExercise();
    }
  }
}

