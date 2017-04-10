import { Injectable } from '@angular/core';
import { Pose } from './pose.model';
import { Series } from './series.model';
import { Settings } from '../settings';
import STUB_SEQUENCE from '../stub-sequence';

@Injectable()
export class SequenceService {
  properties = {
    name: 'Sequence',
    type: 'root'
  }
  nodes = [];
  currentSpeechIndex: number = null;

  constructor() {
    this.stubPoses();
  }

  get currentPoseId() {
    if (this.currentSpeechIndex === null) return null;
    return this.speechSequence[this.currentSpeechIndex].id;
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

  getNode(target) {
    if (target.type === 'root') return this.properties;
    if (target.type === 'pose') return this.findPose(target.id);
    if (target.type === 'series') return this.findSeries(target.id);
  }

  addPose(pose, target) {
    console.log('service add pose', pose, target);
    pose.id = Pose.nextId;
    Pose.nextId++;
    if (target.type === 'root') this.nodes.push(pose);
    else this.findSeries(target.id).addPose(pose);
  }

  addSeries(series, targetId) {
    series.id = Series.nextId;
    Series.nextId++;
    this.nodes.push(series);
    return series;
  }

  savePose(pose) {
    console.log('service save pose', pose);
  }

  deletePose(pose) {
    console.log('service delete pose', pose);
    this.nodes = this.nodes.filter(node => {
      if (node.type === 'pose' && node.id !== pose.id) return true;
      else if (node.type === 'series') {
        node.nodes = node.nodes.filter(node => node.id !== pose.id);
        node.firstTransitions = node.firstTransitions.filter(node => node.id !== pose.id);
        node.secondTransitions = node.secondTransitions.filter(node => node.id !== pose.id);
        return true;
      }
    })
  }

  private findPose(id, nodes?) {
    nodes = nodes || this.nodes;
    return nodes.find(node => {
      if (node.type === 'pose' && node.id === id) return node;
      if (node.type === 'series') return this.findPose(id, node.nodes);
    });
  }

  private findSeries(id): Series {
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

  private stubPoses() {
    this.addPose(new Pose({ name: 'baddha konasana', sides: 'bilateral'}), {type: 'root'});
    this.addPose(new Pose({ name: 'seated twist', sides: 'unilateral'}), {type: 'root'});
    this.addSeries(new Series({ name: 'Vignette 1' }), {type: 'root'});
    this.addPose(new Pose({ name: 'warrior 2', sides: 'unilateral'}), {type: 'series', id: 0});
    this.addPose(new Pose({ name: 'reverse warrior', sides: 'unilateral'}), {type: 'series', id: 0});
    this.addSeries(new Series({ name: 'Vignette 2' }), {type: 'root'});
    this.addPose(new Pose({ name: 'warrior 1', sides: 'unilateral'}), {type: 'series', id: 1});
    this.addPose(new Pose({ name: 'archer', sides: 'unilateral'}), {type: 'series', id: 1});
    this.addPose(new Pose({ name: 'savasana', sides: 'bilateral'}), {type: 'root'});
  }
}
