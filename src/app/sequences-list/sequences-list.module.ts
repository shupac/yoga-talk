import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequencesListComponent } from './sequences-list.component';
import { SequencesListRouting } from './sequences-list-routing.module';
import { SequenceModule } from '../sequence/sequence.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SequencesListRouting,
    SequenceModule,
    SharedModule
  ],
  declarations: [
    SequencesListComponent
  ],
  exports: []
})
export class SequencesListModule {}