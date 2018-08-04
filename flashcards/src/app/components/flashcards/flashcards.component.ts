import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Conjugation } from '../../models/conjugation';
import { ConjugationService } from '../../services/conjugation.service';
import { FilterService } from '../../services/filter.service';

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
  filters: string[];
  cards: Conjugation[];
  card: Conjugation;

  index = 0;
  maxFlashcards = 30;
  answerState = 'hidden';

  constructor(
    private conjugationService: ConjugationService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.filters = this.filterService.get();
    this.cards = this.conjugationService.get(this.maxFlashcards, this.filters);
    this.card = this.cards[this.index];
  }

  private onAdvance(): void {
    // if ('hidden' === this.answerState) {
    //   this.revealAnswer();
    // } else {
    //   this.advanceCard(this.index);
    // }
  }

  private revealAnswer(): void {
    this.answerState = 'visible';
  }

  private advanceCard(index: number): void {
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
