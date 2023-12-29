import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/employee/employee.service';
import { MenuService } from 'src/app/menu/menu.service';
import { UserService } from 'src/shared/user.service';
import * as CONSTANTS from 'src/assets/constants';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  currentEmployee: EmployeeResponse;
  isOrderMenuOpen = false;
  constants = CONSTANTS.default;

  constructor(
    private menuSer: MenuService,
    private empSer: EmployeeService,
    private userSer: UserService,
    private toastSer: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empSer.placeOrderChanged.subscribe((response: EmployeeResponse) => {
      this.currentEmployee = response;
    });

    this.menuSer.placeOrderChanged.subscribe((data) => {
      this.isOrderMenuOpen = data;
    });
  }

  placeOrder(): void {
    const data = {
      user_id: this.currentEmployee.user_id,
      amount: this.constants.MENU_PRICE,
    };

    this.empSer.place_order(data).subscribe({
      next: (response) => {
        this.toastSer.success({
          summary: this.constants.ORDER_SUCCESSFUL,
          detail: this.constants.SUCCESS_MESSAGE,
        });
        this.navigateBack();
      },
      error: (err) => {
        this.toastSer.error({
          summary: err.error.error.message,
          detail: this.constants.ERROR_MESSAGE,
        });
      },
    });

    this.closeDialog();
  }

  closeDialog(): void {
    this.menuSer.placeOrderChanged.next(false);
  }

  navigateBack(): void {
    const role = this.userSer.user.role;
    const homePath = `/home/${role}`;

    this.router
      .navigateByUrl(homePath, { skipLocationChange: true })
      .then(() => {
        const targetPath =
          role === 'emp' ? '/home/emp/menu' : '/home/admin/order';
        this.router.navigate([targetPath]);
      });
  }
}

export interface EmployeeResponse {
  user_id: number;
  balance: number;
  username: string;
}
