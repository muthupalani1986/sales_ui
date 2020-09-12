import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginServiceSub: Subscription
  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    this.loginServiceSub = this._loginService.login({ "email_id": "muthu@gmail.com", "password": "password" }).subscribe((res) => {
      console.log('res', res);
    });
  }
  ngOnDestroy() {
    this.loginServiceSub.unsubscribe();
  }

}
