import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Series } from '../../_data/series.model';

@Component({
  selector: 'app-new-series',
  templateUrl: './new-series.component.html',
  styleUrls: ['./new-series.component.css']
})
export class NewSeriesComponent {
  @Input() private name: string;
  @Output() private add: EventEmitter<Series> = new EventEmitter();

  series: Series = new Series();

  constructor() { }

  addSeries(name?: string) {
    this.series.name = name || this.name;
    this.add.emit(this.series);
    this.series = new Series();
  }
}
