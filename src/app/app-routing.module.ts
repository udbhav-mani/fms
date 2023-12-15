import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProposeMenuComponent } from './menu/propose-menu/propose-menu.component';
import { AddFeedbackComponent } from './feedback/add-feedback/add-feedback.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home/:role',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'menu',
        component: MenuComponent,
      },
      { path: 'view_fdb', component: FeedbackComponent },
      { path: 'list_emp', component: EmployeeComponent },
      { path: 'order', component: EmployeeComponent },
      { path: 'topup_card', component: EmployeeComponent },
      { path: 'add-fdb', component: AddFeedbackComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
