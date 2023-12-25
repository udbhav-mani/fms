import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import * as CONSTANTS from 'src/assets/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constants = CONSTANTS.default;
  constructor(private authSer: AuthService) {}

  logout(): void {
    this.authSer.logout();
  }
}
