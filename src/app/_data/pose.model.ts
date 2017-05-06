import { Settings } from '../settings';

export class Pose {
  static nextId = 0;
  type = 'pose';
  id: number;
  name: string;
  repeat: string = 'once';
  release: boolean = false;
  seriesPose: boolean = false;
  speed: number = Settings.defaultSpeed;
  timing: string = 'breaths'; // breaths, rounds, minutes
  duration: number = Settings.defaultDuration;
  pronunciation: string;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
  }
}