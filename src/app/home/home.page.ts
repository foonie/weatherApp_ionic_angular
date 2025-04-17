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

  addFavorite() {
    if (this.city && !this.favorites.includes(this.city)) {
      this.favorites.push(this.city);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) this.favorites = JSON.parse(saved);
  }

  selectFavorite(city: string) {
    this.city = city;
    this.getWeather();
  }
}
