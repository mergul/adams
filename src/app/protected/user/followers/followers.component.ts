import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  link!: string;
  tags = ['1', '2', '3'];
  constructor() { }

  ngOnInit(): void {
    this.link = history.state.link;
  }

}
