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
    // this.stubPoses();
    let sequence = new Sequence();
    this.currentSequence = sequence;
    this.addSequence(sequence);

    Firebase.ref().once('value')
      .then(snapshot => console.log(snapshot.val()))
      .catch(err => console.log(err))
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
    console.log('set sequence', id, this.sequences);
    this.currentSequence = this.findSequence(id);
    console.log(this.currentSequence);
  }

  getNode(type, id) {
    if (type === 'sequence') return this.findSequence(id);
    else return this.currentSequence.getNode(type, id);
  }

  // addNode(node, target) {
  //   if (node.type === 'pose') this.addPose(node, target);
  //   if (node.type === 'series') this.addSeries(node);
  // }



  toggleSort(type) {
    if (this.sortRoot === type) this.sortRoot = null;
    else this.sortRoot = type;
  }

  private findSequence(id): Sequence {
    return this.sequences.find(sequence => sequence.id === id);
  }






  // private stubPoses() {
  //   STUB_SEQUENCE.forEach(node => {
  //     if (node.type === 'pose') {
  //       let pose = new Pose({
  //         name: node.name,
  //         sides: node['sides']
  //       });
  //       if (node['unilateralOnly']) pose.unilateralOnly = node['unilateralOnly'];
  //       if (node['timing']) pose.timing = node['timing'];
  //       if (node['duration']) pose.duration = node['duration'];
  //       this.addPose(pose, node['parent'], node.type);
  //     }

  //     if (node.type === 'series') {
  //       this.addSeries(new Series({
  //         name: node.name
  //       }));
  //     }
  //   });
  // }
}
