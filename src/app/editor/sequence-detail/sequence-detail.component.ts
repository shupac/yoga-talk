import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { Sequence } from '../../_data/sequence.model';
import { SeriesDetailComponent } from '../series-detail/series-detail.component';
import { PoseDetailComponent } from '../pose-detail/pose-detail.component';

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
  @Input() private sortRoot: string;
  @Output() private addPose: EventEmitter<any> = new EventEmitter();
  @Output() private addSeries: EventEmitter<any> = new EventEmitter();
  @Output() private sort: EventEmitter<Sequence> = new EventEmitter();
  @Output() private deleteSequence: EventEmitter<any> = new EventEmitter();

  newNodeType: string = 'pose';
  showAdd: boolean = false;

  constructor(
    private service: SequenceService,
  ) {}

  addRootNode() {
    let node;
    if (this.newNodeType === 'pose') {
      node = this.poseDetailComponent.getModel();
      this.poseDetailComponent.createNewModel();
    }
    if (this.newNodeType === 'series') {
      node = this.seriesDetailComponent.getModel();
      this.seriesDetailComponent.createNewModel();
    }
    this.service.addToSequence(node, this.target);
  }

  showSave() {
    console.log('on changes');
  }
}
