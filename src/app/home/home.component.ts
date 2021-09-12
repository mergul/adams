import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  list = ['assets/medium-bae.jpeg', 'assets/medium-bae.jpeg', 'assets/medium-bae.jpeg'
  , 'assets/medium-bae.jpeg', 'assets/medium-bae.jpeg', 'assets/medium-bae.jpeg', 'assets/medium-bae.jpeg',
  'assets/medium-bae.jpeg', 'assets/medium-bae.jpeg', 'assets/medium-bae.jpeg', 'assets/medium-bae.jpeg'
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/kenan-sulayman-FV3M7igu8Fs-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/anastasia-dulgier-NCFTGtjY3EQ-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/arnaud-mariat-IPXcUYHeErc-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/jakob-owens-EkxOtUljwhs-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/tim-bogdanov-4uojMEdcwI8-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/kenan-sulayman-FV3M7igu8Fs-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/anastasia-dulgier-NCFTGtjY3EQ-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/arnaud-mariat-IPXcUYHeErc-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/jakob-owens-EkxOtUljwhs-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/tim-bogdanov-4uojMEdcwI8-unsplash.jpg'
  ];
  length = this.list.length;
  query !: any;
   @ViewChild('carousel', { read: ElementRef, static: false }) carousel!: ElementRef;
   @ViewChild('micarousel', { read: ElementRef, static: false }) micarousel!: ElementRef;

  constructor(private router: Router) {
  }
  myFrag!: HTMLElement | null;
  lastRoutePath?: string;
  ngOnInit() {
    this.query = window.matchMedia("(max-width: 800px)");
  }
  onNav(ev:MouseEvent ,name: string, index: number, forward: boolean, size: number): void {
    let msize = size;
    let mindex;
    if (this.query.matches) {
      msize = size === 3 ? 2 : 3;
    }
    console.log("msize--> "+msize+" -index--> "+index +" -pageX --> "+ ev.pageX);
    if (forward) {
      if (ev.pageX<window.innerWidth*(msize/(msize+1))) {
        return;
      }
      mindex = (index + msize) > this.length ? this.length : (index + msize);
    } else {
      if (ev.pageX>window.innerWidth*(1/(msize+1))) {
        return;
      }
      mindex = (index - msize) < 1 ? 1 : (index - msize);
    }
    const el = document.getElementById(name + mindex);
    if (el) {
      const me=el.parentElement as HTMLElement;
      me.style.overflowX = 'hidden';
      el.scrollIntoView({ block: "nearest", inline: "nearest" });
      setTimeout(() => {
        me.style.overflowX = 'scroll';
      }, 1000);
    }
  }
  go(){
    this.router.navigate(['details']);
  }
  ngOnDestroy() {
  }
}
