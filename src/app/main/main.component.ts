import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { RootDetailComponent } from '../editor/root-detail/root-detail.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
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
