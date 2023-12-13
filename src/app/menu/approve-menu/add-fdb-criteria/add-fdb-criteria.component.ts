import { Component, ViewChild } from '@angular/core';
import { CriteriaService } from 'src/app/criteria.service';
import { MenuService } from '../../menu.service';

@Component({
  selector: 'app-add-fdb-criteria',
  templateUrl: './add-fdb-criteria.component.html',
  styleUrls: ['./add-fdb-criteria.component.css'],
})
export class AddFdbCriteriaComponent {
  newCriteria: any;
  criteria: any;
  newCriteriaBeingAdded: boolean = false;
  selectedCriteria: string[] = [];
  constructor(
    private criteriaSer: CriteriaService,
    private menuSer: MenuService
  ) {}

  ngOnInit() {
    this.criteriaSer.get_all_criteria().subscribe((response) => {
      console.log(response);
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
  addNewCriteria() {
    this.criteriaSer.add_criteria([this.newCriteria]).subscribe((data) => {
      console.log(data);
    });
    this.criteria.push({
      id: null,
      criteria: this.newCriteria,
      selected: true,
    });
    this.selectedCriteria.push(this.newCriteria);
    this.newCriteria = '';
    this.newCriteriaBeingAdded = !this.newCriteriaBeingAdded;
  }
  addFdbCriteria() {
    this.criteriaSer
      .add_menu_criteria(this.selectedCriteria)
      .subscribe((response) => {
        console.log(response);
        this.menuSer.menuState.next('published');
        this.menuSer.approveMenuChanged.next(false);
      });
  }
}
