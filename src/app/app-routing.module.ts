import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: () =>
      import('./home/home.module').then(m => m.HomeModule)},
  {path: 'home/:id', loadChildren: () =>
      import('./details/details.module').then(m => m.DetailsModule)},
  {path: 'secure', loadChildren: () => 
      import('./secure/secure.module').then(s => s.SecureModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {scrollPositionRestoration: 'enabled'}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
