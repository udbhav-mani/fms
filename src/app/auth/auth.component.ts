import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, catchError, tap } from 'rxjs';
import { UserService } from 'src/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private authSer: AuthService,
    private userSer: UserService,
    private router: Router
  ) {}
  onSubmit(authForm: NgForm) {
    this.authSer
      .login(authForm.form.value.username, authForm.form.value.password)
      .subscribe(
        (responseData) => {
          this.authSer.loginUser(responseData['access_token']);
          const user = this.userSer.token;
          this.router.navigate(['home/' + user.role + '/menu']);
        },
        (error) => {
          if (error.status === 401) {
            alert('Wrong Crededentials');
            authForm.reset();
          } else {
            console.error('Error logging in: ', error);
          }
        }
      );
  }

  ngOnInit() {
    this.authSer.autoLogin();
  }
}
