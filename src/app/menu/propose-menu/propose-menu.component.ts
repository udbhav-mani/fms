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
    console.log(this.proposeForm);
  }
  openDialog() {
    this.isProposedMenuOpen = !this.isProposedMenuOpen;
    this.menuSer.proposeMenuChanged.next(this.isProposedMenuOpen);
  }
}
