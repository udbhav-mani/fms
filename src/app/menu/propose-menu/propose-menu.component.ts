import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-propose-menu',
  templateUrl: './propose-menu.component.html',
  styleUrls: ['./propose-menu.component.css'],
})
export class ProposeMenuComponent {
  isProposedMenuOpen;
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
    this.isProposedMenuOpen = !this.isProposedMenuOpen;
    this.menuSer.proposeMenuChanged.next(this.isProposedMenuOpen);
  }

  items: string[] = [''];

  addItem() {
    this.items.push('');
  }
  removeItem(i: number) {
    this.items.splice(i, 1);
  }
}
