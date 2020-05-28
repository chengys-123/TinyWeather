import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private apiKey: string = '984a92582d644ba2b593f2cb233806da';
  private apiUrl: string = '';

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'https://newsapi.org/v2/everything?q=weather&sortBy=relevancy';
  }

  getNews() {
    return this.httpClient.get(this.apiUrl + '&apiKey=' + this.apiKey);
  }
}
