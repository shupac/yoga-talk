import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pose } from '../../_data/pose.model';

@Component({
  selector: 'app-new-pose',
  templateUrl: './new-pose.component.html',
  styleUrls: ['./new-pose.component.css']
})
export class NewPoseComponent {
  @Input() private name: string;
  @Input() private type: string;
  @Output() private add: EventEmitter<Pose> = new EventEmitter();

  pose: Pose = new Pose();

  constructor() {}

  addPose(name?: string) {
    this.pose.name = name || this.name;
    this.pose.breaths = +this.pose.breaths;
    this.add.emit(this.pose);
    this.pose = new Pose();
  }

  setSides(sides) {
    this.pose.sides = sides;
  }
}
