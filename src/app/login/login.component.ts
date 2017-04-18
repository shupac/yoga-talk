import { Component } from '@angular/core';
import { AppService } from '../_data/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: AppService) { }

  loginGoogle() {
    this.service.loginGoogle();
  }
}
