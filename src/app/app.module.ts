import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { NewPoseComponent } from './new-pose/new-pose.component';
import { PoseComponent } from './sequence/pose/pose.component';
import { SequenceListComponent } from './sequence/sequence-list/sequence-list.component';
import { SettingsComponent } from './settings/settings.component';

import { SequenceService } from './sequence.service';
import { SeriesComponent } from './sequence/series/series.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NewPoseComponent,
    PoseComponent,
    SequenceListComponent,
    SettingsComponent,
    SeriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SequenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
