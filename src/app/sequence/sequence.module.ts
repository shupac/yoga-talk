import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { PoseComponent } from './pose/pose.component';
import { SeriesComponent } from './series/series.component';
import { SequenceComponent } from './sequence.component';
import { PlayerComponent } from '../player/player.component';

import { EditableDirective } from './editable.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DndModule,
    RouterModule,
  ],
  declarations: [
    PoseComponent,
    SeriesComponent,
    SequenceComponent,
    PlayerComponent,
    EditableDirective
  ],
  exports: [
    SequenceComponent
  ]
})
export class SequenceModule {}