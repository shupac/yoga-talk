import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ng2-dnd';

import { SharedModule } from './_shared/shared.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';

import { AppService } from './_data/app.service';
import { SequenceService } from './_data/sequence.service';
import { PlayerService } from './_data/player.service';
import { AuthService } from './_data/auth.service';
import { ModalService } from './_data/modal.service';
import { ModelsService } from './_data/models.service';

import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { DocsComponent } from './docs/docs.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'getting-started', component: DocsComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    MainModule,
    DndModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ModalComponent,
    DocsComponent,
  ],
  providers: [
    AppService,
    SequenceService,
    PlayerService,
    AuthService,
    ModelsService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
