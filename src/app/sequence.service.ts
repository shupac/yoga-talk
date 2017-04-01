import { Injectable } from '@angular/core';
import { Settings } from './settings';
import STUB_POSES from './stub-poses';

export class Pose {
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

const lexicon = {
  'baddha konasana': 'baada conaasina',
  'tittibhasana': 'teetibaasina',
  'astavakrasana': 'aasta vikraasina',
  'savasana': 'shavaasina',
  'bakasana': 'bakaasina',
  'eka pada bakasana': 'ecaa paada bakaasina',
  'virasana': 'viraasina'
}

@Injectable()
export class SequenceService {
  poses: Pose[] = [];
  currentIndex: number;

  constructor() {
    STUB_POSES.map(name => new Pose({name})).forEach(pose => this.addPose(pose));
  }

  addPose(pose) {
    pose.pronunciation = lexicon[pose.name];
    this.poses.push(pose);
  }

  getSequence() {
    return this.poses;
  }
}
