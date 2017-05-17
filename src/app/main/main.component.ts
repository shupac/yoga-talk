import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_data/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  get userName() {
    return this.service.userName;
  }

  showDocs() {
    let win = window.open('/getting-started', '_blank');
    win.focus();
  }

  logout() {
    this.service.logout().then(() => {
      this.router.navigate([''])
    });
  }
}
