import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../_data/player.service';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent {
  @Input() text: string;
  @Output() select: EventEmitter<number> = new EventEmitter();
  index: number;

  static nextId: number = 0;

  constructor(private service: PlayerService) {
    this.index = PlayerItemComponent.nextId;
    PlayerItemComponent.nextId++;
  }

  onClick() {
    this.select.emit(this.index);
  }

  get currentIndex() {
    return this.service.currentIndex;
  }
}
