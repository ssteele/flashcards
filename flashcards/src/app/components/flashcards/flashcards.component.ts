import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Conjugation } from '../../models/conjugation';
import { conjugations } from '../../data/conjugations';

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
  cards;
  currentCard: Conjugation;

  index = 0;
  maxFlashcards = 30;
  answerState = 'hidden';

  constructor() {
  }

  ngOnInit() {
    this.cards = this.fetch(conjugations);
    this.currentCard = this.cards[this.index];
  }

  shuffle(cards: string[]): string[] {
    let currentIndex = cards.length, temporaryValue, randomIndex;

    // while there remain elements to shuffle...
    while (0 !== currentIndex) {

      // pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // and swap it with the current element
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    return cards;
  }

  reduce(cards: string[]): string[] {
    if (this.maxFlashcards < cards.length) {
      cards = cards.slice(0, this.maxFlashcards);
    }
    return cards;
  }

  fetch(cards): string[] {
    cards = this.shuffle(cards);
    cards = this.reduce(cards);
    return cards;
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
    if (this.index >= this.cards.length) {
      this.index = 0;
    }
    this.currentCard = this.cards[this.index];
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
