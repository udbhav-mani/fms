import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { AppRoutingModule } from './app-routing.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EmployeeModule } from './employee/employee.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    MenuModule,
    FormsModule,
    AuthModule,
    OrderModule,
    BrowserModule,
    NgToastModule,
    SidenavModule,
    FeedbackModule,
    EmployeeModule,
    NotFoundModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
