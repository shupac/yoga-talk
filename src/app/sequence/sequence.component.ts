import { Component, Output, EventEmitter } from '@angular/core';
import { Pose, SequenceService } from '../sequence.service';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent {
  @Output() selectPose: EventEmitter<number> = new EventEmitter();

  constructor(private service: SequenceService) { }

  get sequence(): Pose[] {
    return this.service.getSequence();
  }

  get currentIndex() {
    return this.service.currentIndex;
  }
}
