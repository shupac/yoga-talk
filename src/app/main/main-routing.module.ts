import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_data/auth-guard.service';
import { MainComponent } from './main.component';
import { EditorComponent } from '../editor/editor.component';
import { PlayerComponent } from '../player/player.component';

const mainPaths: Routes = [
  {
    path: 'sequence/:id',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:type/:id',
        component: EditorComponent,
      },
      {
        path: 'edit',
        component: EditorComponent,
      },
      {
        path: 'play/:type/:id',
        component: PlayerComponent,
      },
      {
        path: 'play',
        component: PlayerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainPaths)
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {}