import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { PoseComponent } from './pose/pose.component';
import { SeriesComponent } from './series/series.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SequenceListComponent,
    PoseComponent,
    SeriesComponent
  ],
  exports: [
    SequenceListComponent
  ]
})
export class SequenceModule {}