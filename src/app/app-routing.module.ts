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
  {path: 'secure', loadChildren: () => import('./protected/protected.module').then(s => s.ProtectedModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
