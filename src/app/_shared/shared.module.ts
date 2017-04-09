import { NgModule } from '@angular/core';
import { ButtonBarDirective, RadioButtonDirective } from './button-bar.directive';

@NgModule({
  declarations: [
    ButtonBarDirective,
    RadioButtonDirective
  ],
  exports: [
    ButtonBarDirective,
    RadioButtonDirective
  ]
})
export class SharedModule {}