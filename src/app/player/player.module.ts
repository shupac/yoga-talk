import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceModule } from '../sequence/sequence.module';

import { PreviewComponent } from './preview/preview.component';

import { PlayerRouting } from './player-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SequenceModule,
    PlayerRouting
  ],
  declarations: [
    PreviewComponent
  ],
  exports: []
})
export class PlayerModule { }
