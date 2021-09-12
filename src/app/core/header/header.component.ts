import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() logoutChange!: EventEmitter<boolean>;
  me!: any;
  name!: string;
  query !: any;
  _isLogged!: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.logoutChange= this.userService.logoutEmitter;
    this.userService.changeEmitter.subscribe(re => {
        this._isLogged = re.isIn;
        this.name = re.name;
    });
    const fgh = localStorage.getItem('username');
    if (fgh) {
      this.name = JSON.parse(fgh);
      this._isLogged = true;
    } else this._isLogged = false;
  }
  ngAfterViewInit(): void {
    if (this.query.matches) {
      const el = document.getElementById('nav-toggle');
      if (el) {
        document.querySelectorAll('nav li a').forEach(item => {
          item.addEventListener('click', () => {
            el.click();
          });
        });
      }
    }
  }
  get isLogged() {
    return this._isLogged;
  }
  set isLogged(value: boolean) {
    this._isLogged = value;
  }
  
  ngOnInit() {
    this.query = window.matchMedia("(max-width: 800px)");
  }
  signOut() {
   this._isLogged=false;
   this.logoutChange.emit(false);
    this.name = '';
    if (this.router.url.startsWith('secure'))
      this.router.navigate(['/home']);
  }
}
