import { Component, OnInit } from '@angular/core';
import translations from './json/translations.json';

let i = Math.floor(Math.random() * translations.length);

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {

  prompt = translations[i].english;
  answer = translations[i].spanish;
  // prompt = 'i am going';
  // answer = 'voy';

  constructor() {
  }

  ngOnInit() {
  }
}
