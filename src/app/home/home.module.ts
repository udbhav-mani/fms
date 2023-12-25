import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidenavModule } from '../sidenav/sidenav.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule, SidenavModule],
})
export class HomeModule {}
