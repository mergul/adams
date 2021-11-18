import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  _users!: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }
  @Input()
  get users(): Array<string> {
    return this._users;
  }

  set users(value: Array<string>) {
    this._users = value;
  }
}
