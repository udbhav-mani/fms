import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRequestsComponent } from './menu-requests.component';

describe('MenuRequestsComponent', () => {
  let component: MenuRequestsComponent;
  let fixture: ComponentFixture<MenuRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRequestsComponent]
    });
    fixture = TestBed.createComponent(MenuRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
