import { Component } from '@angular/core';
import { FirebaseService } from '../_data/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: FirebaseService) { }

  loginGoogle() {
    this.service.loginGoogle();
  }
}
