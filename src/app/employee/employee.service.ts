import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subject } from 'rxjs';

import { environment } from 'environment/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  placeOrderChanged = new Subject();
  constructor(private httpClient: HttpClient) {}

  get_employees() {
    return this.httpClient.get(`${environment.API_URL}/users`);
  }
  get_employee(id: number) {
    return this.httpClient.get(`${environment.API_URL}/users`, {
      params: new HttpParams().append('user_id', id),
    });
  }

  update_balance(data) {
    return this.httpClient.put(`${environment.API_URL}/balance/user`, data);
  }
  place_order(data) {
    return this.httpClient.post(`${environment.API_URL}/orders`, data);
  }
  get_order(user_id, date) {
    return this.httpClient.get(`${environment.API_URL}/orders` + user_id, {
      params: new HttpParams().append('date', date),
    });
  }
}
