import { Injectable } from '@angular/core';
import { Settings } from './settings';
import STUB_SEQUENCE from './stub-sequence';

export class Pose {
  static nextId = 0;
  type = 'pose';
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

export class SplitSeries {
  static nextId = 0;
  type = 'series';
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
  poses = [];
  currentSpeechIndex: number = null;

  constructor() {
    this.poses = STUB_SEQUENCE;
  }

  get currentPoseId() {
    if (this.currentSpeechIndex === null) return null;
    return this.speechSequence[this.currentSpeechIndex].id;
  }

  addPose(pose) {
    this.poses.push(pose);
  }

  get displaySequence() {
    // return this.getSpeechSequence();
    return this.poses;
  }

  get speechSequence() {
    let sequence = [];
    this.poses.forEach(node => sequence = sequence.concat(this.expandNode(node)));
    return sequence;
  }

  private expandNode(node) {
    let expanded = [];
    if (node.type === 'pose') {
      if (node.unary) expanded.push(node);
      else {
        expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        expanded.push(Object.assign({}, node, {name: node.name + ' right side'}));
      }
    }
    if (node.type === 'series') {
      expanded.push(new Pose({name: 'Single side series', duration: Settings.noPoseDuration}));
      expanded = expanded.concat(this.expandSeries(node));
    }
    if (node.type === 'vignette') {
      expanded.push(new Pose({name: node.poses.length + ' pose vignette', duration: Settings.noPoseDuration}));
      expanded = expanded.concat(this.expandSeries(node));
    }
    return expanded;
  }

  private expandSeries(series) {
    let expanded = [];
    series.poses.forEach((node, index) => {
      if (node.type === 'pose') {
        if (index === 0) expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        else expanded.push(node);
      }
      if (node.type === 'series') expanded = expanded.concat(this.expandSeries(node));
    });
    if (series.firstTransitions) series.firstTransitions.forEach(node => {
      expanded = expanded.concat(this.expandNode(node));
    });
    series.poses.forEach((node, index) => {
      if (node.type === 'pose') {
        if (index === 0) expanded.push(Object.assign({}, node, {name: node.name + ' right side'}));
        else expanded.push(node);
      }
      if (node.type === 'series') expanded = expanded.concat(this.expandSeries(node));
    });
    if (series.secondTransitions) series.secondTransitions.forEach(node => {
      expanded = expanded.concat(this.expandNode(node));
    });
    return expanded;
  }
}
