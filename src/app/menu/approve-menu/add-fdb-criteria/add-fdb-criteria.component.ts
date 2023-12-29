import { Component, Input } from '@angular/core';

import { NgToastService } from 'ng-angular-popup';

import { CriteriaService } from 'src/shared/criteria.service';
import { MenuService } from '../../menu.service';
import * as CONSTANTS from 'src/assets/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-fdb-criteria',
  templateUrl: './add-fdb-criteria.component.html',
  styleUrls: ['./add-fdb-criteria.component.css'],
})
export class AddFdbCriteriaComponent {
  constants = CONSTANTS.default;
  @Input() approvedMenu;
  newCriteria: any;
  criteria: any;
  newCriteriaBeingAdded: boolean = false;
  selectedCriteria: string[] = [];
  constructor(
    private criteriaSer: CriteriaService,
    private menuSer: MenuService,
    private toastSer: NgToastService
  ) {}

  ngOnInit() {
    this.criteriaSer.get_all_criteria().subscribe((response) => {
      this.criteria = response;
      for (let cr of this.criteria) {
        cr['selected'] = false;
      }
    });
  }

  selectChip(index: number) {
    const criteriaName = this.criteria[index].criteria;
    const isSelected = !this.criteria[index].selected;

    if (isSelected) {
      if (!this.selectedCriteria.includes(criteriaName)) {
        this.selectedCriteria.push(criteriaName);
      }
    } else {
      const indexToRemove = this.selectedCriteria.indexOf(criteriaName);
      if (indexToRemove !== -1) {
        this.selectedCriteria.splice(indexToRemove, 1);
      }
    }

    this.criteria[index].selected = isSelected;
  }
  addNewChip() {
    this.newCriteriaBeingAdded = !this.newCriteriaBeingAdded;
  }
  addNewCriteria(myForm: NgForm) {
    if (myForm.value.newCriteria) {
      this.criteriaSer
        .add_criteria([myForm.value.newCriteria])
        .subscribe((data) => {});
      this.criteria.push({
        id: null,
        criteria: myForm.value.newCriteria,
        selected: true,
      });
      this.selectedCriteria.push(myForm.value.newCriteria);
      this.newCriteria = '';
      this.newCriteriaBeingAdded = !this.newCriteriaBeingAdded;
      myForm.reset();
    } else {
      this.toastSer.error({
        detail: 'An error occured',
        summary: 'Please enter valid criteria',
      });
    }
  }
  addFdbCriteria() {
    if (this.selectedCriteria.length > 0) {
      this.menuSer
        .updateMenuStatus(this.approvedMenu.menu_id, 'published', null)
        .subscribe((response) => {
          this.criteriaSer
            .add_menu_criteria(this.selectedCriteria)
            .subscribe((response) => {
              this.toastSer.success({
                detail: 'Success',
                summary: 'Menu published successfully.',
              });
              this.menuSer.menuState.next('published');
              this.menuSer.approveMenuChanged.next(false);
            });
        });
    } else {
      this.toastSer.error({
        detail: 'An error occured',
        summary: 'Please enter valid criteria',
      });
    }
  }
}
