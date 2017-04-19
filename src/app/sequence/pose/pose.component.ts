import { Component, Input } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { Pose } from '../../_data/pose.model';

@Component({
  selector: 'app-pose',
  templateUrl: './pose.component.html',
  styleUrls: ['./pose.component.css']
})
export class PoseComponent {
  @Input() private target: Pose;
  @Input() private currentId;

  constructor(private service: SequenceService) {}

  editNode(node) {
    this.service.currentEditNode = node;
  }
}
