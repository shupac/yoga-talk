import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PlayerComponent)
  private player: PlayerComponent;

  onSelectPose(index) {
    this.player.startSequence(index);
  }
}
