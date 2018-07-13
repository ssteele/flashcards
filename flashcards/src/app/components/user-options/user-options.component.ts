import { Component, OnInit } from '@angular/core';
import { ConjugationService } from '../../services/conjugation.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit {
  tags: string[];
  checked: boolean = false;

  constructor(private conjugationService: ConjugationService) {}

  ngOnInit() {
    this.tags = this.conjugationService.getTags();
  }
}
