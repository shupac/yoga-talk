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
  sortRoot: string;

  constructor(
    private modelsService: ModelsService
  ) {
    this.zone = new NgZone({enableLongStackTrace: false});
  }

  get newestSequenceId() {
    if (!this.sequences) return null;
    return this.sequences[this.sequences.length - 1].id;
  }

  getSequences(): Promise<Sequence[]> {
    return new Promise((resolve, reject) => {
      this.fbRef.once('value')
      .then(snapshot => {
        let sequences = snapshot.val();
        if (sequences) this.sequences = sequences;
        resolve(this.sequences);
      })
      .catch(err => reject(err));
    });
  }

  setCurrentSequence(id) {
    this.zone.run(() => {
      this.currentSequence = this.cloneSequence(this.getSequence(id));
    });
  }

  getSequence(id) {
    this.zone.run(() => {});
    return this.sequences.find(sequence => sequence.id === id);
  }

  addSequence() {
    let sequence = new Sequence();
    sequence.id = Sequence.nextId;
    sequence.name += sequence.id;
    Sequence.nextId++;
    this.modelsService.updateSequenceIndex();
    this.zone.run(() => {
      this.sequences.push(sequence);
    });
    this.saveSequences();
    return sequence;
  }

  addToSequence(node, sequence) {
    if (node.type === 'pose') {
      node.id = Pose.nextId;
      Pose.nextId++;
      this.modelsService.updatePoseIndex();
    }
    if (node.type === 'series') {
      node.id = Series.nextId;
      Series.nextId++;
      this.modelsService.updateSeriesIndex();
    }
    if (!sequence.nodes) sequence.nodes = [];
    sequence.nodes.push(node);
    this.saveCurrentSequence();
    this.currentEditNode = node;
    return node;
  }

  addToSeries(pose, series, type) {
    pose.id = Pose.nextId;
    Pose.nextId++;
    this.modelsService.updatePoseIndex();
    if (type === 'pose') {
      if (series.poses) series.poses.push(pose);
      else series.poses = [pose];
    }
    if (type === 'transition1') {
      if (series.firstTransitions) series.firstTransitions.push(pose);
      else series.firstTransitions = [pose];
    }
    if (type === 'transition2') {
      if (series.secondTransitions) series.secondTransitions.push(pose);
      else series.secondTransitions = [pose];
    }
    this.saveCurrentSequence();
  }

  deleteSequence(id) {
    this.sequences = this.sequences.filter(s => s.id !== id);
    this.saveSequences();
  }

  deleteSeries(id) {
    this.currentSequence.nodes = this.currentSequence.nodes.filter(node => {
      if (node.type === 'pose') return true;
      if (node.type === 'series' && node.id !== id) return true;
      return false;
    });
    this.saveCurrentSequence();
  }

  deletePose(id) {
    this.currentSequence.nodes = this.currentSequence.nodes.filter(node => {
      if (node.type === 'pose' && node.id !== id) return true;
      if (node.type === 'series') {
        if (node.poses) node.poses = node.poses.filter(node => node.id !== id);
        if (node.firstTransitions) node.firstTransitions = node.firstTransitions.filter(node => node.id !== id);
        if (node.secondTransitions) node.secondTransitions = node.secondTransitions.filter(node => node.id !== id);
        return true;
      }
    });
    this.saveCurrentSequence();
  }

  saveSequences(sequences?) {
    sequences = sequences || this.sequences;
    return this.fbRef.set(sequences);
  }

  saveCurrentSequence() {
    this.sequences = this.sequences.map(sequence => {
      if (sequence.id !== this.currentSequence.id) return sequence;
      else return this.currentSequence;
    });
    this.saveSequences();
  }

  toggleSort(type) {
    if (this.sortRoot === type) this.sortRoot = null;
    else this.sortRoot = type;
  }

  calcSequenceDuration(sequence) {
    let duration = 0;
    if (!sequence.nodes) return duration;
    sequence.nodes.forEach(node => {
      if (node.type === 'pose') duration += this.calcPoseDuration(node);
      if (node.type === 'series') duration += this.calcSeriesDuration(node);
    });
    return duration;
  }

  calcSeriesDuration(series) {
    let duration = 0;
    if (series.poses) series.poses.forEach(pose => duration += this.calcPoseDuration(pose));
    if (series.firstTransitions) series.firstTransitions.forEach(pose => duration += this.calcPoseDuration(pose));
    if (series.secondTransitions) series.secondTransitions.forEach(pose => duration += this.calcPoseDuration(pose));
    return duration;
  }

  calcPoseDuration(pose) {
    let duration;
    if (pose.timing === 'minutes') duration = pose.duration * 60 + Settings.transitionInPause + Settings.transitionOutPause;
    else duration = pose.duration * pose.speed + Settings.transitionInPause + Settings.transitionOutPause;
    if (pose.repeat === 'both') duration *= 2;
    return duration;
  }

  private cloneSequence(sequence) {
    if (!sequence) return null;
    return JSON.parse(JSON.stringify(sequence)); // REWRITE?
  }
}
