import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserModel, UserService } from 'src/shared/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSer: AuthService,
    private userSer: UserService
  ) {}

  user: UserModel;
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
  selectedIndex: number;

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.role = params['role'];
    this.user = this.userSer.user;
  }

  logout() {
    this.authSer.logout();
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }
}
