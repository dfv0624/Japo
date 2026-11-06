import { Component, computed, inject, signal } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { PARTICLE_EXERCISES } from '../../data/lessons-data';
import { ParticleExercise } from '../../models/japanese.models';

@Component({
  selector: 'app-particle-trainer',
  template: `
    <div class="particle-trainer-wrapper">
      <div class="module-header">
        <div>
          <span class="badge">Lección {{ currentExercise().lesson }} • Dominio de Partículas (助詞)</span>
          <h2 class="module-title">Elige la partícula adecuada</h2>
          <p class="module-desc">Las partículas definen la relación de cada palabra en la oración.</p>
        </div>
        <div class="exercise-progress">
          {{ currentIndex() + 1 }} / {{ filteredExercises().length }}
        </div>
      </div>

      <div class="trainer-card">
        <!-- Sentence Display with Blank Spot -->
        <div class="sentence-box">
          <div class="jp-sentence-display jp-serif">
            <span class="pre-text">{{ currentExercise().sentencePre }}</span>
            <span class="blank-slot" [class.filled]="selectedParticle() !== null" [class.correct]="isSubmitted() && isCorrect()" [class.wrong]="isSubmitted() && !isCorrect()">
              {{ selectedParticle() || '？' }}
            </span>
            <span class="post-text">{{ currentExercise().sentencePost }}</span>
          </div>

          <div class="es-translation">
            {{ currentExercise().translation }}
          </div>
        </div>

        <!-- Particle Option Buttons -->
        <div class="options-container">
          <span class="options-label">Selecciona la partícula correcta:</span>
          <div class="particle-grid">
            @for (opt of currentExercise().options; track opt) {
              <button 
                type="button" 
                class="particle-btn jp-serif"
                [class.selected]="selectedParticle() === opt"
                [disabled]="isSubmitted()"
                (click)="selectParticle(opt)">
                {{ opt }}
              </button>
            }
          </div>
        </div>

        <!-- Explanation Feedback -->
        @if (isSubmitted()) {
          <div class="feedback-card" [class.feedback-correct]="isCorrect()" [class.feedback-wrong]="!isCorrect()">
            <div class="feedback-title-row">
              <span class="result-badge">
                <span class="material-symbols-outlined icon-inline">{{ isCorrect() ? 'check_circle' : 'cancel' }}</span>
                {{ isCorrect() ? '¡Correcto!' : 'Incorrecto' }}
              </span>
              <button 
                type="button" 
                class="audio-btn" 
                (click)="playCompleteSentence()">
                <span class="material-symbols-outlined">volume_up</span>
              </button>
            </div>
            <div class="feedback-body">
              <strong>Explicación:</strong> {{ currentExercise().explanation }}
            </div>
          </div>
        }

        <!-- Bottom Controls -->
        <div class="actions-row">
          <button 
            type="button" 
            class="btn-secondary" 
            (click)="prevExercise()" 
            [disabled]="currentIndex() === 0">
            <span class="material-symbols-outlined">arrow_back</span>
            Anterior
          </button>

          @if (!isSubmitted()) {
            <button 
              type="button" 
              class="btn-primary" 
              [disabled]="selectedParticle() === null" 
              (click)="submitAnswer()">
              <span class="material-symbols-outlined">done_all</span>
              Comprobar
            </button>
          } @else {
            <button 
              type="button" 
              class="btn-primary" 
              (click)="nextExercise()"
              [disabled]="currentIndex() >= filteredExercises().length - 1">
              Siguiente partícula
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .particle-trainer-wrapper {
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

    .exercise-progress {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-muted);
      border: 1px solid var(--border-medium);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      background-color: var(--bg-primary);
    }

    .trainer-card {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .sentence-box {
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      background-color: var(--bg-subtle);
      text-align: center;
    }

    .jp-sentence-display {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: 0.05em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .blank-slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 54px;
      height: 54px;
      border: 2px dashed var(--accent-black);
      border-radius: var(--radius-sm);
      background-color: var(--bg-primary);
      color: var(--text-muted);
      font-size: 1.6rem;
      font-weight: 700;
      transition: all 0.15s ease;
    }

    .blank-slot.filled {
      color: var(--text-primary);
      border-style: solid;
    }

    .blank-slot.correct {
      background-color: var(--accent-black);
      color: var(--text-inverted);
      border-color: var(--accent-black);
    }

    .blank-slot.wrong {
      background-color: #f0f0f0;
      border-color: #000;
      text-decoration: line-through;
    }

    .es-translation {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-top: 1rem;
      font-style: italic;
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .options-label {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .particle-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.85rem;
    }

    .particle-btn {
      height: 64px;
      font-size: 1.75rem;
      font-weight: 700;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-md);
      cursor: pointer;
      box-shadow: var(--shadow-subtle);
      transition: all 0.15s ease;
    }

    .particle-btn:hover:not(:disabled):not(.selected) {
      background-color: var(--bg-secondary);
      transform: translateY(-2px);
    }

    .particle-btn.selected {
      background-color: var(--accent-black);
      color: var(--text-inverted);
    }

    .particle-btn.selected:hover:not(:disabled) {
      background-color: var(--accent-charcoal);
      border-color: var(--accent-charcoal);
      color: var(--text-inverted);
    }

    .feedback-card {
      border-radius: var(--radius-md);
      padding: 1.25rem;
      animation: fadeIn 0.2s ease;
    }

    .feedback-correct {
      background-color: var(--bg-secondary);
      border: 1px solid var(--accent-black);
    }

    .feedback-wrong {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
    }

    .feedback-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .result-badge {
      font-weight: 700;
      font-size: 1.05rem;
      color: var(--text-primary);
    }

    .feedback-body {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }

    .actions-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ParticleTrainerComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly currentIndex = signal<number>(0);
  readonly selectedParticle = signal<string | null>(null);
  readonly isSubmitted = signal<boolean>(false);

  readonly filteredExercises = computed(() => {
    const lesson = this.studyProgress.selectedLesson();
    return PARTICLE_EXERCISES.filter(ex => lesson === 0 || ex.lesson === lesson);
  });

  readonly currentExercise = computed<ParticleExercise>(() => {
    const list = this.filteredExercises();
    const idx = Math.min(this.currentIndex(), list.length - 1);
    return list[idx] || list[0];
  });

  readonly isCorrect = computed(() => {
    return this.selectedParticle() === this.currentExercise().correctParticle;
  });

  selectParticle(p: string): void {
    if (this.isSubmitted()) return;
    this.selectedParticle.set(p);
  }

  submitAnswer(): void {
    if (this.selectedParticle() === null) return;
    this.isSubmitted.set(true);
    const correct = this.isCorrect();
    this.studyProgress.recordAnswer(correct);
    if (correct) {
      this.playCompleteSentence();
    }
  }

  playCompleteSentence(): void {
    const ex = this.currentExercise();
    const full = `${ex.sentencePre}${ex.correctParticle}${ex.sentencePost}`;
    this.speechService.speak(full);
  }

  nextExercise(): void {
    if (this.currentIndex() < this.filteredExercises().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedParticle.set(null);
      this.isSubmitted.set(false);
    }
  }

  prevExercise(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.selectedParticle.set(null);
      this.isSubmitted.set(false);
    }
  }
}

