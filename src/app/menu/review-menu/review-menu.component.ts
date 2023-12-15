import { Component, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-review-menu',
  templateUrl: './review-menu.component.html',
  styleUrls: ['./review-menu.component.css'],
})
export class ReviewMenuComponent {
  @Input() currentMenu: any;
  isReviewMenuOpen: boolean;

  constructor(private menuSer: MenuService, private toastSer: NgToastService) {}
  ngOnInit() {
    this.menuSer.reviewMenuChanged.subscribe((data) => {
      this.isReviewMenuOpen = data;
    });
  }

  closeDialog() {
    this.menuSer.reviewMenuChanged.next(false);
  }
  acceptMenu() {
    this.menuSer
      .updateMenuStatus(this.currentMenu.menu_id, 'not published', null)
      .subscribe({
        next: (response) => {
          this.menuSer.reviewMenuChanged.next(false);
          this.menuSer.menuState.next('not published');
          this.toastSer.success({
            summary: 'Menu Accepted Succesfully',
            detail: 'Success',
          });
        },
        error: (err) => {
          this.toastSer.error({
            summary: err.error.error.message,
            detail: 'An error occured.',
          });
        },
      });
  }
  rejectMenu() {
    this.menuSer.reviewMenuChanged.next(false);
    this.menuSer.rejectMenuChanged.next(true);
  }
}
