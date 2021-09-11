import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  me!: any;
  name!: string;
  query !: any;

  constructor(private auth: AuthService, private router: Router) {
    this.isLogged;
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
    this.getName();
    return !!this.name;
  }
  getName() {
    const miuser = localStorage.getItem('user');
    if (miuser && miuser !== 'null') {
      this.me = JSON.parse(miuser);
      this.name = this.me.displayName;
    }
  }
  ngOnInit() {
    this.query = window.matchMedia("(max-width: 800px)");
  }
  signOut() {
    this.auth.signOut();
    this.name = '';
    // document.querySelector('.navuser .dropdown-trigger')?.classList.add('passive');
    // setTimeout(() => {
    //   document.querySelector('.navuser .dropdown-trigger')?.classList.add('active');
    // }, 2000);
    if (this.router.url.startsWith('/user'))
      this.router.navigate(['/home']);
  }
}
