import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ScrollDirective } from './scroll.directive';

const routes: Routes = [];

@NgModule({
  declarations: [
    PostsListComponent, ScrollDirective
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ],
  exports: [PostsListComponent, ScrollDirective]
})
export class PostsListModule { }
