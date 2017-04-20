import { Component, Input } from '@angular/core';
import { DisplayItemComponent } from '../display-item/display-item.component';
import { Series } from '../../_data/series.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: [
    '../display-item/display-item.component.css',
    './series.component.css'
  ]
})
export class SeriesComponent extends DisplayItemComponent {
  @Input() private target: Series;
  @Input() private dragEnabled: boolean = false;
}
