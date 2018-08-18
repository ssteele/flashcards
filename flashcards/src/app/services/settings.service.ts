import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';

import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private renderer: Renderer2;
  private maxFlashcards: number = 30;
  private maxFlashcardsOptions: number[] = [10, 20, 30, 50];
  private isNightMode: boolean;

  constructor(
    private rendererFactory: RendererFactory2,
    private storeService: StoreService,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.maxFlashcards = this.storeService.fetch('maxFlashcards') || this.maxFlashcards;
    this.isNightMode = this.storeService.fetch('isNightMode') || false;
    this.toggleNightMode(this.isNightMode);
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

  private toggleNightMode(isChecked: boolean): void {
    if (isChecked) {
      this.renderer.addClass(document.body, 'night-mode');
    } else {
      this.renderer.removeClass(document.body, 'night-mode');
    }
  }

  public setNightMode(isChecked: boolean): boolean {
    this.isNightMode = isChecked;
    this.storeService.persist('isNightMode', this.isNightMode);
    this.toggleNightMode(this.isNightMode);

    return this.isNightMode;
  }

  public getNightMode(): boolean {
    return this.isNightMode;
  }
}
