import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from '../app-routing.module';
import { OrderModule } from '../order/order.module';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule,
    OrderModule,
  ],
})
export class EmployeeModule {}
