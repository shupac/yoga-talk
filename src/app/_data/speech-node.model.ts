export class SpeechNode {
  name: string;
  repeat: string;
  timing: string; // breaths, rounds, minutes
  duration: number;
  speed: number;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
  }
}