import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { SequenceModule } from '../sequence/sequence.module';

import { EditorComponent } from './editor.component';
import { SequenceDetailComponent } from './sequence-detail/sequence-detail.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { PoseDetailComponent } from './pose-detail/pose-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    SequenceModule
  ],
  declarations: [
    EditorComponent,
    SequenceDetailComponent,
    SeriesDetailComponent,
    PoseDetailComponent
  ],
  exports: []
})
export class EditorModule { }
