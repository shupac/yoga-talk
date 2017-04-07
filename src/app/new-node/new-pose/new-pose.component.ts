import { Component } from '@angular/core';
import { Pose } from '../../_data/pose.model';

@Component({
  selector: 'app-new-pose',
  templateUrl: './new-pose.component.html',
  styleUrls: ['./new-pose.component.css']
})
export class NewPoseComponent {
  pose: Pose = new Pose();
  type = 'pose';

  constructor() {}

  addPose() {
    this.pose.breaths = +this.pose.breaths;
    // this.service.addPose(this.pose);
    this.pose = new Pose();
  }
}
