import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  employees: any;
  constructor(private empSer: EmployeeService) {}

  ngOnInit() {
    this.empSer.get_employees().subscribe((response) => {
      console.log(response);
      this.employees = response;
    });
  }
}
