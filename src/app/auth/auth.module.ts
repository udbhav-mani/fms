import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule],
})
export class AuthModule {}
