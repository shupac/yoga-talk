import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SequenceModule } from '../sequence/sequence.module';
import { SharedModule } from '../_shared/shared.module';

import { PlayerComponent } from './player.component';

import { PlayerRouting } from './player-routing.module';
import { PlayerItemComponent } from './player-item/player-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SequenceModule,
    SharedModule,
    PlayerRouting
  ],
  declarations: [
    PlayerComponent,
    PlayerItemComponent
  ],
  exports: []
})
export class PlayerModule { }
