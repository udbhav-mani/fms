import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { UserService } from 'src/shared/user.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const userSer = inject(UserService);
  if (userSer.token) {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
};
