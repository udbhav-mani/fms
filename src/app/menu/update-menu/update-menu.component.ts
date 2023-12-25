import { Component, Input } from '@angular/core';

import { NgToastService } from 'ng-angular-popup';

import { MenuService } from '../menu.service';
import * as CONSTANTS from 'src/assets/constants';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
})
export class UpdateMenuComponent {
  constants = CONSTANTS.default;
  isUpdateMenu: boolean;
  @Input() rejectedMenu: any = { comments: ' ' };
  comments: string;
  oldItem: string;
  newItem: string;
  newItemAdmin: string = '';
  isDiscarded: boolean = false;

  constructor(private menuSer: MenuService, private toastSer: NgToastService) {}
  ngOnInit(): void {
    this.menuSer.updateMenuChanged.subscribe((data) => {
      this.isUpdateMenu = data;
      this.comments = this.rejectedMenu.comments.split(',');
      this.oldItem = this.comments[0];
      this.newItem = this.comments[1];
      this.comments = this.comments[2];
    });
  }

  approveMenu(): void {
    this.menuSer
      .updateMenu(this.rejectedMenu.menu_id, this.newItem, this.oldItem)
      .subscribe((response) => {});

    this.menuSer.menuState.next('pending');
    this.menuSer.updateMenuChanged.next(false);
  }

  unapproveMenu(): void {
    this.isDiscarded = !this.isDiscarded;
  }

  discardMenu(): void {
    this.menuSer
      .updateMenuStatus(this.rejectedMenu.menu_id, 'discarded', null)
      .subscribe({
        next: (response) => {
          this.menuSer.menuState.next('discarded');
          this.menuSer.updateMenuChanged.next(false);
          this.toastSer.success({
            summary: this.constants.MENU_DISCARDED_SUCCESS,
            detail: this.constants.SUCCESS_MESSAGE,
          });
        },
        error: (err) => {
          this.toastSer.error({
            summary: err.error.error.message,
            detail: this.constants.ERROR_OCCURED,
          });
        },
      });
  }

  closeDialog(): void {
    this.menuSer.updateMenuChanged.next(false);
  }
  onSubmit(): void {
    this.menuSer
      .updateMenu(this.rejectedMenu.menu_id, this.newItemAdmin, this.oldItem)
      .subscribe({
        next: (response) => {
          this.menuSer.menuState.next('pending');
          this.menuSer.updateMenuChanged.next(false);
          this.toastSer.success({
            summary: this.constants.MENU_SUGGESTED_SUCCESS,
            detail: this.constants.SUCCESS_MESSAGE,
          });
        },
        error: (err) => {
          this.toastSer.error({
            summary: err.error.error.message,
            detail: this.constants.ERROR_OCCURED,
          });
        },
      });
  }
}
