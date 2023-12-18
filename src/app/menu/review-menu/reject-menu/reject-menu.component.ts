import { Component, Input } from '@angular/core';
import { MenuService } from '../../menu.service';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reject-menu',
  templateUrl: './reject-menu.component.html',
  styleUrls: ['./reject-menu.component.css'],
})
export class RejectMenuComponent {
  @Input() currentMenu: any;
  isRejectMenuOpen: boolean;

  constructor(private menuSer: MenuService, private toastSer: NgToastService) {}
  ngOnInit() {
    this.menuSer.rejectMenuChanged.subscribe((data) => {
      this.isRejectMenuOpen = data;
    });
  }

  selectedItem: string;
  newItem: string;
  additionalInfo: string;

  onSubmit(form: NgForm) {
    let comments = '';
    comments +=
      form.value.item +
      ',' +
      form.value.newItem +
      ',' +
      form.value.additionalInfo;
    console.log('comments + ' + comments);

    this.menuSer
      .updateMenuStatus(this.currentMenu.menu_id, 'rejected', comments)
      .subscribe({
        next: (response) => {
          form.reset();
          this.menuSer.menuState.next('rejected');
          this.menuSer.rejectMenuChanged.next(false);
          this.toastSer.success({
            summary: 'Menu updates sent Succesfully',
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
    this.menuSer.rejectMenuChanged.next(false);
  }
}
