import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgToastService } from 'ng-angular-popup';

import { EmployeeResponse, PlaceOrderComponent } from './place-order.component';
import { UserModel, UserService } from 'src/shared/user.service';
import { MenuService } from 'src/app/menu/menu.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { BehaviorSubject, of } from 'rxjs';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;

  let menuServiceSpy: jasmine.SpyObj<MenuService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let empServiceSpy: jasmine.SpyObj<EmployeeService>;
  let toastServiceSpy: jasmine.SpyObj<NgToastService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    menuServiceSpy = jasmine.createSpyObj('MenuService', ['placeOrderChanged']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['user']);
    empServiceSpy = jasmine.createSpyObj('EmployeeService', ['place_order']);
    toastServiceSpy = jasmine.createSpyObj('NgToastService', [
      'success',
      'error',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    const placeOrderSubject = new BehaviorSubject<boolean>(false);
    const empPlaceOrderChanged = new BehaviorSubject<EmployeeResponse>({
      user_id: 1,
      balance: 320,
      username: 'test',
    });
    menuServiceSpy.placeOrderChanged = placeOrderSubject;
    empServiceSpy.placeOrderChanged = placeOrderSubject;
    TestBed.configureTestingModule({
      declarations: [PlaceOrderComponent],
      providers: [
        { provide: EmployeeService, useValue: empServiceSpy },
        { provide: MenuService, useValue: menuServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: NgToastService, useValue: toastServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;
    placeOrderSubject.next(false);
    userServiceSpy.user = new UserModel(null, null, '', '', null, '', '');

    empPlaceOrderChanged.next({
      user_id: 1,
      balance: 320,
      username: 'test',
    });
    component.constants.MENU_PRICE = 137;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should place order', () => {
    spyOn(component, 'closeDialog');
    spyOn(component, 'navigateBack');
    empServiceSpy.place_order.and.returnValue(of({ message: 'success' }));
    component.placeOrder();
    expect(empServiceSpy.place_order).toHaveBeenCalledTimes(1);
  });
  it('should close Dialog', () => {
    let plOrderChanged = true;
    component.closeDialog();
    menuServiceSpy.placeOrderChanged.subscribe((response) => {
      plOrderChanged = response;
    });
    expect(plOrderChanged).toBe(false);
  });
  //   it('should navigate back to the home page', () => {
  //     component.navigateBack();

  //     const expectedHomePath = `/home/${empServiceSpy.user.role}`;
  //     const expectedTargetPath =
  //       empServiceSpy.user.role === 'emp'
  //         ? '/home/emp/menu'
  //         : '/home/admin/order';

  //     expect(component.router.navigateByUrl).toHaveBeenCalledWith(
  //       expectedHomePath,
  //       { skipLocationChange: true }
  //     );
  //     expect(component.router.navigate).toHaveBeenCalledWith([
  //       expectedTargetPath,
  //     ]);
  //   });
});
