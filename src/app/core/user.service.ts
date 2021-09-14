import { EventEmitter, Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  logoutEmitter = new EventEmitter<boolean>();
  changeEmitter = new ReplaySubject<{isIn: boolean, name: string}>(1);

  constructor() { }
}
