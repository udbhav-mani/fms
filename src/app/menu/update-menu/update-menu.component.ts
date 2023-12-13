import { Component, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
})
export class UpdateMenuComponent {
  isUpdateMenu: boolean;
  @Input() rejectedMenu: any;
  comments;
  oldItem;
  newItem;
  newItemAdmin: string = '';
  isDiscarded: boolean = false;

  constructor(private menuSer: MenuService) {}
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
      .subscribe((response) => {
        this.menuSer.menuState.next('discarded');
        this.menuSer.updateMenuChanged.next(false);
      });
  }

  closeDialog() {
    this.menuSer.updateMenuChanged.next(false);
  }
  onSubmit() {
    console.log(this.rejectedMenu.menu_id, this.newItemAdmin, this.oldItem);

    this.menuSer
      .updateMenu(this.rejectedMenu.menu_id, this.newItemAdmin, this.oldItem)
      .subscribe((response) => {
        console.log(response);
        this.menuSer.menuState.next('pending');
        this.menuSer.updateMenuChanged.next(false);
      });
  }
}
