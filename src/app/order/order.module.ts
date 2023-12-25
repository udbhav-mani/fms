import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { PlaceOrderComponent } from './place-order/place-order.component';

@NgModule({
  declarations: [PlaceOrderComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule],
  exports: [PlaceOrderComponent],
})
export class OrderModule {}
