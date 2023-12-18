import { Component, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { delay } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
})
export class UpdateMenuComponent {
  isUpdateMenu: boolean;
  @Input() rejectedMenu: any = { comments: ' ' };
  comments;
  oldItem;
  newItem;
  newItemAdmin: string = '';
  isDiscarded: boolean = false;

  constructor(private menuSer: MenuService, private toastSer: NgToastService) {}
  ngOnInit() {
    this.menuSer.updateMenuChanged.subscribe((data) => {
      this.isUpdateMenu = data;
      this.comments = this.rejectedMenu.comments.split(',');
      this.oldItem = this.comments[0];
      this.newItem = this.comments[1];
      this.comments = this.comments[2];
    });
  }

  approveMenu() {
    this.menuSer
      .updateMenu(this.rejectedMenu.menu_id, this.newItem, this.oldItem)
      .subscribe((response) => {});

    this.menuSer.menuState.next('pending');
    this.menuSer.updateMenuChanged.next(false);
  }

  unapproveMenu() {
    this.isDiscarded = !this.isDiscarded;
  }

  discardMenu() {
    this.menuSer
      .updateMenuStatus(this.rejectedMenu.menu_id, 'discarded', null)
      .subscribe({
        next: (response) => {
          this.menuSer.menuState.next('discarded');
          this.menuSer.updateMenuChanged.next(false);
          this.toastSer.success({
            summary: 'Menu Discarded successfully.',
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

  closeDialog() {
    this.menuSer.updateMenuChanged.next(false);
  }
  onSubmit() {
    this.menuSer
      .updateMenu(this.rejectedMenu.menu_id, this.newItemAdmin, this.oldItem)
      .subscribe({
        next: (response) => {
          this.menuSer.menuState.next('pending');
          this.menuSer.updateMenuChanged.next(false);
          this.toastSer.success({
            summary: 'New Menu suggested successfully.',
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
}
