import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { NewNodeComponent } from './new-node/new-node/new-node.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PlayerComponent)
  private player: PlayerComponent;

  @ViewChild(NewNodeComponent)
  private newNode: NewNodeComponent;

  onSelectPose(index) {
    this.player.startSequence(index);
  }

  onSelectSeries(id) {
    this.newNode.selectTarget(id);
  }
}
