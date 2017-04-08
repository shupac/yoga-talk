import { Component, Output, EventEmitter } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { PlayerService } from '../../_data/player.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent {
  @Output() selectPose: EventEmitter<number> = new EventEmitter();
  @Output() selectSeries: EventEmitter<number> = new EventEmitter();

  dragOperation: boolean = false;

  constructor(
    private sequenceService: SequenceService,
    private playerService: PlayerService
  ) {}

  get sequence() {
    return this.sequenceService.displaySequence;
  }

  get currentPoseId() {
    return this.sequenceService.currentPoseId;
  }

  handleDragStart() {
    this.playerService.isSorting = true;
  }

  handleDragEnd() {
    this.playerService.isSorting = false;
  }
}
