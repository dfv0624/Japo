import { Component, computed, inject, output, signal } from '@angular/core';
import { SpeechService } from '../../../services/speech.service';
import { WritingCategory } from '../../../models/japanese.models';
import {
  KOSOADO_MATRIX,
  KOSOADO_PREFIXES,
  KOSOADO_SERIES,
  KosoadoEntry,
  PARTICLE_BLUEPRINTS,
  ParticleBlueprint,
  WORD_BUILDING_RECIPES
} from '../../../data/writing-data';

@Component({
  selector: 'app-word-lab',
  template: `
    <div class="word-lab-wrapper">
      <!-- 1. Constructor Interactivo Ko-So-A-Do -->
      <section class="lab-card" aria-labelledby="kosoado-lab-heading">
        <div class="lab-card-header">
          <div>
            <span class="badge">Sistema Ko-So-A-Do • 指示詞</span>
            <h3 id="kosoado-lab-heading" class="lab-title">
              ¿Cómo se forman これ, それ, あれ y sus familias?
            </h3>
            <p class="lab-subtitle">
              Combina una raíz de distancia (こ・そ・あ・ど) con una función para ver la palabra resultante y cómo usarla.
            </p>
          </div>
          <button
            type="button"
            class="btn-primary"
            (click)="practiceTopic.emit('kosoado')">
            <span class="material-symbols-outlined">edit</span>
            Practicar Ko-So-A-Do
          </button>
        </div>

        <div class="kosoado-builder">
          <div class="builder-columns">
            <div class="selector-col">
              <span class="col-label">1. Elige la distancia:</span>
              <div class="option-list">
                @for (pref of prefixes; track pref.key) {
                  <button
                    type="button"
                    class="builder-btn"
                    [class.active]="selectedPrefix() === pref.key"
                    (click)="setPrefix(pref.key)">
                    <span class="btn-main jp-serif">{{ pref.label }}</span>
                    <span class="btn-sub">{{ pref.sublabel }}</span>
                  </button>
                }
              </div>
            </div>

            <div class="selector-col">
              <span class="col-label">2. Elige qué señalas:</span>
              <div class="option-list">
                @for (ser of series; track ser.key) {
                  <button
                    type="button"
                    class="builder-btn"
                    [class.active]="selectedSeries() === ser.key"
                    (click)="setSeries(ser.key)">
                    <span class="btn-main jp-serif">{{ ser.label }}</span>
                    <span class="btn-sub">{{ ser.sublabel }}</span>
                  </button>
                }
              </div>
            </div>
          </div>

          <!-- Resultado en vivo -->
          @if (activeKosoado(); as entry) {
            <div class="kosoado-result" aria-live="polite">
              <div class="result-top">
                <div>
                  <div class="result-word jp-serif">{{ entry.word }}</div>
                  <div class="result-romaji">{{ entry.romaji }}</div>
                </div>
                <div class="result-actions">
                  @if (entry.isIrregular) {
                    <span class="badge badge-inverted">Forma irregular</span>
                  }
                  <button
                    type="button"
                    class="audio-btn"
                    (click)="speechService.speak(entry.exampleKana)"
                    title="Escuchar oración de ejemplo"
                    aria-label="Escuchar oración de ejemplo">
                    <span class="material-symbols-outlined">volume_up</span>
                  </button>
                </div>
              </div>

              <div class="result-meaning">{{ entry.meaning }}</div>
              <p class="result-rule">{{ entry.grammarNote }}</p>

              <div class="result-example-box">
                <div class="ex-jp jp-serif">{{ entry.exampleJp }}</div>
                <div class="ex-kana">{{ entry.exampleKana }} · {{ entry.exampleRomaji }}</div>
                <div class="ex-es">{{ entry.exampleEs }}</div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- 2. Mapa de Partículas Esenciales -->
      <section class="lab-card" aria-labelledby="particles-lab-heading">
        <div class="lab-card-header">
          <div>
            <span class="badge">Partículas Esenciales • 助詞</span>
            <h3 id="particles-lab-heading" class="lab-title">
              ¿Qué hace cada partícula y cómo se escribe?
            </h3>
            <p class="lab-subtitle">
              En japonés las partículas van DESPUÉS de la palabra que marcan. Toca una partícula para ver su tecla y regla.
            </p>
          </div>
          <button
            type="button"
            class="btn-primary"
            (click)="practiceTopic.emit('particles')">
            <span class="material-symbols-outlined">edit</span>
            Practicar Partículas
          </button>
        </div>

        <div class="particle-tabs" role="tablist" aria-label="Seleccionar partícula">
          @for (item of particles; track item.particle) {
            <button
              type="button"
              role="tab"
              class="particle-tab jp-serif"
              [class.active]="selectedParticle() === item.particle"
              [attr.aria-selected]="selectedParticle() === item.particle"
              (click)="selectParticle(item.particle)">
              {{ item.particle }}
            </button>
          }
        </div>

        @if (activeParticle(); as p) {
          <div class="particle-detail" aria-live="polite">
            <div class="particle-detail-top">
              <div>
                <h4 class="particle-name">{{ p.title }}</h4>
                <div class="particle-badges">
                  <span class="badge">{{ p.imeKey }}</span>
                  <span class="badge">{{ p.pronunciation }}</span>
                </div>
              </div>
              <button
                type="button"
                class="audio-btn"
                (click)="speechService.speak(p.exampleKana)"
                aria-label="Escuchar ejemplo de partícula">
                <span class="material-symbols-outlined">volume_up</span>
              </button>
            </div>

            <div class="formula-pill">{{ p.formula }}</div>
            <p class="particle-summary">{{ p.summary }}</p>

            <div class="result-example-box">
              <div class="ex-jp jp-serif">{{ p.exampleJp }}</div>
              <div class="ex-kana">{{ p.exampleKana }} · {{ p.exampleRomaji }}</div>
              <div class="ex-es">{{ p.exampleEs }}</div>
            </div>

            <div class="mistake-alert">
              <span class="material-symbols-outlined">info</span>
              <span><strong>Ojo al escribir:</strong> {{ p.commonMistake }}</span>
            </div>
          </div>
        }
      </section>

      <!-- 3. Cómo Armar Palabras y Bloques -->
      <section class="lab-card" aria-labelledby="word-building-heading">
        <div class="lab-card-header">
          <div>
            <span class="badge">Morfología • 言葉の作り方</span>
            <h3 id="word-building-heading" class="lab-title">
              Recetas para armar palabras nuevas
            </h3>
            <p class="lab-subtitle">
              Aprende a unir raíces, prefijos de cortesía y sufijos para formar nacionalidades, idiomas y posesivos.
            </p>
          </div>
          <button
            type="button"
            class="btn-primary"
            (click)="practiceTopic.emit('word_building')">
            <span class="material-symbols-outlined">edit</span>
            Practicar Armar Palabras
          </button>
        </div>

        <div class="recipes-grid">
          @for (recipe of recipes; track recipe.id) {
            <article class="recipe-card">
              <div class="recipe-top">
                <h4 class="recipe-title">{{ recipe.title }}</h4>
                <button
                  type="button"
                  class="audio-btn"
                  (click)="speechService.speak(recipe.resultKana)"
                  [attr.aria-label]="'Escuchar ' + recipe.resultKana">
                  <span class="material-symbols-outlined">volume_up</span>
                </button>
              </div>
              <div class="recipe-pattern">{{ recipe.pattern }}</div>
              <p class="recipe-desc">{{ recipe.explanation }}</p>

              <div class="recipe-blocks">
                @for (part of recipe.parts; track $index) {
                  <div class="recipe-block">
                    <span class="block-value jp-serif">{{ part.value }}</span>
                    <span class="block-role">{{ part.role }}</span>
                  </div>
                  @if ($index < recipe.parts.length - 1) {
                    <span class="block-plus">+</span>
                  }
                }
                <span class="block-plus">=</span>
                <div class="recipe-result">
                  <span class="result-jp jp-serif">{{ recipe.resultJp }}</span>
                  <span class="result-es">{{ recipe.resultEs }}</span>
                </div>
              </div>
            </article>
          }
        </div>
      </section>
    </div>
  `,
  styleUrl: './word-lab.component.css'
})
export class WordLabComponent {
  protected readonly speechService = inject(SpeechService);

  readonly practiceTopic = output<WritingCategory>();

  readonly prefixes = KOSOADO_PREFIXES;
  readonly series = KOSOADO_SERIES;
  readonly particles = PARTICLE_BLUEPRINTS;
  readonly recipes = WORD_BUILDING_RECIPES;

  readonly selectedPrefix = signal<'ko' | 'so' | 'a' | 'do'>('ko');
  readonly selectedSeries = signal<'re' | 'no' | 'koko' | 'chira'>('re');
  readonly selectedParticle = signal<'は' | 'の' | 'も' | 'か' | 'を'>('は');

  readonly activeKosoado = computed<KosoadoEntry | undefined>(() => {
    const p = this.selectedPrefix();
    const s = this.selectedSeries();
    return KOSOADO_MATRIX.find(entry => entry.prefix === p && entry.series === s);
  });

  readonly activeParticle = computed<ParticleBlueprint | undefined>(() => {
    const target = this.selectedParticle();
    return PARTICLE_BLUEPRINTS.find(item => item.particle === target);
  });

  setPrefix(key: string): void {
    if (key === 'ko' || key === 'so' || key === 'a' || key === 'do') {
      this.selectedPrefix.set(key);
    }
  }

  setSeries(key: string): void {
    if (key === 're' || key === 'no' || key === 'koko' || key === 'chira') {
      this.selectedSeries.set(key);
    }
  }

  selectParticle(p: 'は' | 'の' | 'も' | 'か' | 'を'): void {
    this.selectedParticle.set(p);
  }
}

