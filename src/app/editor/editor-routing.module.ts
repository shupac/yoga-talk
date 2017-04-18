import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_data/auth-guard.service';
import { EditorComponent } from './editor.component';

const paths: Routes = [
  {
    path: 'edit',
    component: EditorComponent,
    canActivate: [AuthGuard]
  }
    // children: [
    //   {
    //     path: 'edit/:type/:id',
    //     component: EditorComponent
    //   },
    //   {
    //     path: 'edit',
    //     component: EditorComponent
    //   },
    //   {
    //     path: '',
    //     component: PlayerComponent,
    //   },
    // ]

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