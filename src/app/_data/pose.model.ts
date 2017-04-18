import { EventEmitter } from '@angular/core';
import { Settings } from '../settings';

export class Pose {
  static nextId = 0;
  static onCreate = new EventEmitter();
  type = 'pose';
  id: number;
  name: string;
  sides: string = 'unilateral';
  timing: string = 'breaths';
  duration: number = Settings.defaultBreaths;
  pronunciation: string;
  unilateralOnly: boolean = false;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
    this.id = Pose.nextId;
    Pose.nextId++;
    Pose.onCreate.emit();
  }
}