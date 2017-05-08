import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { FirebaseConfig } from '../config';
import { AuthService } from './auth.service';
import { SequenceService } from './sequence.service';
import { ModelsService } from './models.service';
import { AuthGuard } from './auth-guard.service';

const fbApp = firebase.initializeApp(FirebaseConfig);

@Injectable()
export class AppService {
  dbRef: any = fbApp.database().ref();
  userRef: any;

  constructor(
    private router: Router,
    private sequenceService: SequenceService,
    private authService: AuthService,
    private modelsService: ModelsService,
    private authGuard: AuthGuard
  ) {
    this.authService.fbApp = fbApp;
    if (localStorage['previouslyLoggedIn'] === 'true') this.loginGoogle();
  }

  loginGoogle() {
    return this.authService.loginGoogle()
      .then(uid => {
        console.log('logged in', uid);
        this.userRef = this.dbRef.child('users').child(uid);
        this.updateLastLogin();
        this.sequenceService.fbRef = this.userRef.child('sequences');
        this.modelsService.fbRef = this.userRef.child('indices');
      })
      .then(() => this.checkIfNew())
      .then(() => this.initApp())
      .then(() => this.authGuard.redirect());
  }

  initApp() {
    return Promise.all([
      this.sequenceService.getSequences(),
      this.modelsService.getIndices()
    ])
    .catch(err => console.log(err));
  }

  private updateLastLogin() {
    this.userRef.child('lastLogin').set(moment().format());
  }

  private checkIfNew() {
    return this.userRef.child('indices').once('value').then(snapshot => {
      return snapshot.exists();
    })
    .then(exists => {
      if (exists) return true;
      else return this.getDefaultUser().then(this.updateNewUser.bind(this));
    });
  }

  private getDefaultUser() {
    return this.dbRef.child('users').child('defaultUser').once('value').then(snapshot => snapshot.val());
  }

  private updateNewUser(defaultData) {
    console.log(defaultData.sequences, defaultData.indices);
    return Promise.all([
      this.sequenceService.saveSequences(defaultData.sequences),
      this.modelsService.updateIndices(defaultData.indices)
    ]);
  }
}