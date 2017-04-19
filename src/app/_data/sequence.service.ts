import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';

import { ModelsService } from './models.service';

import { Sequence } from './sequence.model';
import { Series } from './series.model';
import { Pose } from './pose.model';
import { Settings } from '../settings';
import STUB_SEQUENCE from '../stub-sequence';

@Injectable()
export class SequenceService {
  zone: NgZone;
  fbRef: any;
  sequences: any[] = [];
  currentEditNode: any;
  currentSequence: Sequence;
  currentSpeechIndex: number = null;
  sortRoot: string;

  constructor() {
    // this.stubPoses();
    this.zone = new NgZone({enableLongStackTrace: false});
  }

  getSequences(): Promise<Sequence[]> {
    return new Promise((resolve, reject) => {
      this.fbRef.once('value')
      .then(snapshot => {
        let sequences = snapshot.val();
        for (let key in sequences) {
          this.sequences.push(sequences[key])
        }
        resolve(this.sequences);
      })
      .catch(err => reject(err));
    });
  }

  get currentPoseId() {
    if (this.currentSpeechIndex === null) return null;
    return this.currentSequence.speechSequence[this.currentSpeechIndex].id;
  }

  get speechSequence() {
    return this.currentSequence.speechSequence;
  }

  addSequence() {
    let sequence = new Sequence();
    sequence.id = Sequence.nextId;
    sequence.name += sequence.id;
    Sequence.nextId++;
    this.fbRef.child(sequence.id + '').set(sequence).then(() => {
      this.zone.run(() => {
        this.sequences.push(sequence);
      });
    });
  }

  addToSequence(node, sequence) {
    if (node.type === 'pose') {
      node.id = Pose.nextId;
      Pose.nextId++;
    }
    if (node.type === 'series') {
      node.id = Series.nextId;
      Series.nextId++;
    }
    if (!sequence.nodes) sequence.nodes = [];
    sequence.nodes.push(node);
    return node;
  }

  addToSeries(pose, series, type) {
    pose.id = Pose.nextId;
    Pose.nextId++;
    if (type === 'pose') series.poses.push(pose);
    if (type === 'transition1') series.firstTransitions.push(pose);
    if (type === 'transition2') series.secondTransitions.push(pose);
  }

  toggleSort(type) {
    if (this.sortRoot === type) this.sortRoot = null;
    else this.sortRoot = type;
  }

  getSequence(id) {
    this.zone.run(() => {});
    return this.sequences.find(sequence => sequence.id === id);
  }

  // private stubPoses() {
  //   let sequence = new Sequence();
  //   this.currentSequence = sequence;
  //   // this.addSequence(sequence);

  //   let SERIES = {};
  //   STUB_SEQUENCE.forEach(node => {
  //     if (node.type === 'pose') {
  //       let pose = new Pose({
  //         name: node.name,
  //         sides: node['sides']
  //       });
  //       if (node['unilateralOnly']) pose.unilateralOnly = node['unilateralOnly'];
  //       if (node['timing']) pose.timing = node['timing'];
  //       if (node['duration']) pose.duration = node['duration'];

  //       if (node.parent.type === 'sequence')
  //         this.currentSequence.addPose(pose);
  //       if (node.parent.type === 'series') {
  //         SERIES[node.parent['id']].addPose(pose, node['pose'] || 'pose');
  //       }
  //     }

  //     if (node.type === 'series') {
  //       let series = new Series({ name: node.name });
  //       this.currentSequence.addSeries(series);
  //       SERIES[series.id] = series;
  //     }
  //   });
  // }
}
