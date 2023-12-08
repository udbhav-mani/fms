import { Component } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-requests',
  templateUrl: './menu-requests.component.html',
  styleUrls: ['./menu-requests.component.css'],
})
export class MenuRequestsComponent {
  constructor(private menuSer: MenuService) {}
  ngOnInit() {}
  openDialog() {
    this.menuSer.proposeMenuChanged.next(true);
  }
}
