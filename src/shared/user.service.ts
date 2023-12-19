import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor() {}
  user: UserModel = new UserModel(null, null, '', '', null, '', '');

  get token() {
    if (this.user.token) {
      return this.user;
    }
    return null;
  }
}

export class UserModel {
  constructor(
    public userid: number,
    public grpId: number,
    public role: string,
    public userName: string,
    public expiresIn: any,
    public name: any,
    public token: any
  ) {}
}
