import { NgModule } from '@angular/core';
import { ButtonBarDirective, RadioButtonDirective } from './button-bar.directive';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [
    ButtonBarDirective,
    RadioButtonDirective,
    ReversePipe
  ],
  exports: [
    ButtonBarDirective,
    RadioButtonDirective,
    ReversePipe
  ]
})
export class SharedModule {}