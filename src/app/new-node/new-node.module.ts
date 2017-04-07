import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewNodeComponent } from './new-node/new-node.component';
import { NewPoseComponent } from './new-pose/new-pose.component';
import { NewSeriesComponent } from './new-series/new-series.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NewNodeComponent,
    NewPoseComponent,
    NewSeriesComponent
  ],
  exports: [
    NewNodeComponent
  ]
})
export class NewNodeModule { }
