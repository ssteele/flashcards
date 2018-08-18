import { Component } from '@angular/core';

import { VersionService } from '../services/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isNightMode: boolean;

  constructor(
    private versionService: VersionService,
  ) {
    this.versionService.initialize();
  }
}
