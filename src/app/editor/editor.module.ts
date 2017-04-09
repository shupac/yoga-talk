import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';

import { NodeDetailComponent } from './node-detail/node-detail.component';
import { NewPoseComponent } from './new-pose/new-pose.component';
import { NewSeriesComponent } from './new-series/new-series.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    NodeDetailComponent,
    NewPoseComponent,
    NewSeriesComponent,
  ],
  exports: [
    NodeDetailComponent
  ]
})
export class EditorModule { }
