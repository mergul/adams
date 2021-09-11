import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignGuard } from './/sign.guard';
//  import { getApp } from '@angular/fire/app';
//  import { provideAuth, initializeAuth, indexedDBLocalPersistence, browserPopupRedirectResolver } from '@angular/fire/auth';


const routes: Routes = [
  { path: '', component: SignComponent, canActivate: [SignGuard] },
];

@NgModule({
  declarations: [SignComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, 
    // provideAuth(() => {
    //   const auth = initializeAuth(getApp(), {
    //     persistence: indexedDBLocalPersistence,
    //     popupRedirectResolver: browserPopupRedirectResolver,
    //   });
    //   if (environment.useEmulators) {
    //     connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    //   }
    //   return auth;
    // })
  ],
  providers: []
})
export class SignModule { }
