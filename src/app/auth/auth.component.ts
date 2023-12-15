import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { UserService } from 'src/shared/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  hide: boolean = true;

  hideUnhide() {
    this.hide = !this.hide;
  }
  constructor(
    private authSer: AuthService,
    private userSer: UserService,
    private router: Router,
    private toastSer: NgToastService
  ) {}
  onSubmit(authForm: NgForm) {
    console.log(authForm.form.value);

    this.authSer
      .login(authForm.form.value.username, authForm.form.value.password)
      .subscribe({
        next: (responseData) => {
          this.authSer.loginUser(responseData['access_token']);
          const user = this.userSer.token;
          this.router.navigate(['home/' + user.role + '/menu']);
          this.toastSer.success({
            detail: 'Logged in',
            summary: 'Successfully logged in.',
          });
        },
        error: (err) => {
          if (err.status === 401) {
            this.toastSer.error({
              summary: err.error.error.message,
              detail: 'Error logging in.',
            });
            authForm.reset();
          } else {
            this.toastSer.error({
              detail: err.error.error.message,
              summary: 'Error logging in',
            });
          }
        },
      });
  }

  ngOnInit() {
    this.authSer.autoLogin();
  }
}
