import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_data/auth-guard.service';
import { EditorComponent } from './editor.component';

const paths: Routes = [
  {
    path: 'sequence/:sid/edit',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'sequence/:sid/edit/:type/:id',
  //   component: EditorComponent,
  //   canActivate: [AuthGuard]
  // }
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
export class EditorRouting {}