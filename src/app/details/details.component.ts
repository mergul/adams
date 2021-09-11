import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  viewMode = 'tab1';
  _videoStringUrl = 'https://dl8.webmfiles.org/big-buck-bunny_trailer.webm';
  _videoUrl!: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this._videoUrl = 
    this.sanitizer.bypassSecurityTrustUrl(this._videoStringUrl);
  }

}
