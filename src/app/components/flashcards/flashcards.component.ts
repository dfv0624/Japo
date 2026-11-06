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
  selector: 'app-flashcards',
  template: `
    <div class="flashcards-wrapper">
      <!-- Category Filter & Meta bar (Only shows categories existing in the active lesson) -->
      <div class="deck-controls">
        <div class="category-filters">
          <button 
            type="button" 
            class="cat-chip" 
            [class.active]="effectiveCategory() === 'all'"
            (click)="setCategory('all')">
            Todas ({{ lessonCards().length }})
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

        <div class="deck-actions">
          <button type="button" class="btn-outline btn-sm" (click)="shuffleDeck()" title="Mezclar tarjetas aleatoriamente">
            <span class="material-symbols-outlined action-icon">shuffle</span>
            <span>Mezclar</span>
          </button>
          <button type="button" class="btn-outline btn-sm" (click)="resetDeck()" title="Volver al inicio">
            <span class="material-symbols-outlined action-icon">restart_alt</span>
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      <!-- Main Flashcard Container (Tablet Oriented) -->
      @if (currentCard(); as card) {
        <div class="card-stage">
          <!-- Card Progress -->
          <div class="stage-header">
            <span class="badge">Lección {{ card.lesson }} • {{ getCategoryLabel(card.category) }}</span>
            <span class="card-counter">{{ currentIndex() + 1 }} / {{ filteredCards().length }}</span>
            <button 
              type="button" 
              class="star-btn"
              [class.starred]="isStarred(card.id)"
              (click)="studyProgress.toggleStarred(card.id); $event.stopPropagation()"
              title="Guardar en favoritos">
              <span class="material-symbols-outlined">{{ isStarred(card.id) ? 'star' : 'star_border' }}</span>
            </button>
          </div>

          <!-- Flip Card -->
          <div 
            class="flashcard-3d" 
            [class.flipped]="isFlipped()" 
            (click)="toggleFlip()"
            role="button"
            tabindex="0"
            (keydown.space)="toggleFlip(); $event.preventDefault()"
            (keydown.enter)="toggleFlip(); $event.preventDefault()">
            
            <!-- Front Face: Japanese Core -->
            <div class="card-face card-front">
              <div class="face-top">
                <span class="tap-hint">
                  <span class="material-symbols-outlined icon-inline">sync</span>
                  Toca para girar
                </span>
                <button 
                  type="button" 
                  class="audio-btn" 
                  (click)="playAudio(card.kanji || card.kana); $event.stopPropagation()"
                  title="Escuchar pronunciación">
                  <span class="material-symbols-outlined">volume_up</span>
                </button>
              </div>

              <div class="face-center">
                @if (studyProgress.scriptMode() === 'hiragana') {
                  <div class="kanji-display jp-serif">{{ card.kana }}</div>
                } @else if (card.kanji) {
                  <div class="ruby-wrapper">
                    <ruby class="kanji-display jp-serif">
                      {{ card.kanji }}
                      <rt class="card-ruby-rt jp-text">{{ card.kana }}</rt>
                    </ruby>
                  </div>
                } @else {
                  <div class="kanji-display jp-serif">{{ card.kana }}</div>
                }

                @if (studyProgress.showRomaji()) {
                  <div class="romaji-display">{{ card.romaji }}</div>
                }
              </div>

              <div class="face-bottom">
                @if (isMastered(card.id)) {
                  <span class="mastered-pill">
                    <span class="material-symbols-outlined icon-inline">check</span>
                    Dominada
                  </span>
                } @else {
                  <span class="learn-pill">En aprendizaje</span>
                }
              </div>
            </div>

            <!-- Back Face: Spanish Translation & Examples -->
            <div class="card-face card-back">
              <div class="face-top">
                <span class="tap-hint">
                  <span class="material-symbols-outlined icon-inline">sync</span>
                  Volver al frente
                </span>
                <button 
                  type="button" 
                  class="audio-btn" 
                  (click)="playAudio(card.kanji || card.kana); $event.stopPropagation()"
                  title="Escuchar de nuevo">
                  <span class="material-symbols-outlined">volume_up</span>
                </button>
              </div>

              <div class="face-center">
                <div class="spanish-meaning">{{ card.spanish }}</div>
                <div class="reading-recap jp-text">{{ card.kana }} ({{ card.romaji }})</div>

                @if (card.notes) {
                  <div class="card-notes">
                    <strong>Nota:</strong> {{ card.notes }}
                  </div>
                }

                @if (card.examples && card.examples.length > 0) {
                  <div class="example-box">
                    <div class="example-header">
                      <span>Ejemplo en contexto:</span>
                      <button 
                        type="button" 
                        class="example-audio" 
                        (click)="playAudio(card.examples[0].jp); $event.stopPropagation()">
                        <span class="material-symbols-outlined">volume_up</span>
                      </button>
                    </div>
                    <div class="example-jp jp-text">{{ card.examples[0].jp }}</div>
                    @if (studyProgress.showRomaji()) {
                      <div class="example-romaji">{{ card.examples[0].romaji }}</div>
                    }
                    <div class="example-es">{{ card.examples[0].es }}</div>
                  </div>
                }
              </div>

              <div class="face-bottom">
                <button 
                  type="button" 
                  class="btn-master"
                  [class.is-master]="isMastered(card.id)"
                  (click)="toggleMastery(card.id); $event.stopPropagation()">
                  <span class="material-symbols-outlined icon-inline">{{ isMastered(card.id) ? 'check_circle' : 'radio_button_unchecked' }}</span>
                  {{ isMastered(card.id) ? 'Marcada como dominada' : 'Marcar como dominada' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Nav Controls -->
          <div class="stage-nav">
            <button 
              type="button" 
              class="nav-btn prev-btn" 
              (click)="prevCard()"
              [disabled]="currentIndex() === 0">
              <span class="material-symbols-outlined">arrow_back</span>
              Anterior
            </button>

            <button 
              type="button" 
              class="btn-primary flip-action-btn"
              (click)="toggleFlip()">
              <span class="material-symbols-outlined">flip</span>
              {{ isFlipped() ? 'Ver frente' : 'Girar tarjeta' }}
            </button>

            <button 
              type="button" 
              class="nav-btn next-btn" 
              (click)="nextCard()"
              [disabled]="currentIndex() >= filteredCards().length - 1">
              Siguiente
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      } @else {
        <div class="empty-state">
          <p>No se encontraron tarjetas con los filtros actuales.</p>
          <button type="button" class="btn-secondary" (click)="setCategory('all')">Restablecer filtros</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .flashcards-wrapper {
      max-width: 820px;
      margin: 1.5rem auto;
      padding: 0 1rem;
    }

    .deck-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .category-filters {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
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

    .cat-chip:hover:not(.active) {
      border-color: var(--text-primary);
      color: var(--text-primary);
    }

    .cat-chip.active {
      background-color: var(--accent-black);
      color: var(--text-inverted);
      border-color: var(--accent-black);
    }

    .cat-chip.active:hover {
      background-color: var(--accent-charcoal);
      border-color: var(--accent-charcoal);
      color: var(--text-inverted);
    }

    .deck-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-icon {
      font-size: 16px;
    }

    .btn-sm {
      padding: 0.35rem 0.65rem;
      font-size: 0.8rem;
    }

    .card-stage {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.5rem;
    }

    .card-counter {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .star-btn {
      color: var(--text-muted);
      cursor: pointer;
      background: none;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .star-btn.starred {
      color: #121212;
    }

    /* 3D Flashcard */
    .flashcard-3d {
      width: 100%;
      min-height: 380px;
      perspective: 1200px;
      position: relative;
      cursor: pointer;
    }

    .card-face {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: var(--shadow-card);
      backface-visibility: hidden;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-front {
      transform: rotateY(0deg);
    }

    .flashcard-3d.flipped .card-front {
      transform: rotateY(-180deg);
    }

    .card-back {
      transform: rotateY(180deg);
      background-color: var(--bg-subtle);
    }

    .flashcard-3d.flipped .card-back {
      transform: rotateY(0deg);
    }

    .face-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tap-hint {
      font-size: 0.78rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
    }

    .icon-inline {
      font-size: 16px;
      vertical-align: middle;
    }

    .face-center {
      text-align: center;
      margin: auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .kanji-display {
      font-size: 3.2rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: 0.05em;
      line-height: 1.15;
    }

    .ruby-wrapper {
      display: inline-flex;
      justify-content: center;
    }

    .card-ruby-rt {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--text-secondary);
      letter-spacing: 0.08em;
      margin-bottom: 0.35rem;
      line-height: 1.2;
    }

    .romaji-display {
      font-size: 1rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      font-style: italic;
    }

    .face-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mastered-pill {
      font-size: 0.75rem;
      background-color: #000;
      color: #fff;
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .learn-pill {
      font-size: 0.75rem;
      border: 1px solid var(--border-medium);
      color: var(--text-muted);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
    }

    /* Back Face Styles */
    .spanish-meaning {
      font-size: 1.85rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.25;
    }

    .reading-recap {
      font-size: 1rem;
      color: var(--text-secondary);
    }

    .card-notes {
      font-size: 0.88rem;
      color: var(--text-secondary);
      background-color: var(--bg-primary);
      border: 1px solid var(--border-light);
      padding: 0.6rem 1rem;
      border-radius: var(--radius-sm);
      max-width: 520px;
      line-height: 1.4;
    }

    .example-box {
      margin-top: 0.5rem;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-md);
      padding: 0.85rem 1.2rem;
      text-align: left;
      width: 100%;
      max-width: 540px;
    }

    .example-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 0.4rem;
    }

    .example-audio {
      background: none;
      border: none;
      font-size: 0.9rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }

    .example-jp {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .example-romaji {
      font-size: 0.82rem;
      color: var(--text-muted);
      font-style: italic;
    }

    .example-es {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin-top: 0.2rem;
    }

    .btn-master {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-strong);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-weight: 600;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
    }

    .btn-master:hover:not(.is-master) {
      background-color: var(--bg-secondary);
      border-color: var(--accent-black);
    }

    .btn-master.is-master {
      background-color: var(--accent-black);
      color: var(--text-inverted);
      border-color: var(--accent-black);
    }

    .btn-master.is-master:hover {
      background-color: var(--accent-charcoal);
      border-color: var(--accent-charcoal);
      color: var(--text-inverted);
    }

    /* Nav bar at bottom */
    .stage-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .nav-btn {
      flex: 1;
      padding: 0.85rem 1.25rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-medium);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.92rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }

    .nav-btn:hover:not(:disabled) {
      border-color: var(--accent-black);
      background-color: var(--bg-secondary);
    }

    .flip-action-btn {
      flex: 1.2;
      padding: 0.85rem 1.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      background-color: var(--bg-primary);
      border: 1px dashed var(--border-medium);
      border-radius: var(--radius-lg);
    }
  `]
})
export class FlashcardsComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  readonly rawCategory = signal<string>('all');
  readonly currentIndex = signal<number>(0);
  readonly isFlipped = signal<boolean>(false);
  private readonly shuffledCards = signal<VocabularyItem[]>([]);
  private readonly isShuffled = signal<boolean>(false);

  // All cards for active lesson
  readonly lessonCards = computed(() => {
    const selectedLesson = this.studyProgress.selectedLesson();
    return VOCABULARY_DATA.filter(c => selectedLesson === 0 || c.lesson === selectedLesson);
  });

  // Dynamically derived categories ONLY for the currently selected lesson
  readonly availableCategories = computed<CategoryOption[]>(() => {
    const cards = this.lessonCards();
    const categoriesPresent = new Set(cards.map(c => c.category));

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

  // Effective category ensures if a category does not exist in this lesson, it falls back to 'all'
  readonly effectiveCategory = computed(() => {
    const current = this.rawCategory();
    if (current === 'all') return 'all';
    const exists = this.availableCategories().some(c => c.key === current);
    return exists ? current : 'all';
  });

  readonly filteredCards = computed(() => {
    const cat = this.effectiveCategory();
    const source = this.isShuffled() ? this.shuffledCards() : this.lessonCards();

    if (cat === 'all') {
      return source;
    }
    return source.filter(card => card.category === cat);
  });

  readonly currentCard = computed(() => {
    const list = this.filteredCards();
    if (list.length === 0) return null;
    const index = Math.min(this.currentIndex(), list.length - 1);
    return list[index] || null;
  });

  getCategoryLabel(categoryKey: string): string {
    return CATEGORY_LABELS[categoryKey] || categoryKey;
  }

  setCategory(cat: string): void {
    this.rawCategory.set(cat);
    this.currentIndex.set(0);
    this.isFlipped.set(false);
  }

  toggleFlip(): void {
    this.isFlipped.update(f => !f);
  }

  nextCard(): void {
    if (this.currentIndex() < this.filteredCards().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.isFlipped.set(false);
    }
  }

  prevCard(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
      this.isFlipped.set(false);
    }
  }

  shuffleDeck(): void {
    const array = [...this.lessonCards()];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.shuffledCards.set(array);
    this.isShuffled.set(true);
    this.currentIndex.set(0);
    this.isFlipped.set(false);
  }

  resetDeck(): void {
    this.isShuffled.set(false);
    this.currentIndex.set(0);
    this.isFlipped.set(false);
  }

  isMastered(id: string): boolean {
    return this.studyProgress.masteredWordIds().has(id);
  }

  isStarred(id: string): boolean {
    return this.studyProgress.starredWordIds().has(id);
  }

  toggleMastery(id: string): void {
    this.studyProgress.toggleMastered(id);
  }

  playAudio(text: string): void {
    this.speechService.speak(text);
  }
}
