import { Injectable, NgZone, OnDestroy, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, authState, User } from '@angular/fire/auth';
import { EMPTY, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UserService } from '../core/user.service';
import { ReactiveStreamsService } from '../core/reactive-streams.service';
import { MyUser } from '../core/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  private readonly destroy = new Subject();
  public readonly user: Observable<User | null> = EMPTY;
  token!: Observable<string>;
  userData!: MyUser;
  isMobile!: boolean;
  isRedirected= false;

  constructor(@Optional() private auth: Auth, private router: Router, private ngZone: NgZone, private userService: UserService
  , private reactiveService: ReactiveStreamsService) {
   // this.afAuth.useEmulator("http://localhost:9099");
    this.isMobile=window.innerWidth<600;
    if (auth) {
      this.user = authState(this.auth);
      authState(this.auth).pipe(takeUntil(this.destroy),
      traceUntilFirst('auth'),
      switchMap(user => {
        if (user) {
          this.userService.authChangeEmitter.next({isIn: true, name: user.displayName!});
          localStorage.setItem('username', JSON.stringify(user.displayName));
          const id = this.userService.createId(user.uid);
          this.reactiveService.setListeners('@' + id);
          return this.userService.getDbUser('/api/rest/start/user/' + '@' + id);
        } else {
          this.userService.authChangeEmitter.next({isIn: false, name: ""});
          localStorage.setItem('username', '');
          return of(null);
        }
      })
    ).subscribe((user) => {
      if (user) {
        this.userService.newsCo.set(this.userService.links[1], this.userData.tags.map(value => {
        this.reactiveService.setUserListListeners('#' + value);
        return '#' + value;
      }));
      this.userService.newsCo.set(this.userService.links[2], this.userData.users.map(value => {
          this.reactiveService.setUserListListeners('@' + value);
          return '@' + value;
      }));
      }
    });
  }
  this.userService.logoutEmitter.pipe(takeUntil(this.destroy)).subscribe(async ss=>{
    await this.signOut();
  })
  }
  get isLoggedIn(): ReplaySubject<{isIn: boolean, name: string}> {
    return this.userService.authChangeEmitter;
  }
  
  async loginToGoogle() {
    const asd = await import("./GoogleAuthProvider");
    const provider = new asd.GoogleAuthProvider();//GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    if (!this.isMobile) {
      localStorage.setItem('is', '1');
      await asd.signInWithRedirect(this.auth, provider);
    } else {
      localStorage.setItem('is', '0');
      await asd.signInWithPopup(this.auth, provider);
    }
  }

  async resetPassword(email: string) {
    const asd=await import("./FirebaseActions");
    return await asd.sendPasswordResetEmail(this.auth, email, {
      'url': 'http://localhost:4200/auth', // Here we redirect back to this same page.
      'handleCodeInApp': true // This must be true.
    })
      .then(() => console.log('Sent Password Reset Email!'))
      .catch((error: any) => console.log(error));
  }
  async confirmPasswordReset(actionCode: string, newPassword: string) {
    const asd=await import("./FirebaseActions");
    return await asd.confirmPasswordReset(this.auth, actionCode, newPassword);
  }
  async verifyPasswordResetCode(actionCode: string) {
    const asd=await import("./FirebaseActions");
    return await asd.verifyPasswordResetCode(this.auth, actionCode);
  }

  async signUp(email: string, password: string) {
    const asd=await import("./FirebaseActions");

    return await asd.createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        asd.sendEmailVerification(result.user).then(() => {
          this.router.navigate(['verify-email-address']);
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  // Sign in with email/password
  async signIn(email: string, password: string) {
    const asd=await import("./FirebaseActions");
    return await asd.signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['secure/user']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  async signOut() {
    localStorage.removeItem('is');
    localStorage.removeItem('username');
    localStorage.removeItem('returnUrl');
    for (const tag of this.userData.tags) {
      this.reactiveService.resetUserListListeners('#' + tag);
    }        
    for (const tag of this.userData.users) {
      this.reactiveService.resetUserListListeners('@' + tag, true);
    }
    const asd=await import("./FirebaseActions");
    return await asd.signOut(this.auth);
  }
  async emitRedirectResult() {
    const asd = await import("./GoogleAuthProvider");
    return await asd.getRedirectResult(this.auth);
  }
  ngOnInit(): void { }
  
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
