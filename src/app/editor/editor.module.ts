import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NodeDetailComponent } from './node-detail/node-detail.component';
import { NewPoseComponent } from './new-pose/new-pose.component';
import { NewSeriesComponent } from './new-series/new-series.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NodeDetailComponent,
    NewPoseComponent,
    NewSeriesComponent
  ],
  exports: [
    NodeDetailComponent
  ]
})
export class EditorModule { }
