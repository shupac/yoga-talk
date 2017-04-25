import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { PlayerComponent } from './player.component';
import { AuthGuard } from '../_data/auth-guard.service';

const paths: Routes = [
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
];

@NgModule({
  imports: [
    RouterModule.forChild(paths)
  ],
  exports: [
    RouterModule
  ]
})
export class PlayerRouting {}