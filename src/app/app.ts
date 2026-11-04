import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { NavigationTabsComponent } from './components/navigation-tabs/navigation-tabs.component';
import { KanaTrainerComponent } from './components/kana-trainer/kana-trainer.component';
import { FlashcardsComponent } from './components/flashcards/flashcards.component';
import { SentenceBuilderComponent } from './components/sentence-builder/sentence-builder.component';
import { ParticleTrainerComponent } from './components/particle-trainer/particle-trainer.component';
import { DemonstrativeTrainerComponent } from './components/demonstrative-trainer/demonstrative-trainer.component';
import { DialogueTrainerComponent } from './components/dialogue-trainer/dialogue-trainer.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { GrammarGuideComponent } from './components/grammar-guide/grammar-guide.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { StudyProgressService } from './services/study-progress.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    NavigationTabsComponent,
    KanaTrainerComponent,
    FlashcardsComponent,
    SentenceBuilderComponent,
    ParticleTrainerComponent,
    DemonstrativeTrainerComponent,
    DialogueTrainerComponent,
    QuizComponent,
    GrammarGuideComponent,
    DictionaryComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly studyProgress = inject(StudyProgressService);
}
