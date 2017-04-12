import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  editNode(node) {
    this.router.navigate(['/edit', node.type, node.id])
  }
}
