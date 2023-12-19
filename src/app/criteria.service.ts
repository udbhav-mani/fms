import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'environment/environment';

@Injectable({ providedIn: 'root' })
export class CriteriaService {
  proposeMenuChanged = new Subject();
  constructor(private httpClient: HttpClient) {}

  get_all_criteria() {
    return this.httpClient.get(`${environment.API_URL}/criterias`);
  }
  add_menu_criteria(new_criteria) {
    return this.httpClient.post(`${environment.API_URL}/feedback/criterias`, {
      criteria: new_criteria,
    });
  }
  get_menu_criteria() {
    return this.httpClient.get(`${environment.API_URL}/feedback/criterias`);
  }
  add_criteria(new_criteria) {
    return this.httpClient.post(`${environment.API_URL}/criterias`, {
      criteria: new_criteria,
    });
  }
}
