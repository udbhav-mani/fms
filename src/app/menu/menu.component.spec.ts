import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { UserService } from 'src/shared/user.service';
import { EmployeeService } from '../employee/employee.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-requests',
  template: '<div>Mock App Menu Requests Component</div>',
})
class MockAppMenuRequestsComponent {}
@Component({
  selector: 'app-place-order',
  template: '<div>Mock App Menu Requests Component</div>',
})
class MockAppPlaceOrderComponent {}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  let menuServiceSpy: jasmine.SpyObj<MenuService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let empServiceSpy: jasmine.SpyObj<EmployeeService>;
  const mockMenuResponse = { menu_id: '1', date: '2023-01-01', items: [] };

  beforeEach(() => {
    menuServiceSpy = jasmine.createSpyObj('MenuService', {
      get_menu: of(mockMenuResponse),
    });

    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        MockAppMenuRequestsComponent,
        MockAppPlaceOrderComponent,
      ],
      imports: [HttpClientModule],
      providers: [
        {
          provide: MenuService,
          useValue: menuServiceSpy,
        },
      ],
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentMenu on ngOnInit', () => {
    expect(menuServiceSpy.get_menu).toHaveBeenCalledWith('published');
    expect(component.currentMenu).toEqual(mockMenuResponse);
  });
});
