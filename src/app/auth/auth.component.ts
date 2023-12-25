import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from './auth.service';
import { UserService } from 'src/shared/user.service';
import * as CONSTANTS from 'src/assets/constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  hide = true;
  constants = CONSTANTS.default;
  loginSubscription: Subscription;

  constructor(
    private authSer: AuthService,
    private userSer: UserService,
    private router: Router,
    private toastSer: NgToastService
  ) {}

  ngOnInit(): void {
    this.authSer.autoLogin();
  }

  hideUnhide() {
    this.hide = !this.hide;
  }

  onSubmit(authForm: NgForm) {
    const { username, password } = authForm.form.value;

    this.loginSubscription = this.authSer.login(username, password).subscribe({
      next: (responseData) => {
        this.authSer.loginUser(responseData['access_token']);
        const user = this.userSer.token;
        this.router.navigate(['home', user.role, 'menu']);
        this.toastSer.success({
          detail: this.constants.SUCCESS_MESSAGE,
          summary: this.constants.AUTH_LOGGED_IN,
        });
      },
      error: (err) => {
        if (err.status === 401) {
          this.handleUnauthorizedError();
        } else {
          this.handleGeneralError(err);
        }
      },
    });
  }

  private handleUnauthorizedError(): void {
    this.toastSer.error({
      detail: this.constants.AUTH_INVALID_CREDENTIALS,
    });
  }

  private handleGeneralError(err: HttpErrorResponse): void {
    this.toastSer.error({
      detail: err.error.error.message,
    });
  }
}
