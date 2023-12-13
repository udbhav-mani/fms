import { Component, Input } from '@angular/core';
import { MenuService } from '../../menu.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reject-menu',
  templateUrl: './reject-menu.component.html',
  styleUrls: ['./reject-menu.component.css'],
})
export class RejectMenuComponent {
  @Input() currentMenu: any;
  isRejectMenuOpen: boolean;

  constructor(private menuSer: MenuService) {}
  ngOnInit() {
    this.menuSer.rejectMenuChanged.subscribe((data) => {
      this.isRejectMenuOpen = data;
    });
  }

  selectedItem: string;
  newItem: string;
  additionalInfo: string;

  onSubmit(form: NgForm) {
    if (form.valid) {
      let comments = '';
      comments = `${this.selectedItem},${this.newItem},${this.additionalInfo}`;
      console.log(comments);

      this.menuSer
        .updateMenuStatus(this.currentMenu.menu_id, 'rejected', comments)
        .subscribe((response) => {
          form.reset();
          this.menuSer.menuState.next('rejected');
          this.menuSer.rejectMenuChanged.next(false);
        });
    }
  }

  closeDialog() {
    this.menuSer.rejectMenuChanged.next(false);
  }
}
