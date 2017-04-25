import { Injectable } from '@angular/core';
import { Sequence } from './sequence.model';
import { Series } from './series.model';
import { Pose } from './pose.model';
import { Settings } from '../settings';

@Injectable()
export class ModelsService {
  fbRef: any;

  constructor() {}

  getIndices() {
    return new Promise((resolve, reject) => {
      this.fbRef.once('value').then(snapshot => {
        let indices = snapshot.val();
        if (indices) {
          Sequence.nextId = indices.sequence || Settings.defaultIndex;
          Series.nextId = indices.series || Settings.defaultIndex;
          Pose.nextId = indices.pose || Settings.defaultIndex;
        }
        resolve();
      })
      .catch(err => reject(err));
    });
  }

  updateSequenceIndex(index?) {
    index = index || Sequence.nextId;
    return this.fbRef.child('sequence').set(Sequence.nextId);
  }

  updateSeriesIndex(index?) {
    index = index || Series.nextId;
    return this.fbRef.child('series').set(Series.nextId);
  }

  updatePoseIndex(index?) {
    index = index || Pose.nextId;
    return this.fbRef.child('pose').set(Pose.nextId);
  }

  updateIndices(indices) {
    return this.fbRef.set(indices).catch(err => console.log(err));
  }
}