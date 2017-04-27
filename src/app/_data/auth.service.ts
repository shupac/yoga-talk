import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  zone: NgZone;
  fbApp: any;
  userId: string;
  userName: string;

  constructor() {
    this.enableAutoLogin();
    this.zone = new NgZone({enableLongStackTrace: false});
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

      localStorage.setItem('uid', this.userId);
      localStorage.setItem('userName', this.userName);

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
    localStorage.removeItem('userName');
    localStorage.removeItem('previouslyLoggedIn');
    return this.fbApp.auth().signOut();
  }

  private enableAutoLogin() {
    console.log('enable auto login');
    if (localStorage['previouslyLoggedIn'])
      this.loginGoogle = () => {
        this.zone.run(() => {
          this.userId = localStorage['uid'];
          this.userName = localStorage['userName'];
        });
        return Promise.resolve(localStorage['uid']);
      }
  }
}
