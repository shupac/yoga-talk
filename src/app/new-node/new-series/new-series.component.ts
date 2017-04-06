import { Component } from '@angular/core';
import { Series, SequenceService } from '../../sequence.service';

@Component({
  selector: 'app-new-series',
  templateUrl: './new-series.component.html',
  styleUrls: ['./new-series.component.css']
})
export class NewSeriesComponent {
  series: Series = new Series();

  constructor(private service: SequenceService) { }

  addSeries() {
    this.service.addSeries(this.series);
  }
}
