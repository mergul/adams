import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  viewMode = 'signup';
  private readonly destroy = new Subject<void>();
  loginForm!: FormGroup;
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };
  email = '';
  resetPassword = false;
  listenerFn!: () => void;
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  isValidMailFormat = of(false);
  constructor(private authService: AuthService, private fb: FormBuilder) {
    // this.afAuth.getRedirectResult().then(function (result) {
    //   if (result.credential) {
    //     const fg=JSON.parse(JSON.stringify(result.credential));
    //     console.log('credential --> ' + JSON.stringify(fg['idToken']));
    //     // The signed-in user info.
    //   const user = result.user;
    //   router.navigate(['details']);
    //   }
    // }).catch(function (error) {
    //   const errorCode = error.code;
    //   if (errorCode === 'auth/account-exists-with-different-credential') {
    //     alert('You have already signed up with a different auth provider for that email.');
    //     // If you are using multiple auth providers on your app you should handle linking
    //     // the user's accounts here.
    //   } else {
    //     console.error(error);
    //   }
    // });
    this.createForm();
  }

  ngOnInit(): void {
    this.isValidMailFormat = of((this.loginForm.controls.email.value.toString().length === 0) &&
      (!this.EMAIL_REGEXP.test(this.loginForm.controls.email.value)));
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async triedGoogleLogin() {
    await this.authService.loginToGoogle();
  }
  sendResetEmail() {
    this.clearErrorMessage();

    this.authService.resetPassword(this.loginForm.controls.email.value)
      .then(() => {
        this.resetPassword = true;
        alert('A password reset link has been sent to your email address!');
      })
      .catch((_error: { name: string; message: string; }) => {
        this.error = _error;
      });
  }
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }
}
