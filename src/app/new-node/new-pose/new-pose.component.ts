import { Component, Output, EventEmitter } from '@angular/core';
import { Pose } from '../../_data/pose.model';

@Component({
  selector: 'app-new-pose',
  templateUrl: './new-pose.component.html',
  styleUrls: ['./new-pose.component.css']
})
export class NewPoseComponent {
  @Output() 'add': EventEmitter<Pose> = new EventEmitter();

  pose: Pose = new Pose();
  type = 'pose';

  constructor() {}

  addPose() {
    this.pose.breaths = +this.pose.breaths;
    this.add.emit(this.pose);
    this.pose = new Pose();
  }
}
