import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// const routerOptions: ExtraOptions = {
  // useHash: true,
  // anchorScrolling: 'enabled',
 // onSameUrlNavigation: 'reload',
  // scrollPositionRestoration: 'enabled',
 // enableTracing: true,
 // scrollOffset: [0, 64]
// };
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)},
  {path: 'details', loadChildren: () =>
      import('./details/details.module').then(m => m.DetailsModule)},
  {path: 'sign', loadChildren: () =>
      import('./sign/sign.module').then(m => m.SignModule)},
  {path: 'auth', loadChildren: () =>
      import('./user-management/user-management.module').then(m => m.UserManagementModule)},
  {path: 'user', loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule)},
  {path: 'admin', loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
