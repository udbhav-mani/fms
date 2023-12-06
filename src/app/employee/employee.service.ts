import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  get_employees() {
    return this.httpClient.get('http://127.0.0.1:8000/users');
  }
}
