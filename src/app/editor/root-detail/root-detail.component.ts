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

  addRootNode() {
    if (this.newNodeType === 'pose') {
      this.service.addPose(this.poseDetailComponent.getModel(), this.target);
      this.poseDetailComponent.createNewModel();
    }
    if (this.newNodeType === 'series') {
      this.service.addSeries(this.seriesDetailComponent.getModel());
      this.seriesDetailComponent.createNewModel();
    }
  }

  addSeriesNode({ pose, target, type }) {
    console.log('add series node', pose, target, type);
    this.service.addPose(pose, target, type);
  }

  savePose() {

  }

  deletePose(pose) {
    this.service.deletePose(pose);
  }

  deleteSeries(series) {
    this.service.deleteSeries(series);
  }

  toggleSort(target) {
    this.service.toggleSort(target.type);
  }
}
