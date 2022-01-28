import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@secure/auth.service';
import { LazyLoadScriptService } from './lazy-load-script.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit, OnDestroy {
  private readonly destroy = new Subject<void>();
  constructor(private renderer: Renderer2, private scriptService: LazyLoadScriptService,
    @Inject(DOCUMENT) private _document: Document, private authService: AuthService){
    this.scriptService.renderer=renderer;
    this.scriptService.document=_document;
  }
  ngOnInit() {
    this.scriptService.loadScripts([{'name': 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css', 'type': 'link'},{'name': 'node_modules/apexcharts/dist/apexcharts.min.js', 'type':  'js'}]).map(res=>{
      res.pipe(takeUntil(this.destroy)).subscribe(data=>{
       // console.log(data);
      });
    })
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
