import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceService } from '../_data/sequence.service';
import { Sequence } from '../_data/sequence.model';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent {
  @Input() private target: Sequence;

  constructor(private service: SequenceService) {}

  get currentPoseId() {
    return this.service.currentPoseId;
  }

  get sortRoot() {
    return this.service.sortRoot;
  }

  editNode(node) {
    this.service.currentEditNode = node;
  }
}
