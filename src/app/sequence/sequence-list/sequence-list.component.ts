import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SequenceService } from '../../_data/sequence.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent {
  constructor(
    private service: SequenceService,
    private router: Router,
    private route: ActivatedRoute
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

  editNode(node) {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
