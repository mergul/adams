import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { UserContentsComponent } from './user-contents/user-contents.component';
import { FollowersComponent } from './followers/followers.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';

const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthGuard],
        children: 
          [
            { path: '', redirectTo: 'contents', pathMatch: 'full'},
            { path: 'user-edit', component: UserEditComponent},
            { path: 'contents', component: UserContentsComponent},
            { path: 'followers', component: FollowersComponent}, 
            { path: 'followee', component: FollowersComponent},          
            { path: 'followco', component: FollowersComponent}
          ]
  }];

@NgModule({
  declarations: [
    UserComponent, UserContentsComponent, FollowersComponent, UserEditComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  providers: [AuthService, AuthGuard]
})
export class UserModule { }
