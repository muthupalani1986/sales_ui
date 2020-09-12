import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { SESSION_STORAGE } from '../shared/constnats/session-storage.constant';
import { UserDetails } from '../shared/interfaces/user-details.interface';
import { Router } from '@angular/router';
import { NotificationService, Alert } from '../notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginServiceSub: Subscription;
  public loginForm: FormGroup;
  constructor(private _loginService: LoginService,
    private _fb: FormBuilder,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.initLoginForm();

  }
  public onLogin() {
    if (this.loginForm.status === 'VALID') {
      this.loginServiceSub = this._loginService.login(this.loginForm.value).subscribe((res) => {
        const statusCode = _.get(res, 'statusCode');
        if (statusCode === '0000') {
          const user_id = _.get(res, 'user_id');
          const token = _.get(res, 'token');
          const email_id = _.get(res, 'email_id');
          const first_name = _.get(res, 'first_name');
          const last_name = _.get(res, 'last_name');
          const role_name = _.get(res, 'role_name');
          const role_id = _.get(res, 'role_id');
          const userDetails: UserDetails = {
            user_id,
            token,
            email_id,
            first_name,
            last_name,
            role_name,
            role_id
          }
          this._sessionStorageService.setItem(SESSION_STORAGE.currentUser, userDetails);
          this._router.navigate(['/upload-settlement']);
        } else {
          const msg = _.get(res, 'msg');
          const nofity: Alert = {
            show: true,
            type: 'error',
            message: msg
          };
          this._notificationService.setNotification(nofity);
        }
      });
    }
  }
  public initLoginForm() {
    this.loginForm = this._fb.group({
      email_id: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get email_id() {
    return this.loginForm.get('email_id');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnDestroy() {
    this.loginServiceSub.unsubscribe();
  }

}
