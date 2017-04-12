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

  isLoggedIn: boolean = false;
  redirectUrl: any;

  constructor(private router: Router) { }

  loginGoogle() {
    firebase.auth().signInWithPopup(googleProvider).then(result => {
      console.log('login successful!');
      let user = result.user;
      this.isLoggedIn = true;
      if (this.redirectUrl) this.router.navigate([this.redirectUrl]);
    }).catch(error => {
      console.log('login error', error);
    });
  }
}
