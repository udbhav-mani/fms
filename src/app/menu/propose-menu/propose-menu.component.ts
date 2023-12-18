import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService } from '../menu.service';
import moment from 'moment';

@Component({
  selector: 'app-propose-menu',
  templateUrl: './propose-menu.component.html',
  styleUrls: ['./propose-menu.component.css'],
})
export class ProposeMenuComponent {
  items: string[] = [''];
  isProposedMenuOpen;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate = moment(new Date(Date.now() + 3 * 86400000)).format('YYYY-MM-DD');

  constructor(private menuSer: MenuService) {}
  ngOnInit() {
    this.menuSer.proposeMenuChanged.subscribe((data) => {
      this.isProposedMenuOpen = data;
    });
  }

  proposeForm: NgForm;
  onSubmit(proposeForm) {
    this.proposeForm = proposeForm;
    let newMenu = this.proposeForm.value;
    let menuDate = newMenu.date;
    delete newMenu.date;
    let items = Object.values(newMenu);
    newMenu = { date: new Date(menuDate), items: items };
    this.menuSer.propose_menu(newMenu).subscribe((data) => {
      console.log(data);
    });
    this.proposeForm.reset();
    this.menuSer.menuState.next('pending');
    this.closeDialog();
  }
  closeDialog() {
    this.items = [''];
    this.isProposedMenuOpen = !this.isProposedMenuOpen;
    this.menuSer.proposeMenuChanged.next(this.isProposedMenuOpen);
  }

  addItem() {
    this.items.push('');
  }
  removeItem(i: number) {
    this.items.splice(i, 1);
  }
}
