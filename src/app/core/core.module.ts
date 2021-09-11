import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { WindowRef } from './window.service';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
 import { getApp } from '@angular/fire/app';
 import { provideAuth, initializeAuth, indexedDBLocalPersistence, browserPopupRedirectResolver } from '@angular/fire/auth';

const routes: Routes = [
];
@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), HttpClientModule,
    provideAuth(() => {
      const auth = initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      });
      // if (environment.useEmulators) {
      //   connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      // }
      return auth;
    }),
  ],
  providers: [AuthService, WindowRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [FooterComponent, HeaderComponent]
})
export class CoreModule { }
