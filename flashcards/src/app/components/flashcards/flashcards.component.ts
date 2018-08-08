import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Conjugation } from '../../models/conjugation';
import { ConjugationService } from '../../services/conjugation.service';
import { FilterService } from '../../services/filter.service';
import { MatDialog } from '@angular/material/dialog';
import { UserOptionsFormComponent } from '../user-options-form/user-options-form.component';
import { StoreService } from '../../services/store.service';

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
  suppressAnswer = false;

  constructor(
    private conjugationService: ConjugationService,
    private filterService: FilterService,
    private storeService: StoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.renderFlashcards();
  }

  private getFlashcards() {
    this.answerState = 'hidden';

    this.filters = this.filterService.get();
    this.index = 0;

    this.cards = this.conjugationService.get(this.maxFlashcards, this.filters);
    this.storeService.persist('cards', this.cards);

    this.card = this.cards[this.index];
    this.storeService.persist('cardIndex', this.index);

    return this.cards;
  }

  public async renderFlashcards() {
    this.answerState = 'hidden';

    this.index = this.storeService.fetch('cardIndex') || 0;
    this.cards = this.storeService.fetch('cards');
    if (!this.cards) {
      this.cards = await this.getFlashcards();
    }
    this.card = this.cards[this.index];
  }

  private onAdvance(): void {
    if ('hidden' === this.answerState) {
      this.revealAnswer();
    } else {
      this.advanceCard(this.index);
    }
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
    this.storeService.persist('cardIndex', this.index);
    this.card = this.cards[this.index];
  }

  openDialog() {
    this.answerState = 'hidden';

    let dialogRef = this.dialog.open(UserOptionsFormComponent, {disableClose: true});
    this.suppressAnswer = true;

    dialogRef.afterClosed().subscribe((isFormDirty) => {
      if (isFormDirty) {
        this.getFlashcards();
      }
      this.suppressAnswer = false;
    });
  }

  // events
  @HostListener('document:tap', ['$event'])
  onTap(event) {
    if (!this.suppressAnswer) {
      this.onAdvance();
    }
  }

  @HostListener('document:keypress', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (!this.suppressAnswer) {
      this.onAdvance();
    }
  }
}
