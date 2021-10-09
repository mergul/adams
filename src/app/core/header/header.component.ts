import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy = new Subject<void>()
  @Output() logoutChange!: EventEmitter<boolean>;
  me!: any;
  name!: string;
  query !: any;
  _isLogged!: boolean;

  constructor(private userService: UserService, private router: Router, private ui: LoaderService) {
    this.logoutChange = this.userService.logoutEmitter;
    this.userService.changeEmitter.pipe(takeUntil(this.destroy)).subscribe(re => {
      this._isLogged = re.isIn;
      this.name = re.name;
      if (this.ui.isLoading.getValue()) { this.ui.hide(); }
    });
    const fgh = localStorage.getItem('username');
    if (fgh) {
      this.name = JSON.parse(fgh);
      this._isLogged = true;
    } else this._isLogged = false;
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  ngAfterViewInit(): void {
    if (this.query.matches) {
      const el = document.getElementById('nav-toggle');
      if (el) {
        document.querySelectorAll('nav li a, nav li button').forEach(item => {
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
    if (this.router.url.startsWith('/secure')){
      this._isLogged = false;
      this.name = '';
      this.logoutChange.emit(false);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/secure/signout'], {state: {url: this.router.url}});
    }
  }
}
