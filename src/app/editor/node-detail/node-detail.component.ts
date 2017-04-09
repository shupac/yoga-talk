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

  constructor(private service: SequenceService) {}

  ngOnInit() {
    this.selectNode('root');
  }

  ngDoCheck() {
    if (!this.newPoseComponent) return;
    if (this.node.type === 'series') {
      if (this.type === 'pose') this.newPoseComponent.setSides('unilateral');
      if (this.type === 'series') this.type = 'pose';
    }
    if (this.node.type === 'root' && (this.type !== 'pose' && this.type !== 'series'))
      this.type = 'pose';
  }

  selectNode(node) {
    if (node === 'root') this.node = this.service.getNode('root');
    else this.node = node;
    console.log(this.node);
  }

  addPose(pose) {
    console.log('add pose', pose);
    this.service.addPose(pose, this.node);
  }

  addSeries(series) {
    this.service.addSeries(series, this.node);
  }

  savePose() {
    this.service.savePose(this.node);
  }
}
