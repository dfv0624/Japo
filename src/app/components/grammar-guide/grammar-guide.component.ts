import { Component, computed, inject } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { GRAMMAR_DATA } from '../../data/lessons-data';
import { GrammarPoint } from '../../models/japanese.models';

@Component({
  selector: 'app-grammar-guide',
  template: `
    <div class="grammar-wrapper">
      <div class="module-header">
        <div>
          <span class="badge">Notas Gramaticales • 文法解説 (Bunpou Kaisetsu)</span>
          <h2 class="module-title">Guía de Conceptos Minna no Nihongo</h2>
          <p class="module-desc">Explicaciones claras y estructuradas con audio y desgloses paso a paso.</p>
        </div>
      </div>

      <div class="grammar-list">
        @for (point of filteredGrammar(); track point.id) {
          <article class="grammar-card">
            <!-- Pattern Header -->
            <div class="card-head">
              <div class="head-left">
                <span class="lesson-pill">Lección {{ point.lesson }}</span>
                <span class="pattern-badge jp-text">{{ point.pattern }}</span>
              </div>
              <h3 class="point-title">{{ point.title }}</h3>
            </div>

            <!-- Key Rule Box -->
            <div class="key-rule-box">
              <span class="material-symbols-outlined rule-icon">lightbulb</span>
              <span class="rule-text">{{ point.keyRule }}</span>
            </div>

            <!-- Detailed Explanation -->
            <p class="point-explanation">{{ point.explanation }}</p>

            <!-- Examples Table/Cards -->
            <div class="examples-section">
              <span class="examples-heading">Ejemplos modelo:</span>
              <div class="examples-stack">
                @for (ex of point.examples; track ex.jp) {
                  <div class="example-item">
                    <div class="example-top">
                      <div class="jp-line jp-serif">{{ studyProgress.scriptMode() === 'hiragana' ? ex.kana : ex.jp }}</div>
                      <button 
                        type="button" 
                        class="audio-btn" 
                        (click)="speechService.speak(ex.jp)"
                        title="Escuchar ejemplo">
                        <span class="material-symbols-outlined">volume_up</span>
                      </button>
                    </div>

                    @if (studyProgress.scriptMode() === 'furigana' && ex.kana && ex.kana !== ex.jp) {
                      <div class="grammar-kana-sub jp-text">{{ ex.kana }}</div>
                    }

                    @if (studyProgress.showRomaji()) {
                      <div class="romaji-line">{{ ex.romaji }}</div>
                    }

                    <div class="es-line">{{ ex.es }}</div>

                    @if (ex.breakdown) {
                      <div class="breakdown-tag">{{ ex.breakdown }}</div>
                    }
                  </div>
                }
              </div>
            </div>

            @if (point.tips && point.tips.length > 0) {
              <div class="tips-box">
                @for (tip of point.tips; track tip) {
                  <div class="tip-line">
                    <span class="material-symbols-outlined icon-inline">push_pin</span>
                    {{ tip }}
                  </div>
                }
              </div>
            }
          </article>
        }
      </div>
    </div>
  `,
  styles: [`
    .grammar-wrapper {
      max-width: 860px;
      margin: 1.5rem auto;
      padding: 0 1rem;
    }

    .module-header {
      margin-bottom: 1.5rem;
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

    .grammar-list {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .grammar-card {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 1.85rem;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .card-head {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border-bottom: 1px solid var(--border-light);
      padding-bottom: 1rem;
    }

    .head-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .lesson-pill {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
    }

    .pattern-badge {
      font-size: 0.95rem;
      font-weight: 700;
      background-color: var(--accent-black);
      color: var(--text-inverted);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-sm);
    }

    .point-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .key-rule-box {
      background-color: var(--bg-secondary);
      border-left: 3px solid var(--accent-black);
      padding: 0.85rem 1.15rem;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .rule-icon {
      font-size: 1.15rem;
    }

    .point-explanation {
      font-size: 0.96rem;
      color: var(--text-secondary);
      line-height: 1.6;
      white-space: pre-line;
    }

    .examples-section {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .examples-heading {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    .examples-stack {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .example-item {
      background-color: var(--bg-subtle);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .example-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .jp-line {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .grammar-kana-sub {
      font-size: 0.88rem;
      color: var(--text-muted);
      letter-spacing: 0.04em;
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

    .breakdown-tag {
      font-size: 0.8rem;
      color: var(--text-muted);
      background-color: var(--bg-primary);
      border: 1px solid var(--border-light);
      padding: 0.35rem 0.65rem;
      border-radius: var(--radius-sm);
      margin-top: 0.25rem;
    }

    .tips-box {
      font-size: 0.88rem;
      color: var(--text-secondary);
      background-color: var(--bg-subtle);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      padding: 0.75rem 1rem;
    }
  `]
})
export class GrammarGuideComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly filteredGrammar = computed(() => {
    const lesson = this.studyProgress.selectedLesson();
    return GRAMMAR_DATA.filter(g => lesson === 0 || g.lesson === lesson);
  });
}

