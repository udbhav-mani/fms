import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { UserService } from 'src/shared/user.service';
import { MenuService } from '../menu/menu.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  employees: any;
  pageNumber: number = 1;
  isFrontDisabled: boolean = false;
  isBackDisabled: boolean = true;
  isUpdateBalanceOpen: boolean = false;
  amount: number = null;
  employeeDetail: any = null;
  userRole: string;
  searchQuery: string = '';
  constructor(
    private empSer: EmployeeService,
    private menuSer: MenuService,
    private userSer: UserService,
    private toastSer: NgToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userRole = this.userSer.user.role;
    this.empSer.get_employees().subscribe((response) => {
      this.employees = response;
    });

    this.menuSer.placeOrderChanged.subscribe((data) => {
      if (!data) {
        this.empSer.get_employees().subscribe((response) => {
          this.employees = response;
        });
      }
    });
  }

  addBalance(index: number) {
    if (index >= 0) {
      this.employeeDetail = this.employees[index];
    }
    this.isUpdateBalanceOpen = !this.isUpdateBalanceOpen;
  }
  closeDialog() {
    this.isUpdateBalanceOpen = !this.isUpdateBalanceOpen;
    this.employeeDetail = null;
  }
  updateBalance() {
    if (this.employeeDetail) {
      let data = {
        user_id: this.employeeDetail.user_id,
        amount: this.amount,
      };
      this.empSer.update_balance(data).subscribe({
        next: (response) => {
          this.amount = null;
          this.toastSer.success({
            summary: 'Balance updated succesfully',
            detail: 'Success',
          });
        },
        error: (err) => {
          this.amount = null;
          this.toastSer.error({
            summary: err.error.error.message,
            detail: 'An error occured',
          });
        },
      });
    }

    this.isUpdateBalanceOpen = !this.isUpdateBalanceOpen;
    this.router
      .navigateByUrl('/home/' + this.userSer.user.role, {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate(['/home/' + this.userSer.user.role + '/list_emp']);
      });
  }
  openPlaceOrder(emp) {
    this.empSer.placeOrderChanged.next(emp);
    this.menuSer.placeOrderChanged.next(true);
  }
  filterEmployees(query: string) {
    if (!query) {
      return this.employees;
    }
    const lowerCaseQuery = query.toLowerCase();
    return this.employees.filter((emp) => {
      return emp.username.toLowerCase().includes(lowerCaseQuery);
    });
  }
  clearSearch() {
    this.searchQuery = '';
  }
}
