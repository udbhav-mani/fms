import { Component } from '@angular/core';

import { MenuService } from './menu.service';
import { UserModel, UserService } from 'src/shared/user.service';
import { EmployeeService } from '../employee/employee.service';
import * as CONSTANTS from 'src/assets/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constants = CONSTANTS.default;
  currentMenu: any = { menu_id: '', date: '', items: [] };
  userRole: string;
  user: UserModel;
  constructor(
    private menuSer: MenuService,
    private userSer: UserService,
    private empSer: EmployeeService
  ) {}

  ngOnInit() {
    this.user = this.userSer.user;
    this.userRole = this.userSer.user.role;
    this.menuSer.get_menu('published').subscribe((response) => {
      this.currentMenu = response;
    });
  }
  openPlaceOrder() {
    this.empSer.get_employee(this.user.userid).subscribe((response) => {
      this.empSer.placeOrderChanged.next(response[0]);
      this.menuSer.placeOrderChanged.next(true);
    });
  }
}
