import { Component, OnInit } from '@angular/core';
import { Translation } from '../translation';
import { TRANSLATIONS } from '../mock-translations';

// import translations from './json/translations.json';


@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {
  translations = TRANSLATIONS;
  currentTranslation: Translation;

  length = this.translations.length;
  index = 0;

  // prompt = translations[i].english;
  // answer = translations[i].spanish;
  // // prompt = 'i am going';
  // // answer = 'voy';

  constructor() {
  }

  ngOnInit() {
    this.currentTranslation = this.translations[this.index];
  }

  onAdvance(index: number): void {
    this.index = index + 1;
    if (this.index >= this.length) {
      this.index = 0;
    }
    this.currentTranslation = this.translations[this.index];
  }
}
