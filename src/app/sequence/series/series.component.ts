import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  @Input() private id: number;
  @Input() private name: string;
  @Input() private poses;
  @Input() private firstTransitions;
  @Input() private secondTransitions;
  @Input() private currentId;
  @Input() private dragEnabled: boolean;
  @Output() private selectSeries: EventEmitter<number> = new EventEmitter();

  constructor() { }
}
