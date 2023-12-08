import { Component } from '@angular/core';
import { MenuService } from './menu.service';
import { MatDialog } from '@angular/material/dialog';
import { ProposeMenuDialogComponent } from './propose-menu-dialog/propose-menu-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  currentMenu: any;
  isMenuOpen: boolean = false;
  constructor(private menuSer: MenuService, public dialog: MatDialog) {}

  ngOnInit() {
    this.menuSer.get_menu('published').subscribe((response) => {
      console.log(response);
      this.currentMenu = response;
    });
  }
  openDialog() {
    console.log(this.isMenuOpen);

    this.isMenuOpen = !this.isMenuOpen;
  }
}
