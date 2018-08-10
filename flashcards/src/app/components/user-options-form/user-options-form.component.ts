import { Component, OnInit } from '@angular/core';
import { FormFilterOptions } from '../../models/form-filter-options';
import { ConjugationService } from '../../services/conjugation.service';
import { FilterService } from '../../services/filter.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-user-options-form',
  templateUrl: './user-options-form.component.html',
  styleUrls: ['./user-options-form.component.scss']
})
export class UserOptionsFormComponent implements OnInit {
  availableFilters: string[];
  selectedFilters: string[];
  formFilterOptions: FormFilterOptions[];
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
    this.availableFilters = this.conjugationService.getFilters();
    this.selectedFilters = this.filterService.get();
    this.formFilterOptions = this.generateFormFilterOptions(this.availableFilters, this.selectedFilters);
    this.maxFlashcards = this.settingsService.getMaxFlashcards();
    this.maxFlashcardsOptions = this.settingsService.getMaxFlashcardsOptions();
    this.isNightMode = this.settingsService.getNightMode();
  }

  public onFilterChange(value, isChecked) {
    this.selectedFilters = this.filterService.setFilter(value, isChecked);
    this.formFilterOptions = this.generateFormFilterOptions(this.availableFilters, this.selectedFilters);
    this.isFormDirty = true;
  }

  public onMaxFlashcardsChange(count) {
    this.maxFlashcards = this.settingsService.setMaxFlashcards(count);
  }

  public onNightModeChange(isChecked) {
    this.isNightMode = this.settingsService.setNightMode(isChecked);
  }

  private generateFormFilterOptions(availableFilters, selectedFilters): FormFilterOptions[] {
    let options = [];
    for (let availableFilter of availableFilters) {
      options.push({
        'value': availableFilter,
        'isChecked': (-1 !== selectedFilters.indexOf(availableFilter)) ? true : false
      });
    }
    return options;
  }
}
