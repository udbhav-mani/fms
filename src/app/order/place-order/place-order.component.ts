import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/employee/employee.service';
import { MenuService } from 'src/app/menu/menu.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent {
  currentEmployee: any;
  isOrderMenuOpen: boolean = false;

  constructor(
    private menuSer: MenuService,
    private empSer: EmployeeService,
    private toastSer: NgToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.empSer.placeOrderChanged.subscribe((response) => {
      console.log(response);
      this.currentEmployee = response;
    });

    this.menuSer.placeOrderChanged.subscribe((data) => {
      this.isOrderMenuOpen = data;
    });
  }
  placeOrder() {
    // this.router
    //   .navigateByUrl('/home/f_emp', { skipLocationChange: true })
    //   .then(() => {
    //     this.router.navigate(['/home/f_emp/order']);
    //   });
    let data = {
      user_id: this.currentEmployee.user_id,
      amount: 137,
    };

    this.empSer.place_order(data).subscribe({
      next: (response) => {
        this.toastSer.success({
          summary: 'Balance updated succesfully',
          detail: 'Success',
        });
      },
      error: (err) => {
        this.toastSer.error({
          summary: err.error.error.message,
          detail: 'An error occured',
        });
      },
    });
    this.closeDialog();
  }

  closeDialog() {
    this.menuSer.placeOrderChanged.next(false);
  }
}
