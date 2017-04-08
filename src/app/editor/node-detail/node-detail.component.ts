import { Component, ViewChild } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { NewPoseComponent } from '../new-pose/new-pose.component';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent {
  @ViewChild(NewPoseComponent)
  private newPoseComponent: NewPoseComponent;

  node;
  type = 'pose';
  target;

  constructor(private service: SequenceService) {}

  ngOnInit() {
    this.selectTarget('root');
  }

  ngDoCheck() {
    console.log(this.target.type, this.type);
    if (!this.newPoseComponent) return;
    if (this.target.type === 'series') {
      if (this.type === 'pose') this.newPoseComponent.setSides('unilateral');
      if (this.type === 'series') this.type = 'pose';
    }
    if (this.target.type === 'root' && (this.type !== 'pose' && this.type !== 'series'))
      this.type = 'pose';
  }

  selectTarget(target) {
    if (target === 'root') this.target = this.service.getNode('root');
    else this.target = target;
    console.log('select target', this.target);
  }

  addPose(pose) {
    console.log('add pose', pose);
    this.service.addPose(pose, this.target);
  }

  addSeries(series) {
    this.service.addSeries(series, this.target);
  }
}
