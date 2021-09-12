import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AdminAsideComponent } from './admin-aside/admin-aside.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminViewsComponent } from './admin-views/admin-views.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'admin-main', pathMatch: 'full'
      },
      {
        path: 'admin-aside', component: AdminAsideComponent
      },
      {
        path: 'admin-main', component: AdminMainComponent
      },
      {
        path: 'admin-views', component: AdminViewsComponent
      },
      {
        path: 'admin-users', component: AdminUsersComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminAsideComponent,
    AdminMainComponent,
    AdminViewsComponent,
    AdminUsersComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), NgApexchartsModule
  ],
  providers: [ AuthGuard ]
})
export class AdminModule { }
