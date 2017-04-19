import { Injectable } from '@angular/core';
import { Sequence } from './sequence.model';
import { Series } from './series.model';
import { Pose } from './pose.model';

@Injectable()
export class ModelsService {
  fbRef: any;

  constructor() {}

  getIndices() {
    console.log('models service: get indices',);
    return new Promise((resolve, reject) => {
      this.fbRef.once('value').then(snapshot => {
        let indices = snapshot.val();
        Sequence.nextId = indices.sequence || 0;
        Series.nextId = indices.series || 0;
        Pose.nextId = indices.pose || 0;
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
    console.log('pose id', Pose.nextId);
    this.fbRef.child('pose').set(Pose.nextId);
  }
}