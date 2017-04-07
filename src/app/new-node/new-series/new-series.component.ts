import { Component } from '@angular/core';
import { Series } from '../../_data/series.model';

@Component({
  selector: 'app-new-series',
  templateUrl: './new-series.component.html',
  styleUrls: ['./new-series.component.css']
})
export class NewSeriesComponent {
  series: Series = new Series();

  constructor() { }

  addSeries() {
    // this.service.addSeries(this.series);
  }
}
