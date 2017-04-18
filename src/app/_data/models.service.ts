import { Injectable } from '@angular/core';
import { Sequence } from './sequence.model';
import { Series } from './series.model';
import { Pose } from './pose.model';

@Injectable()
export class ModelsService {
  fbRef: any;

  constructor() {
    Sequence.onCreate.subscribe(() => this.updateSequence());
    Series.onCreate.subscribe(() => this.updateSeries());
    Pose.onCreate.subscribe(() => this.updatePose());
  }

  getIndices() {
    console.log('models service: get indices',);
    return new Promise((resolve, reject) => {
      this.fbRef.once('value').then(snapshot => {
        let indices = snapshot.val();
        if (indices) {
          console.log(indices);
          Sequence.nextId = indices.sequence;
          Series.nextId = indices.series;
          Pose.nextId = indices.pose;
        }
        resolve();
      })
      .catch(err => reject(err));
    });
  }

  updateSequence() {
    this.fbRef.child('sequence').set(Sequence.nextId);
  }

  updateSeries() {
    this.fbRef.child('series').set(Series.nextId);
  }

  updatePose() {
    this.fbRef.child('pose').set(Pose.nextId);
  }
}