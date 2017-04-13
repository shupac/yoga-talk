import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Series } from '../../_data/series.model';
import { PoseDetailComponent } from '../pose-detail/pose-detail.component';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent {
  @Input() private target: Series;
  @Input() private sortRoot: string;
  @Output() private addPose: EventEmitter<any> = new EventEmitter();
  @Output() private sort: EventEmitter<Series> = new EventEmitter();
  @Output() private deleteSeries: EventEmitter<any> = new EventEmitter();

  @ViewChild(PoseDetailComponent)
  private poseDetailComponent: PoseDetailComponent;

  newNodeType: string = 'pose';
  series: Series = new Series();

  ngOnInit() {
    if (this.target) this.series = this.target;
  }

  getModel() {
    return this.series;
  }

  createNewModel() {
    this.series = new Series();
  }

  addNewPose() {
    let pose = this.poseDetailComponent.getModel();
    this.target.addPose(pose, this.newNodeType);
    this.poseDetailComponent.createNewModel();
  }
}
