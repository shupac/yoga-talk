import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent {
  @Input() private options = [];
  @Input() private model;
  @Input() private label: string;
  @Output() private modelChange: EventEmitter<any> = new EventEmitter();

  constructor() {}
}
