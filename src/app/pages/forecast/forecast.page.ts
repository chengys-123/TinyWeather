import { Component } from '@angular/core';
import { WeatherApiService } from 'src/app/providers/weather-api/weather-api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
})
export class ForecastPage {

  private city: string = '';
  private country: string = '';
  private weatherForecast: any;
  private weatherCity: any;

  constructor(
    private weatherApiService: WeatherApiService,
    private alertCtrl: AlertController
  ) { }

  ionViewDidEnter() {
    this.country = 'Malaysia';
    this.city = 'Selangor';
    this.weatherApiService.getWeatherForecast(this.country, this.city).subscribe((res: any) => {
      this.weatherForecast = res.list;
      this.weatherCity = res.city;
    })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Change Location',
      inputs: [
        {
          name: 'country',
          type: 'text',
          placeholder: 'Country'
        },
        {
          name: 'city',
          type: 'text',
          placeholder: 'City'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.country = JSON.stringify(data.country);
            this.city = JSON.stringify(data.city);

            this.weatherApiService.getWeatherForecast(data.country, data.city).subscribe((res: any) => {
              this.weatherForecast = res.list;
              this.weatherCity = res.city;
            });
          }
        }
      ]
    })
    return await alert.present();
  }
}
