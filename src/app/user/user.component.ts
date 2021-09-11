import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  masterBreadcrumbList!: string[];
  viewMode=true;
  constructor(private router: Router) { 
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd),
      map((event: any) =>{
        this.masterBreadcrumbList = event.url.split('/');
        this.masterBreadcrumbList = this.masterBreadcrumbList.slice(2, this.masterBreadcrumbList.length);
    })).subscribe();
  }

  ngOnInit(): void {
  }

}
