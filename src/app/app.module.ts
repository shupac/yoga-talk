import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { EditorModule } from './editor/editor.module';
import { SequenceModule } from './sequence/sequence.module';
import { SharedModule } from './_shared/shared.module';
import { MainRoutingModule } from './main/main-routing.module';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SettingsComponent } from './settings/settings.component';

import { SequenceService } from './_data/sequence.service';
import { PlayerService } from './_data/player.service';
import { FirebaseService } from './_data/firebase.service';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EditorModule,
    SequenceModule,
    SharedModule,
    DndModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    MainRoutingModule
  ],
  declarations: [
    AppComponent,
    PlayerComponent,
    SettingsComponent,
    LoginComponent,
    MainComponent
  ],
  providers: [
    SequenceService,
    PlayerService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
