import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from '../app-routing.module';
import { FeedbackComponent } from './feedback.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';

@NgModule({
  declarations: [FeedbackComponent, AddFeedbackComponent],
  imports: [CommonModule, NgxPaginationModule, AppRoutingModule, FormsModule],
})
export class FeedbackModule {}
