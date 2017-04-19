import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';
import { Series } from '../../_data/series.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  @Input() private target: Series;
  @Input() private dragEnabled: boolean = false;
  @Input() private currentId;

  constructor(private service: SequenceService) {}

  editNode(node) {
    this.service.currentEditNode = node;
  }
}
