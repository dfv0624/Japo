import { TestBed } from '@angular/core/testing';
import { WritingPracticeComponent } from './writing-practice.component';
import { StudyProgressService } from '../../services/study-progress.service';

describe('WritingPracticeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingPracticeComponent]
    }).compileComponents();
  });

  it('should create the writing practice component', () => {
    const fixture = TestBed.createComponent(WritingPracticeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should convert romaji to hiragana in real time when IME is enabled', async () => {
    const fixture = TestBed.createComponent(WritingPracticeComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const inputEl = fixture.nativeElement.querySelector('#writing-answer-input') as HTMLInputElement;
    expect(inputEl).toBeTruthy();

    inputEl.value = 'kore';
    inputEl.setSelectionRange(4, 4);
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.userInput()).toBe('これ');
    expect(inputEl.value).toBe('これ');
  });

  it('should validate correct and incorrect answers and show particle wa feedback', async () => {
    const fixture = TestBed.createComponent(WritingPracticeComponent);
    const studyProgress = TestBed.inject(StudyProgressService);
    studyProgress.setLesson(0);
    await fixture.whenStable();
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    // First exercise is w-koso-1 ("これ")
    comp.userInput.set('kore');
    comp.checkAnswer();
    fixture.detectChanges();

    expect(comp.evaluation()?.isCorrect).toBe(true);
    expect(comp.userInput()).toBe('これ');

    // Move to w-koso-4 ("これは 本です。") to verify particle wa error detection
    const idx = comp.filteredExercises().findIndex(ex => ex.id === 'w-koso-4');
    expect(idx).toBeGreaterThan(-1);
    comp.currentIndex.set(idx);
    comp.userInput.set('これわほんです');
    comp.checkAnswer();
    fixture.detectChanges();

    expect(comp.evaluation()?.isCorrect).toBe(false);
    expect(comp.evaluation()?.feedbackType).toBe('particle_wa_error');
  });

  it('should switch between keyboard, draw and lab modes and jump from lab topic', async () => {
    const fixture = TestBed.createComponent(WritingPracticeComponent);
    await fixture.whenStable();
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    expect(comp.activeMode()).toBe('keyboard');

    comp.setMode('draw');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-writing-canvas')).toBeTruthy();

    comp.setMode('lab');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-word-lab')).toBeTruthy();

    comp.onLabPracticeTopic('particles');
    fixture.detectChanges();
    expect(comp.activeMode()).toBe('keyboard');
    expect(comp.selectedCategory()).toBe('particles');
  });
});

