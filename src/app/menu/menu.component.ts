import { Component } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  currentMenu: any;
  constructor(private menuSer: MenuService) {}

  ngOnInit() {
    this.menuSer.get_menu('published').subscribe((response) => {
      console.log(response);
      this.currentMenu = response;
    });
  }
}
