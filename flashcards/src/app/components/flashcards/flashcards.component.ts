import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Conjugation } from '../../models/conjugation';
import { CONJUGATIONS } from '../../data/conjugations';

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
  tagList: string[];
  tags: string[];
  cards: Conjugation[];
  card: Conjugation;

  index = 0;
  maxFlashcards = 30;
  answerState = 'hidden';

  constructor() {
  }

  ngOnInit() {
    this.tagList = this.getTags(CONJUGATIONS);
    this.tags = [];

    this.cards = this.deal(CONJUGATIONS, this.tags);
    this.card = this.cards[this.index];
  }

  getTags(conjugations) {
    // collect all tags
    let tags = [];
    conjugations.forEach((conjugation) => {
      tags = tags.concat(conjugation.tags);
    });

    // filter unique tags
    return tags.filter((tag, i, array) => {
      return array.indexOf(tag) === i;
    });
  }

  filter(cards: Conjugation[], filters: string[]): Conjugation[] {
    return cards.filter(function (card) {
      return filters.every((filter) => {                           // use `some` if inclusive filtering is desired
        return -1 !== card.tags.indexOf(filter);
      });
    });
  }

  shuffle(cards: Conjugation[]): Conjugation[] {
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

  reduce(cards: Conjugation[]): Conjugation[] {
    if (this.maxFlashcards < cards.length) {
      cards = cards.slice(0, this.maxFlashcards);
    }
    return cards;
  }

  deal(cards, filters?: string[]): Conjugation[] {
    cards = this.filter(cards, filters);
    cards = this.shuffle(cards);
    cards = this.reduce(cards);
    return cards;
  }

  onAdvance(): void {
    return;
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
    this.card = this.cards[this.index];
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
