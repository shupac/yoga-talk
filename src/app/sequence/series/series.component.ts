import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pose } from '../../_data/pose.model';
import { Series } from '../../_data/series.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  @Input() private node: Pose;
  @Input() private currentId;
  @Input() private dragEnabled: boolean;
  @Output() private selectPose: EventEmitter<Pose> = new EventEmitter();
  @Output() private selectSeries: EventEmitter<number> = new EventEmitter();
  @Output() private sortStart: EventEmitter<any> = new EventEmitter();
  @Output() private sortEnd: EventEmitter<any> = new EventEmitter();

  edit: boolean = false;

  constructor() { }
}
