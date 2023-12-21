import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { UserModel, UserService } from 'src/shared/user.service';
import * as CONSTANTS from 'src/assets/constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  constants = CONSTANTS.default;
  constructor(
    private route: ActivatedRoute,
    private authSer: AuthService,
    private userSer: UserService
  ) {}

  role: string;
  user: UserModel;
  ownerName: string;

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.role = params['role'];
    this.user = this.userSer.user;
  }
  navigation = {
    admin: [
      { label: 'View Menu', route: 'menu', iconClass: 'fa-solid fa-utensils' },
      {
        label: 'View feedbacks',
        route: 'view_fdb',
        iconClass: 'fa-solid fa-comment',
      },
      {
        label: 'List Employees',
        route: 'list_emp',
        iconClass: 'fa-solid fa-user',
      },
    ],
    f_emp: [
      { label: 'View Menu', route: 'menu', iconClass: 'fa-solid fa-utensils' },
      {
        label: 'Place Order',
        route: 'order',
        iconClass: 'fa-solid fa-cart-shopping',
      },
    ],
    emp: [
      { label: 'View Menu', route: 'menu', iconClass: 'fa-solid fa-utensils' },
      {
        label: 'Add feedback',
        route: 'add-fdb',
        iconClass: 'fa-solid fa-comment',
      },
    ],
  };

  logout() {
    this.authSer.logout();
  }
}
