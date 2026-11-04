import { Component, computed, inject, signal } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { QUIZ_QUESTIONS } from '../../data/lessons-data';
import { QuizQuestion } from '../../models/japanese.models';

@Component({
  selector: 'app-quiz',
  template: `
    <div class="quiz-wrapper">
      <div class="module-header">
        <div>
          <span class="badge">Evaluación • テスト (Test)</span>
          <h2 class="module-title">Examen Rápido de Maestría</h2>
          <p class="module-desc">Pon a prueba tu comprensión de vocabulario, partículas y gramática.</p>
        </div>
        @if (!isCompleted()) {
          <div class="quiz-progress-badge">
            Pregunta {{ currentQuestionIndex() + 1 }} de {{ questions().length }}
          </div>
        }
      </div>

      <!-- In-Progress Quiz -->
      @if (!isCompleted()) {
        <div class="quiz-card">
          <!-- Progress bar -->
          <div class="progress-track">
            <div class="progress-fill" [style.width.%]="progressPercentage()"></div>
          </div>

          <!-- Question Content -->
          <div class="question-header">
            <span class="question-type-tag">
              @switch (currentQuestion().type) {
                @case ('meaning') { Significado & Vocabulario }
                @case ('grammar') { Estructura Gramatical }
                @case ('fill_blank') { Rellenar Espacio }
                @case ('audio') { Comprensión Auditiva }
              }
            </span>
            <span class="lesson-tag">Lección {{ currentQuestion().lesson }}</span>
          </div>

          <div class="prompt-text">
            {{ currentQuestion().prompt }}
          </div>

          @if (currentQuestion().audioText) {
            <div class="audio-prompt-row">
              <button 
                type="button" 
                class="btn-secondary" 
                (click)="speechService.speak(currentQuestion().audioText!)">
                <span class="material-symbols-outlined">volume_up</span>
                <span>Escuchar audio</span>
              </button>
            </div>
          }

          <!-- Options List -->
          <div class="options-list">
            @for (opt of currentQuestion().options; track opt; let idx = $index) {
              <button 
                type="button" 
                class="option-row"
                [class.selected]="selectedOptionIndex() === idx"
                [class.correct]="isAnswered() && idx === currentQuestion().correctIndex"
                [class.wrong]="isAnswered() && selectedOptionIndex() === idx && idx !== currentQuestion().correctIndex"
                [disabled]="isAnswered()"
                (click)="selectOption(idx)">
                <span class="option-marker">{{ getLetter(idx) }}</span>
                <span class="option-text">{{ opt }}</span>
              </button>
            }
          </div>

          <!-- Explanation after submitting -->
          @if (isAnswered()) {
            <div class="explanation-box" [class.is-correct]="isCurrentCorrect()" [class.is-wrong]="!isCurrentCorrect()">
              <div class="expl-title">
                <span class="material-symbols-outlined icon-inline">{{ isCurrentCorrect() ? 'check_circle' : 'cancel' }}</span>
                {{ isCurrentCorrect() ? '¡Correcto!' : 'Incorrecto' }}
              </div>
              <p class="expl-body">{{ currentQuestion().explanation }}</p>
            </div>
          }

          <!-- Next Button -->
          <div class="card-footer">
            @if (!isAnswered()) {
              <button 
                type="button" 
                class="btn-primary" 
                [disabled]="selectedOptionIndex() === null" 
                (click)="submitAnswer()">
                <span class="material-symbols-outlined">done</span>
                Confirmar respuesta
              </button>
            } @else {
              <button 
                type="button" 
                class="btn-primary" 
                (click)="nextQuestion()">
                {{ currentQuestionIndex() < questions().length - 1 ? 'Siguiente pregunta' : 'Ver resultados finales' }}
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            }
          </div>
        </div>
      } @else {
        <!-- Completed Results Screen -->
        <div class="results-card">
          <div class="results-badge">¡Examen Completado!</div>
          <h3 class="score-display">{{ score() }} / {{ questions().length }}</h3>
          <p class="score-message">
            @if (score() >= 9) {
              ¡Sobresaliente! Has asimilado con precisión los conceptos de Minna no Nihongo.
            } @else if (score() >= 7) {
              ¡Muy buen trabajo! Tienes una base sólida, repasa las preguntas con error.
            } @else {
              Buen esfuerzo. Te recomendamos repasar las tarjetas de memoria y el constructor de frases.
            }
          </p>

          <div class="results-actions">
            <button type="button" class="btn-primary" (click)="restartQuiz()">
              <span class="material-symbols-outlined">restart_alt</span>
              Repetir examen
            </button>
            <button type="button" class="btn-secondary" (click)="studyProgress.setTab('grammar')">
              <span class="material-symbols-outlined">menu_book</span>
              Ver guía gramatical
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .quiz-wrapper {
      max-width: 820px;
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

    .quiz-progress-badge {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-muted);
      border: 1px solid var(--border-medium);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      background-color: var(--bg-primary);
    }

    .quiz-card {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .progress-track {
      height: 4px;
      background-color: var(--bg-secondary);
      border-radius: var(--radius-full);
      overflow: hidden;
      width: 100%;
    }

    .progress-fill {
      height: 100%;
      background-color: var(--accent-black);
      transition: width 0.3s ease;
    }

    .question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .question-type-tag {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    .lesson-tag {
      font-size: 0.75rem;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-light);
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-full);
      font-weight: 600;
    }

    .prompt-text {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.35;
    }

    .audio-prompt-row {
      margin-top: -0.5rem;
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .option-row {
      width: 100%;
      text-align: left;
      padding: 1rem 1.25rem;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      background-color: var(--bg-primary);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .option-row:hover:not(:disabled) {
      border-color: var(--accent-black);
      background-color: var(--bg-secondary);
    }

    .option-row.selected {
      border-color: var(--accent-black);
      background-color: var(--bg-secondary);
    }

    .option-row.correct {
      background-color: var(--accent-black);
      border-color: var(--accent-black);
      color: var(--text-inverted);
    }

    .option-row.correct .option-marker,
    .option-row.correct .option-text {
      color: var(--text-inverted);
    }

    .option-row.wrong {
      border-color: #000;
      background-color: #f2f2f2;
    }

    .option-marker {
      width: 28px;
      height: 28px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-medium);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.82rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .option-text {
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .explanation-box {
      border-radius: var(--radius-md);
      padding: 1.15rem 1.35rem;
      animation: fadeIn 0.2s ease;
    }

    .explanation-box.is-correct {
      background-color: var(--bg-secondary);
      border: 1px solid var(--accent-black);
    }

    .explanation-box.is-wrong {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
    }

    .expl-title {
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 0.35rem;
    }

    .expl-body {
      font-size: 0.92rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    .card-footer {
      display: flex;
      justify-content: flex-end;
    }

    /* Results Screen */
    .results-card {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 3.5rem 2rem;
      box-shadow: var(--shadow-card);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }

    .results-badge {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
    }

    .score-display {
      font-size: 4rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
    }

    .score-message {
      font-size: 1.1rem;
      color: var(--text-secondary);
      max-width: 520px;
      line-height: 1.45;
    }

    .results-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class QuizComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly questions = signal<QuizQuestion[]>(QUIZ_QUESTIONS);
  readonly currentQuestionIndex = signal<number>(0);
  readonly selectedOptionIndex = signal<number | null>(null);
  readonly isAnswered = signal<boolean>(false);
  readonly score = signal<number>(0);
  readonly isCompleted = signal<boolean>(false);

  readonly currentQuestion = computed<QuizQuestion>(() => {
    return this.questions()[this.currentQuestionIndex()];
  });

  readonly progressPercentage = computed(() => {
    return ((this.currentQuestionIndex() + 1) / this.questions().length) * 100;
  });

  readonly isCurrentCorrect = computed(() => {
    return this.selectedOptionIndex() === this.currentQuestion().correctIndex;
  });

  getLetter(index: number): string {
    return ['A', 'B', 'C', 'D'][index] || '';
  }

  selectOption(idx: number): void {
    if (this.isAnswered()) return;
    this.selectedOptionIndex.set(idx);
  }

  submitAnswer(): void {
    if (this.selectedOptionIndex() === null) return;
    this.isAnswered.set(true);
    const correct = this.isCurrentCorrect();
    if (correct) {
      this.score.update(s => s + 1);
    }
    this.studyProgress.recordAnswer(correct);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex() < this.questions().length - 1) {
      this.currentQuestionIndex.update(i => i + 1);
      this.selectedOptionIndex.set(null);
      this.isAnswered.set(false);
    } else {
      this.isCompleted.set(true);
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex.set(0);
    this.selectedOptionIndex.set(null);
    this.isAnswered.set(false);
    this.score.set(0);
    this.isCompleted.set(false);
  }
}

