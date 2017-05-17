import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SequenceModule } from '../sequence/sequence.module';
import { SharedModule } from '../_shared/shared.module';

import { PlayerComponent } from './player.component';
import { PlayerItemComponent } from './player-item/player-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SequenceModule,
    SharedModule
  ],
  declarations: [
    PlayerComponent,
    PlayerItemComponent
  ],
  exports: []
})
export class PlayerModule { }
