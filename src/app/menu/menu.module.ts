import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRequestsComponent } from './menu-requests/menu-requests.component';
import { ReviewMenuComponent } from './review-menu/review-menu.component';
import { ApproveMenuComponent } from './approve-menu/approve-menu.component';
import { RejectMenuComponent } from './review-menu/reject-menu/reject-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { ProposeMenuComponent } from './propose-menu/propose-menu.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuRequestsComponent,
    ProposeMenuComponent,
    UpdateMenuComponent,
    ApproveMenuComponent,
    ReviewMenuComponent,
    RejectMenuComponent,
  ],
  imports: [CommonModule],
})
export class MenuModule {}
