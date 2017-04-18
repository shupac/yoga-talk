import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { PoseComponent } from './pose/pose.component';
import { SeriesComponent } from './series/series.component';
import { SequenceComponent } from './sequence.component';
import { PlayerComponent } from '../player/player.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DndModule,
    RouterModule,
    // SequenceRouting
  ],
  declarations: [
    PoseComponent,
    SeriesComponent,
    SequenceComponent,
    PlayerComponent
  ],
  exports: [
    SequenceComponent
    // PoseComponent,
    // SeriesComponent
  ]
})
export class SequenceModule {}