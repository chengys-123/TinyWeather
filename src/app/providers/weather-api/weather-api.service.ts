import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private apiKey: string = '71d18235919cbf3bb5f431fd3caef8b2';
  private apiUrl: string = '';

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/';
  }

  getWeather(country, city) {
    return this.httpClient.get(this.apiUrl + 'weather?q=' + city + ',' + country + '&units=metric' + '&appid=' + this.apiKey);
  }

  getWeatherForecast(country, city) {
    return this.httpClient.get(this.apiUrl + 'forecast?q=' + city + ',' + country + '&units=metric' + '&appid=' + this.apiKey);
  }
}
