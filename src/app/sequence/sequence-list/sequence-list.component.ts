import { Component, Output, EventEmitter } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent {
  @Output() selectPose: EventEmitter<number> = new EventEmitter();
  @Output() selectSequence: EventEmitter<number> = new EventEmitter();

  constructor(private service: SequenceService) {}

  get sequence() {
    return this.service.displaySequence;
  }

  get currentPoseId() {
    return this.service.currentPoseId;
  }
}
