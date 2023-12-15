import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(private httpClient: HttpClient) {}

  get_feedbacks() {
    return this.httpClient.get('http://127.0.0.1:8000/feedback', {});
  }
  add_feedback(data) {
    return this.httpClient.post('http://127.0.0.1:8000/feedback', data);
  }
}
