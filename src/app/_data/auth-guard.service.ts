import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  redirectUrl: any;

  constructor(
    private firebaseService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    // return true;
    return this.checkLogin(url);
  }


  checkLogin(url: string): boolean {
    if (this.firebaseService.userId) { return true; }

    this.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }

  redirect() {
    if (this.redirectUrl === '/') this.redirectUrl = '';
    this.router.navigate(this.redirectUrl || ['']);
  }
}