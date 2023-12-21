import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavComponent } from './sidenav.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
