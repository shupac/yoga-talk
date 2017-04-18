import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { AuthService } from './auth.service';
import { SequenceService } from './sequence.service';
import { ModelsService } from './models.service';
import { AuthGuard } from './auth-guard.service';

const firebaseConfig = {
  apiKey: 'AIzaSyA5_AATRfXpkTmxBtz0TkiOG2AuAZW5LSE',
  authDomain: 'yogatalk-c050a.firebaseapp.com',
  databaseURL: 'https://yogatalk-c050a.firebaseio.com',
  storageBucket: 'yogatalk-c050a.appspot.com',
  messagingSenderId: '1063387354309'
};

const fbApp = firebase.initializeApp(firebaseConfig);

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
}