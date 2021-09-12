import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (localStorage.getItem('is')==='1') {
    //   return this.authService.emitRedirectResult().then(result => {
    //     localStorage.setItem('is', '0');
    //     if (result.user == null) {
    //       localStorage.setItem('returnUrl', state.url);
    //       this.router.navigate(['/sign']);
    //     }
    //     return true;
    //   });
    // } else {
   return this.authService.isLoggedIn.pipe(map(isLoggedIn => {
      if (!isLoggedIn.isIn) {
        localStorage.setItem('returnUrl', state.url);
        this.router.navigate(['secure/sign']);
      }
      return true;
    }));
  }
}