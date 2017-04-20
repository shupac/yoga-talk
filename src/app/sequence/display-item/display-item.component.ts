import { Component, Input } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';

@Component({
  selector: 'app-display-item',
  styleUrls: ['./display-item.component.css']
})
export class DisplayItemComponent {
  @Input() public editable: boolean = false;

  constructor(public service: SequenceService) {}
}
