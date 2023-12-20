import { Component } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedbacks: any = [];
  pageNumber: number = 1;
  isFrontDisabled: boolean = false;
  isBackDisabled: boolean = true;
  isPageLoading: boolean;
  feedbackCriteria: string[] = [];
  selectedFilter;

  constructor(private feedbackSer: FeedbackService) {}

  ngOnInit() {
    this.isPageLoading = true;
    this.feedbackSer.get_feedbacks().subscribe({
      next: (response) => {
        this.feedbacks = response;

        for (let feedback of this.feedbacks) {
          if (!this.feedbackCriteria.includes(feedback.criteria)) {
            this.feedbackCriteria.push(feedback.criteria);
          }
        }
      },
      error: (err) => {},
    });
    this.isPageLoading = false;
  }
  getArray(num: string) {
    return new Array(parseInt(num));
  }
  filterFeedbacks() {
    if (!this.selectedFilter) {
      return this.feedbacks;
    }
    return this.feedbacks.filter(
      (feedback) =>
        feedback.criteria.toLowerCase() === this.selectedFilter.toLowerCase()
    );
  }
}
