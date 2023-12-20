import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRequestsComponent } from './menu-requests/menu-requests.component';
import { ReviewMenuComponent } from './review-menu/review-menu.component';
import { ApproveMenuComponent } from './approve-menu/approve-menu.component';
import { RejectMenuComponent } from './review-menu/reject-menu/reject-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { ProposeMenuComponent } from './propose-menu/propose-menu.component';
import { MenuComponent } from './menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from '../app-routing.module';
import { OrderModule } from '../order/order.module';
import { AddFdbCriteriaComponent } from './approve-menu/add-fdb-criteria/add-fdb-criteria.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuRequestsComponent,
    ProposeMenuComponent,
    UpdateMenuComponent,
    ApproveMenuComponent,
    ReviewMenuComponent,
    RejectMenuComponent,
    AddFdbCriteriaComponent,
  ],
  imports: [
    CommonModule,
    NgToastModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    OrderModule,
  ],
})
export class MenuModule {}
