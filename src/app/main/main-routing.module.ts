import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_data/auth-guard.service';
import { MainComponent } from './main.component';

import { SequencesListComponent } from '../sequences-list/sequences-list.component';
import { EditorComponent } from '../editor/editor.component';
import { PlayerComponent } from '../player/player.component';

const paths: Routes = [
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SequencesListComponent,
      },
      {
        path: 'sequence/:id',
        component: SequencesListComponent,
      },
      {
        path: 'sequence/:sid/edit',
        component: EditorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sequence/:sid/preview',
        component: PlayerComponent,
        data: { preview: true },
        canActivate: [AuthGuard]
      },
      {
        path: 'sequence/:sid/play',
        component: PlayerComponent,
        data: { preview: false },
        canActivate: [AuthGuard]
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
export class MainRouting {}