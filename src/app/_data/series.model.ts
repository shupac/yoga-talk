import { Pose } from './pose.model';

export class Series {
  static nextId = 0;
  type = 'series';
  id: number;
  name: string;
  nodes: Pose[] = [];

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values)
  }

  addPose(pose) {
    this.nodes.push(pose);
  }

  getPoses() {
    return this.nodes;
  }

  getSequence() {
    return []
      .concat(new Pose({ name: 'left side series' }))
      .concat(this.nodes)
      .concat(new Pose({ name: 'right side series' }))
      .concat(this.nodes);
  }
}