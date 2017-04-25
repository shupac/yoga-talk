export class Sequence {
  static nextId = 0;
  type = 'sequence';
  id: number;
  name: string = 'New Sequence';
  nodes: any[] = [];

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
  }
}