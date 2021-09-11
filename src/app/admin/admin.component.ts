import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LazyLoadScriptService } from './lazy-load-script.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  scriptSubscription!: Subscription;
  constructor(private renderer: Renderer2, private scriptService: LazyLoadScriptService,
    @Inject(DOCUMENT) private _document: Document){
    this.scriptService.renderer=renderer;
    this.scriptService.document=_document;
  }
  ngOnInit() {
    this.scriptSubscription = this.scriptService.loadScript('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css','link')
    .subscribe(data=>{
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.scriptSubscription.unsubscribe();
  }
}
