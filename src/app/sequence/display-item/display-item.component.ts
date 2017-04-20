import { Component } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
})
export class DisplayItemComponent {

  constructor(public service: SequenceService) {}
  
  get selectedNode() {
    return this.service.currentEditNode;
  }

  editNode(node) {
    this.service.currentEditNode = node;
  }
}
