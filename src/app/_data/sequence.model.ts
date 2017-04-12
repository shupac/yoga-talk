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
    Object.assign(this, values)
  }

  get speechSequence() {
    let sequence = [];
    this.nodes.forEach(node => sequence = sequence.concat(this.expandNode(node)));
    return sequence;
  }

  getNode(type, id) {
    if (type === 'pose') return this.getPose(id);
    if (type === 'series') return this.getSeries(id);
  }

  addPose(pose, target, type?) {
    pose.id = Pose.nextId;
    Pose.nextId++;
    this.nodes.push(pose);
  }

  addSeries(series) {
    series.id = Series.nextId;
    Series.nextId++;
    this.nodes.push(series);
    return series;
  }

  deletePose(pose) {
    console.log('sequence delete pose', pose);
    this.nodes = this.nodes.filter(node => {
      if (node.type === 'series') return true;
      if (node.type === 'pose' && node.id !== pose.id) return true;
    });
  }

  deleteSeries(series) {
    this.nodes = this.nodes.filter(node => {
      if (node.type === 'pose') return true;
      if (node.type === 'series' && node.id !== series.id) return true;
      return false;
    });
  }

  private getSeries(id): Series {
    return this.nodes.find(node => node.type === 'series' && node.id === id);
  }

  private getPose(id, nodes?) {
    nodes = nodes || this.nodes;
    return nodes.find(node => {
      if (node.type === 'pose' && node.id === id) return node;
      if (node.type === 'series') return node.getPose(id);
    });
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
}