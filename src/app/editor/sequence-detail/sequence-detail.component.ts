import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SequenceService } from '../../_data/sequence.service';
import { SeriesDetailComponent } from '../series-detail/series-detail.component';
import { PoseDetailComponent } from '../pose-detail/pose-detail.component';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.css']
})
export class SequenceDetailComponent {
  @ViewChild(PoseDetailComponent)
  private poseDetailComponent: PoseDetailComponent;

  @ViewChild(SeriesDetailComponent)
  private seriesDetailComponent: SeriesDetailComponent;

  @Input() private target;
  @Output() private addPose: EventEmitter<any> = new EventEmitter();
  @Output() private addSeries: EventEmitter<any> = new EventEmitter();
  @Output() private sort: EventEmitter<any> = new EventEmitter();
  @Output() private deleteSquence: EventEmitter<any> = new EventEmitter();

  nodeName: string;
  newNodeType: string = 'pose';
  nameChanged: boolean = false;

  constructor(
    private service: SequenceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.target = this.service.currentSequence;
    this.nodeName = this.target.name;
  }

  get sortRoot() {
    return this.service.sortRoot;
  }

  selectTarget(target) {
    this.target = target;
  }

  addRootNode() {
    if (this.newNodeType === 'pose') {
      this.target.addPose(this.poseDetailComponent.getModel(), this.target);
      this.poseDetailComponent.createNewModel();
    }
    if (this.newNodeType === 'series') {
      this.target.addSeries(this.seriesDetailComponent.getModel());
      this.seriesDetailComponent.createNewModel();
    }
  }

  updateName() {
    this.target.name = this.nodeName;
    this.nameChanged = false;
  }

  deletePose(pose) {
    this.target.deletePose(pose);
  }

  deleteSeries(series) {
    this.target.deleteSeries(series);
  }

  toggleSort(target) {
    this.service.toggleSort(target.type);
  }
}
