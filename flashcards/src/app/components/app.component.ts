import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { VersionService } from '../services/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isNightMode: boolean;

  constructor(
    private versionService: VersionService,
    private settingsService: SettingsService
  ) {
    this.versionService.initialize();
  }

  ngOnInit() {
    this.getNightmode();
  }

  getNightmode() {
    this.isNightMode = this.settingsService.getNightMode();
  }
}
