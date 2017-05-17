import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRouting } from './main-routing.module';
import { EditorModule } from '../editor/editor.module';
import { SequencesListModule } from '../sequences-list/sequences-list.module';
import { PlayerModule } from '../player/player.module';

import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    EditorModule,
    SequencesListModule,
    PlayerModule,
    MainRouting
  ],
  declarations: [
    MainComponent
  ],
  exports: []
})
export class MainModule { }