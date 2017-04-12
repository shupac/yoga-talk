import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_data/auth-guard.service';
import { MainComponent } from './main.component';
import { EditorComponent } from '../editor/editor.component';

const mainPaths: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:type/:id',
        component: EditorComponent,
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