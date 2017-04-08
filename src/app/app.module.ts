import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DndModule } from 'ng2-dnd';

import { EditorModule } from './editor/editor.module';
import { SequenceModule } from './sequence/sequence.module';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SettingsComponent } from './settings/settings.component';

import { SequenceService } from './_data/sequence.service';
import { PlayerService } from './_data/player.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EditorModule,
    SequenceModule,
    DndModule.forRoot()
  ],
  declarations: [
    AppComponent,
    PlayerComponent,
    SettingsComponent
  ],
  providers: [SequenceService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
