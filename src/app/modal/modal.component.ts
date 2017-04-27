import { Component } from '@angular/core';
import { ModalService } from '../_data/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private service: ModalService) { }

  get showSave() {
    return this.service.showSave;
  }

  get showModal() {
    return this.service.showModal;
  }
}
