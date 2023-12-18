import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(private httpClient: HttpClient) {}

  get_feedbacks() {
    return this.httpClient.get('http://127.0.0.1:8000/feedback', {});
  }
  get_user_feedback(user_id) {
    return this.httpClient.get('http://127.0.0.1:8000/feedback', {
      params: new HttpParams().append('user_id', user_id),
    });
  }
  add_feedback(data) {
    return this.httpClient.post('http://127.0.0.1:8000/feedback', data);
  }
}
