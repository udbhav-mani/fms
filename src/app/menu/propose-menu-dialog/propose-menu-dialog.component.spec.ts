import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeMenuDialogComponent } from './propose-menu-dialog.component';

describe('ProposeMenuDialogComponent', () => {
  let component: ProposeMenuDialogComponent;
  let fixture: ComponentFixture<ProposeMenuDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposeMenuDialogComponent]
    });
    fixture = TestBed.createComponent(ProposeMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
