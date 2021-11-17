import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { BalanceRecord, MyUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  newsCo: Map<string, Array<string>> = new Map<string, Array<string>>();
  logoutEmitter = new EventEmitter<boolean>();
  authChangeEmitter = new ReplaySubject<{ isIn: boolean, name: string }>(1);
  _otherUser!: Observable<MyUser|null>;
  _me!: Observable<MyUser|null>;
  _hotBalance!: Observable<BalanceRecord[]>;
  _historyBalance!: Observable<BalanceRecord[]>;
  links = ['En Çok Okunanlar', 'Takip Edilen Etiketler', 'Takip Edilen Kişiler'];

  constructor(private http: HttpClient) { }

  getDbUser(url: string): Observable<MyUser> {
    return this.http.get<MyUser>(url, {
      responseType: 'json', withCredentials: true,
    }).pipe();
  }
  createId(loggedId: string) {
    return Array.from(loggedId.substring(0,12)).map(c => 
        c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : 
        encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
      ).join('');
  }
}
