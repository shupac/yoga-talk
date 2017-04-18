import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { EditorModule } from '../editor/editor.module';

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
    EditorModule
  ],
  declarations: [
    PoseComponent,
    SeriesComponent,
    SequenceComponent,
    PlayerComponent
  ],
  exports: [
    // PoseComponent,
    // SeriesComponent
  ]
})
export class SequenceModule {}