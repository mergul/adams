import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyUser } from 'src/app/core/user.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileListComponent implements OnInit {
  _users!: Array<string>;
  _me!: Observable<MyUser| null>;
  private _mtype!: number;
  constructor() { }

  ngOnInit(): void {
  }
  @Input()
  get me(): Observable<MyUser|null> {
    return this._me;
  }
  set me(value: Observable<MyUser|null>) {
    this._me = value;
  }

  @Input() get mtype(): number {
    return this._mtype;
  }
  set mtype(value: number) {
    this._mtype = value;
  }

}
