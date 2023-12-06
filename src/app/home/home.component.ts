import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSer: AuthService
  ) {}
  navigation = {
    admin: [
      ['View Menu', 'menu'],
      ['View feedbacks', 'view_fdb'],
      ['List Employees', 'list_emp'],
    ],
    f_emp: [
      ['View Menu', 'menu'],
      ['Place Order', 'order'],
      ['TopUp Card', 'topup_card'],
    ],
    emp: [
      ['View Menu', 'menu'],
      ['Place Order', 'order'],
      ['Add feedback', 'add-fdb'],
    ],
  };
  role: string;
  current_route: string;

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.current_route = this.route.snapshot.url.join('/');
    this.role = params['role'];
  }
  logout() {
    this.authSer.logout();
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }
}
