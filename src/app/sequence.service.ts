import { Injectable } from '@angular/core';
import { Settings } from './settings';
import STUB_SEQUENCE from './stub-sequence';

export class Pose {
  static nextId = 0;
  type = 'pose';
  id: number;
  name: string;
  breaths: number = Settings.defaultBreaths;
  sides: string = 'unilateral';
  timing: string = 'breaths';
  duration: number;
  pronunciation: string;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values)
  }
}

export class Series {
  static nextId = 0;
  type = 'series';
  id: number;
  name: string;
  nodes: Pose[] = [];

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

@Injectable()
export class SequenceService {
  nodes = [];
  currentSpeechIndex: number = null;

  constructor() {
    // this.nodes = STUB_SEQUENCE;
    this.addPose(new Pose({ name: 'baddha konasana', sides: 'bilateral'}));
    this.addPose(new Pose({ name: 'seated twist', sides: 'unilateral'}));
  }

  get currentPoseId() {
    if (this.currentSpeechIndex === null) return null;
    return this.speechSequence[this.currentSpeechIndex].id;
  }

  addPose(pose) {
    pose.id = Pose.nextId;
    Pose.nextId++;
    this.nodes.push(pose);
  }

  addSeries(series) {
    series.id = Series.nextId;
    Series.nextId++;
    this.nodes.push(series);
  }

  get displaySequence() {
    // return this.speechSequence;
    return this.nodes;
  }

  get speechSequence() {
    let sequence = [];
    this.nodes.forEach(node => sequence = sequence.concat(this.expandNode(node)));
    return sequence;
  }

  private expandNode(node) {
    let expanded = [];
    if (node.type === 'pose') {
      if (node.sides === 'bilateral') expanded.push(node);
      else if (node.sides === 'unilateral') {
        expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        expanded.push(Object.assign({}, node, {name: node.name + ' right side'}));
      }
    }
    if (node.type === 'series') {
      expanded.push(new Pose({name: 'Single side series', duration: Settings.noPoseDuration}));
      expanded = expanded.concat(this.expandSeries(node));
    }
    if (node.type === 'vignette') {
      expanded.push(new Pose({name: node.nodes.length + ' pose vignette', duration: Settings.noPoseDuration}));
      expanded = expanded.concat(this.expandSeries(node));
    }
    return expanded;
  }

  private expandSeries(series) {
    let expanded = [];
    series.nodes.forEach((node, index) => {
      if (node.type === 'pose') {
        if (index === 0) expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        else expanded.push(node);
      }
      if (node.type === 'series') expanded = expanded.concat(this.expandSeries(node));
    });
    if (series.firstTransitions) series.firstTransitions.forEach(node => {
      expanded = expanded.concat(this.expandNode(node));
    });
    series.nodes.forEach((node, index) => {
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
