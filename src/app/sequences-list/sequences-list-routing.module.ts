import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_data/auth-guard.service';
import { SequencesListComponent } from './sequences-list.component';
import { SequenceComponent } from '../sequence/sequence.component';

const paths: Routes = [
  {
    path: '',
    component: SequencesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sequence/:id',
    component: SequencesListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(paths)
  ],
  providers: [
    AuthGuard,
  ],
  exports: [
    RouterModule
  ]
})
export class SequencesListRouting {}