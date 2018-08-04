import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filters: string[];

  constructor() {
    // @TODO: fetch stored filters
    // this.filters = [];
    this.filters = ['present'];
    // this.filters = ['present', 'imperfect'];
  }

  public get() {
    return this.filters;
  }
}
