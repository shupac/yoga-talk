import {
  Directive, ElementRef, HostListener, HostBinding,
  Input, Output, EventEmitter } from '@angular/core';
import { SequenceService } from '../_data/sequence.service';

@Directive({
  selector: '[myEditable]',
})
export class EditableDirective {
  @Input() target: any;
  @Input() myEditable: boolean = false;
  @HostListener('click', ['$event']) editNode(e) {
    e.stopPropagation();
    if (this.myEditable) this.service.currentEditNode = this.target;
  };
  @HostBinding('class.active') isActive: boolean = false;
  @HostBinding('class.editable-item') isEditable: boolean = false;

  constructor(private service: SequenceService) {}

  ngDoCheck() {
    this.isActive =
      this.selectedNode &&
      this.selectedNode.type === this.target.type &&
      this.selectedNode.id === this.target.id;

    this.isEditable = this.myEditable;
  }

  get selectedNode() {
    return this.service.currentEditNode;
  }


}
