import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

import { environment } from 'environment/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  placeOrderChanged = new Subject();
  constructor(private httpClient: HttpClient) {}

  get_employees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.API_URL}/users`);
  }
  get_employee(id: number): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.API_URL}/users`, {
      params: new HttpParams().append('user_id', id),
    });
  }

  update_balance(data: { user_id: number; amount: number }): Observable<any> {
    return this.httpClient.put(`${environment.API_URL}/balance/user`, data);
  }

  place_order(data: { user_id: number; amount: number }): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/orders`, data);
  }

  get_order(user_id: number, date: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(
      `${environment.API_URL}/orders/${user_id}`,
      {
        params: new HttpParams().append('date', date),
      }
    );
  }
}

interface Employee {
  user_id: number;
  balance: number;
  username: string;
}
interface Order {
  order_id: number;
  user_id: number;
  amount: number;
  date: string;
}
