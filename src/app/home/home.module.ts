import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { TokenInterceptor } from '../secure/user/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsListModule } from '../posts-list/posts-list.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), PostsListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [RouterModule, PostsListModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
 }
