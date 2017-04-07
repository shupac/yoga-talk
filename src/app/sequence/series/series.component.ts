import { Component, Input } from '@angular/core';
import { Series } from '../../sequence.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  @Input() private currentId;
  @Input() private name: string;
  @Input() private poses;
  @Input() private firstTransitions;
  @Input() private secondTransitions;

  series: Series;

  constructor() { }

  addPose() {

  }
}
