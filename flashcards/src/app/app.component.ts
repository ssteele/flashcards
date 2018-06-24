
import { Component } from '@angular/core';

import * as translations from './json/translations.json';

let i = Math.floor(Math.random() * translations.length);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompt = translations[i].english;
  answer = translations[i].spanish;
}
