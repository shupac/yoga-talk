import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { SharedModule } from './_shared/shared.module';
import { EditorModule } from './editor/editor.module';
import { SequencesListModule } from './sequences-list/sequences-list.module';
import { PlayerModule } from './player/player.module';

import { AppComponent } from './app.component';

import { AppService } from './_data/app.service';
import { SequenceService } from './_data/sequence.service';
import { PlayerService } from './_data/player.service';
import { AuthService } from './_data/auth.service';
import { ModelsService } from './_data/models.service';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    EditorModule,
    SequencesListModule,
    PlayerModule,
    DndModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    AppService,
    SequenceService,
    PlayerService,
    AuthService,
    ModelsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
