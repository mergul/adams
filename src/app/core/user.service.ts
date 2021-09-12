import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  logoutEmitter = new EventEmitter<boolean>();
  changeEmitter = new Subject<{isIn: boolean, name: string}>();

  constructor() { }
}
