import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';

const paths: Routes = [
  {
    path: 'sequence/:sid/preview',
    component: PreviewComponent,
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