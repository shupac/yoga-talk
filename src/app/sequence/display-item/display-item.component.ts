import { Component, Input } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
})
export class DisplayItemComponent {
  @Input() public editable: boolean = false;

  constructor(public service: SequenceService) {}
  
  get selectedNode() {
    return this.service.currentEditNode;
  }

  editNode($event, node) {
    $event.stopPropagation();
    if (this.editable) this.service.currentEditNode = node;
  }
}
