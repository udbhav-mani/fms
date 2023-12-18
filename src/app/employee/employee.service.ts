import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  placeOrderChanged = new Subject();
  constructor(private httpClient: HttpClient) {}

  get_employees() {
    return this.httpClient.get('http://127.0.0.1:8000/users');
  }
  get_employee(id: number) {
    return this.httpClient.get('http://127.0.0.1:8000/users', {
      params: new HttpParams().append('user_id', id),
    });
  }

  update_balance(data) {
    return this.httpClient.put('http://127.0.0.1:8000/balance/user', data);
  }
  place_order(data) {
    return this.httpClient.post('http://127.0.0.1:8000/orders', data);
  }
  get_order(user_id, date) {
    return this.httpClient.get('http://127.0.0.1:8000/orders/' + user_id, {
      params: new HttpParams().append('date', date),
    });
  }
}
