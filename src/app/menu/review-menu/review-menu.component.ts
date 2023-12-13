import { Component, Input } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-review-menu',
  templateUrl: './review-menu.component.html',
  styleUrls: ['./review-menu.component.css'],
})
export class ReviewMenuComponent {
  @Input() currentMenu: any;
  isReviewMenuOpen: boolean;

  constructor(private menuSer: MenuService) {}
  ngOnInit() {
    this.menuSer.reviewMenuChanged.subscribe((data) => {
      this.isReviewMenuOpen = data;
      console.log(this.currentMenu);
    });
  }

  closeDialog() {
    this.menuSer.reviewMenuChanged.next(false);
  }
  acceptMenu() {
    this.menuSer
      .updateMenuStatus(this.currentMenu.menu_id, 'not published', null)
      .subscribe((response) => {
        this.menuSer.reviewMenuChanged.next(false);
        this.menuSer.menuState.next('not published');
      });
  }
  rejectMenu() {
    this.menuSer.reviewMenuChanged.next(false);
    this.menuSer.rejectMenuChanged.next(true);
  }
}
