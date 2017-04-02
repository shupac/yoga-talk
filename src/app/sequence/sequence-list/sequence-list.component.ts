import { Component, Output, EventEmitter } from '@angular/core';
import { Pose, SequenceService } from '../../sequence.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent {
  @Output() selectPose: EventEmitter<number> = new EventEmitter();

  constructor(private service: SequenceService) {
    this.service.getSpeechSequence();
  }

  get sequence() {
    return this.service.getDisplaySequence();
  }

  get currentIndex() {
    return this.service.currentIndex;
  }
}
