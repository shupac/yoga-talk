import { Injectable } from '@angular/core';

export class Pose {
  id: number;
  name: string;
  breaths: number;
  duration: number;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}

@Injectable()
export class SequenceService {
  poses: Pose[] = [
    new Pose({ name: 'down dog' }),
    new Pose({ name: 'chattarunga' }),
    new Pose({ name: 'half moon' }),
  ];

  constructor() { }

  addPose(pose) {
    this.poses.push(pose);
  }

  getSequence() {
    return this.poses;
  }


}
