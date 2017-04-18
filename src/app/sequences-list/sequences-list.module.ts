import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequencesListComponent } from './sequences-list.component';
import { SequencesListRouting } from './sequences-list-routing.module';
import { SequenceModule } from '../sequence/sequence.module';

@NgModule({
  imports: [
    CommonModule,
    SequencesListRouting,
    SequenceModule
  ],
  declarations: [
    SequencesListComponent
  ],
  exports: []
})
export class SequencesListModule {}