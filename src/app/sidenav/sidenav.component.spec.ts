import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { AuthService } from '../auth/auth.service';
import { UserModel, UserService } from 'src/shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['token']);
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { role: 'admin' } },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    userServiceSpy.user = new UserModel(null, null, '', '', null, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    expect(component.logout()).toBeUndefined();
  });
});
