import { Component, ViewChild } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { NewPoseComponent } from '../new-pose/new-pose.component';
import { NewSeriesComponent } from '../new-series/new-series.component';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent {
  @ViewChild(NewPoseComponent)
  private newPoseComponent: NewPoseComponent;

  @ViewChild(NewSeriesComponent)
  private newSeriesComponent: NewSeriesComponent;

  target;
  nodeType: string = 'pose';
  name: string;

  constructor(private service: SequenceService) {}

  ngOnInit() {
    this.target = this.service.properties;
  }

  ngDoCheck() {
    if (!this.newPoseComponent) return;
    if (this.target.type === 'series') {
      if (this.nodeType === 'pose') this.newPoseComponent.setSides('unilateral');
      if (this.nodeType === 'series') this.nodeType = 'pose';
    }
    if (this.target.type === 'root' && (this.nodeType !== 'pose' && this.nodeType !== 'series'))
      this.nodeType = 'pose';
  }

  selectTarget(target) {
    this.target = target;
  }

  addNode() {
    if (this.nodeType === 'pose') this.newPoseComponent.addPose(this.name);
    if (this.nodeType === 'series') this.newSeriesComponent.addSeries(this.name);
  }

  addPose(pose) {
    this.service.addPose(pose, this.target);
    this.name = '';
  }

  addSeries(series) {
    let node = this.service.addSeries(series, this.target);
    if (node.type === 'series') this.selectTarget(node);
    this.name = '';
  }

  savePose() {
    this.service.savePose(this.target);
  }

  deletePose() {
    this.service.deletePose(this.target);
  }
}
