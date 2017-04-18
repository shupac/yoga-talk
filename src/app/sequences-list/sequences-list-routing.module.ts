import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_data/auth-guard.service';
import { SequencesListComponent } from './sequences-list.component';
import { SequenceComponent } from '../sequence/sequence.component';
import { PlayerComponent } from '../player/player.component';
import { EditorComponent } from '../editor/editor.component';

const paths: Routes = [
  {
    path: '',
    component: SequencesListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'sequence/:id',
        component: SequenceComponent,
        children: [
          {
            path: 'edit/:type/:id',
            component: EditorComponent
          },
          {
            path: 'edit',
            component: EditorComponent
          },
          {
            path: '',
            component: PlayerComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(paths)
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule
  ]
})
export class SequencesListRouting {}