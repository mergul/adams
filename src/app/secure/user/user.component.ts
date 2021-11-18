import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/news.service';
import { ReactiveStreamsService } from 'src/app/core/reactive-streams.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy{
  viewMode=true;

  constructor(public newsService: NewsService, public userService: UserService, private reactive: ReactiveStreamsService) { 
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }
}
