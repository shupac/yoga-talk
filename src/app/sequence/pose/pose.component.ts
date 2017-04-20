import { Component, Input } from '@angular/core';
import { DisplayItemComponent } from '../display-item/display-item.component';
import { Pose } from '../../_data/pose.model';

@Component({
  selector: 'app-pose',
  templateUrl: './pose.component.html',
  styleUrls: [
    '../display-item/display-item.component.css',
    './pose.component.css'
  ]
})
export class PoseComponent extends DisplayItemComponent {
  @Input() private target: Pose;
}