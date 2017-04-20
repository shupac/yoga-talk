import { Component } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  defaultBreaths: number = Settings.defaultBreaths;
  defaultSpeed: number = Settings.defaultSpeed;

  updateBreaths() {
    Settings.defaultBreaths = +this.defaultBreaths;
  }

  updateDuration() {
    Settings.defaultSpeed = +this.defaultSpeed;
  }
}
