import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FilterOptions } from '../../models/filter-options';
import { ConjugationService } from '../../services/conjugation.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-user-options-form',
  templateUrl: './user-options-form.component.html',
  styleUrls: ['./user-options-form.component.scss']
})
export class UserOptionsFormComponent implements OnInit {
  tags: string[];
  filters: string[];
  @Input() filterOptions: FilterOptions[];

  constructor(
    private conjugationService: ConjugationService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.tags = this.conjugationService.getTags();
    this.filters = this.filterService.get();
    this.filterOptions = this.generateFilterOptions(this.tags, this.filters);
    console.log('this.filterOptions:', this.filterOptions);
  }

  ngOnChanges() {
    console.log('this.filters:', this.filters);
    this.filterOptions = this.generateFilterOptions(this.tags, this.filters);
    console.log('this.filterOptions:', this.filterOptions);
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
