import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { PlayerService } from '../../_data/player.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent {
  @Input() private editable: boolean;
  @Output() private selectPose: EventEmitter<number> = new EventEmitter();
  @Output() private selectSeries: EventEmitter<number> = new EventEmitter();

  properties;

  constructor(
    private sequenceService: SequenceService,
    private playerService: PlayerService
  ) {}

  get props() {
    return this.sequenceService.properties;
  }

  get sequence() {
    return this.sequenceService.displaySequence;
  }

  get currentPoseId() {
    return this.sequenceService.currentPoseId;
  }

  get sortRoot() {
    return this.sequenceService.sortRoot;
  }

  handleDragStart() {
    this.playerService.isSorting = true;
  }

  handleDragEnd() {
    this.playerService.isSorting = false;
  }
}
