import { Component } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.css']
})
export class NewNodeComponent {
  type = 'pose';
  target: string | number = 'root';

  constructor(private service: SequenceService) {}

  get targetName() {
    return this.service.getSeriesName(this.target);
  }

  selectTarget(id) {
    console.log('add to', id);
    this.target = id;
  }
}
