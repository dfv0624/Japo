import { Component, computed, effect, inject, signal } from '@angular/core';
import { StudyProgressService, ActiveTab } from '../../services/study-progress.service';

export type NavCategory = 'fundamentos' | 'practica' | 'inmersion';

export interface CategoryDef {
  id: NavCategory;
  label: string;
  jpLabel: string;
  icon: string;
  desc: string;
}

export interface TabItem {
  id: ActiveTab;
  label: string;
  jpLabel: string;
  icon: string;
  category: NavCategory;
}

const TABS: TabItem[] = [
  // Fundamentos
  { id: 'kana', label: 'Hiragana & Katakana', jpLabel: 'かな練習', icon: 'spellcheck', category: 'fundamentos' },
  { id: 'flashcards', label: 'Flashcards', jpLabel: '単語カード', icon: 'style', category: 'fundamentos' },
  { id: 'dictionary', label: 'Vocabulario', jpLabel: '語彙リスト', icon: 'translate', category: 'fundamentos' },

  // Práctica Gramatical
  { id: 'sentences', label: 'Construir Frases', jpLabel: '文を作る', icon: 'reorder', category: 'practica' },
  { id: 'particles', label: 'Reto Partículas', jpLabel: '助詞マスター', icon: 'adjust', category: 'practica' },
  { id: 'demonstratives', label: 'これ・それ・あれ', jpLabel: '指示詞マップ', icon: 'explore', category: 'practica' },

  // Inmersión & Evaluación
  { id: 'dialogues', label: 'Diálogos Reales', jpLabel: '会話練習', icon: 'forum', category: 'inmersion' },
  { id: 'quiz', label: 'Examen Rápido', jpLabel: 'テスト', icon: 'quiz', category: 'inmersion' },
  { id: 'grammar', label: 'Guía Gramatical', jpLabel: '文法ノート', icon: 'menu_book', category: 'inmersion' }
];

@Component({
  selector: 'app-navigation-tabs',
  template: `
    <nav class="tabs-nav" aria-label="Navegación principal de aprendizaje">
      <div class="tabs-wrapper">
        <div class="single-row-nav">
          <!-- LEFT: Area Selector Pill with Dropdown (Fundamentos ▾) -->
          <div class="area-dropdown-wrapper">
            <button 
              type="button" 
              class="area-pill-btn"
              [class.menu-open]="isAreaDropdownOpen()"
              (click)="toggleAreaDropdown()"
              aria-haspopup="true"
              [attr.aria-expanded]="isAreaDropdownOpen()">
              <span class="material-symbols-outlined area-icon">{{ currentCategoryDef().icon }}</span>
              <span class="area-name">{{ currentCategoryDef().label }}</span>
              <span class="material-symbols-outlined dropdown-arrow">
                {{ isAreaDropdownOpen() ? 'expand_less' : 'expand_more' }}
              </span>
            </button>

            <!-- Floating Area Menu -->
            @if (isAreaDropdownOpen()) {
              <div class="area-dropdown-menu" role="menu">
                @for (cat of categories; track cat.id) {
                  <button 
                    type="button" 
                    class="area-menu-item"
                    [class.active]="currentCategory() === cat.id"
                    (click)="selectCategory(cat.id)"
                    role="menuitem">
                    <span class="material-symbols-outlined menu-item-icon">{{ cat.icon }}</span>
                    <div class="menu-item-text">
                      <span class="menu-item-label">{{ cat.label }}</span>
                      <span class="menu-item-desc">{{ cat.desc }}</span>
                    </div>
                    @if (currentCategory() === cat.id) {
                      <span class="material-symbols-outlined check-icon">check</span>
                    }
                  </button>
                }
              </div>
            }
          </div>

          <!-- CENTER: Activity Tactile Pill Buttons -->
          <div class="activities-pill-group" role="tablist" aria-label="Actividades de la sección">
            @for (tab of currentCategoryTabs(); track tab.id) {
              <button 
                type="button"
                class="activity-pill-btn"
                [class.active]="studyProgress.activeTab() === tab.id"
                (click)="selectTab(tab.id)"
                [attr.aria-selected]="studyProgress.activeTab() === tab.id"
                role="tab">
                <span class="material-symbols-outlined activity-icon">{{ tab.icon }}</span>
                <span class="activity-label">{{ tab.label }}</span>
              </button>
            }
          </div>

          <!-- RIGHT: All Modules Launcher Pill Button -->
          <button 
            type="button" 
            class="all-modules-pill-btn"
            [class.active]="isAllModulesOpen()"
            (click)="toggleAllModules()"
            title="Ver los 9 módulos de estudio"
            aria-label="Ver todos los módulos">
            <span class="material-symbols-outlined">apps</span>
            <span>Todos (9)</span>
          </button>
        </div>
      </div>

      <!-- Backdrop for dropdown -->
      @if (isAreaDropdownOpen()) {
        <div class="menu-backdrop" (click)="closeAreaDropdown()"></div>
      }

      <!-- Full Modules Launcher Modal / Backdrop -->
      @if (isAllModulesOpen()) {
        <div class="launcher-backdrop" (click)="closeAllModules()" (keydown.escape)="closeAllModules()">
          <div class="launcher-dialog" (click)="$event.stopPropagation()">
            <div class="launcher-header">
              <div>
                <span class="launcher-tag">Centro de Aprendizaje</span>
                <h3 class="launcher-title">Todos los Módulos</h3>
              </div>
              <button 
                type="button" 
                class="launcher-close-btn" 
                (click)="closeAllModules()" 
                aria-label="Cerrar modal">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="launcher-grid">
              @for (cat of categories; track cat.id) {
                <div class="launcher-column">
                  <div class="launcher-column-header">
                    <span class="material-symbols-outlined">{{ cat.icon }}</span>
                    <span>{{ cat.label }}</span>
                  </div>
                  <div class="launcher-column-items">
                    @for (item of getTabsForCategory(cat.id); track item.id) {
                      <button 
                        type="button"
                        class="launcher-item-btn"
                        [class.active]="studyProgress.activeTab() === item.id"
                        (click)="selectTabFromLauncher(cat.id, item.id)">
                        <span class="material-symbols-outlined item-icon">{{ item.icon }}</span>
                        <div class="item-text">
                          <span class="item-label">{{ item.label }}</span>
                          <span class="item-jp">{{ item.jpLabel }}</span>
                        </div>
                      </button>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </nav>
  `,
  styleUrl: './navigation-tabs.component.css'
})
export class NavigationTabsComponent {
  protected readonly studyProgress = inject(StudyProgressService);

  readonly categories: CategoryDef[] = [
    {
      id: 'fundamentos',
      label: 'Fundamentos',
      jpLabel: '基礎・文字',
      icon: 'school',
      desc: 'Silabarios y Vocabulario esencial'
    },
    {
      id: 'practica',
      label: 'Práctica Gramatical',
      jpLabel: '文法・練習',
      icon: 'extension',
      desc: 'Frases, partículas y demostrativos'
    },
    {
      id: 'inmersion',
      label: 'Inmersión & Test',
      jpLabel: '会話・評価',
      icon: 'fact_check',
      desc: 'Diálogos, exámenes y guía'
    }
  ];

  readonly currentCategory = signal<NavCategory>('fundamentos');
  readonly isAreaDropdownOpen = signal<boolean>(false);
  readonly isAllModulesOpen = signal<boolean>(false);

  readonly currentCategoryDef = computed(() => {
    const cat = this.currentCategory();
    return this.categories.find(c => c.id === cat) || this.categories[0];
  });

  readonly currentCategoryTabs = computed(() => {
    const cat = this.currentCategory();
    return TABS.filter(t => t.category === cat);
  });

  constructor() {
    // Keep category in sync if activeTab changes externally (e.g., from quiz or footer)
    effect(() => {
      const activeTab = this.studyProgress.activeTab();
      const tabDef = TABS.find(t => t.id === activeTab);
      if (tabDef && tabDef.category !== this.currentCategory()) {
        this.currentCategory.set(tabDef.category);
      }
    });
  }

  toggleAreaDropdown(): void {
    this.isAreaDropdownOpen.update(v => !v);
  }

  closeAreaDropdown(): void {
    this.isAreaDropdownOpen.set(false);
  }

  selectCategory(catId: NavCategory): void {
    this.currentCategory.set(catId);
    this.closeAreaDropdown();
    const catTabs = TABS.filter(t => t.category === catId);
    if (!catTabs.some(t => t.id === this.studyProgress.activeTab())) {
      this.studyProgress.setTab(catTabs[0].id);
    }
  }

  selectTab(tabId: ActiveTab): void {
    this.studyProgress.setTab(tabId);
  }

  toggleAllModules(): void {
    this.isAllModulesOpen.update(v => !v);
  }

  closeAllModules(): void {
    this.isAllModulesOpen.set(false);
  }

  selectTabFromLauncher(catId: NavCategory, tabId: ActiveTab): void {
    this.currentCategory.set(catId);
    this.studyProgress.setTab(tabId);
    this.closeAllModules();
  }

  getTabsForCategory(catId: NavCategory): TabItem[] {
    return TABS.filter(t => t.category === catId);
  }
}
