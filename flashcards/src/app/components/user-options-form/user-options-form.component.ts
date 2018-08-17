import { Component, OnInit } from '@angular/core';
import { Filter } from '../../models/filter';
import { FormFilterOptions } from '../../models/form-filter-options';
import { ConjugationService } from '../../services/conjugation.service';
import { FilterService } from '../../services/filter.service';
import { SettingsService } from '../../services/settings.service';
import { LevelFilter } from '../../classes/filter/level-filter';
import { TenseFilter } from '../../classes/filter/tense-filter';
import { SubjectFilter } from '../../classes/filter/subject-filter';

@Component({
  selector: 'app-user-options-form',
  templateUrl: './user-options-form.component.html',
  styleUrls: ['./user-options-form.component.scss']
})
export class UserOptionsFormComponent implements OnInit {
  filterProperties: string[];
  availableFilters: Filter;
  selectedFilters: Filter;
  formFilterOptions: FormFilterOptions[];
  maxFlashcards: number;
  maxFlashcardsOptions: number[];
  isNightMode: boolean;
  isFormDirty: boolean = false;

  constructor(
    private conjugationService: ConjugationService,
    private filterService: FilterService,
    private settingsService: SettingsService,
    private levelFilter: LevelFilter,
    private tenseFilter: TenseFilter,
    private subjectFilter: SubjectFilter,
  ) {}

  ngOnInit() {
    this.filterProperties = this.conjugationService.getFilterProperties();
    this.availableFilters = this.conjugationService.getFilters();
    this.selectedFilters = this.filterService.get();
    this.formFilterOptions = this.generateFormFilterOptions(this.availableFilters, this.selectedFilters);
    this.maxFlashcards = this.settingsService.getMaxFlashcards();
    this.maxFlashcardsOptions = this.settingsService.getMaxFlashcardsOptions();
    this.isNightMode = this.settingsService.getNightMode();
  }

  public onFilterChange(group, value, isChecked) {
    this.filterService.setFilter(group, value, isChecked);
    this.selectedFilters = this.filterService.get();
    this.formFilterOptions = this.generateFormFilterOptions(this.availableFilters, this.selectedFilters);
    this.isFormDirty = true;
  }

  public onMaxFlashcardsChange(count) {
    this.maxFlashcards = this.settingsService.setMaxFlashcards(count);
    this.isFormDirty = true;
  }

  public onNightModeChange(isChecked) {
    this.isNightMode = this.settingsService.setNightMode(isChecked);
  }

  private generateFormFilterOptions(availableFilters, selectedFilters): FormFilterOptions[] {
    let options: any = {};

    for (const group in availableFilters) {
      options[group] = [];

      for (const availableFilter of availableFilters[group]) {
        const filterClass = group + 'Filter';
        const description = this[filterClass].getDescription(availableFilter);
        const option: FormFilterOptions = {
          'value': availableFilter,
          'isChecked': (-1 !== selectedFilters[group].indexOf(availableFilter)) ? true : false,
          'description': description,
        }
        options[group].push(option);
      }
    }

    return options;
  }
}
