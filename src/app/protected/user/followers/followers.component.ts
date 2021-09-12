import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  link!: string;

  constructor() { }

  ngOnInit(): void {
    this.link = history.state.link;
  }

}
