import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '../../models/filter-options';
import { ConjugationService } from '../../services/conjugation.service';
import { FilterService } from '../../services/filter.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-user-options-form',
  templateUrl: './user-options-form.component.html',
  styleUrls: ['./user-options-form.component.scss']
})
export class UserOptionsFormComponent implements OnInit {
  tags: string[];
  filters: string[];
  filterOptions: FilterOptions[];
  maxFlashcards: number;
  maxFlashcardsOptions: number[];
  isNightMode: boolean;
  isFormDirty: boolean = false;

  constructor(
    private conjugationService: ConjugationService,
    private filterService: FilterService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.tags = this.conjugationService.getTags();
    this.filters = this.filterService.get();
    this.filterOptions = this.generateFilterOptions(this.tags, this.filters);
    this.maxFlashcards = this.settingsService.getMaxFlashcards();
    this.maxFlashcardsOptions = this.settingsService.getMaxFlashcardsOptions();
    this.isNightMode = this.settingsService.getNightMode();
  }

  public onFilterChange(value, isChecked) {
    this.filters = this.filterService.setFilter(value, isChecked);
    this.filterOptions = this.generateFilterOptions(this.tags, this.filters);
    this.isFormDirty = true;
  }

  public onMaxFlashcardsChange(count) {
    this.maxFlashcards = this.settingsService.setMaxFlashcards(count);
  }

  public onNightModeChange(isChecked) {
    this.isNightMode = this.settingsService.setNightMode(isChecked);
  }

  private generateFilterOptions(tags, filters): FilterOptions[] {
    let options = [];
    for (let tag of tags) {
      options.push({
        'value': tag,
        'isChecked': (-1 !== filters.indexOf(tag)) ? true : false
      });
    }
    return options;
  }
}
