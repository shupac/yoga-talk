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

  node;
  type: string = 'pose';
  name: string;

  constructor(private service: SequenceService) {}

  ngOnInit() {
    this.node = this.service.properties;
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
    this.node = node;
  }

  addNode() {
    if (this.type === 'pose') this.newPoseComponent.addPose(this.name);
    if (this.type === 'series') this.newSeriesComponent.addSeries(this.name);
  }

  addPose(pose) {
    this.service.addPose(pose, this.node);
    this.name = '';
  }

  addSeries(series) {
    let node = this.service.addSeries(series, this.node);
    if (node.type === 'series') this.selectNode(node);
    this.name = '';
  }

  savePose() {
    this.service.savePose(this.node);
  }

  deletePose() {
    this.service.deletePose(this.node);
  }
}
