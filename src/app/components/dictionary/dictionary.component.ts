import { Component, computed, inject, signal } from '@angular/core';
import { StudyProgressService } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { VOCABULARY_DATA } from '../../data/lessons-data';
import { VocabularyItem } from '../../models/japanese.models';

interface CategoryOption {
  key: string;
  label: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  persona: 'Personas',
  profesion: 'Profesiones',
  pais: 'Países',
  objeto: 'Objetos',
  demostrativo: 'Demostrativos',
  expresion: 'Expresiones',
  lugar: 'Lugares',
  otro: 'Otros'
};

@Component({
  selector: 'app-dictionary',
  template: `
    <div class="dictionary-wrapper">
      <div class="module-header">
        <div>
          <span class="badge">Glosario Completo • 単語一覧 (Tango Ichiran)</span>
          <h2 class="module-title">Vocabulario</h2>
          <p class="module-desc">Consulta rápida con pronunciación en audio y ejemplos de uso.</p>
        </div>

        <div class="search-box">
          <span class="material-symbols-outlined search-icon">search</span>
          <input 
            type="search" 
            class="search-input"
            placeholder="Buscar en español, kanji, kana o romaji..."
            [value]="searchTerm()"
            (input)="onSearchInput($event)"
            aria-label="Buscar vocabulario" />
          @if (searchTerm()) {
            <button type="button" class="clear-search" (click)="clearSearch()">
              <span class="material-symbols-outlined">close</span>
            </button>
          }
        </div>
      </div>

      <!-- Quick category chips (Dynamic per active lesson) -->
      <div class="category-bar">
        <button 
          type="button" 
          class="cat-chip" 
          [class.active]="effectiveCategory() === 'all'" 
          (click)="setCategory('all')">
          Todos ({{ lessonVocabulary().length }})
        </button>

        @for (cat of availableCategories(); track cat.key) {
          <button 
            type="button" 
            class="cat-chip" 
            [class.active]="effectiveCategory() === cat.key" 
            (click)="setCategory(cat.key)">
            {{ cat.label }}
          </button>
        }
      </div>

      <!-- Words Grid (Tablet-Optimized) -->
      <div class="words-grid">
        @for (item of filteredVocabulary(); track item.id) {
          <div class="word-card">
            <div class="card-top-row">
              <span class="lesson-tag">L{{ item.lesson }}</span>
              <button 
                type="button" 
                class="star-icon-btn" 
                [class.starred]="isStarred(item.id)"
                (click)="studyProgress.toggleStarred(item.id)"
                title="Favorito">
                <span class="material-symbols-outlined">{{ isStarred(item.id) ? 'star' : 'star_border' }}</span>
              </button>
            </div>

            <div class="card-main">
              <div class="jp-pair">
                @if (studyProgress.scriptMode() === 'hiragana') {
                  <span class="word-kanji jp-serif">{{ item.kana }}</span>
                } @else if (item.kanji) {
                  <ruby class="word-kanji jp-serif">
                    {{ item.kanji }}
                    <rt class="dict-ruby-rt jp-text">{{ item.kana }}</rt>
                  </ruby>
                } @else {
                  <span class="word-kanji jp-serif">{{ item.kana }}</span>
                }
              </div>

              @if (studyProgress.showRomaji()) {
                <span class="word-romaji">{{ item.romaji }}</span>
              }

              <div class="word-spanish">{{ item.spanish }}</div>

              @if (item.notes) {
                <div class="word-note">{{ item.notes }}</div>
              }
            </div>

            <div class="card-bottom-row">
              <span class="category-name">{{ getCategoryLabel(item.category) }}</span>
              <button 
                type="button" 
                class="audio-btn" 
                (click)="speechService.speak(item.kanji || item.kana)"
                title="Pronunciar">
                <span class="material-symbols-outlined">volume_up</span>
              </button>
            </div>
          </div>
        } @empty {
          <div class="no-results">
            <p>No se encontraron palabras que coincidan con "{{ searchTerm() }}".</p>
            <button type="button" class="btn-secondary" (click)="clearSearch()">Borrar búsqueda</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dictionary-wrapper {
      max-width: var(--tablet-container);
      margin: 1.5rem auto;
      padding: 0 1rem;
    }

    .module-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .search-box {
      display: flex;
      align-items: center;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 0.45rem 0.85rem;
      min-width: 320px;
      gap: 0.5rem;
    }

    .search-icon {
      font-size: 20px;
      color: var(--text-muted);
    }

    .search-input {
      border: none;
      background: none;
      outline: none;
      font-family: inherit;
      font-size: 0.92rem;
      width: 100%;
      color: var(--text-primary);
    }

    .clear-search {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }

    .clear-search .material-symbols-outlined {
      font-size: 18px;
    }

    .category-bar {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .cat-chip {
      font-size: 0.8rem;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-medium);
      background-color: var(--bg-primary);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .cat-chip.active {
      background-color: var(--accent-black);
      color: var(--text-inverted);
      border-color: var(--accent-black);
    }

    .words-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }

    .word-card {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.75rem;
      box-shadow: var(--shadow-subtle);
      transition: all 0.15s ease;
    }

    .word-card:hover {
      border-color: var(--accent-black);
      box-shadow: var(--shadow-card);
    }

    .card-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .lesson-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-light);
      padding: 0.15rem 0.45rem;
      border-radius: var(--radius-sm);
    }

    .star-icon-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }

    .star-icon-btn .material-symbols-outlined {
      font-size: 20px;
    }

    .star-icon-btn.starred {
      color: var(--accent-black);
    }

    .card-main {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .jp-pair {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .word-kanji {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.3;
    }

    .dict-ruby-rt {
      font-size: 0.72rem;
      color: var(--text-secondary);
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .word-kana {
      font-size: 1rem;
      color: var(--text-secondary);
    }

    .word-romaji {
      font-size: 0.82rem;
      color: var(--text-muted);
      font-style: italic;
    }

    .word-spanish {
      font-size: 0.98rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-top: 0.35rem;
      line-height: 1.3;
    }

    .word-note {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
      line-height: 1.3;
    }

    .card-bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-light);
      padding-top: 0.65rem;
      margin-top: 0.25rem;
    }

    .category-name {
      font-size: 0.72rem;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--text-muted);
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem 1rem;
      background-color: var(--bg-primary);
      border: 1px dashed var(--border-medium);
      border-radius: var(--radius-lg);
    }
  `]
})
export class DictionaryComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly searchTerm = signal<string>('');
  readonly rawCategory = signal<string>('all');

  readonly lessonVocabulary = computed(() => {
    const lesson = this.studyProgress.selectedLesson();
    return VOCABULARY_DATA.filter(item => lesson === 0 || item.lesson === lesson);
  });

  readonly availableCategories = computed<CategoryOption[]>(() => {
    const words = this.lessonVocabulary();
    const categoriesPresent = new Set(words.map(w => w.category));

    const options: CategoryOption[] = [];
    for (const key of Object.keys(CATEGORY_LABELS)) {
      if (categoriesPresent.has(key as VocabularyItem['category'])) {
        options.push({
          key,
          label: CATEGORY_LABELS[key] || key
        });
      }
    }
    return options;
  });

  readonly effectiveCategory = computed(() => {
    const current = this.rawCategory();
    if (current === 'all') return 'all';
    const exists = this.availableCategories().some(c => c.key === current);
    return exists ? current : 'all';
  });

  readonly filteredVocabulary = computed<VocabularyItem[]>(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const category = this.effectiveCategory();
    const words = this.lessonVocabulary();

    return words.filter(item => {
      const matchCat = category === 'all' || item.category === category;
      if (!matchCat) return false;

      if (!query) return true;

      const inSpanish = item.spanish.toLowerCase().includes(query);
      const inKana = item.kana.includes(query);
      const inKanji = item.kanji?.includes(query);
      const inRomaji = item.romaji.toLowerCase().includes(query);

      return inSpanish || inKana || !!inKanji || inRomaji;
    });
  });

  getCategoryLabel(categoryKey: string): string {
    return CATEGORY_LABELS[categoryKey] || categoryKey;
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchTerm.set(val);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  setCategory(cat: string): void {
    this.rawCategory.set(cat);
  }

  isStarred(id: string): boolean {
    return this.studyProgress.starredWordIds().has(id);
  }
}
