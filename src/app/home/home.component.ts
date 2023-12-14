import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authSer: AuthService,
    private toastSer: NgToastService
  ) {}

  logout() {
    this.toastSer.info({
      detail: 'Logged out',
      summary: 'Successfully logged out',
    });
    this.authSer.logout();
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }
}
