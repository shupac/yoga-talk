import { EventEmitter } from '@angular/core';
import { Settings } from '../settings';

export class Pose {
  static nextId = 0;
  static onCreate = new EventEmitter();
  type = 'pose';
  id: number;
  name: string;
  repeat: string = 'once';
  seriesPose: boolean = false;
  speed: number = Settings.defaultSpeed;
  timing: string = 'breaths';
  duration: number = Settings.defaultBreaths;
  pronunciation: string;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
    this.id = Pose.nextId;
    Pose.nextId++;
    Pose.onCreate.emit();
  }
}