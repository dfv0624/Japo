import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { StudyProgressService, LessonFilter } from '../../services/study-progress.service';
import { SpeechService } from '../../services/speech.service';
import { DisplayMode } from '../../models/japanese.models';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage],
  template: `
    <header class="app-header">
      <div class="header-container">
        <!-- Logo and Title -->
        <a 
          href="/" 
          class="branding" 
          (click)="goHome($event)" 
          title="Volver a la página principal"
          aria-label="Volver a la página principal">
          <img ngSrc="logo.png" width="42" height="42" alt="Logo de Japo" class="app-logo" priority />
          <div class="title-wrap">
            <h1 class="app-title">みんなの日本語 <span class="sub-title">Minna no Nihongo</span></h1>
            <p class="app-desc">Aprendizaje Interactivo</p>
          </div>
        </a>

        <!-- Right Header Area: Lessons on Top, Controls Below -->
        <div class="header-right-area">
          <!-- Lesson Filter (Top Row) -->
          <div class="lesson-selector" role="group" aria-label="Selección de Lección">
            <button 
              type="button"
              class="filter-pill"
              [class.active]="studyProgress.selectedLesson() === 0"
              (click)="setLesson(0)">
              Todas
            </button>
            <button 
              type="button"
              class="filter-pill"
              [class.active]="studyProgress.selectedLesson() === 1"
              (click)="setLesson(1)">
              Lección 1
            </button>
            <button 
              type="button"
              class="filter-pill"
              [class.active]="studyProgress.selectedLesson() === 2"
              (click)="setLesson(2)">
              Lección 2
            </button>
            <button 
              type="button"
              class="filter-pill"
              [class.active]="studyProgress.selectedLesson() === 3"
              (click)="setLesson(3)">
              Lección 3
            </button>
          </div>

          <!-- Subrow: Audio, Script Mode, and Romaji Toggles on the right under the lessons -->
          <div class="header-subrow-toggles" role="group" aria-label="Opciones de audio y lectura">
            <!-- Audio Speed Toggle -->
            <button 
              type="button" 
              class="control-btn audio-speed-btn"
              [class.active]="speechService.isSlow()"
              (click)="speechService.toggleSpeed()"
              title="Velocidad de pronunciación: {{ speechService.isSlow() ? 'Lenta (0.75x)' : 'Normal (1.0x)' }}">
              <span class="material-symbols-outlined icon">volume_up</span>
              <span class="btn-label">{{ speechService.isSlow() ? '0.75x Lento' : '1.0x Normal' }}</span>
            </button>

            <!-- Script Mode Toggle (Furigana vs Solo Hiragana) -->
            <button 
              type="button" 
              class="control-btn script-toggle-btn"
              [class.active]="studyProgress.scriptMode() === 'hiragana'"
              (click)="studyProgress.toggleScriptMode()"
              title="Alternar entre Kanji con lectura Furigana arriba o Solo Hiragana">
              <span class="material-symbols-outlined icon-toggle">translate</span>
              <span class="btn-label">{{ studyProgress.scriptMode() === 'furigana' ? 'Kanji + Furigana' : 'Solo Hiragana' }}</span>
            </button>

            <!-- Romaji Toggle -->
            <button 
              type="button" 
              class="control-btn romaji-toggle-btn"
              [class.active]="studyProgress.showRomaji()"
              (click)="studyProgress.toggleRomaji()"
              title="Alternar visualización de Romaji">
              <span class="material-symbols-outlined icon-toggle">font_download</span>
              <span class="btn-label">Romaji: {{ studyProgress.showRomaji() ? 'ON' : 'OFF' }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background-color: var(--bg-primary);
      border-bottom: 1px solid var(--border-light);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-subtle);
    }

    .header-container {
      max-width: var(--tablet-container);
      margin: 0 auto;
      padding: 0.85rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    .branding {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: opacity 0.15s ease;
    }

    .branding:hover {
      opacity: 0.85;
    }

    .branding:focus-visible {
      outline: 2px solid var(--accent-black);
      outline-offset: 3px;
    }

    .branding:hover .app-logo {
      transform: scale(1.06);
    }

    .branding:active .app-logo {
      transform: scale(0.96);
    }

    .app-logo {
      width: 42px;
      height: 42px;
      object-fit: contain;
      border-radius: var(--radius-sm);
      display: block;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .title-wrap {
      display: flex;
      flex-direction: column;
    }

    .app-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sub-title {
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--text-muted);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .app-desc {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .lesson-selector {
      display: flex;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-medium);
      padding: 3px;
      border-radius: var(--radius-full);
      gap: 2px;
    }

    .filter-pill {
      font-size: 0.82rem;
      font-weight: 500;
      padding: 0.4rem 0.95rem;
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .filter-pill:hover:not(.active) {
      color: var(--text-primary);
      background-color: var(--bg-tertiary);
    }

    .filter-pill.active {
      background-color: var(--accent-black);
      color: var(--text-inverted);
    }

    .filter-pill.active:hover {
      background-color: var(--accent-charcoal);
      color: var(--text-inverted);
    }

    .header-right-area {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .header-subrow-toggles {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    .control-btn {
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.38rem 0.8rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-medium);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      white-space: nowrap;
      width: auto !important;
      min-width: fit-content;
      height: auto;
      min-height: 32px;
      box-sizing: border-box;
      transition: all 0.15s ease;
    }

    .control-btn .icon,
    .control-btn .icon-toggle {
      font-size: 1.05rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .control-btn:hover:not(.active) {
      border-color: var(--accent-black);
      background-color: var(--bg-secondary);
    }

    .control-btn.active {
      border-color: var(--accent-black);
      background-color: var(--bg-tertiary);
      font-weight: 600;
    }

    .control-btn.active:hover {
      border-color: var(--accent-black);
      background-color: var(--border-light);
    }

    @media (max-width: 900px) {
      .header-container {
        padding: 0.75rem 1rem;
      }
      .header-right-area {
        width: 100%;
        align-items: center;
      }
      .lesson-selector {
        width: 100%;
        justify-content: center;
      }
      .header-subrow-toggles {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent {
  protected readonly studyProgress = inject(StudyProgressService);
  protected readonly speechService = inject(SpeechService);

  setLesson(lesson: LessonFilter): void {
    this.studyProgress.setLesson(lesson);
  }

  goHome(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.studyProgress.goHome();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

