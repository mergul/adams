import { EventEmitter, Injectable, NgZone, OnDestroy, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, authState, confirmPasswordReset, createUserWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, User, verifyPasswordResetCode } from '@angular/fire/auth';
import { BehaviorSubject, EMPTY, from, Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;
  token!: Observable<string>;
  changeEmitter = new Subject<boolean>();
  userData: any;
  isMobile!: boolean;
  isRedirected= false;

  constructor(@Optional() private auth: Auth, private router: Router, private ngZone: NgZone) {
   // this.afAuth.useEmulator("http://localhost:9099");
    this.isMobile=window.innerWidth<600;
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
      traceUntilFirst('auth'),
      switchMap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.changeEmitter.next(true);
          return from(user.getIdToken());
        } else {
          localStorage.setItem('user', null!);
          this.changeEmitter.next(false);
          return of("");
        }
      })
    ).subscribe((token: string) => {
      localStorage.setItem('token', token);
    });
  }
  }
  get isLoggedIn(): Subject<boolean> {
       return this.changeEmitter;
  }
  get displayName(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.displayName;
  }
  async loginToGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    if (!this.isMobile) {
      localStorage.setItem('is', '1');
      await signInWithRedirect(this.auth, provider);
    } else {
      localStorage.setItem('is', '0');
      await signInWithPopup(this.auth, provider);
    }
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email, {
      'url': 'http://localhost:4200/auth', // Here we redirect back to this same page.
      'handleCodeInApp': true // This must be true.
    })
      .then(() => console.log('Sent Password Reset Email!'))
      .catch((error: any) => console.log(error));
  }
  confirmPasswordReset(actionCode: string, newPassword: string) {
    return confirmPasswordReset(this.auth, actionCode, newPassword);
  }
  verifyPasswordResetCode(actionCode: string) {
    return verifyPasswordResetCode(this.auth, actionCode);
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        sendEmailVerification(result.user).then(() => {
          this.router.navigate(['verify-email-address']);
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  // Sign in with email/password
  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  async signOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('is');
    return await signOut(this.auth);
  }
  emitRedirectResult() {
    return getRedirectResult(this.auth);
  }
  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
}
