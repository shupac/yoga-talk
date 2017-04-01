import { Component } from '@angular/core';
import { Pose, SequenceService } from '../sequence.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent {
  constructor(private service: SequenceService) { }

  get sequence(): Pose[] {
    return this.service.getSequence();
  }
}
