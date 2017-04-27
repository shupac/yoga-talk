import { Injectable } from '@angular/core';
import { Sequence } from './sequence.model';
import { Series } from './series.model';
import { Pose } from './pose.model';
import { SpeechNode } from './speech-node.model';
import { Settings } from '../settings';

@Injectable()
export class PlayerService {
  
  sequence: any[] = [];
  currentIndex: number;

  setCurrentSequence(sequence) {
    if (!(sequence && sequence.nodes)) return [];
    this.sequence = this.expandSequence(sequence);
  }

  get currentNode() {
    return this.sequence[this.currentIndex];
  }

  expandSequence(sequence) {
    let speech = [];
    sequence.nodes.forEach(node => {
      speech = speech.concat(this.expandNode(node))
    });
    return speech;
  }

  private expandNode(node) {
    let expanded = [];
    if (node.type === 'pose') {
      if (node.repeat === 'once') expanded.push(node);
      else if (node.repeat === 'both') {
        expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        expanded.push(Object.assign({}, node, {name: node.name + ' right side'}));
      }
    }
    if (node.type === 'series') {
      expanded.push(new SpeechNode({name: node.name}));
      expanded = expanded.concat(this.expandSeries(node));
    }
    return expanded;
  }

  private expandSeries(series) {
    if (!series.poses) return [];
    let expanded = [];
    series.poses.forEach((node, index) => {
      if (node.type === 'pose') {
        if (index === 0) expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        else expanded.push(node);
      }
      if (node.type === 'series') expanded = expanded.concat(this.expandSeries(node));
    });
    if (expanded.length) expanded.push(new SpeechNode({ name: 'release,' }));
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
    if (expanded.length) expanded.push(new SpeechNode({ name: 'release,' }));
    if (series.secondTransitions) series.secondTransitions.forEach(node => {
      expanded = expanded.concat(this.expandNode(node));
    });
    return expanded;
  }
}