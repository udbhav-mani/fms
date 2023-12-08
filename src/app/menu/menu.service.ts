import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  proposeMenuChanged = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) {}

  get_menu(status) {
    return this.httpClient.get('http://127.0.0.1:8000/menu', {
      params: new HttpParams().append('status', status),
    });
  }
}
