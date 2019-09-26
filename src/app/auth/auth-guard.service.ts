import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(public auth: AuthService) { }

  canActivate() {
    return this.auth.isAuth();
  }

  canLoad() {
    // Please cancel subscription!
    return this.auth.isAuth()
    .pipe(
      // How many notifications before cancel subscription
      take(1)
    );
  }
}
