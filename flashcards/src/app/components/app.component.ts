import { Component, OnInit } from '@angular/core';
import { VersionService } from '../services/version.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isNightMode: boolean;

  constructor(
    private versionService: VersionService,
    private settingsService: SettingsService
  ) {
    this.versionService.initialize();
  }

  ngOnInit() {
    this.isNightMode = this.settingsService.getNightMode();
  }
}
