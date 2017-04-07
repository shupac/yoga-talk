import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NewNodeModule } from './new-node/new-node.module';
import { SequenceModule } from './sequence/sequence.module';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SettingsComponent } from './settings/settings.component';

import { SequenceService } from './sequence.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NewNodeModule,
    SequenceModule
  ],
  declarations: [
    AppComponent,
    PlayerComponent,
    SettingsComponent
  ],
  providers: [SequenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
