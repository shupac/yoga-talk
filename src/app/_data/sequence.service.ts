import { Injectable } from '@angular/core';
import { Pose } from './pose.model';
import { Series } from './series.model';
import { Settings } from '../settings';
import STUB_SEQUENCE from '../stub-sequence';

@Injectable()
export class SequenceService {
  nodes = [];
  currentSpeechIndex: number = null;

  constructor() {
    // this.nodes = STUB_SEQUENCE;
    this.addPose(new Pose({ name: 'baddha konasana', sides: 'bilateral'}), 'root');
    this.addPose(new Pose({ name: 'seated twist', sides: 'unilateral'}), 'root');
    this.addSeries(new Series({ name: 'Standing Pose Series' }), 'root');
    this.addPose(new Pose({ name: 'warrior 2', sides: 'unilateral'}), 0);
    this.addPose(new Pose({ name: 'reverse warrior', sides: 'unilateral'}), 0);
    this.addPose(new Pose({ name: 'savasana', sides: 'bilateral'}), 'root');
  }

  get currentPoseId() {
    if (this.currentSpeechIndex === null) return null;
    return this.speechSequence[this.currentSpeechIndex].id;
  }

  addPose(pose, target) {
    pose.id = Pose.nextId;
    Pose.nextId++;
    if (target === 'root') this.nodes.push(pose);
    else this.findSeries(target).addPose(pose);
    console.log(this.nodes);
  }

  addSeries(series, targetId) {
    series.id = Series.nextId;
    Series.nextId++;
    this.nodes.push(series);
  }

  getSeriesName(id) {
    if (id === 'root') return 'Sequence';
    else return this.findSeries(id).name;
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

  private findSeries(id) {
    return this.nodes.find(node => node.type === 'series' && node.id === id);
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
      expanded.push(new Pose({name: node.name, duration: Settings.noPoseDuration}));
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
