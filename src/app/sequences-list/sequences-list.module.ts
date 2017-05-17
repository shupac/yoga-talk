import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SequencesListComponent } from './sequences-list.component';
import { SequenceModule } from '../sequence/sequence.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SequenceModule,
    SharedModule
  ],
  declarations: [
    SequencesListComponent
  ],
  exports: []
})
export class SequencesListModule {}