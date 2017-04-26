import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DisplayItemComponent } from './display-item/display-item.component';
import { SequenceService } from '../_data/sequence.service';
import { Sequence } from '../_data/sequence.model';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: [
    './display-item/display-item.component.css',
    './sequence.component.css'
  ]
})
export class SequenceComponent extends DisplayItemComponent {
  @Input() private target: Sequence;
  @Input() private showDetails: boolean;
  @Output() private add: EventEmitter<any> = new EventEmitter();

  get sortRoot() {
    return this.service.sortRoot;
  }

  get duration() {
    return Math.round(this.service.calcSequenceDuration(this.target)/60);
  }

  scrollToBottom() {
    let el = this.elRef.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}
