import { Component } from '@angular/core';
import { SequenceService } from '../../_data/sequence.service';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent {
  node;
  type = 'pose';
  target = 'root';

  constructor(private service: SequenceService) {}

  selectTarget(target) {
    console.log('add to', target);
    this.target = target;
    if (target !== 'root') this.type = 'pose';
  }

  addPose(pose) {
    console.log('add pose', pose);
    this.service.addPose(pose, this.target);
  }

  addSeries(series) {
    this.service.addSeries(series, this.target);
  }
}
