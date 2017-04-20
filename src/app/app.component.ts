import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_data/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  get userName() {
    return this.service.userName;
  }

  logout() {
    this.service.logout().then(() => {
      this.router.navigate(['/login'])
    });
  }
}
