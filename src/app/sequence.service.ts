import { Injectable } from '@angular/core';

export class Pose {
  id: number;
  name: string;
  breaths: number;
  duration: number;
  pronunciation: string;

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}

const lexicon = {
  'baddha konasana': 'bada conaasina',
  'tittibhasana': 'teetee baasina',
  'astavakrasana': 'aasta vikraasina',
  'savasana': 'shavaasina',
  'bakasana': 'bakaasina',
  'eka pada': 'ecaa paada',
  'virasana': 'viraasina'
}

export class SequenceService {
  poses: Pose[] = [];

  constructor() {
    let poses = [
      new Pose({ name: 'baddha konasana' }),
      new Pose({ name: 'tittibhasana' }),
      new Pose({ name: 'astavakrasana' }),
      new Pose({ name: 'virasana' }),
      new Pose({ name: 'savasana' }),
      new Pose({ name: 'chatarunga' }),
      new Pose({ name: 'down dog' }),
      new Pose({ name: 'half moon' }),
      new Pose({ name: 'cobra' }),
      new Pose({ name: 'lounge lizard' }),
      new Pose({ name: 'twisting lunge' }),
      new Pose({ name: 'seated sidebend' }),
      new Pose({ name: 'handstand' }),
    ];

    poses.forEach(pose => this.addPose(pose));
  }

  addPose(pose) {
    pose.pronunciation = lexicon[pose.name];
    this.poses.push(pose);
  }

  getSequence() {
    return this.poses;
  }


}
