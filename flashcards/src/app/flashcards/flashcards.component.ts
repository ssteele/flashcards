import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Translation } from '../translation';
import { TRANSLATIONS } from '../mock-translations';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
  animations: [
    trigger('answerState', [
      state('hidden', style({
        display: 'none',
        transform: 'scale(0.75)'
      })),
      state('visible', style({
        display: 'block',
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('100ms ease-in')),
      transition('visible => hidden', animate('0ms'))
    ])
  ]
})

export class FlashcardsComponent implements OnInit {
  translations;
  currentTranslation: Translation;

  index = 0;
  maxFlashcards = 30;
  answerState = 'hidden';

  constructor() {
  }

  ngOnInit() {
    this.translations = this.fetch(TRANSLATIONS);
    this.currentTranslation = this.translations[this.index];
  }

  shuffle(translations: string[]): string[] {
    let currentIndex = translations.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while (0 !== currentIndex) {

      // pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // and swap it with the current element
      temporaryValue = translations[currentIndex];
      translations[currentIndex] = translations[randomIndex];
      translations[randomIndex] = temporaryValue;
    }

    return translations;
  }

  reduce(translations: string[]): string[] {
    if (this.maxFlashcards < translations.length) {
      translations = translations.slice(0, this.maxFlashcards);
    }
    return translations;
  }

  fetch(translations): string[] {
    // translations = this.shuffle(translations);
    translations = this.reduce(translations);
    return translations;
  }

  onAdvance(): void {
    if ('hidden' === this.answerState) {
      this.revealAnswer();
    } else {
      this.advanceCard(this.index);
    }
  }

  revealAnswer(): void {
    this.answerState = 'visible';
  }

  advanceCard(index: number): void {
    this.answerState = 'hidden';
    this.index = index + 1;
    if (this.index >= this.translations.length) {
      this.index = 0;
    }
    this.currentTranslation = this.translations[this.index];
  }

  // events
  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.onAdvance();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.onAdvance();
  }
}
