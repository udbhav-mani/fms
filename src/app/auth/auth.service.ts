import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel, UserService } from 'src/shared/user.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private userSer: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.autoLogin();
  }
  login(username: string, password: string) {
    return this.httpClient.post('http://127.0.0.1:8000/login', {
      username: username,
      password: password,
    });
  }
  loginUser(token: string) {
    let decodedToken = this.getDecodedAccessToken(token);
    this.setToken(decodedToken);
    this.userSer.user.token = token;
    localStorage.setItem('userData', JSON.stringify(this.userSer.user));
  }

  autoLogin() {
    let userData = localStorage.getItem('userData');

    if (!userData) {
      return;
    } else {
      let decodedToken = JSON.parse(userData);
      this.setToken(decodedToken);
      this.router.navigate(['home/' + this.userSer.user.role]);
    }
  }
  logout() {
    this.userSer.user = new UserModel(null, null, '', '', null, '');
  }
  setToken(decodedToken) {
    this.userSer.user.userid = decodedToken.user_id;
    this.userSer.user.grpId = decodedToken.grp_id;
    if (decodedToken.role.includes(',')) {
      decodedToken.role = decodedToken.role.split(',')[0];
    }
    this.userSer.user.role = decodedToken.role;
    this.userSer.user.userName = decodedToken.sub;
    this.userSer.user.expiresIn = new Date(decodedToken.exp * 1000);
    this.userSer.user.token = decodedToken.token;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}
