import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NewsService } from 'src/app/core/news.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy{
  viewMode=true;
  constructor(public newaService: NewsService) { 
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

}
