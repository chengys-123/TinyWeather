import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { WeatherApiService } from '../../providers/weather-api/weather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private weather: any;
  private imgWeather = "http://openweathermap.org/img/w/01d.png";
  private country: string = '';
  private city: string = '';

  constructor(
    private weatherApiService: WeatherApiService,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public storage: Storage
  ) { }

  ionViewDidEnter() {
    this.country = 'Malaysia',
    this.city = 'Selangor'

    this.weatherApiService.getWeather(this.country, this.city).subscribe((res: any) => {
      this.weather = res;
      this.imgWeather = "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png";
    });
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
       
            this.weatherApiService.getWeather(data.country, data.city).subscribe((res: any) => {
              this.weather = res;
              this.imgWeather = "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png";
            });
          }
        }
      ]
    })
    return await alert.present();
  }
}
