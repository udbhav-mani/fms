import { Component } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedbacks: any = null;
  pageNumber: number = 1;
  isFrontDisabled: boolean = false;
  isBackDisabled: boolean = true;

  constructor(
    private feedbackSer: FeedbackService,
    private toastSer: NgToastService
  ) {}

  ngOnInit() {
    this.feedbackSer.get_feedbacks().subscribe({
      next: (response) => {
        this.feedbacks = response;
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastSer.error({
            summary: err.error.error.message,
            detail: '',
          });
        } else {
          this.toastSer.error({
            detail: err.error.message,
            summary: 'Error',
          });
        }
      },
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
