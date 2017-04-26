import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  fbApp: any;
  userId: string;
  userName: string;

  constructor() {
    // this.enableTest();
  }

  loginGoogle() {
    console.log('google login');
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    return this.fbApp.auth().signInWithPopup(googleProvider).then(result => {
      console.log('login successful!');
      let token = result.credential.accessToken;
      let user = result.user;
      this.userId = user.uid;
      this.userName = user.displayName.split(' ')[0];

      localStorage.setItem('uid', user.uid);

      localStorage.setItem('previouslyLoggedIn', 'true');
      return user.uid;
    }).catch(error => {
      console.log('login error', error);
    });
  }

  logout() {
    this.userId = null;
    this.userName = null;
    localStorage.removeItem('uid');
    localStorage.removeItem('previouslyLoggedIn');
    return this.fbApp.auth().signOut();
  }

  private enableTest() {
    console.log('enable testing');
    this.loginGoogle = () => {
      this.userId = localStorage['uid'];
      this.userName = 'Test';
      console.log('google login --test', this.userId);
      return Promise.resolve(this.userId);
    }
  }
}
