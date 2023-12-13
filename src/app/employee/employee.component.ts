import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { UserService } from 'src/shared/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  employees: any;
  pageNumber: number = 1;
  isFrontDisabled: boolean = true;
  isBackDisabled: boolean = true;
  isUpdateBalanceOpen: boolean = false;
  amount: number;
  employeeDetail: any = null;
  userRole: string;
  constructor(private empSer: EmployeeService, private userSer: UserService) {}

  ngOnInit() {
    this.userRole = this.userSer.user.role;
    this.empSer.get_employees().subscribe((response) => {
      console.log(response);
      this.employees = response;
    });
  }
  goBack() {
    this.pageNumber--;
    this.isFrontDisabled = false;
    if (this.pageNumber < 2) {
      this.isBackDisabled = true;
    }
  }
  goAhead() {
    this.pageNumber++;
    this.isBackDisabled = false;
    if (this.pageNumber > this.employees.length / 7) {
      this.isFrontDisabled = true;
    }
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
      console.log(this.amount);
    } else {
      console.log('grpbalance');
    }
    this.isUpdateBalanceOpen = !this.isUpdateBalanceOpen;
  }
}
