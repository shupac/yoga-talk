import { Injectable } from '@angular/core';
import { Settings } from './settings';
import STUB_POSES from './stub-poses';
import STUB_SEQUENCE from './stub-sequence';

export class Pose {
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
  currentIndex: number;

  constructor() {
    // STUB_POSES.map(name => new Pose({name})).forEach(pose => this.addPose(pose));
    // this.poses.push(new SplitSeries());
    this.poses = STUB_SEQUENCE;
  }

  addPose(pose) {
    this.poses.push(pose);
  }

  getDisplaySequence() {
    return this.getSpeechSequence();
    // return this.poses;
  }

  getSpeechSequence() {
    let sequence = [];
    this.poses.forEach(node => sequence = sequence.concat(this.expandNode(node)));
    console.log(sequence);
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
      expanded.push(new Pose({name: 'Split side series', breaths: 0}));
      expanded = expanded.concat(this.expandSeries(node));
    }
    if (node.type === 'vignette') {
      expanded.push(new Pose({name: node.poses.length + ' pose vignette', breaths: 0}));
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
