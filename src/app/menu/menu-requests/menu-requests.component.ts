import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { UserService } from 'src/shared/user.service';

@Component({
  selector: 'app-menu-requests',
  templateUrl: './menu-requests.component.html',
  styleUrls: ['./menu-requests.component.css'],
})
export class MenuRequestsComponent {
  isMenuProposed: boolean;
  isMenuRejected: boolean;
  isMenuApproved: boolean;
  isMenuPending: boolean;
  textToBeDisplayed: string = '';
  userRole: string;
  pendingMenu: any;
  rejectedMenu: any;
  approvedMenu: any;

  constructor(private menuSer: MenuService, private userSer: UserService) {}
  ngOnInit() {
    this.userRole = this.userSer.user.role;
    this.menuSer.get_menu('pending').subscribe({
      next: (data) => {
        this.isMenuPending = true;
        this.isMenuProposed = true;
        this.menuSer.menuState.next('pending');
        this.pendingMenu = data;
      },
      error: (e) => {
        if (this.userSer.user.role === 'admin') {
          this.menuSer.get_menu('rejected').subscribe({
            next: (data) => {
              this.isMenuRejected = true;
              this.rejectedMenu = data;
              this.menuSer.menuState.next('rejected');
            },
            error: (e) => {
              this.menuSer.get_menu('not published').subscribe((data) => {
                this.isMenuApproved = true;
                this.approvedMenu = data;

                this.menuSer.menuState.next('not published');
              });
            },
          });
        }
      },
    });

    this.menuSer.menuState.subscribe((state) => {
      this.isMenuProposed = false;
      this.isMenuRejected = false;
      this.isMenuApproved = false;
      this.isMenuPending = false;
      if (state === 'pending') {
        this.isMenuPending = true;
        this.isMenuProposed = true;
      } else if (state === 'rejected') {
        this.isMenuRejected = true;
      } else if (state === 'not published') {
        this.isMenuApproved = true;
      }
    });
  }

  openDialog(state: string) {
    if (state === 'propose') {
      this.menuSer.proposeMenuChanged.next(true);
    } else if (state === 'update') {
      this.menuSer.updateMenuChanged.next(true);
    } else if (state === 'review') {
      this.menuSer.reviewMenuChanged.next(true);
    } else if (state === 'approve') {
      this.menuSer.approveMenuChanged.next(true);
    }
  }
}
