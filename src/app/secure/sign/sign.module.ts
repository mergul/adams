import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignGuard } from '../sign.guard';

const routes: Routes = [
  { path: '', component: SignComponent, canActivate: [SignGuard]},
];

@NgModule({
  declarations: [SignComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule
  ],
  providers: [ SignGuard ]
})
export class SignModule { }