import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import moment from 'moment';
import { NgToastService } from 'ng-angular-popup';

import { CriteriaService } from 'src/shared/criteria.service';
import { FeedbackService } from '../feedback.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { UserService } from 'src/shared/user.service';
import * as CONSTANTS from 'src/assets/constants';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css'],
})
export class AddFeedbackComponent {
  constants = CONSTANTS.default;
  selectedRating = [0, 0, 0, 0, 0];
  fdbCriteria: MenuCriteria[];
  isOrderPlaced: boolean = true;
  isFeedbackDone: boolean = true;

  constructor(
    private criteriaSer: CriteriaService,
    private fdbSer: FeedbackService,
    private empSer: EmployeeService,
    private userSer: UserService,
    private toastSer: NgToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkOrderStatus();
    this.checkFeedbackStatus();
    this.getFdbCriteria();
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
          summary: this.constants.FDB_SUBMITTED,
          detail: this.constants.FDB_SUBMITTED_DETAIL,
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
    this.refreshData();
  }

  private checkOrderStatus() {
    this.empSer
      .get_order(
        this.userSer.user.userid,
        moment(new Date()).format('YYYY-MM-DD')
      )
      .subscribe({
        next: (response: any[]) => {
          if (response.length == 0) {
            this.isOrderPlaced = false;
          } else {
            this.isOrderPlaced = true;
          }
        },
        error: (err) => {
          this.isOrderPlaced = false;
        },
      });
  }

  private checkFeedbackStatus() {
    this.fdbSer.get_user_feedback(this.userSer.user.userid).subscribe({
      next: (response: any[]) => {
        this.isFeedbackDone = true;
      },
      error: (err) => {
        this.isFeedbackDone = false;
      },
    });
  }

  private getFdbCriteria() {
    this.criteriaSer.get_menu_criteria().subscribe({
      next: (response: MenuCriteria[]) => {
        this.fdbCriteria = response;
      },
      error: (err) => {
        this.toastSer.error({
          summary: err.error.error.message,
          detail: this.constants.ERROR_OCCURED,
        });
      },
    });
  }

  private refreshData() {
    this.router
      .navigateByUrl(`/home/${this.userSer.user.role}`, {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate(['/home', this.userSer.user.role, 'add-fdb']);
      });
  }
}

interface MenuCriteria {
  cr_id: number;
  criteria: string;
}
