import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  link!: string;
  users!: Array<string>;
  tags!: Array<string>;
  constructor() { }

  ngOnInit(): void {
    console.log('FollowersComponent.ngOnInit', history.state.users);
    this.link = history.state.link;
    this.tags = history.state.tags;
    this.users = history.state.users;
  }
}
