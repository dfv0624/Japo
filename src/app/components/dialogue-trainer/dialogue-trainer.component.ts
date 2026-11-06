import { Component, computed, inject, signal } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { DIALOGUE_SCENARIOS } from '../../data/lessons-data';
import { DialogueScenario, DialogueLine } from '../../models/japanese.models';

@Component({
  selector: 'app-dialogue-trainer',
  template: `
    <div class="dialogue-wrapper">
      <div class="module-header">
        <div>
          <span class="badge">Práctica Conversacional • 会話 (Kaiwa)</span>
          <h2 class="module-title">Diálogos Situacionales Reales</h2>
          <p class="module-desc">Escucha situaciones auténticas de Minna no Nihongo y participa en las respuestas.</p>
        </div>

        <div class="scenario-selector">
          @for (scen of scenarios; track scen.id; let idx = $index) {
            <button 
              type="button" 
              class="scen-tab"
              [class.active]="selectedScenarioIndex() === idx"
              (click)="selectScenario(idx)">
              Situación {{ idx + 1 }}
            </button>
          }
        </div>
      </div>

      <div class="dialogue-container">
        <!-- Scenario Info Banner -->
        <div class="dialogue-meta-banner">
          <div class="meta-title-row">
            <h3 class="meta-title">{{ currentScenario().title }}</h3>
            <button type="button" class="btn-outline btn-sm" (click)="playAllLines()">
              <span class="material-symbols-outlined icon-inline">play_arrow</span>
              Reproducir todo el diálogo
            </button>
          </div>
          <p class="meta-desc">{{ currentScenario().description }}</p>
        </div>

        <!-- Chat Bubble Thread -->
        <div class="chat-thread">
          @for (line of currentScenario().lines; track line.id; let lineIdx = $index) {
            <div class="chat-row" [class.is-interactive]="line.options && line.options.length > 0">
              <div class="speaker-meta">
                <span class="speaker-name">{{ line.speaker }}</span>
                <span class="speaker-role">{{ line.speakerRole }}</span>
              </div>

              <!-- Normal Dialogue Line -->
              @if (!line.options) {
                <div class="dialogue-bubble">
                  <div class="bubble-header">
                    <span class="jp-sentence jp-serif">{{ studyProgress.scriptMode() === 'hiragana' ? (line.kana || line.jp) : line.jp }}</span>
                    <button 
                      type="button" 
                      class="audio-btn" 
                      (click)="speechService.speak(line.jp)"
                      title="Escuchar audio">
                      <span class="material-symbols-outlined">volume_up</span>
                    </button>
                  </div>

                  @if (studyProgress.scriptMode() === 'furigana' && line.kana && line.kana !== line.jp) {
                    <div class="kana-furigana-sub jp-text">{{ line.kana }}</div>
                  }

                  @if (studyProgress.showRomaji()) {
                    <div class="romaji-line">{{ line.romaji }}</div>
                  }
                  <div class="es-line">{{ line.es }}</div>
                </div>
              } @else {
                <!-- Interactive Choice Row -->
                <div class="interactive-prompt-card">
                  <div class="prompt-instruction">
                    {{ line.jp }}
                  </div>

                  <div class="dialogue-options-list">
                    @for (opt of line.options; track opt.textJp; let optIdx = $index) {
                      <div class="option-item-wrap">
                        <button 
                          type="button" 
                          class="dialogue-choice-btn"
                          [class.chosen]="chosenOptionIndex() === optIdx"
                          [class.correct]="chosenOptionIndex() === optIdx && opt.isCorrect"
                          [class.wrong]="chosenOptionIndex() === optIdx && !opt.isCorrect"
                          (click)="chooseOption(optIdx, opt.isCorrect)">
                          <span class="choice-jp jp-text">{{ studyProgress.scriptMode() === 'hiragana' ? opt.textKana : opt.textJp }}</span>
                          <span class="choice-es">{{ opt.textEs }}</span>
                        </button>

                        @if (chosenOptionIndex() === optIdx) {
                          <div class="feedback-banner" [class.feedback-good]="opt.isCorrect" [class.feedback-bad]="!opt.isCorrect">
                            <span class="material-symbols-outlined icon-inline">{{ opt.isCorrect ? 'check_circle' : 'cancel' }}</span>
                            <span>{{ opt.feedback }}</span>
                            @if (opt.isCorrect) {
                              <button type="button" class="mini-audio" (click)="speechService.speak(opt.textJp)">
                                <span class="material-symbols-outlined">volume_up</span>
                              </button>
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialogue-wrapper {
      max-width: 860px;
      margin: 1.5rem auto;
      padding: 0 1rem;
    }

    .module-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
      gap: 1rem;
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

    .scenario-selector {
      display: flex;
      gap: 0.4rem;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      padding: 0.3rem;
      border-radius: var(--radius-sm);
    }

    .scen-tab {
      font-size: 0.82rem;
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      font-weight: 600;
    }

    .scen-tab.active {
      background-color: var(--accent-black);
      color: var(--text-inverted);
    }

    .dialogue-container {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      overflow: hidden;
    }

    .dialogue-meta-banner {
      background-color: var(--bg-subtle);
      border-bottom: 1px solid var(--border-light);
      padding: 1.25rem 1.5rem;
    }

    .meta-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.35rem;
    }

    .meta-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .btn-sm {
      padding: 0.35rem 0.75rem;
      font-size: 0.8rem;
    }

    .meta-desc {
      font-size: 0.88rem;
      color: var(--text-secondary);
    }

    /* Chat Thread */
    .chat-thread {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .chat-row {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .speaker-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .speaker-name {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .speaker-role {
      font-size: 0.72rem;
      color: var(--text-muted);
      border: 1px solid var(--border-light);
      padding: 0.1rem 0.4rem;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }

    .dialogue-bubble {
      background-color: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .bubble-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .jp-sentence {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.3;
    }

    .kana-furigana-sub {
      font-size: 0.88rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    .romaji-line {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-style: italic;
    }

    .es-line {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }

    /* Interactive choice card */
    .interactive-prompt-card {
      border: 2px dashed var(--accent-black);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      background-color: var(--bg-primary);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .prompt-instruction {
      font-weight: 700;
      font-size: 1.05rem;
      color: var(--text-primary);
    }

    .dialogue-options-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .dialogue-choice-btn {
      width: 100%;
      text-align: left;
      padding: 0.85rem 1.15rem;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      background-color: var(--bg-primary);
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      transition: all 0.15s ease;
    }

    .dialogue-choice-btn:hover:not(.chosen) {
      border-color: var(--accent-black);
      background-color: var(--bg-secondary);
    }

    .dialogue-choice-btn.chosen.correct {
      background-color: var(--accent-black);
      border-color: var(--accent-black);
      color: var(--text-inverted);
    }

    .dialogue-choice-btn.chosen.correct:hover {
      background-color: var(--accent-charcoal);
      border-color: var(--accent-charcoal);
      color: var(--text-inverted);
    }

    .dialogue-choice-btn.chosen.correct .choice-jp,
    .dialogue-choice-btn.chosen.correct .choice-es {
      color: var(--text-inverted);
    }

    .dialogue-choice-btn.chosen.wrong {
      border-color: #000;
      background-color: #f5f5f5;
    }

    .choice-jp {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .choice-es {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .feedback-banner {
      margin-top: 0.4rem;
      padding: 0.65rem 0.95rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .feedback-good {
      background-color: var(--bg-secondary);
      border: 1px solid var(--accent-black);
      font-weight: 600;
    }

    .feedback-bad {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
    }

    .mini-audio {
      background: none;
      border: none;
      font-size: 0.9rem;
      cursor: pointer;
    }
  `]
})
export class DialogueTrainerComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly scenarios = DIALOGUE_SCENARIOS;
  readonly selectedScenarioIndex = signal<number>(0);
  readonly chosenOptionIndex = signal<number | null>(null);

  readonly currentScenario = computed<DialogueScenario>(() => {
    return this.scenarios[this.selectedScenarioIndex()];
  });

  selectScenario(idx: number): void {
    this.selectedScenarioIndex.set(idx);
    this.chosenOptionIndex.set(null);
  }

  chooseOption(optIndex: number, isCorrect: boolean): void {
    this.chosenOptionIndex.set(optIndex);
    this.studyProgress.recordAnswer(isCorrect);
  }

  playAllLines(): void {
    const lines = this.currentScenario().lines.filter(l => !l.options);
    let i = 0;
    const playNext = () => {
      if (i < lines.length) {
        this.speechService.speak(lines[i].jp);
        i++;
        setTimeout(playNext, 2400);
      }
    };
    playNext();
  }
}

