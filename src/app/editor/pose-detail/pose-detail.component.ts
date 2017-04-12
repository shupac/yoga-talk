import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pose } from '../../_data/pose.model';

@Component({
  selector: 'app-pose-detail',
  templateUrl: './pose-detail.component.html',
  styleUrls: ['./pose-detail.component.css']
})
export class PoseDetailComponent {
  @Input() private target: Pose;
  @Input() private unilateralOnly: boolean = false;
  @Output() private action: EventEmitter<Pose> = new EventEmitter();

  pose: Pose = new Pose();

  ngDoCheck() {
    if (this.target) {
      this.pose = this.target;
      this.unilateralOnly = this.target.unilateralOnly;
    }
    if (this.unilateralOnly) this.setSides('unilateral');
  }

  setSides(sides) {
    this.pose.sides = sides;
  }
}
