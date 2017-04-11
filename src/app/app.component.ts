import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { NodeDetailComponent } from './editor/node-detail/node-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PlayerComponent)
  private player: PlayerComponent;

  @ViewChild(NodeDetailComponent)
  private nodeDetail: NodeDetailComponent;

  editable: boolean = true;

  onSelect(node) {
    this.nodeDetail.selectTarget(node);
  }

  toggleEdit() {
    this.editable = !this.editable;
  }
}
