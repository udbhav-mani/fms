import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserService } from 'src/shared/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userSer: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.userSer.user;

    if (!user.token || !user) {
      return next.handle(req);
    }
    const headers = req.headers.set('Authorization', 'Bearer ' + user.token);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
