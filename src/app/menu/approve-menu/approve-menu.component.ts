import { Component, Input } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-approve-menu',
  templateUrl: './approve-menu.component.html',
  styleUrls: ['./approve-menu.component.css'],
})
export class ApproveMenuComponent {
  @Input() approvedMenu: any;
  isFdbCriteriaOpen: boolean;
  isApprovedMenuOpen: boolean;
  constructor(private menuSer: MenuService) {}
  ngOnInit() {
    this.menuSer.approveMenuChanged.subscribe((data) => {
      this.isApprovedMenuOpen = data;
    });
  }
  acceptMenu() {
    this.isFdbCriteriaOpen = !this.isFdbCriteriaOpen;
  }
  discardMenu() {
    this.menuSer
      .updateMenuStatus(this.approvedMenu.menu_id, 'discarded', null)
      .subscribe((response) => {
        this.menuSer.menuState.next('discarded');
        this.menuSer.approveMenuChanged.next(false);
      });
  }

  closeDialog() {
    this.menuSer.approveMenuChanged.next(false);
  }
}
