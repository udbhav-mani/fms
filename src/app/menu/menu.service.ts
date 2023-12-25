import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from 'environment/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
  proposeMenuChanged = new BehaviorSubject<boolean>(false);
  updateMenuChanged = new BehaviorSubject<boolean>(false);
  reviewMenuChanged = new BehaviorSubject<boolean>(false);
  rejectMenuChanged = new BehaviorSubject<boolean>(false);
  approveMenuChanged = new BehaviorSubject<boolean>(false);
  placeOrderChanged = new BehaviorSubject<boolean>(false);
  menuState = new Subject();

  constructor(private httpClient: HttpClient) {}

  get_menu(status: string) {
    return this.httpClient.get(`${environment.API_URL}/menu`, {
      params: new HttpParams().append('status', status),
    });
  }
  propose_menu(newMenu: NewMenu) {
    return this.httpClient.post(`${environment.API_URL}/menu`, newMenu);
  }
  updateMenuStatus(menuId: number, status: string, comments: string) {
    let body = {
      menu_id: menuId,
      status: status,
    };
    if (comments) {
      body['comments'] = comments;
    }

    return this.httpClient.put(`${environment.API_URL}/menu`, body);
  }
  updateMenu(menuId: number, newItem: string, oldItem: string) {
    let body = {
      old_item: oldItem,
      new_item: newItem,
    };

    return this.httpClient.patch(`${environment.API_URL}/menu/${menuId}`, body);
  }
}

interface NewMenu {
  date: string;
  items: string[];
}
