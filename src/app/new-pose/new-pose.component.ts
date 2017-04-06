import { Component } from '@angular/core';
import { Pose, SequenceService } from '../sequence.service';

@Component({
  selector: 'app-new-pose',
  templateUrl: './new-pose.component.html',
  styleUrls: ['./new-pose.component.css']
})
export class NewPoseComponent {
  pose: Pose = new Pose();
  type = 'pose';

  constructor(private service: SequenceService) {}

  addPose() {
    this.pose.breaths = +this.pose.breaths;
    this.service.addPose(this.pose);
    this.pose = new Pose();
  }
}
