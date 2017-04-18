import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { SharedModule } from './_shared/shared.module';
import { EditorModule } from './editor/editor.module';
import { SequencesListModule } from './sequences-list/sequences-list.module';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';

import { AppService } from './_data/app.service';
import { SequenceService } from './_data/sequence.service';
import { PlayerService } from './_data/player.service';
import { AuthService } from './_data/auth.service';
import { ModelsService } from './_data/models.service';
// import { AuthGuard } from './_data/auth-guard.service';

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
    DndModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    SettingsComponent,
    LoginComponent,
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
