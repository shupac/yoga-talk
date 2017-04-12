import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA5_AATRfXpkTmxBtz0TkiOG2AuAZW5LSE',
  authDomain: 'yogatalk-c050a.firebaseapp.com',
  databaseURL: 'https://yogatalk-c050a.firebaseio.com',
  storageBucket: 'yogatalk-c050a.appspot.com',
  messagingSenderId: '1063387354309'
};

const app = firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const Firebase = app.database();

@Injectable()
export class FirebaseService {

  redirectUrl: any;
  userId: string;

  constructor(private router: Router) {
    // if (localStorage['previouslyLoggedIn'] === 'true') this.loginGoogle();
  }

  loginGoogle() {
    firebase.auth().signInWithPopup(googleProvider).then(result => {
      console.log('login successful!');
      let token = result.credential.accessToken;
      let user = result.user;
      this.userId = user.uid;
      if (this.redirectUrl) this.router.navigate([this.redirectUrl]);
      localStorage.setItem('previouslyLoggedIn', 'true');
    }).catch(error => {
      console.log('login error', error);
    });
  }
}
