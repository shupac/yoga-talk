import { Settings } from '../settings';

export class Pose {
  static nextId = 0;
  type = 'pose';
  id: number;
  name: string;
  breaths: number = Settings.defaultBreaths;
  sides: string = 'unilateral';
  timing: string = 'breaths';
  duration: number;
  pronunciation: string;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values)
  }
}