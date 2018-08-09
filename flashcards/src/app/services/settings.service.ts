import { Injectable } from '@angular/core';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private maxFlashcards: number = 30;
  private maxFlashcardsOptions: number[] = [10, 20, 30, 50];
  private isNightMode: boolean;

  constructor(
    private storeService: StoreService
  ) {
    this.maxFlashcards = this.storeService.fetch('maxFlashcards') || this.maxFlashcards;
    this.isNightMode = this.storeService.fetch('isNightMode') || false;
  }

  public setMaxFlashcards(count: number): number {
    this.maxFlashcards = count;
    this.storeService.persist('maxFlashcards', this.maxFlashcards);

    return this.maxFlashcards;
  }

  public getMaxFlashcards(): number {
    return this.maxFlashcards;
  }

  public getMaxFlashcardsOptions(): number[] {
    return this.maxFlashcardsOptions;
  }

  public setNightMode(isChecked: boolean): boolean {
    this.isNightMode = isChecked;
    this.storeService.persist('isNightMode', this.isNightMode);

    return this.isNightMode;
  }

  public getNightMode(): boolean {
    return this.isNightMode;
  }
}
