import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CriteriaService {
  proposeMenuChanged = new Subject();
  constructor(private httpClient: HttpClient) {}

  get_all_criteria() {
    return this.httpClient.get('http://127.0.0.1:8000/criterias');
  }
  add_menu_criteria(new_criteria) {
    return this.httpClient.post('http://127.0.0.1:8000/feedback/criterias', {
      criteria: new_criteria,
    });
  }
  add_criteria(new_criteria) {
    return this.httpClient.post('http://127.0.0.1:8000/criterias', {
      criteria: new_criteria,
    });
  }
}
