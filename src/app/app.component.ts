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
  private newNode: NodeDetailComponent;

  editable: boolean = true;

  onSelect(node) {
    this.newNode.selectNode(node);
  }

  toggleEdit() {
    this.editable = !this.editable;
  }
}
