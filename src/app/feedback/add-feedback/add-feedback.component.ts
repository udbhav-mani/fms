import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CriteriaService } from 'src/app/criteria.service';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css'],
})
export class AddFeedbackComponent {
  selectedRating = [0, 0, 0, 0, 0];
  fdbCriteria: any;
  constructor(
    private criteriaSer: CriteriaService,
    private fdbSer: FeedbackService,
    private toastSer: NgToastService
  ) {}

  ngOnInit() {
    this.criteriaSer.get_menu_criteria().subscribe({
      next: (response) => {
        console.log(response);
        this.fdbCriteria = response;
      },
      error: (err) => {
        this.toastSer.error({
          summary: err.error.error.message,
          detail: 'An error occcured',
        });
      },
    });
  }

  onSubmitFeedback(feedbackForm: NgForm) {
    const formVal = feedbackForm.value;

    let data = [];
    for (let cr of this.fdbCriteria) {
      data.push({
        cr_id: cr.cr_id,
        feedback: formVal[cr.cr_id],
        comments: formVal['comment_' + cr.cr_id],
      });
    }

    this.fdbSer.add_feedback(data).subscribe({
      next: (response) => {
        this.toastSer.success({
          summary: 'Feedback submitted successfully!',
          detail: 'Thank you for your feedback.',
        });
      },
      error: (err) => {
        this.toastSer.error({
          summary: err.error.error.message,
          detail: 'An error occured.',
        });
      },
    });

    feedbackForm.resetForm();
  }
}
