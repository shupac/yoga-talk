import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SequenceService } from '../_data/sequence.service';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent {

  constructor(
    private service: SequenceService,
  ) {}

  get target() {
    return this.service.currentSequence;
  }

  get currentPoseId() {
    return this.service.currentPoseId;
  }

  get sortRoot() {
    return this.service.sortRoot;
  }
}
