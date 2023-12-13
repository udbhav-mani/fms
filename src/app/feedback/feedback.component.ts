import { Component } from '@angular/core';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedbacks: any;
  pageNumber: number = 1;
  isFrontDisabled: boolean = false;
  isBackDisabled: boolean = true;
  constructor(private feedbackSer: FeedbackService) {}

  ngOnInit() {
    this.feedbackSer.get_feedbacks().subscribe((response) => {
      this.feedbacks = response;
    });
  }
  getArray(num: string) {
    return new Array(parseInt(num));
  }
  goBack() {
    this.pageNumber--;
    this.isFrontDisabled = false;
    if (this.pageNumber < 2) {
      this.isBackDisabled = true;
    }
  }
  goAhead() {
    this.pageNumber++;
    this.isBackDisabled = false;
    if (this.pageNumber > this.feedbacks.length / 7) {
      this.isFrontDisabled = true;
    }
  }
}
