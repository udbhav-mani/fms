import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserModel, UserService } from 'src/shared/user.service';
import { ToastService } from 'src/shared/toast.service';

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
    private userSer: UserService,
    private toastSer: ToastService
  ) {}

  user: UserModel;
  navigation = {
    admin: [
      ['View Menu', 'menu', 'fa-solid fa-utensils'],
      ['View feedbacks', 'view_fdb', 'fa-solid fa-comment'],
      ['List Employees', 'list_emp', 'fa-solid fa-user'],
    ],
    f_emp: [
      ['View Menu', 'menu', 'fa-solid fa-utensils'],
      ['Place Order', 'order', 'fa-solid fa-cart-shopping'],
      // ['TopUp Card', 'topup_card', 'fa-regular fa-credit-card'],
    ],
    emp: [
      ['View Menu', 'menu', 'fa-solid fa-utensils'],
      // ['Place Order', 'order', 'fa-solid fa-cart-shopping'],
      ['Add feedback', 'add-fdb', 'fa-solid fa-user'],
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
  }
}
