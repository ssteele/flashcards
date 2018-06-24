
import { Component } from '@angular/core';

import * as translations from './json/translations.json';

const word = translations[0].english;
console.log(word);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompt = 'i am going';
  answer = 'yo voy';
}
