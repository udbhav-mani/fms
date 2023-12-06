import { Component } from '@angular/core';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedbacks: any;
  constructor(private feedbackSer: FeedbackService) {}

  ngOnInit() {
    this.feedbackSer.get_feedbacks().subscribe((response) => {
      console.log(response);
      this.feedbacks = response;
    });
  }
}
