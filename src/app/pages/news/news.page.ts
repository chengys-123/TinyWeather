import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/providers/news-api/news-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {
  private articles: any;

  constructor(private newsApiService: NewsApiService) { }

  ionViewDidEnter() {
    this.newsApiService.getNews().subscribe((res) => {
      this.articles = res['articles'];
    });
  }

}
