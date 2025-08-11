import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from '../Services/token.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const tokenService = inject(TokenService);
  if (tokenService.isTokenValid())
    return true;

  router.navigate(['/auth/sign-in']);
  return false;
};
