import { Component, computed, inject, signal } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { DEMONSTRATIVE_SCENARIOS } from '../../data/lessons-data';
import { DemonstrativeScenario } from '../../models/japanese.models';

@Component({
  selector: 'app-demonstrative-trainer',
  template: `
    <div class="demonstrative-wrapper">
      <div class="module-header">
        <div>
          <span class="badge">Lección 2 • Sistema Ko-So-A-Do (指示詞)</span>
          <h2 class="module-title">Mapa Visual de Demostrativos</h2>
          <p class="module-desc">Aprende la relación espacial según la distancia entre hablante y oyente.</p>
        </div>
        <div class="scenarios-progress">
          {{ currentIndex() + 1 }} / {{ scenarios.length }}
        </div>
      </div>

      <!-- Theory Schema Pill Reference -->
      <div class="schema-reference-bar">
        <div class="schema-col">
          <span class="schema-tag">Cerca de mí (Hablante)</span>
          <span class="schema-pair">これ / この + [Sustantivo]</span>
        </div>
        <div class="schema-divider">→</div>
        <div class="schema-col">
          <span class="schema-tag">Cerca de ti (Oyente)</span>
          <span class="schema-pair">それ / その + [Sustantivo]</span>
        </div>
        <div class="schema-divider">→</div>
        <div class="schema-col">
          <span class="schema-tag">Lejos de ambos</span>
          <span class="schema-pair">あれ / あの + [Sustantivo]</span>
        </div>
      </div>

      <div class="interactive-stage">
        <!-- Visual Spatial Scene -->
        <div class="stage-visual">
          <!-- Speaker Area -->
          <div class="entity-zone" [class.has-object]="currentScenario().distance === 'near_speaker'">
            <div class="avatar-icon">
              <span class="material-symbols-outlined avatar-symbol">record_voice_over</span>
            </div>
            <div class="entity-label">{{ currentScenario().speakerLabel }}</div>
            @if (currentScenario().distance === 'near_speaker') {
              <div class="object-bubble">
                <span class="material-symbols-outlined icon-sm">inventory_2</span>
                @if (studyProgress.scriptMode() === 'hiragana') {
                  <span class="obj-name jp-text">{{ currentScenario().objectKana }}</span>
                } @else {
                  <ruby class="obj-name jp-text">
                    {{ getCleanName(currentScenario().objectName) }}
                    <rt class="obj-rt">{{ currentScenario().objectKana }}</rt>
                  </ruby>
                }
              </div>
            }
          </div>

          <!-- Spatial Connector line -->
          <div class="spatial-distance-meter">
            <div class="meter-line"></div>
            <span class="meter-desc">
              @switch (currentScenario().distance) {
                @case ('near_speaker') { Objeto pegado al Hablante }
                @case ('near_listener') { Objeto junto al Oyente }
                @case ('far_both') { Objeto distante de los dos }
              }
            </span>
          </div>

          <!-- Listener Area -->
          <div class="entity-zone" [class.has-object]="currentScenario().distance === 'near_listener'">
            <div class="avatar-icon">
              <span class="material-symbols-outlined avatar-symbol">hearing</span>
            </div>
            <div class="entity-label">{{ currentScenario().listenerLabel }}</div>
            @if (currentScenario().distance === 'near_listener') {
              <div class="object-bubble">
                <span class="material-symbols-outlined icon-sm">inventory_2</span>
                @if (studyProgress.scriptMode() === 'hiragana') {
                  <span class="obj-name jp-text">{{ currentScenario().objectKana }}</span>
                } @else {
                  <ruby class="obj-name jp-text">
                    {{ getCleanName(currentScenario().objectName) }}
                    <rt class="obj-rt">{{ currentScenario().objectKana }}</rt>
                  </ruby>
                }
              </div>
            }
          </div>

          <!-- Far Distance Area (when distant from both) -->
          @if (currentScenario().distance === 'far_both') {
            <div class="far-distance-zone">
              <div class="distance-sign">··· A la distancia ···</div>
              <div class="object-bubble far-bubble">
                <span class="material-symbols-outlined icon-sm">directions_car</span>
                @if (studyProgress.scriptMode() === 'hiragana') {
                  <span class="obj-name jp-text">{{ currentScenario().objectKana }}</span>
                } @else {
                  <ruby class="obj-name jp-text">
                    {{ getCleanName(currentScenario().objectName) }}
                    <rt class="obj-rt">{{ currentScenario().objectKana }}</rt>
                  </ruby>
                }
              </div>
            </div>
          }
        </div>

        <!-- Scenario Context and Question -->
        <div class="scenario-context">
          <div class="mode-badge">
            Tipo de palabra requerido: 
            <strong>{{ currentScenario().mode === 'pronoun' ? 'Pronombre independiente (これ/それ/あれ)' : 'Modificador de sustantivo (この/その/あの + S)' }}</strong>
          </div>
          <p class="context-text">{{ currentScenario().contextDescription }}</p>
        </div>

        <!-- Interactive Options -->
        <div class="options-wrapper">
          <div class="options-grid">
            @for (opt of currentScenario().options; track opt) {
              <button 
                type="button" 
                class="option-pill jp-serif"
                [class.selected]="selectedOption() === opt"
                [disabled]="isSubmitted()"
                (click)="selectOption(opt)">
                {{ opt }}
              </button>
            }
          </div>
        </div>

        <!-- Feedback -->
        @if (isSubmitted()) {
          <div class="feedback-panel" [class.is-correct]="isCorrect()" [class.is-wrong]="!isCorrect()">
            <div class="feedback-header">
              <span class="feedback-badge">
                <span class="material-symbols-outlined icon-inline">{{ isCorrect() ? 'check_circle' : 'cancel' }}</span>
                {{ isCorrect() ? '¡Respuesta Correcta!' : 'No es el demostrativo correcto' }}
              </span>
              <button type="button" class="audio-btn" (click)="speechService.speak(currentScenario().correctAnswer)">
                <span class="material-symbols-outlined">volume_up</span>
              </button>
            </div>
            <p class="feedback-explanation">
              <strong>Regla Minna no Nihongo:</strong> {{ currentScenario().explanation }}
            </p>
          </div>
        }

        <!-- Actions -->
        <div class="stage-footer">
          <button 
            type="button" 
            class="btn-secondary" 
            (click)="prevScenario()" 
            [disabled]="currentIndex() === 0">
            <span class="material-symbols-outlined">arrow_back</span>
            Anterior
          </button>

          @if (!isSubmitted()) {
            <button 
              type="button" 
              class="btn-primary" 
              [disabled]="selectedOption() === null" 
              (click)="submitChoice()">
              <span class="material-symbols-outlined">done</span>
              Confirmar elección
            </button>
          } @else {
            <button 
              type="button" 
              class="btn-primary" 
              (click)="nextScenario()"
              [disabled]="currentIndex() >= scenarios.length - 1">
              Siguiente escenario
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demonstrative-wrapper {
      max-width: 860px;
      margin: 1.5rem auto;
      padding: 0 1rem;
    }

    .module-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
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

    .scenarios-progress {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-muted);
      border: 1px solid var(--border-medium);
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      background-color: var(--bg-primary);
    }

    .schema-reference-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 0.85rem 1.25rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .schema-col {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .schema-tag {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .schema-pair {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .schema-divider {
      color: var(--text-muted);
      font-weight: 700;
    }

    .interactive-stage {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    /* Visual spatial layout */
    .stage-visual {
      background-color: var(--bg-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 2rem 1.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      min-height: 220px;
    }

    .entity-zone {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: var(--radius-md);
      border: 2px dashed transparent;
      min-width: 140px;
      transition: all 0.2s ease;
    }

    .entity-zone.has-object {
      border-color: var(--accent-black);
      background-color: var(--bg-primary);
      box-shadow: var(--shadow-subtle);
    }

    .avatar-icon {
      font-size: 2.4rem;
    }

    .entity-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-secondary);
    }

    .object-bubble {
      margin-top: 0.5rem;
      background-color: var(--accent-black);
      color: var(--text-inverted);
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.85rem;
      font-weight: 600;
      animation: popIn 0.2s ease;
    }

    .obj-rt {
      font-size: 0.6rem;
      color: var(--text-inverted);
      opacity: 0.85;
      display: block;
    }

    .spatial-distance-meter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
      flex: 1;
      max-width: 200px;
    }

    .meter-line {
      width: 100%;
      height: 2px;
      background: repeating-linear-gradient(to right, #000 0, #000 6px, transparent 6px, transparent 12px);
    }

    .meter-desc {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      text-align: center;
    }

    .far-distance-zone {
      position: absolute;
      top: 10px;
      right: 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
    }

    .distance-sign {
      font-size: 0.7rem;
      color: var(--text-muted);
      font-style: italic;
    }

    .far-bubble {
      background-color: #333;
    }

    .scenario-context {
      border-left: 3px solid var(--accent-black);
      padding-left: 1rem;
    }

    .mode-badge {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-bottom: 0.3rem;
    }

    .context-text {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.35;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .option-pill {
      height: 64px;
      font-size: 1.65rem;
      font-weight: 700;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      box-shadow: var(--shadow-subtle);
      transition: all 0.15s ease;
    }

    .option-pill:hover:not(:disabled):not(.selected) {
      background-color: var(--bg-secondary);
      transform: translateY(-2px);
    }

    .option-pill.selected {
      background-color: var(--accent-black);
      color: var(--text-inverted);
    }

    .option-pill.selected:hover:not(:disabled) {
      background-color: var(--accent-charcoal);
      border-color: var(--accent-charcoal);
      color: var(--text-inverted);
    }

    .feedback-panel {
      border-radius: var(--radius-md);
      padding: 1.25rem;
      animation: fadeIn 0.2s ease;
    }

    .feedback-panel.is-correct {
      background-color: var(--bg-secondary);
      border: 1px solid var(--accent-black);
    }

    .feedback-panel.is-wrong {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
    }

    .feedback-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .feedback-badge {
      font-weight: 700;
      font-size: 1rem;
    }

    .feedback-explanation {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }

    .stage-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    @keyframes popIn {
      from { transform: scale(0.85); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DemonstrativeTrainerComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly scenarios = DEMONSTRATIVE_SCENARIOS;
  readonly currentIndex = signal<number>(0);
  readonly selectedOption = signal<string | null>(null);
  readonly isSubmitted = signal<boolean>(false);

  readonly currentScenario = computed<DemonstrativeScenario>(() => {
    return this.scenarios[this.currentIndex()];
  });

  readonly isCorrect = computed(() => {
    return this.selectedOption() === this.currentScenario().correctAnswer;
  });

  selectOption(opt: string): void {
    if (this.isSubmitted()) return;
    this.selectedOption.set(opt);
  }

  submitChoice(): void {
    if (this.selectedOption() === null) return;
    this.isSubmitted.set(true);
    const correct = this.isCorrect();
    this.studyProgress.recordAnswer(correct);
    if (correct) {
      this.speechService.speak(this.currentScenario().correctAnswer);
    }
  }

  nextScenario(): void {
    if (this.currentIndex() < this.scenarios.length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedOption.set(null);
      this.isSubmitted.set(false);
    }
  }

  getCleanName(name: string): string {
    return name.split(' ')[0] || name;
  }

  prevScenario(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.selectedOption.set(null);
      this.isSubmitted.set(false);
    }
  }
}

