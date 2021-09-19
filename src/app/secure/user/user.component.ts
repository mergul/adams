import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy{
  private readonly destroy = new Subject<void>();
  masterBreadcrumbList!: string[];
  viewMode=true;
  constructor(private router: Router, private authService: AuthService) { 
    this.router.events.pipe(takeUntil(this.destroy), filter((event) => event instanceof NavigationEnd),
      map((event: any) =>{
        this.masterBreadcrumbList = event.url.split('/');
        this.masterBreadcrumbList = this.masterBreadcrumbList.slice(1);
    })).subscribe();
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {
  }

}
