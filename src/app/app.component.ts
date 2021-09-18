import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LoaderService } from './core/loader.service';
import { NewsService } from './core/news.service';
import { ReactiveStreamsService } from './core/reactive-streams.service';
import { WindowRef } from './core/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly destroy = new Subject<void>();
  private newslistUrl: string;
  _loggedinUser = false;

  constructor(private reactiveService: ReactiveStreamsService, public ui: LoaderService,
    public newsService: NewsService, private zone: NgZone, private winRef: WindowRef) {
    if (!this.reactiveService.random) {
      this.reactiveService.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    }
    this.newslistUrl = '/sse/chat/room/TopNews' + this.reactiveService.random + '/subscribeMessages';
  }
  receiveMessage($event) {
    this._loggedinUser = $event;
    console.log('receiveMessage --> '+$event);
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  ngAfterViewInit(): void {
    this.ui.isLoading.pipe(takeUntil(this.destroy), map(value=>{    
      this.zone.runOutsideAngular(() =>{
        const el = this.winRef.nativeWindow.document.getElementById('spinner');
        el.style.display = value?'block':'none';
        document.body.style.backgroundColor=value?'#00000099':'transparent';
      }) 
    })).subscribe();
    this.zone.run(() => {
      this.winRef.nativeWindow.onload = () => {
        if (!this.reactiveService.statusOfNewsSource()) {
          this.reactiveService.getNewsStream(this.reactiveService.random, this.newslistUrl);
        }
        if (!this.newsService.newsStreamList$) {
          this.newsService.newsStreamList$ = this.reactiveService.getMessage(this.newsService.links[0]);
          this.newsService.tagsStreamList$ = this.reactiveService.getMessage(this.newsService.links[1]);
          this.newsService.peopleStreamList$ = this.reactiveService.getMessage(this.newsService.links[2]);
          this.newsService.meStreamList$ = this.reactiveService.getMessage('me');
          this.newsService.newsStreamCounts$ = this.reactiveService.getMessage('user-counts')
            .pipe(map(record => {
              if (record.key) {
                this.newsService.newsCounts$.set(record.key, String(record.value));
              }
              return record;
            }));
        }
        this.newsService.topTags = this.reactiveService.getMessage('top-tags')
          .pipe(map(value =>
            value.filter((value1: { key: string; }) =>
              value1.key.charAt(0) === '#')));
      }
    });
  }
}
