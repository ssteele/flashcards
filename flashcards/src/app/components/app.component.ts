import { Component, OnInit, Renderer2 } from '@angular/core';

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
    private renderer: Renderer2,
    private versionService: VersionService,
    private settingsService: SettingsService
  ) {
    this.versionService.initialize();
  }

  ngOnInit() {
    this.getNightMode();
  }

  getNightMode() {
    this.isNightMode = this.settingsService.getNightMode();
    if (this.isNightMode) {
      this.renderer.addClass(document.body, 'night-mode');
    }
  }
}
