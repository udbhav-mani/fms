import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProposeMenuDialogComponent } from './menu/propose-menu-dialog/propose-menu-dialog.component';
import { MenuRequestsComponent } from './menu/menu-requests/menu-requests.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProposeMenuComponent } from './menu/propose-menu/propose-menu.component';
import { UpdateMenuComponent } from './menu/update-menu/update-menu.component';
import { ReviewMenuComponent } from './menu/review-menu/review-menu.component';
import { RejectMenuComponent } from './menu/review-menu/reject-menu/reject-menu.component';
import { ApproveMenuComponent } from './menu/approve-menu/approve-menu.component';
import { AddFdbCriteriaComponent } from './menu/approve-menu/add-fdb-criteria/add-fdb-criteria.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    MenuComponent,
    FeedbackComponent,
    EmployeeComponent,
    ProposeMenuDialogComponent,
    MenuRequestsComponent,
    SidenavComponent,
    ProposeMenuComponent,
    UpdateMenuComponent,
    ReviewMenuComponent,
    RejectMenuComponent,
    ApproveMenuComponent,
    AddFdbCriteriaComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MatDialog,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
