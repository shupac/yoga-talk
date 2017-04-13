import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pose } from '../../_data/pose.model';

@Component({
  selector: 'app-pose',
  templateUrl: './pose.component.html',
  styleUrls: ['./pose.component.css']
})
export class PoseComponent {
  @Input() private target: Pose;
  @Input() private currentId;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  editNode(node) {
    this.router.navigate(['edit', node.type, node.id], { relativeTo: this.route });
  }
}
