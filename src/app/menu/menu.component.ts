import { Component } from '@angular/core';
import { MenuService } from './menu.service';
import { MatDialog } from '@angular/material/dialog';
import { ProposeMenuDialogComponent } from './propose-menu-dialog/propose-menu-dialog.component';
import { UserService } from 'src/shared/user.service';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  currentMenu: any = { menu_id: '', date: '', items: [] };
  userRole: string;
  user;
  constructor(
    private menuSer: MenuService,
    private userSer: UserService,
    private empSer: EmployeeService
  ) {}

  ngOnInit() {
    this.user = this.userSer.user;
    this.userRole = this.userSer.user.role;
    this.menuSer.get_menu('published').subscribe((response) => {
      console.log(response);
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
