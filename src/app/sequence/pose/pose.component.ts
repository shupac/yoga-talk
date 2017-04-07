import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pose',
  templateUrl: './pose.component.html',
  styleUrls: ['./pose.component.css']
})
export class PoseComponent {
  @Input() private currentId;
  @Input() private pose;

  edit: boolean = false;

  constructor() { }

}
