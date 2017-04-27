import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  showModal: boolean = false;
  showSave: boolean = false;

  confirmSave() {
    this.showSave = true;
    setTimeout(() => {
      this.showSave = false;
    }, 1000);
  }
}