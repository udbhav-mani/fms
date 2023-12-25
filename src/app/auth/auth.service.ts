import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { jwtDecode } from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';

import { UserModel, UserService } from 'src/shared/user.service';
import { environment } from 'environment/environment';
import * as CONSTANTS from 'src/assets/constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  timer: any;
  constants = CONSTANTS.default;
  constructor(
    private httpClient: HttpClient,
    private userSer: UserService,
    private router: Router,
    private toastSer: NgToastService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/login`, {
      username: username,
      password: password,
    });
  }

  loginUser(token: string): void {
    const decodedToken = this.getDecodedAccessToken(token);
    this.setLoginToken(token, decodedToken);
    this.userSer.user.token = token;
    localStorage.setItem('userData', JSON.stringify(this.userSer.user));
    this.autoLogout();
  }

  autoLogin(): void {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return;
    } else {
      const decodedToken = JSON.parse(userData);
      this.setToken(decodedToken);
      this.router.navigate(['home', this.userSer.user.role, 'menu']);
    }
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    this.userSer.user = new UserModel(null, null, '', '', null, '', '');
    clearTimeout(this.timer);
    this.toastSer.info({
      detail: this.constants.LOG_OUT,
      summary: this.constants.LOG_OUT_SUMMARY,
    });
  }

  setToken(decodedToken: any): void {
    console.log(decodedToken);
    this.userSer.user.userid = decodedToken.userid;
    this.userSer.user.grpId = decodedToken.grpId;
    if (decodedToken.role.includes(',')) {
      decodedToken.role = decodedToken.role.split(',')[0];
    }
    this.userSer.user.role = decodedToken.role;
    this.userSer.user.userName = decodedToken.userName;
    this.userSer.user.expiresIn = new Date(decodedToken.expiresIn);
    this.userSer.user.token = decodedToken.token;
    this.userSer.user.name = decodedToken.name;
  }
  setLoginToken(token: string, decodedToken: LoginToken): void {
    console.log(decodedToken);
    this.userSer.user.userid = decodedToken.user_id;
    this.userSer.user.grpId = decodedToken.grp_id;
    if (decodedToken.role.includes(',')) {
      decodedToken.role = decodedToken.role.split(',')[0];
    }
    this.userSer.user.role = decodedToken.role;
    this.userSer.user.userName = decodedToken.sub;
    this.userSer.user.expiresIn = new Date(decodedToken.exp * 1000);
    this.userSer.user.token = token;
    this.userSer.user.name = decodedToken.name;
  }
  autoLogout() {
    this.timer = setTimeout(() => {
      this.logout();
    }, 21600000);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}

interface LoginToken {
  sub: string;
  user_id: number;
  grp_id: number;
  role: string;
  name: string;
  exp: number;
}
