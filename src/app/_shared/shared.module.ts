import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBarComponent } from './button-bar/button-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonBarComponent],
  exports: [ButtonBarComponent]
})
export class SharedModule {}