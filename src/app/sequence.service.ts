import { Injectable } from '@angular/core';
import { Settings } from './settings';
import STUB_POSES from './stub-poses';

export class Pose {
  type: 'pose';
  id: number;
  name: string;
  breaths: number = Settings.defaultBreaths;
  duration: number;
  pronunciation: string;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values)
  }
}

class SplitSeries {
  type: 'series';
  id: number;
  poses: Pose[] = [];

  addPose(pose) {
    this.poses.push(pose);
  }

  getPoses() {
    return this.poses;
  }

  getSequence() {
    return []
      .concat(new Pose({ name: 'left side series' }))
      .concat(this.poses)
      .concat(new Pose({ name: 'right side series' }))
      .concat(this.poses);
  }
}

@Injectable()
export class SequenceService {
  poses: Pose[] = [];
  currentIndex: number;

  constructor() {
    STUB_POSES.map(name => new Pose({name})).forEach(pose => this.addPose(pose));
  }

  addPose(pose) {
    this.poses.push(pose);
  }

  getSequence() {
    return this.poses;
  }
}
