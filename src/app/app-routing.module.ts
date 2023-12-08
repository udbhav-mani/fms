import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProposeMenuComponent } from './menu/propose-menu/propose-menu.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
