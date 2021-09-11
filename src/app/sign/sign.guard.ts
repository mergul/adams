import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('is')==='1') {
        return this.authService.emitRedirectResult().then(result => {
          if (result != null && result.user != null) {
            const returnUrl = localStorage.getItem('returnUrl');
            console.log('returnUrl --> '+returnUrl);
            localStorage.setItem('is', '0');
            this.router.navigate([returnUrl ? returnUrl : 'user']);
          }
          return true;
        });
      } else {
       return this.authService.isLoggedIn.pipe(map(isLoggedIn => {
          if (isLoggedIn) {
            const returnUrl = this.router.url;
            console.log('returnUrl --> '+returnUrl);
            this.router.navigate([returnUrl ? returnUrl : 'user']);
          }
          return true;
        }))
      }
  }
}
