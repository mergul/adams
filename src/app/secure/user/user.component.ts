import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/news.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy{
  viewMode=true;

  constructor(public newsService: NewsService, public userService: UserService) {
    console.log('UserComponent');
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }
}
