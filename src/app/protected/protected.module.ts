import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { getApp } from '@angular/fire/app';
import { provideAuth, initializeAuth, indexedDBLocalPersistence, browserPopupRedirectResolver, Auth } from '@angular/fire/auth';
import { ProtectedComponent } from './protected.component';

const routes: Routes = [
  {
    path: '', component: ProtectedComponent
  },
  {
    path: 'user', loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'sign', loadChildren: () =>
      import('./sign/sign.module').then(m => m.SignModule)
  },
  {
    path: 'auth', loadChildren: () =>
      import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: 'admin', loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },
]

@NgModule({
  declarations: [
    ProtectedComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    provideAuth(() => {
      const auth = initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      });
      // if (environment.useEmulators) {
      //   connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      // }
      return auth;
    })
  ],
  providers: []
})
export class ProtectedModule { }
