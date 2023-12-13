import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  proposeMenuChanged = new BehaviorSubject(false);
  updateMenuChanged = new BehaviorSubject(false);
  reviewMenuChanged = new BehaviorSubject(false);
  rejectMenuChanged = new BehaviorSubject(false);
  approveMenuChanged = new BehaviorSubject(false);
  menuState = new Subject();

  constructor(private httpClient: HttpClient) {}

  get_menu(status: string) {
    return this.httpClient.get('http://127.0.0.1:8000/menu', {
      params: new HttpParams().append('status', status),
    });
  }
  propose_menu(newMenu) {
    return this.httpClient.post('http://127.0.0.1:8000/menu', newMenu);
  }
  updateMenuStatus(menuId, status, comments) {
    let body = {
      menu_id: menuId,
      status: status,
    };
    if (comments) {
      body['comments'] = comments;
    }

    return this.httpClient.put('http://127.0.0.1:8000/menu', body);
  }
  updateMenu(menuId: number, newItem, oldItem) {
    let body = {
      old_item: oldItem,
      new_item: newItem,
    };

    return this.httpClient.patch(`http://127.0.0.1:8000/menu/${menuId}`, body);
  }
}
