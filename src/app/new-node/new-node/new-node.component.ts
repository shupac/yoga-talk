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
    if (id !== 'root') this.type = 'pose';
  }

  addPose(pose) {
    console.log('add pose', pose);
    this.service.addPose(pose, this.target);
  }

  addSeries(series) {
    this.service.addSeries(series, this.target);
  }
}
