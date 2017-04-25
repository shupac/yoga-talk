import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceModule } from '../sequence/sequence.module';
import { SharedModule } from '../_shared/shared.module';

import { PlayerComponent } from './player.component';
import { PreviewComponent } from './preview/preview.component';

import { PlayerRouting } from './player-routing.module';
import { PlayerItemComponent } from './player-item/player-item.component';

@NgModule({
  imports: [
    CommonModule,
    SequenceModule,
    SharedModule,
    PlayerRouting
  ],
  declarations: [
    PlayerComponent,
    PreviewComponent,
    PlayerItemComponent
  ],
  exports: []
})
export class PlayerModule { }
