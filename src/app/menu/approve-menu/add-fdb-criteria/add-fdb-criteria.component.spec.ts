import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFdbCriteriaComponent } from './add-fdb-criteria.component';

describe('AddFdbCriteriaComponent', () => {
  let component: AddFdbCriteriaComponent;
  let fixture: ComponentFixture<AddFdbCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFdbCriteriaComponent]
    });
    fixture = TestBed.createComponent(AddFdbCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
