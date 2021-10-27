import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsPayload } from 'src/app/core/news.model';
import { NewsService } from 'src/app/core/news.service';

@Component({
  selector: 'app-user-contents',
  templateUrl: './user-contents.component.html',
  styleUrls: ['./user-contents.component.scss']
})
export class UserContentsComponent implements OnInit {
  // list = ['assets/thumb-kapak-bae.jpeg', 'assets/thumb-kapak-bae.jpeg', 'assets/thumb-kapak-bae.jpeg'
  // , 'assets/thumb-kapak-bae.jpeg', 'assets/thumb-kapak-bae.jpeg'
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/kenan-sulayman-FV3M7igu8Fs-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/anastasia-dulgier-NCFTGtjY3EQ-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/arnaud-mariat-IPXcUYHeErc-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/jakob-owens-EkxOtUljwhs-unsplash.jpg',
    // 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/14179/tim-bogdanov-4uojMEdcwI8-unsplash.jpg',
 // ];
  list: Observable<NewsPayload[]>;
  constructor(private newsService: NewsService) { 
    this.list = this.newsService.newsStreamList$;
  }

  ngOnInit(): void {
  }

}
