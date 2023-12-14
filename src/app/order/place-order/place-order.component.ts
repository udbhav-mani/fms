import { Component, Input } from '@angular/core';
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
  constructor(private menuSer: MenuService, private empSer: EmployeeService) {}

  ngOnInit() {
    this.empSer.placeOrderChanged.subscribe((response) => {
      console.log(response);

      this.currentEmployee = response;
    });

    this.menuSer.placeOrderChanged.subscribe((data) => {
      this.isOrderMenuOpen = data;
    });
  }
  placeOrder() {}

  closeDialog() {
    this.menuSer.placeOrderChanged.next(false);
  }
}
