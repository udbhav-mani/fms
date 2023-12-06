import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';

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
  constructor(private empSer: EmployeeService) {}

  ngOnInit() {
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
    if (this.pageNumber > this.employees.length / 3) {
      this.isFrontDisabled = true;
    }
  }
}
