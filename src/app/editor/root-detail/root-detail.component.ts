import { Component, ViewChild } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { PoseDetailComponent } from '../pose-detail/pose-detail.component';
import { SeriesDetailComponent } from '../series-detail/series-detail.component';

@Component({
  selector: 'app-root-detail',
  templateUrl: './root-detail.component.html',
  styleUrls: ['./root-detail.component.css']
})
export class RootDetailComponent {
  @ViewChild(PoseDetailComponent)
  private poseDetailComponent: PoseDetailComponent;

  @ViewChild(SeriesDetailComponent)
  private seriesDetailComponent: SeriesDetailComponent;

  target;
  newNodeType: string = 'pose';
  newNodeName: string;

  constructor(private service: SequenceService) {}

  ngOnInit() {
    this.target = this.service.properties;
  }

  ngDoCheck() {
    if (!this.poseDetailComponent) return;
    if (this.target.type === 'root' && (this.newNodeType !== 'pose' && this.newNodeType !== 'series'))
      this.newNodeType = 'pose';
  }

  get sortRoot() {
    return this.service.sortRoot;
  }

  selectTarget(target) {
    this.target = target;
  }

  addNode() {
    // if (this.newNodeType === 'pose') this.poseDetailComponent.addPose(this.name);
    // if (this.newNodeType === 'series') this.seriesDetailComponent.addSeries(this.name);
  }

  onPoseAction({ type, pose }) {
    console.log(type, pose);
  }

  addPose(pose) {
    this.service.addPose(pose, this.target);
  }

  addSeries(series) {
    let node = this.service.addSeries(series, this.target);
    if (node.type === 'series') this.selectTarget(node);
  }

  savePose() {
    this.service.savePose(this.target);
  }

  deletePose() {
    this.service.deletePose(this.target);
  }

  toggleSort(target) {
    this.service.toggleSort(target.type);
  }
}
