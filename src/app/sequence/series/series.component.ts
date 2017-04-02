import { Component, Input } from '@angular/core';
import { SplitSeries } from '../../sequence.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent {
  @Input() private 'type': string;
  @Input() private 'poses';
  @Input() private 'firstTransitions';
  @Input() private 'secondTransitions';

  series: SplitSeries;

  constructor() { }

  addPose() {

  }
}
