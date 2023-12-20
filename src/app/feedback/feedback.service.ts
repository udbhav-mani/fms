import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environment/environment';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(private httpClient: HttpClient) {}

  get_feedbacks() {
    return this.httpClient.get(`${environment.API_URL}/feedback`, {});
  }
  get_user_feedback(user_id) {
    return this.httpClient.get(`${environment.API_URL}/feedback`, {
      params: new HttpParams().append('user_id', user_id),
    });
  }
  add_feedback(data) {
    return this.httpClient.post(`${environment.API_URL}/feedback`, data);
  }
}
