import { Pose } from './pose.model';
import { Series } from './series.model';
import { Settings } from '../settings';

export class Sequence {
  static nextId = 0;
  type = 'sequence';
  id: number;
  name: string = 'Sequence';
  nodes: any[] = [];

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
  }

  get speechSequence() {
    let sequence = [];
    // this.nodes.forEach(node => sequence = sequence.concat(this.expandNode(node)));
    return sequence;
  }

  private expandNode(node) {
    let expanded = [];
    if (node.type === 'pose') {
      if (node.sides === 'bilateral') expanded.push(node);
      else if (node.sides === 'unilateral') {
        expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        expanded.push(Object.assign({}, node, {name: node.name + ' right side'}));
      }
    }
    if (node.type === 'series') {
      expanded.push(new Pose({name: node.name, duration: Settings.noPoseDuration}));
      expanded = expanded.concat(this.expandSeries(node));
    }
    return expanded;
  }

  private expandSeries(series) {
    let expanded = [];
    series.poses.forEach((node, index) => {
      if (node.type === 'pose') {
        if (index === 0) expanded.push(Object.assign({}, node, {name: node.name + ' left side'}));
        else expanded.push(node);
      }
      if (node.type === 'series') expanded = expanded.concat(this.expandSeries(node));
    });
    if (series.firstTransitions) series.firstTransitions.forEach(node => {
      expanded = expanded.concat(this.expandNode(node));
    });
    series.poses.forEach((node, index) => {
      if (node.type === 'pose') {
        if (index === 0) expanded.push(Object.assign({}, node, {name: node.name + ' right side'}));
        else expanded.push(node);
      }
      if (node.type === 'series') expanded = expanded.concat(this.expandSeries(node));
    });
    if (series.secondTransitions) series.secondTransitions.forEach(node => {
      expanded = expanded.concat(this.expandNode(node));
    });
    return expanded;
  }

  private saveToDB() {
    console.log('save to DB');
  }
}