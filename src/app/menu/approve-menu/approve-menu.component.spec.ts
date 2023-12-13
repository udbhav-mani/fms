import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMenuComponent } from './approve-menu.component';

describe('ApproveMenuComponent', () => {
  let component: ApproveMenuComponent;
  let fixture: ComponentFixture<ApproveMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveMenuComponent]
    });
    fixture = TestBed.createComponent(ApproveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
