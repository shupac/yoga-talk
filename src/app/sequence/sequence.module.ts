import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';

import { NewNodeModule } from '../new-node/new-node.module';

import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { PoseComponent } from './pose/pose.component';
import { SeriesComponent } from './series/series.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DndModule,
    NewNodeModule
  ],
  declarations: [
    SequenceListComponent,
    PoseComponent,
    SeriesComponent
  ],
  exports: [
    SequenceListComponent,
    PoseComponent,
    SeriesComponent
  ]
})
export class SequenceModule {}