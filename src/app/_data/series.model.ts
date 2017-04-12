import { Pose } from './pose.model';

export class Series {
  static nextId = 0;
  type = 'series';
  id: number;
  name: string;
  nodes: Pose[] = [];
  firstTransitions: Pose[] = [];
  secondTransitions: Pose[] = [];

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values)
  }

  addPose(pose, type) {
    if (type === 'pose') this.nodes.push(pose);
    if (type === 'transition1') this.firstTransitions.push(pose);
    if (type === 'transition2') this.secondTransitions.push(pose);
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