import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';

import { RootDetailComponent } from './root-detail/root-detail.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { PoseDetailComponent } from './pose-detail/pose-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    RootDetailComponent,
    SeriesDetailComponent,
    PoseDetailComponent,
  ],
  exports: [
    RootDetailComponent
  ]
})
export class EditorModule { }
