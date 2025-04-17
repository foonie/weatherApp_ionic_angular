import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { IonHeader } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  city = '';
  weatherData: any;
  favorites: string[] = [];

  constructor(private weatherService: WeatherService) {
    this.loadFavorites();
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
    }, err => {
      alert('City not found');
    });
  }

  constructor() {}

}
