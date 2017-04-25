import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SequenceModule } from '../sequence/sequence.module';
import { SharedModule } from '../_shared/shared.module';

import { PlayerComponent } from './player.component';
import { PreviewComponent } from './preview/preview.component';

import { PlayerRouting } from './player-routing.module';
import { PlayerItemComponent } from './player-item/player-item.component';
import { LexiconComponent } from './lexicon/lexicon.component';

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
    PreviewComponent,
    PlayerItemComponent,
    LexiconComponent
  ],
  exports: []
})
export class PlayerModule { }
