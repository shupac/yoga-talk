import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PlayerComponent } from './player/player.component';
import { RootDetailComponent } from './editor/root-detail/root-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PlayerComponent)
  private player: PlayerComponent;

  @ViewChild(RootDetailComponent)
  private rootDetail: RootDetailComponent;

  editable: boolean = true;

  onSelect(node) {
    this.rootDetail.selectTarget(node);
  }

  toggleEdit() {
    this.editable = !this.editable;
  }
}
