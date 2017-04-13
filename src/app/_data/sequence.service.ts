import { Injectable } from '@angular/core';
import { Sequence } from './sequence.model';
import { Series } from './series.model';
import { Pose } from './pose.model';
import { Settings } from '../settings';
import STUB_SEQUENCE from '../stub-sequence';

import { Firebase } from './firebase.service';
@Injectable()
export class SequenceService {
  sequences: Sequence[] = [];
  currentSequence: Sequence;
  currentSpeechIndex: number = null;
  sortRoot: string;

  constructor() {
    let sequence = new Sequence();
    this.currentSequence = sequence;
    this.addSequence(sequence);

    // Firebase.ref().once('value')
    //   .then(snapshot => console.log(snapshot.val()))
    //   .catch(err => console.log(err))
    
    this.stubPoses();
  }

  get currentPoseId() {
    if (this.currentSpeechIndex === null) return null;
    return this.currentSequence.speechSequence[this.currentSpeechIndex].id;
  }

  get speechSequence() {
    return this.currentSequence.speechSequence;
  }

  addSequence(sequence) {
    sequence.id = Sequence.nextId;
    Sequence.nextId++;
    this.sequences.push(sequence);
  }

  setCurrentSequence(id) {
    this.currentSequence = this.findSequence(id);
  }

  getNode(type, id) {
    if (type === 'sequence') return this.findSequence(id);
    else return this.currentSequence.getNode(type, id);
  }

  toggleSort(type) {
    if (this.sortRoot === type) this.sortRoot = null;
    else this.sortRoot = type;
  }

  private findSequence(id): Sequence {
    return this.sequences.find(sequence => sequence.id === id);
  }

  private stubPoses() {
    let SERIES = {};
    STUB_SEQUENCE.forEach(node => {
      if (node.type === 'pose') {
        let pose = new Pose({
          name: node.name,
          sides: node['sides']
        });
        if (node['unilateralOnly']) pose.unilateralOnly = node['unilateralOnly'];
        if (node['timing']) pose.timing = node['timing'];
        if (node['duration']) pose.duration = node['duration'];

        if (node.parent.type === 'sequence')
          this.currentSequence.addPose(pose);
        if (node.parent.type === 'series') {
          SERIES[node.parent['id']].addPose(pose, node['pose'] || 'pose');
        }
      }

      if (node.type === 'series') {
        let series = new Series({ name: node.name });
        this.currentSequence.addSeries(series);
        SERIES[series.id] = series;
      }
    });
  }
}
